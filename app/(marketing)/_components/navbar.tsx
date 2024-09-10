import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, BadgeCheck, UserRound, CreditCard, Bookmark, History } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Upgrade } from './upgrade';
import { useRouter } from "next/navigation";import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  

export const Navbar = () => {
    const scrolled = useScrollTop();
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/'); // Redirect to home page after sign out
    };

    return (
        <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full py-6 px-[5rem]",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                    {!session ? (
                        <Link href="/sign-in">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-sm font-bold font-header"
                            style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)" }} 
                        >
                            Log in
                        </Button>
                    </Link>
                    ) : (
                    <Popover>
                        <PopoverTrigger>
                            <Button
                                size="sm"
                                className="'w-full text-sm font-header font-bold rounded-lg p-4 bg-transparent hover:text-white transition-colors duration-300 hover:bg-[#37474f] text-slate-700 border-2 border-solid border-[#37474f]"
                                style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }} 
                            >
                                Go Pro
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <Upgrade />
                        </PopoverContent>
                    </Popover>
                    )}
                    
                    <Link href="/generate">
                        <Button
                            size="sm"
                            className="'w-full text-sm font-header font-bold rounded-lg p-4 text-white outline-0 bg-[#37474f]"
                            style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)" }} 
                        >
                            New
                        </Button>   
                    </Link>

                    {/* Dropdown Menu */}
                    {session && (
                        <DropdownMenu>
                        <DropdownMenuTrigger className="outline-0">
                            {/* Avatar Image */}
                            <Avatar 
                                className="w-12 h-12 border-4 border-solid border-gray-300/80 hover:cursor-pointer"

                                // title={session?.user?.name}
                            >
                                <BadgeCheck className="bg-black" size={28} strokeWidth={3} />
                                <AvatarImage src={session?.user?.image} />
                                <AvatarFallback>CM</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-50">
                            <Link href="/generate">
                                <DropdownMenuItem className="hover:cursor-pointer text-slate-700 font-bold font-header tracking-wide">
                                    <UserRound className="mr-2 h-4 w-4 text-slate-700" size={28} strokeWidth={3} />
                                    Profile
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/saved">
                                <DropdownMenuItem className="hover:cursor-pointer text-slate-700 font-bold font-header tracking-wide">
                                    <Bookmark className="mr-2 h-4 w-4 text-slate-700" size={28} strokeWidth={3} />
                                    Saved
                                </DropdownMenuItem>
                            </Link>
                            <Link href="/history">
                                <DropdownMenuItem className="hover:cursor-pointer text-slate-700 font-bold font-header tracking-wide">
                                    <History className="mr-2 h-4 w-4 text-slate-700" size={28} strokeWidth={3} />
                                    History
                                </DropdownMenuItem>
                            </Link>
                            <DropdownMenuItem className="hover:cursor-pointer text-slate-700 font-bold font-header tracking-wide">
                                <CreditCard className="mr-2 h-4 w-4 text-slate-700" size={28} strokeWidth={3} />
                                Subscription
                            </DropdownMenuItem>
                            <DropdownMenuItem className="hover:cursor-pointer text-slate-700 font-bold font-header tracking-wide" onClick={handleSignOut}> 
                                    <LogOut 
                                        strokeWidth={3} 
                                        className="mr-2 h-4 w-4 text-red-500"
                                        onClick={handleSignOut}
                                    />
                                    Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                {/* <ModeToggle /> */}
            </div>
        </div>
    );
}