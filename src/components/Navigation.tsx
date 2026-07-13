'use client';

import { usePathname } from '@/lib/use-pathname';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

export type NavItem = {
    name: string
    href?: string
    children?: {
        name: string
        description?: string
        href: string
    }[]
}

export const navLists: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Tags", href: "/tags" },
    { name: "Blog",
        children: [
        { name: "Post", description: "博客文章与技术笔记", href: "/blog" },
        { name: "WP", description: "CTF 解题报告与 WriteUp", href: "/wp" },
    ]},
    { name: "Project", href: "/projects" },
    { name: "About", href: "/about" },
];

/**
 * 无框导航链接 — 只有文字变化，没有背景框
 */
function NavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive?: boolean }) {
    return (
        <NavigationMenuLink
            href={href}
            className={cn(
                "bg-transparent px-2 py-0.5 rounded-none hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground transition-colors",
                "data-[active=true]:bg-transparent data-[active=true]:hover:bg-transparent data-[active=true]:focus:bg-transparent",
                isActive ? "text-foreground font-medium" : "text-muted-foreground"
            )}
        >
            {children}
        </NavigationMenuLink>
    );
}

/**
 * 带描述的子导航项
 */
function NavDropdownItem({ href, name, description, isActive }: { href: string; name: string; description?: string; isActive?: boolean }) {
    return (
        <NavigationMenuLink
            href={href}
            className={cn(
                "flex flex-col gap-0.5 rounded-md px-3 py-2 transition-colors",
                "hover:bg-accent/5 hover:text-foreground",
                isActive ? "bg-accent/5 text-foreground" : "text-muted-foreground"
            )}
        >
            <span className="text-sm font-medium">{name}</span>
            {description && (
                <span className="text-xs text-muted-foreground/70 leading-tight">{description}</span>
            )}
        </NavigationMenuLink>
    );
}

export default function BaseNavigation() {
    const pathname = usePathname();

    const isActive = (href?: string) => {
        if (!href) return false;
        if (href === "/") return pathname === "/";
        return pathname.startsWith(href);
    };

    const isChildActive = (children?: { href: string }[]) => {
        return children?.some((child) => pathname.startsWith(child.href)) ?? false;
    };

    return (
        <NavigationMenu viewport={false}>
            <NavigationMenuList>
                {navLists.map((nav) => (
                    <NavigationMenuItem key={nav.name} className="mx-0.5">
                        {nav.children && nav.children.length > 0 ? (
                            <>
                                <NavigationMenuTrigger
                                    className={cn(
                                        "bg-transparent px-2 py-0.5 h-auto rounded-none hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground",
                                        "data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:text-foreground",
                                        "gap-0.5 transition-colors [&_svg]:hidden",
                                        isChildActive(nav.children)
                                            ? "text-foreground font-medium"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {nav.name}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent
                                    className={cn(
                                        "p-1.5 min-w-44",
                                        "bg-popover border shadow-sm rounded-lg"
                                    )}
                                >
                                    <div className="flex flex-col gap-0.5">
                                        {nav.children.map((child) => (
                                            <NavDropdownItem
                                                key={child.href}
                                                href={child.href}
                                                name={child.name}
                                                description={child.description}
                                                isActive={isActive(child.href)}
                                            />
                                        ))}
                                    </div>
                                </NavigationMenuContent>
                            </>
                        ) : (
                            <NavLink href={nav.href!} isActive={isActive(nav.href)}>
                                {nav.name}
                            </NavLink>
                        )}
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}