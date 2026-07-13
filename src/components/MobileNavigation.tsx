'use client';

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
                <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:text-foreground">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full sm:max-w-sm">
                <SheetHeader className="px-4">
                    <SheetTitle className="text-left text-sm tracking-[2px] text-muted-foreground font-normal uppercase">
                        Menu
                    </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6 px-4">
                    {navLists.map((nav) => (
                        <div key={nav.name} className="border-b border-border pb-2">
                            {nav.children && nav.children.length > 0 ? (
                                <Collapsible>
                                    <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium py-2 text-foreground">
                                        {nav.name}
                                        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent className="pl-4 flex flex-col gap-2 mt-1">
                                        {nav.children.map((child) => (
                                            <a
                                                key={child.href}
                                                href={child.href}
                                                className="flex flex-col gap-0.5 py-2 px-1 rounded-md transition-colors hover:bg-accent/5"
                                            >
                                                <span className="text-sm text-foreground">{child.name}</span>
                                                {child.description && (
                                                    <span className="text-xs text-muted-foreground/70">{child.description}</span>
                                                )}
                                            </a>
                                        ))}
                                    </CollapsibleContent>
                                </Collapsible>
                            ) : (
                                <a
                                    href={nav.href}
                                    className="text-sm font-medium block py-2 text-foreground hover:text-muted-foreground transition-colors"
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