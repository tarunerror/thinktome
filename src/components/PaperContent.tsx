import React from 'react';

interface PaperContentProps {
  topic: string;
  selectedSection: string | null;
  paperSections: Record<string, string>;
}

export function PaperContent({ topic, selectedSection, paperSections }: PaperContentProps) {
  return (
    <div className="md:col-span-3 p-4 md:p-8 bg-gray-900 border-t md:border-t-0 md:border-l border-gray-700">
      <div className="prose prose-invert max-w-none">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 font-serif">
          {topic}
        </h1>
        <div className="text-gray-300 leading-relaxed space-y-4 md:space-y-6">
          {selectedSection && paperSections[selectedSection]?.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('#')) {
              const level = paragraph.match(/^#+/)?.[0].length || 1;
              const title = paragraph.replace(/^#+\s*/, '');
              const Tag = `h${level}` as keyof JSX.IntrinsicElements;
              return (
                <Tag 
                  key={index}
                  className={`
                    ${level === 1 ? 'text-2xl md:text-3xl' : ''}
                    ${level === 2 ? 'text-xl md:text-2xl' : ''}
                    ${level === 3 ? 'text-lg md:text-xl' : ''}
                    font-bold text-white mt-6 md:mt-8 mb-3 md:mb-4
                  `}
                >
                  {title}
                </Tag>
              );
            }
            
            if (paragraph.startsWith('*') || paragraph.startsWith('-')) {
              return (
                <ul key={index} className="list-disc list-inside space-y-2 text-gray-300">
                  <li>{paragraph.replace(/^[*-]\s*/, '')}</li>
                </ul>
              );
            }
            
            if (paragraph.startsWith('1.') || paragraph.startsWith('2.')) {
              return (
                <ol key={index} className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>{paragraph.replace(/^\d+\.\s*/, '')}</li>
                </ol>
              );
            }

            if (paragraph.includes('<img')) {
              return (
                <div key={index} className="my-6 md:my-8" dangerouslySetInnerHTML={{ __html: paragraph }} />
              );
            }

            return paragraph.trim() ? (
              <p key={index} className="text-gray-300">
                {paragraph}
              </p>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}