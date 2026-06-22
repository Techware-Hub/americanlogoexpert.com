import type { Metadata } from "next";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { contact,phoneDisplay } from "@/lib/contact";
export const metadata:Metadata={title:"Contact Us",description:"Start your logo, branding, website, or mobile project with American Logo Expert."};
const cardHover="group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/30";
const details=[
  {Icon:Phone,label:"Call us",value:phoneDisplay,href:`tel:${contact.phone}`},
  {Icon:Mail,label:"Email us",value:contact.email,href:`mailto:${contact.email}`},
  {Icon:MapPin,label:"Visit us",value:contact.address,href:contact.mapUrl},
];
export default function Contact(){return <><PageHero kicker="Start a conversation" title="Letâ€™s make your" accent="mark." copy="Tell us where you are headed. We will come back with thoughtful questions, clear next steps, and absolutely no hard sell."/><section className="section"><div className="container"><div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-aos="fade-up">{details.map(({Icon,label,value,href})=><a key={label} href={href} target={label==="Visit us"?"_blank":undefined} rel={label==="Visit us"?"noreferrer":undefined} className={`premium-card card p-6 ${cardHover}`}><div className="flex items-start justify-between"><span className="grid h-12 w-12 place-items-center bg-red-600/10 text-red-500"><Icon size={22}/></span><ArrowUpRight size={17} className="text-zinc-600 group-hover:text-red-500"/></div><span className="mt-8 block text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">{label}</span><b className="mt-2 block break-words text-sm leading-6">{value}</b></a>)}</div><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><span className="eyebrow">Tell us whatâ€™s next</span><h2 className="display mt-6 text-6xl">Have an idea?<br/><span className="red">Weâ€™re listening.</span></h2><p className="muted mt-5">New identity, tired website, ambitious app, or simply a fuzzy idea that needs shapeâ€”we would love to hear it.</p><div className="card mt-9 overflow-hidden"><div className="grid-bg relative grid min-h-72 place-items-center p-8 text-center"><MapPin size={38} className="text-red-500"/><div><h3 className="display text-3xl">Clarkston, Georgia</h3><p className="muted mt-2 text-sm">{contact.address}</p><a href={contact.mapUrl} target="_blank" rel="noreferrer" className="btn btn-ghost mt-5">Open in Google Maps <ArrowUpRight size={16}/></a></div></div></div></div><ContactForm/></div></div></section></>}


