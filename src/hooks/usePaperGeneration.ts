import { useState } from 'react';
import { generatePaper, fetchWikiData } from '../services/api';
import type { ResearchSource, TableOfContentsItem } from '../types';
import { parsePaperSections } from '../utils/paper';
import { getResearchTemplate } from '../utils/researchTemplates';

interface PlagiarismResult {
  similarity: number;
  matches: Array<{
    text: string;
    source: string;
    similarity: number;
    startIndex: number;
    endIndex: number;
  }>;
  overallScore: number;
  isPlagiarized: boolean;
}

interface AIDetectionResult {
  aiProbability: number;
  humanProbability: number;
  indicators: Array<{
    name: string;
    score: number;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }>;
  overallClassification: 'human' | 'likely-human' | 'uncertain' | 'likely-ai' | 'ai';
  suggestions: string[];
}

export function usePaperGeneration() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paper, setPaper] = useState<string | null>(null);
  const [sources, setSources] = useState<ResearchSource[]>([]);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [paperSections, setPaperSections] = useState<Record<string, string>>({});
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['introduction']));
  const [contentIntegrity, setContentIntegrity] = useState<{
    plagiarism: PlagiarismResult;
    aiDetection: AIDetectionResult;
    isAcceptable: boolean;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent | null, selectedTopic?: string) => {
    if (e) e.preventDefault();
    
    const topicToUse = selectedTopic || topic;
    if (!topicToUse) return;

    setLoading(true);
    setError(null);
    setPaper(null);
    setSources([]);
    setTableOfContents([]);
    setPaperSections({});

    try {
      const { summary, sources: researchSources } = await fetchWikiData(topicToUse);
      setSources(researchSources);
      const generatedPaper = await generatePaper(topicToUse, summary);
      setPaper(generatedPaper);
      
      const sections = parsePaperSections(generatedPaper);
      setPaperSections(sections);
      
      const template = getResearchTemplate(topicToUse);
      setTableOfContents(template.sections);

      setSelectedSection('abstract');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const resetState = () => {
    setPaper(null);
    setTopic('');
    setSources([]);
    setTableOfContents([]);
    setPaperSections({});
    setSelectedSection(null);
    setError(null);
  };

  return {
    topic,
    setTopic,
    loading,
    error,
    paper,
    sources,
    tableOfContents,
    selectedSection,
    setSelectedSection,
    paperSections,
    expandedSections,
    handleSubmit,
    toggleSection,
    resetState,
    contentIntegrity,
    setContentIntegrity,
  };
}