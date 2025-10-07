import nlp from 'compromise';

interface EnhancementSuggestion {
  type: 'paraphrase' | 'synonym' | 'structure' | 'citation' | 'variation';
  original: string;
  suggestions: string[];
  reason: string;
  position: number;
}

export class ContentEnhancer {
  /**
   * Generate suggestions to make content more human-like and original
   */
  generateEnhancements(text: string): EnhancementSuggestion[] {
    const suggestions: EnhancementSuggestion[] = [];

    // Find AI cliché phrases and suggest alternatives
    suggestions.push(...this.findAndReplaceCliches(text));

    // Find repetitive words and suggest synonyms
    suggestions.push(...this.findRepetitiveWords(text));

    // Suggest structural improvements
    suggestions.push(...this.suggestStructuralChanges(text));

    // Suggest adding citations where needed
    suggestions.push(...this.suggestCitations(text));

    return suggestions;
  }

  /**
   * Find AI cliché phrases and suggest natural alternatives
   */
  private findAndReplaceCliches(text: string): EnhancementSuggestion[] {
    const clicheReplacements: Array<{ pattern: RegExp; alternatives: string[] }> = [
      {
        pattern: /in today's (digital|modern|fast-paced) (world|age|era)/gi,
        alternatives: [
          'currently',
          'nowadays',
          'in recent times',
          'at present',
        ],
      },
      {
        pattern: /it is important to (note|understand|recognize|acknowledge)/gi,
        alternatives: [
          'notably',
          'crucially',
          'worth noting',
          'significantly',
        ],
      },
      {
        pattern: /plays? a (crucial|vital|important|significant) role/gi,
        alternatives: [
          'matters significantly',
          'is essential',
          'proves critical',
          'holds importance',
        ],
      },
      {
        pattern: /delve into|diving deep|explore the intricacies/gi,
        alternatives: [
          'examine',
          'investigate',
          'study',
          'analyze',
        ],
      },
      {
        pattern: /(landscape|realm|sphere) of/gi,
        alternatives: [
          'field of',
          'area of',
          'domain of',
          'in',
        ],
      },
    ];

    const suggestions: EnhancementSuggestion[] = [];

    clicheReplacements.forEach(({ pattern, alternatives }) => {
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);
      
      while ((match = regex.exec(text)) !== null) {
        suggestions.push({
          type: 'paraphrase',
          original: match[0],
          suggestions: alternatives,
          reason: 'This phrase is commonly used by AI. Consider a more natural alternative.',
          position: match.index,
        });
      }
    });

    return suggestions;
  }

  /**
   * Find repetitive words and suggest synonyms
   */
  private findRepetitiveWords(text: string): EnhancementSuggestion[] {
    const doc = nlp(text);
    const words = doc.out('array');
    const wordFreq: Record<string, number> = {};

    // Count word frequencies (excluding common words)
    const commonWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been',
      'have', 'has', 'had', 'this', 'that', 'these', 'those', 'it', 'they',
    ]);

    words.forEach((word: string) => {
      const lower = word.toLowerCase();
      if (!commonWords.has(lower) && lower.length > 3) {
        wordFreq[lower] = (wordFreq[lower] || 0) + 1;
      }
    });

    const suggestions: EnhancementSuggestion[] = [];

    Object.entries(wordFreq).forEach(([word, count]) => {
      if (count > 5) {
        const synonyms = this.getSynonyms(word);
        if (synonyms.length > 0) {
          suggestions.push({
            type: 'synonym',
            original: word,
            suggestions: synonyms,
            reason: `The word "${word}" appears ${count} times. Consider using synonyms for variety.`,
            position: text.toLowerCase().indexOf(word),
          });
        }
      }
    });

    return suggestions;
  }

  /**
   * Get synonyms for a word
   */
  private getSynonyms(word: string): string[] {
    // Basic synonym dictionary
    const synonymDict: Record<string, string[]> = {
      'important': ['significant', 'crucial', 'essential', 'vital', 'key'],
      'show': ['demonstrate', 'illustrate', 'reveal', 'indicate', 'display'],
      'use': ['utilize', 'employ', 'apply', 'implement', 'leverage'],
      'many': ['numerous', 'several', 'various', 'multiple', 'countless'],
      'good': ['beneficial', 'positive', 'favorable', 'advantageous', 'effective'],
      'bad': ['negative', 'detrimental', 'harmful', 'adverse', 'unfavorable'],
      'big': ['large', 'substantial', 'considerable', 'significant', 'extensive'],
      'small': ['minor', 'limited', 'modest', 'minimal', 'slight'],
      'different': ['various', 'diverse', 'distinct', 'unique', 'separate'],
      'study': ['research', 'investigation', 'analysis', 'examination', 'exploration'],
      'find': ['discover', 'identify', 'determine', 'uncover', 'locate'],
      'make': ['create', 'produce', 'generate', 'develop', 'construct'],
      'help': ['assist', 'aid', 'support', 'facilitate', 'enable'],
      'provide': ['offer', 'supply', 'furnish', 'deliver', 'present'],
      'increase': ['enhance', 'boost', 'elevate', 'expand', 'raise'],
      'decrease': ['reduce', 'diminish', 'lower', 'decline', 'lessen'],
      'change': ['modify', 'alter', 'transform', 'adjust', 'adapt'],
      'develop': ['evolve', 'advance', 'progress', 'grow', 'mature'],
      'analyze': ['examine', 'evaluate', 'assess', 'study', 'investigate'],
      'method': ['approach', 'technique', 'strategy', 'procedure', 'process'],
    };

    return synonymDict[word.toLowerCase()] || [];
  }

  /**
   * Suggest structural changes for better flow
   */
  private suggestStructuralChanges(text: string): EnhancementSuggestion[] {
    const suggestions: EnhancementSuggestion[] = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    // Check for sentences that all start the same way
    const startWords: Record<string, number> = {};
    sentences.forEach(sentence => {
      const firstWord = sentence.trim().split(/\s+/)[0]?.toLowerCase();
      if (firstWord) {
        startWords[firstWord] = (startWords[firstWord] || 0) + 1;
      }
    });

    Object.entries(startWords).forEach(([word, count]) => {
      if (count > 3 && word !== 'the' && word !== 'this') {
        suggestions.push({
          type: 'structure',
          original: `Multiple sentences starting with "${word}"`,
          suggestions: [
            'Vary your sentence starters',
            'Use different opening words',
            'Combine some sentences',
            'Start with different parts of speech',
          ],
          reason: `${count} sentences start with "${word}". This creates repetitive structure.`,
          position: 0,
        });
      }
    });

    // Check sentence length uniformity
    const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
    const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const variance = sentenceLengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / sentenceLengths.length;

    if (variance < 20) {
      suggestions.push({
        type: 'variation',
        original: 'Uniform sentence lengths',
        suggestions: [
          'Mix short, punchy sentences with longer, more detailed ones',
          'Vary sentence complexity',
          'Use different sentence structures',
          'Combine or split sentences for rhythm',
        ],
        reason: 'Sentences are too uniform in length. Human writing has more variation.',
        position: 0,
      });
    }

    return suggestions;
  }

  /**
   * Suggest where citations are needed
   */
  private suggestCitations(text: string): EnhancementSuggestion[] {
    const suggestions: EnhancementSuggestion[] = [];

    // Patterns that typically need citations
    const needsCitation = [
      /\d+(\.\d+)?%/g, // Percentages
      /studies (show|indicate|suggest|reveal)/gi,
      /research (shows|indicates|suggests|reveals)/gi,
      /according to/gi,
      /evidence (shows|indicates|suggests|reveals)/gi,
      /data (shows|indicates|suggests|reveals)/gi,
    ];

    needsCitation.forEach(pattern => {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        // Check if there's already a citation nearby (simple check for brackets or parentheses)
        const contextBefore = text.substring(Math.max(0, match.index - 50), match.index);
        const contextAfter = text.substring(match.index, Math.min(text.length, match.index + 100));
        
        const hasCitation = /\[\d+\]|\(\w+,?\s*\d{4}\)/.test(contextBefore + contextAfter);

        if (!hasCitation) {
          suggestions.push({
            type: 'citation',
            original: match[0],
            suggestions: [
              'Add citation [1]',
              'Add source (Author, Year)',
              'Reference supporting research',
              'Cite data source',
            ],
            reason: 'This claim should be supported with a citation.',
            position: match.index,
          });
        }
      }
    });

    return suggestions;
  }

  /**
   * Apply automatic paraphrasing improvements
   */
  paraphraseText(text: string): string {
    let improved = text;

    // Simple paraphrasing rules
    const rules = [
      { from: /furthermore,/gi, to: 'Additionally,' },
      { from: /moreover,/gi, to: 'Also,' },
      { from: /in conclusion,/gi, to: 'To summarize,' },
      { from: /it is important to note that/gi, to: 'Notably,' },
      { from: /it should be noted that/gi, to: 'Note that' },
    ];

    rules.forEach(({ from, to }) => {
      improved = improved.replace(from, to);
    });

    return improved;
  }

  /**
   * Add human elements to text
   */
  humanizeText(text: string): string {
    let humanized = text;

    // Add contractions occasionally (makes text more conversational)
    const contractions = {
      'it is': "it's",
      'that is': "that's",
      'there is': "there's",
      'cannot': "can't",
      'will not': "won't",
    };

    // Apply contractions to ~30% of occurrences for balance
    Object.entries(contractions).forEach(([full, contracted]) => {
      const regex = new RegExp(full, 'gi');
      const matches = humanized.match(regex);
      if (matches && matches.length > 2) {
        // Replace only some instances
        let count = 0;
        humanized = humanized.replace(regex, (match) => {
          count++;
          return count % 3 === 0 ? contracted : match;
        });
      }
    });

    return humanized;
  }
}

export const contentEnhancer = new ContentEnhancer();
