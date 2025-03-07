import React, { useRef, useState } from 'react';
import { Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus({ type: 'loading' });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ 
        type: 'success', 
        message: 'Message sent successfully! We will get back to you soon.' 
      });
      formRef.current.reset();
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: 'Failed to send message. Please try again later.' 
      });
    }
  };

  return (
    <div className="relative">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
        <p className="text-gray-400">Have questions or feedback? We'd love to hear from you.</p>
      </div>

      <form 
        ref={formRef} 
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <input type="hidden" name="to_email" value="its.tarun01@gmail.com" />
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="from_name"
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="reply_to"
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="What's this about?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          disabled={status.type === 'loading'}
          className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
        >
          {status.type === 'loading' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </>
          )}
        </button>

        {status.message && (
          <div className={`p-4 rounded-lg flex items-center space-x-2 ${
            status.type === 'success' ? 'bg-green-900/50 text-green-200' : 
            status.type === 'error' ? 'bg-red-900/50 text-red-200' : ''
          }`}>
            {status.type === 'success' ? (
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 flex-shrink-0" />
            )}
            <p>{status.message}</p>
          </div>
        )}
      </form>
    </div>
  );
}