import React from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { TableOfContentsItem } from '../types';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  selectedSection: string | null;
  expandedSections: Set<string>;
  onSectionSelect: (id: string) => void;
  onSectionToggle: (id: string) => void;
}

export function TableOfContents({ 
  items, 
  selectedSection, 
  expandedSections, 
  onSectionSelect, 
  onSectionToggle 
}: TableOfContentsProps) {
  const renderItems = (items: TableOfContentsItem[], level = 0) => {
    return (
      <ul className={`space-y-0.5 sm:space-y-1 ${level > 0 ? 'ml-3 sm:ml-4 mt-0.5 sm:mt-1' : ''}`}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => {
                if (item.children) {
                  onSectionToggle(item.id);
                }
                onSectionSelect(item.id);
              }}
              className={`flex items-center space-x-2 text-left w-full px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors
                ${selectedSection === item.id 
                  ? 'bg-primary-900/50 text-primary-400 font-medium' 
                  : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'}`}
            >
              {item.children ? (
                <span className="w-4 flex-shrink-0">
                  {expandedSections.has(item.id) ? (
                    <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  )}
                </span>
              ) : (
                <span className="w-4 flex-shrink-0" />
              )}
              <span className={`${item.level > 1 ? 'text-xs sm:text-sm' : 'text-sm sm:text-base font-medium'} truncate`}>
                {item.title}
              </span>
            </button>
            {item.children && expandedSections.has(item.id) && (
              renderItems(item.children, level + 1)
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-gray-700 p-3 sm:p-4 md:p-6 bg-gray-800/50">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 md:mb-6">
        Table of Contents
      </h3>
      {renderItems(items)}
    </div>
  );
}