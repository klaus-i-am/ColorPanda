'use client';

import { useSession, signIn } from "next-auth/react";
import React, { useState } from 'react';
import PaletteForm from './_components/PaletteForm';
import GeneratedPalette from './_components/GeneratedPalette';
import SharePalette from './_components/SharePalette';
import RecentlyGenerated from './_components/RecentlyGenerated';
import AdjustAllColorsModal from './_components/AdjustAllColorsModal';
import {Button} from '@/components/ui/button';
import { redirect } from "next/navigation";

// ColorType interface//
interface ColorType {
  color: string;
  name: string;
}

const TrialPage: React.FC = () => {
  const { data: session, status } = useSession();

  const [input, setInput] = useState('');
  const [palette, setPalette] = useState<ColorType[]>([]);

  const [originalPalette, setOriginalPalette] = useState<ColorType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedPrompt, setSavedPrompt] = useState('');
  const [isAdjustingAll, setIsAdjustingAll] = useState(false);

  // If the session is loading, you might want to show a loading state
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  // If the user is not authenticated, you might want to show a login button or redirect
  // if (!session) {
  //   return (
  //     <div>
  //       <p>Please sign in to use this feature</p>
  //       <Button onClick={() => signIn()}>Sign In</Button>
  //     </div>
  //   );
  // }

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
    setIsLoading(true);
    try {
      const response = await fetch('/api/completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Full API Response:', data);

      if (data.palette && typeof data.palette === 'object') {
        const colorsArray = Object.values(data.palette);
        setPalette(colorsArray);
        setOriginalPalette(colorsArray); // Save the original palette
        setSavedPrompt(input);
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

  const handleAdjustAllColors = () => {
    setIsAdjustingAll(true);
  };

  const handleAdjustAllClose = () => {
    setIsAdjustingAll(false);
  };

  const handleAdjustAllApply = (newColors: ColorType[]) => {
    setPalette(newColors);
  };


  return (
    <div className="h-full flex flex-col items-center">
      <PaletteForm
        input={input}
        isLoading={isLoading}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      
      {/* if palette length is > 0 */}
      {palette.length > 0 && (
        <>
        {/* Generate Palette  */}
          <GeneratedPalette
            savedPrompt={savedPrompt}
            palette={palette}
            handleAdjustAllColors={handleAdjustAllColors}
            hexToRGBA={hexToRGBA}
          />
          {/* Share Palette */}
          <SharePalette />

          {/* user signed in */}
          {session && (
            <RecentlyGenerated />
          )}

          {/* Marketing here */}
        </>
      )}
  
      {/* user signed in  */}
      {isAdjustingAll && (
        <AdjustAllColorsModal
          colors={originalPalette}
          onClose={handleAdjustAllClose}
          onAdjustAll={handleAdjustAllApply}
        />
      )}
    </div>
  );
};

export default TrialPage;