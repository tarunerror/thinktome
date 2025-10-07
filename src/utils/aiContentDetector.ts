import nlp from 'compromise';

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

export class AIContentDetector {
  private readonly AI_THRESHOLD = 0.6; // 60% AI probability threshold
  private readonly HIGH_AI_THRESHOLD = 0.8; // 80% AI probability threshold
  private readonly UNCERTAIN_THRESHOLD_LOW = 0.4; // 40% AI probability threshold
  private readonly LIKELY_HUMAN_THRESHOLD = 0.2; // 20% AI probability threshold

  /**
   * Analyze text for AI-generated content indicators
   */
  analyzeContent(text: string): AIDetectionResult {
    const indicators = [
      this.checkPerplexity(text),
      this.checkBurstiness(text),
      this.checkVocabularyDiversity(text),
      this.checkSentenceStructure(text),
      this.checkRepetitivePatterns(text),
      this.checkTransitionWords(text),
      this.checkClichePhrases(text),
      this.checkParagraphUniformity(text),
      this.checkPersonalPronouns(text),
      this.checkEmotionalLanguage(text),
    ];

    const aiProbability = this.calculateAIProbability(indicators);
    const humanProbability = 1 - aiProbability;

    return {
      aiProbability,
      humanProbability,
      indicators,
      overallClassification: this.classifyContent(aiProbability),
      suggestions: this.generateSuggestions(indicators, aiProbability),
    };
  }

  /**
   * Check perplexity (predictability) of the text
   * AI text tends to be more predictable
   */
  private checkPerplexity(text: string): AIDetectionResult['indicators'][0] {
    const words = text.split(/\s+/);
    
    // Calculate average word length variety
    const wordLengths = words.map(w => w.length);
    const avgWordLength = wordLengths.reduce((a, b) => a + b, 0) / wordLengths.length;
    const wordLengthVariance = this.calculateVariance(wordLengths, avgWordLength);

    // Low variance = high perplexity (more AI-like)
    const perplexityScore = Math.max(0, Math.min(1, 1 - (wordLengthVariance / 50)));

    return {
      name: 'Perplexity',
      score: perplexityScore * 100,
      severity: perplexityScore > 0.7 ? 'high' : perplexityScore > 0.4 ? 'medium' : 'low',
      description: perplexityScore > 0.6
        ? 'Text is highly predictable (AI-like)'
        : 'Text has good variety (human-like)',
    };
  }

  /**
   * Check burstiness (variation in sentence structure)
   * Human writing has more variation
   */
  private checkBurstiness(text: string): AIDetectionResult['indicators'][0] {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
    const sentenceLengths = sentences.map(s => s.split(/\s+/).length);

    if (sentenceLengths.length < 3) {
      return {
        name: 'Burstiness',
        score: 50,
        severity: 'medium',
        description: 'Insufficient text to analyze burstiness',
      };
    }

    const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const variance = this.calculateVariance(sentenceLengths, avgLength);

    // Low variance = low burstiness (more AI-like)
    const burstiScore = Math.max(0, Math.min(1, 1 - (variance / 200)));

    return {
      name: 'Burstiness',
      score: burstiScore * 100,
      severity: burstiScore > 0.7 ? 'high' : burstiScore > 0.4 ? 'medium' : 'low',
      description: burstiScore > 0.6
        ? 'Sentences are too uniform in length (AI-like)'
        : 'Good sentence length variation (human-like)',
    };
  }

  /**
   * Check vocabulary diversity
   * AI tends to use more diverse vocabulary
   */
  private checkVocabularyDiversity(text: string): AIDetectionResult['indicators'][0] {
    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const uniqueWords = new Set(words);
    const diversity = uniqueWords.size / words.length;

    // Very high diversity can indicate AI
    const diversityScore = diversity > 0.6 ? (diversity - 0.5) * 2 : 0;

    return {
      name: 'Vocabulary Diversity',
      score: diversityScore * 100,
      severity: diversity > 0.7 ? 'high' : diversity > 0.6 ? 'medium' : 'low',
      description: diversity > 0.7
        ? 'Unusually high vocabulary diversity (AI-like)'
        : 'Natural vocabulary repetition (human-like)',
    };
  }

  /**
   * Check sentence structure patterns
   * AI often follows similar patterns
   */
  private checkSentenceStructure(text: string): AIDetectionResult['indicators'][0] {
    const doc = nlp(text);
    const sentences = doc.sentences().out('array');

    if (sentences.length < 3) {
      return {
        name: 'Sentence Structure',
        score: 50,
        severity: 'medium',
        description: 'Insufficient sentences to analyze',
      };
    }

    // Check for repetitive sentence starters
    const starters = sentences.map((s: string) => {
      const words = s.split(/\s+/);
      return words[0]?.toLowerCase() || '';
    });

    const starterFreq = this.calculateFrequency(starters);
    const maxFreq = Math.max(...Object.values(starterFreq));
    const repetitionScore = maxFreq / sentences.length;

    return {
      name: 'Sentence Structure',
      score: repetitionScore * 100,
      severity: repetitionScore > 0.5 ? 'high' : repetitionScore > 0.3 ? 'medium' : 'low',
      description: repetitionScore > 0.4
        ? 'Repetitive sentence starters (AI-like)'
        : 'Varied sentence structures (human-like)',
    };
  }

  /**
   * Check for repetitive patterns
   */
  private checkRepetitivePatterns(text: string): AIDetectionResult['indicators'][0] {
    const patterns = [
      /\b(furthermore|moreover|additionally|in addition)\b/gi,
      /\b(however|nevertheless|nonetheless)\b/gi,
      /\b(therefore|thus|hence|consequently)\b/gi,
      /\b(it is important to note|it should be noted|it is worth mentioning)\b/gi,
    ];

    let totalMatches = 0;
    patterns.forEach(pattern => {
      const matches = text.match(pattern);
      totalMatches += matches ? matches.length : 0;
    });

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const repetitionRatio = sentences.length > 0 ? totalMatches / sentences.length : 0;

    return {
      name: 'Repetitive Patterns',
      score: Math.min(100, repetitionRatio * 200),
      severity: repetitionRatio > 0.3 ? 'high' : repetitionRatio > 0.15 ? 'medium' : 'low',
      description: repetitionRatio > 0.2
        ? 'Excessive use of transition words (AI-like)'
        : 'Natural use of transitions (human-like)',
    };
  }

  /**
   * Check transition word usage
   * AI tends to overuse formal transitions
   */
  private checkTransitionWords(text: string): AIDetectionResult['indicators'][0] {
    const formalTransitions = [
      'furthermore', 'moreover', 'nevertheless', 'nonetheless', 'accordingly',
      'consequently', 'subsequently', 'notwithstanding', 'henceforth',
    ];

    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const transitionCount = words.filter(w => formalTransitions.includes(w)).length;
    const transitionRatio = transitionCount / words.length;

    return {
      name: 'Formal Transitions',
      score: Math.min(100, transitionRatio * 500),
      severity: transitionRatio > 0.02 ? 'high' : transitionRatio > 0.01 ? 'medium' : 'low',
      description: transitionRatio > 0.015
        ? 'Overuse of formal transitions (AI-like)'
        : 'Natural transition usage (human-like)',
    };
  }

  /**
   * Check for AI cliché phrases
   */
  private checkClichePhrases(text: string): AIDetectionResult['indicators'][0] {
    const aiCliches = [
      /in today's (digital|modern|fast-paced) (world|age|era)/gi,
      /it is important to (note|understand|recognize|acknowledge)/gi,
      /plays? a (crucial|vital|important|significant) role/gi,
      /in conclusion,? it (can be|is) (said|noted|concluded)/gi,
      /delve into|diving deep|explore the intricacies/gi,
      /landscape of|realm of|sphere of/gi,
      /cutting[- ]edge|state[- ]of[- ]the[- ]art/gi,
    ];

    let clicheCount = 0;
    aiCliches.forEach(pattern => {
      const matches = text.match(pattern);
      clicheCount += matches ? matches.length : 0;
    });

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const clicheRatio = sentences.length > 0 ? clicheCount / sentences.length : 0;

    return {
      name: 'AI Cliché Phrases',
      score: Math.min(100, clicheRatio * 300),
      severity: clicheRatio > 0.2 ? 'high' : clicheRatio > 0.1 ? 'medium' : 'low',
      description: clicheRatio > 0.15
        ? 'Contains common AI phrases (AI-like)'
        : 'Original phrasing (human-like)',
    };
  }

  /**
   * Check paragraph uniformity
   * AI tends to create uniform paragraphs
   */
  private checkParagraphUniformity(text: string): AIDetectionResult['indicators'][0] {
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 20);

    if (paragraphs.length < 3) {
      return {
        name: 'Paragraph Uniformity',
        score: 50,
        severity: 'medium',
        description: 'Insufficient paragraphs to analyze',
      };
    }

    const paragraphLengths = paragraphs.map(p => p.split(/\s+/).length);
    const avgLength = paragraphLengths.reduce((a, b) => a + b, 0) / paragraphLengths.length;
    const variance = this.calculateVariance(paragraphLengths, avgLength);

    const uniformityScore = Math.max(0, Math.min(1, 1 - (variance / 500)));

    return {
      name: 'Paragraph Uniformity',
      score: uniformityScore * 100,
      severity: uniformityScore > 0.7 ? 'high' : uniformityScore > 0.4 ? 'medium' : 'low',
      description: uniformityScore > 0.6
        ? 'Paragraphs too uniform in length (AI-like)'
        : 'Natural paragraph variation (human-like)',
    };
  }

  /**
   * Check personal pronoun usage
   * Humans tend to use more personal pronouns
   */
  private checkPersonalPronouns(text: string): AIDetectionResult['indicators'][0] {
    const doc = nlp(text);
    const pronouns = doc.pronouns().out('array');
    const words = text.split(/\s+/);
    const pronounRatio = pronouns.length / words.length;

    // Low pronoun usage can indicate AI
    const score = pronounRatio < 0.02 ? 80 : pronounRatio < 0.05 ? 50 : 20;

    return {
      name: 'Personal Pronouns',
      score,
      severity: score > 60 ? 'high' : score > 40 ? 'medium' : 'low',
      description: pronounRatio < 0.02
        ? 'Very few personal pronouns (AI-like)'
        : 'Natural pronoun usage (human-like)',
    };
  }

  /**
   * Check emotional language
   * Humans tend to use more emotional language
   */
  private checkEmotionalLanguage(text: string): AIDetectionResult['indicators'][0] {
    const emotionalWords = [
      'amazing', 'terrible', 'wonderful', 'horrible', 'fantastic', 'awful',
      'love', 'hate', 'excited', 'disappointed', 'thrilled', 'frustrated',
      'happy', 'sad', 'angry', 'joyful', 'miserable', 'delighted',
    ];

    const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    const emotionalCount = words.filter(w => emotionalWords.includes(w)).length;
    const emotionalRatio = emotionalCount / words.length;

    // Low emotional content can indicate AI
    const score = emotionalRatio < 0.005 ? 70 : emotionalRatio < 0.01 ? 40 : 15;

    return {
      name: 'Emotional Language',
      score,
      severity: score > 60 ? 'high' : score > 35 ? 'medium' : 'low',
      description: emotionalRatio < 0.005
        ? 'Lacks emotional language (AI-like)'
        : 'Contains emotional expressions (human-like)',
    };
  }

  /**
   * Calculate AI probability based on all indicators
   */
  private calculateAIProbability(indicators: AIDetectionResult['indicators']): number {
    const weights = {
      'Perplexity': 0.15,
      'Burstiness': 0.15,
      'Vocabulary Diversity': 0.1,
      'Sentence Structure': 0.1,
      'Repetitive Patterns': 0.15,
      'Formal Transitions': 0.1,
      'AI Cliché Phrases': 0.15,
      'Paragraph Uniformity': 0.05,
      'Personal Pronouns': 0.03,
      'Emotional Language': 0.02,
    };

    let weightedSum = 0;
    let totalWeight = 0;

    indicators.forEach(indicator => {
      const weight = weights[indicator.name as keyof typeof weights] || 0.05;
      weightedSum += (indicator.score / 100) * weight;
      totalWeight += weight;
    });

    return totalWeight > 0 ? weightedSum / totalWeight : 0;
  }

  /**
   * Classify content based on AI probability
   */
  private classifyContent(aiProbability: number): AIDetectionResult['overallClassification'] {
    if (aiProbability >= this.HIGH_AI_THRESHOLD) return 'ai';
    if (aiProbability >= this.AI_THRESHOLD) return 'likely-ai';
    if (aiProbability >= this.UNCERTAIN_THRESHOLD_LOW) return 'uncertain';
    if (aiProbability >= this.LIKELY_HUMAN_THRESHOLD) return 'likely-human';
    return 'human';
  }

  /**
   * Generate suggestions based on detection results
   */
  private generateSuggestions(
    indicators: AIDetectionResult['indicators'],
    aiProbability: number
  ): string[] {
    const suggestions: string[] = [];

    if (aiProbability > 0.7) {
      suggestions.push('🔴 High AI probability detected. Consider significant revisions.');
    } else if (aiProbability > 0.5) {
      suggestions.push('🟡 Moderate AI indicators. Review and personalize the content.');
    } else if (aiProbability > 0.3) {
      suggestions.push('🟢 Low AI indicators. Minor adjustments recommended.');
    } else {
      suggestions.push('✅ Appears human-written. Content looks authentic.');
    }

    // Specific suggestions based on high-scoring indicators
    indicators.forEach(indicator => {
      if (indicator.score > 70) {
        switch (indicator.name) {
          case 'Perplexity':
            suggestions.push('💡 Add more variety in word choice and sentence structure.');
            break;
          case 'Burstiness':
            suggestions.push('💡 Vary your sentence lengths - mix short and long sentences.');
            break;
          case 'AI Cliché Phrases':
            suggestions.push('💡 Replace common AI phrases with original expressions.');
            break;
          case 'Formal Transitions':
            suggestions.push('💡 Use more casual transitions and connectors.');
            break;
          case 'Repetitive Patterns':
            suggestions.push('💡 Avoid repetitive phrasing and sentence structures.');
            break;
          case 'Personal Pronouns':
            suggestions.push('💡 Add personal voice with "I", "we", or "you" where appropriate.');
            break;
          case 'Emotional Language':
            suggestions.push('💡 Include more personal opinions and emotional expressions.');
            break;
        }
      }
    });

    return suggestions;
  }

  /**
   * Calculate variance
   */
  private calculateVariance(values: number[], mean: number): number {
    if (values.length === 0) return 0;
    const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
    return squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
  }

  /**
   * Calculate frequency distribution
   */
  private calculateFrequency(items: string[]): Record<string, number> {
    const freq: Record<string, number> = {};
    items.forEach(item => {
      freq[item] = (freq[item] || 0) + 1;
    });
    return freq;
  }
}

export const aiContentDetector = new AIContentDetector();
