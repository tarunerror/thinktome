import { Github, Mail, Heart, ExternalLink, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

export function Footer({ onPrivacyClick, onTermsClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-stronger border-t border-gray-700/50 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Logo and Description */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <Logo className="h-10 w-10 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-primary-500/30 blur-lg opacity-0 group-hover:opacity-100 smooth-transition" />
              </div>
              <div>
                <span className="text-2xl font-bold gradient-text">ThinkTome</span>
                <div className="flex items-center gap-1 -mt-1">
                  <Sparkles className="h-3 w-3 text-primary-400" />
                  <span className="text-xs text-gray-400">AI Research Platform</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering researchers and students worldwide with cutting-edge AI-driven research paper generation, making academic writing more accessible, efficient, and innovative.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://github.com/tarunerror/thinktome"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 glass rounded-lg hover:glass-stronger smooth-transition group"
                title="GitHub"
              >
                <Github className="h-5 w-5 text-gray-400 group-hover:text-white smooth-transition" />
              </a>
              <a
                href="mailto:its.tarun01@gmail.com"
                className="p-2 glass rounded-lg hover:glass-stronger smooth-transition group"
                title="Email"
              >
                <Mail className="h-5 w-5 text-gray-400 group-hover:text-white smooth-transition" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://github.com/tarunerror/thinktome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white smooth-transition flex items-center group"
                >
                  <Github className="h-4 w-4 mr-2.5 group-hover:scale-110 smooth-transition" />
                  <span className="font-medium">GitHub Repository</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1.5 opacity-0 group-hover:opacity-100 smooth-transition" />
                </a>
              </li>
              <li>
                <a 
                  href="mailto:its.tarun01@gmail.com"
                  className="text-gray-400 hover:text-white smooth-transition flex items-center group"
                >
                  <Mail className="h-4 w-4 mr-2.5 group-hover:scale-110 smooth-transition" />
                  <span className="font-medium">Contact Us</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1.5 opacity-0 group-hover:opacity-100 smooth-transition" />
                </a>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
              Support
            </h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-400 leading-relaxed">
                If ThinkTome has been valuable to your research journey, consider supporting the project to help us continue innovation and improvement.
              </p>
              <a
                href="https://github.com/sponsors/tarunerror"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-5 py-2.5 btn-gradient-purple text-white rounded-xl text-sm font-semibold group"
              >
                <Heart className="h-4 w-4 mr-2 text-pink-300 group-hover:scale-125 smooth-transition" />
                <span>Sponsor Project</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700/50">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} <span className="font-semibold text-gray-300">ThinkTome</span>. Crafted with passion for knowledge.
            </p>
            <div className="flex items-center space-x-6">
              <button 
                onClick={onPrivacyClick}
                className="text-sm text-gray-400 hover:text-white smooth-transition font-medium"
              >
                Privacy Policy
              </button>
              <div className="h-4 w-px bg-gray-700" />
              <button
                onClick={onTermsClick}
                className="text-sm text-gray-400 hover:text-white smooth-transition font-medium"
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