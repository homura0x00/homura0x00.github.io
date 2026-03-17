'use client';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export type NavItem = {
    name: string
    href?: string
    children?: {
        name: string
        href: string
    }[]
}

export const navLists: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Tags", href: "/tags" },
    { name: "Posts", 
        children: [
        { name: "Blog", href: "/blog" },
        { name: "WP", href: "/wp" },
    ]},
    { name: "Project", href: "/projects" },
    { name: "About", href: "/about" },
];

export default function BaseNavigation() {
    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                {navLists.map((nav) => (
                    <NavigationMenuItem key={nav.name} className="m-1 px-1">
                        {nav.children && nav.children.length > 0 ? (
                            <>
                                <NavigationMenuTrigger>
                                    {nav.name}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="flex flex-col min-w-16">
                                        {nav.children.map((child) => (
                                            <NavigationMenuLink
                                                key={child.href}
                                                href={child.href}
                                                className="m-0 border-0 text-center"
                                            >
                                                {child.name}
                                            </NavigationMenuLink>
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <NavigationMenuLink href={nav.href ?? "/"} className="mx-1">
                                {nav.name}
                            </NavigationMenuLink>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}