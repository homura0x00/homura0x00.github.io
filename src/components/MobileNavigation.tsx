'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navLists } from "./Navigation";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from 'lucide-react';

export default function MobileNavigation() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                    <SheetTitle className="text-left text-2xl font-bold">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                    {navLists.map((nav) => (
                        <div key={nav.name} className="border-b border-zinc-100 dark:border-zinc-800 pb-2">
                            {nav.children && nav.children.length > 0 ? (
                                <Collapsible>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full text-lg font-medium py-2">
                                        {nav.name}
                                        <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pl-4 flex flex-col gap-2 mt-1">
                                        {nav.children.map((child) => (
                                            <a
                                                key={child.href}
                                                href={child.href}
                                                className="text-zinc-600 dark:text-zinc-400 hover:text-primary py-1"
                                            >
                                                {child.name}
                                            </a>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            ) : (
                                <a
                                    href={nav.href}
                                    className="text-lg font-medium block py-2 hover:text-primary"
                                >
                                    {nav.name}
                                </a>
                            )}
                        </div>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}
