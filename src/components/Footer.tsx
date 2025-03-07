import React from 'react';
import { Github, Mail, Heart, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

export function Footer({ onPrivacyClick, onTermsClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800/50 border-t border-gray-700 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-semibold text-white">ThinkTome</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering researchers and students with AI-driven research paper generation, making academic writing more accessible and efficient.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://github.com/tarunerror/thinktome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <Github className="h-4 w-4 mr-2" />
                  <span>GitHub Repository</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="mailto:its.tarun01@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  <span>Contact Us</span>
                  <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support the Project</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-400">
                If you find ThinkTome helpful, consider supporting the project to help keep it running and improving.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/sponsors/tarunerror"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
                >
                  <Heart className="h-4 w-4 mr-2 text-red-400" />
                  <span>Sponsor</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} ThinkTome. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={onPrivacyClick}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={onTermsClick}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}