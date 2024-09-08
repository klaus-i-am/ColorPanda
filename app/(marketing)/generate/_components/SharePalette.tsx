import React from 'react';
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Copy } from 'lucide-react';

const SharePalette: React.FC = () => (
  <div className='w-full pt-5 pb-9 mt-12 flex flex-col justify-center items-center border-y-[1px] border-solid border-gray-300/80'>
    <h2 className='text-gray-800 font-bold font-header text-2xl my-6'>Share Palette</h2>
    <div className='flex flex-row justify-center items-center'>
      {['Twitter', 'Facebook', 'Copy'].map((platform) => (
        <Button key={platform} className='w-full text-xl font-header font-bold mr-6 py-6 px-10 rounded-lg text-slate-600 bg-slate-700/80 hover:bg-slate-900/80 hover:scale-[.97] transition-all duration-300 outline-none focus:outline-0'>
          {platform === 'Twitter' && <Twitter className='text-gray-300' />}
          {platform === 'Facebook' && <Facebook className='text-gray-300' />}
          {platform === 'Copy' && <Copy className='text-gray-300' />}
        </Button>
      ))}
    </div>
  </div>
);

export default SharePalette;