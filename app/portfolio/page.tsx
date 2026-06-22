import type { Metadata } from "next";
import PortfolioGrid from "@/components/PortfolioGrid";
import OfferButton from "@/components/OfferButton";
export const metadata:Metadata={title:"Our Creative Portfolio",description:"Explore our latest logo designs, branding projects, websites, and digital creative work."};
export default function Portfolio(){return <>
  <section className="grid-bg noise relative overflow-hidden border-b border-white/10 pt-[190px] pb-24"><div className="pointer-events-none absolute right-[-8vw] top-20 h-96 w-96 rounded-full border-[65px] border-red-600/10"/><div className="container relative z-10"><span className="eyebrow" data-aos="fade-up">Selected creative work</span><h1 className="display mt-7 max-w-5xl text-[clamp(64px,10vw,130px)]" data-aos="fade-up" data-aos-delay="80">Our Creative <span className="red">Portfolio.</span></h1><p className="muted mt-8 max-w-2xl text-lg" data-aos="fade-up" data-aos-delay="150">Explore our latest logo designs, branding projects, websites, and digital creative work.</p></div></section>
  <section className="section"><div className="container"><PortfolioGrid filterable/></div></section>
  <section className="relative overflow-hidden bg-red-600 py-24"><div className="pointer-events-none absolute inset-0 grid-bg opacity-40"/><div className="container relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><span className="text-xs font-extrabold uppercase tracking-[.2em]">Your brand could be next</span><h2 className="display mt-4 max-w-4xl text-[clamp(50px,7vw,92px)]">Like What You See? Let’s Create Your Brand Identity.</h2></div><OfferButton/></div></section>
</>}
