import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Logo = (className) => {
  return (
    <div className={cn(className)}>
      <span className="text-xl font-bold">HOBBIVERSE LOGO</span>
      {/* <Image src={'/image'} alt="Hobbiverse Logo" /> */}
    </div>
  );
};

export default Logo;
