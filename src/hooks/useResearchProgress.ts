import { useState, useEffect } from 'react';
import type { ResearchProgress, ResearchSource } from '../types';

export function useResearchProgress(loading: boolean, sources: ResearchSource[]) {
  const [progress, setProgress] = useState<ResearchProgress>({
    overallProgress: 0,
    currentStage: 'Initializing research',
    stageProgress: 0,
    completedSources: 0,
    totalSources: 0
  });

  useEffect(() => {
    if (loading && sources.length > 0) {
      const updateInterval = 1000;
      
      const timer = setInterval(() => {
        const completedSources = sources.filter(s => s.status === 'completed').length;
        const totalSources = sources.length;
        const overallProgress = totalSources > 0 ? (completedSources / totalSources) * 100 : 0;
        
        // Calculate stage progress (more granular progress within current stage)
        const stageProgress = totalSources > 0 
          ? ((completedSources / totalSources) * 100) 
          : 0;
        
        setProgress({
          overallProgress,
          currentStage: 'Researching and analyzing sources',
          stageProgress,
          completedSources,
          totalSources
        });
      }, updateInterval);

      return () => clearInterval(timer);
    }
  }, [loading, sources]);

  return progress;
}