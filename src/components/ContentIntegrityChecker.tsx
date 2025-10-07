import { useState, useEffect } from 'react';
import { plagiarismDetector } from '../utils/plagiarismDetector';
import { aiContentDetector } from '../utils/aiContentDetector';
import { AlertTriangle, CheckCircle, Info, RefreshCw } from 'lucide-react';

interface PlagiarismResult {
  similarity: number;
  matches: Array<{
    text: string;
    source: string;
    similarity: number;
    startIndex: number;
    endIndex: number;
  }>;
  overallScore: number;
  isPlagiarized: boolean;
}

interface AIDetectionResult {
  aiProbability: number;
  humanProbability: number;
  indicators: Array<{
    name: string;
    score: number;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }>;
  overallClassification: 'human' | 'likely-human' | 'uncertain' | 'likely-ai' | 'ai';
  suggestions: string[];
}

interface ContentIntegrityCheckerProps {
  content: string;
  sources?: string[];
  onResultsChange?: (results: {
    plagiarism: PlagiarismResult;
    aiDetection: AIDetectionResult;
    isAcceptable: boolean;
  }) => void;
  autoCheck?: boolean;
}

export function ContentIntegrityChecker({
  content,
  sources = [],
  onResultsChange,
  autoCheck = true,
}: ContentIntegrityCheckerProps) {
  const [plagiarismResult, setPlagiarismResult] = useState<PlagiarismResult | null>(null);
  const [aiDetectionResult, setAiDetectionResult] = useState<AIDetectionResult | null>(null);
  const [selfPlagiarismResult, setSelfPlagiarismResult] = useState<PlagiarismResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const analyzeContent = async () => {
    if (!content || content.length < 100) {
      return;
    }

    setLoading(true);

    try {
      // Run all checks in parallel
      const [plagiarism, selfPlagiarism, aiDetection] = await Promise.all([
        plagiarismDetector.checkPlagiarism(content, sources),
        plagiarismDetector.checkSelfPlagiarism(content),
        Promise.resolve(aiContentDetector.analyzeContent(content)),
      ]);

      setPlagiarismResult(plagiarism);
      setSelfPlagiarismResult(selfPlagiarism);
      setAiDetectionResult(aiDetection);

      // Determine if content is acceptable
      const isAcceptable =
        !plagiarism.isPlagiarized &&
        selfPlagiarism.overallScore < 25 &&
        aiDetection.aiProbability < 0.6;

      if (onResultsChange) {
        onResultsChange({
          plagiarism,
          aiDetection,
          isAcceptable,
        });
      }
    } catch (error) {
      console.error('Content analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoCheck && content && content.length > 200) {
      const debounceTimer = setTimeout(() => {
        analyzeContent();
      }, 2000);

      return () => clearTimeout(debounceTimer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, autoCheck]);

  const getScoreColor = (score: number, inverse = false) => {
    if (inverse) {
      if (score < 20) return 'text-red-500';
      if (score < 40) return 'text-yellow-500';
      return 'text-green-500';
    }
    if (score < 20) return 'text-green-500';
    if (score < 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBgColor = (score: number, inverse = false) => {
    if (inverse) {
      if (score < 20) return 'bg-red-100 border-red-300';
      if (score < 40) return 'bg-yellow-100 border-yellow-300';
      return 'bg-green-100 border-green-300';
    }
    if (score < 20) return 'bg-green-100 border-green-300';
    if (score < 50) return 'bg-yellow-100 border-yellow-300';
    return 'bg-red-100 border-red-300';
  };

  if (!content || content.length < 100) {
    return (
      <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <div className="flex items-center space-x-2 text-gray-400">
          <Info size={18} />
          <span className="text-sm">Write at least 100 characters to check content integrity</span>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <div className="flex items-center space-x-3">
          <RefreshCw className="animate-spin text-primary-500" size={20} />
          <div>
            <p className="text-white font-medium">Analyzing Content Integrity...</p>
            <p className="text-sm text-gray-400">Checking for plagiarism and AI-generated content</p>
          </div>
        </div>
      </div>
    );
  }

  if (!plagiarismResult || !aiDetectionResult) {
    return (
      <div className="p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <button
          onClick={analyzeContent}
          className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Check Content Integrity
        </button>
      </div>
    );
  }

  const overallAcceptable =
    !plagiarismResult.isPlagiarized &&
    (selfPlagiarismResult?.overallScore || 0) < 25 &&
    aiDetectionResult.aiProbability < 0.6;

  return (
    <div className="space-y-4">
      {/* Overall Status */}
      <div
        className={`p-4 border-2 rounded-lg ${
          overallAcceptable
            ? 'bg-green-50 border-green-500'
            : 'bg-red-50 border-red-500'
        }`}
      >
        <div className="flex items-center space-x-3">
          {overallAcceptable ? (
            <CheckCircle className="text-green-600" size={24} />
          ) : (
            <AlertTriangle className="text-red-600" size={24} />
          )}
          <div className="flex-1">
            <h3 className="font-bold text-gray-900">
              {overallAcceptable
                ? 'Content Integrity: PASSED ✅'
                : 'Content Integrity: NEEDS REVIEW ⚠️'}
            </h3>
            <p className="text-sm text-gray-700">
              {overallAcceptable
                ? 'Content appears original and human-written'
                : 'Issues detected - review suggestions below'}
            </p>
          </div>
          <button
            onClick={analyzeContent}
            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            title="Re-analyze"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Plagiarism Score */}
        <div className={`p-4 border-2 rounded-lg ${getScoreBgColor(plagiarismResult.overallScore)}`}>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Plagiarism</h4>
          <p className={`text-3xl font-bold ${getScoreColor(plagiarismResult.overallScore)}`}>
            {plagiarismResult.overallScore.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600 mt-1">
            {plagiarismResult.matches.length} potential matches
          </p>
        </div>

        {/* Self-Plagiarism Score */}
        {selfPlagiarismResult && (
          <div className={`p-4 border-2 rounded-lg ${getScoreBgColor(selfPlagiarismResult.overallScore)}`}>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Self-Repetition</h4>
            <p className={`text-3xl font-bold ${getScoreColor(selfPlagiarismResult.overallScore)}`}>
              {selfPlagiarismResult.overallScore.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {selfPlagiarismResult.matches.length} repetitions found
            </p>
          </div>
        )}

        {/* AI Detection Score */}
        <div
          className={`p-4 border-2 rounded-lg ${getScoreBgColor(
            aiDetectionResult.aiProbability * 100
          )}`}
        >
          <h4 className="text-sm font-medium text-gray-700 mb-1">AI Detection</h4>
          <p className={`text-3xl font-bold ${getScoreColor(aiDetectionResult.aiProbability * 100)}`}>
            {(aiDetectionResult.aiProbability * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Classification: {aiDetectionResult.overallClassification.replace('-', ' ')}
          </p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white border border-gray-300 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">💡 Recommendations</h4>
        <div className="space-y-2">
          {plagiarismDetector.generateSuggestions(plagiarismResult).map((suggestion, idx) => (
            <p key={`plag-${idx}`} className="text-sm text-gray-700">
              {suggestion}
            </p>
          ))}
          {aiDetectionResult.suggestions.map((suggestion: string, idx: number) => (
            <p key={`ai-${idx}`} className="text-sm text-gray-700">
              {suggestion}
            </p>
          ))}
        </div>
      </div>

      {/* Detailed Analysis Toggle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
      >
        {showDetails ? 'Hide' : 'Show'} Detailed Analysis
      </button>

      {/* Detailed Analysis */}
      {showDetails && (
        <div className="space-y-4">
          {/* AI Indicators */}
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">AI Detection Indicators</h4>
            <div className="space-y-3">
              {aiDetectionResult.indicators.map((indicator, idx: number) => (
                <div key={idx} className="border-b border-gray-200 pb-2 last:border-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{indicator.name}</span>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          indicator.severity === 'high'
                            ? 'bg-red-100 text-red-700'
                            : indicator.severity === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {indicator.severity}
                      </span>
                      <span className={`font-bold ${getScoreColor(indicator.score)}`}>
                        {indicator.score.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{indicator.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Plagiarism Matches */}
          {plagiarismResult.matches.length > 0 && (
            <div className="bg-white border border-gray-300 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">
                Plagiarism Matches ({plagiarismResult.matches.length})
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {plagiarismResult.matches.slice(0, 5).map((match, idx: number) => (
                  <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded text-sm">
                    <p className="text-gray-900 mb-1">&quot;{match.text.substring(0, 100)}...&quot;</p>
                    <p className="text-xs text-red-700">
                      Similarity: {match.similarity.toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Patterns */}
          <div className="bg-white border border-gray-300 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Writing Patterns</h4>
            <div className="space-y-2">
              {plagiarismDetector.checkCommonPatterns(content).map((pattern, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{pattern.pattern}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      pattern.severity === 'high'
                        ? 'bg-red-100 text-red-700'
                        : pattern.severity === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {pattern.count} occurrences
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
