"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Open Source", href: "/open-source" },
  { name: "Git & GitHub", href: "/git-github" },
  { name: "ChatBot Help", href: "/chatbot" },
  { name: "Platforms", href: "/platforms" },
  { name: "RepoHelp", href: "/repo-help" },
]

export function Navigation() {
  const pathname = usePathname()
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const root = document.documentElement
    if (theme === "dark") {
      root.classList.remove("light")
    } else {
      root.classList.add("light")
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-mono font-bold text-primary-foreground transition-smooth group-hover:scale-110">
              OS
            </div>
            <span className="font-bold text-lg hidden sm:inline-block">OpenSource Hub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-smooth relative",
                  pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary neon-glow" />
                )}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="transition-smooth hover:scale-110">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button className="hidden sm:inline-flex neon-glow">Get Started</Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-smooth",
                    pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted",
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="mt-2 neon-glow">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
