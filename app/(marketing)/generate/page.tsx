'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Loader2, X } from 'lucide-react';
import { Twitter, Facebook, Copy } from 'lucide-react';
import { SparklesIcon, HeartIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { XMarkIcon, ArrowRightIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import Color from 'color';
import colorNamer from 'color-namer';

// Color Adjustment Modal Component
interface ColorType {
  HTML_Color_Name: string;
  Hex: string;
  RGB: string;
}

const Modal = ({ children, onClose }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (isBrowser) {
    return ReactDOM.createPortal(
      <>
          <div className="fixed inset-0 flex justify-center bg-white z-50 top-52 self-center left-60 rounded-xl p-6 w-[60%] max-w-[90%] items-center h-[60%]"
          style={{ boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.15)' }}
          >
            <div className='w-[70%] max-w-full'>
              <button
                onClick={onClose}
                className="absolute top-2 right-2 m-2 bg-gray-200 p-1 rounded-sm text-gray-400 hover:text-gray-700"
              >
                <XMarkIcon className='w-6 h-6 font-bold stroke-2' />
              </button>
              {children}
            </div>
          </div>
      </>,
      document.body
    );
  } else {
    return null;
  }
};

const AdjustAllColorsModal = ({ colors, onClose, onAdjustAll }) => {
  const [brightness, setBrightness] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [temperature, setTemperature] = useState(0);

  const calculateAdjustedColors = (bright, sat, temp) => {
    return colors.map(color => {
      let newColor = Color(color.Hex);
      
      newColor = bright > 0 
        ? newColor.lighten(bright / 100)
        : newColor.darken(Math.abs(bright) / 100);
      
      newColor = sat > 0
        ? newColor.saturate(sat / 100)
        : newColor.desaturate(Math.abs(sat) / 100);
      
      newColor = newColor.rotate(temp);

      const hexValue = newColor.hex();
      const rgbValue = newColor.rgb().string();
      const colorName = colorNamer(hexValue).ntc[0].name;

      return {
        HTML_Color_Name: colorName,
        Hex: hexValue,
        RGB: rgbValue
      };
    });
  };

  useEffect(() => {
    const newColors = calculateAdjustedColors(brightness, saturation, temperature);
    onAdjustAll(newColors);
  }, [brightness, saturation, temperature]);

  const handleSliderChange = (type, value) => {
    switch(type) {
      case 'brightness':
        setBrightness(value);
        break;
      case 'saturation':
        setSaturation(value);
        break;
      case 'temperature':
        setTemperature(value);
        break;
    }
  };

  const resetAdjustments = () => {
    setBrightness(0);
    setSaturation(0);
    setTemperature(0);
  };

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl text-center font-bold font-header text-slate-800 mb-4">Adjust Colors</h2>
      <div className="mb-4 mt-10">
      <label className="mb-2 flex flex-row justify-between font-bold font-header text-slate-400">
          <span>Darken</span>
          <span>Brighten</span>
        </label>
        <Slider 
          style={{ border: 'red'}}
          min={-100} 
          max={100} 
          value={[brightness]} 
          onValueChange={([value]) => handleSliderChange('brightness', value)} 
        />
      </div>
      
      <div className="mb-4">
      <label className="mb-2 flex flex-row justify-between font-bold font-header text-slate-400">
          <span>Dull</span>
          <span>Vivid</span>
        </label>
        <Slider 
          min={-100} 
          max={100} 
          value={[saturation]} 
          onValueChange={([value]) => handleSliderChange('saturation', value)} 
        />
      </div>
      
      <div className="mb-4">
      <label className="mb-2 flex flex-row justify-between font-bold font-header text-slate-400">
          <span>Cold</span>
          <span>Warm</span>
        </label>
        <Slider 
          min={-180} 
          max={180} 
          value={[temperature]} 
          onValueChange={([value]) => handleSliderChange('temperature', value)} 
        />
      </div>

      {/* <div className="mb-4 flex justify-between">
        {colors.map((color, index) => (
          <div key={index} className="w-12 h-12 rounded-full" style={{ backgroundColor: color.Hex }}></div>
        ))}
      </div> */}

      <div className="flex justify-center">
        <Button onClick={resetAdjustments} className='bg-gray-200/50 mt-4 py-6 px-10 font-bold font-header text-slate-700 hover:bg-gray-200/80 hover:scale-[.97] transition-all duration-300'>Reset to Default</Button>
      </div>
    </Modal>
  );
};


const TrialPage = () => {
  interface Color {
    HTML_Color_Name: string;
    Hex: string;
    RGB: string;
  }

  const [input, setInput] = useState('');
  const [palette, setPalette] = useState<Color[]>([]);
  const [originalPalette, setOriginalPalette] = useState<ColorType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [savedPrompt, setSavedPrompt] = useState('');
  const [isAdjustingAll, setIsAdjustingAll] = useState(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 25); // Limit to 20 characters
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

  const hexToRGBA = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
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
              maxLength={25}
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
                        <ArrowRightIcon className="w-6 h-6 ml-2 stroke-2" />
                    </span>
                </>
              )} 
            </Button>
          </div>
        </form>
      </div>
      
      {palette.length > 0 && (
        <div className="w-[80%] mt-5 py-4 flex flex-col justify-center items-center  ">
          {savedPrompt && (
            <div className="w-full flex flex-row items-center justify-between px-4">
                <h2 className="flex flex-row align-center items-center text-2xl text-slate-700 font-bold my-4">
                <SparklesIcon className="size-8 text-yellow-400 mr-2" />
                {savedPrompt}
                </h2>
                <div className="flex">
                <div className="flex flex-row align-center items-center">
                    <Button type="submit" onClick={handleAdjustAllColors} disabled={isLoading} className='w-full text-xl font-header font-bold mr-6 py-6 px-8 rounded-lg text-slate-600 bg-gray-200/50 hover:bg-gray-200/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
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
                    className="font-extrabold font-header text-gray-500 text-md mb-1 truncate"
                    style={{ color: color.Hex }}
                    title={color.HTML_Color_Name}
                  >
                    {color.HTML_Color_Name}
                  </h2>
                  <p className="font-extrabold hover:bg-slate-200 hover:cursor-pointer py-1 font-header text-xs my-1 text-gray-500 truncate" title={color.Hex}>
                    {color.Hex}
                  </p>
                  <p className="font-extrabold hover:bg-slate-200 hover:cursor-pointer py-1 font-header text-xs my-1 text-gray-500 truncate" title={color.RGB}>
                    {color.RGB}
                  </p>
                </div>
              </div>  
            ))}
          </div>
          {/* Regenerate Button */}
          <div className="flex flex-row align-center items-center mt-12">
              <Button type="submit" onClick={handleAdjustAllColors} disabled={isLoading} className='w-full text-xl font-header font-bold mr-6 py-6 px-8 rounded-lg text-slate-600 bg-gray-200/50 hover:bg-gray-200/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
                  <ArrowPathIcon className="w-6 h-6 mr-2 stroke-2" />
                  Re-Generate
              </Button>
            </div>
            {/* Share Palette */}
            <div className='w-full pt-5 pb-9 mt-12 flex flex-col justify-center items-center border-y-[1px] border-solid border-gray-300/80'>
            <h2 className='text-gray-800 font-bold font-header text-2xl my-6'>Share Palette</h2>
              <div className='flex flex-row justify-center items-center'>
                <div className='flex flex-row justify-center items-center'>
                  <Button type="submit" onClick={handleAdjustAllColors} disabled={isLoading} className='w-full text-xl font-header font-bold mr-6 py-6 px-10 rounded-lg text-slate-600 bg-slate-700/80 hover:bg-slate-900/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
                      <Twitter className='text-gray-300' />
                  </Button>
                </div>
                <div className='flex flex-row justify-center items-center'>
                  <Button type="submit" onClick={handleAdjustAllColors} disabled={isLoading} className='w-full text-xl font-header font-bold mr-6 py-6 px-10 rounded-lg text-slate-600 bg-slate-700/80 hover:bg-slate-900/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
                      <Facebook className='text-gray-300' />
                  </Button>
                </div>
                <div className='flex flex-row justify-center items-center'>
                  <Button type="submit" onClick={handleAdjustAllColors} disabled={isLoading} className='w-full text-xl font-header font-bold mr-6 py-6 px-10 rounded-lg text-slate-600 bg-slate-700/80 hover:bg-slate-900/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
                    <Copy className='text-gray-300' />
                  </Button>
                </div>
              </div>
            </div>
            {/* Recently Generated => Only with account */}
            <div className='w-full pt-3 pb-8 mt-8 flex flex-col justify-center items-center rounded-2xl'>
              <h2 className='text-gray-800 font-bold font-header text-2xl mb-6'>
                Recently Generated
              </h2>
              <div className=' w-full flex flex-row items-center justify-around px-4'>
                <div className='relative flex flex-row justify-center items-center hover:scale-[.98] hover:cursor-pointer transition-all duration-300 rounded-xl'
                  style={{ boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)' }}
                >
                  <div className='flex flex-row justify-center items-center rounded-xl w-[275px] h-[175px]'>
                    <div className='absolute flex flex-row h-full w-full'>
                      <div className='w-[150px] h-full bg-violet-500 rounded-l-xl'></div>
                      <div className='w-[150px] h-full bg-green-400'></div>
                      <div className='w-[150px] h-full bg-orange-500'></div>
                      <div className='w-[150px] h-full bg-yellow-500'></div>
                      <div className='w-[150px] h-full bg-red-500 rounded-r-xl'></div>
                    </div>
                  </div>
                  <span 
                      className='absolute bottom-3 left-3 z-40 py-1 px-3 text-md rounded-lg bg-gray-200 text-slate-700 font-bold font-header flex align-center items-center'
                      title='Ocean dreams'
                  >
                    <SparklesIcon className='w-5 h-5 mr-2'/>
                    Ocean dreams
                  </span>
                </div>
                <div className='relative flex flex-row justify-center items-center hover:scale-[.98] hover:cursor-pointer transition-all duration-300 rounded-xl'
                  style={{ boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)' }}
                >
                  <div className='flex flex-row justify-center items-center rounded-xl w-[275px] h-[175px]'>
                    <div className='absolute flex flex-row h-full w-full'>
                      <div className='w-[150px] h-full bg-violet-500 rounded-l-xl'></div>
                      <div className='w-[150px] h-full bg-green-400'></div>
                      <div className='w-[150px] h-full bg-orange-500'></div>
                      <div className='w-[150px] h-full bg-yellow-500'></div>
                      <div className='w-[150px] h-full bg-red-500 rounded-r-xl'></div>
                    </div>
                  </div>
                  <span 
                      className='absolute bottom-3 left-3 z-40 py-1 px-3 text-md rounded-lg bg-gray-200 text-slate-700 font-bold font-header flex align-center items-center'
                      title='Ocean dreams'
                  >
                    <SparklesIcon className='w-5 h-5 mr-2'/>
                    Ocean dreams
                  </span>
                </div>
                <div className='relative flex flex-row justify-center items-center hover:scale-[.98] hover:cursor-pointer transition-all duration-300 rounded-xl'
                  style={{ boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)' }}
                >
                  <div className='flex flex-row justify-center items-center rounded-xl w-[275px] h-[175px]'>
                    <div className='absolute flex flex-row h-full w-full'>
                      <div className='w-[150px] h-full bg-violet-500 rounded-l-xl'></div>
                      <div className='w-[150px] h-full bg-green-400'></div>
                      <div className='w-[150px] h-full bg-orange-500'></div>
                      <div className='w-[150px] h-full bg-yellow-500'></div>
                      <div className='w-[150px] h-full bg-red-500 rounded-r-xl'></div>
                    </div>
                  </div>
                  <span 
                      className='absolute bottom-3 left-3 z-40 py-1 px-3 text-md rounded-lg bg-gray-200 text-slate-700 font-bold font-header flex align-center items-center'
                      title='Ocean dreams'
                  >
                    <SparklesIcon className='w-5 h-5 mr-2'/>
                    Ocean dreams
                  </span>
                </div>
                
              </div>
            </div>
        </div>
      )}
      {/* Adjust All Colors -> Modal */}
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