'use client';

import { useSession, signIn } from "next-auth/react";
import React, { useState } from 'react';
import RecentlyGenerated from '../generate/_components/RecentlyGenerated';
import {Button} from '@/components/ui/button';
import { redirect } from "next/navigation";
import Image from 'next/image';
import Logo from '@/public/logo3.png';
import { LoaderCircle } from "lucide-react";

const History: React.FC = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);



  return (
    <div className="flex">
        <div className="flex justify-center flex-wrap">
            {status === "loading" ? (
                <div className="absolute z-50 ml-[100%] w-full h-screen mt-[40%] flex self-center justify-center items-center align-center">
                    <LoaderCircle 
                        className="w-10 h-10 rounded-full animate-spin flex justify-center items-center"
                    />
                </div>
            ) : (
                <RecentlyGenerated />
            )}
        </div>
    </div>
  );
};

export default History;