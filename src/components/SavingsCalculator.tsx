import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Hourglass, TrendingUp, DollarSign, Wallet } from 'lucide-react';

export default function SavingsCalculator() {
  const [hiresPerMonth, setHiresPerMonth] = useState<number>(5);
  const [recruiterHourlyRate, setRecruiterHourlyRate] = useState<number>(45);
  const [averageApplicantsPerVaga, setAverageApplicantsPerVaga] = useState<number>(120);
  
  // Calculations
  const [weeklyHoursSaved, setWeeklyHoursSaved] = useState<number>(0);
  const [monthlySavings, setMonthlySavings] = useState<number>(0);
  const [annualSavings, setAnnualSavings] = useState<number>(0);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  useEffect(() => {
    setIsCalculating(true);
    const timer = setTimeout(() => {
      // 1 hire averages:
      // - 15 hours screening resume (old manual way) -> 1.5 hours in meuprocessoseletivo.com
      // - 8 hours scheduling and emailing -> 1 hour in meuprocessoseletivo.com
      // - 12 hours qualification and primary triage -> 2 hours in meuprocessoseletivo.com
      // Total hours saved per hire: approx 30.5 hours!
      
      const hoursSavedPerHire = 28; 
      const totalHoursSavedPerMonth = hiresPerMonth * hoursSavedPerHire;
      const weeklyHours = Math.round((totalHoursSavedPerMonth / 4.333) * 10) / 10;
      const cachedMonthlySavings = totalHoursSavedPerMonth * recruiterHourlyRate;
      const cachedAnnualSavings = cachedMonthlySavings * 12;

      setWeeklyHoursSaved(weeklyHours);
      setMonthlySavings(cachedMonthlySavings);
      setAnnualSavings(cachedAnnualSavings);
      setIsCalculating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [hiresPerMonth, recruiterHourlyRate, averageApplicantsPerVaga]);

  return (
    <div id="savings-calculator-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      
      {/* Inputs Column */}
      <div className="lg:col-span-5 bg-[#1A1A1F] p-6 lg:p-7 rounded-2xl border border-white/5 space-y-6">
        <div>
          <span className="text-[11px] font-bold text-[#FFAE2B] uppercase tracking-wider block mb-1">Simulador de Benefícios</span>
          <h3 className="text-xl font-bold text-white tracking-tight">Calcule o Retorno Financeiro</h3>
          <p className="text-xs text-brand-gray mt-1 leading-relaxed">Sua empresa ganha produtividade automatizando envios, testes e triagem inteligente.</p>
        </div>

        {/* Input Hires per month */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-white">Contratações por mês:</label>
            <span className="text-sm font-bold text-brand-orange-400 font-sans">{hiresPerMonth} vagas</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="40" 
            value={hiresPerMonth} 
            onChange={(e) => setHiresPerMonth(Number(e.target.value))}
            className="w-full accent-brand-orange-500 h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-brand-gray/50">
            <span>1 contratação</span>
            <span>40 vagas/mês</span>
          </div>
        </div>

        {/* Input Hour Cost */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-white">Custo estimado hora/recrutador (R$):</label>
            <span className="text-sm font-bold text-brand-orange-400 font-sans">R$ {recruiterHourlyRate}/h</span>
          </div>
          <input 
            type="range" 
            min="25" 
            max="150" 
            value={recruiterHourlyRate} 
            onChange={(e) => setRecruiterHourlyRate(Number(e.target.value))}
            className="w-full accent-brand-orange-500 h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-brand-gray/50">
            <span>R$ 25/h (júnior)</span>
            <span>R$ 150/h (Sênior/Consultor)</span>
          </div>
        </div>

        {/* Average applicants */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-white">Candidatos por processo (média):</label>
            <span className="text-sm font-bold text-brand-orange-400 font-sans">{averageApplicantsPerVaga} cand.</span>
          </div>
          <input 
            type="range" 
            min="30" 
            max="400" 
            value={averageApplicantsPerVaga} 
            onChange={(e) => setAverageApplicantsPerVaga(Number(e.target.value))}
            className="w-full accent-brand-orange-500 h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-brand-gray/50">
            <span>30 inscritos</span>
            <span>400 inscritos</span>
          </div>
        </div>
      </div>

      {/* Results Column */}
      <div className="lg:col-span-7 bg-[#121216] p-6 lg:p-8 rounded-2xl border border-white/5 flex flex-col justify-between h-full min-h-[380px] relative overflow-hidden">
        
        {/* Subtle Decorative Gradient background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-brand-orange-400 fill-brand-orange-400/10" />
            <h4 className="text-xs font-bold text-brand-gray uppercase tracking-widest">RESULTADO ESTIMADO</h4>
          </div>

          <div id="calculator-results-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 mb-6 border-b border-white/5">
            {/* Hours Saved Card */}
            <div className="bg-[#1A1A1F] p-4.5 rounded-xl border border-white/5 relative">
              <div className="flex items-center gap-2.5 mb-1 text-brand-gray font-medium">
                <Hourglass className="w-4 h-4 text-brand-orange-300" />
                <span className="text-xs">Tempo Recuperado</span>
              </div>
              <p className="text-2xl font-bold text-white tracking-tight leading-none mt-1.5">
                {isCalculating ? '...' : `${weeklyHoursSaved}h`}
              </p>
              <span className="text-[10px] text-brand-gray/80 block mt-1">recuperadas por semana</span>
            </div>

            {/* Monthly Economy Card */}
            <div className="bg-[#1A1A1F] p-4.5 rounded-xl border border-white/5 relative">
              <div className="flex items-center gap-2.5 mb-1 text-brand-gray font-medium">
                <Wallet className="w-4 h-4 text-brand-orange-300" />
                <span className="text-xs">Economia Mensal</span>
              </div>
              <p className="text-2xl font-bold text-white tracking-tight leading-none mt-1.5">
                {isCalculating ? '...' : `R$ ${monthlySavings.toLocaleString('pt-BR')}`}
              </p>
              <span className="text-[10px] uppercase text-green-400 font-semibold block mt-1">Economia real</span>
            </div>
          </div>

          {/* Grand Highlight Annual Savings */}
          <div className="bg-brand-orange-500/5 border border-brand-orange-500/20 p-5 rounded-xl text-center relative mb-6">
            <h5 className="text-[10px] font-bold text-brand-orange-400 uppercase tracking-widest mb-1">ECONOMIA ANUAL ESTIMADA</h5>
            <div className="relative inline-block">
              <span className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-sans">
                R$ {annualSavings.toLocaleString('pt-BR')}  
              </span>
              <span className="absolute -top-1 -right-4 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange-500"></span>
              </span>
            </div>
            <p className="text-xs text-brand-gray mt-1 max-w-sm mx-auto">Equivale a economizar {(hiresPerMonth * 28 * 12).toLocaleString('pt-BR')} horas de digitação e triagem repetitiva por ano.</p>
          </div>
        </div>

        {/* Explanatory footer text */}
        <div className="text-[11px] text-brand-gray/70 leading-relaxed bg-[#1A1A1F] p-3 rounded-lg border border-white/5 relative z-10">
          💡 <strong>Como calculamos?</strong> O nosso sistema online elimina 85% do tempo de triagem manual utilizando score automatizado e testes unificados, o que reduz o esforço médio administrativo por vaga de 32h para apenas 4h.
        </div>
      </div>
    </div>
  );
}
