import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Como funciona a triagem baseada no Selo de Triagem Inteligente?",
    answer: "Nossa tecnologia analisa o currículo enviado pelo candidato em tempo real, cruzando as competências do arquivo com os requisitos de formação, experiência e descrição da vaga cadastrados por você. Em segundos, o sistema gera uma pontuação de match de 0 a 100 exibida diretamente na sua tela, destacando os pontos fortes e fracos de cada perfil de forma resumida e organizada de maneira visual."
  },
  {
    question: "Posso mudar de plano ou cancelar minha assinatura a qualquer momento?",
    answer: "Sim, absolutamente! Nossos planos não têm período mínimo de fidelidade no faturamento mensal. Você pode fazer o upgrade, downgrade ou cancelar seu plano a qualquer momento diretamente pela área de faturamento no menu do seu painel e as mudanças serão aplicadas no ciclo de cobrança subsequente."
  },
  {
    question: "Como posso simular e agendar uma demonstração (demo) de teste?",
    answer: "É simples: clique em qualquer botão de 'Demonstração' ou 'Agendar demonstração demo' no nosso site e preencha o seu e-mail corporativo. Nossa equipe fará contato imediatamente para demonstrar a plataforma e fornecer um ambiente simulador de testes grátis configurado especialmente com a identidade da sua marca."
  },
  {
    question: "A plataforma está em conformidade estrita com a LGPD?",
    answer: "Sim, a segurança dos dados de recrutadores e candidatos é nossa prioridade máxima. Toda a nossa infraestrutura na nuvem está em perfeita conformidade estrita com as normas brasileiras da LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018), com criptografia de ponta a ponta em trânsito e em repouso dos dados profissionais sensíveis."
  },
  {
    question: "O que é a funcionalidade de Whitelabel do Plano Master?",
    answer: "A funcionalidade Whitelabel permite remover o logo e referências aos nossos sistemas e aplicar 100% da identidade visual própria da sua marca no portal de cadastro de vagas, nos e-mails disparados aos candidatos e no link de testes, mantendo a experiência do candidato totalmente integrada ao design e branding oficial da sua corporação."
  },
  {
    question: "É possível integrar a plataforma com nossos sistemas atuais de RH (ATS)?",
    answer: "Nos planos Premium e Master oferecemos suporte técnico de engenharia para desenvolvimento de APIs customizadas de sincronia. É possível integrar o banco de dados de candidaturas diretamente de ponta a ponta com as principais plataformas do mercado e exportar relatórios inteligentes sob demanda corporativa."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="space-y-12 py-16 border-t border-white/5 relative z-10 max-w-4xl mx-auto px-4">

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-[#FFAE2B] uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Central de Dúvidas</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Perguntas Frequentes</h2>
        <p className="text-xs sm:text-sm text-brand-gray leading-relaxed max-w-md mx-auto">
          Tire suas principais dúvidas sobre o funcionamento do nosso sistema de recrutamento inteligente operado em ambiente online.
        </p>
      </div>

      <div className="space-y-3.5">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className={`bg-[#16161B] border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen ? 'border-brand-orange-500/30 shadow-lg shadow-brand-orange-500/2' : 'border-white/5 group hover:border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full text-left px-5.5 py-4.5 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <span className={`text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                  isOpen ? 'text-white' : 'text-brand-gray/90 group-hover:text-white'
                }`}>
                  {item.question}
                </span>
                
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-200 ${
                  isOpen 
                    ? 'bg-brand-gradient border-brand-orange-500/30 text-white shadow-md shadow-brand-orange-500/10' 
                    : 'bg-white/5 border-white/5 text-brand-gray group-hover:text-white group-hover:bg-white/10'
                }`}>
                  {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5.5 pb-5 pt-1 text-xs text-brand-gray leading-relaxed border-t border-white/5 bg-[#0D0D10]/30">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
