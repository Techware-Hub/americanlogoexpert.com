"use client";
import { Gift } from "lucide-react";

export default function OfferButton(){
  return <button type="button" className="btn btn-primary" onClick={()=>window.dispatchEvent(new Event("open-discount-modal"))}>Claim Discount <Gift size={17}/></button>;
}
