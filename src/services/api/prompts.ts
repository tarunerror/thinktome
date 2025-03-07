import type { AcademicSource } from '../../types';
import { getResearchTemplate } from '../../utils/researchTemplates';

export const generateSectionPrompt = (topic: string, section: string, context: string, sources: AcademicSource[]): string => {
  const template = getResearchTemplate(topic);
  const sourceContext = sources
    .map(s => `${s.title} (${s.source}, ${s.year}): ${s.abstract}`)
    .join('\n\n');

  const basePrompt = `Write the ${section} section for a ${template.type} research paper on "${topic}". Follow the standard structure for ${template.type} research papers.`;

  const prompts: Record<string, string> = {
    abstract: `Write a comprehensive academic abstract for a ${template.type} research paper on "${topic}". Include the main objectives, methodology, key findings, and implications. Use this context and academic sources:\n\n${context}\n\n${sourceContext}`,
    
    introduction: `Write the introduction section for a ${template.type} research paper on "${topic}". ${
      template.type === 'experimental' ? 'Include clear problem statement and research objectives.' :
      template.type === 'qualitative' ? 'Include research questions and theoretical background.' :
      template.type === 'review' ? 'Include scope of review and research questions.' :
      'Provide background and context for the research.'
    }\n\nUse these sources:\n\n${sourceContext}`,
    
    'research-background': `Write the research background section for a ${template.type} research paper on "${topic}". Include historical context, current state of research, and significance of the study. Use these sources:\n\n${sourceContext}`,
    
    'problem-statement': `Write a clear problem statement for a ${template.type} research paper on "${topic}". Identify the specific research problem and its significance. Use this context:\n\n${context}`,
    
    'research-objectives': `Write the research objectives section for a ${template.type} research paper on "${topic}". List specific, measurable, and achievable objectives. Use this context:\n\n${context}`,
    
    'theoretical-framework': `Develop the theoretical framework section for a ${template.type} research paper on "${topic}". Explain the theories and concepts underlying the research. Use these sources:\n\n${sourceContext}`,
    
    methodology: `Write the methodology section for a ${template.type} research paper on "${topic}". ${
      template.type === 'experimental' ? 'Detail the experimental design, materials, and procedures.' :
      template.type === 'qualitative' ? 'Describe participant selection, data collection, and analysis methods.' :
      template.type === 'review' ? 'Explain the literature search and selection criteria.' :
      'Describe the research methods and data collection process.'
    }\n\nUse this context: ${context}`,
    
    'research-design': `Explain the research design for a ${template.type} study on "${topic}". Include justification for the chosen design and methodology. Use this context:\n\n${context}`,
    
    'materials-equipment': `Detail the materials and equipment used in the ${template.type} research on "${topic}". Include specifications and justification for each item. Use this context:\n\n${context}`,
    
    procedures: `Describe the step-by-step procedures used in the ${template.type} research on "${topic}". Ensure reproducibility of the methods. Use this context:\n\n${context}`,
    
    results: `Present the results of the ${template.type} research on "${topic}". Include relevant data, statistics, and findings. Use this context:\n\n${context}`,
    
    'data-analysis': `Explain the data analysis methods and results for the ${template.type} research on "${topic}". Include statistical tests and significance. Use this context:\n\n${context}`,
    
    discussion: `Write the discussion section for the ${template.type} research on "${topic}". Interpret results, compare with literature, and discuss implications. Use these sources:\n\n${sourceContext}`,
    
    conclusion: `Write a comprehensive conclusion section for the ${template.type} research paper on "${topic}". Include:
1. Summary of key findings and their significance
2. Answers to research questions/objectives
3. Implications for theory and practice
4. Limitations of the study
5. Recommendations for future research

Base your conclusion on this context and these sources:\n\n${context}\n\n${sourceContext}`,
    
    'future-directions': `Suggest future research directions based on the ${template.type} study of "${topic}". Identify gaps and opportunities for further research. Use this context:\n\n${context}`,
    
    acknowledgments: `Write appropriate acknowledgments for the ${template.type} research paper on "${topic}". Include relevant contributors and funding sources.`,
    
    references: `Compile a comprehensive reference list for the ${template.type} research paper on "${topic}". Include all cited sources and key literature. Use these sources:\n\n${sourceContext}`,
    
    appendices: `Prepare appendices for the ${template.type} research paper on "${topic}". Include supplementary materials, data tables, and additional information.`
  };

  return prompts[section] || `${basePrompt}\n\nUse these sources:\n\n${sourceContext}`;
};