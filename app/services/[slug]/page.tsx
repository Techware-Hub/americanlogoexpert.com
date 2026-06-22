import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight,Check } from "lucide-react";
import { services } from "@/lib/data";
import { portfolioItems } from "@/data/portfolio";
import PageHero from "@/components/PageHero";
import PortfolioGrid from "@/components/PortfolioGrid";
import CTA from "@/components/CTA";

export function generateStaticParams(){return services.map(service=>({slug:service.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const service=services.find(item=>item.slug===slug);return {title:service?.title??"Service",description:service?.short}}

export default async function ServicePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const service=services.find(item=>item.slug===slug);if(!service)notFound();
  const Icon=service.icon;const hasPortfolio=portfolioItems.some(item=>item.serviceSlug===service.slug);
  return <>
    <PageHero kicker={`Service ${service.num}`} title={service.title.split(" ").slice(0,-1).join(" ")} accent={service.title.split(" ").slice(-1)[0]} copy={service.short}/>
    <section className="section"><div className="container grid gap-14 lg:grid-cols-[1.1fr_.9fr]">
      <div><span className="eyebrow">Built around your business</span><h2 className="display section-title">Distinctive by design. <span className="red">Useful by default.</span></h2><p className="muted max-w-2xl text-lg">Our {service.title.toLowerCase()} process combines business insight, original creative exploration, and meticulous craft. The result is not simply an attractive deliverable—it is a flexible brand asset designed to work hard everywhere your audience meets you.</p><p className="muted mt-5 max-w-2xl">You will work through a clear, collaborative process with thoughtful presentation rounds and actionable guidance at every step.</p></div>
      <aside className="premium-card card group cursor-pointer p-8 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/30"><Icon size={42} className="text-red-500"/><h3 className="display mt-8 text-4xl">What’s included</h3><div className="mt-7 grid gap-4">{["Discovery and creative brief","Original concept development","Collaborative revision rounds","Production-ready final files","Usage and launch guidance"].map(item=><div key={item} className="flex gap-3 border-t border-white/10 pt-4 text-sm"><Check size={17} className="text-red-500"/>{item}</div>)}</div><Link href="/contact" className="btn btn-primary mt-8 w-full">Request a quote <ArrowRight size={16}/></Link></aside>
    </div></section>
    {hasPortfolio&&<section className="section bg-[#0d0e11]"><div className="container"><div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><span className="eyebrow">Related portfolio</span><h2 className="display section-title mb-0">Selected <span className="red">{service.title}</span> Work.</h2></div><Link href="/portfolio" className="btn btn-ghost shrink-0">View all work <ArrowRight size={16}/></Link></div><PortfolioGrid serviceSlug={service.slug} limit={6}/></div></section>}
    <section className="section bg-[#101115]"><div className="container"><span className="eyebrow">How it works</span><h2 className="display section-title">A clear path from brief to <span className="red">brilliant.</span></h2><div className="grid gap-3 md:grid-cols-3">{[["01","Align","We define the audience, goals, tone, and practical requirements."],["02","Create","We develop and present strategic creative directions with clear rationale."],["03","Deliver","We refine the chosen route and prepare a complete, organized asset suite."]].map(item=><div key={item[0]} className="premium-card card group cursor-pointer p-8 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/30"><span className="display text-6xl text-red-500">{item[0]}</span><h3 className="display mt-10 text-3xl">{item[1]}</h3><p className="muted mt-3 text-sm">{item[2]}</p></div>)}</div></div></section>
    <CTA/>
  </>;
}
