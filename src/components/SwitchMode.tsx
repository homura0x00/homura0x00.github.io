import * as React from "react"
import { Moon, Sun, MonitorCog } from "lucide-react"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"

export default function SwitchMode() {
    // 默认从 localStorage 读取，如果没有则为 "system"
    const [theme, setThemeState] = React.useState<
        "theme-light" | "dark" | "system"
    >(() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
            const stored = localStorage.getItem('theme')
            if (stored === 'light') return 'theme-light'
            if (stored === 'dark') return 'dark'
        }
        return "system"
    })

    // 真正的切换逻辑
    React.useEffect(() => {
        const root = document.documentElement
        
        if (theme === "system") {
            localStorage.setItem("theme", "system")
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            root.classList[systemDark ? "add" : "remove"]("dark")
        } else if (theme === "dark") {
            localStorage.setItem("theme", "dark")
            root.classList.add("dark")
        } else {
            localStorage.setItem("theme", "light")
            root.classList.remove("dark")
        }
    }, [theme])

    // 监听系统主题变化（仅当当前模式为 system 时生效）
    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleChange = () => {
            if (theme === "system") {
                const root = document.documentElement
                root.classList[mediaQuery.matches ? "add" : "remove"]("dark")
            }
        }
        
        mediaQuery.addEventListener("change", handleChange)
        return () => mediaQuery.removeEventListener("change", handleChange)
    }, [theme])

    return (
        <div className="flex items-center gap-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-1">
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "rounded-full h-8 w-8 transition-all",
                    theme === "theme-light"
                        ? "bg-sky-100 text-sky-500 dark:bg-sky-500/20 dark:text-sky-400"
                        : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                )}
                onClick={() => setThemeState("theme-light")}
            >
                <Sun className="h-4 w-4" />
                <span className="sr-only">Light</span>
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "rounded-full h-8 w-8 transition-all",
                    theme === "system"
                        ? "bg-sky-100 text-sky-500 dark:bg-sky-500/20 dark:text-sky-400"
                        : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                )}
                onClick={() => setThemeState("system")}
            >
                <MonitorCog className="h-4 w-4" />
                <span className="sr-only">System</span>
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className={cn(
                    "rounded-full h-8 w-8 transition-all",
                    theme === "dark"
                        ? "bg-sky-100 text-sky-500 dark:bg-sky-500/20 dark:text-sky-400"
                        : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
                )}
                onClick={() => setThemeState("dark")}
            >
                <Moon className="h-4 w-4" />
                <span className="sr-only">Dark</span>
            </Button>
        </div>
    )
}