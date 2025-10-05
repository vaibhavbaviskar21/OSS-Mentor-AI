import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, GitBranch, Users, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative gradient-bg grid-pattern min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              <span>Welcome to the Future of Open Source</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance leading-tight">
              Discover the Power of{" "}
              <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Open Source
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Your complete platform to learn, explore, and contribute to open source projects. Get AI-powered guidance,
              interactive tutorials, and powerful tools to start your journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="neon-glow group" asChild>
                <Link href="/open-source">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/git-github">Learn Git & GitHub</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything You Need to Contribute</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive tools and resources designed to make open source contribution accessible to everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Code2,
              title: "Interactive Tutorials",
              description: "Learn Git and GitHub with hands-on, visual guides and real-world examples",
              href: "/git-github",
            },
            {
              icon: GitBranch,
              title: "Repository Helper",
              description: "Analyze any repo and get personalized contribution guidance instantly",
              href: "/repo-help",
            },
            {
              icon: Users,
              title: "Platform Explorer",
              description: "Discover the best open source platforms and find projects that match your skills",
              href: "/platforms",
            },
            {
              icon: Sparkles,
              title: "AI Assistant",
              description: "Get real-time help with Git commands, PR reviews, and contribution workflows",
              href: "/chatbot",
            },
          ].map((feature, index) => (
            <Link
              key={index}
              href={feature.href}
              className="group relative p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-smooth"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl opacity-0 group-hover:opacity-100 transition-smooth" />

              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-smooth">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>

                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>

                <div className="flex items-center text-primary text-sm font-medium">
                  Learn more
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "10M+", label: "Open Source Projects" },
              { value: "50M+", label: "Active Contributors" },
              { value: "100+", label: "Supported Platforms" },
              { value: "24/7", label: "AI Assistance" },
            ].map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-accent/5">
          <h2 className="text-3xl md:text-5xl font-bold">Ready to Make Your First Contribution?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join millions of developers contributing to open source. Start learning today with our interactive guides
            and AI-powered tools.
          </p>
          <Button size="lg" className="neon-glow" asChild>
            <Link href="/open-source">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
