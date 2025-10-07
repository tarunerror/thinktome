import { Clock, FileText, Sparkles, Search } from 'lucide-react';
import type { SavedSession } from '../types';

interface LibraryPageProps {
  sessions: SavedSession[];
  onSessionSelect: (session: SavedSession) => void;
}

export function LibraryPage({ sessions, onSessionSelect }: LibraryPageProps) {
  return (
    <div className="min-h-screen w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Header */}
        <div className="mb-8 sm:mb-12 fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 glass rounded-full">
            <FileText className="h-4 w-4 text-primary-400" />
            <span className="text-sm text-gray-300 font-medium">Your Research Collection</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="gradient-text">My Library</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
            Access and manage all your generated research papers in one place
          </p>
        </div>
        
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center glass-stronger rounded-2xl p-8 sm:p-12 fade-in">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full" />
              <Search className="h-20 w-20 sm:h-24 sm:w-24 text-gray-600 relative" />
            </div>
            <h2 className="text-2xl sm:text-3xl text-white font-bold mb-3">
              No Research Papers Yet
            </h2>
            <p className="text-base sm:text-lg text-gray-400 mb-6 max-w-md">
              Start your research journey by generating your first paper
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Sparkles className="h-4 w-4" />
              <span>Your papers will appear here automatically</span>
            </div>
          </div>
        ) : (
          <>
            {/* Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 fade-in">
              <div className="glass-stronger rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-500/20 rounded-lg">
                    <FileText className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">{sessions.length}</div>
                    <div className="text-xs sm:text-sm text-gray-400">Total Papers</div>
                  </div>
                </div>
              </div>
              
              <div className="glass-stronger rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Clock className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {sessions.length > 0 ? new Date(sessions[sessions.length - 1].createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400">Last Generated</div>
                  </div>
                </div>
              </div>
              
              <div className="glass-stronger rounded-xl p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-500/20 rounded-lg">
                    <Sparkles className="h-5 w-5 text-pink-400" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold gradient-text">Active</div>
                    <div className="text-xs sm:text-sm text-gray-400">Collection Status</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Papers Grid */}
            <div className="grid gap-4 sm:gap-5">
              {sessions.map((session, index) => (
                <button
                  key={session.id}
                  onClick={() => onSessionSelect(session)}
                  className="w-full text-left glass card-hover rounded-2xl p-5 sm:p-6 group fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 p-3 glass-stronger rounded-xl group-hover:bg-primary-500/20 smooth-transition">
                      <FileText className="h-6 w-6 text-primary-400 group-hover:scale-110 smooth-transition" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-primary-300 smooth-transition">
                        {session.topic}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(session.createdAt).toLocaleDateString('en-US', { 
                            year: 'numeric',
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        
                        <div className="h-4 w-px bg-gray-700" />
                        
                        <span className="px-2.5 py-1 bg-green-500/20 text-green-300 rounded-md font-medium">
                          Completed
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 smooth-transition">
                      <div className="p-2 glass-stronger rounded-lg">
                        <svg className="h-5 w-5 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}