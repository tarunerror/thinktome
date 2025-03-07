import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { TableOfContents } from './TableOfContents';
import { PaperContent } from './PaperContent';
import { Helmet } from 'react-helmet-async';
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
  const abstract = paperSections['abstract'] || '';
  const firstParagraph = abstract.split('\n')[0] || '';

  return (
    <>
      <Helmet>
        <title>{`${topic} - Research Paper | ThinkTome`}</title>
        <meta name="description" content={firstParagraph} />
        <meta property="og:title" content={`${topic} - Research Paper | ThinkTome`} />
        <meta property="og:description" content={firstParagraph} />
        <meta name="twitter:title" content={`${topic} - Research Paper | ThinkTome`} />
        <meta name="twitter:description" content={firstParagraph} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            "headline": topic,
            "description": firstParagraph,
            "datePublished": new Date().toISOString(),
            "author": {
              "@type": "Organization",
              "name": "ThinkTome AI"
            },
            "publisher": {
              "@type": "Organization",
              "name": "ThinkTome",
              "logo": {
                "@type": "ImageObject",
                "url": "https://thinktome.netlify.app/logo.svg"
              }
            }
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        <button
          onClick={onBack}
          className="mb-4 md:mb-6 flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
          <span className="text-sm sm:text-base">Back to Topics</span>
        </button>
        <div className="bg-gray-800 rounded-lg sm:rounded-xl shadow-xl border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 min-h-[600px]">
            <div className="md:hidden p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-2">Table of Contents</h2>
              <select
                value={selectedSection || ''}
                onChange={(e) => onSectionSelect(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg py-2 px-3"
              >
                {tableOfContents.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden md:block">
              <TableOfContents
                items={tableOfContents}
                selectedSection={selectedSection}
                expandedSections={expandedSections}
                onSectionSelect={onSectionSelect}
                onSectionToggle={onSectionToggle}
              />
            </div>
            <PaperContent
              topic={topic}
              selectedSection={selectedSection}
              paperSections={paperSections}
            />
          </div>
        </div>
      </div>
    </>
  );
}