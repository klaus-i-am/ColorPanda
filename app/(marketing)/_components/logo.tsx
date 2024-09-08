import Image from "next/image";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import Link from "next/link";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image
                src="/logo.png"
                width="24"
                height="24"
                alt="logo"
                className="dark:hidden"
            />
            <Image
                src="/logo.png"
                width="24"
                height="24"
                alt="logo"
                className="hidden dark:block"
            />
               <Link className="text-gray-600 font-extrabold font-header text-2xl tracking-wide" href="/">
                Color
                <span className="text-purple-600">Muse</span>
               </Link>
        </div>
    );
}    