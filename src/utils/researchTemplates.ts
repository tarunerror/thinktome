import type { ResearchTemplate } from '../types';

export const researchTemplates: Record<string, ResearchTemplate> = {
  basic: {
    type: 'basic',
    sections: [
      { id: 'abstract', title: 'Abstract', level: 1 },
      { id: 'introduction', title: 'Introduction', level: 1 },
      { id: 'literature-review', title: 'Literature Review', level: 1 },
      { id: 'methodology', title: 'Methodology', level: 1 },
      { id: 'results', title: 'Results', level: 1 },
      { id: 'discussion', title: 'Discussion', level: 1 },
      { id: 'conclusion', title: 'Conclusion', level: 1 },
      { id: 'references', title: 'References', level: 1 },
      { id: 'appendices', title: 'Appendices', level: 1 }
    ]
  },
  experimental: {
    type: 'experimental',
    sections: [
      { id: 'abstract', title: 'Abstract', level: 1 },
      { id: 'introduction', title: 'Introduction', level: 1 },
      { 
        id: 'research-background',
        title: 'Research Background',
        level: 1,
        children: [
          { id: 'problem-statement', title: 'Problem Statement', level: 2 },
          { id: 'research-objectives', title: 'Research Objectives', level: 2 },
          { id: 'theoretical-framework', title: 'Theoretical Framework', level: 2 }
        ]
      },
      {
        id: 'methodology',
        title: 'Methodology',
        level: 1,
        children: [
          { id: 'research-design', title: 'Research Design', level: 2 },
          { id: 'materials-equipment', title: 'Materials and Equipment', level: 2 },
          { id: 'procedures', title: 'Procedures', level: 2 }
        ]
      },
      {
        id: 'results',
        title: 'Results',
        level: 1,
        children: [
          { id: 'data-analysis', title: 'Data Analysis', level: 2 }
        ]
      },
      { id: 'discussion', title: 'Discussion', level: 1 },
      { id: 'conclusion', title: 'Conclusion and Recommendations', level: 1 },
      { id: 'references', title: 'References', level: 1 },
      { id: 'appendices', title: 'Appendices', level: 1 }
    ]
  },
  qualitative: {
    type: 'qualitative',
    sections: [
      { id: 'abstract', title: 'Abstract', level: 1 },
      {
        id: 'introduction',
        title: 'Introduction',
        level: 1,
        children: [
          { id: 'research-questions', title: 'Research Questions', level: 2 }
        ]
      },
      { id: 'literature-review', title: 'Literature Review', level: 1 },
      {
        id: 'methodology',
        title: 'Research Design and Methods',
        level: 1,
        children: [
          { id: 'participant-selection', title: 'Participant Selection', level: 2 },
          { id: 'data-collection', title: 'Data Collection Methods', level: 2 },
          { id: 'data-analysis', title: 'Data Analysis', level: 2 }
        ]
      },
      { id: 'findings', title: 'Findings', level: 1 },
      { id: 'discussion', title: 'Discussion', level: 1 },
      { id: 'conclusions', title: 'Conclusions', level: 1 },
      { id: 'implications', title: 'Implications for Practice', level: 1 },
      { id: 'references', title: 'References', level: 1 },
      { id: 'appendices', title: 'Appendices', level: 1 }
    ]
  },
  review: {
    type: 'review',
    sections: [
      { id: 'abstract', title: 'Abstract', level: 1 },
      {
        id: 'introduction',
        title: 'Introduction',
        level: 1,
        children: [
          { id: 'scope', title: 'Scope of the Review', level: 2 },
          { id: 'research-questions', title: 'Research Questions', level: 2 }
        ]
      },
      {
        id: 'methodology',
        title: 'Methodology',
        level: 1,
        children: [
          { id: 'selection-criteria', title: 'Selection Criteria', level: 2 },
          { id: 'data-sources', title: 'Data Sources', level: 2 }
        ]
      },
      {
        id: 'literature-review',
        title: 'Review of Literature',
        level: 1,
        children: [
          { id: 'key-themes', title: 'Key Themes', level: 2 },
          { id: 'comparative-analysis', title: 'Comparative Analysis', level: 2 }
        ]
      },
      { id: 'discussion', title: 'Discussion', level: 1 },
      { id: 'conclusion', title: 'Conclusion', level: 1 },
      { id: 'future-directions', title: 'Future Directions', level: 1 },
      { id: 'references', title: 'References', level: 1 }
    ]
  },
  thesis: {
    type: 'thesis',
    sections: [
      { id: 'title-page', title: 'Title Page', level: 1 },
      { id: 'declaration', title: 'Declaration', level: 1 },
      { id: 'acknowledgments', title: 'Acknowledgments', level: 1 },
      { id: 'abstract', title: 'Abstract', level: 1 },
      { id: 'table-of-contents', title: 'Table of Contents', level: 1 },
      { id: 'list-of-tables', title: 'List of Tables', level: 1 },
      { id: 'list-of-figures', title: 'List of Figures', level: 1 },
      { id: 'introduction', title: 'Introduction', level: 1 },
      { id: 'literature-review', title: 'Literature Review', level: 1 },
      { id: 'research-methodology', title: 'Research Methodology', level: 1 },
      { id: 'results-discussion', title: 'Results and Discussion', level: 1 },
      { id: 'conclusion', title: 'Conclusion and Recommendations', level: 1 },
      { id: 'references', title: 'References', level: 1 },
      { id: 'appendices', title: 'Appendices', level: 1 }
    ]
  },
  scientific: {
    type: 'scientific',
    sections: [
      { id: 'abstract', title: 'Abstract', level: 1 },
      { id: 'introduction', title: 'Introduction', level: 1 },
      { id: 'materials-methods', title: 'Materials and Methods', level: 1 },
      { id: 'results', title: 'Results', level: 1 },
      { id: 'discussion', title: 'Discussion', level: 1 },
      { id: 'conclusion', title: 'Conclusion', level: 1 },
      { id: 'acknowledgments', title: 'Acknowledgments', level: 1 },
      { id: 'references', title: 'References', level: 1 },
      { id: 'supplementary', title: 'Supplementary Information', level: 1 }
    ]
  }
};

export function analyzeResearchType(topic: string): ResearchType {
  const topicLower = topic.toLowerCase();
  
  // Keywords that suggest experimental research
  if (topicLower.includes('experiment') || 
      topicLower.includes('effect of') ||
      topicLower.includes('impact of') ||
      topicLower.includes('testing') ||
      topicLower.includes('trial')) {
    return 'experimental';
  }
  
  // Keywords that suggest qualitative research
  if (topicLower.includes('experience') ||
      topicLower.includes('perception') ||
      topicLower.includes('understanding') ||
      topicLower.includes('lived') ||
      topicLower.includes('narrative')) {
    return 'qualitative';
  }
  
  // Keywords that suggest review papers
  if (topicLower.includes('review') ||
      topicLower.includes('analysis of literature') ||
      topicLower.includes('systematic review') ||
      topicLower.includes('meta-analysis')) {
    return 'review';
  }
  
  // Keywords that suggest scientific research
  if (topicLower.includes('quantum') ||
      topicLower.includes('molecular') ||
      topicLower.includes('chemical') ||
      topicLower.includes('physics') ||
      topicLower.includes('biology')) {
    return 'scientific';
  }
  
  // Keywords that suggest thesis/dissertation
  if (topicLower.includes('thesis') ||
      topicLower.includes('dissertation') ||
      topicLower.includes('comprehensive') ||
      topicLower.includes('in-depth study')) {
    return 'thesis';
  }
  
  // Default to basic research paper
  return 'basic';
}

export function getResearchTemplate(topic: string): ResearchTemplate {
  const type = analyzeResearchType(topic);
  return researchTemplates[type];
}