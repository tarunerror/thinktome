import MistralClient from '@mistralai/mistralai';
import type { AcademicSource } from '../../types';
import { fetchArxivPapers, fetchPubMedPapers, fetchSemanticScholarPapers } from './sources';
import { generateImageDescription } from './images';
import { generateSectionPrompt } from './prompts';
import { serializeError } from '../../utils/errors';

const mistral = new MistralClient(import.meta.env.VITE_MISTRAL_API_KEY);

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

async function retryOperation<T>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return retryOperation(operation, retries - 1);
    }
    throw error;
  }
}

export const generatePaper = async (topic: string, wikiSummary: string): Promise<string> => {
  if (!import.meta.env.VITE_MISTRAL_API_KEY) {
    throw new Error('Mistral API key is not configured');
  }

  try {
    const [arxivPapers, pubmedPapers, semanticScholarPapers] = await Promise.all([
      fetchArxivPapers(topic),
      fetchPubMedPapers(topic),
      fetchSemanticScholarPapers(topic)
    ]);

    const academicSources = [
      ...arxivPapers,
      ...pubmedPapers,
      ...semanticScholarPapers
    ];

    const sections = [
      'abstract',
      'background',
      'literature-review',
      'research-objectives',
      'data-collection',
      'analysis-methods',
      'findings',
      'implications',
      'future-work',
      'conclusion'
    ];

    const generateSection = async (section: string) => {
      return retryOperation(async () => {
        const response = await mistral.chat({
          model: "mistral-large-latest",
          messages: [
            {
              role: "user",
              content: generateSectionPrompt(topic, section, wikiSummary, academicSources)
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.95
        });

        if (!response?.choices?.[0]?.message?.content) {
          throw new Error(`Failed to generate content for ${section} section`);
        }

        return `${section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ')}\n\n${response.choices[0].message.content}\n\n`;
      });
    };

    const sectionPromises = sections.map(generateSection);

    const [sectionContents, referencesResponse, images] = await Promise.all([
      Promise.all(sectionPromises),
      retryOperation(() => 
        mistral.chat({
          model: "mistral-large-latest",
          messages: [
            {
              role: "user",
              content: generateSectionPrompt(topic, 'references', wikiSummary, academicSources)
            }
          ],
          temperature: 0.7,
          max_tokens: 1000,
          top_p: 0.95
        })
      ),
      generateImageDescription(topic)
    ]);
    
    const referencesContent = referencesResponse.choices[0].message.content;
    const imagesContent = images.map(img => (
      `\n\nFigure: ${img.title}\n${img.description}\n${img.type}\n<img src="${img.url}" alt="${img.title}" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">`
    )).join('\n');

    return [...sectionContents, `References\n\n${referencesContent}\n\nVisual References\n${imagesContent}\n`].join('\n');

  } catch (error) {
    const serializedError = serializeError(error);
    console.error('Error generating paper:', serializedError);
    
    if (error instanceof Error) {
      if (error.message.includes('401')) {
        throw new Error('Invalid API key. Please check your Mistral API key configuration.');
      } else if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (error.message.includes('Max retries')) {
        throw new Error('Failed to generate paper after multiple attempts. Please try again.');
      }
    }
    
    throw new Error(`Failed to generate research paper: ${serializedError.message}`);
  }
};