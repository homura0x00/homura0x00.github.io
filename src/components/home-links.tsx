import { Rss } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

const BilibiliIcon = ({ className }: { className?: string }) => (
    <svg 
        viewBox="0 0 1129 1024" 
        className={className}
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
    >
        <path d="M234.909 9.656a80.468 80.468 0 0 1 68.398 0 167.374 167.374 0 0 1 41.843 30.578l160.937 140.82h115.07l160.936-140.82a168.983 168.983 0 0 1 41.843-30.578A80.468 80.468 0 0 1 930.96 76.445a80.468 80.468 0 0 1-17.703 53.914 449.818 449.818 0 0 1-35.406 32.187 232.553 232.553 0 0 1-22.531 18.508h100.585a170.593 170.593 0 0 1 118.289 53.109 171.397 171.397 0 0 1 53.914 118.288v462.693a325.897 325.897 0 0 1-4.024 70.007 178.64 178.64 0 0 1-80.468 112.656 173.007 173.007 0 0 1-92.539 25.75h-738.7a341.186 341.186 0 0 1-72.421-4.024A177.835 177.835 0 0 1 28.91 939.065a172.202 172.202 0 0 1-27.36-92.539V388.662a360.498 360.498 0 0 1 0-66.789A177.03 177.03 0 0 1 162.487 178.64h105.414c-16.899-12.07-31.383-26.555-46.672-39.43a80.468 80.468 0 0 1-25.75-65.984 80.468 80.468 0 0 1 39.43-63.57M216.4 321.873a80.468 80.468 0 0 0-63.57 57.937 108.632 108.632 0 0 0 0 30.578v380.615a80.468 80.468 0 0 0 55.523 80.469 106.218 106.218 0 0 0 34.601 5.632h654.208a80.468 80.468 0 0 0 76.444-47.476 112.656 112.656 0 0 0 8.047-53.109v-354.06a135.187 135.187 0 0 0 0-38.625 80.468 80.468 0 0 0-52.304-54.719 129.554 129.554 0 0 0-49.89-7.242H254.22a268.764 268.764 0 0 0-37.82 0z m0 0" />
        <path d="M348.369 447.404a80.468 80.468 0 0 1 55.523 18.507 80.468 80.468 0 0 1 28.164 59.547v80.468a80.468 80.468 0 0 1-16.094 51.5 80.468 80.468 0 0 1-131.968-9.656 104.609 104.609 0 0 1-10.46-54.719v-80.468a80.468 80.468 0 0 1 70.007-67.593z m416.02 0a80.468 80.468 0 0 1 86.102 75.64v80.468a94.148 94.148 0 0 1-12.07 53.11 80.468 80.468 0 0 1-132.773 0 95.757 95.757 0 0 1-12.875-57.133V519.02a80.468 80.468 0 0 1 70.007-70.812z m0 0" />
    </svg>
)

export const GithubIcon = ({ className }: { className?: string }) => (
    <svg 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
        <path d="M9 18c-4.51 2-5-2-7-2"/>
    </svg>
)

const links = [
	{
		href: "https://space.bilibili.com/37937494",
		icon: <BilibiliIcon className="size-5" />,
        label: "Bilibili",
        bgClass: "bg-[#fb7299] border-[#fb7299] hover:bg-[#fb7299] active:bg-[#fb7299]",
	},
	{
		href: "https://github.com/homura0x00",
		icon: <GithubIcon className="size-5" />,
        label: "Github",
        bgClass: "bg-zinc-900 border-zinc-900 dark:bg-zinc-700 dark:border-zinc-700 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-900 dark:active:bg-zinc-700",
	},
	{
		href: "",
		icon: <Rss className="size-5" />,
        label: "RSS",
        bgClass: "bg-[#ee802f] border-[#ee802f] hover:bg-[#ee802f] active:bg-[#ee802f]",
	},
]

export default function HomeLinks() {
    return (
        <div className="flex items-center gap-4">
            {links.map(({ href, icon, label, bgClass }) => (
                <Button 
                    key={label}
                    variant="ghost" 
                    size="icon" 
                    asChild
                    className={cn(
                        "relative size-10 rounded-full text-white transition-transform duration-300",
                        "hover:scale-105 active:scale-95",
                        "hover:text-white active:text-white", // 确保文字（图标）颜色在交互时不改变
                        bgClass
                    )}
                >
                    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                        {icon}
                    </a>
                </Button>
            ))}
        </div>
    )
}