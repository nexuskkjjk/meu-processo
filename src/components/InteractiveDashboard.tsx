import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Plus, 
  Search, 
  ChevronRight, 
  CheckCircle2, 
  X, 
  SlidersHorizontal,
  ThumbsUp,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  UserCheck,
  Building2,
  HelpCircle,
  FileDown,
  Download,
  Check,
  ArrowLeft
} from 'lucide-react';
import { Candidate } from '../types';

interface RegisteredCompany {
  id: string;
  name: string;
  sector: string;
  location: string;
  jobs: { title: string; id: string }[];
}

const INITIAL_COMPANIES: RegisteredCompany[] = [
  { 
    id: 'comp-1', 
    name: 'TechSolutions Software', 
    sector: 'Tecnologia & Computação', 
    location: 'São Paulo, SP (Remoto)', 
    jobs: [
      { title: 'Desenvolvedor React Fullstack', id: 'job-1' },
      { title: 'Product Designer Senior', id: 'job-2' }
    ] 
  },
  { 
    id: 'comp-2', 
    name: 'Stark Inovação & Logística', 
    sector: 'Operações e Logística', 
    location: 'Belo Horizonte, MG (Híbrido)', 
    jobs: [
      { title: 'Analista de Growth / Tráfego', id: 'job-3' },
      { title: 'Gerente de Operações Sênior', id: 'job-4' }
    ] 
  },
  { 
    id: 'comp-3', 
    name: 'Clinica HealthCare Ltda', 
    sector: 'Saúde & Medicina', 
    location: 'Rio de Janeiro, RJ (Presencial)', 
    jobs: [
      { title: 'Analista de Recrutamento & Seleção', id: 'job-5' },
      { title: 'Gerente de Atendimento Médico', id: 'job-6' }
    ] 
  },
];

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Ana Clara Melo',
    role: 'Product Designer Senior (TechSolutions)',
    email: 'ana.clara@design.com.br',
    score: 94,
    matchStatus: 'excelente',
    status: 'entrevista',
    avatarColor: 'bg-brand-orange-500',
    avatarInitials: 'AC',
    phone: '(11) 98765-4321',
    location: 'São Paulo, SP (Híbrido)',
    appliedDate: '12 Jun 2026',
  },
  {
    id: 'cand-2',
    name: 'Bruno Santos Tech',
    role: 'Desenvolvedor React Fullstack (TechSolutions)',
    email: 'bruno.santos@tech.dev.com',
    score: 88,
    matchStatus: 'excelente',
    status: 'teste',
    avatarColor: 'bg-indigo-600',
    avatarInitials: 'BS',
    phone: '(21) 99123-4567',
    location: 'Rio de Janeiro, RJ (Remoto)',
    appliedDate: '14 Jun 2026',
  },
  {
    id: 'cand-3',
    name: 'Juliana Lima',
    role: 'Analista de Recrutamento & Seleção (HealthCare)',
    email: 'juliana.lima@rh.corp.br',
    score: 79,
    matchStatus: 'bom',
    status: 'triagem',
    avatarColor: 'bg-emerald-600',
    avatarInitials: 'JL',
    phone: '(31) 98877-6655',
    location: 'Belo Horizonte, MG (Presencial)',
    appliedDate: '15 Jun 2026',
  }
];

export default function InteractiveDashboard() {
  // Navigation Tabs: 'cadastro' (Company signup) | 'buscar' (Search companies/jobs) | 'testes' (Take test) | 'selecao' (Recruiter screen candidates)
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'cadastro' | 'buscar' | 'testes' | 'selecao'>('selecao');
  
  // Core States
  const [companies, setCompanies] = useState<RegisteredCompany[]>(INITIAL_COMPANIES);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showToast, setShowToast] = useState<string | null>(null);

  // Registration Form States
  const [newCompName, setNewCompName] = useState('');
  const [newCompSector, setNewCompSector] = useState('Tecnologia');
  const [newCompLocation, setNewCompLocation] = useState('São Paulo, SP');
  const [newCompJobsText, setNewCompJobsText] = useState('Analista Administrativo, Gerente Comercial');

  // Candidate Search Companies & Job apply flow
  const [searchTermCompany, setSearchTermCompany] = useState('');
  const [selectedJobToTest, setSelectedJobToTest] = useState<{ companyName: string; jobTitle: string } | null>({
    companyName: 'TechSolutions Software',
    jobTitle: 'Desenvolvedor React Fullstack'
  });

  // Test Quiz States
  const [testParticipantName, setTestParticipantName] = useState('');
  const [testParticipantEmail, setTestParticipantEmail] = useState('');
  const [testParticipantPhone, setTestParticipantPhone] = useState('');
  const [answer1, setAnswer1] = useState<string>('');
  const [answer2, setAnswer2] = useState<string>('');
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [generatedScore, setGeneratedScore] = useState<number | null>(null);

  const triggerToast = (message: string) => {
    setShowToast(message);
    setTimeout(() => {
      setShowToast(null);
    }, 4000);
  };

  // Move candidate status on kanban / details drawer
  const moveCandidate = (id: string, newStatus: Candidate['status']) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === id) {
        const updated = { ...c, status: newStatus };
        if (selectedCandidate && selectedCandidate.id === id) {
          setSelectedCandidate(updated);
        }
        return updated;
      }
      return c;
    }));

    const candName = candidates.find(c => c.id === id)?.name;
    const statusLabels: Record<string, string> = {
      triagem: 'Triagem Especializada',
      entrevista: 'Entrevista Agendada',
      teste: 'Aplicação de Testes',
      contratado: 'Contratado & Selecionado! 🏆',
      rejeitado: 'Arquivado temporariamente'
    };
    triggerToast(`Candidato ${candName} movido para a fase: ${statusLabels[newStatus]}!`);
  };

  // Register a new company step
  const handleRegisterCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompName.trim()) {
      triggerToast('Por favor, digite o nome da empresa.');
      return;
    }

    const jobTitles = newCompJobsText.split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (jobTitles.length === 0) {
      triggerToast('Cadastre ao menos 1 cargo disponível.');
      return;
    }

    const formattedJobs = jobTitles.map((title, idx) => ({
      title,
      id: `job-${Date.now()}-${idx}`
    }));

    const newCompany: RegisteredCompany = {
      id: `comp-${Date.now()}`,
      name: newCompName,
      sector: newCompSector,
      location: newCompLocation,
      jobs: formattedJobs,
    };

    setCompanies(prev => [newCompany, ...prev]);
    triggerToast(`🏢 Empresa ${newCompName} cadastrada com sucesso! Vagas criadas no sistema.`);
    
    // Clear Form & switch tab
    setNewCompName('');
    setNewCompJobsText('Suporte Técnico, Vendedor Interno');
    setActiveWorkspaceTab('buscar');
  };

  // Perform tests and calculate AI Score
  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testParticipantName.trim() || !testParticipantEmail.trim() || !answer1 || !answer2) {
      triggerToast('Preencha os seus dados e responda às perguntas do teste.');
      return;
    }

    // Determine a dynamic score based on answer choices
    let score = 75; // base
    if (answer1 === 'A') score += 12;
    if (answer1 === 'B') score += 6;
    if (answer2 === 'A') score += 11;
    if (answer2 === 'C') score += 5;

    // Cap at 100
    if (score > 100) score = 100;

    setGeneratedScore(score);

    // Build candidate record from submission
    const initials = testParticipantName.split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'CD';

    const colors = ['bg-indigo-600', 'bg-emerald-600', 'bg-amber-500', 'bg-rose-500', 'bg-violet-600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const jobTitleSelected = selectedJobToTest ? selectedJobToTest.jobTitle : 'Candidato de Teste';
    const compNameSelected = selectedJobToTest ? selectedJobToTest.companyName : 'Empresa Geral';

    const newCandidate: Candidate = {
      id: `cand-${Date.now()}`,
      name: testParticipantName,
      role: `${jobTitleSelected} (${compNameSelected})`,
      email: testParticipantEmail,
      score,
      matchStatus: score >= 90 ? 'excelente' : score >= 75 ? 'bom' : 'regular',
      status: 'triagem', // automatically starts at screening stage
      avatarColor: randomColor,
      avatarInitials: initials,
      phone: testParticipantPhone || '(11) 99999-8888',
      location: 'São Paulo, SP (Remoto)',
      appliedDate: 'Hoje',
    };

    // Append to recruiters state
    setCandidates(prev => [newCandidate, ...prev]);
    setTestSubmitted(true);
    triggerToast(`🎉 Teste enviado com sucesso! Nota de match de currículo/perfil calculada: ${score}%`);
  };

  // Simulation generator shortcut (adds fake candidate)
  const handleAddNewCandidateSimulated = () => {
    const names = ['Pedro Alencar', 'Camila Souza', 'Lucas Ferreira', 'Gabriela Dias'];
    const roles = ['Desenvolvedor React Fullstack', 'Product Designer Senior', 'Analista de Growth', 'Recrutador Generalista'];
    const initials = ['PA', 'CS', 'LF', 'GD'];
    const colors = ['bg-orange-600', 'bg-teal-600', 'bg-pink-600', 'bg-sky-600'];

    const randomIndex = Math.floor(Math.random() * names.length);
    const score = Math.floor(Math.random() * 25) + 75; // 75 to 99

    const newCand: Candidate = {
      id: `cand-${Date.now()}`,
      name: names[randomIndex],
      role: `${roles[randomIndex]} (Simulado)`,
      email: `${names[randomIndex].toLowerCase().replace(' ', '.')}@email.com`,
      score,
      matchStatus: score >= 90 ? 'excelente' : 'bom',
      status: 'triagem',
      avatarColor: colors[randomIndex],
      avatarInitials: initials[randomIndex],
      phone: '(11) 9' + Math.floor(10000000 + Math.random() * 90000000),
      location: 'São Paulo, SP (Híbrido)',
      appliedDate: 'Hoje',
    };

    setCandidates(prev => [newCand, ...prev]);
    triggerToast(`Novo candidato ${newCand.name} importado para a triagem inteligente!`);
  };

  // Filters for pipeline
  const filteredCandidates = candidates.filter(cand => {
    if (activeFilter !== 'todos' && cand.status !== activeFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return cand.name.toLowerCase().includes(q) || cand.role.toLowerCase().includes(q);
    }
    return true;
  });

  // Filter companies
  const filteredCompanies = companies.filter(comp => {
    if (searchTermCompany.trim() !== '') {
      const q = searchTermCompany.toLowerCase();
      return comp.name.toLowerCase().includes(q) || comp.sector.toLowerCase().includes(q) || comp.location.toLowerCase().includes(q);
    }
    return true;
  });

  // Calculate stats for Selection Tab
  const totalApplied = candidates.length;
  const inInterview = candidates.filter(c => c.status === 'entrevista').length;
  const inTest = candidates.filter(c => c.status === 'teste').length;
  const hiredCount = candidates.filter(c => c.status === 'contratado').length;

  return (
    <div id="interactive-demo-card" className="w-full bg-[#1A1A1F] rounded-2xl border border-white/5 overflow-hidden shadow-2xl relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-[#0E0D14] border border-brand-orange-500/30 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-brand-orange-500 animate-ping" />
            <span className="text-xs font-semibold">{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Frame Header - System status bar */}
      <div id="demo-mock-tabbar" className="bg-[#101014] border-b border-white/5 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30 block"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30 block"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30 block"></span>
          </div>
          <span className="text-xs font-mono text-brand-orange-400 font-bold tracking-wider">💻 SIMULADOR DE SISTEMA WEB ONLINE meuprocessoseletivo.com</span>
        </div>
        
        {/* Toggle simulation candidates */}
        {activeWorkspaceTab === 'selecao' && (
          <button 
            type="button"
            onClick={handleAddNewCandidateSimulated}
            className="flex items-center gap-1.5 bg-brand-orange-500 hover:bg-brand-orange-600 active:scale-95 transition-all text-white text-xs font-semibold py-1.5 px-3.5 rounded-lg shadow-md cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Simular Candidato
          </button>
        )}
      </div>

      {/* 4 Multi-tab workspace selector based on User Requirements */}
      <div className="bg-[#141418] border-b border-white/5 grid grid-cols-2 md:grid-cols-4 p-1.5 gap-1 text-center font-sans">
        <button
          onClick={() => setActiveWorkspaceTab('cadastro')}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-medium transition-all ${
            activeWorkspaceTab === 'cadastro' 
              ? 'bg-brand-gradient text-white shadow-lg' 
              : 'text-brand-gray/80 hover:text-white hover:bg-white/5'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span className="truncate">1. Cadastro Empresas</span>
        </button>

        <button
          onClick={() => setActiveWorkspaceTab('buscar')}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-medium transition-all ${
            activeWorkspaceTab === 'buscar' 
              ? 'bg-brand-gradient text-white shadow-lg' 
              : 'text-brand-gray/80 hover:text-white hover:bg-white/5'
          }`}
        >
          <Search className="w-4 h-4" />
          <span className="truncate">2. Buscar Empresas</span>
        </button>

        <button
          onClick={() => setActiveWorkspaceTab('testes')}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-medium transition-all relative ${
            activeWorkspaceTab === 'testes' 
              ? 'bg-brand-gradient text-white shadow-lg' 
              : 'text-brand-gray/80 hover:text-white hover:bg-white/5'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span className="truncate">3. Realizar Testes</span>
          {selectedJobToTest && (
            <span className="absolute -top-1 right-2 bg-brand-orange-500 text-[8px] text-white px-1 font-bold rounded-full border border-[#1A1A1F]">
              Vaga Ativa
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveWorkspaceTab('selecao')}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-medium transition-all ${
            activeWorkspaceTab === 'selecao' 
              ? 'bg-brand-gradient text-white shadow-lg' 
              : 'text-brand-gray/80 hover:text-white hover:bg-white/5'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span className="truncate">4. Seleção de Aprovados</span>
        </button>
      </div>

      {/* Main Container Workspace */}
      <div className="h-[520px] overflow-hidden bg-[#101014] relative">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: CADASTRO DE EMPRESA */}
          {activeWorkspaceTab === 'cadastro' && (
            <motion.div
              key="tab-cadastro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 h-full overflow-y-auto flex flex-col justify-between"
            >
              <div className="max-w-xl mx-auto w-full space-y-5">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building2 className="text-brand-orange-500 w-5 h-5" />
                    Plataforma de Cadastro de Empresas
                  </h3>
                  <p className="text-xs text-brand-gray/85 mt-1 leading-relaxed">
                    Registre a sua corporação no ambiente unificado para divulgar vagas de emprego imediatamente e aplicar nossos testes estruturados de qualificação.
                  </p>
                </div>

                <form onSubmit={handleRegisterCompany} className="space-y-4 bg-[#16161B] border border-white/5 p-5 rounded-2xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-white uppercase tracking-wider">Nome da Empresa *</label>
                      <input 
                        type="text"
                        required
                        placeholder="Ex: Stark Industries S.A."
                        value={newCompName}
                        onChange={(e) => setNewCompName(e.target.value)}
                        className="w-full bg-[#111114] border border-white/5 hover:border-white/10 focus:border-brand-orange-500/40 focus:outline-none rounded-xl py-2 px-3 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-white uppercase tracking-wider">Setor de Atuação</label>
                      <select
                        value={newCompSector}
                        onChange={(e) => setNewCompSector(e.target.value)}
                        className="w-full bg-[#111114] border border-white/5 focus:border-brand-orange-500/40 focus:outline-none rounded-xl py-2 px-3 text-xs text-white cursor-pointer"
                      >
                        <option value="Tecnologia & Software">Tecnologia & Software</option>
                        <option value="Engenharia / Automotivo">Engenharia / Automotivo</option>
                        <option value="Serviços Financeiros">Serviços Financeiros</option>
                        <option value="Saúde & Clínicas">Saúde & Clínicas</option>
                        <option value="Educação & Ensino">Educação & Ensino</option>
                        <option value="Comércio & Varejo">Comércio & Varejo</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-white uppercase tracking-wider font-sans text-left block">Cidade Sede / Modelo</label>
                      <input 
                        type="text"
                        placeholder="Ex: Belo Horizonte, MG (Remoto)"
                        value={newCompLocation}
                        onChange={(e) => setNewCompLocation(e.target.value)}
                        className="w-full bg-[#111114] border border-white/5 hover:border-white/10 focus:border-brand-orange-500/40 focus:outline-none rounded-xl py-2 px-3 text-xs text-white"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-white uppercase tracking-wider">Cargos para Contratação imediata</label>
                      <input 
                        type="text" 
                        placeholder="Ex: Desenvolvedor React Sênior, Product Manager"
                        value={newCompJobsText}
                        onChange={(e) => setNewCompJobsText(e.target.value)}
                        className="w-full bg-[#111114] border border-white/5 hover:border-white/10 focus:border-brand-orange-500/40 focus:outline-none rounded-xl py-2 px-3 text-xs text-white"
                      />
                    </div>
                  </div>

                  <p className="text-[10px] text-brand-gray/60 leading-relaxed font-sans">
                    💡 Ao se cadastrar, um painel padrão para avaliar currículos e testes baseados nas vagas acima será configurado de forma inteligente.
                  </p>

                  <div className="pt-2 flex justify-end">
                    <button 
                      type="submit"
                      className="bg-brand-gradient hover:opacity-95 text-white font-bold text-xs py-2.5 px-6 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      Cadastrar Empresa & Abrir Vagas
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </div>

              {/* Status indicator */}
              <div className="text-center text-[10px] text-brand-gray/50 border-t border-white/5 pt-3 mt-4">
                Total de Empresas Cadastradas neste teste local: <strong className="text-white">{companies.length}</strong>
              </div>
            </motion.div>
          )}

          {/* TAB 2: BUSCAR EMPRESAS */}
          {activeWorkspaceTab === 'buscar' && (
            <motion.div
              key="tab-buscar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 h-full overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Buscar Empresas Parceiras</h3>
                    <p className="text-xs text-brand-gray mt-0.5">Encontre empresas e candidate-se para realizar testes de qualificação.</p>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-brand-gray absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      placeholder="Pesquisar empresa ou setor..."
                      value={searchTermCompany}
                      onChange={(e) => setSearchTermCompany(e.target.value)}
                      className="w-full bg-[#16161B] border border-white/5 hover:border-white/10 focus:border-brand-orange-500/40 focus:outline-none rounded-xl py-1.5 px-9 text-[11px] text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCompanies.map(comp => (
                    <div key={comp.id} className="bg-[#16161B] border border-white/5 p-4.5 rounded-2xl hover:border-white/10 transition-colors flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[9px] font-bold text-brand-orange-400 bg-brand-orange-500/5 px-2 py-0.5 border border-brand-orange-500/15 rounded-full uppercase">
                              {comp.sector}
                            </span>
                            <h4 className="text-sm font-bold text-white mt-1.5">{comp.name}</h4>
                          </div>
                          <span className="text-[10px] text-brand-gray flex items-center gap-1">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {comp.location}
                          </span>
                        </div>

                        <div className="border-t border-white/5 pt-2.5 mt-2.5">
                          <p className="text-[10px] font-bold text-brand-gray uppercase tracking-wider">Selecione uma vaga para fazer o teste:</p>
                          
                          <div className="space-y-1.5 mt-2">
                            {comp.jobs.map(job => (
                              <div 
                                key={job.id} 
                                className={`flex items-center justify-between p-2 rounded-xl border transition-all text-xs ${
                                  selectedJobToTest?.jobTitle === job.title 
                                    ? 'border-brand-orange-500/30 bg-brand-orange-500/5 text-white' 
                                    : 'border-white/5 bg-[#121216] hover:bg-[#1E1E24]/80 text-brand-gray hover:text-white'
                                }`}
                              >
                                <span className="font-medium">{job.title}</span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedJobToTest({ companyName: comp.name, jobTitle: job.title });
                                    setTestSubmitted(false);
                                    setActiveWorkspaceTab('testes');
                                  }}
                                  className="text-[10px] bg-brand-orange-500 hover:bg-brand-orange-600 font-bold text-white py-1 px-2.5 rounded-lg active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  Fazer Teste <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredCompanies.length === 0 && (
                    <div className="col-span-2 text-center py-12 bg-[#16161B]/50 border border-white/5 rounded-xl">
                      <p className="text-xs text-brand-gray">Nenhuma empresa encontrada com os parâmetros pesquisados.</p>
                      <button 
                        onClick={() => setSearchTermCompany('')} 
                        className="text-brand-orange-400 text-xs mt-2 hover:underline"
                      >
                        Limpar pesquisa
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-brand-gray/70 leading-relaxed bg-[#16161B] p-2.5 rounded-xl border border-white/5 flex items-center gap-2 mt-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Os candidatos encontram sua empresa pesquisando de forma rápida, selecionam o cargo e iniciam a avaliação online.</span>
              </div>
            </motion.div>
          )}

          {/* TAB 3: REALIZAR TESTES */}
          {activeWorkspaceTab === 'testes' && (
            <motion.div
              key="tab-testes"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-5 h-full overflow-y-auto flex flex-col justify-between"
            >
              <div className="max-w-lg mx-auto w-full">
                {selectedJobToTest ? (
                  <div>
                    <div className="bg-[#16161B] border border-[#FF8A00]/20 p-4.5 rounded-2xl mb-4 text-center">
                      <span className="text-[10px] font-extrabold text-brand-orange-400 uppercase tracking-widest block">Vaga Selecionada para Avaliação</span>
                      <h4 className="text-base font-bold text-white mt-1">{selectedJobToTest.jobTitle}</h4>
                      <p className="text-xs text-brand-gray mt-0.5">Empresa: <strong>{selectedJobToTest.companyName}</strong></p>
                    </div>

                    {!testSubmitted ? (
                      <form onSubmit={handleQuizSubmit} className="space-y-4 bg-[#141419] border border-white/5 p-5 rounded-2xl">
                        
                        {/* Participant info */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-white uppercase">Seu Nome Completo *</label>
                            <input 
                              type="text" 
                              required
                              placeholder="Seu nome"
                              value={testParticipantName}
                              onChange={(e) => setTestParticipantName(e.target.value)}
                              className="w-full bg-[#111114] border border-white/5 focus:border-brand-orange-500/40 text-white rounded-xl py-1.5 px-3 text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-white uppercase">Seu E-mail *</label>
                            <input 
                              type="email" 
                              required
                              placeholder="seu@e-mail.com"
                              value={testParticipantEmail}
                              onChange={(e) => setTestParticipantEmail(e.target.value)}
                              className="w-full bg-[#111114] border border-white/5 focus:border-brand-orange-500/40 text-white rounded-xl py-1.5 px-3 text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[9px] font-bold text-white uppercase">WhatsApp / Telefone</label>
                            <input 
                              type="text" 
                              placeholder="(11) 98888-7777"
                              value={testParticipantPhone}
                              onChange={(e) => setTestParticipantPhone(e.target.value)}
                              className="w-full bg-[#111114] border border-white/5 focus:border-brand-orange-500/40 text-white rounded-xl py-1.5 px-3 text-xs"
                            />
                          </div>
                        </div>

                        {/* Question 1 */}
                        <div className="border-t border-white/5 pt-3.5 space-y-2">
                          <p className="text-[11px] font-bold text-white flex gap-1.5">
                            <span className="text-brand-orange-400">P1:</span> 
                            Como você lida com prazos extremamente curtos impostos pela diretoria?
                          </p>
                          <div className="grid grid-cols-1 gap-2">
                            <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                              answer1 === 'A' ? 'border-brand-orange-500 bg-brand-orange-500/5 text-white' : 'border-white/5 bg-[#121216] text-brand-gray hover:text-white'
                            }`}>
                              <input 
                                type="radio" 
                                name="q1" 
                                checked={answer1 === 'A'} 
                                onChange={() => setAnswer1('A')}
                                className="mt-0.5 accent-brand-orange-500 shrink-0" 
                              />
                              <span><strong>Opção A:</strong> Priorizo as tarefas cruciais que entregam valor imediato e comunico riscos cedo.</span>
                            </label>

                            <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                              answer1 === 'B' ? 'border-brand-orange-500 bg-brand-orange-500/5 text-white' : 'border-white/5 bg-[#121216] text-brand-gray hover:text-white'
                            }`}>
                              <input 
                                type="radio" 
                                name="q1" 
                                checked={answer1 === 'B'} 
                                onChange={() => setAnswer1('B')}
                                className="mt-0.5 accent-brand-orange-500 shrink-0" 
                              />
                              <span><strong>Opção B:</strong> Faço horas extras sem alertar a equipe para garantir a conclusão isolada.</span>
                            </label>
                          </div>
                        </div>

                        {/* Question 2 */}
                        <div className="border-t border-white/5 pt-3.5 space-y-2">
                          <p className="text-[11px] font-bold text-white flex gap-1.5">
                            <span className="text-brand-orange-400">P2:</span> 
                            Qual é sua postura em uma situação de conflito de ideias com outro colega?
                          </p>
                          <div className="grid grid-cols-1 gap-2">
                            <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                              answer2 === 'A' ? 'border-brand-orange-500 bg-brand-orange-500/5 text-white' : 'border-white/5 bg-[#121216] text-brand-gray hover:text-white'
                            }`}>
                              <input 
                                type="radio" 
                                name="q2" 
                                checked={answer2 === 'A'} 
                                onChange={() => setAnswer2('A')}
                                className="mt-0.5 accent-brand-orange-500 shrink-0" 
                              />
                              <span><strong>Opção A:</strong> Tento ouvir os argumentos, buscar dados objetivos e chegar a um consenso.</span>
                            </label>

                            <label className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer text-xs transition-colors ${
                              answer2 === 'C' ? 'border-brand-orange-500 bg-brand-orange-500/5 text-white' : 'border-white/5 bg-[#121216] text-brand-gray hover:text-white'
                            }`}>
                              <input 
                                type="radio" 
                                name="q3" 
                                checked={answer2 === 'C'} 
                                onChange={() => setAnswer2('C')}
                                className="mt-0.5 accent-brand-orange-500 shrink-0" 
                              />
                              <span><strong>Opção C:</strong> Escalo imediatamente ao diretor de área para que tome a decisão soberana.</span>
                            </label>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-between gap-4">
                          <button
                            type="button"
                            onClick={() => setActiveWorkspaceTab('buscar')}
                            className="bg-white/5 hover:bg-white/10 text-white font-medium text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                          >
                            Voltar para Empresas
                          </button>
                          
                          <button
                            type="submit"
                            className="bg-brand-gradient hover:opacity-95 text-white font-bold text-xs px-6 py-2.5 rounded-xl cursor-pointer shadow-lg flex items-center gap-1.5"
                          >
                            Enviar Meu Teste Resolvido
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="bg-[#16161B] border border-green-500/20 p-6 rounded-2xl text-center space-y-4">
                        <div className="w-12 h-12 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-inner animate-pulse">
                          <Check className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">Teste Concluído para {testParticipantName}!</h4>
                          <h5 className="text-[11px] text-brand-orange-400 mt-0.5">Nota de Match Calculada pelo Sistema:</h5>
                          <p className="text-3xl font-extrabold text-white mt-1.5">{generatedScore}%</p>
                          
                          <p className="text-[11px] text-brand-gray max-w-xs mx-auto leading-relaxed mt-2.5">
                            O algoritmo de triagem do site avaliou suas respostas e gerou o selo de qualificação. Seus dados foram encaminhados à empresa.
                          </p>
                        </div>

                        <div className="bg-[#121216] p-3 rounded-xl border border-white/5 mt-4 space-y-2">
                          <p className="text-[10px] text-brand-gray">Comprovante gerado com sucesso!</p>
                          <a 
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              triggerToast('Baixando comprovante de teste assinado (PDF) - direto dos arquivos do site!');
                            }}
                            className="inline-flex items-center gap-1 text-xs text-brand-orange-400 font-semibold hover:underline"
                          >
                            <FileDown className="w-4 h-4" /> Baixar relatórios de teste do site
                          </a>
                        </div>

                        <div className="pt-3 flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setTestSubmitted(false);
                              setAnswer1('');
                              setAnswer2('');
                            }}
                            className="text-xs bg-white/5 hover:bg-white/10 text-brand-gray hover:text-white py-1.5 px-4 rounded-xl"
                          >
                            Refazer Teste Outra Vez
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveWorkspaceTab('selecao');
                            }}
                            className="bg-brand-orange-500 text-white hover:bg-brand-orange-600 text-xs font-bold py-1.5 px-4 rounded-xl"
                          >
                            Ver Pranchas de RH
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-[#16161B]/50 border border-white/5 rounded-2xl flex flex-col items-center justify-center p-6">
                    <HelpCircle className="w-12 h-12 text-brand-orange-400 opacity-60 mb-3" />
                    <h4 className="text-sm font-semibold text-white">Nenhum teste em andamento</h4>
                    <p className="text-xs text-brand-gray max-w-xs mx-auto leading-relaxed mt-1">
                      Para realizar um teste de recrutamento, selecione alguma das empresas parceiras e clique no cargo correspondente.
                    </p>
                    <button
                      onClick={() => setActiveWorkspaceTab('buscar')}
                      className="mt-4 bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-bold text-xs py-2 px-5 rounded-xl flex items-center gap-1"
                    >
                      Pesquisar Vagas <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: SELEÇÃO DE APROVADOS (RECRUITER SELECTION VIEW) */}
          {activeWorkspaceTab === 'selecao' && (
            <motion.div
              key="tab-selecao"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col lg:flex-row h-full overflow-hidden"
            >
              
              {/* Internal Sidebar with stages */}
              <div className="w-full lg:w-48 bg-[#121216] border-r border-white/5 p-4 flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible shrink-0">
                <div className="hidden lg:block pb-2 mb-2 border-b border-white/5">
                  <p className="text-[10px] font-bold text-brand-gray/50 uppercase tracking-widest pl-1">MÉTRICAS / ETAPAS</p>
                </div>
                
                <button 
                  onClick={() => setActiveFilter('todos')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    activeFilter === 'todos' 
                      ? 'bg-brand-orange-500/10 text-brand-orange-300 border border-brand-orange-500/20' 
                      : 'text-brand-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    Todos Inscritos
                  </span>
                  <span className="bg-[#1E1E24] px-1.5 rounded text-[9px] text-white font-bold">{totalApplied}</span>
                </button>

                <button 
                  onClick={() => setActiveFilter('triagem')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    activeFilter === 'triagem' 
                      ? 'bg-brand-orange-500/10 text-brand-orange-300 border border-brand-orange-500/20' 
                      : 'text-brand-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    Selo de Triagem
                  </span>
                  <span className="bg-[#1E1E24] px-1.5 rounded text-[9px] text-brand-gray">
                    {candidates.filter(c => c.status === 'triagem').length}
                  </span>
                </button>

                <button 
                  onClick={() => setActiveFilter('entrevista')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    activeFilter === 'entrevista' 
                      ? 'bg-brand-orange-500/10 text-brand-orange-300 border border-brand-orange-500/20' 
                      : 'text-brand-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    Entrevistas
                  </span>
                  <span className="bg-[#1E1E24] px-1.5 rounded text-[9px] text-[#FF8A00] font-semibold">{inInterview}</span>
                </button>

                <button 
                  onClick={() => setActiveFilter('teste')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    activeFilter === 'teste' 
                      ? 'bg-brand-orange-500/10 text-brand-orange-300 border border-brand-orange-500/20' 
                      : 'text-brand-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Avaliando Teste
                  </span>
                  <span className="bg-[#1E1E24] px-1.5 rounded text-[9px] text-brand-gray">{inTest}</span>
                </button>

                <button 
                  onClick={() => setActiveFilter('contratado')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    activeFilter === 'contratado' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                      : 'text-brand-gray hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5" />
                    Contratados
                  </span>
                  <span className="bg-green-500/20 text-green-300 px-1.5 rounded text-[9px] font-bold">{hiredCount}</span>
                </button>
              </div>

              {/* Main List Column */}
              <div className="flex-1 bg-[#101014] p-4.5 flex flex-col overflow-y-auto">
                
                {/* Stats Summary Panel */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-[#1A1A1F] p-3 rounded-xl border border-white/5">
                    <span className="text-[9px] text-brand-gray uppercase block mb-0.5">Vagas do Sistema</span>
                    <p className="text-lg font-bold text-white leading-none">32 <span className="text-[10px] text-green-500 font-normal">+4</span></p>
                  </div>
                  <div className="bg-[#1A1A1F] p-3 rounded-xl border border-white/5">
                    <span className="text-[9px] text-brand-gray uppercase block mb-0.5">Adesão Média</span>
                    <p className="text-lg font-bold text-white leading-none">88,4%</p>
                  </div>
                  <div className="bg-[#1A1A1F] p-3 rounded-xl border border-white/5">
                    <span className="text-[9px] text-brand-gray uppercase block mb-0.5">Tempo Triagem</span>
                    <p className="text-lg font-bold text-white leading-none">14 dias</p>
                  </div>
                </div>

                {/* Candidate Search */}
                <div className="mb-3.5 relative">
                  <Search className="w-3.5 h-3.5 text-brand-gray absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    placeholder="Filtrar candidatos por nome ou cargo..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#1A1A1F] border border-white/5 focus:border-brand-orange-500/40 focus:outline-none placeholder:text-brand-gray/50 text-white rounded-xl py-1.5 px-9 text-[11px]"
                  />
                </div>

                {/* Candidate List render */}
                <div className="flex-1 space-y-2">
                  <AnimatePresence mode="popLayout">
                    {filteredCandidates.length === 0 ? (
                      <div className="bg-[#1A1A1F]/40 py-10 px-4 text-center rounded-xl border border-white/5">
                        <p className="text-xs text-brand-gray">Nenhum candidato localizado nesta etapa do funil.</p>
                        <p className="text-[10px] text-brand-gray/70 mt-1">Crie um candidato pelo formulário de testes ou utilize o botão "Simular Candidato Logo".</p>
                      </div>
                    ) : (
                      filteredCandidates.map((cand) => (
                        <motion.div 
                          layout
                          key={cand.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => setSelectedCandidate(cand)}
                          className="bg-[#1A1A1F] hover:bg-[#202026] p-3.5 rounded-xl border border-white/5 transition-all flex items-center justify-between cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg ${cand.avatarColor} text-white flex items-center justify-center font-bold text-xs uppercase shrink-0`}>
                              {cand.avatarInitials}
                            </div>

                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-xs font-semibold text-white group-hover:text-brand-orange-300 transition-colors">{cand.name}</h4>
                                <span className={`px-1.5 py-0.2 rounded text-[8px] uppercase font-bold tracking-wider ${
                                  cand.status === 'triagem' ? 'bg-orange-500/10 text-orange-400' :
                                  cand.status === 'entrevista' ? 'bg-brand-orange-500/15 text-[#FF8A00]' :
                                  cand.status === 'teste' ? 'bg-blue-500/10 text-blue-400' :
                                  cand.status === 'contratado' ? 'bg-green-500/15 text-green-400' :
                                  'bg-brand-gray/10 text-brand-gray'
                                }`}>
                                  {cand.status === 'triagem' ? 'Triagem' :
                                   cand.status === 'entrevista' ? 'Entrevista' :
                                   cand.status === 'teste' ? 'No Teste' :
                                   cand.status === 'contratado' ? 'Aprovado' :
                                   'Arquivado'}
                                </span>
                              </div>
                              <p className="text-[10px] text-brand-gray/80 mt-0.5 truncate max-w-xs">{cand.role}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right shrink-0">
                              <div className="flex items-center gap-1 justify-end">
                                <Sparkles className="w-2.5 h-2.5 text-brand-orange-300 fill-brand-orange-300" />
                                <span className="text-xs font-bold text-white font-sans">{cand.score}%</span>
                              </div>
                              <span className="text-[8px] text-[#FFAE2B] font-medium block">MATCH</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-brand-gray group-hover:text-white transition-colors" />
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Candidate Detail Drawer Backdrop / Overlay */}
      <AnimatePresence>
        {selectedCandidate && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCandidate(null)}
              className="absolute inset-0 bg-black/70 z-40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-full max-w-sm h-full bg-[#1A1A1F] border-l border-white/10 shadow-2xl z-50 p-5 overflow-y-auto flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/5">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-brand-orange-400 fill-brand-orange-400" />
                    <span className="text-[10px] font-medium text-brand-gray uppercase tracking-widest pl-1">Match Técnico e Cultural</span>
                  </div>
                  <button 
                    onClick={() => setSelectedCandidate(null)}
                    className="p-1 rounded-lg hover:bg-white/5 text-brand-gray hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Candidate Summary */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div className={`w-11 h-11 rounded-xl ${selectedCandidate.avatarColor} text-white flex items-center justify-center font-bold text-sm`}>
                    {selectedCandidate.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-white truncate">{selectedCandidate.name}</h3>
                    <p className="text-[11px] text-brand-orange-400 mt-0.5 truncate text-left">{selectedCandidate.role}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-brand-gray shrink-0" />
                      <span className="text-[9px] text-brand-gray truncate">{selectedCandidate.location}</span>
                    </div>
                  </div>
                </div>

                {/* Score panel */}
                <div className="bg-[#121216]/85 border border-white/5 rounded-xl p-3.5 mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-medium text-brand-gray">Selo de Qualificação</span>
                    <span className="text-[9px] font-bold text-[#FFAE2B] px-2 py-0.5 bg-brand-orange-500/10 rounded-full border border-brand-orange-500/15">
                      Aprovado na Triagem
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center justify-center shrink-0">
                      <svg className="w-11 h-11 transform -rotate-90">
                        <circle cx="22" cy="22" r="18" className="stroke-white/5" strokeWidth="3.5" fill="transparent" />
                        <circle 
                          cx="22" 
                          cy="22" 
                          r="18" 
                          className="stroke-brand-orange-500" 
                          strokeWidth="3.5" 
                          fill="transparent" 
                          strokeDasharray={113}
                          strokeDashoffset={113 - (113 * selectedCandidate.score) / 100}
                        />
                      </svg>
                      <span className="absolute text-[10px] font-extrabold text-white">{selectedCandidate.score}%</span>
                    </div>
                    
                    <div>
                      <p className="text-[11px] font-semibold text-white">Match de Inteligência</p>
                      <p className="text-[9px] text-brand-gray mt-0.5 leading-snug">Competências técnicas altamente aderentes às respostas registradas no teste online do site.</p>
                    </div>
                  </div>
                </div>

                {/* Candidate Info Grid */}
                <div className="space-y-2 mb-5 bg-[#121216]/40 p-3 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-[11px] text-brand-gray">
                    <Mail className="w-3.5 h-3.5 text-brand-gray/60 shrink-0" />
                    <span className="truncate">{selectedCandidate.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-brand-gray">
                    <Phone className="w-3.5 h-3.5 text-brand-gray/60 shrink-0" />
                    <span>{selectedCandidate.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-brand-gray">
                    <Calendar className="w-3.5 h-3.5 text-brand-gray/60 shrink-0" />
                    <span>Inscrito em: {selectedCandidate.appliedDate}</span>
                  </div>
                </div>

                {/* Download Direct From Web Files */}
                <div className="border-t border-white/5 pt-4 mb-4 space-y-2">
                  <p className="text-[9px] font-bold text-white uppercase tracking-wider">Arquivos do Candidato (Download Direto)</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => triggerToast(`Fazendo o download direto do Currículo PDF assinado de ${selectedCandidate.name} recrutado em nossa plataforma online!`)}
                      className="bg-[#121216] border border-white/5 hover:border-brand-orange-500/20 py-2 px-2.5 rounded-xl text-[10px] text-brand-gray hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Currículo PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerToast(`Baixando o Relatório de Gabarito Técnico da avaliação online do candidato ${selectedCandidate.name} em .CSV!`)}
                      className="bg-[#121216] border border-white/5 hover:border-brand-orange-500/20 py-2 px-2.5 rounded-xl text-[10px] text-brand-gray hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FileDown className="w-3.5 h-3.5" /> Relatório Vaga
                    </button>
                  </div>
                </div>

                {/* Workflow stage shifts */}
                <div className="border-t border-white/5 pt-4">
                  <p className="text-[9px] font-bold text-white uppercase tracking-wider mb-2">Alternar Fase do Processo</p>
                  
                  <div className="grid grid-cols-2 gap-1.5">
                    <button 
                      type="button"
                      onClick={() => moveCandidate(selectedCandidate.id, 'triagem')}
                      className={`text-left text-[10px] p-2 border rounded-lg transition-all cursor-pointer ${
                        selectedCandidate.status === 'triagem' 
                          ? 'border-brand-orange-500 bg-brand-orange-500/10 text-white font-semibold' 
                          : 'border-white/5 bg-transparent text-brand-gray hover:bg-white/5'
                      }`}
                    >
                      1. Triagem
                    </button>

                    <button 
                      type="button"
                      onClick={() => moveCandidate(selectedCandidate.id, 'entrevista')}
                      className={`text-left text-[10px] p-2 border rounded-lg transition-all cursor-pointer ${
                        selectedCandidate.status === 'entrevista' 
                          ? 'border-brand-orange-500 bg-brand-orange-500/10 text-white font-semibold' 
                          : 'border-white/5 bg-transparent text-brand-gray hover:bg-white/5'
                      }`}
                    >
                      2. Entrevista
                    </button>

                    <button 
                      type="button"
                      onClick={() => moveCandidate(selectedCandidate.id, 'teste')}
                      className={`text-left text-[10px] p-2 border rounded-lg transition-all cursor-pointer ${
                        selectedCandidate.status === 'teste' 
                          ? 'border-brand-orange-500 bg-brand-orange-500/10 text-white font-semibold' 
                          : 'border-white/5 bg-transparent text-brand-gray hover:bg-white/5'
                      }`}
                    >
                      3. Testes
                    </button>

                    <button 
                      type="button"
                      onClick={() => moveCandidate(selectedCandidate.id, 'contratado')}
                      className={`text-left text-[10px] p-2 border rounded-lg transition-all cursor-pointer ${
                        selectedCandidate.status === 'contratado' 
                          ? 'border-green-500 bg-green-500/10 text-white font-semibold' 
                          : 'border-white/5 bg-transparent text-brand-gray hover:bg-white/5'
                      }`}
                    >
                      4. Contratar 🎉
                    </button>
                  </div>
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="pt-4 border-t border-white/5 mt-4 flex gap-2">
                <button 
                  type="button"
                  onClick={() => setSelectedCandidate(null)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs py-2 rounded-xl transition-all cursor-pointer"
                >
                  Fechar
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    moveCandidate(selectedCandidate.id, 'contratado');
                    setSelectedCandidate(null);
                  }}
                  className="flex-1 bg-brand-gradient text-white text-xs font-bold py-2 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1 hover:opacity-90 cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Aprovar & Selecionar
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
