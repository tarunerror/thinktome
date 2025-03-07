import React, { useState } from 'react';
import { PlusCircle, Compass, Library, ChevronRight, ChevronDown, ChevronLeft as ChevronDoubleLeft, ChevronRight as ChevronDoubleRight } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { SavedSession, ActiveView } from '../types';

interface SidebarProps {
  onNewSession: () => void;
  onSessionSelect: (session: SavedSession) => void;
  onViewChange: (view: ActiveView) => void;
  activeView: ActiveView;
  isLoading?: boolean;
}

export function Sidebar({ onNewSession, onSessionSelect, onViewChange, activeView, isLoading }: SidebarProps) {
  const [savedSessions] = useLocalStorage<SavedSession[]>('research_sessions', []);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['library']));
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSection = (section: string) => {
    if (!isLoading) {
      if (section === 'discover') {
        onViewChange('discover');
      } else if (section === 'library') {
        onViewChange('library');
      }
      
      setExpandedSections(prev => {
        const next = new Set(prev);
        if (next.has(section)) {
          next.delete(section);
        } else {
          next.add(section);
        }
        return next;
      });
    }
  };

  return (
    <div className={`relative bg-gray-800 border-r border-gray-700 transition-all duration-300 ${
      isCollapsed ? 'w-12 sm:w-14 md:w-16' : 'w-16 sm:w-20 md:w-64'
    }`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-2.5 sm:-right-3 top-4 bg-gray-700 rounded-full p-0.5 sm:p-1 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors z-10"
      >
        {isCollapsed ? 
          <ChevronDoubleRight className="h-3 w-3 sm:h-4 sm:w-4" /> : 
          <ChevronDoubleLeft className="h-3 w-3 sm:h-4 sm:w-4" />
        }
      </button>

      <div className="h-[calc(100vh-3.5rem)] flex flex-col">
        <div className="p-2 sm:p-3 md:p-4">
          <button
            onClick={onNewSession}
            disabled={isLoading}
            className={`flex items-center gap-1.5 sm:gap-2 bg-primary-500 hover:bg-primary-600 text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg transition-colors w-full ${
              isCollapsed ? 'justify-center' : ''
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            {!isCollapsed && <span className="hidden md:inline text-sm">New Session</span>}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <div className="px-1.5 sm:px-2 md:px-3 py-1">
            <button
              onClick={() => toggleSection('discover')}
              disabled={isLoading}
              className={`w-full flex items-center justify-between text-gray-300 hover:text-white px-2 py-1.5 sm:py-2 rounded-lg transition-colors ${
                activeView === 'discover' ? 'bg-gray-700' : ''
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Compass className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                {!isCollapsed && <span className="hidden md:inline text-sm">Discover</span>}
              </div>
              {!isCollapsed && (
                <ChevronRight className="hidden md:block h-4 w-4" />
              )}
            </button>
          </div>

          <div className="px-1.5 sm:px-2 md:px-3 py-1">
            <button
              onClick={() => toggleSection('library')}
              disabled={isLoading}
              className={`w-full flex items-center justify-between text-gray-300 hover:text-white px-2 py-1.5 sm:py-2 rounded-lg transition-colors ${
                activeView === 'library' ? 'bg-gray-700' : ''
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Library className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                {!isCollapsed && <span className="hidden md:inline text-sm">My Library</span>}
              </div>
              {!isCollapsed && (
                <ChevronRight className="hidden md:block h-4 w-4" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}