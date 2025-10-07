import React from 'react';
import { AlertCircle, Search, Sparkles, BookOpen, Zap, Award } from 'lucide-react';
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
    <div className="w-full max-w-6xl mx-auto px-3 py-4 sm:px-4 sm:py-6 md:py-12">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-12 md:mb-16 relative">
        {/* Enhanced decorative elements with animation */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-r from-primary-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -top-8 left-1/4 w-32 sm:w-48 h-32 sm:h-48 bg-purple-500/15 rounded-full blur-2xl pointer-events-none float" />
        <div className="absolute top-0 right-1/4 w-40 sm:w-56 h-40 sm:h-56 bg-blue-500/15 rounded-full blur-2xl pointer-events-none float" style={{ animationDelay: '1s' }} />
        
        <div className="relative fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="animate-text-gradient">Empowering Knowledge,</span>
            <br className="hidden sm:block" />
            <span className="text-white">One Paper at a Time</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-2 mb-8 leading-relaxed">
            Transform your research ideas into comprehensive, well-structured academic papers within minutes using advanced AI technology
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <BookOpen className="h-4 w-4 text-primary-400" />
              <span>Academic Quality</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Lightning Fast</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Award className="h-4 w-4 text-pink-400" />
              <span>Research Verified</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced Search Section */}
      <form onSubmit={onSubmit} className="mb-10 sm:mb-12 md:mb-16">
        <div className="relative max-w-3xl mx-auto scale-in">
          <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10 flex items-center">
            <Search className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
          <div className="relative group">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter your research topic or question..."
              className="w-full pl-12 sm:pl-14 pr-36 sm:pr-40 md:pr-44 py-4 sm:py-5 glass-stronger rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent shadow-2xl transition-all text-base sm:text-lg font-medium group-hover:shadow-primary-500/20"
              disabled={loading}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none blur-xl" />
            <button
              type="submit"
              className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 btn-gradient px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-xl text-white flex items-center justify-center gap-2 font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg z-10"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner h-5 w-5" />
                  <span className="hidden sm:inline">Generating...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Generate</span>
                </>
              )}
            </button>
          </div>
          {/* Subtle hint text */}
          <p className="text-xs sm:text-sm text-gray-500 text-center mt-3">
            Try topics like "Machine Learning", "Climate Change", or "Quantum Computing"
          </p>
        </div>
      </form>

      {/* Topics Grid Section */}
      <div className="relative">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
            Explore Trending Topics
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Start with curated research topics across various domains
          </p>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent rounded-3xl pointer-events-none" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 relative">
          {displayedTopics.map((topic, index) => (
            <div
              key={index}
              className="fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <TopicCard
                topic={topic}
                onClick={onTopicClick}
              />
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-6 sm:mt-8 mx-2 scale-in">
          <div className="glass-stronger border border-red-500/30 p-4 rounded-xl max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-red-200 font-semibold mb-1">Error</h3>
                <p className="text-red-200/80 text-sm">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}