import { compareTwoStrings } from 'string-similarity';

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

export class PlagiarismDetector {
  private readonly SIMILARITY_THRESHOLD = 0.7; // 70% similarity is considered plagiarism
  private readonly MIN_PHRASE_LENGTH = 50; // Minimum characters to check
  private readonly CHUNK_SIZE = 200; // Characters per chunk to analyze

  /**
   * Check text against known sources for plagiarism
   */
  async checkPlagiarism(text: string, sources: string[] = []): Promise<PlagiarismResult> {
    const matches: PlagiarismResult['matches'] = [];
    
    // Split text into sentences for better comparison
    const sentences = this.splitIntoSentences(text);
    const chunks = this.createChunks(text, this.CHUNK_SIZE);

    // Check against provided sources
    for (const source of sources) {
      const sourceChunks = this.createChunks(source, this.CHUNK_SIZE);
      
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        if (chunk.length < this.MIN_PHRASE_LENGTH) continue;

        for (const sourceChunk of sourceChunks) {
          const similarity = compareTwoStrings(
            this.normalizeText(chunk),
            this.normalizeText(sourceChunk)
          );

          if (similarity >= this.SIMILARITY_THRESHOLD) {
            matches.push({
              text: chunk,
              source: sourceChunk,
              similarity: similarity * 100,
              startIndex: i * this.CHUNK_SIZE,
              endIndex: i * this.CHUNK_SIZE + chunk.length
            });
          }
        }
      }
    }

    // Calculate n-gram similarity for better detection
    const nGramMatches = this.checkNGramSimilarity(sentences, sources);
    matches.push(...nGramMatches);

    // Remove duplicates and sort by similarity
    const uniqueMatches = this.removeDuplicateMatches(matches);
    const overallScore = this.calculateOverallScore(uniqueMatches, text.length);

    return {
      similarity: overallScore,
      matches: uniqueMatches.sort((a, b) => b.similarity - a.similarity),
      overallScore,
      isPlagiarized: overallScore > 15 // More than 15% similarity is concerning
    };
  }

  /**
   * Self-plagiarism check - detect repetitive content within the document
   */
  checkSelfPlagiarism(text: string): PlagiarismResult {
    const sentences = this.splitIntoSentences(text);
    const matches: PlagiarismResult['matches'] = [];

    // Compare each sentence with all other sentences
    for (let i = 0; i < sentences.length; i++) {
      for (let j = i + 1; j < sentences.length; j++) {
        const similarity = compareTwoStrings(
          this.normalizeText(sentences[i]),
          this.normalizeText(sentences[j])
        );

        if (similarity >= this.SIMILARITY_THRESHOLD) {
          matches.push({
            text: sentences[i],
            source: sentences[j],
            similarity: similarity * 100,
            startIndex: i,
            endIndex: j
          });
        }
      }
    }

    const overallScore = this.calculateOverallScore(matches, text.length);

    return {
      similarity: overallScore,
      matches: matches.sort((a, b) => b.similarity - a.similarity),
      overallScore,
      isPlagiarized: overallScore > 20 // More than 20% self-repetition
    };
  }

  /**
   * Check for common plagiarism patterns
   */
  checkCommonPatterns(text: string): Array<{ pattern: string; count: number; severity: 'low' | 'medium' | 'high' }> {
    const patterns = [
      { regex: /according to (research|studies|experts)/gi, name: 'vague attribution', severity: 'medium' as const },
      { regex: /it is (widely|generally|commonly) (known|accepted|believed)/gi, name: 'unsupported claim', severity: 'medium' as const },
      { regex: /\b(very|extremely|highly|quite|rather|somewhat)\b/gi, name: 'weak qualifiers', severity: 'low' as const },
      { regex: /\bin conclusion\b.*\bin conclusion\b/gis, name: 'duplicate conclusion', severity: 'high' as const },
      { regex: /\b(copy|paste|duplicate)\b/gi, name: 'copy-paste indicators', severity: 'high' as const },
    ];

    return patterns.map(({ regex, name, severity }) => {
      const matches = text.match(regex) || [];
      return {
        pattern: name,
        count: matches.length,
        severity
      };
    }).filter(p => p.count > 0);
  }

  /**
   * Normalize text for comparison
   */
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, '') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  }

  /**
   * Split text into sentences
   */
  private splitIntoSentences(text: string): string[] {
    return text
      .split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20);
  }

  /**
   * Create overlapping chunks for better detection
   */
  private createChunks(text: string, chunkSize: number): string[] {
    const chunks: string[] = [];
    const overlap = Math.floor(chunkSize * 0.3); // 30% overlap

    for (let i = 0; i < text.length; i += chunkSize - overlap) {
      chunks.push(text.slice(i, i + chunkSize));
    }

    return chunks.filter(c => c.length >= this.MIN_PHRASE_LENGTH);
  }

  /**
   * Check n-gram similarity for phrase matching
   */
  private checkNGramSimilarity(
    sentences: string[],
    sources: string[]
  ): PlagiarismResult['matches'] {
    const matches: PlagiarismResult['matches'] = [];
    const nGramSize = 5; // 5-word phrases

    for (const sentence of sentences) {
      const words = sentence.split(/\s+/);
      if (words.length < nGramSize) continue;

      // Create n-grams from sentence
      for (let i = 0; i <= words.length - nGramSize; i++) {
        const nGram = words.slice(i, i + nGramSize).join(' ');

        // Check against sources
        for (const source of sources) {
          if (source.toLowerCase().includes(nGram.toLowerCase())) {
            matches.push({
              text: nGram,
              source: 'Found in source document',
              similarity: 100,
              startIndex: sentence.indexOf(nGram),
              endIndex: sentence.indexOf(nGram) + nGram.length
            });
          }
        }
      }
    }

    return matches;
  }

  /**
   * Remove duplicate matches
   */
  private removeDuplicateMatches(matches: PlagiarismResult['matches']): PlagiarismResult['matches'] {
    const seen = new Set<string>();
    return matches.filter(match => {
      const key = `${match.text}-${match.similarity}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  /**
   * Calculate overall plagiarism score
   */
  private calculateOverallScore(matches: PlagiarismResult['matches'], totalLength: number): number {
    if (matches.length === 0) return 0;

    const totalMatchedChars = matches.reduce((sum, match) => sum + match.text.length, 0);
    const avgSimilarity = matches.reduce((sum, match) => sum + match.similarity, 0) / matches.length;

    // Weight by both coverage and average similarity
    const coverageScore = (totalMatchedChars / totalLength) * 100;
    return Math.min(100, (coverageScore + avgSimilarity) / 2);
  }

  /**
   * Generate suggestions to improve originality
   */
  generateSuggestions(result: PlagiarismResult): string[] {
    const suggestions: string[] = [];

    if (result.isPlagiarized) {
      suggestions.push('⚠️ High similarity detected. Consider paraphrasing the highlighted sections.');
    }

    if (result.matches.length > 10) {
      suggestions.push('📝 Multiple matches found. Review and rewrite similar passages in your own words.');
    }

    if (result.overallScore > 30) {
      suggestions.push('🔴 Critical: Over 30% similarity. Significant rewriting required.');
    } else if (result.overallScore > 15) {
      suggestions.push('🟡 Warning: Over 15% similarity. Some rewriting recommended.');
    } else if (result.overallScore > 5) {
      suggestions.push('🟢 Good: Low similarity detected. Minor adjustments may help.');
    } else {
      suggestions.push('✅ Excellent: Very low similarity. Content appears original.');
    }

    return suggestions;
  }
}

export const plagiarismDetector = new PlagiarismDetector();
