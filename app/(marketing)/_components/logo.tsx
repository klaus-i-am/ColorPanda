import Image from "next/image";
import { Poppins } from "next/font/google";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});


const nunito = Nunito({ 
  weight: ['800'],
  subsets: ['latin'],
})

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image
                src="/logo3.png"
                width="45"
                height="45"
                alt="logo"
                className="dark:hidden"
            />
               <Link className={`text-gray-600 font-extrabold ${nunito.className} text-2xl tracking-wide`} href="/"
                    style={{ textShadow: "1px 2px 2px rgba(0, 0, 0, 0.2)" }} 
                >
                Color
                <span 
                    className="text-purple-600"
                >Panda</span>
               </Link>
        </div>
    );
}    