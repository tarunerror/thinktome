import { useState, useRef, useEffect } from 'react';
import { Menu, X, Bug, LogOut } from 'lucide-react';
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
    <header className="glass-stronger border-b border-gray-700/50 sticky top-0 z-50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-18 px-4 sm:px-6">
          {/* Logo Section */}
          <button 
            onClick={onHomeClick}
            className="flex items-center space-x-3 hover:opacity-90 smooth-transition group"
          >
            <div className="relative">
              <Logo className="h-7 w-7 sm:h-8 sm:w-8 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary-500/30 blur-lg opacity-0 group-hover:opacity-100 smooth-transition" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl sm:text-2xl font-bold gradient-text">ThinkTome</span>
              <span className="text-xs text-gray-400 -mt-1 hidden sm:block">AI Research Assistant</span>
            </div>
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={onAboutClick}
              className="text-gray-300 hover:text-white smooth-transition font-medium px-4 py-2 rounded-lg hover:bg-gray-700/50"
            >
              About Us
            </button>
            <a 
              href="https://github.com/tarunerror/thinktome/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white smooth-transition flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-700/50 group"
            >
              <Bug className="h-5 w-5 group-hover:scale-110 smooth-transition" />
              <span className="font-medium">Report Bug</span>
            </a>
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center space-x-3 focus:outline-none group"
              >
                <div className="relative">
                  <img
                    src={profilePhotoUrl}
                    alt={user?.email || 'User profile'}
                    className="h-10 w-10 rounded-full border-2 border-gray-600 group-hover:border-primary-500 smooth-transition object-cover"
                  />
                  <div className="absolute inset-0 rounded-full bg-primary-500/20 opacity-0 group-hover:opacity-100 smooth-transition" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-white truncate max-w-[150px]">
                    {user?.displayName || 'User'}
                  </p>
                  <p className="text-xs text-gray-400 truncate max-w-[150px]">
                    {user?.email}
                  </p>
                </div>
              </button>

              {/* Enhanced Profile Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 glass-stronger rounded-xl shadow-2xl py-2 z-50 border border-gray-600/50 scale-in">
                  <div className="px-4 py-3 border-b border-gray-600/50">
                    <p className="text-sm text-white font-semibold truncate">
                      {user?.displayName || user?.email}
                    </p>
                    <p className="text-xs text-gray-400 truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gray-600/50 flex items-center space-x-3 smooth-transition group"
                  >
                    <LogOut className="h-4 w-4 group-hover:scale-110 smooth-transition" />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg hover:bg-gray-700/50 smooth-transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden px-4 py-4 border-t border-gray-700/50 glass-stronger slide-in-left">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => {
                  onAboutClick();
                  setIsMenuOpen(false);
                }}
                className="text-gray-300 hover:text-white smooth-transition text-left py-2.5 px-3 rounded-lg hover:bg-gray-700/50 font-medium"
              >
                About Us
              </button>
              <a 
                href="https://github.com/tarunerror/thinktome/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white smooth-transition flex items-center space-x-2 py-2.5 px-3 rounded-lg hover:bg-gray-700/50 font-medium"
              >
                <Bug className="h-5 w-5" />
                <span>Report Bug</span>
              </a>
              <div className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-gray-700/30 mt-2">
                <div className="flex items-center space-x-3">
                  <img
                    src={profilePhotoUrl}
                    alt={user?.email || 'User profile'}
                    className="h-10 w-10 rounded-full border-2 border-gray-600 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white truncate max-w-[180px]">
                      {user?.displayName || 'User'}
                    </p>
                    <p className="text-xs text-gray-400 truncate max-w-[180px]">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white smooth-transition p-2 rounded-lg hover:bg-gray-600/50"
                  title="Sign Out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}