"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Star,
  GitFork,
  AlertCircle,
  FileText,
  CheckCircle2,
  ExternalLink,
  Download,
  Loader2,
  FolderTree,
  Users,
  Calendar,
  Code,
} from "lucide-react"

export default function RepoHelpPage() {
  const [repoUrl, setRepoUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [repoData, setRepoData] = useState<any>(null)

  const analyzeRepo = async () => {
    if (!repoUrl) return

    setLoading(true)

    // Simulate API call - in production, this would call GitHub API
    setTimeout(() => {
      setRepoData({
        name: "awesome-project",
        fullName: "username/awesome-project",
        description: "An awesome open source project for learning and contributing",
        stars: 1234,
        forks: 456,
        openIssues: 23,
        language: "TypeScript",
        lastUpdated: "2 days ago",
        license: "MIT",
        topics: ["react", "typescript", "open-source", "beginner-friendly"],
        goodFirstIssues: [
          {
            title: "Add dark mode toggle",
            number: 42,
            labels: ["good first issue", "enhancement"],
            comments: 3,
          },
          {
            title: "Fix typo in README",
            number: 38,
            labels: ["good first issue", "documentation"],
            comments: 1,
          },
          {
            title: "Update dependencies",
            number: 35,
            labels: ["good first issue", "maintenance"],
            comments: 5,
          },
        ],
        fileStructure: [
          { name: "src/", type: "folder", children: ["components/", "utils/", "pages/"] },
          { name: "docs/", type: "folder", children: ["CONTRIBUTING.md", "CODE_OF_CONDUCT.md"] },
          { name: "README.md", type: "file" },
          { name: "package.json", type: "file" },
        ],
        contributionSteps: [
          "Fork the repository to your GitHub account",
          "Clone your fork locally: git clone https://github.com/YOUR-USERNAME/awesome-project.git",
          "Create a new branch: git checkout -b feature/your-feature",
          "Make your changes and commit: git commit -m 'Add: your feature'",
          "Push to your fork: git push origin feature/your-feature",
          "Open a Pull Request on the original repository",
        ],
      })
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative gradient-bg grid-pattern py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Search className="h-4 w-4" />
              <span>Repository Analysis</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance">
              <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                RepoHelp
              </span>{" "}
              Tool
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              Analyze any GitHub repository and get personalized contribution guidance. Find good first issues,
              understand the project structure, and get step-by-step instructions.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="border-primary/20 neon-glow">
            <CardHeader>
              <CardTitle>Analyze a Repository</CardTitle>
              <CardDescription>Enter a GitHub repository URL to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input
                  type="url"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && analyzeRepo()}
                  className="flex-1"
                />
                <Button onClick={analyzeRepo} disabled={loading || !repoUrl} className="neon-glow">
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <p className="text-sm text-muted-foreground w-full">Try these examples:</p>
                {[
                  "https://github.com/facebook/react",
                  "https://github.com/microsoft/vscode",
                  "https://github.com/vercel/next.js",
                ].map((url) => (
                  <Button
                    key={url}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setRepoUrl(url)
                      setRepoData(null)
                    }}
                    className="text-xs"
                  >
                    {url.split("/").slice(-1)[0]}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      {repoData && (
        <section className="py-12 container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Repository Overview */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{repoData.name}</CardTitle>
                    <CardDescription className="mt-2">{repoData.description}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">{repoData.stars}</div>
                      <div className="text-xs text-muted-foreground">Stars</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitFork className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">{repoData.forks}</div>
                      <div className="text-xs text-muted-foreground">Forks</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">{repoData.openIssues}</div>
                      <div className="text-xs text-muted-foreground">Open Issues</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">{repoData.language}</div>
                      <div className="text-xs text-muted-foreground">Language</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {repoData.topics.map((topic: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Updated {repoData.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>{repoData.license} License</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Content */}
            <Tabs defaultValue="issues" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="issues">Good First Issues</TabsTrigger>
                <TabsTrigger value="structure">File Structure</TabsTrigger>
                <TabsTrigger value="workflow">Contribution Guide</TabsTrigger>
              </TabsList>

              {/* Good First Issues */}
              <TabsContent value="issues" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Good First Issues</CardTitle>
                    <CardDescription>
                      Issues labeled as beginner-friendly and perfect for your first contribution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {repoData.goodFirstIssues.map((issue: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border border-border hover:border-primary/50 transition-smooth"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">
                            #{issue.number} {issue.title}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {issue.comments} comments
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          {issue.labels.map((label: string, i: number) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}

                    {repoData.goodFirstIssues.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>No good first issues found. Check back later or explore other issues.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* File Structure */}
              <TabsContent value="structure" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Repository Structure</CardTitle>
                    <CardDescription>Understanding the project organization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 font-mono text-sm">
                      {repoData.fileStructure.map((item: any, index: number) => (
                        <div key={index} className="space-y-1">
                          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-smooth">
                            {item.type === "folder" ? (
                              <FolderTree className="h-4 w-4 text-primary" />
                            ) : (
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className={item.type === "folder" ? "text-primary font-semibold" : ""}>
                              {item.name}
                            </span>
                          </div>
                          {item.children && (
                            <div className="ml-6 space-y-1">
                              {item.children.map((child: string, i: number) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-smooth text-muted-foreground"
                                >
                                  <FileText className="h-4 w-4" />
                                  <span>{child}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Key Files to Review
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                        <li>• README.md - Project overview and setup instructions</li>
                        <li>• CONTRIBUTING.md - Contribution guidelines</li>
                        <li>• CODE_OF_CONDUCT.md - Community standards</li>
                        <li>• package.json - Dependencies and scripts</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Contribution Workflow */}
              <TabsContent value="workflow" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Step-by-Step Contribution Guide</CardTitle>
                    <CardDescription>Tailored workflow for this repository</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {repoData.contributionSteps.map((step: string, index: number) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                            {index + 1}
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-sm leading-relaxed">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button className="flex-1 neon-glow">
                        <Download className="h-4 w-4 mr-2" />
                        Export as PDF
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Users className="h-4 w-4 mr-2" />
                        Get AI Help
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Contribution Checklist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        "Read the README and CONTRIBUTING guidelines",
                        "Check if the issue is still open and unassigned",
                        "Comment on the issue to express interest",
                        "Set up the development environment",
                        "Write tests for your changes",
                        "Follow the project's code style",
                        "Update documentation if needed",
                        "Test your changes thoroughly",
                      ].map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* How it Works */}
      {!repoData && (
        <section className="py-20 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How RepoHelp Works</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: 1,
                  title: "Analyze Repository",
                  description: "We fetch repository data, issues, and structure from GitHub",
                },
                {
                  step: 2,
                  title: "Identify Opportunities",
                  description: "Find good first issues and areas where you can contribute",
                },
                {
                  step: 3,
                  title: "Get Guidance",
                  description: "Receive step-by-step instructions tailored to the project",
                },
              ].map((item) => (
                <div key={item.step} className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto font-bold text-2xl text-primary">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
