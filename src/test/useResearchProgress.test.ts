import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useResearchProgress } from '../hooks/useResearchProgress';
import type { ResearchSource } from '../types';

describe('useResearchProgress', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with correct ResearchProgress interface properties', () => {
    const { result } = renderHook(() => useResearchProgress(false, []));

    // Verify the returned object has all required properties from ResearchProgress interface
    expect(result.current).toHaveProperty('overallProgress');
    expect(result.current).toHaveProperty('currentStage');
    expect(result.current).toHaveProperty('stageProgress');
    expect(result.current).toHaveProperty('completedSources');
    expect(result.current).toHaveProperty('totalSources');

    // Verify initial values
    expect(result.current.overallProgress).toBe(0);
    expect(result.current.currentStage).toBe('Initializing research');
    expect(result.current.stageProgress).toBe(0);
    expect(result.current.completedSources).toBe(0);
    expect(result.current.totalSources).toBe(0);
  });

  it('should NOT have deprecated properties from the old implementation', () => {
    const { result } = renderHook(() => useResearchProgress(false, []));

    // These properties should NOT exist (they were in the buggy version)
    expect(result.current).not.toHaveProperty('currentStep');
    expect(result.current).not.toHaveProperty('totalSteps');
    expect(result.current).not.toHaveProperty('completedSteps');
    expect(result.current).not.toHaveProperty('estimatedTimeRemaining');
    expect(result.current).not.toHaveProperty('startTime');
  });

  it('should calculate progress correctly when loading with sources', () => {
    const sources: ResearchSource[] = [
      { title: 'Source 1', url: 'https://example.com/1', status: 'completed' },
      { title: 'Source 2', url: 'https://example.com/2', status: 'pending' },
      { title: 'Source 3', url: 'https://example.com/3', status: 'completed' },
      { title: 'Source 4', url: 'https://example.com/4', status: 'pending' },
    ];

    const { result } = renderHook(() => useResearchProgress(true, sources));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // 2 out of 4 sources completed = 50%
    expect(result.current.overallProgress).toBe(50);
    expect(result.current.stageProgress).toBe(50);
    expect(result.current.completedSources).toBe(2);
    expect(result.current.totalSources).toBe(4);
    expect(result.current.currentStage).toBe('Researching and analyzing sources');
  });

  it('should update progress when sources are completed', () => {
    const sources: ResearchSource[] = [
      { title: 'Source 1', url: 'https://example.com/1', status: 'pending' },
      { title: 'Source 2', url: 'https://example.com/2', status: 'pending' },
    ];

    const { result, rerender } = renderHook(
      ({ loading, sources }) => useResearchProgress(loading, sources),
      { initialProps: { loading: true, sources } }
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Initially 0% complete
    expect(result.current.overallProgress).toBe(0);
    expect(result.current.completedSources).toBe(0);

    // Update sources to mark one as completed
    const updatedSources: ResearchSource[] = [
      { title: 'Source 1', url: 'https://example.com/1', status: 'completed' },
      { title: 'Source 2', url: 'https://example.com/2', status: 'pending' },
    ];

    rerender({ loading: true, sources: updatedSources });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Now 50% complete
    expect(result.current.overallProgress).toBe(50);
    expect(result.current.completedSources).toBe(1);
    expect(result.current.totalSources).toBe(2);
  });

  it('should handle all sources completed', () => {
    const sources: ResearchSource[] = [
      { title: 'Source 1', url: 'https://example.com/1', status: 'completed' },
      { title: 'Source 2', url: 'https://example.com/2', status: 'completed' },
    ];

    const { result } = renderHook(() => useResearchProgress(true, sources));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.overallProgress).toBe(100);
    expect(result.current.stageProgress).toBe(100);
    expect(result.current.completedSources).toBe(2);
    expect(result.current.totalSources).toBe(2);
  });

  it('should handle empty sources array', () => {
    const { result } = renderHook(() => useResearchProgress(true, []));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.overallProgress).toBe(0);
    expect(result.current.stageProgress).toBe(0);
    expect(result.current.completedSources).toBe(0);
    expect(result.current.totalSources).toBe(0);
  });

  it('should not update when loading is false', () => {
    const sources: ResearchSource[] = [
      { title: 'Source 1', url: 'https://example.com/1', status: 'completed' },
    ];

    const { result } = renderHook(() => useResearchProgress(false, sources));

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    // Should remain at initial values
    expect(result.current.overallProgress).toBe(0);
    expect(result.current.currentStage).toBe('Initializing research');
  });

  it('should handle failed sources in completion count', () => {
    const sources: ResearchSource[] = [
      { title: 'Source 1', url: 'https://example.com/1', status: 'completed' },
      { title: 'Source 2', url: 'https://example.com/2', status: 'failed' },
      { title: 'Source 3', url: 'https://example.com/3', status: 'pending' },
    ];

    const { result } = renderHook(() => useResearchProgress(true, sources));

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Only completed sources should be counted (1 out of 3)
    expect(result.current.completedSources).toBe(1);
    expect(result.current.totalSources).toBe(3);
    expect(result.current.overallProgress).toBeCloseTo(33.33, 1);
  });
});
