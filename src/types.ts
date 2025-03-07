// ... existing types

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