import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "O que é o Meu Processo Seletivo?",
    answer: "O Meu Processo Seletivo é uma plataforma para criar processos seletivos, receber currículos por link, centralizar candidatos e visualizar um ranking de compatibilidade para facilitar a triagem."
  },
  {
    question: "Como funciona o processo seletivo?",
    answer: "Você cria uma vaga, gera um link de candidatura e compartilha com os candidatos. Os currículos recebidos ficam organizados dentro da plataforma, permitindo acompanhar cada processo de forma mais clara."
  },
  {
    question: "O candidato precisa criar conta para se candidatar?",
    answer: "Não necessariamente. O candidato pode acessar o link de candidatura, preencher as informações solicitadas e enviar o currículo de forma simples."
  },
  {
    question: "O que significa \"processos seletivos ativos\"?",
    answer: "Processos seletivos ativos são vagas ou seleções abertas ao mesmo tempo dentro da plataforma. Cada plano possui um limite de processos ativos simultaneamente."
  },
  {
    question: "Quantos currículos posso receber?",
    answer: "Os planos são organizados principalmente pela quantidade de processos seletivos ativos. A proposta é permitir que sua empresa receba os currículos dentro dos processos criados e mantenha tudo centralizado."
  },
  {
    question: "Como funciona o ranking por compatibilidade?",
    answer: "O sistema organiza os candidatos de acordo com a compatibilidade entre o currículo recebido e as informações cadastradas na vaga, ajudando a empresa a visualizar perfis com mais clareza."
  },
  {
    question: "O sistema escolhe o candidato automaticamente?",
    answer: "Não. A plataforma ajuda na triagem e organização dos candidatos, mas a decisão final continua sendo da empresa."
  },
  {
    question: "Posso mudar de plano depois?",
    answer: "Sim. A empresa pode começar em um plano menor e evoluir conforme a demanda por processos seletivos aumentar."
  },
  {
    question: "Como funciona a assinatura anual?",
    answer: "Na assinatura anual, a campanha é: pague 10 meses e use por 12. Isso representa um desconto de 16,67% em comparação ao pagamento mensal durante 12 meses."
  },
  {
    question: "Qual plano devo escolher?",
    answer: "O plano deve ser escolhido conforme a quantidade de processos seletivos que sua empresa precisa manter ativos ao mesmo tempo: Inicial: 1 processo ativo; Essencial: até 4 processos ativos; Avançado: até 20 processos ativos; Profissional: até 150 processos ativos."
  },
  {
    question: "Posso cancelar a assinatura?",
    answer: "Sim. O cliente pode cancelar a assinatura conforme as condições contratadas no momento da adesão."
  },
  {
    question: "O suporte está incluso?",
    answer: "Sim. Todos os planos possuem suporte. Os planos Avançado e Profissional contam com atendimento prioritário."
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
