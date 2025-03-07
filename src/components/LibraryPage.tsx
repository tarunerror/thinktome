import React from 'react';
import { Clock } from 'lucide-react';
import type { SavedSession } from '../types';

interface LibraryPageProps {
  sessions: SavedSession[];
  onSessionSelect: (session: SavedSession) => void;
}

export function LibraryPage({ sessions, onSessionSelect }: LibraryPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Library</h1>
      
      {sessions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No saved research papers yet.</p>
          <p className="text-gray-500 mt-2">Generate a paper to see it here!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => onSessionSelect(session)}
              className="block text-left bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors w-full"
            >
              <h3 className="text-white font-medium mb-2">{session.topic}</h3>
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="h-4 w-4 mr-2" />
                <span>{new Date(session.createdAt).toLocaleDateString()}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}