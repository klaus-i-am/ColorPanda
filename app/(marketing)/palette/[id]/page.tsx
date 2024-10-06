'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Nunito } from "next/font/google";
import SharePalette from '../../generate/_components/SharePalette';
import { LoaderCircle } from "lucide-react";

const nunito = Nunito({
  weight: ['400','500','600','700','800'],
  subsets: ['latin'],
});

interface Color {
  hexValue: string;
  rgbValue: string;
  HTML_Color_Name?: string; 
}

interface Palette {
  _id: string;
  paletteName: string;
  colors: Color[];
}
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

export default function PalettePage() {
  const params = useParams();
  const [palette, setPalette] = useState<Palette | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPalette = async () => {
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

  if (isLoading) {
    return (
      <div className="absolute z-50 w-full h-screen flex justify-center items-center">
        <LoaderCircle className="w-10 h-10 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!palette) {
    return <div>Palette not found</div>;
  }
  const hexToRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };


  return (
    <div className={`flex flex-col items-center ${nunito.className} `}>
      <h1 className="text-3xl font-bold mb-6">{palette.paletteName}</h1>
      <div 
        className="w-full flex flex-wrap justify-center" >
        {palette.colors.map((color, index) => (
          <div key={index} className={`flex flex-col items-center rounded-3xl hover:shadow-[shadow-[0_50px_25px_-24px_${hexToRGBA(color.hexValue, 0.5)}]`}
          style={{  boxShadow: `0px 8px 20px ${hexToRGBA(color.hexValue, 0.5)}`  }}
          >
            <div
              className={`w-48 h-[450px] rounded-lg flex flex-col relative px-5 ${
                index === 0 
                  ? 'rounded-tl-3xl rounded-bl-3xl rounded-tr-none rounded-br-none' 
                  : 'rounded-none'
              } ${index === 4 && 'rounded-tr-3xl rounded-br-3xl'}`}
              style={{ 
                backgroundColor: color.hexValue, 
                //boxShadow: `0px 10px 20px ${hexToRGBA(color.hexValue, 0.5)}` 
              }}
            >
              <div className={`absolute bottom-5 tracking-wide font-bold text-white ${nunito.className}`}>
                <h3 className={`mt-2 font-extrabold ${nunito.className}`}>{color.HTML_Color_Name}</h3>
                <p className="font-semibold">{color.hexValue}</p>
                <p className="text-sm">{color.rgbValue}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SharePalette />
    </div>
  );
}