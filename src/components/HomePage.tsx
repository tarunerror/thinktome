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
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
      <div className="text-center mb-12 md:mb-16 relative">
        {/* Decorative elements */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-8 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-purple-400">
            Empowering knowledge,<br />one paper at a time
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Transform your research ideas into comprehensive academic papers in minutes
          </p>
        </div>
      </div>
      
      <form onSubmit={onSubmit} className="mb-12 md:mb-16">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter your research topic (English only)"
            className="w-full pl-12 pr-32 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-lg transition-all"
            disabled={loading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2 shadow-lg"
              disabled={loading}
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate</span>
            </button>
          </div>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent rounded-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative">
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
        <div className="mt-8 bg-red-500/10 backdrop-blur-sm border border-red-500/20 p-4 rounded-xl">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="ml-3 text-red-200">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}