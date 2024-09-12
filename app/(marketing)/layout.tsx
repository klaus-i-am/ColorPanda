'use client';
import { Spinner } from "@/components/spinner";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Footer } from './_components/footer';
import { usePathname } from 'next/navigation';

const MarketingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return ( 
    <div className={`h-screen ${isHomePage ? "bg-[url('/bg.png')] bg-cover bg-no-repeat bg-bottom bg-fixed" : ""}`}>
      <Navbar />
      <main className="">
        {children}
      </main>
    </div>
   );
}
 
export default MarketingLayout;