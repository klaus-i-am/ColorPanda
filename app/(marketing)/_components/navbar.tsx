'use client';

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

export const Navbar = () => {
    const { isAuthenticated, isLoading} = useConvexAuth();
    const scrolled = useScrollTop();

    return (
        <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && (
                    <p><Spinner /></p>
                )}
                {!isAuthenticated  && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-sm font-bold font-header"
                            >
                               Log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button
                                size="sm"
                                className="'w-full text-sm font-header font-bold rounded-lg p-4 text-white outline-none bg-[#37474f]"
                            >
                                Sign Up
                            </Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button
                            size="sm"
                            variant="ghost"
                            asChild
                        >
                            <Link href="/documents">
                                Enter Moody
                            </Link>
                        </Button>
                        <UserButton
                            afterSignOutUrl="/"
                        />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    );
}