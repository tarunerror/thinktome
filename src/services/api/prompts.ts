import type { AcademicSource } from '../../types';

export const generateSectionPrompt = (topic: string, section: string, context: string, sources: AcademicSource[]): string => {
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