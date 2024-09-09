import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const scrolled = useScrollTop();
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut({ redirect: false });
        router.push('/'); // Redirect to home page after sign out
    };

    return (
        <div className={cn("z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                    {session ? (
                        <Button
                        onClick={handleSignOut}
                            variant="ghost"
                            size="sm"
                            className="rounded-sm font-bold font-header"
                        >
                            Log out
                        </Button>
                    ) : (
                        <Link href="/sign-in">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-sm font-bold font-header"
                        >
                            Log in
                        </Button>
                    </Link>
                    )}
                    
                    <Link href="/generate">
                        <Button
                            size="sm"
                            className="'w-full text-sm font-header font-bold rounded-lg p-4 text-white outline-none bg-[#37474f]"
                        >
                            New
                        </Button>   
                    </Link>
                <ModeToggle />
            </div>
        </div>
    );
}