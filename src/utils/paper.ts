export function parsePaperSections(content: string) {
  const sections: Record<string, string> = {};
  let currentSection = '';
  let currentContent: string[] = [];

  content.split('\n').forEach(line => {
    const sectionMatch = line.match(/^(Abstract|Introduction|Background|Research Objectives|Literature Review|Methodology|Data Collection|Analysis Methods|Results and Discussion|Findings|Implications|Conclusion|Future Work|References)/i);
    
    if (sectionMatch) {
      if (currentSection) {
        sections[currentSection.toLowerCase().replace(/\s+/g, '-')] = currentContent.join('\n');
      }
      currentSection = sectionMatch[1];
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  });

  if (currentSection) {
    sections[currentSection.toLowerCase().replace(/\s+/g, '-')] = currentContent.join('\n');
  }

  return sections;
}