import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, BriefcaseBusiness, Palette, Mail, Phone, MapPin } from "lucide-react";
import { services } from "@/lib/data";
import { contact,phoneDisplay } from "@/lib/contact";

export default function Footer(){return <footer className="border-t border-white/10 bg-[#060709] pt-20"><div className="container">
  <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-[1.2fr_.65fr_.9fr_1.25fr]">
    <div><Link href="/" className="inline-flex"><Image src="/assets/logo/American Logo Expert_without_bg.png" width={118} height={118} alt="American Logo Expert" className="h-[118px] w-[118px] object-contain"/></Link><p className="muted mt-5 max-w-sm text-sm">We build bold visual identities and digital experiences for businesses ready to lead their category.</p><div className="mt-7 flex gap-3">{[Camera,BriefcaseBusiness,Palette].map((Icon,i)=><a key={i} href="#" aria-label="Social profile" className="grid h-10 w-10 place-items-center border border-white/10 hover:border-red-500 hover:text-red-500"><Icon size={16}/></a>)}</div></div>
    <div><b className="text-xs uppercase tracking-[.2em]">Navigate</b><div className="mt-5 grid gap-3 text-sm text-zinc-400">{[['Home','/'],['About','/about'],['Services','/services'],['Portfolio','/portfolio'],['Contact Us','/contact']].map(x=><Link key={x[0]} href={x[1]} className="hover:text-white">{x[0]}</Link>)}</div></div>
    <div><b className="text-xs uppercase tracking-[.2em]">Featured services</b><div className="mt-5 grid gap-3 text-sm text-zinc-400">{services.slice(0,5).map(s=><Link key={s.slug} href={`/services/${s.slug}`} className="flex justify-between hover:text-white">{s.title}<ArrowUpRight size={14}/></Link>)}</div></div>
    <div><b className="text-xs uppercase tracking-[.2em]">Contact</b><div className="mt-5 grid gap-4 text-sm text-zinc-400"><a href={`mailto:${contact.email}`} className="flex gap-3 hover:text-white"><Mail size={17} className="mt-0.5 shrink-0 text-red-500"/>{contact.email}</a><a href={`tel:${contact.phone}`} className="flex gap-3 hover:text-white"><Phone size={17} className="shrink-0 text-red-500"/>{phoneDisplay}</a><a href={contact.mapUrl} target="_blank" rel="noreferrer" className="flex gap-3 leading-6 hover:text-white"><MapPin size={17} className="mt-1 shrink-0 text-red-500"/>{contact.address}</a></div></div>
  </div>
  <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between"><p>Copyright © 2026. All Rights Reserved.</p><div className="flex gap-5"><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms">Terms & Conditions</Link></div></div>
</div></footer>}
