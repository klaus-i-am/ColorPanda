import Image from "next/image";
import { Nunito, Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const nunito = Nunito({ 
    weight: ['800'],
    subsets: ['latin'],
});


export const Upgrade = () => {
    return (
        <div className="hidden md:flex flex-col justify-start gap-x-2">
            <h2 className={`${nunito.className} font-normal text-slate-700`}>
                Current Plan: <span className={cn`text-slate-500 ${nunito.className} font-normal tracking-wide `}>Free</span>
            </h2>
            <Link href="/upgrade" className="text-sm text-blue-500 underline mt-1">
                    Upgrade Now
            </Link>
        </div>
    );
}    