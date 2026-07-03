import React from 'react';
import { 
  LayoutGrid, 
  PlusCircle, 
  Clock, 
  FolderLock, 
  Layers, 
  CalendarDays, 
  Search, 
  ChevronDown, 
  LogOut, 
  ChevronRight,
  FileText
} from 'lucide-react';

export default function ProductDashboardMockup() {
  const candidates = [
    {
      pos: '01',
      name: 'Mariana Costa',
      location: 'São Paulo, SP',
      compat: '96%',
      compatVal: 96,
      status: 'Entrevista',
      statusClass: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80',
    },
    {
      pos: '02',
      name: 'Lucas Ferreira',
      location: 'São Paulo, SP',
      compat: '92%',
      compatVal: 92,
      status: 'Entrevista',
      statusClass: 'bg-indigo-50 text-indigo-700 border border-indigo-100',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80',
    },
    {
      pos: '03',
      name: 'Beatriz Almeida',
      location: 'Campinas, SP',
      compat: '88%',
      compatVal: 88,
      status: 'Em análise',
      statusClass: 'bg-amber-50 text-amber-700 border border-amber-100',
      img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop&q=80',
    },
    {
      pos: '04',
      name: 'Rafael Mendes',
      location: 'São Paulo, SP',
      compat: '81%',
      compatVal: 81,
      status: 'Triagem',
      statusClass: 'bg-slate-50 text-slate-700 border border-slate-100',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&q=80',
    },
    {
      pos: '05',
      name: 'Juliana Rocha',
      location: 'Santos, SP',
      compat: '76%',
      compatVal: 76,
      status: 'Triagem',
      statusClass: 'bg-slate-50 text-slate-700 border border-slate-100',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&fit=crop&q=80',
    }
  ];

  return (
    <div className="w-full bg-[#111015] rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans">
      {/* Browser Bar */}
      <div className="bg-[#1A191E] px-4 py-2.5 flex items-center gap-2 border-b border-white/5 select-none">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="bg-[#111015]/80 text-[10px] text-brand-gray/60 px-4 py-1 rounded-md mx-auto w-64 text-center truncate border border-white/5">
          meuprocessoseletivo.com/vagas/12458
        </div>
      </div>

      <div className="flex h-[440px] sm:h-[500px] text-xs">
        {/* SIDEBAR (Dark Theme) */}
        <div className="w-40 sm:w-48 bg-[#0D0C11] p-3 flex flex-col justify-between border-r border-white/5 shrink-0">
          <div className="space-y-5">
            {/* Logo area */}
            <div className="flex items-center gap-1.5 px-1 py-1">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-brand-orange-600 to-amber-500 flex items-center justify-center">
                <Clock className="w-3 h-3 text-white" />
              </div>
              <span className="font-extrabold text-[10px] tracking-tight text-white">
                meuprocesso<span className="text-brand-orange-400">seletivo.com</span>
              </span>
            </div>

            {/* Menu Group 1 */}
            <div className="space-y-1">
              <span className="text-[8px] font-bold text-brand-gray/40 uppercase tracking-widest block px-1.5 mb-2">
                PROCESSOS SELETIVOS
              </span>
              
              <button type="button" className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] text-brand-gray/60 hover:text-white transition-colors">
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>

              <button type="button" className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] text-brand-gray/60 hover:text-white transition-colors">
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Criar Processo</span>
              </button>

              <button type="button" className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] bg-[#18171C] text-brand-orange-400 border-l-2 border-brand-orange-500 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Processos Ativos</span>
              </button>

              <button type="button" className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] text-brand-gray/60 hover:text-white transition-colors">
                <FolderLock className="w-3.5 h-3.5" />
                <span>Processos Encerrados</span>
              </button>

              <button type="button" className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] text-brand-gray/60 hover:text-white transition-colors">
                <Layers className="w-3.5 h-3.5" />
                <span>Processos com Etapas</span>
              </button>
            </div>

            {/* Menu Group 2 */}
            <div className="space-y-1">
              <span className="text-[8px] font-bold text-brand-gray/40 uppercase tracking-widest block px-1.5 mb-2">
                EMPRESA
              </span>
              
              <button type="button" className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] text-brand-gray/60 hover:text-white transition-colors">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Entrevistas</span>
              </button>
            </div>
          </div>

          {/* Profile card footer */}
          <div className="flex items-center justify-between border-t border-white/5 pt-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-brand-orange-500/10 border border-brand-orange-500/20 flex items-center justify-center text-[10px] font-bold text-brand-orange-400">
                N
              </div>
              <span className="text-[9px] text-white/80 font-medium truncate w-16">Marcelo</span>
            </div>
            <button type="button" className="text-brand-gray/40 hover:text-white transition-colors">
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* MAIN PANEL (Light Theme as requested) */}
        <div className="flex-1 bg-[#F8FAFC] p-4 sm:p-5 flex flex-col justify-between text-slate-700 overflow-hidden">
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-slate-200/60 pb-3 shrink-0">
            <div className="relative w-36 sm:w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar candidatos..." 
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-lg pl-7.5 pr-2 py-1 text-[10px] text-slate-800 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#FFFAEC] border border-brand-orange-200 flex items-center justify-center text-[9px] font-bold text-brand-orange-500 select-none">
                N
              </div>
              <span className="text-[10px] font-semibold text-slate-800">Marcelo</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 py-2 sm:py-3 flex flex-col justify-between overflow-hidden gap-2 sm:gap-3">
            {/* Title & action */}
            <div className="flex items-center justify-between shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h4 className="text-[11px] sm:text-[13px] font-bold text-slate-800 tracking-tight">
                    Analista de Marketing Pleno
                  </h4>
                </div>
                <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-slate-400">
                  <FileText className="w-2.5 h-2.5" />
                  <span>ID da vaga: 12458</span>
                </div>
              </div>
              <button 
                type="button" 
                className="border border-slate-200 text-slate-700 text-[9px] sm:text-[10px] font-bold py-1 px-2.5 rounded-lg hover:bg-slate-50 active:scale-98 transition-all flex items-center gap-1 shrink-0 bg-white shadow-xs"
              >
                <span>Ver processo</span>
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-4 gap-2 shrink-0">
              {[
                { count: '58', label: 'Total candidatos' },
                { count: '21', label: 'Em triagem' },
                { count: '12', label: 'Entrevistas' },
                { count: '5', label: 'Contratados' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-lg p-1.5 sm:p-2 text-center shadow-xs">
                  <div className="text-[13px] sm:text-[15px] font-extrabold text-slate-800 leading-tight">
                    {item.count}
                  </div>
                  <div className="text-[8px] text-slate-400 truncate leading-tight mt-0.5">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Interactive Mockup Tabs (Matching the image) */}
            <div className="flex gap-4 border-b border-slate-100 px-1 shrink-0 select-none text-[9px] sm:text-[10px] font-medium text-slate-400">
              <span className="pb-1 cursor-pointer">Resumo</span>
              <span className="pb-1 cursor-pointer text-brand-orange-500 border-b border-brand-orange-500 font-semibold">Candidatos</span>
              <span className="pb-1 cursor-pointer">Etapas</span>
              <span className="pb-1 cursor-pointer">Avaliações</span>
              <span className="pb-1 cursor-pointer">Atividades</span>
            </div>

            {/* Table Area */}
            <div className="bg-white border border-slate-100 rounded-xl flex-1 flex flex-col overflow-hidden shadow-xs">
              <div className="p-2 border-b border-slate-50 flex items-center justify-between shrink-0">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-slate-800 block">Ranking de candidatos</span>
                  <span className="text-[8px] text-slate-400 block">Ordenado por compatibilidade com a vaga</span>
                </div>
                <div className="flex items-center gap-1 border border-slate-100 rounded-md px-1.5 py-0.5 bg-slate-50 text-[8px] text-slate-500 cursor-pointer">
                  <span>Todos os candidatos</span>
                  <ChevronDown className="w-2.5 h-2.5" />
                </div>
              </div>

              {/* Candidates Grid/Rows */}
              <div className="flex-1 overflow-y-auto divide-y divide-slate-50/50 px-1.5 sm:px-2 scrollbar-thin select-none">
                {/* Table Header */}
                <div className="grid grid-cols-12 py-1 text-[8px] font-bold text-slate-400 uppercase tracking-wider sticky top-0 bg-white z-10">
                  <span className="col-span-2 text-center">POSIÇÃO</span>
                  <span className="col-span-5 pl-2">CANDIDATO</span>
                  <span className="col-span-3 text-center">COMPATIBILIDADE</span>
                  <span className="col-span-2 text-right">STATUS</span>
                </div>

                {/* Candidate row data */}
                {candidates.map((cand, idx) => (
                  <div key={idx} className="grid grid-cols-12 items-center py-1 sm:py-1.5 hover:bg-slate-50/80 rounded-md transition-colors">
                    {/* Position */}
                    <span className="col-span-2 text-center text-[10px] font-mono font-bold text-slate-500">
                      {cand.pos}
                    </span>

                    {/* Candidate Info */}
                    <div className="col-span-5 flex items-center gap-1.5 pl-2 truncate">
                      <img 
                        src={cand.img} 
                        alt={cand.name} 
                        className="w-4 sm:w-5 h-4 sm:h-5 rounded-full object-cover border border-slate-100 shrink-0"
                      />
                      <div className="truncate">
                        <span className="text-[9px] sm:text-[10px] font-semibold text-slate-700 block truncate">
                          {cand.name}
                        </span>
                        <span className="text-[7.5px] text-slate-400 block truncate leading-tight">
                          {cand.location}
                        </span>
                      </div>
                    </div>

                    {/* Compatibility Circle Progress bar */}
                    <div className="col-span-3 flex items-center justify-center">
                      <div className="relative w-6 sm:w-7 h-6 sm:h-7 flex items-center justify-center">
                        {/* Circular progress SVG */}
                        <svg className="w-full h-full transform -rotate-90">
                          <circle 
                            cx="12" 
                            cy="12" 
                            r="9" 
                            stroke="#F1F5F9" 
                            strokeWidth="1.5" 
                            fill="transparent" 
                          />
                          <circle 
                            cx="12" 
                            cy="12" 
                            r="9" 
                            stroke="#F97316" 
                            strokeWidth="1.5" 
                            fill="transparent" 
                            strokeDasharray={`${2 * Math.PI * 9}`}
                            strokeDashoffset={`${2 * Math.PI * 9 * (1 - cand.compatVal / 100)}`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <span className="absolute text-[7px] sm:text-[8px] font-bold text-brand-orange-500">
                          {cand.compatVal}%
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="col-span-2 text-right">
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[7.5px] font-medium scale-90 sm:scale-100 origin-right ${cand.statusClass}`}>
                        {cand.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* View all candidates footer trigger */}
              <div className="p-2 border-t border-slate-50 bg-slate-50/40 flex items-center justify-between shrink-0">
                <button type="button" className="text-[8.5px] font-semibold text-brand-orange-500 hover:text-brand-orange-600 transition-colors flex items-center gap-0.5">
                  <span>Ver todos os candidatos</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
