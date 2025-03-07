import React, { useState } from 'react';
import { ArrowLeft, Scale, FileText, AlertTriangle, CheckCircle2, HelpCircle, Shield } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections: Section[] = [
    {
      id: 'usage-terms',
      title: 'Usage Terms',
      icon: <CheckCircle2 className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">By using ThinkTome, you agree to:</p>
          <div className="grid gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-green-500/10 p-2 rounded-lg mr-3">
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </span>
                  <div>
                    <h4 className="font-medium text-white">Proper Attribution</h4>
                    <p className="text-gray-400 text-sm">Cite sources and give credit where due</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500/10 p-2 rounded-lg mr-3">
                    <Shield className="h-5 w-5 text-blue-400" />
                  </span>
                  <div>
                    <h4 className="font-medium text-white">Academic Integrity</h4>
                    <p className="text-gray-400 text-sm">Use the service as a research aid, not for plagiarism</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-500/10 p-2 rounded-lg mr-3">
                    <FileText className="h-5 w-5 text-purple-400" />
                  </span>
                  <div>
                    <h4 className="font-medium text-white">Content Guidelines</h4>
                    <p className="text-gray-400 text-sm">Generate appropriate and legal content only</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'prohibited-activities',
      title: 'Prohibited Activities',
      icon: <AlertTriangle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">The following activities are strictly prohibited:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-white mb-2">Content Violations</h4>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Generating harmful content</li>
                <li>Plagiarism</li>
                <li>Copyright infringement</li>
                <li>Misrepresentation</li>
              </ul>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h4 className="font-medium text-white mb-2">Technical Violations</h4>
              <ul className="list-disc list-inside text-gray-400 space-y-1">
                <li>Unauthorized access</li>
                <li>API abuse</li>
                <li>Scraping data</li>
                <li>Disrupting service</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: <Scale className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-primary-500/10 p-2 rounded-lg mr-3">
                    <FileText className="h-5 w-5 text-primary-400" />
                  </span>
                  <div>
                    <h4 className="font-medium text-white">Content Ownership</h4>
                    <p className="text-gray-400 text-sm">You retain rights to your generated papers while properly citing sources</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-500/10 p-2 rounded-lg mr-3">
                    <Shield className="h-5 w-5 text-yellow-400" />
                  </span>
                  <div>
                    <h4 className="font-medium text-white">Service Protection</h4>
                    <p className="text-gray-400 text-sm">Our platform, brand, and technology remain our intellectual property</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'support',
      title: 'Help & Support',
      icon: <HelpCircle className="h-5 w-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-300">Need assistance with our terms? Contact us:</p>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <div className="space-y-2">
              <a 
                href="mailto:its.tarun01@gmail.com"
                className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
              >
                <HelpCircle className="h-5 w-5 mr-2" />
                its.tarun01@gmail.com
              </a>
              <p className="text-gray-400 text-sm">
                Our support team is available to help clarify any terms and conditions.
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
              <Scale className="h-6 w-6 text-primary-400" />
              <h1 className="text-2xl font-bold text-white">Terms of Service</h1>
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