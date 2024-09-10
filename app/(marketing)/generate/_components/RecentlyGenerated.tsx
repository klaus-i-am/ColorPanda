import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';

const colorClasses = [
  'bg-violet-500',
  'bg-green-500',
  'bg-orange-500',
  'bg-yellow-500',
  'bg-red-500'
];

const RecentlyGenerated: React.FC = () => (
  <div className='w-full pt-3 pb-8 mt-8 flex flex-col justify-center items-center rounded-2xl'>
    <h2 className='text-gray-800 font-normal font-header text-2xl mb-6'>
      Recently Generated
    </h2>
    <div className='w-[90%] flex flex-wrap  gap-x-2 gap-y-2 justify-start items-center'>
      {[1, 2, 3, 4, 5].map((_, index) => ( 
        <div key={index} className='relative flex flex-row justify-center items-center hover:scale-[.98] hover:cursor-pointer transition-all duration-300 rounded-xl'
          style={{ boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)' }}
        >
          <div className='flex flex-row justify-center items-center rounded-xl w-[275px] h-[175px]'>
            <div className='absolute flex flex-row h-full w-full'>
              {colorClasses.map((colorClass, i) => (
                  <div 
                    key={i} 
                    className={`w-[55px] h-full ${colorClass} ${i === 0 ? 'rounded-l-xl' : ''} ${i === 4 ? 'rounded-r-xl' : ''}`} 
                  />
              ))}
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
      ))}
    </div>
  </div>
);

export default RecentlyGenerated;