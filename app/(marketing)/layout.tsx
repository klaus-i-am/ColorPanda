'use client';
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Footer } from './_components/footer';
import { usePathname } from 'next/navigation';
import { useSession, signIn } from "next-auth/react";
import React, { useState, useEffect } from 'react';

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

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