"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { services } from "@/lib/data";

export default function Header(){
  const [mobileOpen,setMobileOpen]=useState(false);
  const [mobileServicesOpen,setMobileServicesOpen]=useState(false);
  const [desktopServicesOpen,setDesktopServicesOpen]=useState(false);
  const path=usePathname();
  const nav=[['Home','/'],['About','/about'],['Services','/services'],['Portfolio','/portfolio'],['Contact','/contact']];
  const closeMobile=()=>{setMobileOpen(false);setMobileServicesOpen(false)};
  return <header className="fixed inset-x-0 top-0 z-[100] overflow-visible border-b border-white/10 bg-[#08090b]/95 backdrop-blur-xl">
    <div className="container flex h-[82px] items-center justify-between">
      <Link href="/" aria-label="American Logo Expert home" className="flex items-center"><Image src="/assets/logo/American Logo Expert_without_bg.png" width={78} height={78} alt="American Logo Expert" className="h-[74px] w-[74px] object-contain" priority/></Link>
      <nav className="hidden h-full items-center gap-8 lg:flex">{nav.map(([label,href])=>label==='Services'?
        <div key={href} className="relative flex h-full items-center" onMouseEnter={()=>setDesktopServicesOpen(true)} onMouseLeave={()=>setDesktopServicesOpen(false)}>
          <Link onFocus={()=>setDesktopServicesOpen(true)} className={`flex h-full items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors ${path.startsWith('/services')||desktopServicesOpen?'text-red-500':'text-zinc-300 hover:text-white'}`} href={href}>Services <ChevronDown size={14} className={`transition-transform duration-300 ${desktopServicesOpen?'rotate-180':''}`}/></Link>
          <div className={`absolute left-1/2 top-full z-[110] grid w-[620px] -translate-x-1/2 grid-cols-2 gap-1 border border-white/10 bg-[#101115] p-4 shadow-2xl shadow-black/60 transition-all duration-200 ease-out ${desktopServicesOpen?'visible translate-y-0 opacity-100':'pointer-events-none invisible translate-y-2 opacity-0'}`}>
            {services.map(s=><Link onClick={()=>setDesktopServicesOpen(false)} key={s.slug} href={`/services/${s.slug}`} className={`group flex items-center gap-3 border border-transparent px-3 py-2.5 text-sm transition-all duration-200 hover:border-red-500/30 hover:bg-red-500/10 hover:text-white ${path===`/services/${s.slug}`?'bg-red-500/10 text-white':'text-zinc-400'}`}><span className="text-[10px] text-red-500">{s.num}</span><span className="transition-transform group-hover:translate-x-1">{s.title}</span></Link>)}
          </div>
        </div>:
        <Link key={href} href={href} className={`flex h-full items-center text-xs font-bold uppercase tracking-widest transition-colors ${path===href?'text-red-500':'text-zinc-300 hover:text-white'}`}>{label}</Link>)}
      </nav>
      <Link href="/contact" className="btn btn-primary hidden lg:inline-flex">Start a project <ArrowUpRight size={16}/></Link>
      <button className="grid h-11 w-11 place-items-center border border-white/10 transition hover:border-red-500 hover:text-red-500 lg:hidden" onClick={()=>setMobileOpen(v=>!v)} aria-expanded={mobileOpen} aria-label="Toggle menu">{mobileOpen?<X/>:<Menu/>}</button>
    </div>
    <div className={`overflow-hidden border-white/10 bg-[#0b0c0f] transition-all duration-300 lg:hidden ${mobileOpen?'max-h-[85vh] border-t opacity-100':'max-h-0 opacity-0'}`}><div className="max-h-[calc(100vh-82px)] overflow-y-auto px-5 pb-7">{nav.map(([label,href])=><div key={href}>{label==='Services'?<>
      <button onClick={()=>setMobileServicesOpen(v=>!v)} className={`flex w-full items-center justify-between border-b border-white/10 py-4 text-sm font-bold uppercase transition-colors ${mobileServicesOpen||path.startsWith('/services')?'text-red-500':'text-white'}`} aria-expanded={mobileServicesOpen}>Services <ChevronDown size={16} className={`transition-transform duration-300 ${mobileServicesOpen?'rotate-180':''}`}/></button>
      <div className={`grid overflow-hidden bg-white/[.025] transition-all duration-300 ${mobileServicesOpen?'max-h-[620px] py-2 opacity-100':'max-h-0 py-0 opacity-0'}`}>{services.map(s=><Link onClick={closeMobile} key={s.slug} href={`/services/${s.slug}`} className="border-l-2 border-transparent px-4 py-2.5 text-sm text-zinc-400 transition hover:border-red-500 hover:bg-red-500/10 hover:text-white">{s.title}</Link>)}</div>
    </>:<Link onClick={closeMobile} className={`block border-b border-white/10 py-4 text-sm font-bold uppercase transition-colors hover:text-red-500 ${path===href?'text-red-500':'text-white'}`} href={href}>{label}</Link>}</div>)}</div></div>
  </header>
}
