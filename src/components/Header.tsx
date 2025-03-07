import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Bug, LogOut, User } from 'lucide-react';
import { Logo } from './Logo';
import { useAuthStore } from '../store/authStore';

interface HeaderProps {
  onAboutClick: () => void;
  onHomeClick?: () => void;
}

export function Header({ onAboutClick, onHomeClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profilePhotoUrl = user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || 'User')}&background=0D9488&color=fff`;

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
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src={profilePhotoUrl}
                  alt={user?.email || 'User profile'}
                  className="h-8 w-8 rounded-full border-2 border-transparent hover:border-primary-500 transition-colors"
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-600">
                    <p className="text-sm text-white font-medium truncate">
                      {user?.displayName || user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-600 flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
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
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-2">
                  <img
                    src={profilePhotoUrl}
                    alt={user?.email || 'User profile'}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-gray-300">{user?.displayName || user?.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}