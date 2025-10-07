import { ArrowLeft, Scale, Mail } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 py-8">
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

          <div className="p-6 space-y-6">
            {/* Acceptance */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Acceptance of Terms</h2>
              <p className="text-gray-300">
                By accessing and using ThinkTome, you agree to these Terms of Service. This platform 
                is designed to assist with research and academic writing while maintaining ethical standards.
              </p>
            </div>

            {/* Acceptable Use */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Acceptable Use</h2>
              <p className="text-gray-300 mb-3">
                ThinkTome is intended as a research aid. You agree to:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
                <li>Use the service for lawful academic and research purposes only</li>
                <li>Properly cite all sources and maintain academic integrity</li>
                <li>Verify and fact-check generated content before use</li>
                <li>Not use the service for plagiarism or misrepresentation</li>
              </ul>
            </div>

            {/* Prohibited Activities */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Prohibited Activities</h2>
              <p className="text-gray-300 mb-3">You may not:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
                <li>Generate harmful, illegal, or inappropriate content</li>
                <li>Abuse or attempt to reverse-engineer the service</li>
                <li>Violate copyright or intellectual property rights</li>
                <li>Disrupt or interfere with the platform's operation</li>
              </ul>
            </div>

            {/* Content Ownership */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Content & Intellectual Property</h2>
              <p className="text-gray-300">
                You retain ownership of papers you generate through ThinkTome, provided they respect 
                source attribution. The ThinkTome platform, brand, and underlying technology remain 
                our intellectual property.
              </p>
            </div>

            {/* Disclaimer */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Disclaimer</h2>
              <p className="text-gray-300">
                ThinkTome is provided "as is" without warranties. We do not guarantee the accuracy, 
                completeness, or suitability of generated content. Users are responsible for verifying 
                and using content appropriately.
              </p>
            </div>

            {/* Contact */}
            <div className="pt-4 border-t border-gray-700">
              <h2 className="text-lg font-semibold text-white mb-3">Questions?</h2>
              <a 
                href="mailto:its.tarun01@gmail.com"
                className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
              >
                <Mail className="h-5 w-5 mr-2" />
                its.tarun01@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}