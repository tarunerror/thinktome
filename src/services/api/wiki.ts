import axios from 'axios';
import type { WikiResponse, WikiPage, WikiSearchResult, ResearchSource } from '../../types';
import { sanitizeText } from '../../utils/text';
import { serializeError } from '../../utils/errors';
import { fetchInitialSources } from './sources';

const WIKIMEDIA_API_URL = 'https://en.wikipedia.org/w/api.php';

const wikiAxios = axios.create({
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'User-Agent': 'Research-Paper-Generator/1.0'
  }
});

export const fetchWikiData = async (topic: string): Promise<{ summary: string; sources: ResearchSource[] }> => {
  try {
    // First, try to get a more focused search result
    const searchQuery = `${topic} research study analysis`;
    
    const wikiResponse = await wikiAxios.get<WikiResponse>(`${WIKIMEDIA_API_URL}?${new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: encodeURIComponent(searchQuery),
      srlimit: '10',
      srnamespace: '0',
      srprop: 'snippet|title',
      srwhat: 'text',
      srenablerewrites: '1',
      origin: '*'
    }).toString()}`);

    if (!wikiResponse.data?.query?.search?.length) {
      // If no results, try a broader search
      const broadSearchResponse = await wikiAxios.get<WikiResponse>(`${WIKIMEDIA_API_URL}?${new URLSearchParams({
        action: 'query',
        format: 'json',
        list: 'search',
        srsearch: encodeURIComponent(topic),
        srlimit: '10',
        srnamespace: '0',
        srprop: 'snippet|title',
        srwhat: 'text',
        origin: '*'
      }).toString()}`);

      if (!broadSearchResponse.data?.query?.search?.length) {
        return {
          summary: `Research topic: ${topic}`,
          sources: await fetchInitialSources(topic)
        };
      }

      wikiResponse.data = broadSearchResponse.data;
    }

    const articlePromises = wikiResponse.data.query.search.map(async (result: WikiSearchResult) => {
      try {
        const contentResponse = await wikiAxios.get<{ query: { pages: Record<string, WikiPage> } }>(`${WIKIMEDIA_API_URL}?${new URLSearchParams({
          action: 'query',
          format: 'json',
          titles: encodeURIComponent(result.title),
          prop: 'extracts|info',
          exintro: '1',
          explaintext: '1',
          inprop: 'url',
          origin: '*'
        }).toString()}`);

        const pages = Object.values(contentResponse.data.query.pages);
        return pages[0];
      } catch (error) {
        console.error(`Error fetching article content for "${result.title}":`, serializeError(error));
        return null;
      }
    });

    const articles = (await Promise.all(articlePromises)).filter((article): article is WikiPage => article !== null);
    const summaries = articles
      .map((article) => article.extract)
      .filter(Boolean)
      .slice(0, 3)
      .join('\n\n');

    const summary = summaries 
      ? sanitizeText(summaries)
      : `Research topic: ${topic}`;

    const sources = await fetchInitialSources(topic);

    return { summary, sources };
  } catch (error) {
    console.error('Error fetching research data:', serializeError(error));
    
    return {
      summary: `Research topic: ${topic}`,
      sources: await fetchInitialSources(topic)
    };
  }
};