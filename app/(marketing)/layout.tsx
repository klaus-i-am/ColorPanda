'use client';
import { Spinner } from "@/components/spinner";
import { Navbar } from "./_components/navbar";
import { Footer } from './_components/footer';
import { usePathname } from 'next/navigation';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from 'react';

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const router = useRouter();

  if (status === "loading") {
    return <Spinner />;
  }

  // if user is already logged in, redirect to history page
  if (session) {
    router.push('/history');
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