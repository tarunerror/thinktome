import React, { useState } from 'react';
import { Menu, X, Bug } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onAboutClick: () => void;
  onHomeClick?: () => void;
}

export function Header({ onAboutClick, onHomeClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-14">
          <button 
            onClick={onHomeClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity pl-3 sm:pl-4"
          >
            <Logo className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="text-lg sm:text-xl font-semibold text-white">ThinkTome</span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 pr-4">
            <button 
              onClick={onAboutClick}
              className="text-gray-300 hover:text-white transition-colors"
            >
              About Us
            </button>
            <a 
              href="https://github.com/tarunerror/thinktome/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2"
            >
              <Bug className="h-5 w-5" />
              <span>Report Bug</span>
            </a>
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white pr-3 sm:pr-4"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden px-3 sm:px-4 py-3 border-t border-gray-700">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => {
                  onAboutClick();
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white transition-colors text-left py-1"
              >
                About Us
              </button>
              <a 
                href="https://github.com/tarunerror/thinktome/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors flex items-center space-x-2 py-1"
              >
                <Bug className="h-5 w-5" />
                <span>Report Bug</span>
              </a>
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors w-full text-left">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}