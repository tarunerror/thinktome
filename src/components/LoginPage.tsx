import React, { useState } from 'react';
import { Github, Mail, Lock, Sparkles, Brain, FileText, Globe, ToggleLeft as Google, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Logo } from './Logo';
import { ThreeScene } from './ThreeScene';

export function LoginPage() {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle, signInWithGithub, resetPassword, error, clearError } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (isResetPassword) {
      await resetPassword(email);
      setIsResetPassword(false);
      return;
    }

    if (isSignUp) {
      await signUpWithEmail(email, password);
    } else {
      await signInWithEmail(email, password);
    }
  };

  const features = [
    {
      icon: <Brain className="h-5 w-5" />,
      title: "AI-Powered Research",
      description: "Generate comprehensive papers with advanced AI"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Global Sources",
      description: "Access worldwide academic databases"
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Smart Templates",
      description: "Professional research paper formats"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Panel - Login */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        
        <div className="relative max-w-md w-full mx-auto space-y-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3">
              <Logo className="h-12 w-12" />
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400">
                ThinkTome
              </h1>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-white">
              {isResetPassword ? 'Reset Password' : isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              {isResetPassword 
                ? 'Enter your email to receive reset instructions'
                : 'Sign in to access AI-powered research paper generation'}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5 mr-3" />
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Email address"
              />
            </div>

            {!isResetPassword && (
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Password"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 rounded-xl text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              <Mail className="h-5 w-5 mr-2" />
              {isResetPassword ? 'Send Reset Link' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>

            {!isResetPassword && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => signInWithGoogle()}
                    className="flex items-center justify-center px-4 py-3 rounded-xl text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <Google className="h-5 w-5 mr-2" />
                    Google
                  </button>

                  <button
                    type="button"
                    onClick={() => signInWithGithub()}
                    className="flex items-center justify-center px-4 py-3 rounded-xl text-white bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 transition-all"
                  >
                    <Github className="h-5 w-5 mr-2" />
                    GitHub
                  </button>
                </div>
              </>
            )}

            <div className="flex flex-col items-center space-y-2 text-sm">
              {!isResetPassword && (
                <button
                  type="button"
                  onClick={() => setIsResetPassword(true)}
                  className="text-primary-400 hover:text-primary-300"
                >
                  Forgot your password?
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setIsResetPassword(false);
                  clearError();
                }}
                className="text-gray-400 hover:text-white"
              >
                {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>

              {isResetPassword && (
                <button
                  type="button"
                  onClick={() => setIsResetPassword(false)}
                  className="text-gray-400 hover:text-white"
                >
                  Back to sign in
                </button>
              )}
            </div>
          </form>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              By signing in, you agree to our{' '}
              <a href="#" className="text-primary-400 hover:text-primary-300">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary-400 hover:text-primary-300">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Features */}
      <div className="hidden lg:flex w-1/2 bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <ThreeScene />
        </div>
        
        <div className="relative w-full h-full flex items-center justify-center p-12">
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 max-w-lg">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 mb-6">
              <Sparkles className="h-5 w-5 text-primary-400 mr-2" />
              <span className="text-gray-300">AI-Powered Research Assistant</span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-8">
              Transform Your Research Process
            </h2>
            
            <div className="grid gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700"
                >
                  <div className="flex-shrink-0 p-2 bg-primary-500/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}