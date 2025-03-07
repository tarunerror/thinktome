import { serializeError } from './errors';

export const extractJSONFromText = (text: string): any[] => {
  try {
    // First try: direct JSON parse after cleaning
    const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim();
    try {
      return JSON.parse(cleanedText);
    } catch {
      // If direct parse fails, continue to next approach
    }

    // Second try: find JSON array pattern
    const matches = text.match(/\[\s*\{[^]*\}\s*\]/g);
    if (matches) {
      for (const match of matches) {
        try {
          const parsed = JSON.parse(match);
          if (Array.isArray(parsed)) {
            return parsed;
          }
        } catch {
          continue;
        }
      }
    }

    // Third try: more aggressive cleaning
    const aggressiveCleaned = text
      .replace(/[\u201C\u201D]/g, '"') // Replace curly quotes
      .replace(/[\u2018\u2019]/g, "'") // Replace curly apostrophes
      .replace(/[^\x20-\x7E]/g, '') // Remove non-printable characters
      .replace(/```.*?```/gs, '') // Remove code blocks
      .trim();

    try {
      return JSON.parse(aggressiveCleaned);
    } catch {
      // If all attempts fail, return empty array
      return [];
    }

  } catch (error) {
    console.error('Error parsing JSON from text:', serializeError(error));
    return [];
  }
};