import MistralClient from '@mistralai/mistralai';
import type { Topic } from '../../types';
import { serializeError } from '../../utils/errors';
import { extractJSONFromText } from '../../utils/json';
import { researchTopics } from '../../topics';
import { apiClient } from './axios';

const mistral = new MistralClient(import.meta.env.VITE_MISTRAL_API_KEY);
const GITHUB_API_URL = 'https://api.github.com';

interface GitHubSearchResult {
  items: Array<{
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    topics: string[];
  }>;
}

export async function generateResearchTopics(): Promise<Topic[]> {
  if (!import.meta.env.VITE_MISTRAL_API_KEY) {
    return getRandomTopics(3);
  }

  try {
    const response = await mistral.chat({
      model: "mistral-large-latest",
      messages: [
        {
          role: "system",
          content: "You are a research topic generator. Generate specific, well-defined research topics suitable for academic papers."
        },
        {
          role: "user",
          content: `Generate a JSON array of 3 unique and interesting research topics. Each topic should be an object with:
{
  "title": "specific research topic title",
  "description": "brief description of the research focus",
  "category": one of ["technology", "science", "medicine", "environment", "social"]
}
Topics should be current, relevant, and suitable for academic research.
Response must be a valid JSON array only.`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
      top_p: 0.95
    });

    const content = response.choices[0].message.content;
    const topics = extractJSONFromText(content);

    if (!Array.isArray(topics) || topics.length === 0) {
      return getRandomTopics(3);
    }

    const validTopics = topics
      .filter(topic => 
        topic.title && 
        topic.description && 
        ['technology', 'science', 'medicine', 'environment', 'social'].includes(topic.category)
      )
      .map(topic => ({
        title: String(topic.title),
        description: String(topic.description),
        category: topic.category as Topic['category']
      }));

    if (validTopics.length < 3) {
      return getRandomTopics(3);
    }

    return validTopics;

  } catch (error) {
    console.error('Error generating research topics:', serializeError(error));
    return getRandomTopics(3);
  }
}

function getRandomTopics(count: number): Topic[] {
  const shuffled = [...researchTopics].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export async function searchGitHubRepositories(topic: string): Promise<any[]> {
  try {
    const response = await apiClient.get<GitHubSearchResult>(`${GITHUB_API_URL}/search/repositories`, {
      params: {
        q: `${encodeURIComponent(topic)} in:name,description,readme language:python,jupyter-notebook stars:>10`,
        sort: 'stars',
        order: 'desc',
        per_page: 5
      },
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    return response.data.items.map(repo => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      topics: repo.topics
    }));

  } catch (error) {
    console.error('Error searching GitHub repositories:', serializeError(error));
    return [];
  }
}