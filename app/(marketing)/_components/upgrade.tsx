import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { Nunito } from "next/font/google";

const nunito = Nunito({ 
    weight: ['800'],
    subsets: ['latin'],
});

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});

export const Upgrade = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
          <h2>
            Current Plan ||
            Basic
          </h2>
        </div>
    );
}    