import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center font-mono font-bold text-primary-foreground">
                OSS
              </div>
              <span className="font-bold">OSS Mentor AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered guidance for open source contribution and mentorship.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-smooth">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-smooth">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-smooth">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/git-github" className="text-muted-foreground hover:text-primary transition-smooth">
                  Git & GitHub Guide
                </Link>
              </li>
              <li>
                <Link href="/platforms" className="text-muted-foreground hover:text-primary transition-smooth">
                  Platforms
                </Link>
              </li>
              <li>
                <Link href="/repo-help" className="text-muted-foreground hover:text-primary transition-smooth">
                  RepoHelp Tool
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">Get the latest open source updates</p>
            <div className="flex gap-2">
              <Input type="email" placeholder="your@email.com" className="bg-background" />
              <Button size="sm" className="neon-glow">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2025 OSS Mentor AI. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <Link href="https://github.com" className="text-muted-foreground hover:text-primary transition-smooth">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-smooth">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="https://linkedin.com" className="text-muted-foreground hover:text-primary transition-smooth">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
