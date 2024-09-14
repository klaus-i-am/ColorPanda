'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Nunito } from "next/font/google";
import { LoaderCircle } from "lucide-react";

const nunito = Nunito({
  weight: ['400','500','600','700','800'],
  subsets: ['latin'],
});

interface Color {
  hexValue: string;
  rgbValue: string;
}

interface Palette {
  _id: string;
  paletteName: string;
  colors: Color[];
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
        setPalette(data.palette);
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

  return (
    <div className={`flex flex-col items-center ${nunito.className}`}>
      <h1 className="text-3xl font-bold mb-6">{palette.paletteName}</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {palette.colors.map((color, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className="w-32 h-32 rounded-lg shadow-md" 
              style={{ backgroundColor: color.hexValue }}
            ></div>
            <p className="mt-2 font-semibold">{color.hexValue}</p>
            <p className="text-sm">{color.rgbValue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}