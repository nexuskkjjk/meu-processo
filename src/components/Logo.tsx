import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  // Balanced middle-ground sizes: smaller than before, larger than original
  // Fully responsive mapping to prevent clipping and overflow on mobile and tablet, while keeping PC sizes untouched!
  const iconHeightMap = {
    sm: 'h-5 xs:h-6 lg:h-7',
    md: 'h-6 xs:h-7.5 sm:h-8.5 md:h-9 lg:h-10.5',
    lg: 'h-10 xs:h-12 sm:h-14 lg:h-19',
  };

  const textHeightMap = {
    sm: 'text-[11px] xs:text-sm lg:text-base',
    md: 'text-[13px] xs:text-[15px] sm:text-[18px] md:text-[19px] lg:text-[21px]',
    lg: 'text-base xs:text-xl sm:text-2xl lg:text-3xl',
  };

  // Positive gap/margin now because the new logo has NO transparent padding!
  const overlapMap = {
    sm: 'ml-1 xs:ml-1.5 lg:ml-2',
    md: 'ml-1.5 xs:ml-2 sm:ml-2.5 lg:ml-3',
    lg: 'ml-2 xs:ml-3 sm:ml-3.5 lg:ml-4',
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

