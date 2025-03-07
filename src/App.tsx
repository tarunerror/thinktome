import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AboutUs } from './components/AboutUs';
import { HomePage } from './components/HomePage';
import { PaperView } from './components/PaperView';
import { DiscoverPage } from './components/DiscoverPage';
import { LibraryPage } from './components/LibraryPage';
import { ResearchProgress } from './components/ResearchProgress';
import { usePaperGeneration } from './hooks/usePaperGeneration';
import { useResearchProgress } from './hooks/useResearchProgress';
import { useLocalStorage } from './hooks/useLocalStorage';
import { fetchLatestArticles, fetchTrendingArticles } from './services/api/devto';
import type { Topic, SavedSession, DevToArticle } from './types';
import { researchTopics } from './topics';

function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [displayedTopics, setDisplayedTopics] = useState<Topic[]>([]);
  const [savedSessions, setSavedSessions] = useLocalStorage<SavedSession[]>('research_sessions', []);
  const [latestArticles, setLatestArticles] = useState<DevToArticle[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<DevToArticle[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(false);

  const {
    topic,
    setTopic,
    loading,
    error,
    paper,
    sources,
    tableOfContents,
    selectedSection,
    setSelectedSection,
    paperSections,
    expandedSections,
    activeView,
    setActiveView,
    handleSubmit,
    toggleSection,
    resetState
  } = usePaperGeneration();

  const researchProgress = useResearchProgress(loading, sources);

  useEffect(() => {
    const shuffleTopics = () => {
      const shuffled = [...researchTopics].sort(() => Math.random() - 0.5);
      setDisplayedTopics(shuffled.slice(0, 3));
    };
    
    shuffleTopics();
    const interval = setInterval(shuffleTopics, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeView === 'discover') {
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
  }, [activeView]);

  const handleTopicClick = async (selectedTopic: Topic) => {
    setTopic(selectedTopic.title);
    await handleSubmit(null, selectedTopic.title);
  };

  const handleSessionSelect = (session: SavedSession) => {
    setTopic(session.topic);
    setPaper(session.content);
    setPaperSections(parsePaperSections(session.content));
    setSelectedSection('abstract');
    setActiveView('paper');
  };

  const saveCurrentSession = () => {
    if (paper && topic) {
      const newSession: SavedSession = {
        id: Date.now().toString(),
        topic,
        content: paper,
        createdAt: Date.now()
      };
      setSavedSessions(prev => [...prev, newSession]);
    }
  };

  useEffect(() => {
    if (paper && topic) {
      saveCurrentSession();
    }
  }, [paper, topic]);

  const handleBackToHome = () => {
    setShowAbout(false);
    resetState();
    setActiveView('home');
  };

  if (showAbout) {
    return <AboutUs onBack={handleBackToHome} />;
  }

  const renderContent = () => {
    if (loading) {
      return (
        <ResearchProgress
          sources={sources}
          progress={researchProgress}
        />
      );
    }

    switch (activeView) {
      case 'discover':
        return (
          <DiscoverPage
            latestArticles={latestArticles}
            trendingArticles={trendingArticles}
            isLoading={isLoadingArticles}
          />
        );
      case 'library':
        return (
          <LibraryPage
            sessions={savedSessions}
            onSessionSelect={handleSessionSelect}
          />
        );
      case 'paper':
        if (paper) {
          return (
            <PaperView
              topic={topic}
              tableOfContents={tableOfContents}
              selectedSection={selectedSection}
              expandedSections={expandedSections}
              paperSections={paperSections}
              onBack={resetState}
              onSectionSelect={setSelectedSection}
              onSectionToggle={toggleSection}
            />
          );
        }
        return null;
      default:
        return (
          <HomePage
            topic={topic}
            setTopic={setTopic}
            loading={loading}
            error={error}
            displayedTopics={displayedTopics}
            onSubmit={handleSubmit}
            onTopicClick={handleTopicClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Header 
        onAboutClick={() => setShowAbout(true)}
        onHomeClick={handleBackToHome}
      />
      <div className="flex">
        <Sidebar
          onNewSession={resetState}
          onSessionSelect={handleSessionSelect}
          onViewChange={setActiveView}
          activeView={activeView}
          isLoading={loading}
        />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;