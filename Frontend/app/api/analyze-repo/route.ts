import { NextRequest, NextResponse } from 'next/server';
import { GitHubService } from '@/lib/github-api';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'Repository URL is required' },
        { status: 400 }
      );
    }

    // Validate GitHub URL
    const parsed = GitHubService.parseRepoUrl(url);
    if (!parsed) {
      return NextResponse.json(
        { error: 'Invalid GitHub repository URL' },
        { status: 400 }
      );
    }

    // Analyze the repository
    const analysis = await GitHubService.analyzeRepository(url);

    return NextResponse.json({
      success: true,
      data: analysis,
    });

  } catch (error: any) {
    console.error('Repository analysis error:', error);
    
    // Handle different types of errors
    if (error.message.includes('Not Found')) {
      return NextResponse.json(
        { error: 'Repository not found or is private' },
        { status: 404 }
      );
    }

    if (error.message.includes('rate limit')) {
      return NextResponse.json(
        { error: 'GitHub API rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to analyze repository' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Repository Help API - POST a GitHub URL to analyze',
    example: {
      url: 'https://github.com/owner/repository'
    }
  });
}