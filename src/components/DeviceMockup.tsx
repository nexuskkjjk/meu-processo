import React from 'react';
import screenshotImg from '../Captura de tela 2026-06-18 180442.png';

export default function DeviceMockup() {
  return (
    <div 
      id="device-pc-mockup-frame" 
      className="relative w-full select-none"
    >
      {/* 
        Enlarged screenshot image:
        Scaled up and translated to the right.
        Using max-w-none to bypass tailwind's default max-w-full and allowing it to render extremely large.
        Translating on lg screens to let the right half overflow outside the viewport.
      */}
      <img 
        src={screenshotImg} 
        alt="Mockup do Sistema de Processo Seletivo" 
        referrerPolicy="no-referrer"
        className="w-full max-w-none md:w-[110%] lg:w-[145%] xl:w-[155%] h-auto object-contain rounded-xl shadow-2xl border border-white/5 transform translate-x-0 lg:translate-x-[4%] xl:translate-x-[6%] transition-transform duration-500 ease-out"
      />
    </div>
  );
}

