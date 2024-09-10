import React from 'react';
import { Button } from "@/components/ui/button";
import { SparklesIcon, HeartIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import ColorBox from './ColorBox';
import { Nunito } from "next/font/google";

const nunito = Nunito({ 
    weight: ['800'],
    subsets: ['latin'],
});

interface GeneratedPaletteProps {
  savedPrompt: string;
  palette: ColorType[];
  handleAdjustAllColors: () => void;
  hexToRGBA: (hex: string, alpha: number) => string;
}

const GeneratedPalette: React.FC<GeneratedPaletteProps> = ({ savedPrompt, palette, handleAdjustAllColors, hexToRGBA }) => (
  <div className="w-[80%] mt-5 py-4 flex flex-col justify-center items-center">
    <div className="w-full flex flex-row items-center justify-between px-4">
      <h2 className={`flex flex-row align-center items-center text-2xl text-slate-700 font-bold ${nunito.className} my-4`}>
        <SparklesIcon className="size-8 text-yellow-400 mr-2" />
        {savedPrompt}
      </h2>
      <div className="flex">
        <Button onClick={handleAdjustAllColors} className='w-full text-xl font-header font-bold mr-6 py-6 px-8 rounded-lg text-slate-600 bg-gray-200/50 hover:bg-gray-200/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
          <AdjustmentsHorizontalIcon className="w-6 h-6 mr-2 stroke-2" />
          Adjust
        </Button>
        <Button className='w-full text-xl font-header font-bold mr-6 py-6 px-8 rounded-lg text-slate-600 bg-gray-200/50 hover:bg-gray-200/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
          <HeartIcon className="w-6 h-6 mr-2 stroke-2" />
          Save
        </Button>
      </div>
    </div>
    <div className="flex flex-row justify-center items-stretch">
      {palette.map((color, index) => (
        <ColorBox key={index} color={color} hexToRGBA={hexToRGBA} />
      ))}
    </div>
  </div>
);

export default GeneratedPalette;