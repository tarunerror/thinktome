import axios from 'axios';

export const serializeError = (error: unknown): { message: string; type: string } => {
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