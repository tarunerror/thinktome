import React, { useState } from 'react';
import { ArrowLeft, Shield, Lock, Database, Share2, UserCheck, Mail, AlertCircle } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections: Section[] = [
    {
      id: 'data-collection',
      title: 'Data Collection',
      icon: <Database className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">We collect the following types of information:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-white mb-2">Essential Data</h4>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Research topics</li>
                <li>Generated papers</li>
                <li>Usage analytics</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-white mb-2">Optional Data</h4>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Email address</li>
                <li>User preferences</li>
                <li>Feedback responses</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-usage',
      title: 'How We Use Your Data',
      icon: <Share2 className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Your data helps us:</p>
          <div className="grid gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-primary-500/10 p-2 rounded-lg mr-3">
                    <Shield className="h-5 w-5 text-primary-400" />
                  </span>
                  <div>
                    <h4 className="font-medium text-white">Improve Security</h4>
                    <p className="text-gray-400 text-sm">Protect against unauthorized access and ensure data safety</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500/10 p-2 rounded-lg mr-3">
                    <UserCheck className="h-5 w-5 text-green-400" />
                  </span>
                  <div>
                    <h4 className="font-medium text-white">Personalize Experience</h4>
                    <p className="text-gray-400 text-sm">Customize the service to better meet your needs</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500/10 p-2 rounded-lg mr-3">
                    <AlertCircle className="h-5 w-5 text-blue-400" />
                  </span>
                  <div>
                    <h4 className="font-medium text-white">Service Updates</h4>
                    <p className="text-gray-400 text-sm">Notify you about important changes and updates</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'data-protection',
      title: 'Data Protection',
      icon: <Lock className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">We implement multiple layers of protection:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-white mb-2">Technical Measures</h4>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>End-to-end encryption</li>
                <li>Regular security audits</li>
                <li>Secure data storage</li>
                <li>Access controls</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-white mb-2">Organizational Measures</h4>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Staff training</li>
                <li>Access monitoring</li>
                <li>Incident response plan</li>
                <li>Regular reviews</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: <Mail className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Have questions about our privacy policy? Get in touch:</p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="flex flex-col space-y-2">
              <a 
                href="mailto:its.tarun01@gmail.com"
                className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                its.tarun01@gmail.com
              </a>
              <p className="text-gray-400 text-sm">
                We aim to respond to all privacy-related inquiries within 48 hours.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={onBack}
          className="mb-8 flex items-center text-gray-300 hover:text-white transition-colors group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-primary-400" />
              <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
            </div>
            <p className="mt-2 text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="p-6">
            <div className="grid gap-6">
              {sections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                    className="w-full flex items-center justify-between text-left p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-primary-400">{section.icon}</span>
                      <span className="font-medium text-white">{section.title}</span>
                    </div>
                    <ArrowLeft 
                      className={`h-5 w-5 text-gray-400 transform transition-transform ${
                        activeSection === section.id ? 'rotate-90' : '-rotate-90'
                      }`} 
                    />
                  </button>
                  {activeSection === section.id && (
                    <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
                      {section.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}