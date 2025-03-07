import React from 'react';
import { AnimatedCounter } from './AnimatedCounter';
import type { Stat } from '../types';

interface StatsCardProps {
  stat: Stat;
  isVisible: boolean;
  delay: number;
}

export function StatsCard({ stat, isVisible, delay }: StatsCardProps) {
  return (
    <div
      className={`relative bg-gray-800 rounded-2xl p-8 border border-gray-700 transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-2xl`} />
      <div className="relative">
        <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10 text-white mb-4`}>
          {stat.icon}
        </div>
        <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent animate-gradient`}>
          <AnimatedCounter
            end={stat.value}
            suffix={stat.suffix}
            decimals={stat.decimals}
          />
        </div>
        <div className="text-gray-400">{stat.label}</div>
      </div>
    </div>
  );
}