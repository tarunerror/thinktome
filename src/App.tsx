import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AboutUs } from './components/AboutUs';
import { HomePage } from './components/HomePage';
import { PaperView } from './components/PaperView';
import { DiscoverPage } from './components/DiscoverPage';
import { LibraryPage } from './components/LibraryPage';
import { ContactPage } from './components/ContactPage';
import { ResearchProgress } from './components/ResearchProgress';
import { Footer } from './components/Footer';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { AuthGuard } from './components/AuthGuard';
import { usePaperGeneration } from './hooks/usePaperGeneration';
import { useResearchProgress } from './hooks/useResearchProgress';
import { useLocalStorage } from './hooks/useLocalStorage';
import { fetchLatestArticles, fetchTrendingArticles } from './services/api/devto';
import type { Topic, SavedSession } from './types';
import type { DevToArticle } from './services/api/devto';
import { generateResearchTopics } from './services/api/topics';
import { parsePaperSections } from './utils/paper';
import { researchTopics } from './topics';

function PaperViewWrapper() {
  const { paperId } = useParams<{ paperId: string }>();
  const [savedSessions] = useLocalStorage<SavedSession[]>('research_sessions', []);
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string | null>('abstract');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['introduction']));
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<SavedSession | null>(null);

  useEffect(() => {
    // Try to find the session
    const foundSession = savedSessions.find(s => s.id === paperId);
    
    if (foundSession) {
      setSession(foundSession);
      setIsLoading(false);
    } else {
      // Wait a bit for the session to be saved (handles race condition)
      const timer = setTimeout(() => {
        const retrySession = savedSessions.find(s => s.id === paperId);
        if (retrySession) {
          setSession(retrySession);
        } else {
          // Check if it's the most recent session (fallback for timing issues)
          if (savedSessions.length > 0) {
            const mostRecent = savedSessions[savedSessions.length - 1];
            if (mostRecent && Date.now() - mostRecent.createdAt < 3000) {
              setSession(mostRecent);
            }
          }
        }
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [paperId, savedSessions]);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          <p className="text-gray-400">Loading paper...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Paper Not Found</h1>
        <p className="text-gray-400 mb-6">The research paper you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Go to Home
        </button>
      </div>
    );
  }

  const sections = session.sections || parsePaperSections(session.content);

  return (
    <PaperView
      topic={session.topic}
      tableOfContents={session.tableOfContents || []}
      selectedSection={selectedSection}
      expandedSections={expandedSections}
      paperSections={sections}
      onBack={() => navigate('/')}
      onSectionSelect={setSelectedSection}
      onSectionToggle={toggleSection}
    />
  );
}

function MainContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [displayedTopics, setDisplayedTopics] = useState<Topic[]>([]);
  const [savedSessions, setSavedSessions] = useLocalStorage<SavedSession[]>('research_sessions', []);
  const [latestArticles, setLatestArticles] = useState<DevToArticle[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<DevToArticle[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Track which papers we've already saved to prevent duplicates
  const savedPapersRef = useRef<Set<string>>(new Set());

  const {
    topic,
    setTopic,
    loading,
    error,
    paper,
    sources,
    tableOfContents,
    paperSections,
    handleSubmit,
    resetState
  } = usePaperGeneration();

  const researchProgress = useResearchProgress(loading, sources);

  // Determine active view from location
  const getActiveView = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/discover') return 'discover';
    if (location.pathname === '/library') return 'library';
    if (location.pathname.startsWith('/paper/')) return 'paper';
    return 'home';
  };

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topics = await generateResearchTopics();
        setDisplayedTopics(topics);
      } catch (error) {
        console.error('Error fetching topics:', error);
        const shuffled = [...researchTopics].sort(() => Math.random() - 0.5);
        setDisplayedTopics(shuffled.slice(0, 3));
      }
    };
    
    fetchTopics();
    const interval = setInterval(fetchTopics, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (location.pathname === '/discover') {
      const loadArticles = async () => {
        setIsLoadingArticles(true);
        try {
          const [latest, trending] = await Promise.all([
            fetchLatestArticles(),
            fetchTrendingArticles()
          ]);
          setLatestArticles(latest);
          setTrendingArticles(trending);
        } catch (error) {
          console.error('Error loading articles:', error);
        } finally {
          setIsLoadingArticles(false);
        }
      };
      loadArticles();
    }
  }, [location.pathname]);

  const handleTopicClick = async (selectedTopic: Topic) => {
    setTopic(selectedTopic.title);
    await handleSubmit(null, selectedTopic.title);
  };

  const handleSessionSelect = (session: SavedSession) => {
    navigate(`/paper/${session.id}`);
  };

  useEffect(() => {
    if (paper && topic && tableOfContents.length > 0) {
      // Create a unique key for this paper
      const paperKey = `${topic}:${paper.substring(0, 100)}`;
      
      // Check if we've already saved this paper
      if (savedPapersRef.current.has(paperKey)) {
        return; // Already saved, don't create a duplicate
      }
      
      // Mark this paper as saved
      savedPapersRef.current.add(paperKey);
      
      const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
      const newSession: SavedSession = {
        id: sessionId,
        topic,
        content: paper,
        createdAt: Date.now(),
        tableOfContents,
        sections: paperSections
      };
      
      // Save the session
      setSavedSessions(prev => [...prev, newSession]);
      
      // Navigate after a slight delay to ensure localStorage is updated
      const timer = setTimeout(() => {
        navigate(`/paper/${sessionId}`);
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [paper, topic, tableOfContents, paperSections, navigate, setSavedSessions]);

  const handleNewSession = () => {
    // Clear the saved papers tracking when starting a new session
    savedPapersRef.current.clear();
    resetState();
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header 
          onAboutClick={() => navigate('/about')}
          onHomeClick={handleBackToHome}
        />
        <div className="flex flex-1 overflow-y-auto">
          <Sidebar
            onNewSession={handleNewSession}
            onViewChange={(view) => {
              if (view === 'discover') navigate('/discover');
              else if (view === 'library') navigate('/library');
              else if (view === 'home') navigate('/');
            }}
            activeView={getActiveView()}
            isLoading={loading}
            isCollapsed={isSidebarCollapsed}
            onCollapsedChange={setIsSidebarCollapsed}
          />
          <main className={`flex-1 transition-all duration-300 ${
            isSidebarCollapsed 
              ? 'ml-12 sm:ml-14 md:ml-16' 
              : 'ml-16 sm:ml-20 md:ml-64'
          }`}>
            {loading ? (
              <ResearchProgress
                sources={sources}
                progress={researchProgress}
              />
            ) : (
              <Routes>
                <Route path="/" element={
                  <HomePage
                    topic={topic}
                    setTopic={setTopic}
                    loading={loading}
                    error={error}
                    displayedTopics={displayedTopics}
                    onSubmit={handleSubmit}
                    onTopicClick={handleTopicClick}
                  />
                } />
                <Route path="/discover" element={
                  <DiscoverPage
                    latestArticles={latestArticles}
                    trendingArticles={trendingArticles}
                    isLoading={isLoadingArticles}
                  />
                } />
                <Route path="/library" element={
                  <LibraryPage
                    sessions={savedSessions}
                    onSessionSelect={handleSessionSelect}
                  />
                } />
                <Route path="/paper/:paperId" element={<PaperViewWrapper />} />
                <Route path="/about" element={<AboutUs onBack={handleBackToHome} />} />
                <Route path="/contact" element={<ContactPage onBack={handleBackToHome} />} />
                <Route path="/privacy" element={<PrivacyPolicy onBack={handleBackToHome} />} />
                <Route path="/terms" element={<TermsOfService onBack={handleBackToHome} />} />
              </Routes>
            )}
          </main>
        </div>
        <Footer 
          onPrivacyClick={() => navigate('/privacy')}
          onTermsClick={() => navigate('/terms')}
        />
      </div>
    </AuthGuard>
  );
}

function App() {
  return <MainContent />;
}

export default App;