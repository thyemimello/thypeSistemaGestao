import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, Building2, MapPin, ChevronRight, Filter, Grid3X3, List, Star, Calendar, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const empreendimentos = [
  { 
    id: 1, 
    nome: "AMÓS", 
    status: "Lançamento", 
    tipo: "Residencial",
    unidades: 120,
    cidade: "Florianópolis - SC",
    precoMin: "R$ 450.000",
    destaque: true,
    entrega: "Dez/2026"
  },
  { 
    id: 2, 
    nome: "EFÉSIOS", 
    status: "Em obras", 
    tipo: "Residencial",
    unidades: 84,
    cidade: "Joinville - SC",
    precoMin: "R$ 380.000",
    destaque: false,
    entrega: "Jun/2025"
  },
  { 
    id: 3, 
    nome: "EL CHAI", 
    status: "Lançamento", 
    tipo: "Residencial",
    unidades: 96,
    cidade: "Balneário Camboriú - SC",
    precoMin: "R$ 520.000",
    destaque: true,
    entrega: "Mar/2027"
  },
  { 
    id: 4, 
    nome: "EL SHADDAI", 
    status: "Em obras", 
    tipo: "Residencial",
    unidades: 64,
    cidade: "Blumenau - SC",
    precoMin: "R$ 290.000",
    destaque: false,
    entrega: "Set/2025"
  },
  { 
    id: 5, 
    nome: "ELON", 
    status: "Lançamento", 
    tipo: "Comercial",
    unidades: 48,
    cidade: "Itajaí - SC",
    precoMin: "R$ 680.000",
    destaque: false,
    entrega: "Ago/2026"
  },
  { 
    id: 6, 
    nome: "FILIPENSES", 
    status: "Em obras", 
    tipo: "Residencial",
    unidades: 72,
    cidade: "Chapecó - SC",
    precoMin: "R$ 320.000",
    destaque: false,
    entrega: "Abr/2025"
  },
  { 
    id: 7, 
    nome: "HEBRON", 
    status: "Pronto", 
    tipo: "Residencial",
    unidades: 108,
    cidade: "Criciúma - SC",
    precoMin: "R$ 410.000",
    destaque: true,
    entrega: "Entregue"
  },
  { 
    id: 9, 
    nome: "MAR DA GALILEIA", 
    status: "Em obras", 
    tipo: "Resort",
    unidades: 200,
    cidade: "Bombinhas - SC",
    precoMin: "R$ 750.000",
    destaque: true,
    entrega: "Dez/2026"
  },
  { 
    id: 10, 
    nome: "OBRA ENTREGUE", 
    status: "Pronto", 
    tipo: "Residencial",
    unidades: 88,
    cidade: "São José - SC",
    precoMin: "R$ 355.000",
    destaque: false,
    entrega: "Entregue"
  },
  { 
    id: 11, 
    nome: "SALEM", 
    status: "Lançamento", 
    tipo: "Residencial",
    unidades: 132,
    cidade: "Jaraguá do Sul - SC",
    precoMin: "R$ 470.000",
    destaque: false,
    entrega: "Mai/2027"
  },
  { 
    id: 12, 
    nome: "SKY BLUE", 
    status: "Em obras", 
    tipo: "Residencial",
    unidades: 180,
    cidade: "Palhoça - SC",
    precoMin: "R$ 620.000",
    destaque: true,
    entrega: "Out/2026"
  },
];

const statusColors: Record<string, string> = {
  "Lançamento": "bg-primary text-black",
  "Em obras": "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  "Pronto": "bg-green-500/20 text-green-400 border border-green-500/30",
};

export default function Catalogo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedEmpreendimento, setSelectedEmpreendimento] = useState<typeof empreendimentos[0] | null>(null);

  const filteredEmpreendimentos = empreendimentos.filter(emp => {
    const matchesSearch = emp.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.cidade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterStatus || emp.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const statusCounts = {
    all: empreendimentos.length,
    "Lançamento": empreendimentos.filter(e => e.status === "Lançamento").length,
    "Em obras": empreendimentos.filter(e => e.status === "Em obras").length,
    "Pronto": empreendimentos.filter(e => e.status === "Pronto").length,
  };

  return (
    <MobileLayout>
      <AnimatePresence mode="wait">
        {selectedEmpreendimento ? (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="min-h-screen"
          >
            <div className="relative h-48 bg-gradient-to-br from-zinc-900 to-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 className="w-20 h-20 text-primary/30" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-12 left-4 bg-black/40 backdrop-blur-md rounded-full"
                onClick={() => setSelectedEmpreendimento(null)}
                data-testid="button-back-catalog"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </Button>
              {selectedEmpreendimento.destaque && (
                <Badge className="absolute top-12 right-4 bg-primary text-black">
                  <Star className="w-3 h-3 mr-1" /> Destaque
                </Badge>
              )}
            </div>
            
            <div className="px-6 -mt-8 relative z-10">
              <Card className="p-6 bg-zinc-900/80 backdrop-blur-md border-white/10">
                <Badge className={statusColors[selectedEmpreendimento.status]}>
                  {selectedEmpreendimento.status}
                </Badge>
                <h1 className="text-2xl font-display font-bold text-white mt-3">
                  {selectedEmpreendimento.nome}
                </h1>
                <div className="flex items-center gap-2 text-white/60 mt-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{selectedEmpreendimento.cidade}</span>
                </div>
              </Card>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <Card className="p-4 bg-zinc-900/50 border-white/10">
                  <p className="text-xs text-white/50 uppercase">Unidades</p>
                  <p className="text-xl font-bold text-white">{selectedEmpreendimento.unidades}</p>
                </Card>
                <Card className="p-4 bg-zinc-900/50 border-white/10">
                  <p className="text-xs text-white/50 uppercase">Tipo</p>
                  <p className="text-xl font-bold text-white">{selectedEmpreendimento.tipo}</p>
                </Card>
                <Card className="p-4 bg-zinc-900/50 border-white/10">
                  <p className="text-xs text-white/50 uppercase">A partir de</p>
                  <p className="text-lg font-bold text-primary">{selectedEmpreendimento.precoMin}</p>
                </Card>
                <Card className="p-4 bg-zinc-900/50 border-white/10">
                  <p className="text-xs text-white/50 uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Entrega
                  </p>
                  <p className="text-lg font-bold text-white">{selectedEmpreendimento.entrega}</p>
                </Card>
              </div>

              <div className="mt-6 space-y-3">
                <Button className="w-full bg-primary text-black hover:bg-primary/90" data-testid="button-view-units">
                  Ver Unidades Disponíveis
                </Button>
                <Button variant="outline" className="w-full border-white/20 text-white" data-testid="button-download-material">
                  Baixar Material de Vendas
                </Button>
              </div>

              <div className="mt-6 pb-24">
                <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-3">Documentos</h3>
                <div className="space-y-2">
                  {["Book de Vendas", "Tabela de Preços", "Memorial Descritivo", "Plantas"].map((doc, i) => (
                    <Card 
                      key={i}
                      className="p-3 bg-zinc-900/50 border-white/10 flex items-center justify-between cursor-pointer hover:bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <Folder className="w-5 h-5 text-primary" />
                        <span className="text-sm text-white">{doc}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/40" />
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-24"
          >
            <header className="px-6 pt-12 pb-4 sticky top-0 bg-black/80 backdrop-blur-md z-40 border-b border-white/5">
              <h1 className="text-xl font-display font-bold text-white mb-4">Catálogo de Empreendimentos</h1>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <Input
                  placeholder="Buscar empreendimento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40"
                  data-testid="input-search-catalog"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <Button
                  size="sm"
                  variant={filterStatus === null ? "default" : "ghost"}
                  className={`text-xs ${filterStatus === null ? "bg-primary text-black" : "text-white/60 border-white/10"}`}
                  onClick={() => setFilterStatus(null)}
                  data-testid="filter-all"
                >
                  Todos
                </Button>
                <Button
                  size="sm"
                  variant={filterStatus === "Lançamento" ? "default" : "ghost"}
                  className={`text-xs ${filterStatus === "Lançamento" ? "bg-primary text-black" : "text-white/60 border-white/10"}`}
                  onClick={() => setFilterStatus("Lançamento")}
                  data-testid="filter-lancamento"
                >
                  Lançamento
                </Button>
                <Button
                  size="sm"
                  variant={filterStatus === "Em obras" ? "default" : "ghost"}
                  className={`text-xs ${filterStatus === "Em obras" ? "bg-primary text-black" : "text-white/60 border-white/10"}`}
                  onClick={() => setFilterStatus("Em obras")}
                  data-testid="filter-em-obras"
                >
                  Em obras
                </Button>
                <Button
                  size="sm"
                  variant={filterStatus === "Pronto" ? "default" : "ghost"}
                  className={`text-xs ${filterStatus === "Pronto" ? "bg-primary text-black" : "text-white/60 border-white/10"}`}
                  onClick={() => setFilterStatus("Pronto")}
                  data-testid="filter-pronto"
                >
                  Pronto
                </Button>
                
                <div className="flex gap-1 ml-auto">
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`h-8 w-8 ${viewMode === "list" ? "text-primary" : "text-white/40"}`}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`h-8 w-8 ${viewMode === "grid" ? "text-primary" : "text-white/40"}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </header>

            <div className={`px-6 mt-4 ${viewMode === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3"}`}>
              {filteredEmpreendimentos.map((emp, index) => (
                <motion.div
                  key={emp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedEmpreendimento(emp)}
                  className="cursor-pointer"
                  data-testid={`card-empreendimento-${emp.id}`}
                >
                  {viewMode === "list" ? (
                    <Card className="p-4 bg-zinc-900/50 border-white/10 hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                          <Folder className="w-6 h-6 text-primary/60" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-white truncate">{emp.nome}</h3>
                            {emp.destaque && <Star className="w-3 h-3 text-primary fill-primary" />}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={`text-[10px] px-1.5 py-0 ${statusColors[emp.status]}`}>
                              {emp.status}
                            </Badge>
                            <span className="text-xs text-white/40">{emp.cidade}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-white/30" />
                      </div>
                    </Card>
                  ) : (
                    <Card className="p-4 bg-zinc-900/50 border-white/10 hover:bg-white/5 transition-colors h-full">
                      <div className="w-full aspect-square rounded-lg bg-zinc-800 flex items-center justify-center mb-3">
                        <Folder className="w-10 h-10 text-primary/40" />
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <h3 className="font-medium text-white text-sm truncate">{emp.nome}</h3>
                        {emp.destaque && <Star className="w-3 h-3 text-primary fill-primary flex-shrink-0" />}
                      </div>
                      <Badge className={`text-[10px] px-1.5 py-0 ${statusColors[emp.status]}`}>
                        {emp.status}
                      </Badge>
                    </Card>
                  )}
                </motion.div>
              ))}
            </div>

            {filteredEmpreendimentos.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-white/40">
                <Search className="w-12 h-12 mb-4" />
                <p>Nenhum empreendimento encontrado</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </MobileLayout>
  );
}
