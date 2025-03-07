import React from 'react';
import { Loader2, ThumbsUp, MessageCircle, Calendar } from 'lucide-react';
import type { DevToArticle } from '../services/api/devto';

interface DiscoverPageProps {
  latestArticles: DevToArticle[];
  trendingArticles: DevToArticle[];
  isLoading: boolean;
}

function ArticleCard({ article }: { article: DevToArticle }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-200"
    >
      <h3 className="text-sm sm:text-base font-medium text-white mb-2 line-clamp-2">
        {article.title}
      </h3>
      {article.description && (
        <p className="text-xs sm:text-sm text-gray-400 mb-3 line-clamp-2">
          {article.description}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
        <div className="flex items-center text-gray-400 min-w-0">
          <img
            src={article.user.profile_image}
            alt={article.user.name}
            className="h-5 w-5 sm:h-6 sm:w-6 rounded-full mr-2 flex-shrink-0"
          />
          <span className="truncate">{article.user.name}</span>
        </div>
        <div className="flex items-center space-x-3 sm:space-x-4 text-gray-400 flex-shrink-0">
          <div className="flex items-center">
            <ThumbsUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
            <span>{article.reactions_count}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
            <span>{article.comments_count}</span>
          </div>
          <div className="hidden sm:flex items-center">
            <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1" />
            <span>{new Date(article.published_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export function DiscoverPage({ latestArticles, trendingArticles, isLoading }: DiscoverPageProps) {
  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
          Discover
        </h1>
        
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center">
                <span className="bg-blue-500 w-1.5 h-5 sm:h-6 rounded mr-2"></span>
                Latest Articles
              </h2>
              <div className="grid gap-2 sm:gap-3">
                {latestArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4 flex items-center">
                <span className="bg-green-500 w-1.5 h-5 sm:h-6 rounded mr-2"></span>
                Trending
              </h2>
              <div className="grid gap-2 sm:gap-3">
                {trendingArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}