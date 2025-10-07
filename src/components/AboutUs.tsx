import { useEffect, useState, useRef } from 'react';
import { Github, Mail, ArrowLeft, Loader2, Sparkles, Code2, Users, Zap, Brain, Rocket, Globe } from 'lucide-react';
import { ThreeScene } from './ThreeScene';
import { ContactForm } from './ContactForm';
import { StatsCard } from './StatsCard';
import type { Stat } from '../types';

interface AboutUsProps {
  onBack: () => void;
}

export function AboutUs({ onBack }: AboutUsProps) {
  const [githubAvatar, setGithubAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Research",
      description: "Advanced AI algorithms analyze and synthesize research data to generate comprehensive papers."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Knowledge Base",
      description: "Access to worldwide academic sources and research papers for thorough analysis."
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Rapid Generation",
      description: "Generate complete research papers in minutes instead of weeks or months."
    }
  ];

  const stats: Stat[] = [
    { 
      label: "Papers Generated", 
      value: "10000",
      suffix: "+",
      icon: <Code2 className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-400"
    },
    { 
      label: "Active Users", 
      value: "5000",
      suffix: "+",
      icon: <Users className="h-6 w-6" />,
      color: "from-purple-500 to-pink-400"
    },
    { 
      label: "Success Rate", 
      value: "99.9",
      decimals: 1,
      suffix: "%",
      icon: <Zap className="h-6 w-6" />,
      color: "from-amber-500 to-orange-400"
    }
  ];

  useEffect(() => {
    fetch('https://api.github.com/users/tarunerror')
      .then(response => response.json())
      .then(data => {
        setGithubAvatar(data.avatar_url);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(current => (current + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gray-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
        <button
          onClick={onBack}
          className="mb-8 flex items-center text-gray-300 hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        <div className="space-y-24">
          {/* Hero Section */}
          <section className="text-center relative">
            <div className="absolute inset-0 -z-10">
              <ThreeScene />
            </div>
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-3xl p-8 md:p-16 border border-gray-800">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700 mb-6">
                <Sparkles className="h-5 w-5 text-primary-400 mr-2" />
                <span className="text-gray-300">Revolutionizing Academic Research</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-400 mb-6">
                About ThinkTome
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Empowering researchers and students with AI-driven research paper generation, making academic writing more accessible and efficient.
              </p>
            </div>
          </section>

          {/* Features Section */}
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-transparent rounded-3xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">Key Features</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl transition-all duration-500 transform ${
                      index === activeFeature
                        ? 'scale-105 bg-gray-700/50 border-2 border-primary-500/50'
                        : 'bg-gray-700/30 border border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary-500/10 text-primary-400 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section
            ref={statsRef}
            className="relative overflow-hidden"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  stat={stat}
                  isVisible={isStatsVisible}
                  delay={index * 200}
                />
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Development Team</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 p-8 bg-gray-700/30 rounded-xl border border-gray-600">
              {loading ? (
                <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 text-gray-400 animate-spin" />
                </div>
              ) : (
                <img 
                  src={githubAvatar || 'https://avatars.githubusercontent.com/u/tarunerror'}
                  alt="Tarun Gautam"
                  className="w-32 h-32 rounded-full object-cover border-4 border-primary-500 shadow-lg shadow-primary-500/20"
                />
              )}
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Tarun Gautam</h3>
                <p className="text-primary-400 font-medium mb-4">Lead Developer</p>
                <p className="text-gray-300 mb-6 max-w-2xl">
                  Passionate about creating innovative solutions that make academic research more accessible and efficient. Specializing in AI-driven applications and full-stack development with a focus on user experience and performance optimization.
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/tarunerror/thinktome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-white"
                  >
                    <Github className="h-5 w-5" />
                    <span>GitHub</span>
                  </a>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors text-white"
                  >
                    <Mail className="h-5 w-5" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {showContactForm && (
            <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700">
              <ContactForm />
            </section>
          )}

          {/* Technology Stack */}
          <section className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-700">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'React', desc: 'Frontend Framework', gradient: 'from-blue-500 to-cyan-400' },
                { name: 'TypeScript', desc: 'Language', gradient: 'from-blue-600 to-blue-400' },
                { name: 'Tailwind CSS', desc: 'Styling', gradient: 'from-teal-500 to-emerald-400' },
                { name: 'Mistral AI', desc: 'AI Integration', gradient: 'from-purple-500 to-pink-400' },
                { name: 'Three.js', desc: '3D Graphics', gradient: 'from-red-500 to-orange-400' },
                { name: 'Node.js', desc: 'Runtime', gradient: 'from-green-500 to-emerald-400' },
                { name: 'Vite', desc: 'Build Tool', gradient: 'from-yellow-500 to-amber-400' },
                { name: 'Git', desc: 'Version Control', gradient: 'from-gray-500 to-gray-400' }
              ].map((tech) => (
                <div 
                  key={tech.name}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tech.gradient} opacity-5 rounded-xl transition-opacity group-hover:opacity-10`} />
                  <div className="relative bg-gray-700/30 p-6 rounded-xl border border-gray-600 transform transition-transform group-hover:scale-105">
                    <h3 className={`text-xl font-bold mb-2 bg-gradient-to-r ${tech.gradient} bg-clip-text text-transparent`}>
                      {tech.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}