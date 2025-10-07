# Contributing to ThinkTome

Thank you for your interest in contributing to ThinkTome! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. We expect all contributors to:

- Be respectful and inclusive
- Use welcoming and inclusive language
- Be collaborative and constructive
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in the [Issues](https://github.com/tarunerror/thinktome/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - System information

### Suggesting Enhancements

1. Open a new issue labeled as 'enhancement'
2. Provide:
   - Clear description of the feature
   - Rationale for the enhancement
   - Implementation suggestions if any
   - Mock-ups or examples if applicable

### Pull Requests

1. Fork the repository
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following our coding standards
4. Commit your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```
5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a Pull Request

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/thinktome.git
   cd thinktome
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with required environment variables:
   ```
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

## Coding Standards

### General Guidelines

- Use TypeScript for all new code
- Follow existing code style and formatting
- Write self-documenting code with clear variable/function names
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful commit messages following conventional commits

### TypeScript Guidelines

- Use strict type checking
- Avoid `any` type
- Define interfaces for data structures
- Use type inference when obvious
- Document complex types

### React Guidelines

- Use functional components
- Implement proper error boundaries
- Follow React hooks best practices
- Keep components focused and reusable
- Use proper prop typing
- Implement proper loading states
- Handle edge cases and errors

### CSS/Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Maintain consistent spacing
- Use semantic class names
- Follow color scheme defined in tailwind.config.js

### Testing

- Write unit tests for utilities
- Add component tests for complex components
- Test error cases
- Maintain good test coverage

## Review Process

1. All PRs require review before merging
2. Address review comments promptly
3. Keep PRs focused and reasonable in size
4. Update tests and documentation
5. Ensure CI passes

## Documentation

- Update README.md for significant changes
- Document new features
- Update API documentation
- Add JSDoc comments for functions
- Include examples where helpful

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for contributing to ThinkTome!