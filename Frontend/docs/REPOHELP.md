# RepoHelp Feature Documentation - OSS Mentor AI

## Overview

The RepoHelp feature is a comprehensive GitHub repository analysis tool that helps developers understand and contribute to open source projects. It provides detailed insights, contribution guidance, and good first issues discovery.

## Features

### 🔍 Repository Analysis
- **Repository Information**: Stars, forks, language, license, topics
- **Issue Analysis**: Open issues count, good first issues identification  
- **File Structure**: Project organization and key files detection
- **Technical Stack**: Package manager, framework, and dependencies detection

### 🎯 Contribution Guidance
- **Personalized Workflow**: Step-by-step contribution instructions
- **Technical Setup**: Framework-specific setup instructions
- **Best Practices**: Contribution checklist and guidelines
- **Good First Issues**: Beginner-friendly issues with labels and comments

### 📁 Project Understanding
- **File Structure**: Visual representation of project organization
- **Key Files Detection**: README, CONTRIBUTING, CODE_OF_CONDUCT status
- **Technical Details**: Package manager, framework, special requirements

## How to Use

1. **Enter Repository URL**: Paste any public GitHub repository URL
2. **Analyze**: Click analyze to fetch comprehensive repository data
3. **Explore Results**: Browse through different tabs for detailed information
4. **Start Contributing**: Follow the personalized contribution guide

## API Integration

### GitHub API
- Uses GitHub REST API v3 via Octokit
- Supports both authenticated and unauthenticated requests
- Rate limiting: 60 requests/hour (unauthenticated), 5000/hour (authenticated)

### Environment Configuration
```bash
# Optional: Add GitHub Personal Access Token for higher rate limits
GITHUB_TOKEN=your_github_token_here
```

### API Endpoints

#### POST /api/analyze-repo
Analyzes a GitHub repository and returns comprehensive data.

**Request Body:**
```json
{
  "url": "https://github.com/owner/repository"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "repo": { /* Repository metadata */ },
    "issues": [ /* All open issues */ ],
    "goodFirstIssues": [ /* Beginner-friendly issues */ ],
    "fileStructure": [ /* Project files and folders */ ],
    "contributionGuide": [ /* Step-by-step instructions */ ],
    "technicalDetails": { /* Tech stack information */ }
  }
}
```

## Technical Implementation

### Core Components

1. **GitHubService** (`lib/github-api.ts`)
   - Repository data fetching
   - Issue analysis and filtering
   - File structure exploration
   - Technical stack detection

2. **API Route** (`app/api/analyze-repo/route.ts`)
   - Request handling and validation
   - Error management
   - Response formatting

3. **RepoHelp Page** (`app/repo-help/page.tsx`)
   - User interface
   - Real-time analysis
   - Results visualization

### Data Processing

- **URL Parsing**: Extracts owner/repo from various GitHub URL formats
- **Issue Filtering**: Identifies good first issues by labels
- **Tech Stack Detection**: Analyzes package.json and project structure
- **Contribution Guide Generation**: Creates personalized workflow steps

### Error Handling

- Invalid URL validation
- Repository not found (404)
- Rate limit management (429)
- Network error recovery
- User-friendly error messages

## Supported Repository Types

### Languages & Frameworks
- ✅ JavaScript/TypeScript (React, Next.js, Vue, Angular)
- ✅ Python (Django, Flask, FastAPI)
- ✅ Ruby (Rails, Sinatra)
- ✅ Rust (Cargo projects)
- ✅ Java (Maven, Gradle)
- ✅ Go modules
- ✅ PHP (Composer)
- ✅ C# (.NET)

### Package Managers
- ✅ npm, yarn, pnpm
- ✅ pip (Python)
- ✅ bundler (Ruby)
- ✅ cargo (Rust)
- ✅ composer (PHP)

### Special Features
- Docker support detection
- CI/CD configuration recognition
- Documentation completeness scoring
- Contribution difficulty assessment

## Future Enhancements

### Planned Features
- [ ] AI-powered issue difficulty scoring
- [ ] Contribution impact estimation
- [ ] Mentor matching for repositories
- [ ] Repository health scoring
- [ ] Custom contribution templates
- [ ] Integration with project management tools

### Advanced Analysis
- [ ] Code complexity analysis
- [ ] Contributor activity patterns
- [ ] Issue resolution time prediction
- [ ] Technology trend analysis
- [ ] Community health metrics

## Troubleshooting

### Common Issues

1. **Rate Limit Exceeded**
   - Add GITHUB_TOKEN to environment variables
   - Wait for rate limit reset (1 hour)

2. **Repository Not Found**
   - Verify repository URL is correct
   - Ensure repository is public
   - Check if repository exists

3. **Analysis Timeout**
   - Large repositories may take longer
   - Try again with stable internet connection

### Development Setup

1. Install dependencies:
   ```bash
   npm install @octokit/rest
   ```

2. Configure environment (optional):
   ```bash
   cp .env.example .env.local
   # Add your GitHub token to .env.local
   ```

3. Test the feature:
   ```bash
   npm run dev
   # Navigate to /repo-help
   ```

## Contributing to RepoHelp

We welcome contributions! Here are some areas where you can help:

- **UI/UX Improvements**: Better visualization of repository data
- **Performance**: Optimization for large repositories
- **Features**: New analysis capabilities
- **Documentation**: Examples and tutorials
- **Testing**: Edge cases and error scenarios

Please follow our contribution guidelines and submit pull requests for any improvements.