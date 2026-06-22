"use client";
import { useEffect } from "react";
import AOS from "aos";
export default function ClientEffects(){ useEffect(()=>{ AOS.init({duration:700,once:true,offset:70,easing:"ease-out-cubic"}); },[]); return null; }
