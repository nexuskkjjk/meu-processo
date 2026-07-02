import React from 'react';
import logoImg from '../logo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  // Balanced middle-ground sizes: smaller than before, larger than original
  const iconHeightMap = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9.5 md:h-10.5',
    lg: 'h-14 sm:h-16 md:h-19',
  };

  const textHeightMap = {
    sm: 'text-sm sm:text-base',
    md: 'text-base sm:text-[19px] md:text-[21px]',
    lg: 'text-xl sm:text-2xl md:text-3xl',
  };

  // Positive gap/margin now because the new logo has NO transparent padding!
  const overlapMap = {
    sm: 'ml-1.5 sm:ml-2',
    md: 'ml-2 sm:ml-2.5 md:ml-3',
    lg: 'ml-3 sm:ml-3.5 md:ml-4',
  };

  // Since there is no longer any massive transparent padding, we do NOT need negative margins
  // that pull the container out of screen boundary!
  const appliedMargin = '';

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

