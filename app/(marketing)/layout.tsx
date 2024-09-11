'use client';
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Footer } from './_components/footer';

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {

  return ( 
    <div className="dark:bg-[#1F1F1F]">
      <Navbar />
      <main className="h-full">
        {children}
      </main>
    </div>
   );
}
 
export default MarketingLayout;