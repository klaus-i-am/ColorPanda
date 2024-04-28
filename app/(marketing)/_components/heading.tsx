'use client'

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-4">
            {isLoading && ( 
                <div className="w-full flex items-center justify-center">
                    <Spinner size='lg' />
                </div>
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href='/documents'>
                        Create
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <Card className="max-w-[500px]">
                    <CardHeader>
                        <CardTitle>Mood2Palette</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-xl font-bold light:text-slate-800">Generate your ideal color palette</p>
                        <p className="text-md font-normal light:text-slate-800 mt-3">
                        ColorMagic is a color palette generator with AI.
                        Generate colors from keyword for image of color you enter.
                        </p>
                    </CardContent>
                      <CardFooter className="flex justify-center">
                        <Button className="w-full">
                            Create Free
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardFooter>
                </Card>
                // <SignInButton mode="modal">
                //     <Button>
                //         Create Free
                //         <ArrowRight className="h-4 w-4 ml-2" />
                //     </Button>
                // </SignInButton>
            )}
        </div>
    );
}