'use client'

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronsLeft, MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { ElementRef, useEffect, useRef, useState } from "react";
import { UserItem } from "./user-item";

export const Navigation = () => {
    const pathname = usePathname();

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null); 
    const [isResetting, setIsResetting] = useState(false);

    return (
        <>
            <aside
                ref={sidebarRef}
                className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]"
            >
                <div 
                    role='button'
                    className="h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition"
                >
                </div>
                <div>
                    <UserItem />
                </div>
                <div className="mt-4">
                    <p>Documents</p>
                </div>
                <div 
                    className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0" />
            </aside>
            <div 
                ref={navbarRef}
                className="absolute top-0 z-[99999] w-[calc(100%-240px)]"
            >
                <nav className="bg-transparent px-3 py-2 w-full">
                    <MenuIcon role="button" className="h-6 w-6 text-muted-foreground" />
                </nav>
            </div>
        </>
    );
}