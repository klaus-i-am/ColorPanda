import React from 'react';
import { Nunito } from "next/font/google";


const nunito = Nunito({ 
  weight: ['400','500','600','700','800'],
  subsets: ['latin'],
});

interface ColorType {
    Hex: string;
    HTML_Color_Name: string;
    RGB: string;
}

interface ColorBoxProps {
  color: ColorType;
  hexToRGBA: (hex: string, alpha: number) => string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ color, hexToRGBA }) => (
  <div className="flex flex-col justify-start items-center w-[180px] mx-2">
    <div
      className={`w-full h-[320px] rounded-3xl p-6 hover:scale-[.97] transition-all ease-in-out duration-300 hover:cursor-pointer`}
      style={{ 
        backgroundColor: color.Hex, 
        boxShadow: `0px 8px 20px ${hexToRGBA(color.Hex, 0.5)}` 
      }}
    />
    <div 
      className="w-12 h-12 my-3 border-4 border-solid border-white/30 rounded-full flex items-center justify-center"
      style={{ backgroundColor: color.Hex }}
    />
    <div className={`w-full text-center ${nunito.className} px-2`}>
      <h2 
        className={`font-extrabold tracking-wide ${nunito.className} text-gray-500 text-md mb-1 truncate`}
        style={{ color: color.Hex }}
        title={color.HTML_Color_Name}
      >
        {color.HTML_Color_Name}
      </h2>
      <p className={`font-extrabold hover:bg-slate-200 hover:cursor-pointer py-1 font-header text-xs my-1 text-gray-500 truncate`} title={color.Hex}>
        {color.Hex}
      </p>
      <p className={`font-extrabold hover:bg-slate-200 hover:cursor-pointer py-1 font-header text-xs my-1 text-gray-500 truncate`} title={color.RGB}>
        {color.RGB}
      </p>
    </div>
  </div>
);

export default ColorBox;