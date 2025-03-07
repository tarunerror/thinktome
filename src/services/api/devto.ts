import axios from 'axios';
import { serializeError } from '../../utils/errors';

const DEV_TO_API_URL = 'https://dev.to/api';

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  tags: string[];
  reactions_count: number;
  comments_count: number;
}

const devtoAxios = axios.create({
  baseURL: DEV_TO_API_URL,
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

async function fetchArticlesPage(params: Record<string, any>): Promise<DevToArticle[]> {
  try {
    const response = await devtoAxios.get('/articles', { params });
    return response.data;
  } catch (error) {
    const serializedError = serializeError(error);
    // Log the error without using console.error directly
    if (process.env.NODE_ENV === 'development') {
      // Use a more basic logging approach that won't cause serialization issues
      console.log('Error fetching articles:', serializedError.message);
    }
    return [];
  }
}

export async function fetchLatestArticles(): Promise<DevToArticle[]> {
  try {
    const articles: DevToArticle[] = [];
    const pages = 5;
    const perPage = 10;

    for (let i = 1; i <= pages; i++) {
      const pageArticles = await fetchArticlesPage({
        per_page: perPage,
        page: i,
        state: 'rising',
        sort_by: 'published_at',
        sort_direction: 'desc'
      });
      articles.push(...pageArticles);
      
      // Break early if we didn't get a full page
      if (pageArticles.length < perPage) break;
    }

    return articles;
  } catch (error) {
    const serializedError = serializeError(error);
    if (process.env.NODE_ENV === 'development') {
      console.log('Error fetching latest articles:', serializedError.message);
    }
    return [];
  }
}

export async function fetchTrendingArticles(): Promise<DevToArticle[]> {
  try {
    const articles: DevToArticle[] = [];
    const pages = 5;
    const perPage = 10;

    for (let i = 1; i <= pages; i++) {
      const pageArticles = await fetchArticlesPage({
        per_page: perPage,
        page: i,
        state: 'fresh',
        top: 1
      });
      articles.push(...pageArticles);
      
      // Break early if we didn't get a full page
      if (pageArticles.length < perPage) break;
    }

    return articles;
  } catch (error) {
    const serializedError = serializeError(error);
    if (process.env.NODE_ENV === 'development') {
      console.log('Error fetching trending articles:', serializedError.message);
    }
    return [];
  }
}