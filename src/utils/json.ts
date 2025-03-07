import { serializeError } from './errors';

export const extractJSONFromText = (text: string): any[] => {
  try {
    const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch (e) {
    try {
      const matches = text.match(/\[[\s\S]*?\]/g);
      if (!matches) return [];

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
    } catch (parseError) {
      const serializedError = serializeError(parseError);
      console.error('Error parsing JSON from text:', serializedError);
    }
    return [];
  }
};