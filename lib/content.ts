// ============================================================
// CONTEÚDO DO SITE — fonte única de dados.
// Quando a agência passar números, depoimentos e autorizações,
// preencha aqui. Seções condicionais aparecem automaticamente.
// ============================================================

export type Metrica = {
  rotulo: string;
  valor: number;
  sufixo?: string;
  decimais?: number;
};

export type Case = {
  slug: string;
  cliente: string;
  setor: string;
  desafio: string;
  solucao: string;
  resultado?: string;
  depoimento?: { texto: string; autor: string };
  instagram?: string;    // @handle do perfil
  metricas?: Metrica[];  // até 4 — vazio = placeholder "—"
};

export type Stat = {
  valor: number;
  prefixo?: string;
  sufixo: string;
  rotulo: string;
  decimais?: number;
};

export const marca = {
  nome: "iRMarketingStudio",
  tagline: "Transformamos ideias em resultados",
  cidade: "João Pessoa — PB",
  endereco: "Avenida Maranhão, 170 — João Pessoa, PB",
  instagram: "https://www.instagram.com/irmarketingstudio/",
  /** Trocar pelo número oficial com DDI, ex: 5583999999999 */
  whatsapp: "5583998545700",
  whatsappMsg:
    "Olá! Quero agendar um diagnóstico gratuito da minha presença digital.",
};

export const ctas = {
  principal: "Agendar diagnóstico gratuito",
  secundario: "Falar com um especialista",
};

export const servicos = [
  {
    titulo: "Tráfego pago",
    descricao:
      "Meta Ads e Google Ads com estratégia local, campanhas de leads e otimização contínua de verba e criativos.",
  },
  {
    titulo: "Social media estratégico",
    descricao:
      "Planejamento de conteúdo, calendário editorial e direção criativa para presença digital que vende.",
  },
  {
    titulo: "Audiovisual",
    descricao:
      "Reels, vídeos institucionais, UGC e storytelling em vídeo — captação e roteiro próprios.",
  },
  {
    titulo: "Design de criativos",
    descricao:
      "Criativos para anúncios, peças de campanha e materiais comerciais com identidade forte.",
  },
  {
    titulo: "Estratégia de campanhas",
    descricao:
      "Lançamentos, datas sazonais e promoções estruturadas para conversão rápida.",
  },
  {
    titulo: "Sites e páginas de conversão",
    descricao:
      "Páginas institucionais e de conversão construídas para transformar visita em conversa.",
  },
];

export const cases: Case[] = [
  {
    slug: "meu-hot-dog",
    cliente: "Meu Hot Dog",
    setor: "Alimentação",
    desafio: "Criar campanhas promocionais com apelo comercial e conteúdo leve e compartilhável.",
    solucao: "Campanhas sazonais, ofertas casadas e Reels humorados com identidade visual própria.",
    instagram: "@meuhotdogjp",
    metricas: [],
  },
  {
    slug: "fascino-medieval",
    cliente: "Fascino Medieval",
    setor: "Restaurante temático",
    desafio: "Criar conteúdo à altura da ambientação temática e maximizar compartilhamento.",
    solucao: "Roteiros medievais com NPC, conteúdo em POV e captação imersiva.",
    instagram: "@fascinomedieval",
    metricas: [],
  },
  {
    slug: "dogao-083",
    cliente: "Dogão 083",
    setor: "Alimentação",
    desafio: "Criar conteúdo à altura da ambientação temática e maximizar compartilhamento.",
    solucao: "Roteiros medievais com NPC, conteúdo em POV e captação imersiva.",
    instagram: "@dogao083",
    metricas: [],
  },
  {
    slug: "burgerlandia",
    cliente: "Burguerlândia JP",
    setor: "Alimentação",
    desafio: "Criar conteúdo à altura da ambientação temática e maximizar compartilhamento.",
    solucao: "Roteiros medievais com NPC, conteúdo em POV e captação imersiva.",
    instagram: "@burgerlandiajp",
    metricas: [],
  },
  {
    slug: "generoso-sertao",
    cliente: "Generoso Sertão",
    setor: "Alimentação",
    desafio: "Criar conteúdo à altura da ambientação temática e maximizar compartilhamento.",
    solucao: "Roteiros medievais com NPC, conteúdo em POV e captação imersiva.",
    instagram: "@generososertao",
    metricas: [],
  },
  {
    slug: "hm-acessorios",
    cliente: "Hm Acessórios",
    setor: "Acessórios",
    desafio: "Criar conteúdo à altura da ambientação temática e maximizar compartilhamento.",
    solucao: "Roteiros medievais com NPC, conteúdo em POV e captação imersiva.",
    instagram: "@hmacessorios",
    metricas: [],
  },
];

export const stats: Stat[] = [
  {
    valor: 1,
    sufixo: " bi+",
    rotulo: "de visualizações nos vídeos dos clientes",
    decimais: 1,
  },
  {
    valor: 5,
    prefixo: "R$ ",
    sufixo: " mi+",
    rotulo: "faturados por clientes com tráfego pago",
    decimais: 1,
  },
  {
    valor: 600,
    prefixo: "R$ ",
    sufixo: " mil+",
    rotulo: "em vendas diretas para delivery",
  },
  {
    valor: 1,
    sufixo: " mi+",
    rotulo: "de seguidores gerenciados",
    decimais: 1,
  },
];

export const processo = [
  {
    titulo: "Diagnóstico",
    descricao:
      "Analisamos sua presença digital, canais de venda e posicionamento — sem custo.",
  },
  {
    titulo: "Estratégia",
    descricao:
      "Conversa estratégica para entender o momento da empresa e mapear oportunidades.",
  },
  {
    titulo: "Proposta",
    descricao:
      "Plano personalizado com objetivos claros e o melhor caminho para crescer.",
  },
  {
    titulo: "Execução",
    descricao:
      "Mão na massa: campanhas, conteúdo e acompanhamento por métricas reais.",
  },
];

export const linkWhatsApp = () =>
  `https://wa.me/${marca.whatsapp}?text=${encodeURIComponent(marca.whatsappMsg)}`;
