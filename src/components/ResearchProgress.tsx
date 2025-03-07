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
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'processing':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Researching your topic...</h2>
        <div className="flex items-center space-x-2 text-gray-600">
          <Timer className="h-5 w-5" />
          <span>Estimated time remaining: {formatTime(progress.estimatedTimeRemaining)}</span>
        </div>
      </div>
      
      <div className="bg-gray-100 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(progress.completedSteps / progress.totalSteps) * 100}%` }}
        />
      </div>

      <div className="space-y-3">
        {sources.map((source, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 flex-1">
              {getStatusIcon(source.status)}
              <div className="flex-1">
                <div className="font-medium text-gray-900">{source.title}</div>
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center mt-1"
                >
                  View Source <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                source.status === 'completed' ? 'bg-green-100 text-green-800' :
                source.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
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