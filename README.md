# ThinkTome - AI-Powered Research Paper Generator

ThinkTome is a sophisticated web application that leverages artificial intelligence to generate comprehensive research papers. Built with modern web technologies and best practices, it offers an intuitive interface for researchers, students, and academics to streamline their research paper writing process.

## Core Features

- **AI-Powered Paper Generation**: Utilizes Mistral AI for generating research papers with proper academic structure
- **Real-time Research Progress**: Visual feedback on research progress with estimated completion time
- **Interactive Paper Viewer**: Section-based navigation with a dynamic table of contents
- **Source Management**: Integration with multiple academic sources including arXiv, PubMed, and Semantic Scholar
- **Library System**: Save and manage generated research papers
- **Discovery Feed**: Stay updated with latest research articles and trends

## Technology Stack

- **Frontend Framework**: React 18.3 with TypeScript
- **Styling**: Tailwind CSS with custom configuration
- **3D Graphics**: Three.js with React Three Fiber
- **AI Integration**: Mistral AI API
- **Build Tool**: Vite
- **State Management**: React Hooks with Custom Hooks
- **API Integration**: Axios with retry mechanism
- **Email Integration**: EmailJS for contact form

## Project Structure

```
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── services/          # API and service integrations
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── App.tsx            # Main application component
```

### Key Components

- `AboutUs`: Company information and team details
- `PaperView`: Research paper display with navigation
- `ResearchProgress`: Visual progress tracking
- `TableOfContents`: Paper section navigation
- `TopicCard`: Research topic display cards
- `ThreeScene`: 3D background animations

### Services

- `api/paper.ts`: Research paper generation logic
- `api/sources.ts`: Academic source fetching
- `api/wiki.ts`: Wikipedia data integration
- `api/devto.ts`: Dev.to article integration

### Custom Hooks

- `usePaperGeneration`: Manages paper generation state
- `useResearchProgress`: Tracks research progress
- `useLocalStorage`: Local storage management

## Features in Detail

### Paper Generation Process

1. **Topic Selection**
   - Choose from suggested topics or enter custom research subject
   - Initial context gathering from Wikipedia and academic sources

2. **Research Phase**
   - Parallel fetching from multiple academic sources
   - Real-time progress tracking with estimated completion time
   - Source validation and processing

3. **Paper Structure**
   - Abstract
   - Introduction (Background, Literature Review, Objectives)
   - Methodology (Data Collection, Analysis Methods)
   - Results and Discussion
   - Conclusion
   - References

### User Interface

- **Responsive Design**: Fully responsive layout for all screen sizes
- **Dark Theme**: Eye-friendly dark mode with professional color scheme
- **Interactive Elements**: Smooth animations and transitions
- **Progress Feedback**: Visual indicators for all operations
- **Error Handling**: Comprehensive error messages and recovery

### Data Management

- **Session Storage**: Save generated papers locally
- **Source Tracking**: Monitor and display source processing status
- **State Management**: Centralized state handling with React hooks

## Development Setup

1. **Environment Setup**
   ```bash
   # Clone the repository
   git clone https://github.com/tarunerror/thinktome.git
   cd thinktome

   # Install dependencies
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file with:
   ```
   VITE_MISTRAL_API_KEY=your_mistral_api_key
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   ```

3. **Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Connect with the Developer

- GitHub: [tarunerror](https://github.com/tarunerror)
- Instagram: [@tan.error](https://instagram.com/tan.error)

---

Made with ❤️ by [Tarun Gautam](https://github.com/tarunerror)