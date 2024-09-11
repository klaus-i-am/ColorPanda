'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from "next/link";
import Image from "next/image";
import { Nunito } from "next/font/google";

const nunito = Nunito({ 
  weight: ['400','500','600','700','800'],
  subsets: ['latin'],
});

export const Heading = () => {
  return (
    <div className=" max-h-[540px] w-full h-screen flex items-center justify-center align-center">
      <Card className="max-h-[400px] max-w-[500px] shadow-lg">
        <CardHeader>
          <CardTitle className={`flex justify-center items-center text-3xl text-gray-600 font-extrabold ${nunito.className} tracking-wide`}>
            <Image
              src="/logo3.png"
              width="45"
              height="45"
              alt="ColorMuse logo"
              className="object-contain"
            />
            Color
            <span className='text-purple-600'>Panda</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
        <p className="text-xl font-bold text-center text-gray-700 mb-4">
          AI-based color palette generator
        </p>
        <p className="text-md text-center text-gray-600 mb-6">
          Turn words into stunning palettes with ColorMuse. Instant, inspired, and intelligent color creation.
        </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link href="/generate" className="w-full">
            <Button className="w-full text-xl font-header font-bold py-6 px-8 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-all duration-300">
              <span className="flex items-center justify-center font-bold font-header tracking-wide">
                Generate
                <ArrowRightIcon className="w-6 h-6 ml-2" />
              </span>
            </Button>
          </Link>
          <Link href="/sign-in" className="w-full">
            <Button 
              variant="outline"
              className="w-full text-xl font-header tracking-wide font-bold py-6 px-8 rounded-xl text-gray-800 bg-white border-2 border-gray-800 hover:bg-gray-100 transition-all duration-300"
            >
              Explore
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}