export interface Topic {
  title: string;
  description: string;
  category: 'technology' | 'science' | 'medicine' | 'environment' | 'social';
}

export const researchTopics: Topic[] = [
  {
    title: 'Quantum Computing in Cryptography',
    description: 'Exploring the implications of quantum computing on modern cryptographic systems and the development of quantum-resistant encryption methods.',
    category: 'technology'
  },
  {
    title: 'Neural Networks in Climate Modeling',
    description: 'Application of deep learning and neural networks in improving climate change predictions and weather forecasting accuracy.',
    category: 'environment'
  },
  {
    title: 'CRISPR Gene Editing Ethics',
    description: 'Examining the ethical implications and potential consequences of CRISPR gene editing technology in human embryos.',
    category: 'science'
  },
  {
    title: 'Microplastics in Marine Ecosystems',
    description: 'Investigating the impact of microplastics on marine life and potential solutions for reducing plastic pollution in oceans.',
    category: 'environment'
  },
  {
    title: 'Social Media and Mental Health',
    description: 'Analyzing the psychological effects of social media usage on mental health and well-being across different age groups.',
    category: 'social'
  },
  {
    title: 'Renewable Energy Storage Solutions',
    description: 'Investigating innovative approaches to energy storage for renewable sources, focusing on efficiency and sustainability.',
    category: 'technology'
  },
  {
    title: 'Artificial Intelligence in Healthcare Diagnostics',
    description: 'Exploring the application of AI algorithms in medical diagnosis and their impact on healthcare delivery.',
    category: 'medicine'
  },
  {
    title: 'Space Debris Management',
    description: 'Analyzing current and proposed solutions for managing orbital debris and ensuring sustainable space exploration.',
    category: 'science'
  },
  {
    title: 'Blockchain in Supply Chain Management',
    description: 'Examining the potential of blockchain technology to revolutionize supply chain transparency and efficiency.',
    category: 'technology'
  },
  {
    title: 'Gut Microbiome and Mental Health',
    description: 'Investigating the connection between gut bacteria and psychological well-being, including anxiety and depression.',
    category: 'medicine'
  },
  {
    title: 'Dark Matter Detection Methods',
    description: 'Evaluating current technologies and theoretical approaches for detecting and measuring dark matter in the universe.',
    category: 'science'
  },
  {
    title: 'Urban Vertical Farming Technologies',
    description: 'Analyzing innovative solutions for sustainable urban agriculture through vertical farming systems.',
    category: 'environment'
  },
  {
    title: 'Quantum Internet Infrastructure',
    description: 'Exploring the development of quantum internet technology and its potential impact on global communications.',
    category: 'technology'
  },
  {
    title: 'Neurodegenerative Disease Prevention',
    description: 'Investigating preventive measures and early intervention strategies for neurodegenerative diseases.',
    category: 'medicine'
  },
  {
    title: 'Digital Privacy in Smart Cities',
    description: 'Examining privacy concerns and solutions in the implementation of smart city technologies.',
    category: 'social'
  },
  {
    title: 'Fusion Energy Breakthroughs',
    description: 'Analyzing recent advances in fusion energy research and their potential for clean energy production.',
    category: 'science'
  },
  {
    title: 'Ocean Acidification Solutions',
    description: 'Investigating methods to combat and reverse ocean acidification caused by climate change.',
    category: 'environment'
  },
  {
    title: 'Brain-Computer Interface Ethics',
    description: 'Examining ethical considerations in the development and implementation of brain-computer interface technologies.',
    category: 'technology'
  },
  {
    title: 'Personalized Cancer Immunotherapy',
    description: 'Exploring advances in personalized cancer treatment through immunotherapy approaches.',
    category: 'medicine'
  },
  {
    title: 'Digital Currency Impact on Economy',
    description: 'Analyzing the effects of digital currencies on traditional financial systems and global economics.',
    category: 'social'
  },
  {
    title: 'Quantum Sensor Applications',
    description: 'Investigating the use of quantum sensors in various fields including medicine and navigation.',
    category: 'technology'
  },
  {
    title: 'Biodegradable Electronics',
    description: 'Exploring the development of environmentally friendly electronic components and devices.',
    category: 'environment'
  },
  {
    title: 'Artificial Organ Development',
    description: 'Examining progress in bioengineering artificial organs for transplantation.',
    category: 'medicine'
  },
  {
    title: 'Space Tourism Safety Standards',
    description: 'Analyzing safety protocols and regulations for commercial space travel.',
    category: 'science'
  },
  {
    title: 'Digital Identity Protection',
    description: 'Investigating methods for securing digital identities in an increasingly connected world.',
    category: 'social'
  },
  {
    title: 'Sustainable Aviation Fuels',
    description: 'Exploring alternative fuel sources for aviation to reduce environmental impact.',
    category: 'environment'
  },
  {
    title: 'Quantum Machine Learning',
    description: 'Analyzing the integration of quantum computing principles with machine learning algorithms.',
    category: 'technology'
  },
  {
    title: 'Regenerative Medicine Advances',
    description: 'Examining breakthrough technologies in tissue regeneration and stem cell therapy.',
    category: 'medicine'
  },
  {
    title: 'Deep Ocean Mining Impact',
    description: 'Investigating environmental consequences of deep-sea mining operations.',
    category: 'environment'
  },
  {
    title: 'Artificial General Intelligence Ethics',
    description: 'Exploring ethical frameworks for the development of general artificial intelligence.',
    category: 'technology'
  },
  {
    title: 'Pandemic Early Warning Systems',
    description: 'Analyzing technologies for early detection and prevention of global disease outbreaks.',
    category: 'medicine'
  },
  {
    title: 'Digital Democracy Technologies',
    description: 'Examining the role of technology in modern democratic processes and voting systems.',
    category: 'social'
  },
  {
    title: 'Asteroid Mining Feasibility',
    description: 'Evaluating the technical and economic viability of mining asteroids for resources.',
    category: 'science'
  },
  {
    title: 'Smart Grid Cybersecurity',
    description: 'Investigating security measures for protecting smart energy grid infrastructure.',
    category: 'technology'
  },
  {
    title: 'Coral Reef Restoration Methods',
    description: 'Analyzing techniques for rehabilitating damaged coral reef ecosystems.',
    category: 'environment'
  },
  {
    title: 'Longevity Research Ethics',
    description: 'Examining ethical implications of life extension and anti-aging research.',
    category: 'medicine'
  },
  {
    title: 'Digital Addiction Treatment',
    description: 'Exploring therapeutic approaches for addressing technology addiction.',
    category: 'social'
  },
  {
    title: 'Quantum Error Correction',
    description: 'Analyzing methods for reducing errors in quantum computing systems.',
    category: 'technology'
  },
  {
    title: 'Sustainable Urban Planning',
    description: 'Investigating innovative approaches to creating environmentally conscious cities.',
    category: 'environment'
  },
  {
    title: 'Gene Therapy Safety',
    description: 'Examining safety protocols and risk assessment in gene therapy treatments.',
    category: 'medicine'
  },
  {
    title: 'Mars Colonization Challenges',
    description: 'Analyzing technical and biological challenges in establishing Mars colonies.',
    category: 'science'
  },
  {
    title: 'Digital Labor Rights',
    description: 'Investigating worker rights and protections in the digital gig economy.',
    category: 'social'
  },
  {
    title: 'Quantum Cryptography Standards',
    description: 'Examining the development of standardization for quantum cryptographic systems.',
    category: 'technology'
  },
  {
    title: 'Sustainable Water Management',
    description: 'Exploring innovative solutions for water conservation and management.',
    category: 'environment'
  },
  {
    title: 'Precision Medicine Applications',
    description: 'Analyzing the implementation of personalized medicine approaches in healthcare.',
    category: 'medicine'
  },
  {
    title: 'Space-Based Solar Power',
    description: 'Investigating the feasibility of collecting solar energy in space for Earth use.',
    category: 'science'
  },
  {
    title: 'Digital Education Equity',
    description: 'Examining solutions for reducing the digital divide in education.',
    category: 'social'
  },
  {
    title: 'Quantum Computing Applications',
    description: 'Exploring practical applications of quantum computing in various industries.',
    category: 'technology'
  },
  {
    title: 'Carbon Capture Technologies',
    description: 'Analyzing methods for capturing and storing atmospheric carbon dioxide.',
    category: 'environment'
  },
  {
    title: 'Bioelectric Medicine',
    description: 'Investigating the use of electrical stimulation in medical treatments.',
    category: 'medicine'
  },
  {
    title: 'Exoplanet Habitability Assessment',
    description: 'Examining methods for determining the potential habitability of exoplanets.',
    category: 'science'
  },
  {
    title: 'Digital Heritage Preservation',
    description: 'Exploring techniques for preserving cultural heritage through digital means.',
    category: 'social'
  },
  {
    title: 'Neural Interface Security',
    description: 'Analyzing security measures for brain-computer interface technologies.',
    category: 'technology'
  },
  {
    title: 'Wildlife Conservation Technology',
    description: 'Investigating technological solutions for wildlife protection and conservation.',
    category: 'environment'
  }
];