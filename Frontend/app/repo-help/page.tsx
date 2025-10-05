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
  const [error, setError] = useState<string | null>(null)

  const analyzeRepo = async () => {
    if (!repoUrl) return

    setLoading(true)
    setError(null)
    setRepoData(null)

    try {
      const response = await fetch('/api/analyze-repo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: repoUrl }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to analyze repository')
      }

      const analysis = result.data

      // Transform the data to match the UI format
      setRepoData({
        name: analysis.repo.name,
        fullName: analysis.repo.full_name,
        description: analysis.repo.description || "No description provided",
        stars: analysis.repo.stargazers_count,
        forks: analysis.repo.forks_count,
        openIssues: analysis.repo.open_issues_count,
        language: analysis.repo.language || "Not specified",
        lastUpdated: new Date(analysis.repo.updated_at).toLocaleDateString(),
        license: analysis.repo.license?.name || "No license",
        topics: analysis.repo.topics || [],
        goodFirstIssues: analysis.goodFirstIssues.map((issue: any) => ({
          title: issue.title,
          number: issue.number,
          labels: issue.labels.map((label: any) => label.name),
          comments: issue.comments,
          url: issue.html_url,
        })),
        fileStructure: analysis.fileStructure.map((item: any) => ({
          name: item.name,
          type: item.type === 'dir' ? 'folder' : 'file',
          path: item.path,
        })),
        contributionSteps: analysis.contributionGuide,
        technicalDetails: analysis.technicalDetails,
        hasReadme: !!analysis.readme,
        hasContributing: !!analysis.contributing,
        hasCodeOfConduct: !!analysis.codeOfConduct,
        repoUrl: analysis.repo.html_url,
      })
    } catch (error: any) {
      console.error('Failed to analyze repository:', error)
      setError(error.message || 'Failed to analyze repository')
    } finally {
      setLoading(false)
    }
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

      {/* Loading Section */}
      {loading && (
        <section className="py-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center gap-3 py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <div className="text-center">
                    <h3 className="font-semibold">Analyzing Repository</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fetching repository data, issues, and structure...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Error Section */}
      {error && (
        <section className="py-12 container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <h3 className="font-semibold">Analysis Failed</h3>
                    <p className="text-sm mt-1">{error}</p>
                    <p className="text-xs mt-2 text-red-600">
                      Make sure the repository URL is correct and the repository is public.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

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
                          <div>
                            <h4 className="font-semibold">
                              #{issue.number} {issue.title}
                            </h4>
                            {issue.url && (
                              <a
                                href={issue.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-primary hover:underline mt-1 inline-flex items-center gap-1"
                              >
                                View on GitHub <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {issue.comments} comments
                          </Badge>
                        </div>
                        <div className="flex gap-2 flex-wrap">
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
                      {repoData.fileStructure.slice(0, 20).map((item: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded hover:bg-muted transition-smooth">
                          {item.type === "folder" ? (
                            <FolderTree className="h-4 w-4 text-primary" />
                          ) : (
                            <FileText className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className={item.type === "folder" ? "text-primary font-semibold" : ""}>
                            {item.name}
                          </span>
                          {item.path && item.path !== item.name && (
                            <span className="text-xs text-muted-foreground">
                              ({item.path})
                            </span>
                          )}
                        </div>
                      ))}
                      {repoData.fileStructure.length > 20 && (
                        <div className="text-center py-2 text-muted-foreground text-sm">
                          ... and {repoData.fileStructure.length - 20} more files
                        </div>
                      )}
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Key Files Found
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                          <li className={repoData.hasReadme ? "text-green-600" : "text-orange-600"}>
                            • README.md {repoData.hasReadme ? "✓" : "✗"}
                          </li>
                          <li className={repoData.hasContributing ? "text-green-600" : "text-orange-600"}>
                            • CONTRIBUTING.md {repoData.hasContributing ? "✓" : "✗"}
                          </li>
                          <li className={repoData.hasCodeOfConduct ? "text-green-600" : "text-orange-600"}>
                            • CODE_OF_CONDUCT.md {repoData.hasCodeOfConduct ? "✓" : "✗"}
                          </li>
                        </ul>
                      </div>

                      {repoData.technicalDetails && (
                        <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                          <h4 className="font-semibold text-accent mb-2 flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            Technical Details
                          </h4>
                          <ul className="text-sm text-muted-foreground space-y-1 ml-6">
                            {repoData.technicalDetails.packageManager && (
                              <li>• Package Manager: {repoData.technicalDetails.packageManager}</li>
                            )}
                            {repoData.technicalDetails.framework && (
                              <li>• Framework: {repoData.technicalDetails.framework}</li>
                            )}
                            {repoData.technicalDetails.setupInstructions?.length > 0 && (
                              <li>• Special setup required</li>
                            )}
                          </ul>
                        </div>
                      )}
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
