import { useState, useEffect } from 'react';
import type { ResearchProgress, ResearchSource } from '../types';

export function useResearchProgress(loading: boolean, sources: ResearchSource[]) {
  const [progress, setProgress] = useState<ResearchProgress>({
    currentStep: '',
    totalSteps: 0,
    completedSteps: 0,
    estimatedTimeRemaining: 0,
    startTime: Date.now()
  });

  useEffect(() => {
    if (loading && sources.length > 0) {
      const updateInterval = 1000;
      
      const timer = setInterval(() => {
        const elapsedTime = (Date.now() - progress.startTime) / 1000;
        const completedSources = sources.filter(s => s.status === 'completed').length;
        const totalSources = sources.length;
        const averageTimePerSource = completedSources > 0 ? elapsedTime / completedSources : 20;
        const remainingSources = totalSources - completedSources;
        const estimatedRemainingTime = Math.ceil(remainingSources * averageTimePerSource);
        
        setProgress(prev => ({
          ...prev,
          currentStep: 'Researching and analyzing sources',
          totalSteps: totalSources,
          completedSteps: completedSources,
          estimatedTimeRemaining: estimatedRemainingTime
        }));
      }, updateInterval);

      return () => clearInterval(timer);
    }
  }, [loading, sources, progress.startTime]);

  return progress;
}