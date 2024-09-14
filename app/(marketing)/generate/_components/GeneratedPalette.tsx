import React from 'react';
import { Button } from "@/components/ui/button";
import { SparklesIcon, HeartIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import ColorBox from './ColorBox';
import { Nunito } from "next/font/google";
import { useRouter } from 'next/navigation';

const nunito = Nunito({ 
    weight: ['800'],
    subsets: ['latin'],
});

interface ColorType {
  color: string;
  name: string;
}

interface GeneratedPaletteProps {
  savedPrompt: string;
  palette: ColorType[];
  handleAdjustAllColors: () => void;
  hexToRGBA: (hex: string, alpha: number) => string;
}

const GeneratedPalette: React.FC<GeneratedPaletteProps> = ({ savedPrompt, palette, handleAdjustAllColors, hexToRGBA }) => {
  const router = useRouter();

  const handleSave = async () => {
    try {
      console.log('Palette to save:', palette);
  
      if (!palette || palette.length === 0) {
        throw new Error('No palette data to save');
      }
  
      const formattedColors = palette.map(color => ({
        hexValue: color.Hex,
        rgbValue: color.RGB
      }));
  
      const response = await fetch('/api/colors/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paletteName: savedPrompt,
          colors: formattedColors
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save palette: ${JSON.stringify(errorData)}`);
      }
  
      const data = await response.json();
      console.log('Saved palette response:', data);
  
      // Redirect to the save page after successful save
      router.push('/saved');
    } catch (error) {
      console.error('Error saving palette:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  const handleAdjust = () => {
    handleAdjustAllColors();
    // After adjusting, save the updated palette
    handleSave();
  };

  return (
    <div className="w-[80%] mt-5 py-4 flex flex-col justify-center items-center">
      <div className="w-full flex flex-row items-center justify-between px-4">
        <h2 className={`flex flex-row align-center items-center text-2xl text-slate-700 font-bold ${nunito.className} my-4`}>
          <SparklesIcon className="size-8 text-yellow-400 mr-2" />
          {savedPrompt}
        </h2>
        <div className="flex">
          <Button onClick={handleAdjust} className='w-full text-xl font-header font-bold mr-6 py-6 px-8 rounded-lg text-slate-600 bg-gray-200/50 hover:bg-gray-200/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
            <AdjustmentsHorizontalIcon className="w-6 h-6 mr-2 stroke-2" />
            Adjust
          </Button>
          <Button onClick={handleSave} className='w-full text-xl font-header font-bold mr-6 py-6 px-8 rounded-lg text-slate-600 bg-gray-200/50 hover:bg-gray-200/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
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
};

export default GeneratedPalette;