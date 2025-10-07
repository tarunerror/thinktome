import { ArrowLeft } from 'lucide-react';
import { ContactForm } from './ContactForm';

interface ContactPageProps {
  onBack: () => void;
}

export function ContactPage({ onBack }: ContactPageProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>
        <ContactForm />
      </div>
    </div>
  );
}
