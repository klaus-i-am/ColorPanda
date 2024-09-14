// app/history/page.js
import { Suspense } from 'react';
import RecentlyGenerated from '../generate/_components/RecentlyGenerated';
import { Nunito } from "next/font/google";
import { LoaderCircle } from "lucide-react";

const nunito = Nunito({
  weight: ['400','500','600','700','800'],
  subsets: ['latin'],
});

export default function PalettePage() {
  return (
    <div className="flex justify-center flex-wrap">
      <Suspense fallback={
        <div className="absolute z-50 w-full h-screen flex justify-center items-center">
          <LoaderCircle className="w-10 h-10 rounded-full animate-spin" />
        </div>
      }>
        <h2>Palette Page</h2>
      </Suspense>
    </div>
  );
}