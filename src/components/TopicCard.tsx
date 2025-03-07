import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  onClick: (topic: Topic) => void;
}

export function TopicCard({ topic, onClick }: TopicCardProps) {
  return (
    <button
      onClick={() => onClick(topic)}
      className="group p-3 sm:p-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg hover:border-primary-500/50 transition-all duration-300 text-left relative overflow-hidden w-full h-full flex flex-col"
    >
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex-1">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className={`inline-block px-2 py-0.5 text-xs rounded-full font-medium ${
            topic.category === 'technology' ? 'bg-blue-500/20 text-blue-300' :
            topic.category === 'science' ? 'bg-purple-500/20 text-purple-300' :
            topic.category === 'medicine' ? 'bg-green-500/20 text-green-300' :
            topic.category === 'environment' ? 'bg-emerald-500/20 text-emerald-300' :
            'bg-gray-500/20 text-gray-300'
          }`}>
            {topic.category}
          </span>
        </div>
        <h3 className="font-semibold text-primary-400 mb-1.5 text-sm sm:text-base group-hover:text-primary-300 transition-colors line-clamp-2">
          {topic.title}
        </h3>
        <p className="text-xs text-gray-400 mb-2 line-clamp-2">{topic.description}</p>
        <div className="flex items-center text-primary-400 text-xs font-medium group-hover:opacity-100 transition-opacity">
          <span>Generate Paper</span>
          <ArrowRight className="h-3.5 w-3.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </button>
  );
}