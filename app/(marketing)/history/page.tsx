'use client';

import { useSession, signIn } from "next-auth/react";
import React, { useState } from 'react';
import RecentlyGenerated from '../generate/_components/RecentlyGenerated';
import {Button} from '@/components/ui/button';
import { redirect } from "next/navigation";



const History: React.FC = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If the session is loading, you might want to show a loading state
  if (status === "loading") {
    return <p className="center ">Loading...</p>;
  }



  return (
    <div className="flex border border-solid border-red-500">
        <div className="flex justify-center flex-wrap">
            <RecentlyGenerated />
        </div>
    </div>
  );
};

export default History;