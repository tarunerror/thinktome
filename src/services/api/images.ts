import MistralClient from '@mistralai/mistralai';
import type { ResearchImage } from '../../types';
import { extractJSONFromText } from '../../utils/json';
import { serializeError } from '../../utils/errors';

const mistral = new MistralClient(import.meta.env.VITE_MISTRAL_API_KEY);

export const generateImageDescription = async (topic: string): Promise<ResearchImage[]> => {
  try {
    const response = await mistral.chat({
      model: "mistral-large-latest",
      messages: [
        {
          role: "user",
          content: `Generate a JSON array of 3 scientific visualizations for a research paper on "${topic}". Each object should have:
{
  "title": "clear title",
  "description": "detailed description",
  "type": "graph" or "diagram" or "photo"
}
Response must be a valid JSON array only.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.95
    });

    const content = response.choices[0].message.content;
    const suggestedImages = extractJSONFromText(content);

    if (!Array.isArray(suggestedImages) || suggestedImages.length === 0) {
      return [{
        title: `${topic} Overview`,
        description: `Visual representation of key concepts in ${topic}`,
        type: 'diagram',
        url: `https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1600&h=900&fit=crop`
      }];
    }

    const validatedImages = suggestedImages
      .filter(img => img.title && img.description && img.type)
      .map(img => ({
        title: String(img.title),
        description: String(img.description),
        type: ['graph', 'diagram', 'photo'].includes(String(img.type)) ? String(img.type) as ResearchImage['type'] : 'diagram',
        url: ''
      }));

    if (validatedImages.length === 0) {
      return [{
        title: `${topic} Overview`,
        description: `Visual representation of key concepts in ${topic}`,
        type: 'diagram',
        url: `https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1600&h=900&fit=crop`
      }];
    }

    // Use a list of reliable Unsplash images that we know exist
    const reliableImages = [
      'photo-1507668077129-56e32842fceb',
      'photo-1516110833967-0b5716ca1387',
      'photo-1532094349884-543bc11b234d',
      'photo-1516321318423-f06f85e504b3',
      'photo-1629904853716-f0bc54eea481'
    ];

    const imagesWithUrls: ResearchImage[] = validatedImages.map((img, index) => ({
      ...img,
      url: `https://images.unsplash.com/${reliableImages[index % reliableImages.length]}?w=1600&h=900&fit=crop`
    }));

    return imagesWithUrls;
  } catch (error) {
    const serializedError = serializeError(error);
    console.error('Error generating images:', serializedError);
    return [{
      title: `${topic} Overview`,
      description: `Visual representation of key concepts in ${topic}`,
      type: 'diagram',
      url: `https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=1600&h=900&fit=crop`
    }];
  }
};