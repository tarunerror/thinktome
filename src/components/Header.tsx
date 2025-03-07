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
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={onHomeClick}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Logo />
            <span className="text-2xl font-semibold text-white">ThinkTome</span>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
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
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  onAboutClick();
                  setIsMenuOpen(false);
                }}
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
              <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors w-full">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}