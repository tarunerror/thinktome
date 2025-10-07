import axios from 'axios';
import axiosRetry from 'axios-retry';
import { XMLParser } from 'fast-xml-parser';
import type { AcademicSource, ResearchSource } from '../../types';
import { serializeError } from '../../utils/errors';

// Type definitions for API responses
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

interface PubMedAuthor {
  name: string;
}

interface PubMedPaper {
  title: string;
  authors?: PubMedAuthor[];
  abstract: string;
  pubdate: string;
}

interface SemanticScholarAuthor {
  name: string;
}

interface SemanticScholarPaper {
  title: string;
  authors: SemanticScholarAuthor[];
  abstract: string;
  url: string;
  year: number;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_"
});

const ARXIV_API_URL = 'https://export.arxiv.org/api/query';
const PUBMED_API_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi';
const SEMANTIC_SCHOLAR_API_URL = 'https://api.semanticscholar.org/graph/v1/paper/search';
const GOOGLE_SCHOLAR_SEARCH_URL = 'https://scholar.google.com/scholar';

// Create axios instance with retry configuration
const axiosInstance = axios.create({
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Accept': 'application/json, application/xml',
    'User-Agent': 'Research-Paper-Generator/1.0'
  }
});

// Configure axios-retry with more aggressive settings
axiosRetry(axiosInstance, {
  retries: 5, // Increased from 3 to 5
  retryDelay: (retryCount) => {
    return Math.min(retryCount * 3000, 15000); // More aggressive backoff, max 15 seconds
  },
  retryCondition: (error) => {
    // Retry on network errors, timeouts, and 5xx server errors
    return !!(axiosRetry.isNetworkOrIdempotentRequestError(error) || 
           error.code === 'ECONNABORTED' ||
           (error.response?.status && error.response.status >= 500));
  },
  shouldResetTimeout: true // Reset timeout between retries
});

export async function fetchArxivPapers(topic: string): Promise<AcademicSource[]> {
  try {
    const response = await axiosInstance.get(ARXIV_API_URL, {
      params: {
        search_query: `all:${encodeURIComponent(topic)}`,
        start: 0,
        max_results: 5,
        sortBy: 'relevance',
        sortOrder: 'descending'
      }
    });

    const result = parser.parse(response.data);
    const entries = result.feed?.entry || [];
    const entriesArray = Array.isArray(entries) ? entries : [entries];

    return entriesArray.map((entry: ArxivEntry) => ({
      title: entry.title || '',
      authors: Array.isArray(entry.author) 
        ? entry.author.map((a: ArxivAuthor) => a.name || '').filter(Boolean)
        : entry.author ? [entry.author.name || ''].filter(Boolean) : [],
      abstract: entry.summary || '',
      url: entry.id || '',
      source: 'arXiv',
      year: entry.published ? new Date(entry.published).getFullYear() : new Date().getFullYear(),
      status: 'completed' as const
    }));
  } catch (error) {
    console.error('Error fetching from arXiv:', serializeError(error));
    return [];
  }
}

export async function fetchPubMedPapers(topic: string): Promise<AcademicSource[]> {
  try {
    const searchResponse = await axiosInstance.get(PUBMED_API_URL, {
      params: {
        db: 'pubmed',
        term: encodeURIComponent(topic),
        retmax: 5,
        retmode: 'json',
        usehistory: 'y'
      }
    });

    const ids = searchResponse.data.esearchresult?.idlist || [];
    if (ids.length === 0) return [];

    const detailsPromises = ids.map(async (id: string) => {
      try {
        const response = await axiosInstance.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi', {
          params: {
            db: 'pubmed',
            id,
            retmode: 'json',
            version: '2.0'
          }
        });

        const paper: PubMedPaper | undefined = response.data.result[id];
        if (!paper) return null;

        return {
          title: paper.title || `PubMed Article ${id}`,
          authors: (paper.authors || []).map((a: PubMedAuthor) => a.name).filter(Boolean),
          abstract: paper.abstract || '',
          url: `https://pubmed.ncbi.nlm.nih.gov/${id}`,
          source: 'PubMed',
          year: paper.pubdate ? new Date(paper.pubdate).getFullYear() : new Date().getFullYear(),
          status: 'completed' as const
        };
      } catch (error) {
        console.error(`Error fetching PubMed paper details for ID ${id}:`, serializeError(error));
        return null;
      }
    });

    const results = await Promise.all(detailsPromises);
    return results.filter((paper): paper is AcademicSource => paper !== null);
  } catch (error) {
    console.error('Error fetching from PubMed:', serializeError(error));
    return [];
  }
}

export async function fetchSemanticScholarPapers(topic: string): Promise<AcademicSource[]> {
  try {
    // Use a fallback URL if Semantic Scholar API fails
    const fallbackUrl = `https://www.semanticscholar.org/search?q=${encodeURIComponent(topic)}`;

    try {
      const response = await axiosInstance.get(SEMANTIC_SCHOLAR_API_URL, {
        params: {
          query: encodeURIComponent(topic),
          limit: 5,
          fields: 'title,authors,abstract,url,year,venue'
        }
      });

      return (response.data.data || [])
        .filter((paper: SemanticScholarPaper) => paper.title && paper.authors)
        .map((paper: SemanticScholarPaper) => ({
          title: paper.title,
          authors: (paper.authors || []).map((a: SemanticScholarAuthor) => a.name).filter(Boolean),
          abstract: paper.abstract || '',
          url: paper.url || fallbackUrl,
          source: 'Semantic Scholar',
          year: paper.year || new Date().getFullYear(),
          status: 'completed' as const
        }));
    } catch {
      // If API fails, return a single fallback result
      return [{
        title: 'Semantic Scholar Search Results',
        authors: [],
        abstract: `Search results for: ${topic}`,
        url: fallbackUrl,
        source: 'Semantic Scholar',
        year: new Date().getFullYear(),
        status: 'completed' as const
      }];
    }
  } catch (error) {
    console.error('Error fetching from Semantic Scholar:', serializeError(error));
    return [];
  }
}

export async function fetchGoogleScholarPapers(topic: string): Promise<AcademicSource[]> {
  try {
    // Google Scholar doesn't have a public API, so we'll create reference links
    // For actual scraping, you would need to use a service like SerpAPI or ScraperAPI
    const scholarUrl = `${GOOGLE_SCHOLAR_SEARCH_URL}?q=${encodeURIComponent(topic)}`;
    
    // Option 1: Return a reference to Google Scholar search
    // This is a fallback when we can't scrape directly
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
    //   const response = await axiosInstance.get('https://serpapi.com/search', {
    //     params: {
    //       engine: 'google_scholar',
    //       q: topic,
    //       api_key: SERPAPI_KEY,
    //       num: 5
    //     }
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
    //     status: 'completed' as const,
    //     startTime: Date.now()
    //   }));
    // }

    return scholarResults;
  } catch (error) {
    console.error('Error fetching from Google Scholar:', serializeError(error));
    return [];
  }
}

export async function fetchInitialSources(topic: string): Promise<ResearchSource[]> {
  const [arxivPapers, pubmedPapers, semanticScholarPapers, googleScholarPapers] = await Promise.all([
    fetchArxivPapers(topic),
    fetchPubMedPapers(topic),
    fetchSemanticScholarPapers(topic),
    fetchGoogleScholarPapers(topic)
  ]);

  const completedSources = [
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
    }))
  ];

  const additionalSources: ResearchSource[] = [
    {
      title: 'IEEE Xplore Digital Library',
      url: `https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=${encodeURIComponent(topic)}`,
      status: 'pending' as const
    },
    {
      title: 'SpringerLink Research Papers',
      url: `https://link.springer.com/search?query=${encodeURIComponent(topic)}`,
      status: 'pending' as const
    }
  ];

  return [...completedSources, ...additionalSources];
}