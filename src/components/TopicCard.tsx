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
      className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl hover:border-primary-500/50 transition-all duration-300 text-left relative overflow-hidden"
    >
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex items-center space-x-2 mb-3">
          <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${
            topic.category === 'technology' ? 'bg-blue-500/20 text-blue-300' :
            topic.category === 'science' ? 'bg-purple-500/20 text-purple-300' :
            topic.category === 'medicine' ? 'bg-green-500/20 text-green-300' :
            topic.category === 'environment' ? 'bg-emerald-500/20 text-emerald-300' :
            'bg-gray-500/20 text-gray-300'
          }`}>
            {topic.category}
          </span>
        </div>
        <h3 className="font-semibold text-primary-400 mb-2 group-hover:text-primary-300 transition-colors">
          {topic.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{topic.description}</p>
        <div className="flex items-center text-primary-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Generate Paper</span>
          <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </button>
  );
}