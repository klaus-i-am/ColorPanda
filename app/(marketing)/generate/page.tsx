'use client';

import { Button } from "@/components/ui/button";
//import { Button, ButtonGroup } from '@chakra-ui/react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from 'lucide-react';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Make the API call to get the color palette
      const response = await fetch('/api/completion', {
        method: 'POST', // Use POST request
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }), // Send the prompt as JSON
      });

      // Throw an error if the response is not ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse the API response
      const data = await response.json();
      console.log('Full API Response:', data);

      // Extract color values into an array
      if (data.palette && typeof data.palette === 'object') {
        const colorsArray = Object.values(data.palette); // Extract values from the object
        console.log('Extracted palette colors:', colorsArray);
        setPalette(colorsArray);  // Set the colors array from the object values
        console.log("Prompt: ", input);
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
    // Helper function to convert hex to rgba
    const hexToRGBA = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

  return (
    <div className="h-full flex flex-col items-center">
        {/* generate field */}
      <div className="min-w-[40%] mt-[40px]">
        <form onSubmit={handleSubmit}>
          <div className="text-wrap text-center flex flex-col justify-center">
            <h1 className="mt-2 text-2xl font-extrabold font-header text-[rgba(60,66,77,1)]">
                Generate a new palette
                <br/> 
            </h1>
                <span className="my-2 text-lg text-gray-500 font-bold font-header">Enter keywords for image or mood of color</span>
                <Input
                    className="max-w-lg p-7 pl-4 mb-8 bg-gray-200 placeholder:font-header placeholder:font-extrabold placeholder:text-slate-400 rounded-xl placeholder:text-lg font-header font-extrabold text-lg 
                    focus:outline-0
                    focus-visible:border-transparent
                    focus-visible:ring-0 text-[#607d8b]"
                    value={input}
                    placeholder="Ocean daydreams"
                    onChange={(e) => setInput(e.target.value)}
                    />
            
            {/* {error && <p className="text-red-500">{error}</p>} */}
          </div>
          <div className="">
            <Button type="submit" disabled={isLoading} className='w-full text-xl font-header font-bold py-8 px-8 rounded-xl text-white bg-gray-500 outline-none focus:outline-0'>
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                </>
            ) : (
                'Generate'
            )} 
            </Button>
          </div>
        </form>
      </div>
      {palette == false && (
         <>
       
            <div className="w-[80%] mt-5 py-4 flex flex-row justify-center items-center">
                {/* User's Prompt */}
                <div className="flex flex-col justify-left">
                    <h2 className="text-3xl font-bold font-header ml-5 my-4 t">Redrum</h2>

                    <div className="flex flex-row justify-center items-center">
                  
                        <div className="flex flex-col justify-center items-center">
                        {/* Map palette color object */}
                        <div
                            className="w-[250px] h-[400px] rounded-3xl mx-5 p-6 hover:scale-[.97] transition-all ease-in-out duration-300 hover:cursor-pointer"
                            style={{ backgroundColor: '#ff6b6b', boxShadow: '0px 8px 20px rgba(255, 107, 107, 0.5)' }}
                        >
                        </div>
                        <div className="w-16 h-16 my-4 border-4 border-solid border-white/30 bg-[#ff6b6b] rounded-full flex items-center justify-center">
                        </div>
                       <div className="">
                        <span className="text-center font-header font-bold bg-slate-50/45">
                            <h2 className="font-extrabold
                             font-header text-2xl mb-4 text-[#ff6b6b]">Bittersweet</h2>
                            <p className="font-lg font-header mb-2 text-gray-400 hover:bg-slate-100 hover:cursor-pointer rounded-sm">#ff6b6b</p>
                            <p className="font-lg font-header mb-2 text-gray-400 hover:bg-slate-100 hover:cursor-pointer rounded-sm px-1">rgb(255, 107, 107)</p>
                        </span>
                       </div>
                        </div>  
                        <div className="flex flex-col justify-center items-center">
                        {/* Map palette color object */}
                        <div
                            className="w-[250px] h-[400px] rounded-3xl mx-5 p-6 hover:scale-[.97] transition-all ease-in-out duration-300 hover:cursor-pointer"
                            style={{ backgroundColor: '#ffcb5c', boxShadow: '0px 8px 20px rgba(255, 203, 92, 0.5)' }}
                        >
                        </div>
                        <div className="w-16 h-16 my-4 border-4 border-solid border-white/30 bg-[#ffcb5c] rounded-full flex items-center justify-center">
                        </div>
                       <div className="">
                        <span className="text-center font-header font-bold bg-slate-50/45">
                            <h2 className="font-extrabold
                             font-header text-2xl mb-4 text-[#ffcb5c]">Golden Tainoi

                             </h2>
                           <p className="font-lg font-header mb-2 text-gray-400 hover:bg-slate-100 hover:cursor-pointer rounded-sm">#232343</p>
                           <p className="font-lg font-header mb-2 text-gray-400 hover:bg-slate-100 hover:cursor-pointer rounded-sm px-1">rgb(255, 203, 92)</p>
                        </span>
                       </div>
                        </div>  
                        <div className="flex flex-col justify-center items-center">
                        {/* Map palette color object */}
                        <div
                            className="w-[250px] h-[400px] rounded-3xl mx-5 p-6 hover:scale-[.97] transition-all ease-in-out duration-300 hover:cursor-pointer"
                            style={{ backgroundColor: '#a8d0e6', boxShadow: '0px 8px 20px rgba(168, 208, 230, 0.5)' }}
                        >
                        </div>
                        <div className="w-16 h-16 my-4 border-4 border-solid border-white/30 bg-[#a8d0e6] rounded-full flex items-center justify-center">
                        </div>
                       <div className="">
                        <span className="text-center font-header font-bold bg-slate-50/45">
                            <h2 className="font-extrabold
                             font-header text-2xl mb-4 text-[#a8d0e6]">Regent St Blue</h2>
                           <p className="font-lg font-header mb-2 text-gray-400 hover:bg-slate-100 hover:cursor-pointer rounded-sm">#232343</p>
                           <p className="font-lg font-header mb-2 text-gray-400 hover:bg-slate-100 hover:cursor-pointer rounded-sm px-1">rgb(12,12,12)</p>
                        </span>
                       </div>
                        </div>  
                        <div className="flex flex-col justify-center items-center">
                        {/* Map palette color object */}
                        <div
                            className="w-[250px] h-[400px] rounded-3xl mx-5 p-6 hover:scale-[.97] transition-all ease-in-out duration-300 hover:cursor-pointer"
                            style={{ backgroundColor: '#690571', boxShadow: '0px 8px 20px rgba(105, 5, 113, 0.5)' }}
                        >
                        </div>
                        <div className="w-16 h-16 my-4 border-4 border-solid border-white/30 bg-[#690571] rounded-full flex items-center justify-center">
                        </div>
                       <div className="">
                        <span className="text-center font-header font-bold bg-slate-50/45">
                            <h2 className="font-extrabold
                             font-header text-2xl mb-4 text-[#690571]">Clairvoyant</h2>
                            <p className="font-lg font-header mb-2 text-gray-400 hover:bg-slate-100 hover:cursor-pointer rounded-sm">#690571</p>
                            <p className="font-lg font-header mb-2 text-gray-400 hover:bg-slate-100 hover:cursor-pointer rounded-sm px-1">rgb(105, 5, 113)</p>
                        </span>
                       </div>
                        </div>  
                    </div>
                </div>
            </div>
         </>
      )}
      {palette && (
        <>
            {/* User generated content */}
            <div className="w-[80%] mt-5 py-4flex flex-col justify-center items-center">
                {/* User's Prompt */}
                <h2 className="text-lg font-bold my-4">{input}</h2>
                <div className="flex flex-row justify-center items-center">
                    {/* Map palette color object */}
                    {palette.map((color, index) => (
                        <div key={index} className="flex flex-col justify-center items-center">
                        {/* Map palette color object */}
                        <div
                            className={`w-[250px] h-[400px] rounded-3xl mx-5 p-6 hover:scale-[.97] transition-all ease-in-out duration-300 hover:cursor-pointer`}
                            style={{ 
                                backgroundColor: color.Hex, 
                                boxShadow: `0px 8px 20px ${hexToRGBA(color.Hex, 0.5)}` 
                              }}
                        >
                        </div>
                        <div 
                            className={`w-16 h-16 my-4 border-4 border-solid border-white/30 rounded-full flex items-center justify-center`}
                            style={{ backgroundColor: color.Hex }}
                        >
                        </div>
                       <div className="">
                        <span className="text-center font-header font-bold bg-slate-50/45">
                            <h2 
                                className={`font-extrabold font-header text-2xl mb-4`}
                                style={{ color: color.Hex }}
                             >{color.HTML_Color_Name
                             }</h2>
                            <p className="font-lg font-header mb-2 text-gray-400 hover:bg-slate-100 hover:cursor-pointer rounded-sm">{color.Hex}</p>
                            <p className="font-lg font-header mb-2 text-gray-400 hover:bg-slate-100 hover:cursor-pointer rounded-sm px-1">{color.RGB}</p>
                        </span>
                       </div>
                        </div>  
                    ))}
                </div>
            </div>
        </>
      )}
    </div>
  );
};

export default TrialPage;
