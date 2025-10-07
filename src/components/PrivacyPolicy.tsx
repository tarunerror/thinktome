import { ArrowLeft, Shield, Mail } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
              <Shield className="h-6 w-6 text-primary-400" />
              <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
            </div>
            <p className="mt-2 text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Data Collection */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">What We Collect</h2>
              <p className="text-gray-300 mb-3">
                We collect minimal data to provide our research paper generation service:
              </p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 ml-2">
                <li>Research topics and generated papers (stored locally in your browser)</li>
                <li>Basic usage analytics to improve the service</li>
                <li>Email address (optional, only if you contact us)</li>
              </ul>
            </div>

            {/* Data Usage */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">How We Use Your Data</h2>
              <p className="text-gray-300">
                Your data is used solely to provide and improve ThinkTome. We personalize your 
                experience, enhance security, and notify you of important updates. We never sell 
                your data to third parties.
              </p>
            </div>

            {/* Data Protection */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Data Protection</h2>
              <p className="text-gray-300">
                Most of your data is stored locally in your browser. We implement industry-standard 
                security measures including encryption and secure authentication to protect any data 
                processed through our services.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-3">Your Rights</h2>
              <p className="text-gray-300">
                You have control over your data. You can clear your locally stored papers at any time 
                through your browser settings. Contact us to request deletion of any server-side data.
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