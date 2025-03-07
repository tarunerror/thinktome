import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { TableOfContents } from './TableOfContents';
import { PaperContent } from './PaperContent';
import type { TableOfContentsItem } from '../types';

interface PaperViewProps {
  topic: string;
  tableOfContents: TableOfContentsItem[];
  selectedSection: string | null;
  expandedSections: Set<string>;
  paperSections: Record<string, string>;
  onBack: () => void;
  onSectionSelect: (id: string) => void;
  onSectionToggle: (id: string) => void;
}

export function PaperView({
  topic,
  tableOfContents,
  selectedSection,
  expandedSections,
  paperSections,
  onBack,
  onSectionSelect,
  onSectionToggle
}: PaperViewProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
      <button
        onClick={onBack}
        className="mb-4 md:mb-6 flex items-center text-gray-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Topics
      </button>
      <div className="bg-gray-800 rounded-xl shadow-xl border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-4 min-h-[600px]">
          <TableOfContents
            items={tableOfContents}
            selectedSection={selectedSection}
            expandedSections={expandedSections}
            onSectionSelect={onSectionSelect}
            onSectionToggle={onSectionToggle}
          />
          <PaperContent
            topic={topic}
            selectedSection={selectedSection}
            paperSections={paperSections}
          />
        </div>
      </div>
    </div>
  );
}