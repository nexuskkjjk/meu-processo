import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  // Balanced middle-ground sizes: smaller than before, larger than original
  const iconHeightMap = {
    sm: 'h-8 sm:h-9',
    md: 'h-12 sm:h-14 md:h-15',
    lg: 'h-20 sm:h-24 md:h-28',
  };

  const textHeightMap = {
    sm: 'text-base sm:text-lg',
    md: 'text-xl sm:text-[24px] md:text-[26px]',
    lg: 'text-3xl sm:text-4xl md:text-5xl',
  };

  // Positive gap/margin now because the new logo has NO transparent padding!
  const overlapMap = {
    sm: 'ml-2 sm:ml-2.5',
    md: 'ml-3 sm:ml-3.5 md:ml-4',
    lg: 'ml-4 sm:ml-5 md:ml-5.5',
  };

  // Since there is no longer any massive transparent padding, we do NOT need negative margins
  // that pull the container out of screen boundary!
  const appliedMargin = '';

  return (
    <div id="brand-logo-container" className={`flex items-center select-none ${appliedMargin} ${className}`}>
      <img 
        src="/logo.png" 
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

