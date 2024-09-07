'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from 'lucide-react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

const TrialPage = () => {
  interface Color {
    HTML_Color_Name: string;
    Hex: string;
    RGB: string;
  }

  const [input, setInput] = useState('');
  const [palette, setPalette] = useState<Color[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedPrompt, setSavedPrompt] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 20); // Limit to 20 characters
    setInput(value);
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
        console.log('Extracted palette colors:', colorsArray);
        setPalette(colorsArray);
        setSavedPrompt(input); // Save the current prompt
        setInput(''); // Clear the input after successful submission
      } else {
        console.error('Invalid palette data:', data.palette);
        setError("Invalid palette data returned from API.");
      }
    } catch (err) {
      console.error('Error occurred:', err);
      setError("Failed to generate the palette.");
    } finally {
      setIsLoading(false);
    }
  };

  const hexToRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div className="min-w-[40%] mt-[40px]">
        <form onSubmit={handleSubmit}>
          <div className="text-wrap text-center flex flex-col justify-center">
            <h1 className="mt-2 text-2xl font-extrabold font-header text-[rgba(60,66,77,1)]">
              Generate a new palette
            </h1>
            <span className="my-2 text-lg text-gray-500 font-bold font-header">Enter keywords for image or mood of color</span>
            <Input
              className="max-w-lg p-7 pl-4 mb-8 bg-gray-200 placeholder:font-header placeholder:font-extrabold placeholder:text-slate-400 rounded-xl placeholder:text-lg font-header font-extrabold text-lg 
              focus:outline-0 focus-visible:border-transparent focus-visible:ring-0 text-[#607d8b]"
              value={input}
              placeholder="Ocean daydreams"
              onChange={handleInputChange}
              maxLength={20}
            />
          </div>
          <div className="">
            <Button type="submit" disabled={isLoading} className='w-full text-xl font-header font-bold py-8 px-8 rounded-xl text-white bg-gray-500 outline-none focus:outline-0'>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                    <span className="flex flex-row align-center items-center">
                        <span className="font-bold font-header text-xl">Generate</span>
                        <ArrowRightIcon className="w-6 h-6 ml-2" />
                    </span>
                </>
              )} 
            </Button>
          </div>
        </form>
      </div>
      
      {palette.length > 0 && (
        <div className="w-[80%] mt-5 py-4 flex flex-col justify-center items-start border border-red-500 border-solid">
          {savedPrompt && (
            <div className="w-full flex flex-row items-center border border-solid border-red-500 justify-between px-4">
                <h2 className="flex flex-row align-center items-center text-2xl text-slate-700 font-bold my-4">
                <SparklesIcon className="size-8 text-yellow-400 mr-2" />
                {savedPrompt}
                </h2>
                <div className="flex">
                <div className="flex flex-row align-center items-center">
                    <Button type="submit" disabled={isLoading} className='w-full text-xl font-header font-bold mr-6 py-6 px-8 rounded-lg text-slate-600 bg-gray-200/50 hover:bg-gray-200/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
                        <AdjustmentsHorizontalIcon className="w-6 h-6 mr-2 stroke-2" />
                        Adjust
                    </Button>
                </div>
                <div className="flex flex-row align-center items-center">
                    <Button type="submit" disabled={isLoading} className='w-full text-xl font-header font-bold mr-6 py-6 px-8 rounded-lg text-slate-600 bg-gray-200/50 hover:bg-gray-200/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
                        <HeartIcon className="w-6 h-6 mr-2 stroke-2" />
                        Save
                    </Button>
                </div>
                </div>
            </div>
          )}
          <div className="flex flex-row justify-center items-stretch">
            {palette.map((color, index) => (
              <div key={index} className="flex flex-col justify-start items-center w-[180px] mx-2">
                <div
                  className={`w-full h-[320px] rounded-3xl p-6 hover:scale-[.97] transition-all ease-in-out duration-300 hover:cursor-pointer`}
                  style={{ 
                    backgroundColor: color.Hex, 
                    boxShadow: `0px 8px 20px ${hexToRGBA(color.Hex, 0.5)}` 
                  }}
                >
                </div>
                <div 
                  className="w-12 h-12 my-3 border-4 border-solid border-white/30 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: color.Hex }}
                >
                </div>
                <div className="w-full text-center px-2">
                  <h2 
                    className="font-extrabold font-header text-md mb-1 truncate"
                    style={{ color: color.Hex }}
                    title={color.HTML_Color_Name}
                  >
                    {color.HTML_Color_Name}
                  </h2>
                  <p className="font-medium hover:bg-slate-200 hover:cursor-pointer py-1 font-header text-xs my-1 text-gray-500 truncate" title={color.Hex}>
                    {color.Hex}
                  </p>
                  <p className="font-medium hover:bg-slate-200 hover:cursor-pointer py-1 font-header text-xs my-1 text-gray-500 truncate" title={color.RGB}>
                    {color.RGB}
                  </p>
                </div>
              </div>  
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrialPage;