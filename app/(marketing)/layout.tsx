'use client';
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {

  return ( 
    <div className="h-full dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="h-full pt-[7%]">
        {children}
      </main>
    </div>
   );
}
 
export default MarketingLayout;