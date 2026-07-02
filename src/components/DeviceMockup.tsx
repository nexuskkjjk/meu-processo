import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  Calendar, 
  Search, 
  LogOut, 
  Share2, 
  Plus, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  LayoutDashboard,
  FilePlus,
  PlayCircle,
  Archive,
  Layers,
  Building,
  CalendarDays,
  ChevronDown
} from 'lucide-react';
import logoImg from '../3.png';

// Define the shape of a job item in the live interactive mockup
interface JobItem {
  id: string;
  title: string;
  date: string;
  candidates: number;
  days: number;
  status: 'aberto' | 'encerrado';
  score: number;
}

export default function DeviceMockup() {
  const [activeTab, setActiveTab] = useState<'todos' | 'aberto' | 'encerrado'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedJobId, setCopiedJobId] = useState<string | null>(null);

  // Original dataset matching the real screenshot
  const initialJobs: JobItem[] = [
    {
      id: '1',
      title: 'Desenvolvedor Frontend Sênior',
      date: 'Criada em 15/04/2025',
      candidates: 42,
      days: 18,
      status: 'aberto',
      score: 84
    },
    {
      id: '2',
      title: 'Analista de Marketing Pleno',
      date: 'Criada em 10/04/2025',
      candidates: 28,
      days: 12,
      status: 'aberto',
      score: 72
    },
    {
      id: '3',
      title: 'Assistente Administrativo',
      date: 'Criada em 05/04/2025',
      candidates: 35,
      days: 9,
      status: 'aberto',
      score: 68
    },
    {
      id: '4',
      title: 'Designer UI/UX Pleno',
      date: 'Criada em 01/04/2025',
      candidates: 31,
      days: 7,
      status: 'aberto',
      score: 79
    },
    {
      id: '5',
      title: 'Analista de Dados Jr.',
      date: 'Criada em 28/03/2025',
      candidates: 22,
      days: 5,
      status: 'encerrado',
      score: 66
    }
  ];

  // Filters the jobs dynamically based on interactive click states
  const filteredJobs = initialJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'todos' || job.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleShareClick = (jobId: string, jobTitle: string) => {
    setCopiedJobId(jobId);
    // Auto-clear toast after 2 seconds
    setTimeout(() => {
      setCopiedJobId(null);
    }, 2000);
  };

  return (
    <div 
      id="device-pc-mockup-frame" 
      className="relative w-full aspect-[1.55] max-w-[720px] sm:max-w-[780px] lg:max-w-[850px] mx-auto select-none rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-[#0A090F] flex transition-all duration-300 hover:shadow-brand-orange-500/10 hover:border-white/15"
    >
      {/* Background orange laser glow inside the frame */}
      <div className="absolute inset-0 -m-8 bg-brand-orange-500/[0.03] blur-[80px] rounded-full pointer-events-none" />

      {/* 1. DARK SIDEBAR (Left side, 28% of square width) */}
      <aside className="w-[28%] bg-[#0B0A11] border-r border-white/5 flex flex-col justify-between p-2.5 sm:p-4 text-[9px] sm:text-[11px] text-[#86858E] shrink-0 z-10">
        
        {/* Brand Header */}
        <div className="space-y-4">
          <div className="flex items-center select-none -ml-1.5 sm:-ml-2 px-1 py-1">
            <img 
              src={logoImg} 
              alt="Logo" 
              className="h-9 sm:h-11 w-auto object-contain shrink-0 relative z-0" 
            />
            <span className="-ml-5 sm:-ml-6.5 relative z-10 font-extrabold tracking-tight text-white leading-none font-sans text-[7.5px] xs:text-[9.5px] sm:text-[10.5px] md:text-[11px] flex items-center">
              meuprocessoseletivo<span className="text-brand-orange-400">.com</span>
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 sm:space-y-1.5">
            {/* Active item */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:py-2 rounded-lg bg-white/5 text-white font-semibold border-l-2 border-brand-orange-500">
              <LayoutDashboard size={11} className="text-brand-orange-400 shrink-0" />
              <span className="truncate">Dashboard</span>
            </div>

            {/* Title category */}
            <div className="text-[7px] sm:text-[9px] uppercase tracking-wider text-white/30 font-bold pt-2 px-2.5">
              Processos Seletivos
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:py-2 rounded-lg hover:bg-white/[0.03] hover:text-white transition-colors cursor-pointer">
              <Plus size={11} className="shrink-0" />
              <span className="truncate">Criar Processo</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:py-2 rounded-lg hover:bg-white/[0.03] hover:text-white transition-colors cursor-pointer">
              <PlayCircle size={11} className="shrink-0" />
              <span className="truncate">Processos Ativos</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:py-2 rounded-lg hover:bg-white/[0.03] hover:text-white transition-colors cursor-pointer">
              <Archive size={11} className="shrink-0" />
              <span className="truncate">Processos Encerrados</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:py-2 rounded-lg hover:bg-white/[0.03] hover:text-white transition-colors cursor-pointer">
              <Layers size={11} className="shrink-0" />
              <span className="truncate">Processo com Etapas</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:py-2 rounded-lg hover:bg-white/[0.03] hover:text-white transition-colors cursor-pointer">
              <Building size={11} className="shrink-0" />
              <span className="truncate">Empresas</span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:py-2 rounded-lg hover:bg-white/[0.03] hover:text-white transition-colors cursor-pointer">
              <CalendarDays size={11} className="shrink-0" />
              <span className="truncate">Entrevistas</span>
            </div>
          </nav>
        </div>

        {/* Footer User Profile */}
        <div className="border-t border-white/5 pt-2.5 space-y-2">
          <div className="flex items-center justify-between gap-1.5 px-1 py-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-brand-orange-500 text-white font-black text-[9px] sm:text-[11px] flex items-center justify-center shrink-0 shadow-sm">
                N
              </div>
              <div className="min-w-0 hidden xs:block">
                <p className="font-bold text-white text-[8px] sm:text-[10px] leading-tight truncate">N6XUSkk</p>
                <p className="text-[6px] sm:text-[8px] text-brand-gray truncate">paulovictorsilva...</p>
              </div>
            </div>
            <button className="text-[#86858E] hover:text-white transition-colors">
              <LogOut size={10} className="sm:size-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* 2. LIGHT APP CONTENT (Right side, 72% of square width) */}
      <main className="flex-1 bg-[#FAFAFD] flex flex-col overflow-hidden relative z-10 text-[9px] sm:text-[11px] text-[#4A4952]">
        
        {/* Subtle dot-grid visual layer matching the background screenshot */}
        <div className="absolute inset-0 opacity-[0.45] pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#C2C1C9 1px, transparent 1px)',
          backgroundSize: '14px 14px'
        }} />

        {/* Top bar inside Mockup */}
        <header className="h-10 sm:h-12 bg-white border-b border-[#EBEBEF] flex items-center justify-between px-3.5 sm:px-4 shrink-0 relative z-10">
          <div className="relative flex items-center w-[45%]">
            <Search size={10} className="absolute left-2 text-[#9A99A2] pointer-events-none" />
            <input 
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-6.5 pr-2 py-1 text-[8px] sm:text-[10px] bg-[#F4F4F6] border-none rounded-md text-gray-800 placeholder-[#9A99A2] focus:outline-none focus:ring-1 focus:ring-brand-orange-500/30"
            />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-700 font-medium">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-orange-100 flex items-center justify-center text-brand-orange-600 font-bold text-[8px] sm:text-[10px]">
              M
            </div>
            <span className="font-semibold text-[8px] sm:text-[10px] text-gray-700">Marcelo</span>
            <ChevronDown size={10} className="text-[#9A99A2]" />
          </div>
        </header>

        {/* Core panel area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4.5 space-y-3.5 sm:space-y-4.5 relative z-10">
          
          {/* Row of 3 modern Statistics Cards */}
          <div className="grid grid-cols-3 gap-2">
            
            {/* Vagas */}
            <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-[#ECECEF] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between gap-1">
              <div className="min-w-0">
                <p className="text-[#9A99A2] text-[6px] sm:text-[8px] font-medium leading-none">Total de vagas</p>
                <p className="text-sm sm:text-lg font-extrabold text-gray-900 mt-1 leading-none">32</p>
                <p className="text-[5.5px] sm:text-[7px] text-[#A7A7AF] mt-0.5 truncate leading-none">vagas no momento</p>
              </div>
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-orange-50 flex items-center justify-center text-brand-orange-500 shrink-0">
                <Briefcase size={10} className="sm:size-3.5" />
              </div>
            </div>

            {/* Candidatos */}
            <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-[#ECECEF] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between gap-1">
              <div className="min-w-0">
                <p className="text-[#9A99A2] text-[6px] sm:text-[8px] font-medium leading-none">Total de candidatos</p>
                <p className="text-sm sm:text-lg font-extrabold text-gray-900 mt-1 leading-none">256</p>
                <p className="text-[5.5px] sm:text-[7px] text-[#A7A7AF] mt-0.5 truncate leading-none">candidatos no momento</p>
              </div>
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-orange-50 flex items-center justify-center text-brand-orange-500 shrink-0">
                <Users size={10} className="sm:size-3.5" />
              </div>
            </div>

            {/* Entrevistas */}
            <div className="bg-white p-2 sm:p-3 rounded-lg sm:rounded-xl border border-[#ECECEF] shadow-[0_1px_3px_rgba(0,0,0,0.02)] flex items-center justify-between gap-1">
              <div className="min-w-0">
                <p className="text-[#9A99A2] text-[6px] sm:text-[8px] font-medium leading-none">Entrevistas</p>
                <p className="text-sm sm:text-lg font-extrabold text-gray-900 mt-1 leading-none">18</p>
                <p className="text-[5.5px] sm:text-[7px] text-[#A7A7AF] mt-0.5 truncate leading-none">entrevistas marcadas</p>
              </div>
              <div className="w-5 h-5 sm:w-7 sm:h-7 rounded-lg bg-orange-50 flex items-center justify-center text-brand-orange-500 shrink-0">
                <Calendar size={10} className="sm:size-3.5" />
              </div>
            </div>

          </div>

          {/* Job Table Dashboard Module */}
          <div className="bg-white rounded-lg sm:rounded-xl border border-[#ECECEF] p-3 shadow-[0_2px_8px_rgba(0,0,0,0.015)] space-y-3">
            
            {/* Title & Filter Tabs Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 pb-2">
              <div>
                <h4 className="font-extrabold text-[10px] sm:text-[12px] text-gray-800 leading-tight">Vagas criadas</h4>
                <p className="text-[6.5px] sm:text-[8.5px] text-[#9A99A2]">Visão geral e monitoramento das vagas</p>
              </div>

              {/* Filtering Tabs pills */}
              <div className="flex items-center gap-1 self-start sm:self-center">
                <button 
                  onClick={() => setActiveTab('todos')}
                  className={`px-2 py-0.5 rounded text-[6.5px] sm:text-[8px] font-bold uppercase transition-all ${
                    activeTab === 'todos' 
                      ? 'bg-slate-900 text-white' 
                      : 'bg-gray-100 text-[#4A4952] hover:bg-gray-200'
                  }`}
                >
                  Todos
                </button>
                <button 
                  onClick={() => setActiveTab('aberto')}
                  className={`px-2 py-0.5 rounded text-[6.5px] sm:text-[8px] font-bold uppercase transition-all ${
                    activeTab === 'aberto' 
                      ? 'bg-brand-orange-500 text-white' 
                      : 'bg-gray-100 text-[#4A4952] hover:bg-gray-200'
                  }`}
                >
                  Abertos
                </button>
                <button 
                  onClick={() => setActiveTab('encerrado')}
                  className={`px-2 py-0.5 rounded text-[6.5px] sm:text-[8px] font-bold uppercase transition-all ${
                    activeTab === 'encerrado' 
                      ? 'bg-brand-orange-500 text-white' 
                      : 'bg-gray-100 text-[#4A4952] hover:bg-gray-200'
                  }`}
                >
                  Encerrados
                </button>
              </div>
            </div>

            {/* Simulated Table List */}
            <div className="space-y-1.5">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-6 text-gray-400 text-[8px] sm:text-[10px] flex flex-col items-center justify-center gap-1 bg-gray-50/50 rounded-lg">
                  <AlertCircle size={14} className="text-gray-300" />
                  Nenhuma vaga correspondente encontrada
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="flex items-center justify-between p-2 rounded-lg border border-[#F0F0F4] bg-[#FCFCFD] hover:bg-white hover:shadow-sm hover:border-[#E4E4E9] transition-all duration-200"
                  >
                    {/* Column 1: Title & Created Date */}
                    <div className="flex items-start gap-1.5 max-w-[45%]">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 ${
                        job.status === 'aberto' ? 'bg-emerald-500' : 'bg-rose-400'
                      }`} />
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-[8px] sm:text-[10.5px] truncate leading-tight">{job.title}</p>
                        <p className="text-[6.5px] sm:text-[8px] text-[#9A99A2] mt-0.5">{job.date}</p>
                      </div>
                    </div>

                    {/* Column 2: Candidates Count */}
                    <div className="text-center">
                      <p className="font-extrabold text-gray-800 text-[8.5px] sm:text-[10.5px] leading-tight">{job.candidates}</p>
                      <p className="text-[6.5px] sm:text-[7.5px] text-[#A7A7AF]">candidatos</p>
                    </div>

                    {/* Column 3: Days Active */}
                    <div className="text-center hidden xs:block">
                      <p className="font-bold text-gray-800 text-[8.5px] sm:text-[10.5px] leading-tight">{job.days} dias</p>
                      <p className="text-[6.5px] sm:text-[7.5px] text-[#A7A7AF]">em andamento</p>
                    </div>

                    {/* Column 4: Custom Circular Score display */}
                    <div className="flex items-center gap-1">
                      <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-gray-100 flex items-center justify-center shrink-0">
                        {/* Orange sector simulation border */}
                        <div className="absolute inset-0 rounded-full border-2 border-brand-orange-500/20" />
                        <span className="font-extrabold text-[7.5px] sm:text-[9.5px] text-brand-orange-500 leading-none">{job.score}</span>
                      </div>
                      <div className="text-[5.5px] sm:text-[7px] text-[#A7A7AF] leading-none hidden md:block">
                        <p>Score</p>
                        <p>médio</p>
                      </div>
                    </div>

                    {/* Column 5: Actions */}
                    <div className="relative shrink-0">
                      <button 
                        onClick={() => handleShareClick(job.id, job.title)}
                        className="flex items-center gap-1 py-1 px-2 rounded bg-orange-50 hover:bg-brand-orange-500 hover:text-white text-brand-orange-500 font-bold text-[7px] sm:text-[8.5px] transition-all cursor-pointer shadow-sm shadow-orange-500/5 active:scale-95"
                      >
                        <Share2 size={8} className="sm:size-2.5 shrink-0" />
                        <span>Compartilhar link</span>
                      </button>

                      {/* Micro interaction Toast Notification inside Mockup */}
                      {copiedJobId === job.id && (
                        <div className="absolute right-0 top-full mt-1 z-30 bg-emerald-950/95 border border-emerald-500/40 text-emerald-300 py-1 px-2 rounded-md shadow-lg text-[6.5px] sm:text-[8.5px] flex items-center gap-1 whitespace-nowrap animate-fade-in-up">
                          <CheckCircle2 size={8} className="text-emerald-400" />
                          <span>Link copiado!</span>
                        </div>
                      )}
                    </div>

                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
