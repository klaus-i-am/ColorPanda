'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import Link from "next/link";

export const Heading = () => {
  return (
    <div className="h-screen max-h-[548px] w-full flex items-center justify-center align-center">
      <Card className="max-h-[400px] max-w-[500px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-gray-600 font-extrabold font-header tracking-wide">
            Color
            <span className='text-purple-600'>Muse</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-bold text-center text-gray-700 mb-4">
            Generate your ideal color palette
          </p>
          <p className="text-md text-center text-gray-600 mb-6">
            ColorMagic is an AI-powered color palette generator.
            Create stunning palettes from keywords or color moods you enter.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Link href="/generate" className="w-full">
            <Button className="w-full text-xl font-header font-bold py-6 px-8 rounded-xl text-white bg-gray-800 hover:bg-gray-700 transition-all duration-300">
              <span className="flex items-center justify-center">
                Generate
                <ArrowRightIcon className="w-6 h-6 ml-2" />
              </span>
            </Button>
          </Link>
          <Link href="/login" className="w-full">
            <Button 
              variant="outline"
              className="w-full text-xl font-header font-bold py-6 px-8 rounded-xl text-gray-800 bg-white border-2 border-gray-800 hover:bg-gray-100 transition-all duration-300"
            >
              Login
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
