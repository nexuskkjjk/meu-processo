import React from 'react';
import logoImg from '../3.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const iconHeightMap = {
    sm: 'h-11 sm:h-12',
    md: 'h-16 sm:h-18 md:h-20',
    lg: 'h-24 sm:h-26 md:h-28',
  };

  const textHeightMap = {
    sm: 'text-xs sm:text-sm',
    md: 'text-base sm:text-lg md:text-xl',
    lg: 'text-xl sm:text-2xl md:text-3xl',
  };

  // Overlap distance to pull the text inside the transparent padding of the image
  const overlapMap = {
    sm: '-ml-1.5 sm:-ml-4.5',
    md: '-ml-8 sm:-ml-10 md:-ml-12',
    lg: '-ml-12 sm:-ml-14 md:-ml-17',
  };

  return (
    <div id="brand-logo-container" className={`flex items-center select-none -ml-4 sm:-ml-8 md:-ml-10 lg:-ml-12 ${className}`}>
      <img 
        src={logoImg} 
        alt="Logo" 
        referrerPolicy="no-referrer"
        className={`${iconHeightMap[size]} w-auto object-contain transition-transform duration-300 hover:scale-105 relative z-0`} 
      />
      <span className={`relative z-10 ${textHeightMap[size]} ${overlapMap[size]} font-bold tracking-tight text-white font-sans flex items-center`}>
        meuprocessoseletivo
        <span className="text-brand-orange-400">.com</span>
      </span>
    </div>
  );
}
