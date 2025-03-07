import React from 'react';
import { Timer, CheckCircle2, Loader2, Clock, ExternalLink } from 'lucide-react';
import type { ResearchSource, ResearchProgress as ProgressType } from '../types';
import { formatTime } from '../utils/time';

interface ResearchProgressProps {
  sources: ResearchSource[];
  progress: ProgressType;
}

export function ResearchProgress({ sources, progress }: ResearchProgressProps) {
  const getStatusIcon = (status: ResearchSource['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 animate-spin" />;
      case 'pending':
        return <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Researching your topic...</h2>
        <div className="flex items-center space-x-2 text-gray-300 text-sm sm:text-base">
          <Timer className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
          <span>Estimated time: {formatTime(progress.estimatedTimeRemaining)}</span>
        </div>
      </div>
      
      <div className="bg-gray-700/30 rounded-full h-1.5 sm:h-2 mb-6">
        <div 
          className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
          style={{ width: `${(progress.completedSteps / progress.totalSteps) * 100}%` }}
        />
      </div>

      <div className="space-y-3">
        {sources.map((source, index) => (
          <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-gray-800/50 border border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="flex-shrink-0">
                {getStatusIcon(source.status)}
              </div>
              <div className="min-w-0">
                <div className="font-medium text-white text-sm sm:text-base truncate">
                  {source.title}
                </div>
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs sm:text-sm text-blue-400 hover:text-blue-300 hover:underline flex items-center mt-0.5"
                >
                  View Source <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-1" />
                </a>
              </div>
            </div>
            <div className="flex items-center ml-4">
              <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                source.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                source.status === 'processing' ? 'bg-blue-500/20 text-blue-300' :
                'bg-gray-500/20 text-gray-300'
              }`}>
                {source.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}