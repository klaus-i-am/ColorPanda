'use client';

import { useSession, signIn } from "next-auth/react";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PaletteForm from './_components/PaletteForm';
import GeneratedPalette from './_components/GeneratedPalette';
import SharePalette from './_components/SharePalette';
import RecentlyGenerated from './_components/RecentlyGenerated';
import AdjustAllColorsModal from './_components/AdjustAllColorsModal';
import {LoaderCircle} from "lucide-react";
import {Button} from '@/components/ui/button';
import { redirect } from "next/navigation";
import Image from 'next/image';
import Logo from '@/public/logo3.png';

// ColorType interface//
interface ColorType {
  color: string;
  name: string;
}

const TrialPage: React.FC = () => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [input, setInput] = useState('');
  const [palette, setPalette] = useState<ColorType[]>([]);
  const [originalPalette, setOriginalPalette] = useState<ColorType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedPrompt, setSavedPrompt] = useState('');
  const [isAdjustingAll, setIsAdjustingAll] = useState(false);

  useEffect(() => {
    console.log('Session status:', status);
    console.log('Session data:', session);
    console.log('Palette length:', palette.length);
    
    const urlPrompt = searchParams.get('prompt');
    if (urlPrompt) {
      setInput(urlPrompt);
      generatePalette(urlPrompt);
    }
  }, [searchParams, status, session]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 25); // Limit to 20 characters
    setInput(value);
  };

  const hexToRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    generatePalette(input);
  };

  const handleAdjustAllColors = () => {
    setIsAdjustingAll(true);
  };

  const handleAdjustAllClose = () => {
    setIsAdjustingAll(false);
  };

  const handleAdjustAllApply = (newColors: ColorType[]) => {
    setPalette(newColors);
  };
  const generatePalette = async (prompt: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Full API Response:', data);

      if (data.palette && typeof data.palette === 'object') {
        const colorsArray = Object.values(data.palette);
        setPalette(colorsArray);
        setOriginalPalette(colorsArray);
        setSavedPrompt(prompt);
        setInput('');
      } else {
        setError("Invalid palette data returned from API.");
      }
    } catch (err) {
      console.error('Error occurred:', err);
      setError("Failed to generate the palette.");
    } finally {
      setIsLoading(false);
    }
  };
  if (status === "loading") {
    return (
      <div className="z-50 w-full h-screen flex justify-center items-center">
        <LoaderCircle className="w-10 h-10 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div className="flex flex-col items-center">
      {palette.length === 0 ? (
        <PaletteForm
          input={input}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        <>
          <GeneratedPalette
            savedPrompt={savedPrompt}
            palette={palette}
            handleAdjustAllColors={handleAdjustAllColors}
            hexToRGBA={hexToRGBA}
          />
          <SharePalette />
          {session && <RecentlyGenerated />}
          {isAdjustingAll && (
            <AdjustAllColorsModal
              colors={originalPalette}
              onClose={handleAdjustAllClose}
              onAdjustAll={handleAdjustAllApply}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TrialPage;