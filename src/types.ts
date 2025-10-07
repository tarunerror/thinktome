export interface Topic {
  title: string;
  description: string;
  category: 'technology' | 'science' | 'medicine' | 'environment' | 'social';
}

export interface ResearchSource {
  title: string;
  url: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface WikiSearchResult {
  title: string;
  snippet: string;
  pageid: number;
}

export interface WikiPage {
  pageid: number;
  title: string;
  extract?: string;
  fullurl?: string;
}

export interface WikiResponse {
  query: {
    search: WikiSearchResult[];
    pages?: Record<string, WikiPage>;
  };
}

export interface AcademicSource {
  title: string;
  authors: string[];
  abstract: string;
  url: string;
  source: string;
  year: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children?: TableOfContentsItem[];
}

export interface ResearchProgress {
  overallProgress: number;
  currentStage: string;
  stageProgress: number;
  completedSources: number;
  totalSources: number;
}

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image?: string;
  published_at: string;
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  tags: string[];
  reactions_count: number;
  comments_count: number;
}

export interface ResearchImage {
  title: string;
  description: string;
  type: 'graph' | 'diagram' | 'photo';
  url: string;
}

export interface SavedSession {
  id: string;
  topic: string;
  content: string;
  createdAt: number;
  tableOfContents?: TableOfContentsItem[];
  sections?: Record<string, string>;
}

export type ActiveView = 'home' | 'paper' | 'discover' | 'library';

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
  decimals?: number;
  icon?: React.ReactNode;
  color?: string;
}

export type ResearchType = 
  | 'basic'
  | 'experimental'
  | 'qualitative'
  | 'review'
  | 'thesis'
  | 'scientific';

export interface ResearchTemplate {
  type: ResearchType;
  sections: {
    id: string;
    title: string;
    level: number;
    children?: Array<{
      id: string;
      title: string;
      level: number;
    }>;
  }[];
}