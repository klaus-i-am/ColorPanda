'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Nunito } from "next/font/google";
import Link from "next/link";


const nunito = Nunito({ 
  weight: ['400','500','600','700','800'],
  subsets: ['latin'],
  display: 'swap',
});

export default function LoginPage() {
  const [enail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Card className="w-full max-w-md mt-[-7%]">
        <CardHeader>
          <CardTitle className={`text-2xl font-bold ${nunito.className} text-center`}>Login</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="you@awesome.com"
                value={ElementInternals}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form> */}
        </CardContent>
        <CardFooter className='flex flex-col'>
          <Button
            onClick={() => signIn('github', { callbackUrl: '/generate' })}
            className="w-full bg-gray-800 hover:bg-gray-700"
          >
            Sign in with GitHub
          </Button>
          <br/>
          <Button
            onClick={() => signIn('google', { callbackUrl: '/generate' })}
            className="w-full bg-gray-800 hover:bg-gray-700"
          >
            Sign in with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}