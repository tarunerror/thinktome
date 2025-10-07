import { Timer, CheckCircle2, XCircle, Clock, ExternalLink, Sparkles } from 'lucide-react';
import type { ResearchSource, ResearchProgress as ProgressType } from '../types';

interface ResearchProgressProps {
  sources: ResearchSource[];
  progress: ProgressType;
}

export function ResearchProgress({ sources, progress }: ResearchProgressProps) {
  const getStatusIcon = (status: ResearchSource['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-400" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const progressPercentage = progress.overallProgress;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Header Section */}
      <div className="text-center mb-8 fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 glass rounded-full">
          <Sparkles className="h-4 w-4 text-primary-400 animate-pulse" />
          <span className="text-sm text-gray-300 font-medium">AI Research in Progress</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Conducting Deep Research
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Analyzing multiple sources to generate comprehensive insights
        </p>
      </div>

      {/* Progress Section */}
      <div className="glass-stronger rounded-2xl p-6 sm:p-8 mb-8 scale-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <div className="text-sm text-gray-400 mb-1">Overall Progress</div>
            <div className="text-3xl font-bold gradient-text">
              {Math.round(progressPercentage)}%
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-3 glass rounded-xl">
            <Timer className="h-5 w-5 text-primary-400" />
            <div>
              <div className="text-xs text-gray-400">Current Stage</div>
              <div className="text-sm font-semibold text-white">
                {progress.currentStage}
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Progress Bar */}
        <div className="relative mb-4">
          <div className="bg-gray-700/50 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary-500 via-purple-500 to-pink-500 h-3 rounded-full smooth-transition pulse-glow"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{progress.completedSources} sources completed</span>
            <span>{progress.totalSources - progress.completedSources} remaining</span>
          </div>
        </div>

        {/* Stage Progress */}
        <div className="mt-4 pt-4 border-t border-gray-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Stage Progress</span>
            <span className="text-sm font-semibold text-white">{Math.round(progress.stageProgress)}%</span>
          </div>
          <div className="bg-gray-700/50 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full smooth-transition"
              style={{ width: `${progress.stageProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <div className="h-1 w-8 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full" />
          Research Sources ({progress.completedSources}/{progress.totalSources})
        </h3>
        
        {sources.map((source, index) => (
          <div 
            key={index} 
            className="glass card-hover rounded-xl p-4 sm:p-5 fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(source.status)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white text-sm sm:text-base mb-2 line-clamp-2">
                  {source.title}
                </h4>
                <a 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-xs sm:text-sm text-primary-400 hover:text-primary-300 smooth-transition inline-flex items-center gap-1.5 group"
                >
                  <span className="truncate max-w-xs sm:max-w-md">{source.url}</span>
                  <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 group-hover:scale-110 smooth-transition" />
                </a>
              </div>
              
              <div className="flex-shrink-0">
                <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  source.status === 'completed' 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                  source.status === 'failed' 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                  'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                }`}>
                  {source.status.charAt(0).toUpperCase() + source.status.slice(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}