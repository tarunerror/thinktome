import React from 'react';
import { Clock } from 'lucide-react';
import type { SavedSession } from '../types';

interface LibraryPageProps {
  sessions: SavedSession[];
  onSessionSelect: (session: SavedSession) => void;
}

export function LibraryPage({ sessions, onSessionSelect }: LibraryPageProps) {
  return (
    <div className="min-h-screen w-full">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
          My Library
        </h1>
        
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4 sm:p-6">
            <div className="max-w-sm mx-auto space-y-2">
              <h2 className="text-lg sm:text-xl text-gray-300 font-medium">
                No saved research papers yet.
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                Generate a paper to see it here!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-2 sm:gap-3">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onSessionSelect(session)}
                className="w-full text-left bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200"
              >
                <h3 className="text-sm sm:text-base font-medium text-white mb-2 line-clamp-2">
                  {session.topic}
                </h3>
                <div className="flex items-center text-xs sm:text-sm text-gray-400">
                  <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
                  <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}