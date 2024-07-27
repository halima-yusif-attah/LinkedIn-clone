'use client'

import { SiWhatsapp } from "react-icons/si";
import { GrInstagram } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { useUser } from "@clerk/nextjs";

function ShareOptions() {
    const { user } = useUser();
    if (!user) return null;

    try {
        
    } catch (error) {
        
    }
  return <div>ShareOptions
    <div className="">
        <SiWhatsapp size={32} />
      <span className="ml-2">Share on Whatsapp</span>
    </div>
  </div>;
}

export default ShareOptions;
