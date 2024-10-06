'use client';
import { Button } from "@/components/ui/button";
import PandaLogo   from "@/public/logo3.png";
import { Nunito } from "next/font/google";
import Image from "next/image";

const nunito = Nunito({
    weight: ['400','500','600','700','800'],
    subsets: ['latin'],
  });

export const Footer = () => {
    return ( 
        <div className={`flex items-center w-full p-6 bottom-0 mt-[5%] text-white font-bold ${nunito.className}  bg-[#2d2d2d]`}>
            <Image 
                src={PandaLogo}
                width="40"
                height="40"
                alt="ColorPanda logo"
                className="object-contain mr-2"
            />
            <h3 className={`w-[300px] font-bold ${nunito.className}`}>
                {`Made with <3 by `}
                <a href="https://x.com/dev_klaus" target="_blank" rel="noopener noreferrer"
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
 