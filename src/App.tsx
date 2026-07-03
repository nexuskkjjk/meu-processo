/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Check, 
  Menu, 
  X, 
  ChevronRight,
  UserCheck,
  PlusCircle,
  Users
} from 'lucide-react';

import Logo from './components/Logo';
import DeviceMockup from './components/DeviceMockup';
import FAQAccordion from './components/FAQAccordion';
import RecruiterDashboardMockup from './components/RecruiterDashboardMockup';
import ProductDashboardMockup from './components/ProductDashboardMockup';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'recrutadores' | 'candidatos'>('recrutadores');
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [interestEmail, setInterestEmail] = useState('');
  const [showInterestToast, setShowInterestToast] = useState(false);
  
  // Billing cycle state: 'mensal' or 'anual'
  const [billingCycle, setBillingCycle] = useState<'mensal' | 'anual'>('mensal');
  
  // Interactive Login States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginToast, setShowLoginToast] = useState(false);

  // Site Intro State
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState<'icon' | 'text'>('icon');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const t1 = setTimeout(() => {
      setIntroPhase('text');
    }, 1200);
    const t2 = setTimeout(() => {
      setShowIntro(false);
    }, 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0E0D14] text-white font-sans antialiased selection:bg-brand-orange-500/30 selection:text-white relative overflow-x-hidden">
      
      {/* Intro Overlay Screen with the Logo */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeOut' } }}
            className="fixed inset-0 bg-[#0E0D14] z-50 flex flex-col items-center justify-center p-4 select-none overflow-hidden"
          >
            {/* Logo container area - perfectly aligned side-by-side flex layout */}
            <div className="relative flex items-center justify-center gap-4 sm:gap-5 md:gap-6 max-w-[95vw] overflow-visible">
              {/* Logo Symbol (Left) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="z-20 shrink-0 flex items-center justify-center"
              >
                <img 
                  src="/logo.png" 
                  alt="Logo Symbol" 
                  referrerPolicy="no-referrer"
                  className="h-12 w-auto object-contain sm:h-16 md:h-20 dropdown-shadow-[0_10px_20px_rgba(255,138,0,0.15)]"
                />
              </motion.div>

              {/* Logo Text (Reveals next to it, on the Right) */}
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ 
                  opacity: introPhase !== 'icon' ? 1 : 0, 
                  width: introPhase !== 'icon' ? 'auto' : 0,
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="z-10 text-2xl sm:text-3.5xl md:text-[2.4rem] font-black tracking-tight text-white whitespace-nowrap flex items-center overflow-hidden"
              >
                <span className="flex items-center gap-0.5 pr-2">
                  meuprocessoseletivo
                  <span className="text-[#FF8A00]">.com</span>
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <header id="main-navigation-navbar" className="sticky top-0 z-40 w-full bg-[#0E0D14] transition-colors duration-300">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 h-24 flex items-center justify-between relative">
          <Logo size="md" />

          {/* Desktop Nav Links & Actions (Aligned Right) */}
          <div className="hidden md:flex items-center">
            <nav className="flex items-center gap-10">
              <a href="#solucoes" className="text-[16px] font-bold text-brand-gray hover:text-white transition-colors">Soluções</a>
              <a href="#produtos" className="text-[16px] font-bold text-brand-gray hover:text-white transition-colors">Produtos</a>
              <a href="#precos" className="text-[16px] font-bold text-brand-gray hover:text-white transition-colors">Preços</a>
              <button 
                type="button" 
                onClick={() => setIsLoginModalOpen(true)}
                className="text-[16px] font-bold text-brand-gray hover:text-white transition-colors cursor-pointer"
              >
                Login
              </button>
              <button 
                type="button"
                onClick={() => setIsInterestModalOpen(true)}
                className="bg-brand-gradient text-white text-[16px] font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-brand-orange-500/15 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                Contate-nos
              </button>
            </nav>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button 
            type="button" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-1.5 text-brand-gray hover:text-white transition-colors animate-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed inset-x-0 top-24 bg-[#0E0D14]/95 backdrop-blur-lg border-b border-white/5 z-30 py-6 px-4 space-y-4 flex flex-col items-center text-center shadow-2xl overflow-y-auto max-h-[80vh]"
          >
            <a href="#solucoes" onClick={() => setMobileMenuOpen(false)} className="text-[16px] font-bold text-brand-gray hover:text-white transition-colors block py-2 w-full">Soluções</a>
            <a href="#produtos" onClick={() => setMobileMenuOpen(false)} className="text-[16px] font-bold text-brand-gray hover:text-white transition-colors block py-2 w-full">Produtos</a>
            <a href="#precos" onClick={() => setMobileMenuOpen(false)} className="text-[16px] font-bold text-brand-gray hover:text-white transition-colors block py-2 w-full">Preços</a>
            <div className="w-full h-[1px] bg-white/5 my-2" />
            <button 
              type="button"
              onClick={() => { setIsLoginModalOpen(true); setMobileMenuOpen(false); }}
              className="text-[16px] font-bold text-brand-gray hover:text-white block py-2 w-full text-center cursor-pointer"
            >
              Login
            </button>
            <button 
              type="button"
              onClick={() => { setIsInterestModalOpen(true); setMobileMenuOpen(false); }}
              className="w-full bg-brand-gradient text-white text-[15px] font-bold py-2.5 rounded-full hover:opacity-95 transition-all text-center cursor-pointer"
            >
              Contate-nos
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Elements Scroll Grid */}
      <main className="max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-36 lg:space-y-48 pb-24">

        {/* HERO SECTION - Matching Image 1 split screen template */}
        <section id="hero-sec" className="min-h-[calc(100vh-110px)] py-12 lg:py-0 grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-center lg:mb-16">
          
          <div className="lg:col-span-6 space-y-10">
            <div className="space-y-6">
              <h1 className="text-[34px] xs:text-[42px] sm:text-6xl lg:text-[64px] xl:text-[76px] font-extrabold tracking-tight text-white leading-[1.08] font-sans">
                Contrate melhor.<br />
                Mais rápido.<br />
                <span className="text-white whitespace-nowrap">Com menos esforço.</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-[21px] text-brand-gray/90 max-w-2xl leading-relaxed pt-2">
                Automatize seu processo seletivo e encontre os melhores talentos para sua empresa.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <button 
                type="button"
                onClick={() => {
                  const precosSection = document.getElementById('precos');
                  if (precosSection) {
                    precosSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-brand-gradient text-white text-base sm:text-lg font-bold py-4 px-10 rounded-2xl hover:shadow-2xl hover:shadow-brand-orange-500/25 hover:scale-[1.02] active:scale-98 transition-all flex items-center justify-center cursor-pointer text-center"
              >
                Começar agora
              </button>
            </div>
          </div>

          {/* Custom PC Screen Dashboard Mockup */}
          <div className="lg:col-span-6 py-6">
            <DeviceMockup />
          </div>
        </section>

        {/* IMPACT SLOGAN BANNER - Frase de efeito requested by user */}
        <section id="slogan-impacto" className="relative py-12 md:py-16 overflow-hidden">
          
          <div className="relative max-w-5xl mx-auto px-6 text-center space-y-6">
            <span className="text-[11px] font-bold text-[#FFAE2B] uppercase tracking-widest block animate-pulse">A FORÇA DO SEU TIME COMEÇA AQUI</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
              "O talento certo transforma tudo. Seu processo seletivo rápido, <span className="text-brand-gradient">assertivo e inteligente</span>."
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-brand-gray/80 max-w-3xl mx-auto leading-relaxed">
              Elimine a burocracia do RH de ponta a ponta. Automatize a triagem, engaje seus candidatos e tome decisões baseadas em dados com a plataforma mais ágil do mercado.
            </p>
          </div>
        </section>

        {/* SOLUTIONS SECTION - Da vaga publicada ao candidato ideal (matching second image) */}
        <section id="solucoes" className="space-y-16 py-8 relative">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Solution info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500 animate-pulse" />
                <span className="text-[11px] font-bold text-[#FFAE2B] uppercase tracking-widest">
                  SOLUÇÕES
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.1] sm:leading-[1.1] lg:leading-[1.1]">
                Da vaga publicada <br />
                <span className="text-brand-gradient">ao candidato ideal.</span>
              </h2>
              
              <div className="space-y-4 max-w-lg">
                <p className="text-base sm:text-lg text-brand-gray/90 leading-relaxed font-medium">
                  Organize o processo seletivo em uma plataforma simples, clara e feita para empresas que levam contratações a sério.
                </p>
                <p className="text-sm sm:text-base text-brand-gray/70 leading-relaxed">
                  Elimine de vez as planilhas manuais, e-mails soltos e mensagens desencontradas de candidatos. O nosso sistema centraliza todas as candidaturas recebidas de forma instantânea, permitindo o acompanhamento visual do funil de recrutamento de ponta a ponta em uma única tela.
                </p>
              </div>
            </div>

            {/* Right Column: High Fidelity Desktop Mockup */}
            <div className="lg:col-span-7">
              <RecruiterDashboardMockup />
            </div>
          </div>

          {/* Bottom Process Flow Grid - 01 to 04 connected by lines with arrows */}
          <div className="pt-10 border-t border-white/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative">
              {[
                {
                  num: '01',
                  title: 'Crie a vaga',
                  desc: 'Defina cargo, empresa, modalidade e requisitos.'
                },
                {
                  num: '02',
                  title: 'Compartilhe o link',
                  desc: 'Divulgue a vaga e receba candidaturas em um só lugar.'
                },
                {
                  num: '03',
                  title: 'Receba os currículos',
                  desc: 'Centralize os envios sem depender de planilhas ou mensagens soltas.'
                },
                {
                  num: '04',
                  title: 'Veja o ranking',
                  desc: 'Compare os candidatos com mais compatibilidade.'
                }
              ].map((step, sIdx) => (
                <div key={sIdx} className="relative group space-y-3.5">
                  {/* Step Header with connected lines */}
                  <div className="flex items-center gap-4 relative">
                    <span className="text-sm font-mono font-extrabold text-[#FFAE2B] bg-brand-orange-500/10 px-2.5 py-1 rounded-md border border-brand-orange-500/20 shadow-sm">
                      {step.num}
                    </span>

                    {/* Horizontal connecting line (hidden on mobile/tablet) */}
                    {sIdx < 3 ? (
                      <div className="hidden md:block absolute left-14 right-0 top-1/2 -translate-y-1/2 h-[1px]">
                        <div className="w-full h-full bg-gradient-to-r from-brand-orange-500/40 to-brand-orange-500/10 relative">
                          {/* Arrow pointer icon */}
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-brand-orange-500/60 rotate-45" />
                        </div>
                      </div>
                    ) : (
                      <div className="hidden md:block absolute left-14 right-4 top-1/2 -translate-y-1/2 h-[1px]">
                        <div className="w-full h-full bg-gradient-to-r from-brand-orange-500/40 to-transparent relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-orange-500/30" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step Title & Details */}
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-white group-hover:text-brand-orange-400 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs text-brand-gray/80 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCTS SECTION - Ferramentas para contratar com mais controle (inverted section matching second image) */}
        <section id="produtos" className="space-y-16 py-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: High Fidelity Desktop Mockup (ProductDashboardMockup) */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <ProductDashboardMockup />
            </div>

            {/* Right Column: Product info */}
            <div className="lg:col-span-5 space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-[#FFAE2B] uppercase tracking-widest">
                    PRODUTOS
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-[1.15]">
                  Ferramentas para <br />
                  <span className="text-brand-gradient">contratar com mais controle.</span>
                </h2>
                
                <p className="text-sm sm:text-base text-brand-gray/90 leading-relaxed max-w-md">
                  Tudo que sua empresa precisa para criar processos, organizar candidatos e tomar decisões com mais clareza.
                </p>
              </div>

              {/* Three detailed features boxes with custom orange outline icons */}
              <div className="space-y-4">
                {[
                  {
                    icon: <PlusCircle className="w-5 h-5 text-brand-orange-400" />,
                    title: "Criação de processos",
                    desc: "Cadastre vagas com dados essenciais, requisitos e preferências."
                  },
                  {
                    icon: <UserCheck className="w-5 h-5 text-brand-orange-400" />,
                    title: "Triagem inteligente",
                    desc: "O sistema analisa currículos e organiza candidatos por compatibilidade."
                  },
                  {
                    icon: <Users className="w-5 h-5 text-brand-orange-400" />,
                    title: "Gestão dos candidatos",
                    desc: "Acompanhe currículos, entrevistas, status e informações importantes em um só lugar."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 bg-[#121118]/40 hover:border-brand-orange-500/10 hover:bg-[#15141D]/55 transition-all text-left">
                    <div className="w-10 h-10 rounded-lg bg-brand-orange-500/10 border border-brand-orange-500/20 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs text-brand-gray/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom footer note & button */}
              <div className="space-y-4 pt-2 text-left">
                <p className="text-xs text-brand-gray font-medium">
                  Menos trabalho manual. Mais clareza para decidir.
                </p>
                <button 
                  onClick={() => {
                    const precosSection = document.getElementById('precos');
                    if (precosSection) {
                      precosSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-brand-gradient hover:opacity-95 text-white text-xs font-bold py-3 px-6 rounded-xl transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-1.5 shadow-lg shadow-brand-orange-500/15"
                >
                  <span>Conhecer planos</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: Planos e Preços */}
        <section id="precos" className="space-y-16 py-16 border-t border-white/5 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold text-[#FFAE2B] uppercase tracking-widest block">Tabela Geral de Preços</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Planos simples para contratar com clareza.
            </h2>
            
            {/* Campanha Anual Banner */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 bg-brand-orange-500/10 border border-brand-orange-500/20 px-6 py-3.5 rounded-2xl max-w-xl mx-auto mt-4 text-left">
              <span className="bg-brand-gradient text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                Campanha Anual
              </span>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">Pague 10 meses e use por 12.</p>
                <p className="text-[10px] sm:text-xs text-brand-gray/90 mt-0.5">
                  Na assinatura anual, você economiza 16,67% em relação ao pagamento mensal por 12 meses.
                </p>
              </div>
            </div>

            {/* Beautiful Billing Cycle Toggle */}
            <div className="flex items-center justify-center gap-3 pt-6 select-none">
              <button
                type="button"
                onClick={() => setBillingCycle('mensal')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  billingCycle === 'mensal' 
                    ? 'bg-white/10 text-white shadow-inner border border-white/10' 
                    : 'text-brand-gray hover:text-white'
                }`}
              >
                Cobrança Mensal
              </button>
              
              <button
                type="button"
                onClick={() => setBillingCycle('anual')}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 ${
                  billingCycle === 'anual' 
                    ? 'bg-brand-gradient text-white shadow-lg shadow-brand-orange-500/15' 
                    : 'text-brand-gray hover:text-white'
                }`}
              >
                Cobrança Anual
                <span className="bg-white/20 text-[9px] px-2 py-0.5 rounded-full font-bold text-white tracking-wide">
                  Economize 16.67%
                </span>
              </button>
            </div>
          </div>

          {/* 4 pricing cards layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            
            {/* Card 1: Inicial */}
            <div className="bg-[#16161B] border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-brand-gray/60 uppercase tracking-wider block">Entrada acessível</span>
                  <h4 className="text-lg font-bold text-white mt-1">Inicial</h4>
                  <p className="text-xs text-brand-gray leading-relaxed mt-1.5">Estrutura básica para começar a recrutar com eficiência.</p>
                </div>
                
                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-brand-gray font-semibold">R$</span>
                    <span className="text-3xl font-extrabold text-white transition-all">
                      {billingCycle === 'mensal' ? '39,90' : '33,25'}
                    </span>
                    <span className="text-[10px] text-brand-gray">/ {billingCycle === 'mensal' ? 'mês' : 'mês no anual'}</span>
                  </div>
                  {billingCycle === 'anual' ? (
                    <div className="space-y-0.5 text-[10px] text-brand-gray block mt-1">
                      <p className="font-semibold text-emerald-400">Economia de R$ 79,80 por ano</p>
                      <p className="text-brand-gray/50">Cobrado anualmente: R$ 399,00/ano</p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-brand-gray/50 block mt-1">Cobrado mensalmente</p>
                  )}
                </div>

                <div className="w-full h-[1px] bg-white/5" />
                
                <ul className="space-y-2.5 text-xs text-brand-gray leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span><strong>1</strong> processo seletivo ativo</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Link de candidatura</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Recebimento de currículos</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Currículos centralizados</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Ranking por compatibilidade</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Suporte padrão</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setIsInterestModalOpen(true)}
                className="w-full mt-6 bg-white/5 text-white hover:bg-white/10 text-xs font-bold py-2.5 rounded-xl transition-all text-center cursor-pointer"
              >
                Começar agora
              </button>
            </div>

            {/* Card 2: Essencial */}
            <div className="bg-[#16161B] border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-brand-gray/60 uppercase tracking-wider block text-brand-orange-300">Batata média</span>
                  <h4 className="text-lg font-bold text-white mt-1">Essencial</h4>
                  <p className="text-xs text-brand-gray leading-relaxed mt-1.5">A ponte de valor ideal para crescer suas equipes com suporte integrado.</p>
                </div>
                
                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-brand-gray font-semibold">R$</span>
                    <span className="text-3xl font-extrabold text-white transition-all">
                      {billingCycle === 'mensal' ? '59,90' : '49,92'}
                    </span>
                    <span className="text-[10px] text-brand-gray">/ {billingCycle === 'mensal' ? 'mês' : 'mês no anual'}</span>
                  </div>
                  {billingCycle === 'anual' ? (
                    <div className="space-y-0.5 text-[10px] text-brand-gray block mt-1">
                      <p className="font-semibold text-emerald-400">Economia de R$ 119,80 por ano</p>
                      <p className="text-brand-gray/50">Cobrado anualmente: R$ 599,00/ano</p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-brand-gray/50 block mt-1">Cobrado mensalmente</p>
                  )}
                </div>

                <div className="w-full h-[1px] bg-white/5" />
                
                <ul className="space-y-2.5 text-xs text-brand-gray leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Até <strong>4</strong> processos seletivos ativos</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Links de candidatura por processo</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Recebimento de currículos</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Currículos centralizados</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Ranking por compatibilidade</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Suporte padrão</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setIsInterestModalOpen(true)}
                className="w-full mt-6 bg-white/5 text-white hover:bg-white/10 text-xs font-bold py-2.5 rounded-xl transition-all text-center cursor-pointer"
              >
                Começar agora
              </button>
            </div>

            {/* Card 3: Avançado (Recommended Highlight) */}
            <div className="bg-[#1A1A22] border-2 border-brand-orange-500/50 p-6 rounded-2xl flex flex-col justify-between hover:border-brand-orange-500/70 transition-all duration-300 relative group shadow-xl shadow-brand-orange-500/5">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF8A00] text-black text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Recomendado
              </div>
              
              <div className="space-y-4 pt-1">
                <div>
                  <span className="text-[9px] font-bold text-brand-orange-400 uppercase tracking-wider block">Melhor Custo-Benefício</span>
                  <h4 className="text-lg font-bold text-white mt-1">Avançado</h4>
                  <p className="text-xs text-brand-gray leading-relaxed mt-1.5">Para corporações dinâmicas que buscam velocidade e triagem otimizada.</p>
                </div>
                
                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-brand-gray font-semibold">R$</span>
                    <span className="text-3xl font-extrabold text-white transition-all">
                      {billingCycle === 'mensal' ? '129,90' : '108,25'}
                    </span>
                    <span className="text-[10px] text-brand-gray">/ {billingCycle === 'mensal' ? 'mês' : 'mês no anual'}</span>
                  </div>
                  {billingCycle === 'anual' ? (
                    <div className="space-y-0.5 text-[10px] text-brand-gray block mt-1">
                      <p className="font-semibold text-emerald-400">Economia de R$ 259,80 por ano</p>
                      <p className="text-brand-gray/50">Cobrado anualmente: R$ 1.299,00/ano</p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-brand-gray/50 block mt-1">Cobrado mensalmente</p>
                  )}
                </div>

                <div className="w-full h-[1px] bg-white/10" />
                
                <ul className="space-y-2.5 text-xs text-white/90 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span>Até <strong>20</strong> processos seletivos ativos</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span>Links de candidatura por processo</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span>Recebimento de currículos</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span>Currículos centralizados</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span>Ranking por compatibilidade</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span>Atendimento prioritário</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span><strong>Melhor custo por processo ativo</strong></span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setIsInterestModalOpen(true)}
                className="w-full mt-6 bg-brand-gradient text-white text-xs font-bold py-2.5 rounded-xl hover:shadow-lg hover:shadow-brand-orange-500/10 active:scale-98 transition-all text-center cursor-pointer"
              >
                Começar agora
              </button>
            </div>

            {/* Card 4: Profissional */}
            <div className="bg-[#16161B] border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-brand-gray/60 uppercase tracking-wider block">Alto volume</span>
                  <h4 className="text-lg font-bold text-white mt-1">Profissional</h4>
                  <p className="text-xs text-brand-gray leading-relaxed mt-1.5">Governança absoluta e suporte robusto para escala industrial de admissões.</p>
                </div>
                
                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-brand-gray font-semibold">R$</span>
                    <span className="text-3xl font-extrabold text-white transition-all">
                      {billingCycle === 'mensal' ? '499,90' : '416,58'}
                    </span>
                    <span className="text-[10px] text-brand-gray">/ {billingCycle === 'mensal' ? 'mês' : 'mês no anual'}</span>
                  </div>
                  {billingCycle === 'anual' ? (
                    <div className="space-y-0.5 text-[10px] text-brand-gray block mt-1">
                      <p className="font-semibold text-emerald-400">Economia de R$ 999,80 por ano</p>
                      <p className="text-brand-gray/50">Cobrado anualmente: R$ 4.999,00/ano</p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-brand-gray/50 block mt-1">Cobrado mensalmente</p>
                  )}
                </div>

                <div className="w-full h-[1px] bg-white/5" />
                
                <ul className="space-y-2.5 text-xs text-brand-gray leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Até <strong>150</strong> processos seletivos ativos</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Links de candidatura por processo</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Recebimento de currículos</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Currículos centralizados</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Ranking por compatibilidade</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Atendimento prioritário</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Alto volume de processos simultâneos</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setIsInterestModalOpen(true)}
                className="w-full mt-6 bg-white/5 text-white hover:bg-white/10 text-xs font-bold py-2.5 rounded-xl transition-all text-center cursor-pointer"
              >
                Contate-nos
              </button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQAccordion />

      </main>

      {/* FOOTER: Matching image 3 slogan and visual guidelines */}
      <footer className="bg-[#09090C] border-t border-white/5 py-12 lg:py-16 text-xs text-brand-gray relative">
        <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/5">
            <div>
              <Logo size="md" className="mb-3" />
              {/* BRAND SLOGAN EXACT FROM IMAGE 3 */}
              <p className="text-[11px] text-brand-gray/80 max-w-sm">
                O próximo grande salto no recrutamento online corporativo.
              </p>
            </div>

            {/* Quick columns links */}
            <div className="flex items-center gap-8 text-[11px]">
              <a href="#solucoes" className="hover:text-white transition-colors">Termos de Serviço</a>
              <a href="#recursos" className="hover:text-white transition-colors">Políticas de Segurança de Dados</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-brand-gray/50 font-mono">
            <p>© 2026 meuprocessoseletivo.com. Todos os direitos reservados. Projeto em desenvolvimento de plataforma online.</p>
            <p>Conformidade estrita com a LGPD • Belo Horizonte, MG</p>
          </div>
        </div>
      </footer>

      {/* Interactive Demonstration Request Modal */}
      <AnimatePresence>
        {isInterestModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsInterestModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-[#16161B] border border-white/10 rounded-2xl p-6 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button 
                type="button"
                onClick={() => setIsInterestModalOpen(false)}
                className="absolute top-4 right-4 text-brand-gray hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
               <div className="text-center">
                  <Logo size="md" className="mx-auto mb-2" />
                  <h3 className="text-base font-bold text-white">Contate-nos</h3>
                  <p className="text-[11px] text-brand-gray mt-1">Informe seu e-mail corporativo para entrarmos em contato.</p>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShowInterestToast(true);
                    setTimeout(() => setShowInterestToast(false), 4000);
                    setIsInterestModalOpen(false);
                  }}
                  className="space-y-3.5"
                >
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-white uppercase tracking-wider block">E-mail Corporativo</label>
                    <input 
                      type="email"
                      required
                      placeholder="exemplo@empresa.com"
                      value={interestEmail}
                      onChange={(e) => setInterestEmail(e.target.value)}
                      className="w-full bg-[#0E0D14] border border-white/10 focus:border-brand-orange-500/40 text-xs text-white rounded-xl py-2 px-3 focus:outline-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-gradient text-white text-xs font-bold py-2.5 rounded-xl hover:opacity-95 active:scale-98 transition-all cursor-pointer shadow-md mt-2"
                  >
                    Confirmar contato
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm bg-[#16161B] border border-white/10 rounded-2xl p-6 shadow-2xl z-10"
            >
              {/* Close Button */}
              <button 
                type="button"
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 text-brand-gray hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                <div className="text-center">
                  <Logo size="md" className="mx-auto mb-2" />
                  <h3 className="text-base font-bold text-white">Acesse o seu Painel</h3>
                  <p className="text-[11px] text-brand-gray mt-1">Insira suas credenciais corporativas registradas.</p>
                </div>

                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShowLoginToast(true);
                    setTimeout(() => setShowLoginToast(false), 4000);
                    setIsLoginModalOpen(false);
                  }}
                  className="space-y-3.5"
                >
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-white uppercase tracking-wider block">E-mail Corporativo / Login</label>
                    <input 
                      type="email"
                      required
                      placeholder="exemplo@empresa.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-[#0E0D14] border border-white/10 focus:border-brand-orange-500/40 text-xs text-white rounded-xl py-2 px-3 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-white uppercase tracking-wider block">Senha de Acesso</label>
                    <input 
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-[#0E0D14] border border-white/10 focus:border-brand-orange-500/40 text-xs text-white rounded-xl py-2 px-3 focus:outline-none"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-brand-gradient text-white text-xs font-bold py-2.5 rounded-xl hover:opacity-95 active:scale-98 transition-all cursor-pointer shadow-md mt-2"
                  >
                    Entrar na Plataforma
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Demonstration Success Dynamic Toast */}
      {showInterestToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16161B] border border-green-500/30 text-white px-4.5 py-3 rounded-xl shadow-xl flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold">Contato solicitado com sucesso para: <strong className="text-brand-orange-400">{interestEmail || 'seu e-mail'}</strong>!</span>
        </div>
      )}

      {/* Login success dynamic Toast */}
      {showLoginToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#16161B] border border-green-500/30 text-white px-4.5 py-3 rounded-xl shadow-xl flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold">Conectado com sucesso como: <strong className="text-brand-orange-400">{loginEmail}</strong>!</span>
        </div>
      )}

    </div>
  );
}
