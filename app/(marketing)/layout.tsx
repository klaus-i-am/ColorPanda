'use client';
import { Spinner } from "@/components/spinner";
import { Navbar } from "./_components/navbar";
import { Footer } from './_components/footer';
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import React from 'react';

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  
  const { status } = useSession();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  if (status === "loading") {
    return <Spinner />;
  }

  return ( 
    <div className={`h-screen ${isHomePage ? "bg-[url('/bg.png')] bg-cover bg-no-repeat bg-bottom bg-fixed" : ""}`}>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
   );
}
 
export default MarketingLayout;