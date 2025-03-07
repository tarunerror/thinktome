import React from 'react';

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brain circuit background */}
      <circle cx="50" cy="50" r="45" className="stroke-primary-400/20" strokeWidth="2" />
      <path
        d="M30 50C30 40 40 35 50 35C60 35 70 40 70 50C70 60 60 65 50 65C40 65 30 60 30 50Z"
        className="stroke-primary-400/20"
        strokeWidth="2"
      />
      
      {/* Animated gradient paths */}
      <path
        d="M25 50C25 35 40 25 50 25C60 25 75 35 75 50C75 65 60 75 50 75C40 75 25 65 25 50Z"
        className="stroke-primary-400"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="180"
        strokeDashoffset="180"
        style={{
          animation: "dash 2s ease-out forwards"
        }}
      />
      
      {/* Book pages */}
      <path
        d="M40 45L60 45M40 55L60 55"
        className="stroke-primary-400"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          animation: "fade 1s ease-out forwards"
        }}
      />
      
      {/* Dots representing data points */}
      <circle cx="35" cy="40" r="2" className="fill-primary-400" style={{ animation: "pop 0.5s ease-out forwards" }} />
      <circle cx="65" cy="40" r="2" className="fill-primary-400" style={{ animation: "pop 0.5s ease-out 0.2s forwards" }} />
      <circle cx="35" cy="60" r="2" className="fill-primary-400" style={{ animation: "pop 0.5s ease-out 0.4s forwards" }} />
      <circle cx="65" cy="60" r="2" className="fill-primary-400" style={{ animation: "pop 0.5s ease-out 0.6s forwards" }} />
      
      {/* Central connecting line */}
      <path
        d="M50 35L50 65"
        className="stroke-primary-400"
        strokeWidth="3"
        strokeLinecap="round"
        style={{
          animation: "grow 1s ease-out forwards"
        }}
      />
      
      <style>
        {`
          @keyframes dash {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes fade {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes pop {
            from {
              transform: scale(0);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
          @keyframes grow {
            from {
              transform: scaleY(0);
            }
            to {
              transform: scaleY(1);
            }
          }
        `}
      </style>
    </svg>
  );
}