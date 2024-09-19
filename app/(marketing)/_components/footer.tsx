'use client';
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    weight: ['400','500','600','700','800'],
    subsets: ['latin'],
  });

export const Footer = () => {
    return ( 
        <div className={`flex items-center w-full p-6 mt-[5%] text-white font-bold ${nunito.className}  bg-[#2d2d2d]`}>
            <h3 className={`w-[300px] font-bold ${nunito.className}`}>{`Made with <3 by `}
                <a href="https://www.linkedin.com/in/jackson-kim-3318821a5/" target="_blank" rel="noopener noreferrer"
                    className="text-blue-500 underline"
                >
                    @klaus_dev
                </a>
                {' '}
                {`${new Date().getFullYear()}`}
                {' '}
                {`ColorPanda`}
            </h3>
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2">
                <Button variant="ghost" size="sm">
                Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                Terms & Conditions
                </Button>
            </div>
        </div>
    );
}
 