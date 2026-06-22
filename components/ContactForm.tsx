"use client";
import { useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, TriangleAlert } from "lucide-react";
import { services } from "@/lib/data";

type Status="idle"|"sending"|"success"|"error";
export default function ContactForm(){
  const [status,setStatus]=useState<Status>("idle");
  async function submit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();setStatus("sending");
    const form=event.currentTarget;const data=Object.fromEntries(new FormData(form));
    try{const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,formType:"Contact Page Inquiry"})});if(!response.ok)throw new Error();setStatus("success");form.reset()}catch{setStatus("error")}
  }
  if(status==="success")return <div className="card grid min-h-[520px] place-items-center p-10 text-center" role="status"><div><CheckCircle2 size={55} className="mx-auto text-red-500"/><h2 className="display mt-6 text-5xl">Message received.</h2><p className="muted mt-3 max-w-md">Thank you! Your inquiry has been received. Our team will contact you shortly.</p><button className="btn btn-ghost mt-7" onClick={()=>setStatus("idle")}>Send another inquiry</button></div></div>;
  return <form className="card p-6 sm:p-10" onSubmit={submit}>
    <input className="absolute -left-[9999px] h-px w-px" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="text-xs font-bold uppercase tracking-widest">Name<input name="name" required maxLength={120} className="field mt-2" placeholder="Your full name"/></label>
      <label className="text-xs font-bold uppercase tracking-widest">Email<input name="email" required type="email" maxLength={160} className="field mt-2" placeholder="you@company.com"/></label>
      <label className="text-xs font-bold uppercase tracking-widest">Phone<input name="phone" required type="tel" minLength={7} maxLength={20} pattern="[+0-9 ()-]{7,20}" className="field mt-2" placeholder="+1 (000) 000-0000"/></label>
      <label className="text-xs font-bold uppercase tracking-widest">Service<select name="service" required className="field mt-2" defaultValue=""><option value="" disabled>Select a service</option>{services.map(s=><option key={s.slug}>{s.title}</option>)}</select></label>
      <label className="text-xs font-bold uppercase tracking-widest sm:col-span-2">Project details<textarea name="message" required maxLength={3000} className="field mt-2 min-h-40" placeholder="Tell us about your business, goals, and timeline..."/></label>
    </div>
    {status==="error"&&<p className="mt-5 flex items-center gap-2 text-sm text-red-400" role="alert"><TriangleAlert size={17}/>Something went wrong. Please try again or contact us directly.</p>}
    <button disabled={status==="sending"} className="btn btn-primary mt-6 disabled:cursor-not-allowed disabled:opacity-60">{status==="sending"?<><LoaderCircle className="animate-spin" size={17}/>Sending...</>:<>Send inquiry <ArrowRight size={17}/></>}</button>
  </form>
}
