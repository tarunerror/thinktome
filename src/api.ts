import MistralClient from '@mistralai/mistralai';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import type { ResearchSource, ResearchImage } from './types';

interface AcademicSource {
  title: string;
  authors: string[];
  abstract: string;
  url: string;
  source: string;
  year: number;
  status: 'pending' | 'completed' | 'failed';
}

interface WikiSearchResult {
  title: string;
  snippet?: string;
}

interface WikiResponse {
  query: {
    search: WikiSearchResult[];
  };
}

interface WikiPage {
  extract?: string;
}

interface WikiContentResponse {
  query: {
    pages: Record<string, WikiPage>;
  };
}

interface ArxivAuthor {
  name: string;
}

interface ArxivEntry {
  title: string;
  author: ArxivAuthor | ArxivAuthor[];
  summary: string;
  id: string;
  published: string;
}

interface SemanticScholarAuthor {
  name: string;
}

interface SemanticScholarPaper {
  title: string;
  authors?: SemanticScholarAuthor[];
  abstract: string;
  url: string;
  year: number;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_"
});

const WIKIMEDIA_API_URL = 'https://en.wikipedia.org/w/api.php';
const ARXIV_API_URL = 'https://export.arxiv.org/api/query';
const PUBMED_API_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
const SEMANTIC_SCHOLAR_API_URL = 'https://api.semanticscholar.org/graph/v1/paper/search';
const GOOGLE_SCHOLAR_SEARCH_URL = 'https://scholar.google.com/scholar';

const mistral = new MistralClient(import.meta.env.VITE_MISTRAL_API_KEY);

const sanitizeText = (text: string | null | undefined): string => {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};

const serializeError = (error: unknown): { message: string; type: string } => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.error?.message || error.response?.data?.message || error.response?.data?.error || error.message || 'API Error',
      type: 'AxiosError'
    };
  }
  return {
    message: error instanceof Error ? error.message : 'An unexpected error occurred',
    type: error instanceof Error ? error.constructor.name : 'UnknownError'
  };
};

async function fetchArxivPapers(topic: string): Promise<AcademicSource[]> {
  try {
    const response = await axios.get(ARXIV_API_URL, {
      params: {
        search_query: `all:${topic}`,
        start: 0,
        max_results: 5,
        sortBy: 'relevance',
        sortOrder: 'descending'
      },
      headers: {
        'Accept': 'application/xml'
      },
      timeout: 10000
    });

    const result = parser.parse(response.data);
    const entries = result.feed?.entry || [];
    const entriesArray = Array.isArray(entries) ? entries : [entries];

    return entriesArray.map((entry: ArxivEntry) => ({
      title: entry.title || '',
      authors: Array.isArray(entry.author) 
        ? entry.author.map((a: ArxivAuthor) => a.name || '') 
        : entry.author ? [entry.author.name || ''] : [],
      abstract: entry.summary || '',
      url: entry.id || '',
      source: 'arXiv',
      year: entry.published ? new Date(entry.published).getFullYear() : new Date().getFullYear(),
      status: 'completed' as const
    }));
  } catch (error) {
    const serializedError = serializeError(error);
    console.error('Error fetching from arXiv:', serializedError);
    return [];
  }
}

async function fetchPubMedPapers(topic: string): Promise<AcademicSource[]> {
  try {
    const searchResponse = await axios.get(PUBMED_API_URL, {
      params: {
        db: 'pubmed',
        term: topic,
        retmax: 5,
        retmode: 'json'
      },
      timeout: 10000
    });

    const ids = searchResponse.data.esearchresult?.idlist || [];
    const sources: AcademicSource[] = ids.map((id: string) => ({
      title: `PubMed Article ${id}`,
      authors: [],
      abstract: '',
      url: `https://pubmed.ncbi.nlm.nih.gov/${id}`,
      source: 'PubMed',
      year: new Date().getFullYear(),
      status: 'completed' as const
    }));

    return sources;
  } catch (error) {
    const serializedError = serializeError(error);
    console.error('Error fetching from PubMed:', serializedError);
    return [];
  }
}

async function fetchSemanticScholarPapers(topic: string): Promise<AcademicSource[]> {
  try {
    const response = await axios.get(SEMANTIC_SCHOLAR_API_URL, {
      params: {
        query: topic,
        limit: 5,
        fields: 'title,authors,abstract,url,year'
      },
      headers: {
        'Accept': 'application/json'
      },
      timeout: 10000
    });

    return (response.data.data || []).map((paper: SemanticScholarPaper) => ({
      title: paper.title || '',
      authors: paper.authors?.map((a: SemanticScholarAuthor) => a.name || '') || [],
      abstract: paper.abstract || '',
      url: paper.url || '',
      source: 'Semantic Scholar',
      year: paper.year || new Date().getFullYear(),
      status: 'completed' as const
    }));
  } catch (error) {
    const serializedError = serializeError(error);
    console.error('Error fetching from Semantic Scholar:', serializedError);
    return [];
  }
}

async function fetchGoogleScholarPapers(topic: string): Promise<AcademicSource[]> {
  try {
    // Google Scholar doesn't have a public API, so we'll create reference links
    // For actual scraping, you would need to use a service like SerpAPI or ScraperAPI
    const scholarUrl = `${GOOGLE_SCHOLAR_SEARCH_URL}?q=${encodeURIComponent(topic)}`;
    
    // Return a reference to Google Scholar search
    const scholarResults: AcademicSource[] = [{
      title: `Google Scholar: ${topic}`,
      authors: [],
      abstract: `Search results for "${topic}" on Google Scholar`,
      url: scholarUrl,
      source: 'Google Scholar',
      year: new Date().getFullYear(),
      status: 'completed' as const
    }];

    // If you have SerpAPI key, you can uncomment and use this:
    // const SERPAPI_KEY = import.meta.env.VITE_SERPAPI_KEY;
    // if (SERPAPI_KEY) {
    //   const response = await axios.get('https://serpapi.com/search', {
    //     params: {
    //       engine: 'google_scholar',
    //       q: topic,
    //       api_key: SERPAPI_KEY,
    //       num: 5
    //     },
    //     timeout: 10000
    //   });
    //   
    //   return (response.data.organic_results || []).map((result: any) => ({
    //     title: result.title || '',
    //     authors: result.publication_info?.authors?.map((a: any) => a.name).filter(Boolean) || [],
    //     abstract: result.snippet || '',
    //     url: result.link || scholarUrl,
    //     source: 'Google Scholar',
    //     year: result.publication_info?.summary?.match(/\d{4}/)?.[0] 
    //           ? parseInt(result.publication_info.summary.match(/\d{4}/)[0]) 
    //           : new Date().getFullYear(),
    //     status: 'completed' as const
    //   }));
    // }

    return scholarResults;
  } catch (error) {
    const serializedError = serializeError(error);
    console.error('Error fetching from Google Scholar:', serializedError);
    return [];
  }
}

const generateSectionPrompt = (topic: string, section: string, context: string, sources: AcademicSource[]): string => {
  const sourceContext = sources
    .map(s => `${s.title} (${s.source}, ${s.year}): ${s.abstract}`)
    .join('\n\n');

  const prompts: Record<string, string> = {
    abstract: `Write a comprehensive academic abstract for a research paper on "${topic}". Include the main objectives, methodology, key findings, and implications. Use this context and academic sources:\n\n${context}\n\n${sourceContext}`,
    background: `Write the background section for a research paper on "${topic}". Provide historical context, current state of research, and key developments in the field. Use these academic sources:\n\n${sourceContext}`,
    'literature-review': `Write a detailed literature review section for a research paper on "${topic}". Analyze and synthesize the following academic sources:\n\n${sourceContext}`,
    'research-objectives': `Write the research objectives section for a paper on "${topic}". Clearly state the goals, scope, and significance of the research. Use this context: ${context}`,
    'data-collection': `Write the data collection methodology section for a research paper on "${topic}". Detail the data sources, collection methods, and sampling techniques. Use this context: ${context}`,
    'analysis-methods': `Write the analysis methods section for a research paper on "${topic}". Describe the analytical techniques, tools, and frameworks used. Use this context: ${context}`,
    'findings': `Write the findings section for a research paper on "${topic}". Present the key results and observations from the research. Use this context: ${context}`,
    'implications': `Write the implications section for a research paper on "${topic}". Discuss the theoretical and practical implications of the findings. Use this context: ${context}`,
    'future-work': `Write the future work section for a research paper on "${topic}". Suggest potential research directions and areas for further investigation. Use this context: ${context}`,
    conclusion: `Write the conclusion section for a research paper on "${topic}". Summarize key findings, discuss implications, and suggest future research directions. Use this context: ${context}`,
    references: `For a research paper on "${topic}", provide:
1. A list of relevant academic references including key papers, books, and scholarly sources
2. Descriptions of 3-4 key visual elements (graphs, diagrams, or images) that would be important to include, explaining what each should show and why it's relevant
Use this context: ${context}`
  };

  return prompts[section] || `Write about ${section} for a research paper on "${topic}". Use these sources:\n\n${sourceContext}`;
};

interface ImageSuggestion {
  title: string;
  description: string;
  type: string;
}

const extractJSONFromText = (text: string): ImageSuggestion[] => {
  try {
    const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim();
    return JSON.parse(cleanedText);
  } catch {
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

const generateImageDescription = async (topic: string): Promise<ResearchImage[]> => {
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
      maxTokens: 1000,
      topP: 0.95
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

export const generatePaper = async (topic: string, wikiSummary: string): Promise<string> => {
  if (!import.meta.env.VITE_MISTRAL_API_KEY) {
    throw new Error('Mistral API key is not configured');
  }

  try {
    const [arxivPapers, pubmedPapers, semanticScholarPapers, googleScholarPapers] = await Promise.all([
      fetchArxivPapers(topic),
      fetchPubMedPapers(topic),
      fetchSemanticScholarPapers(topic),
      fetchGoogleScholarPapers(topic)
    ]);

    const academicSources = [
      ...arxivPapers,
      ...pubmedPapers,
      ...semanticScholarPapers,
      ...googleScholarPapers
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

    const sectionPromises = sections.map(async (section) => {
      const response = await mistral.chat({
        model: "mistral-large-latest",
        messages: [
          {
            role: "user",
            content: generateSectionPrompt(topic, section, wikiSummary, academicSources)
          }
        ],
        temperature: 0.7,
        maxTokens: 1000,
        topP: 0.95
      });

      if (!response?.choices?.[0]?.message?.content) {
        throw new Error(`Failed to generate content for ${section} section`);
      }

      return `${section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ')}\n\n${response.choices[0].message.content}\n\n`;
    });

    const [referencesResponse, images] = await Promise.all([
      mistral.chat({
        model: "mistral-large-latest",
        messages: [
          {
            role: "user",
            content: generateSectionPrompt(topic, 'references', wikiSummary, academicSources)
          }
        ],
        temperature: 0.7,
        maxTokens: 1000,
        topP: 0.95
      }),
      generateImageDescription(topic)
    ]);

    const sectionContents = await Promise.all(sectionPromises);
    
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
      }
    }
    
    throw new Error(`Failed to generate research paper: ${serializedError.message}`);
  }
};

export const fetchWikiData = async (topic: string): Promise<{ summary: string; sources: ResearchSource[] }> => {
  try {
    // First, try to get a more focused search result
    const searchQuery = `${topic} research study analysis`;
    
    const wikiResponse = await axios.get<WikiResponse>(`${WIKIMEDIA_API_URL}?${new URLSearchParams({
      action: 'query',
      format: 'json',
      list: 'search',
      srsearch: searchQuery,
      srlimit: '10',
      srnamespace: '0',
      srprop: 'snippet|title',
      srwhat: 'text',
      srenablerewrites: '1',
      origin: '*'
    }).toString()}`);

    if (!wikiResponse.data?.query?.search?.length) {
      // If no results, try a broader search
      const broadSearchResponse = await axios.get<WikiResponse>(`${WIKIMEDIA_API_URL}?${new URLSearchParams({
        action: 'query',
        format: 'json',
        list: 'search',
        srsearch: topic,
        srlimit: '10',
        srnamespace: '0',
        srprop: 'snippet|title',
        srwhat: 'text',
        origin: '*'
      }).toString()}`);

      if (!broadSearchResponse.data?.query?.search?.length) {
        // If still no results, use the topic itself as context
        return {
          summary: `Research topic: ${topic}`,
          sources: await fetchInitialSources(topic)
        };
      }

      wikiResponse.data = broadSearchResponse.data;
    }

    const articlePromises = wikiResponse.data.query.search.map(async (result: WikiSearchResult) => {
      const contentResponse = await axios.get<WikiContentResponse>(`${WIKIMEDIA_API_URL}?${new URLSearchParams({
        action: 'query',
        format: 'json',
        titles: result.title,
        prop: 'extracts|info',
        exintro: '1',
        explaintext: '1',
        inprop: 'url',
        origin: '*'
      }).toString()}`);

      const pages = Object.values(contentResponse.data.query.pages);
      return pages[0];
    });

    const articles = await Promise.all(articlePromises);
    const summaries = articles
      .map((article: WikiPage) => article.extract)
      .filter(Boolean)
      .slice(0, 3) // Take only the top 3 most relevant summaries
      .join('\n\n');

    const summary = summaries 
      ? sanitizeText(summaries)
      : `Research topic: ${topic}`;

    const sources = await fetchInitialSources(topic);

    return { summary, sources };
  } catch (error) {
    const serializedError = serializeError(error);
    console.error('Error fetching research data:', serializedError);
    
    // Return a basic context even if Wikipedia search fails
    return {
      summary: `Research topic: ${topic}`,
      sources: await fetchInitialSources(topic)
    };
  }
};

async function fetchInitialSources(topic: string): Promise<ResearchSource[]> {
  const [arxivPapers, pubmedPapers, semanticScholarPapers, googleScholarPapers] = await Promise.all([
    fetchArxivPapers(topic),
    fetchPubMedPapers(topic),
    fetchSemanticScholarPapers(topic),
    fetchGoogleScholarPapers(topic)
  ]);
  
  return [
    ...arxivPapers.map(paper => ({
      title: `arXiv: ${paper.title}`,
      url: paper.url,
      status: 'completed' as const
    })),
    ...pubmedPapers.map(paper => ({
      title: `PubMed: ${paper.title}`,
      url: paper.url,
      status: 'completed' as const
    })),
    ...semanticScholarPapers.map(paper => ({
      title: `Semantic Scholar: ${paper.title}`,
      url: paper.url,
      status: 'completed' as const
    })),
    ...googleScholarPapers.map(paper => ({
      title: `Google Scholar: ${paper.title}`,
      url: paper.url,
      status: 'completed' as const
    })),
    {
      title: 'IEEE Xplore Digital Library',
      url: `https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=${encodeURIComponent(topic)}`,
      status: 'pending' as const
    },
    {
      title: 'SpringerLink Research Papers',
      url: `https://link.springer.com/search?query=${encodeURIComponent(topic)}`,
      status: 'pending' as const
    },
    {
      title: 'ScienceDirect Publications',
      url: `https://www.sciencedirect.com/search?qs=${encodeURIComponent(topic)}`,
      status: 'pending' as const
    },
    {
      title: 'JSTOR Academic Articles',
      url: `https://www.jstor.org/action/doBasicSearch?Query=${encodeURIComponent(topic)}`,
      status: 'pending' as const
    }
  ];
}