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
  ChevronRight
} from 'lucide-react';

import Logo from './components/Logo';
import logoImg from './logo.png';
import DeviceMockup from './components/DeviceMockup';
import FeatureBento from './components/FeatureBento';
import FAQAccordion from './components/FAQAccordion';

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

  const PROFILES_BENEFITS = {
    recrutadores: [
      { id: 1, title: 'Triagem Portátil Inteligente', text: 'Analise candidatos de qualquer lugar direto na tela do seu celular Android.' },
      { id: 2, title: 'Notificações Push Instantâneas', text: 'Seja avisado sobre novos matches de candidatos e notas de testes na hora.' },
      { id: 3, title: 'Kanban Dedicado Touch', text: 'Arraste e solte com o dedo para mover candidatos de fases nativamente.' },
    ],
    candidatos: [
      { id: 1, title: 'Acompanhamento Portátil', text: 'Atualizações rápidas do status de aplicação e feedbacks diretos no celular.' },
      { id: 2, title: 'Testes Otimizados para Celular', text: 'Responda questionários técnicos diretamente no navegador do smartphone sem complicações.' },
      { id: 3, title: 'Agendamentos Rápidos', text: 'Selecione e sincronize horários de entrevistas virtuais com um simples toque.' },
    ]
  };

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
                  src={logoImg} 
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
              <a href="#recursos" className="text-[16px] font-bold text-brand-gray hover:text-white transition-colors">Produtos</a>
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
            <a href="#recursos" onClick={() => setMobileMenuOpen(false)} className="text-[16px] font-bold text-brand-gray hover:text-white transition-colors block py-2 w-full">Produtos</a>
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
                onClick={() => setIsInterestModalOpen(true)}
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

        {/* PROOF SECTION: Brand Identity graphics & Logos matching Image 3 */}
        <section id="solucoes" className="py-12 bg-transparent">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <h2 className="text-[11px] font-bold text-[#FFAE2B] uppercase tracking-widest">A Revolução do Recrutamento Online</h2>
            <p className="text-xl lg:text-2xl font-bold tracking-tight text-white">Disponível em Qualquer Dispositivo</p>
            <p className="text-xs text-brand-gray">Nossa tecnologia empodera recrutadores, gestores e candidatos com inteligência de ponta a ponta, reduzindo drasticamente o tempo offline.</p>
          </div>

          {/* Split profile view (Recrutadores vs Candidatos) */}
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {/* Tab Swappers */}
            <div className="flex justify-center border-b border-white/5 p-1 max-w-sm mx-auto w-full bg-[#1A1A1F] rounded-xl self-center">
              <button 
                onClick={() => setActiveTab('recrutadores')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'recrutadores' 
                    ? 'bg-brand-gradient text-white shadow-md' 
                    : 'text-brand-gray hover:text-white'
                }`}
              >
                Para Recrutadores (RH)
              </button>
              <button 
                onClick={() => setActiveTab('candidatos')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'candidatos' 
                    ? 'bg-brand-gradient text-white shadow-md' 
                    : 'text-brand-gray hover:text-white'
                }`}
              >
                Para Candidatos
              </button>
            </div>

            {/* Tab content view with cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
              <AnimatePresence mode="wait">
                {PROFILES_BENEFITS[activeTab].map((benefit, index) => (
                  <motion.div 
                    key={benefit.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, delay: index * 0.08 }}
                    className="bg-[#1A1A1F] p-5.5 rounded-2xl border border-white/5 hover:border-brand-orange-500/10 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-8 h-8 rounded-lg bg-brand-orange-500/5 border border-brand-orange-500/15 flex items-center justify-center text-brand-orange-400 mb-3 text-xs font-bold font-sans">
                        0{index + 1}
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">{benefit.title}</h4>
                      <p className="text-[11px] leading-relaxed text-brand-gray">{benefit.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* BENTO GRID: Core Features Section */}
        <section id="recursos" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-bold text-[#FFAE2B] uppercase tracking-widest block">Destaques do Sistema</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Recrute e qualifique <span className="text-brand-gradient">com agilidade integrada</span>
            </h2>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed max-w-xl mx-auto">
              Experimente a produtividade simplificada. Nosso sistema online concentra todas as requisições de vagas, ranqueamento de candidatos e painéis rápidos de controle no seu navegador.
            </p>
          </div>

          <FeatureBento />
        </section>

        {/* SECTION: Planos e Preços */}
        <section id="precos" className="space-y-12 py-12 border-t border-white/5 relative z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-orange-500/2 to-transparent pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-[11px] font-bold text-[#FFAE2B] uppercase tracking-widest block">INVESTIMENTO INTELIGENTE</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Planos Simples e Transparentes</h2>
            <p className="text-xs sm:text-sm text-brand-gray leading-relaxed max-w-lg mx-auto">Encontre a modalidade perfeita para a sua escala de contratações. Mude de plano a qualquer momento.</p>
            
            {/* Beautiful Billing Cycle Toggle */}
            <div className="flex items-center justify-center gap-3 pt-4 select-none">
              <button
                type="button"
                onClick={() => setBillingCycle('mensal')}
                className={`px-4.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  billingCycle === 'mensal' 
                    ? 'bg-white/10 text-white shadow-inner border border-white/10' 
                    : 'text-brand-gray hover:text-white'
                }`}
              >
                Cobrança Mensal
              </button>
              
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setBillingCycle('anual')}
                  className={`px-4.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                    billingCycle === 'anual' 
                      ? 'bg-brand-gradient text-white shadow-lg' 
                      : 'text-brand-gray hover:text-white'
                  }`}
                >
                  Cobrança Anual
                  <span className="bg-white/20 text-[9px] px-1.5 py-0.5 rounded-full font-bold text-white tracking-wide">
                    Até R$ 39/m de desconto
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* 4 pricing cards layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Card 1: Plano Base */}
            <div className="bg-[#16161B] border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-brand-gray/60 uppercase tracking-wider block">Ideal para começar</span>
                  <h4 className="text-lg font-bold text-white mt-1">Plano Base</h4>
                  <p className="text-xs text-brand-gray leading-relaxed mt-1.5">Estrutura básica de painéis de seleção para pequenas empresas.</p>
                </div>
                
                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-brand-gray font-semibold">R$</span>
                    <span className="text-3xl font-extrabold text-white transition-all">
                      {billingCycle === 'mensal' ? '32,00' : '29,90'}
                    </span>
                    <span className="text-[10px] text-brand-gray">/ {billingCycle === 'mensal' ? 'mês' : 'mês no anual'}</span>
                  </div>
                  {billingCycle === 'anual' && (
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Economia de R$ 25,20 por ano</span>
                  )}
                </div>

                <div className="w-full h-[1px] bg-white/5" />
                
                <ul className="space-y-2 text-xs text-brand-gray leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span><strong>1</strong> conta de recrutador integrada</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Até <strong>5</strong> vagas ativas simultâneas</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Triagem básica no painel de seleção</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Download de relatórios básicos</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Suporte em horário comercial</span>
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

            {/* Card 2: Plano Avançado */}
            <div className="bg-[#16161B] border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-brand-gray/60 uppercase tracking-wider block">Contratação ágil</span>
                  <h4 className="text-lg font-bold text-white mt-1">Plano Avançado</h4>
                  <p className="text-xs text-brand-gray leading-relaxed mt-1.5">Automatize respostas e organize pipelines em equipe integrada.</p>
                </div>
                
                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-brand-gray font-semibold">R$</span>
                    <span className="text-3xl font-extrabold text-white transition-all">
                      {billingCycle === 'mensal' ? '57,90' : '49,90'}
                    </span>
                    <span className="text-[10px] text-brand-gray">/ {billingCycle === 'mensal' ? 'mês' : 'mês no anual'}</span>
                  </div>
                  {billingCycle === 'anual' && (
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Economia de R$ 96,00 por ano</span>
                  )}
                </div>

                <div className="w-full h-[1px] bg-white/5" />
                
                <ul className="space-y-2 text-xs text-brand-gray leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Até <strong>3</strong> contas de recrutador</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Até <strong>15</strong> vagas ativas simultâneas</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Kanban completo e fluxo interativo</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Integração com portais de recrutamento</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Disparo automatizado de alertas de vagas</span>
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

            {/* Card 3: Plano Premium (Recommended Accent) */}
            <div className="bg-[#1A1A22] border-2 border-brand-orange-500/40 p-6 rounded-2xl flex flex-col justify-between hover:border-brand-orange-500/60 transition-all duration-300 relative group shadow-xl shadow-brand-orange-500/5">
              <div className="absolute top-0 right-0 bg-[#FF8A00] text-black text-[9px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Recomendado
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-brand-orange-400 uppercase tracking-wider block">Eficiência completa de RH</span>
                  <h4 className="text-lg font-bold text-white mt-1">Plano Premium</h4>
                  <p className="text-xs text-brand-gray leading-relaxed mt-1.5">Ideal para times de recursos humanos que precisam de análise de IA para triagem.</p>
                </div>
                
                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-brand-gray font-semibold">R$</span>
                    <span className="text-3xl font-extrabold text-white transition-all">
                      {billingCycle === 'mensal' ? '129,90' : '112,90'}
                    </span>
                    <span className="text-[10px] text-brand-gray">/ {billingCycle === 'mensal' ? 'mês' : 'mês no anual'}</span>
                  </div>
                  {billingCycle === 'anual' && (
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Economia de R$ 204,00 por ano</span>
                  )}
                </div>

                <div className="w-full h-[1px] bg-white/10" />
                
                <ul className="space-y-2 text-xs text-white/90 leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span>Contas e vagas <strong>ilimitadas</strong></span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span><strong>Selo de Triagem com IA integrado</strong></span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span>Métricas de BI dinâmicas e desempenho</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span>Agendamento inteligente compartilhado</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#FFAE2B] shrink-0 mt-0.5" />
                    <span>Suporte dedicado prioritário 24/7</span>
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

            {/* Card 4: Plano Master */}
            <div className="bg-[#16161B] border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-all duration-300 relative group">
              <div className="space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-brand-gray/60 uppercase tracking-wider block">Grandes corporações</span>
                  <h4 className="text-lg font-bold text-white mt-1">Plano Master</h4>
                  <p className="text-xs text-brand-gray leading-relaxed mt-1.5">Relatórios personalizados sob demanda, Whitelabel e governança.</p>
                </div>
                
                <div className="py-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-brand-gray font-semibold">R$</span>
                    <span className="text-3xl font-extrabold text-white transition-all">
                      {billingCycle === 'mensal' ? '459,90' : '420,90'}
                    </span>
                    <span className="text-[10px] text-brand-gray">/ {billingCycle === 'mensal' ? 'mês' : 'mês no anual'}</span>
                  </div>
                  {billingCycle === 'anual' && (
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Economia de R$ 468,00 por ano</span>
                  )}
                </div>

                <div className="w-full h-[1px] bg-white/5" />
                
                <ul className="space-y-2 text-xs text-brand-gray leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Whitelabel exclusivo (custom branding)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Ambiente integrado dedicado na nuvem</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Suporte via telefone & WhatsApp do gerente</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Apoio de segurança específico & LGPD</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-brand-orange-400/80 shrink-0 mt-0.5" />
                    <span>Treinamento trimestral para o time</span>
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
