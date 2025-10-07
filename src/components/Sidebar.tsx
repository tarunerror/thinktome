import { useState } from 'react';
import { PlusCircle, Compass, Library, ChevronLeft as ChevronDoubleLeft, ChevronRight as ChevronDoubleRight } from 'lucide-react';
import type { ActiveView } from '../types';

interface SidebarProps {
  onNewSession: () => void;
  onViewChange: (view: ActiveView) => void;
  activeView: ActiveView;
  isLoading?: boolean;
  isCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

export function Sidebar({ onNewSession, onViewChange, activeView, isLoading, isCollapsed: externalIsCollapsed, onCollapsedChange }: SidebarProps) {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  
  const isCollapsed = externalIsCollapsed !== undefined ? externalIsCollapsed : internalIsCollapsed;
  const setIsCollapsed = onCollapsedChange || setInternalIsCollapsed;

  const toggleSection = (section: string) => {
    if (!isLoading) {
      if (section === 'discover') {
        onViewChange('discover');
      } else if (section === 'library') {
        onViewChange('library');
      }
    }
  };

  return (
    <div className={`fixed top-16 sm:top-18 left-0 h-[calc(100vh-4rem)] sm:h-[calc(100vh-4.5rem)] bg-gray-800 border-r border-gray-700 transition-all duration-300 z-40 ${
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

      <div className="flex flex-col h-full pb-4">
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

        <nav className="flex-1">
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
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}