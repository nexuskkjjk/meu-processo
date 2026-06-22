import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Briefcase, 
  Users, 
  Mail, 
  Phone, 
  User, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Building
} from 'lucide-react';

interface DemoSchedulerProps {
  onForceSubmit?: (email: string, date: string, time: string) => void;
}

export default function DemoScheduler({ onForceSubmit }: DemoSchedulerProps) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    employees: '1-10',
    phone: '',
    role: '',
  });

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Available slots seed
  const DATES = [
    { id: 'date-1', label: 'Segunda-feira, 22 Jun', raw: '2026-06-22' },
    { id: 'date-2', label: 'Terça-feira, 23 Jun', raw: '2026-06-23' },
    { id: 'date-3', label: 'Quarta-feira, 24 Jun', raw: '2026-06-24' },
    { id: 'date-4', label: 'Quinta-feira, 25 Jun', raw: '2026-06-25' },
  ];

  const TIMES = ['09:30', '11:00', '14:30', '16:00', '17:30'];

  // Handle Form Submission Step 1
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      alert('Por favor, preencha os campos obrigatórios (Nome, E-mail corporativo e Empresa).');
      return;
    }
    setStep(2);
  };

  const handleBookDemo = () => {
    if (!selectedDate || !selectedTime) {
      alert('Por favor, escolha uma data e horário.');
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      if (onForceSubmit) {
        const fullDateMatch = DATES.find(d => d.id === selectedDate)?.label || '';
        onForceSubmit(formData.email, fullDateMatch, selectedTime);
      }
    }, 1200);
  };

  return (
    <div id="demo-scheduler-widget" className="w-full bg-[#1A1A1F] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Top Banner indicating steps */}
      <div className="bg-[#131316] border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-brand-orange-500" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">Garantir Acesso Antecipado</span>
        </div>
        
        {step < 3 && (
          <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-brand-gray/60">
            <span className={`${step === 1 ? 'text-brand-orange-400' : ''}`}>1. Cadastro</span>
            <ChevronRight className="w-3 h-3" />
            <span className={`${step === 2 ? 'text-brand-orange-400' : ''}`}>2. Agendamento</span>
          </div>
        )}
      </div>

      <div className="p-6 lg:p-7 min-h-[380px] flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form 
              key="step-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onSubmit={handleStep1Submit}
              className="space-y-4"
            >
              <div>
                <h4 className="text-sm font-bold text-white">Inscreva-se na Lista de Lançamento do Sistema</h4>
                <p className="text-[11px] text-brand-gray mt-1">Este site demonstra o nosso sistema online: o Meu Processo Seletivo, uma plataforma web completa para empresas selecionarem talentos de forma inteligente.</p>
              </div>

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Nome */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-brand-gray uppercase tracking-wider flex items-center gap-1">
                    <User className="w-3 h-3 text-brand-orange-400" /> Nome Completo *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="ex: João Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-brand-orange-500/40 focus:outline-none rounded-xl py-2 px-3.5 text-xs text-white placeholder:text-brand-gray/30 transition-all"
                  />
                </div>

                {/* E-mail */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-brand-gray uppercase tracking-wider flex items-center gap-1">
                    <Mail className="w-3 h-3 text-brand-orange-400" /> E-mail Corporativo *
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="ex: joao@suaempresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-brand-orange-500/40 focus:outline-none rounded-xl py-2 px-3.5 text-xs text-white placeholder:text-brand-gray/30 transition-all"
                  />
                </div>

                {/* Empresa */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-brand-gray uppercase tracking-wider flex items-center gap-1">
                    <Building className="w-3 h-3 text-brand-orange-400" /> Nome da Empresa *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="ex: Acme Corp"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-brand-orange-500/40 focus:outline-none rounded-xl py-2 px-3.5 text-xs text-white placeholder:text-brand-gray/30 transition-all"
                  />
                </div>

                {/* Cargo */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-brand-gray uppercase tracking-wider flex items-center gap-1">
                    <Briefcase className="w-3 h-3 text-brand-orange-400" /> Seu Cargo
                  </label>
                  <input 
                    type="text" 
                    placeholder="ex: Head de RH / Tech Recruiter"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-brand-orange-500/40 focus:outline-none rounded-xl py-2 px-3.5 text-xs text-white placeholder:text-brand-gray/30 transition-all"
                  />
                </div>

                {/* Tamanho empresa */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-brand-gray uppercase tracking-wider flex items-center gap-1">
                    <Users className="w-3 h-3 text-brand-orange-400" /> Funcionários
                  </label>
                  <select 
                    value={formData.employees}
                    onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                    className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-brand-orange-500/40 focus:outline-none rounded-xl py-2 px-3.5 text-xs text-white transition-all cursor-pointer"
                  >
                    <option value="1-10">1 a 10 funcionários</option>
                    <option value="11-50">11 a 50 funcionários</option>
                    <option value="51-200">51 a 200 funcionários</option>
                    <option value="201-1000">201 a 1.000 funcionários</option>
                    <option value="1000+">Mais de 1.000 funcionários</option>
                  </select>
                </div>

                {/* Telefone */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-brand-gray uppercase tracking-wider flex items-center gap-1">
                    <Phone className="w-3 h-3 text-brand-orange-400" /> WhatsApp / Telefone
                  </label>
                  <input 
                    type="tel" 
                    placeholder="ex: (11) 98765-4321"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#111115] border border-white/5 hover:border-white/10 focus:border-brand-orange-500/40 focus:outline-none rounded-xl py-2 px-3.5 text-xs text-white placeholder:text-brand-gray/30 transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-brand-gradient text-white text-xs font-bold py-3 px-6 rounded-xl hover:opacity-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.form>
          )}

          {step === 2 && (
            <motion.div 
              key="step-2"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-sm font-bold text-white">Agende o Treinamento & Onboarding</h4>
                <p className="text-[11px] text-brand-gray mt-1">Sua empresa terá uma apresentação do nosso sistema online e os recursos de triagem e testes rápidos de candidatos.</p>
              </div>

              {/* Choose Date Grid */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-brand-orange-400 uppercase tracking-widest block">1. Escolha a Data:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DATES.map((date) => (
                    <button 
                      key={date.id}
                      type="button"
                      onClick={() => setSelectedDate(date.id)}
                      className={`py-2.5 px-2 border rounded-xl text-center text-xs transition-all cursor-pointer ${
                        selectedDate === date.id 
                          ? 'border-brand-orange-500 bg-brand-orange-500/10 text-white font-bold shadow-md' 
                          : 'border-white/5 bg-[#111115] hover:bg-white/5 text-brand-gray'
                      }`}
                    >
                      <span className="block font-medium">{date.label.split(',')[0]}</span>
                      <span className="block text-[10px] opacity-70 mt-0.5">{date.label.split(',')[1]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Choose Time Slider/Buttons */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-brand-orange-400 uppercase tracking-widest block">2. Horário de Brasília:</span>
                <div className="flex flex-wrap gap-2">
                  {TIMES.map((time) => (
                    <button 
                      key={time}
                      type="button"
                      disabled={!selectedDate}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3.5 border rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                        !selectedDate 
                          ? 'opacity-40 cursor-not-allowed border-white/5 bg-[#111115] text-brand-gray/40' 
                          : selectedTime === time 
                            ? 'border-brand-orange-500 bg-brand-orange-500/10 text-white font-bold shadow-md' 
                            : 'border-white/5 bg-[#111115] hover:bg-white/5 text-brand-gray'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action buttons footer */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-white/5">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-xs text-brand-gray hover:text-white transition-colors py-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar
                </button>

                <button 
                  type="button"
                  disabled={isSubmitting || !selectedDate || !selectedTime}
                  onClick={handleBookDemo}
                  className={`bg-brand-gradient text-white text-xs font-bold py-3 px-6 rounded-xl hover:opacity-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98 ${
                    (!selectedDate || !selectedTime || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                       <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                      Confirmando...
                    </div>
                  ) : (
                    <>
                      Solicitar Acesso à Plataforma
                      <Sparkles className="w-4 h-4 fill-white/10" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6 space-y-5"
            >
              <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white tracking-tight">Vaga garantida, {formData.name.split(' ')[0]}!</h4>
                <p className="text-xs text-brand-gray max-w-sm mx-auto leading-relaxed">
                  Sua inscrição foi confirmada e a demonstração da plataforma agendada para:
                </p>
                
                {/* Visual Scheduled Card Badge */}
                <div className="bg-[#111115] border border-white/5 p-3.5 rounded-xl max-w-xs mx-auto mt-4">
                  <p className="text-xs font-bold text-white flex items-center justify-center gap-1.5">
                    <Calendar className="w-4 h-4 text-brand-orange-400" />
                    {DATES.find(d => d.id === selectedDate)?.label}
                  </p>
                  <p className="text-xs font-bold text-white flex items-center justify-center gap-1.5 mt-1.5">
                    <Clock className="w-4 h-4 text-brand-orange-400" />
                    às {selectedTime} (Horário de Brasília)
                  </p>
                </div>

                <p className="text-[11px] text-brand-gray/80 max-w-sm mx-auto pt-2">
                  Enviaremos o link de acesso exclusivo e materiais da plataforma meuprocessoseletivo.com juntamente com o convite para o e-mail: <strong>{formData.email}</strong>. Até lá!
                </p>
              </div>

              <div className="pt-4">
                <button 
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setFormData({ name: '', email: '', company: '', employees: '1-10', phone: '', role: '' });
                    setSelectedDate('');
                    setSelectedTime('');
                  }}
                  className="text-xs text-brand-orange-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  Agendar outro horário <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
