import React from 'react';
import logoImg from '../3.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  // Balanced middle-ground sizes: smaller than before, larger than original
  const iconHeightMap = {
    sm: 'h-11 sm:h-12',
    md: 'h-18 sm:h-20 md:h-22',
    lg: 'h-28 sm:h-32 md:h-36',
  };

  const textHeightMap = {
    sm: 'text-sm sm:text-base',
    md: 'text-lg sm:text-[22px] md:text-[24px]',
    lg: 'text-2xl sm:text-3xl md:text-4xl',
  };

  // Pulls the text inside the transparent padding of the image
  const overlapMap = {
    sm: '-ml-2 sm:-ml-3',
    md: '-ml-7 sm:-ml-8 md:-ml-9',
    lg: '-ml-11 sm:-ml-12 md:-ml-13',
  };

  // Smart negative margin to pull the outer container slightly to the left.
  // We keep this moderate so it doesn't shift too far to the left.
  const isCentered = className.includes('mx-auto');
  const containerMarginMap = {
    sm: isCentered ? '' : '-ml-2 sm:-ml-3',
    md: isCentered ? '' : '-ml-6 sm:-ml-8 md:-ml-10 lg:-ml-11',
    lg: isCentered ? '' : '-ml-9 sm:-ml-11 md:-ml-13 lg:-ml-15',
  };

  const appliedMargin = containerMarginMap[size] || '';

  return (
    <div id="brand-logo-container" className={`flex items-center select-none ${appliedMargin} ${className}`}>
      <img 
        src={logoImg} 
        alt="Logo" 
        referrerPolicy="no-referrer"
        className={`${iconHeightMap[size]} w-auto object-contain transition-transform duration-300 hover:scale-105 relative z-0`} 
      />
      <span className={`relative z-10 ${textHeightMap[size]} ${overlapMap[size]} font-extrabold tracking-tight text-white font-sans flex items-center`}>
        meuprocessoseletivo
        <span className="text-brand-orange-400">.com</span>
      </span>
    </div>
  );
}

