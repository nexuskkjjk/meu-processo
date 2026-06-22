import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Kanban, 
  BookOpenCheck, 
  MailCheck, 
  BarChart3, 
  FileText,
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface FeatureCardProps {
  key?: React.Key | number;
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

function FeatureCard({ icon, tag, title, description, className = '', delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`bg-[#1A1A1F] border border-white/5 hover:border-brand-orange-500/20 p-6 rounded-2xl transition-all shadow-lg flex flex-col justify-between group cursor-default ${className}`}
    >
      <div>
        {/* Animated Icon Wrapper */}
        <div className="w-10 h-10 rounded-xl bg-brand-orange-500/5 border border-brand-orange-500/10 flex items-center justify-center text-brand-orange-400 group-hover:scale-105 group-hover:bg-brand-orange-500/10 transition-transform mb-4">
          {icon}
        </div>

        {/* Highlight Tag */}
        <span className="text-[10px] font-bold text-brand-orange-400 uppercase tracking-widest block mb-1.5">{tag}</span>
        
        {/* Headline */}
        <h4 className="text-base font-bold text-white tracking-tight group-hover:text-brand-orange-300 transition-colors leading-snug">{title}</h4>
        
        {/* Support description */}
        <p className="text-xs text-brand-gray mt-2 leading-relaxed">{description}</p>
      </div>

      {/* Decorative accent dot in candidate manual */}
      <div className="flex justify-end mt-4">
        <span className="w-1.5 h-1.5 rounded-full bg-white/5 group-hover:bg-brand-orange-500 transition-colors" />
      </div>
    </motion.div>
  );
}

export default function FeatureBento() {
  const bentoFeatures = [
    {
      icon: <Sparkles className="w-4.5 h-4.5" />,
      tag: "Selo de Qualificação",
      title: "Triagem Inteligente Online",
      description: "A inteligência lê currículos e gera pontuação de 0 a 100 com base em pré-requisitos técnicos e culturais, exibida em painéis super fluidos direto na plataforma web.",
      className: "md:col-span-2",
      delay: 0,
    },
    {
      icon: <Kanban className="w-4.5 h-4.5" />,
      tag: "Gestão Kanban Integrada",
      title: "Pipeline de Contratação Visual",
      description: "Organize etapas arrastando candidatos com facilidade. Gestão ágil, rápida e visual projetada especificamente para otimizar o tempo da equipe de recrutamento.",
      className: "md:col-span-1",
      delay: 0.1,
    },
    {
      icon: <BookOpenCheck className="w-4.5 h-4.5" />,
      tag: "Testes Integrados no Site",
      title: "Disparo e Alertas Rápidos",
      description: "Envie e libere avaliações diretamente pelo site e receba notificações em tempo real assim que o candidato responder ou atingir nota qualificatória.",
      className: "md:col-span-1",
      delay: 0.2,
    },
    {
      icon: <MailCheck className="w-4.5 h-4.5" />,
      tag: "Agenda Sincronizada",
      title: "Agendador Integrado na Web",
      description: "Integração instantânea com a agenda de compromissos. O candidato escolhe o melhor horário, criando o link do Google Meet e notificando sua equipe sem burocracias.",
      className: "md:col-span-2",
      delay: 0.3,
    },
    {
      icon: <BarChart3 className="w-4.5 h-4.5" />,
      tag: "BI & Metas Online",
      title: "Métricas e Relatórios de Recrutamento Completos",
      description: "Acompanhe pela web as principais taxas de conversão de funil, andamento de processos de contratação e tempo de triagem ideal através de gráficos integrados responsivos e dinâmicos.",
      className: "md:col-span-3",
      delay: 0.4,
    }
  ];

  return (
    <div id="features-bento-grid" className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
      {bentoFeatures.map((feat, idx) => (
        <FeatureCard 
          key={idx}
          icon={feat.icon}
          tag={feat.tag}
          title={feat.title}
          description={feat.description}
          className={feat.className}
          delay={feat.delay}
        />
      ))}
    </div>
  );
}
