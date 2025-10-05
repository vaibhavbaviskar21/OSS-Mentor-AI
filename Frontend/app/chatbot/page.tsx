import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Zap, Clock, Shield, Sparkles } from "lucide-react"

export default function ChatBotPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative gradient-bg grid-pattern py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Assistance</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ChatBot
              </span>{" "}
              Help
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Get instant, AI-powered assistance with Git commands, GitHub workflows, pull requests, and open source
              contribution best practices. Available 24/7 from any page.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How the ChatBot Can Help</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: MessageCircle,
                title: "Real-Time Answers",
                description: "Get instant responses to your Git and GitHub questions without leaving your workflow",
              },
              {
                icon: Zap,
                title: "Quick Solutions",
                description: "Resolve common issues like merge conflicts, rebase problems, and PR errors quickly",
              },
              {
                icon: Clock,
                title: "24/7 Availability",
                description: "Access help anytime, anywhere. No waiting for office hours or forum responses",
              },
              {
                icon: Shield,
                title: "Best Practices",
                description: "Learn industry-standard practices for commits, branching, and collaboration",
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:border-primary/50 transition-smooth">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Ask */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What You Can Ask</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  category: "Git Commands",
                  examples: [
                    "How do I undo my last commit?",
                    "What's the difference between merge and rebase?",
                    "How to resolve merge conflicts?",
                  ],
                },
                {
                  category: "GitHub Workflows",
                  examples: [
                    "How do I create a pull request?",
                    "What are GitHub Actions?",
                    "How to fork and sync a repository?",
                  ],
                },
                {
                  category: "Best Practices",
                  examples: [
                    "How to write good commit messages?",
                    "What's a good branching strategy?",
                    "How to review pull requests?",
                  ],
                },
                {
                  category: "Troubleshooting",
                  examples: [
                    "My push was rejected, what now?",
                    "How to fix detached HEAD state?",
                    "Why is my PR failing CI checks?",
                  ],
                },
              ].map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.examples.map((example, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold">How to Use the ChatBot</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Click the Icon",
                description: "Look for the floating chat icon in the bottom-right corner of any page",
              },
              {
                step: 2,
                title: "Ask Your Question",
                description: "Type your question or select from quick suggestions",
              },
              {
                step: 3,
                title: "Get Instant Help",
                description: "Receive detailed answers and follow-up with more questions",
              },
            ].map((item) => (
              <div key={item.step} className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto font-bold text-2xl text-primary">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-8">
            <p className="text-muted-foreground mb-4">The ChatBot is available on every page. Try it now!</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
              <MessageCircle className="h-4 w-4" />
              <span>Look for the chat icon in the bottom-right corner</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
