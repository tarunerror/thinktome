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
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-gray-700 rounded-full p-1 text-gray-300 hover:text-white hover:bg-gray-600 transition-colors"
      >
        {isCollapsed ? <ChevronDoubleRight className="h-4 w-4" /> : <ChevronDoubleLeft className="h-4 w-4" />}
      </button>

      <div className="h-screen flex flex-col">
        <div className="p-4">
          <button
            onClick={onNewSession}
            disabled={isLoading}
            className={`flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors w-full ${
              isCollapsed ? 'justify-center' : ''
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <PlusCircle className="h-6 w-6 flex-shrink-0" />
            {!isCollapsed && <span>New Session</span>}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <div className="px-3 py-2">
            <button
              onClick={() => toggleSection('discover')}
              disabled={isLoading}
              className={`w-full flex items-center justify-between text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors ${
                activeView === 'discover' ? 'bg-gray-700' : ''
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-2">
                <Compass className="h-6 w-6 flex-shrink-0" />
                {!isCollapsed && <span>Discover</span>}
              </div>
              {!isCollapsed && (
                expandedSections.has('discover') ? 
                <ChevronDown className="h-5 w-5" /> : 
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="px-3 py-2">
            <button
              onClick={() => toggleSection('library')}
              disabled={isLoading}
              className={`w-full flex items-center justify-between text-gray-300 hover:text-white px-3 py-2 rounded-lg transition-colors ${
                activeView === 'library' ? 'bg-gray-700' : ''
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-2">
                <Library className="h-6 w-6 flex-shrink-0" />
                {!isCollapsed && <span>My Library</span>}
              </div>
              {!isCollapsed && (
                expandedSections.has('library') ? 
                <ChevronDown className="h-5 w-5" /> : 
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}