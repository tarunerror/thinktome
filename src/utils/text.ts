export const sanitizeText = (text: string | null | undefined): string => {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};