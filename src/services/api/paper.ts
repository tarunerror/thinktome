import MistralClient from '@mistralai/mistralai';
import { fetchArxivPapers, fetchPubMedPapers, fetchSemanticScholarPapers } from './sources';
import { generateImageDescription } from './images';
import { generateSectionPrompt } from './prompts';
import { serializeError } from '../../utils/errors';
import { searchGitHubRepositories } from './topics';
import { getResearchTemplate } from '../../utils/researchTemplates';

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
    const [arxivPapers, pubmedPapers, semanticScholarPapers, githubRepos] = await Promise.all([
      fetchArxivPapers(topic),
      fetchPubMedPapers(topic),
      fetchSemanticScholarPapers(topic),
      searchGitHubRepositories(topic)
    ]);

    const academicSources = [
      ...arxivPapers,
      ...pubmedPapers,
      ...semanticScholarPapers
    ];

    const githubContext = githubRepos.length > 0
      ? `\n\nRelevant GitHub Repositories:\n${githubRepos
          .map(repo => `${repo.name} (${repo.stars} stars): ${repo.description || 'No description'}
URL: ${repo.url}
Topics: ${repo.topics.join(', ')}`)
          .join('\n\n')}`
      : '';

    const template = getResearchTemplate(topic);
    
    // Flatten the section structure to get all sections including children
    const allSections = template.sections.reduce((acc: Array<{id: string, title: string}>, section) => {
      acc.push({ id: section.id, title: section.title });
      if (section.children) {
        acc.push(...section.children.map(child => ({ id: child.id, title: child.title })));
      }
      return acc;
    }, []);

    const generateSection = async (section: { id: string, title: string }) => {
      return retryOperation(async () => {
        const prompt = generateSectionPrompt(topic, section.id, wikiSummary + githubContext, academicSources);
        
        const response = await mistral.chat({
          model: "mistral-large-latest",
          messages: [
            {
              role: "system",
              content: `You are a research paper writing assistant. Generate content specifically for the "${section.title}" section of a research paper about "${topic}". Focus ONLY on this section's content. Do not include other sections or their headings.`
            },
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          maxTokens: 2000,
          topP: 0.95
        });

        if (!response?.choices?.[0]?.message?.content) {
          throw new Error(`Failed to generate content for ${section.title} section`);
        }

        // Format the section with its title and ensure proper spacing
        return `# ${section.title}\n\n${response.choices[0].message.content.trim()}\n\n`;
      });
    };

    const sectionPromises = allSections.map(generateSection);

    const [sectionContents, images] = await Promise.all([
      Promise.all(sectionPromises),
      generateImageDescription(topic)
    ]);
    
    const imagesContent = images.map(img => (
      `\n\nFigure: ${img.title}\n${img.description}\n${img.type}\n<img src="${img.url}" alt="${img.title}" style="max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">`
    )).join('\n');

    // Join all sections in order with proper spacing
    const paperContent = sectionContents.join('\n');

    return paperContent + `\n\n# Visual References\n${imagesContent}\n`;

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