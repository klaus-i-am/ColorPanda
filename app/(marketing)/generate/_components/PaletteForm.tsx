import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { LoaderCircle } from 'lucide-react';
import { Nunito } from "next/font/google";

const nunito = Nunito({ 
  weight: ['400','500','600','700','800'],
  subsets: ['latin'],
});

interface PaletteFormProps {
  input: string;
  isLoading: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

const PaletteForm: React.FC<PaletteFormProps> = ({ input, isLoading, handleInputChange, handleSubmit }) => {
  const isInputValid = input.trim().length >= 3;

  return (
    <div className={`min-w-[40%] mt-[10%] select-none tracking-wide`}>
      <form onSubmit={handleSubmit}>
        <div className={`text-wrap text-center ${nunito.className} flex flex-col justify-center`}>
          <h1 className={`mt-2 text-2xl font-extrabold ${nunito.className} text-[rgba(60,66,77,1)]`}>
            Generate a new palette
          </h1>
          <span className={`mb-4 text-lg text-gray-500 font-bold ${nunito.className}`}>Enter keywords for image or mood of color</span>
          <Input
            className={`max-w-lg p-7 pl-4 mb-3 bg-gray-200 placeholder:font-header placeholder:font-extrabold placeholder:text-slate-400 rounded-xl placeholder:text-lg ${nunito.className} font-extrabold text-lg focus-0 border-0 outline-0 ring-0
            focus:outline-0 focus-visible:border-transparent focus-visible:ring-0 text-[#607d8b]`}
            value={input}
            placeholder="Ocean daydreams"
            onChange={handleInputChange}
            maxLength={25}
            minLength={3}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !isInputValid} 
          className={`
            w-full text-xl font-header font-bold py-8 px-8 rounded-xl text-white
            ${!isInputValid 
              ? 'bg-gray-300 cursor-not-allowed' 
              : 'bg-gray-500 hover:bg-gray-600 cursor-pointer'
            }
            ${isLoading
              ? 'opacity-50 cursor-wait'
              : ''
            }
            outline-none focus:outline-0 ${nunito.className}
          `}
        > 
          {isLoading ? (
            <>
              <LoaderCircle 
                  className="w-5 h-5 mr-2 rounded-full animate-spin flex justify-center items-center font-bold "
              />
              Generating...
            </>
          ) : (
            <span className="flex flex-row align-center items-center">
              <span className={`font-bold ${nunito.className} tracking-wide text-xl`}>Generate</span>
              <ArrowRightIcon className="w-6 h-6 ml-2 stroke-2" />
            </span>
          )} 
        </Button>
      </form>
    </div>
  );
};

export default PaletteForm;