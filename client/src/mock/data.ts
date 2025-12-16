
export interface Manager {
  id: string;
  name: string;
  role: 'Master' | 'Gerente';
  avatar: string;
  kpis: {
    effort: number;
    relationship: number;
    roi: number;
    ieg: number;
    sales: number;
    reservations: number;
  };
}

export interface Client {
  id: string;
  name: string;
  type: 'Imobiliária' | 'Corretor';
  classification: 'Ouro' | 'Prata' | 'Bronze';
  relationship: 'Frio' | 'Morno' | 'Quente' | 'Estratégico';
  managerId: string;
  city: string;
  contactName: string;
  status: 'Ativo' | 'Inativo';
  metrics: {
    sales: number;
    reservations: number;
    roi: number;
    lastContact: string;
  };
}

export interface Interaction {
  id: string;
  clientId: string;
  clientName: string;
  managerId: string;
  type: 'WhatsApp' | 'Ligação' | 'Reunião online' | 'Reunião presencial' | 'Visita técnica' | 'Treinamento' | 'Almoço estratégico' | 'Entrega de material';
  date: string;
  duration: number;
  quality: 1 | 2 | 3 | 4 | 5;
  notes: string;
}

export const managers: Manager[] = [
  {
    id: 'm1',
    name: 'Roberto Almeida',
    role: 'Gerente',
    avatar: 'https://i.pravatar.cc/150?u=m1',
    kpis: { effort: 85, relationship: 90, roi: 120, ieg: 1.4, sales: 15, reservations: 42 }
  },
  {
    id: 'm2',
    name: 'Fernanda Costa',
    role: 'Gerente',
    avatar: 'https://i.pravatar.cc/150?u=m2',
    kpis: { effort: 92, relationship: 78, roi: 95, ieg: 1.03, sales: 12, reservations: 30 }
  },
  {
    id: 'm3',
    name: 'Carlos Silva',
    role: 'Gerente',
    avatar: 'https://i.pravatar.cc/150?u=m3',
    kpis: { effort: 60, relationship: 65, roi: 40, ieg: 0.66, sales: 5, reservations: 12 }
  },
  {
    id: 'm4',
    name: 'Juliana Santos',
    role: 'Gerente',
    avatar: 'https://i.pravatar.cc/150?u=m4',
    kpis: { effort: 70, relationship: 88, roi: 110, ieg: 1.57, sales: 14, reservations: 35 }
  },
  {
    id: 'm5',
    name: 'Marcos Pereira',
    role: 'Gerente',
    avatar: 'https://i.pravatar.cc/150?u=m5',
    kpis: { effort: 45, relationship: 50, roi: 30, ieg: 0.66, sales: 3, reservations: 8 }
  },
  {
    id: 'm6',
    name: 'Ana Oliveira',
    role: 'Gerente',
    avatar: 'https://i.pravatar.cc/150?u=m6',
    kpis: { effort: 88, relationship: 92, roi: 130, ieg: 1.47, sales: 18, reservations: 50 }
  }
];

export const clients: Client[] = [
  {
    id: 'c1',
    name: 'Imobiliária Elite',
    type: 'Imobiliária',
    classification: 'Ouro',
    relationship: 'Estratégico',
    managerId: 'm1',
    city: 'São Paulo',
    contactName: 'Ricardo',
    status: 'Ativo',
    metrics: { sales: 8, reservations: 20, roi: 150, lastContact: '2025-12-14' }
  },
  {
    id: 'c2',
    name: 'Corretor João',
    type: 'Corretor',
    classification: 'Prata',
    relationship: 'Quente',
    managerId: 'm1',
    city: 'São Paulo',
    contactName: 'João',
    status: 'Ativo',
    metrics: { sales: 3, reservations: 8, roi: 90, lastContact: '2025-12-10' }
  },
  {
    id: 'c3',
    name: 'Imobiliária Nova Era',
    type: 'Imobiliária',
    classification: 'Bronze',
    relationship: 'Morno',
    managerId: 'm2',
    city: 'Campinas',
    contactName: 'Sônia',
    status: 'Ativo',
    metrics: { sales: 1, reservations: 4, roi: 50, lastContact: '2025-11-28' }
  },
  {
    id: 'c4',
    name: 'Imobiliária Prime',
    type: 'Imobiliária',
    classification: 'Ouro',
    relationship: 'Frio',
    managerId: 'm3',
    city: 'Santos',
    contactName: 'Pedro',
    status: 'Ativo',
    metrics: { sales: 0, reservations: 2, roi: 20, lastContact: '2025-10-15' }
  },
  {
    id: 'c5',
    name: 'Corretora Maria',
    type: 'Corretor',
    classification: 'Prata',
    relationship: 'Morno',
    managerId: 'm4',
    city: 'Ribeirão Preto',
    contactName: 'Maria',
    status: 'Ativo',
    metrics: { sales: 2, reservations: 6, roi: 70, lastContact: '2025-12-05' }
  },
  // Add more as needed to reach ~25
];

// Fill up clients mock data
for (let i = 6; i <= 25; i++) {
  const types: ('Imobiliária' | 'Corretor')[] = ['Imobiliária', 'Corretor'];
  const classifications: ('Ouro' | 'Prata' | 'Bronze')[] = ['Ouro', 'Prata', 'Bronze'];
  const relationships: ('Frio' | 'Morno' | 'Quente' | 'Estratégico')[] = ['Frio', 'Morno', 'Quente', 'Estratégico'];
  
  clients.push({
    id: `c${i}`,
    name: `Cliente Mock ${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    classification: classifications[Math.floor(Math.random() * classifications.length)],
    relationship: relationships[Math.floor(Math.random() * relationships.length)],
    managerId: managers[Math.floor(Math.random() * managers.length)].id,
    city: 'Cidade Exemplo',
    contactName: `Contato ${i}`,
    status: 'Ativo',
    metrics: {
      sales: Math.floor(Math.random() * 5),
      reservations: Math.floor(Math.random() * 10),
      roi: Math.floor(Math.random() * 100),
      lastContact: '2025-12-01'
    }
  });
}

export const interactions: Interaction[] = [
  {
    id: 'i1',
    clientId: 'c1',
    clientName: 'Imobiliária Elite',
    managerId: 'm1',
    type: 'Almoço estratégico',
    date: '2025-12-14',
    duration: 90,
    quality: 5,
    notes: 'Alinhamento de metas para o próximo trimestre.'
  },
  {
    id: 'i2',
    clientId: 'c2',
    clientName: 'Corretor João',
    managerId: 'm1',
    type: 'WhatsApp',
    date: '2025-12-15',
    duration: 10,
    quality: 3,
    notes: 'Envio de tabela atualizada.'
  }
];

export const alerts = [
  { id: 1, type: 'critical', message: 'Cliente Ouro Imobiliária Prime sem visita há 60 dias' },
  { id: 2, type: 'warning', message: 'Gerente Carlos Silva com alto esforço e baixo retorno' },
  { id: 3, type: 'opportunity', message: 'Cliente Bronze Corretora Maria com potencial de upgrade' },
  { id: 4, type: 'info', message: 'Queda de conversão geral em 5% neste mês' }
];

export const monthlyData = [
  { name: 'Jan', vendas: 40, reservas: 24 },
  { name: 'Fev', vendas: 30, reservas: 13 },
  { name: 'Mar', vendas: 20, reservas: 98 },
  { name: 'Abr', vendas: 27, reservas: 39 },
  { name: 'Mai', vendas: 18, reservas: 48 },
  { name: 'Jun', vendas: 23, reservas: 38 },
  { name: 'Jul', vendas: 34, reservas: 43 },
  { name: 'Ago', vendas: 40, reservas: 24 },
  { name: 'Set', vendas: 30, reservas: 13 },
  { name: 'Out', vendas: 20, reservas: 98 },
  { name: 'Nov', vendas: 27, reservas: 39 },
  { name: 'Dez', vendas: 50, reservas: 80 },
];
