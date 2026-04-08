import React from 'react';
import { Crown, Zap } from 'lucide-react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', iconOnly = false, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: { container: 'w-8 h-8', icon: 'w-5 h-5', text: 'text-lg' },
    md: { container: 'w-12 h-12', icon: 'w-7 h-7', text: 'text-2xl' },
    lg: { container: 'w-16 h-16', icon: 'w-10 h-10', text: 'text-3xl' }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${currentSize.container} bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-100 relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-50" />
        <Crown className={`${currentSize.icon} text-white relative z-10 group-hover:scale-110 transition-transform`} />
        <Zap className="absolute -bottom-1 -right-1 w-1/2 h-1/2 text-amber-400 fill-amber-400 opacity-80 z-20" />
      </div>
      {!iconOnly && (
        <div className="flex flex-col items-start">
          <h1 className={`${currentSize.text} font-black text-slate-900 tracking-tighter leading-none`}>
            HUNTRIX
          </h1>
          <span className="text-[8px] font-black text-indigo-600 uppercase tracking-[0.3em] mt-1">
            SOVEREIGN
          </span>
        </div>
      )}
    </div>
  );
}
