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
      <ul className={`space-y-1 ${level > 0 ? 'ml-4 mt-1' : ''}`}>
        {items.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => {
                if (item.children) {
                  onSectionToggle(item.id);
                }
                onSectionSelect(item.id);
              }}
              className={`flex items-center space-x-2 text-left w-full px-3 py-2 rounded transition-colors
                ${selectedSection === item.id 
                  ? 'bg-primary-900/50 text-primary-400 font-medium' 
                  : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'}`}
            >
              {item.children ? (
                <span className="w-4">
                  {expandedSections.has(item.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </span>
              ) : (
                <span className="w-4" />
              )}
              <span className={`${item.level > 1 ? 'text-sm' : 'font-medium'}`}>
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
    <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-gray-700 p-4 md:p-6 bg-gray-800/50">
      <h3 className="text-lg font-semibold text-white mb-4 md:mb-6">
        Table of Contents
      </h3>
      {renderItems(items)}
    </div>
  );
}