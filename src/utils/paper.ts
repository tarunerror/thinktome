export function parsePaperSections(content: string) {
  const sections: Record<string, string> = {};
  let currentSection = '';
  let currentContent: string[] = [];

  content.split('\n').forEach(line => {
    // Match section titles (lines starting with #)
    const sectionMatch = line.match(/^#\s+(.+)$/);
    
    if (sectionMatch) {
      // Save previous section if it exists
      if (currentSection) {
        const sectionKey = currentSection.toLowerCase().replace(/\s+/g, '-');
        sections[sectionKey] = currentContent.join('\n').trim();
      }
      currentSection = sectionMatch[1].trim();
      currentContent = [];
    } else {
      // Only add non-empty lines to avoid extra whitespace
      if (line.trim()) {
        currentContent.push(line);
      }
    }
  });

  // Save the last section
  if (currentSection) {
    const sectionKey = currentSection.toLowerCase().replace(/\s+/g, '-');
    sections[sectionKey] = currentContent.join('\n').trim();
  }

  // Ensure all sections exist with at least empty content
  const requiredSections = [
    'abstract',
    'introduction',
    'methodology',
    'results',
    'discussion',
    'conclusion',
    'references'
  ];

  requiredSections.forEach(section => {
    if (!sections[section]) {
      sections[section] = '';
    }
  });

  return sections;
}