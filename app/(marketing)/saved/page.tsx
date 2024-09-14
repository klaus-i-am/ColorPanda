'use client';

import React, { useEffect, useState } from 'react';
import { Nunito } from "next/font/google";
import { LoaderCircle } from "lucide-react";
import { SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const nunito = Nunito({
  weight: ['400','500','600','700','800'],
  subsets: ['latin'],
});

interface Palette {
  _id: string;
  paletteName: string;
  colors: { hexValue: string; rgbValue: string }[];
}

export default function SavePage() {
  const [palettes, setPalettes] = useState<Palette[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const response = await fetch('/api/colors/saved');
        if (!response.ok) {
          throw new Error('Failed to fetch saved palettes');
        }
        const data = await response.json();
        console.log('Fetched palettes:', data);
        setPalettes(data.colors);
      } catch (err) {
        console.error('Error fetching palettes:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPalettes();
  }, []);

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

  return (
    <div className={`flex flex-col items-center ${nunito.className}`}>
      <h1 className="text-3xl font-bold mb-6">Saved Palettes</h1>
      <div className='w-[90%] flex flex-wrap gap-x-2 gap-y-2 justify-start items-center'>
        {palettes.map((palette) => (
          <Link href={`/palette/${palette._id}`} key={palette._id}>
            <div className='relative flex flex-row justify-center items-center hover:scale-[.98] hover:cursor-pointer transition-all duration-300 rounded-xl'
              style={{ boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)' }}
            >
              <div className='flex flex-row justify-center items-center rounded-xl w-[275px] h-[175px]'>
                <div className='absolute flex flex-row h-full w-full'>
                  {palette.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`w-[55px] h-full ${index === 0 ? 'rounded-l-xl' : ''} ${index === palette.colors.length - 1 ? 'rounded-r-xl' : ''}`}
                      style={{ backgroundColor: color.hexValue }}
                    />
                  ))}
                </div>
              </div>
              <span
                className='absolute bottom-3 left-3 z-40 py-1 px-3 text-md rounded-lg bg-gray-200 text-slate-700 font-bold font-header flex align-center items-center'
                title={palette.paletteName || 'Unnamed Palette'}
              >
                <SparklesIcon className='w-5 h-5 mr-2'/>
                {palette.paletteName || 'Unnamed Palette'}
              </span>
            </div>
          </Link>
        ))}
        {palettes.length === 0 && (
          <div className='text-gray-500'>No saved palettes available</div>
        )}
      </div>
    </div>
  );
}