import React from 'react';
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Copy } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { LoaderCircle } from "lucide-react";

interface Palette {
  _id: string;
  paletteName: string;
  colors: Color[];
}

interface Color {
  hexValue: string;
  rgbValue: string;
  HTML_Color_Name?: string; // Make this optional
}
const SharePalette: React.FC = () => {
  const params = useParams();
  const [palette, setPalette] = useState<Palette | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPalette = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/colors/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch palette');
        }
        const data = await response.json();
        // Add color names if they're missing
        const updatedPalette = {
          ...data.palette,
          colors: data.palette.colors.map((color: Color) => ({
            ...color,
            HTML_Color_Name: color.HTML_Color_Name || generateColorName(color.hexValue)
          }))
        };
        setPalette(updatedPalette);
        console.log("DATA PALETTE: ", updatedPalette);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
  
    if (params.id) {
      fetchPalette();
    }
  }, [params.id]);


  function generateColorName(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    if (r > g && r > b) return 'Red Shade';
    if (g > r && g > b) return 'Green Shade';
    if (b > r && b > g) return 'Blue Shade';
    if (r === g && g === b) return 'Gray Shade';
    return 'Mixed Shade';
  }

  // if (isLoading) {
  //   return (
  //     <div className="absolute z-50 w-full h-screen flex justify-center items-center">
  //       <LoaderCircle className="w-10 h-10 rounded-full animate-spin" />
  //     </div>
  //   );
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!palette) {
    return <div>Palette not found</div>;
  }

  
  return (
    <div className='w-full pt-5 pb-9 mt-12 flex flex-col justify-center items-center border-y-[1px] border-solid border-gray-300/80'>
      <h2 className='text-gray-800 font-bold font-header text-2xl my-6'>Share Palette</h2>
      <div className='flex flex-row justify-center items-center'>
        {['Twitter', 'Facebook', 'Copy'].map((platform) => (
          <Button key={platform} className='w-full text-xl font-header font-bold mr-6 py-6 px-10 rounded-lg text-slate-600 bg-slate-700/80 hover:bg-slate-900/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
            {platform === 'Twitter' && <Twitter className='text-gray-300' />}
            {platform === 'Facebook' && <Facebook className='text-gray-300' />}
            <Link href={`/palette/${params.id}`}>
              {platform === 'Copy' && <Copy className='text-gray-300' />}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

// Add facebook, twitter share support
export default SharePalette;