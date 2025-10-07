# ThinkTome | AI-Powered Research Paper Generator

ThinkTome is a sophisticated web application that revolutionizes academic research by leveraging artificial intelligence to generate comprehensive research papers. Built with modern web technologies and industry best practices, it offers an intuitive interface for researchers, students, and academics.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-badge/deploy-status)](https://app.netlify.com/sites/thinktome/deploys)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[View Live Demo](https://thinktome.netlify.app) | [Report Bug](https://github.com/tarunerror/thinktome/issues) | [Request Feature](https://github.com/tarunerror/thinktome/issues)

## Core Features

### Advanced AI Integration
- Powered by Mistral AI for intelligent paper generation
- Smart template selection based on research type
- Automatic source verification and citation
- Real-time progress tracking

### Academic Integration
- Multi-source research aggregation:
  - arXiv
  - PubMed
  - Semantic Scholar
  - IEEE Xplore
  - SpringerLink
- Automatic citation management
- GitHub repository integration for related research code

### User Experience
- Intuitive, responsive interface
- Dynamic table of contents
- Interactive 3D backgrounds
- Dark theme optimized for extended reading
- Multiple research paper templates

### Security & Authentication
- Firebase Authentication
- Protected routes
- Secure API access
- User data encryption

## Technology Stack

### Frontend
```typescript
{
  "framework": "React 18.3",
  "language": "TypeScript 5.5",
  "styling": "Tailwind CSS",
  "3D Graphics": "Three.js + React Three Fiber",
  "State Management": "Zustand",
  "Icons": "Lucide React",
  "Build Tool": "Vite"
}
```

### AI & Integration
```typescript
{
  "AI Engine": "Mistral AI",
  "Authentication": "Firebase",
  "Email Service": "Nodemailer",
  "API Handling": "Axios + Retry",
  "Data Parsing": "Fast XML Parser"
}
```

## Project Architecture

```
src/
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── layout/        # Layout components
│   └── paper/         # Paper generation components
├── hooks/             # Custom React hooks
├── services/          # API and service integrations
│   ├── api/          # API clients and handlers
│   └── firebase/     # Firebase configuration
├── store/            # Global state management
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/tarunerror/thinktome.git
   cd thinktome
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with required environment variables:
   ```env
   # Mistral AI API Key
   VITE_MISTRAL_API_KEY=your_mistral_api_key
   
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   
   # SMTP Configuration for Nodemailer (Server-side)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_specific_password
   SMTP_TO_EMAIL=its.tarun01@gmail.com
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Key Features in Detail

### Research Paper Generation
1. Topic Analysis
   - Intelligent research type detection
   - Template selection
   - Source identification

2. Source Integration
   - Parallel academic source fetching
   - Real-time progress tracking
   - Source validation

3. Paper Structure
   - Dynamic template selection
   - Customizable sections
   - Automatic reference management
   - Figure and table integration

### Performance Optimization
- Code splitting and lazy loading
- Image optimization
- Caching strategies
- Error boundary implementation

### SEO & Accessibility
- Server-side rendering ready
- Meta tag optimization
- Structured data implementation
- ARIA attributes
- Keyboard navigation

## Deployment

The application is deployed on Netlify with continuous deployment from the main branch:
- Automated build process
- Environment variable injection
- Identity service configuration
- Custom domain setup

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:
- Code of Conduct
- Development process
- Pull request procedure
- Coding standards

## Security

- All API keys must be stored in environment variables
- Authentication state is managed securely
- Data encryption in transit and at rest
- Regular security audits
- Protected API endpoints

## Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e
```

## Performance Metrics

- Lighthouse Score: 95+ across all categories
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Core Web Vitals compliance

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please:
- Open an issue on GitHub
- Contact via email: its.tarun01@gmail.com
- Visit our documentation

## Acknowledgments

- Mistral AI for providing the AI capabilities
- Academic sources for research data
- Open-source community for various tools and libraries

---

Created with dedication by [Tarun Gautam](https://github.com/tarunerror)

Copyright © 2025 ThinkTome. All rights reserved.
