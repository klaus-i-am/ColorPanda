// app/history/RecentlyGenerated.js
import { SparklesIcon } from '@heroicons/react/24/outline';
import { Nunito } from 'next/font/google';

const nunito = Nunito({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin']
});

async function getColors() {
  const res = await fetch('http://localhost:3000/api/colors', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch colors');
  }
  return res.json();
}

// Function to generate a random color
function getRandomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16);
}

export default async function RecentlyGenerated() {
  const { colors } = await getColors();

  return (
    <div className='w-full pt-3 pb-8 mt-8 flex flex-col justify-center items-center rounded-2xl'>
      <h2 className={`text-gray-800 font-bold ${nunito.className} text-3xl mb-6`}>
        Recently Generated
      </h2>
      <div className='w-[90%] flex flex-wrap gap-x-2 gap-y-2 justify-start items-center'>
        {colors.map((item: any) => (
          <div key={item._id} className='relative flex flex-row justify-center items-center hover:scale-[.98] hover:cursor-pointer transition-all duration-300 rounded-xl'
            style={{ boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)' }}
          >
            <div className='flex flex-row justify-center items-center rounded-xl w-[275px] h-[175px]'>
              <div className='absolute flex flex-row h-full w-full'>
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-[55px] h-full ${i === 0 ? 'rounded-l-xl' : ''} ${i === 4 ? 'rounded-r-xl' : ''}`}
                    style={{ backgroundColor: getRandomColor() }}
                  />
                ))}
              </div>
            </div>
            <span
              className='absolute bottom-3 left-3 z-40 py-1 px-3 text-md rounded-lg bg-gray-200 text-slate-700 font-bold font-header flex align-center items-center'
              title={`Palette ${item._id.slice(-4)}`}
            >
              <SparklesIcon className='w-5 h-5 mr-2'/>
              Palette {item._id.slice(-4)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}