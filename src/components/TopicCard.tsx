import { ArrowRight, Sparkles } from 'lucide-react';
import type { Topic } from '../types';

interface TopicCardProps {
  topic: Topic;
  onClick: (topic: Topic) => void;
}

export function TopicCard({ topic, onClick }: TopicCardProps) {
  const getCategoryStyles = (category: string) => {
    const styles = {
      technology: {
        badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        gradient: 'from-blue-500/10 to-cyan-500/10',
        icon: 'text-blue-400'
      },
      science: {
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        gradient: 'from-purple-500/10 to-pink-500/10',
        icon: 'text-purple-400'
      },
      medicine: {
        badge: 'bg-green-500/20 text-green-300 border-green-500/30',
        gradient: 'from-green-500/10 to-emerald-500/10',
        icon: 'text-green-400'
      },
      environment: {
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        gradient: 'from-emerald-500/10 to-teal-500/10',
        icon: 'text-emerald-400'
      },
      default: {
        badge: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
        gradient: 'from-gray-500/10 to-slate-500/10',
        icon: 'text-gray-400'
      }
    };
    return styles[category as keyof typeof styles] || styles.default;
  };

  const styles = getCategoryStyles(topic.category);

  return (
    <button
      onClick={() => onClick(topic)}
      className="group relative p-5 sm:p-6 glass rounded-2xl hover:glass-stronger card-hover text-left w-full h-full flex flex-col overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-0 group-hover:opacity-100 smooth-transition`} />
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
      
      <div className="relative flex-1 flex flex-col">
        {/* Category badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full font-semibold border ${styles.badge} smooth-transition`}>
            <Sparkles className={`h-3 w-3 ${styles.icon}`} />
            {topic.category.charAt(0).toUpperCase() + topic.category.slice(1)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-white mb-2.5 text-base sm:text-lg group-hover:text-primary-300 smooth-transition line-clamp-2 leading-snug">
          {topic.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-1 leading-relaxed">
          {topic.description}
        </p>

        {/* Action footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50 group-hover:border-primary-500/30 smooth-transition">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            Research Paper
          </span>
          <div className="flex items-center text-primary-400 text-sm font-semibold group-hover:text-primary-300 smooth-transition">
            <span className="mr-1">Explore</span>
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1.5 smooth-transition" />
          </div>
        </div>
      </div>

      {/* Corner accent */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${styles.gradient} blur-2xl opacity-0 group-hover:opacity-50 smooth-transition`} />
    </button>
  );
}