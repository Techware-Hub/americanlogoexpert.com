"use client";
import Image from "next/image";
import { useEffect,useRef,useState } from "react";
import { ArrowLeft,ArrowRight,ArrowUpRight } from "lucide-react";
import { portfolioCategories,portfolioItems,type PortfolioCategory } from "@/data/portfolio";

type PageToken=number|"ellipsis-left"|"ellipsis-right";
function pageTokens(total:number,current:number):PageToken[]{
  if(total<=7)return Array.from({length:total},(_,i)=>i+1);
  const tokens:PageToken[]=[1];
  if(current>4)tokens.push("ellipsis-left");
  const start=Math.max(2,current-1);const end=Math.min(total-1,current+1);
  for(let page=start;page<=end;page++)tokens.push(page);
  if(current<total-3)tokens.push("ellipsis-right");
  tokens.push(total);return tokens;
}

export default function PortfolioGrid({filterable=false,limit,featured=false,serviceSlug}:{filterable?:boolean;limit?:number;featured?:boolean;serviceSlug?:string}){
  const [activeCategory,setActiveCategory]=useState<"All"|PortfolioCategory>("All");
  const [currentPage,setCurrentPage]=useState(1);
  const [itemsPerPage,setItemsPerPage]=useState(12);
  const gridTop=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(!filterable)return;
    const updatePageSize=()=>{const count=window.innerWidth<768?6:window.innerWidth<1024?8:12;setItemsPerPage(previous=>{if(previous!==count)setCurrentPage(1);return count})};
    updatePageSize();window.addEventListener("resize",updatePageSize);return()=>window.removeEventListener("resize",updatePageSize);
  },[filterable]);

  const serviceItems=serviceSlug?portfolioItems.filter(item=>item.serviceSlug===serviceSlug):portfolioItems;
  const source=featured?serviceItems.filter(item=>item.featured):serviceItems;
  const filteredItems=source.filter(item=>activeCategory==="All"||item.category===activeCategory);
  const pageSize=filterable?itemsPerPage:(limit??filteredItems.length);
  const totalPages=Math.max(1,Math.ceil(filteredItems.length/pageSize));
  const safePage=Math.min(currentPage,totalPages);
  const startIndex=(safePage-1)*pageSize;
  const paginatedItems=filteredItems.slice(startIndex,startIndex+pageSize);
  const shownStart=filteredItems.length?startIndex+1:0;
  const shownEnd=Math.min(startIndex+pageSize,filteredItems.length);

  function selectCategory(category:"All"|PortfolioCategory){setActiveCategory(category);setCurrentPage(1)}
  function changePage(page:number){if(page<1||page>totalPages||page===safePage)return;setCurrentPage(page);requestAnimationFrame(()=>gridTop.current?.scrollIntoView({behavior:"smooth",block:"start"}))}

  return <div ref={gridTop} className="scroll-mt-28">
    {filterable&&<div className="mb-12 flex flex-wrap gap-2" role="group" aria-label="Filter portfolio projects">{portfolioCategories.map(tab=><button key={tab} onClick={()=>selectCategory(tab)} aria-pressed={activeCategory===tab} className={`btn min-h-11 px-4 transition-all duration-300 ${activeCategory===tab?'btn-primary':'btn-ghost'}`}>{tab}</button>)}</div>}
    <div key={`${activeCategory}-${safePage}-${pageSize}`} className="portfolio-page-enter grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {paginatedItems.map(item=><article key={item.id} className="premium-card group relative aspect-square cursor-pointer overflow-hidden rounded-md border border-white/10 bg-[#101115] shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-2 hover:scale-[1.03] hover:border-red-500 hover:shadow-2xl hover:shadow-red-500/30">
        <Image src={item.image} alt={item.alt} fill sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw" unoptimized={item.image.endsWith(".gif")} className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"/>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-95"/>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex rounded-sm border border-red-400/40 bg-red-600/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.16em] text-white">{item.category}</span>
          <div className="mt-3 flex items-end justify-between gap-3"><h3 className="display text-2xl text-white">{item.title}</h3><ArrowUpRight className="shrink-0 text-white" size={20}/></div>
        </div>
      </article>)}
    </div>
    {!paginatedItems.length&&<div className="card p-12 text-center text-zinc-400">No projects found in this category.</div>}
    {filterable&&filteredItems.length>0&&<div className="mt-10 flex flex-col gap-5 rounded-md border border-white/10 bg-[#0d0e11] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
      <p className="shrink-0 text-center text-sm text-zinc-500 lg:text-left">Showing <span className="font-bold text-white">{shownStart}–{shownEnd}</span> of <span className="font-bold text-white">{filteredItems.length}</span> projects</p>
      {totalPages>1&&<nav className="flex flex-wrap items-center justify-center gap-2" aria-label="Portfolio pagination">
        <button onClick={()=>changePage(safePage-1)} disabled={safePage===1} className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-white/15 bg-[#15161a] px-4 text-[11px] font-extrabold uppercase tracking-wider text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/20 disabled:pointer-events-none disabled:opacity-30" aria-label="Previous portfolio page"><ArrowLeft size={15}/>Previous</button>
        {pageTokens(totalPages,safePage).map(token=>typeof token==="number"?<button key={token} onClick={()=>changePage(token)} aria-label={`Go to page ${token}`} aria-current={safePage===token?"page":undefined} className={`grid h-11 w-11 place-items-center rounded-sm border text-xs font-extrabold transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/20 ${safePage===token?'border-red-500 bg-red-600 text-white shadow-lg shadow-red-500/25':'border-white/15 bg-[#15161a] text-zinc-300'}`}>{token}</button>:<span key={token} className="grid h-11 w-7 place-items-center text-zinc-600" aria-hidden="true">…</span>)}
        <button onClick={()=>changePage(safePage+1)} disabled={safePage===totalPages} className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-white/15 bg-[#15161a] px-4 text-[11px] font-extrabold uppercase tracking-wider text-zinc-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-red-500 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/20 disabled:pointer-events-none disabled:opacity-30" aria-label="Next portfolio page">Next<ArrowRight size={15}/></button>
      </nav>}
    </div>}
  </div>;
}
