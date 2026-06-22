import nodemailer from "nodemailer";

export const runtime = "nodejs";

type Lead = { name?:unknown; email?:unknown; phone?:unknown; service?:unknown; message?:unknown; formType?:unknown; website?:unknown };
const attempts = new Map<string,{count:number;reset:number}>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

function text(value:unknown,max=2000){return String(value??"").replace(/[<>]/g,"").replace(/[\u0000-\u001F\u007F]/g," ").trim().slice(0,max)}
function html(value:string){return value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;")}
function limited(ip:string){const now=Date.now();const current=attempts.get(ip);if(!current||current.reset<now){attempts.set(ip,{count:1,reset:now+WINDOW_MS});return false}current.count++;return current.count>MAX_REQUESTS}

export async function POST(request:Request){
  try {
    if(Number(request.headers.get("content-length")||0)>25_000)return Response.json({error:"Request is too large."},{status:413});
    const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
    if(limited(ip))return Response.json({error:"Too many requests. Please try again later."},{status:429});
    const body=await request.json() as Lead;
    if(text(body.website,200))return Response.json({ok:true});

    const lead={name:text(body.name,120),email:text(body.email,160).toLowerCase(),phone:text(body.phone,40),service:text(body.service,120),message:text(body.message,3000),formType:text(body.formType,80)};
    if(!lead.name||!lead.email||!lead.phone||!lead.service||!lead.message||!lead.formType)return Response.json({error:"Please complete all required fields."},{status:400});
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))return Response.json({error:"Please enter a valid email address."},{status:400});
    if(!/^\+?[0-9\s().-]{7,20}$/.test(lead.phone))return Response.json({error:"Please enter a valid phone number."},{status:400});

    const required=["SMTP_HOST","SMTP_PORT","SMTP_USER","SMTP_PASS","MAIL_FROM","MAIL_TO"] as const;
    const missing=required.filter(key=>!process.env[key]);
    if(missing.length){console.error("Missing mail configuration:",missing.join(", "));return Response.json({error:"Email service is not configured."},{status:503})}

    const transporter=nodemailer.createTransport({
      host:process.env.SMTP_HOST,
      port:Number(process.env.SMTP_PORT),
      secure:process.env.SMTP_SECURE==="true",
      auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS},
    });
    const submitted=new Intl.DateTimeFormat("en-US",{dateStyle:"full",timeStyle:"long",timeZone:"America/New_York"}).format(new Date());
    const rows=[['Name',lead.name],['Email',lead.email],['Phone',lead.phone],['Selected Service',lead.service],['Message',lead.message],['Submitted From',lead.formType],['Date and Time',`${submitted} (ET)`]];
    const table=rows.map(([label,value])=>`<tr><td style="padding:12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-weight:600;vertical-align:top">${html(label)}</td><td style="padding:12px;border-bottom:1px solid #e5e7eb;color:#111827;white-space:pre-wrap">${html(value)}</td></tr>`).join("");
    await transporter.sendMail({
      from:`American Logo Expert <${process.env.MAIL_FROM}>`,to:process.env.MAIL_TO,replyTo:lead.email,
      subject:`${lead.formType}: ${lead.name} — ${lead.service}`,
      text:rows.map(([k,v])=>`${k}: ${v}`).join("\n\n"),
      html:`<!doctype html><html><body style="margin:0;background:#f3f4f6;font-family:Arial,sans-serif"><div style="max-width:680px;margin:32px auto;background:#fff;border-top:6px solid #e31b23"><div style="padding:28px 32px;background:#090a0c;color:#fff"><h1 style="margin:0;font-size:24px">American Logo Expert</h1><p style="margin:8px 0 0;color:#c7c9ce">New website lead</p></div><table style="width:100%;border-collapse:collapse">${table}</table><p style="padding:20px 32px;margin:0;color:#6b7280;font-size:12px">Sent securely from americanlogoexpert.com</p></div></body></html>`,
    });
    return Response.json({ok:true});
  } catch(error){console.error("Contact form email failed:",error);return Response.json({error:"Unable to send your message."},{status:500})}
}
