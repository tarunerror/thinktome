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
      className="block bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors"
    >
      <h3 className="text-white font-medium mb-2 line-clamp-2">{article.title}</h3>
      {article.description && (
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{article.description}</p>
      )}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-400">
          <img
            src={article.user.profile_image}
            alt={article.user.name}
            className="h-6 w-6 rounded-full mr-2"
          />
          <span>{article.user.name}</span>
        </div>
        <div className="flex items-center space-x-4 text-gray-400">
          <div className="flex items-center">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{article.reactions_count}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-1" />
            <span>{article.comments_count}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(article.published_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

export function DiscoverPage({ latestArticles, trendingArticles, isLoading }: DiscoverPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Discover</h1>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 text-primary-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-blue-500 w-2 h-6 rounded mr-2"></span>
              Latest Articles
            </h2>
            <div className="grid gap-4">
              {latestArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <span className="bg-green-500 w-2 h-6 rounded mr-2"></span>
              Trending
            </h2>
            <div className="grid gap-4">
              {trendingArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}