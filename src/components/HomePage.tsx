import React from 'react';
import { AlertCircle, Search, Sparkles } from 'lucide-react';
import { TopicCard } from './TopicCard';
import type { Topic } from '../types';

interface HomePageProps {
  topic: string;
  setTopic: (topic: string) => void;
  loading: boolean;
  error: string | null;
  displayedTopics: Topic[];
  onSubmit: (e: React.FormEvent) => void;
  onTopicClick: (topic: Topic) => void;
}

export function HomePage({
  topic,
  setTopic,
  loading,
  error,
  displayedTopics,
  onSubmit,
  onTopicClick
}: HomePageProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-6 md:py-12">
      <div className="text-center mb-6 sm:mb-8 md:mb-12 relative">
        {/* Decorative elements */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-8 left-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-purple-400">
            Empowering knowledge,<br className="hidden sm:block" />one paper at a time
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-2">
            Transform your research ideas into comprehensive academic papers in minutes
          </p>
        </div>
      </div>
      
      <form onSubmit={onSubmit} className="mb-6 sm:mb-8 md:mb-12">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your research topic"
              className="w-full pl-9 sm:pl-11 pr-24 sm:pr-28 py-2.5 sm:py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg transition-all text-sm sm:text-base"
              disabled={loading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button
                type="submit"
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-1.5 shadow-lg text-xs sm:text-sm"
                disabled={loading}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Generate</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent rounded-3xl pointer-events-none" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 relative">
          {displayedTopics.map((topic, index) => (
            <TopicCard
              key={index}
              topic={topic}
              onClick={onTopicClick}
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-4 sm:mt-6 mx-2 bg-red-500/10 backdrop-blur-sm border border-red-500/20 p-3 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
            <p className="ml-2 text-red-200 text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}