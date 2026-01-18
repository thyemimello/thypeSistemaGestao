import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Building2, MapPin, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import MobileLayout from "@/components/layout/MobileLayout";

export default function AdminImoveis() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const imoveis = [
    { id: 1, name: "POSH Residence", location: "Jardins, SP", units: 48, sold: 32, status: "Lançamento", price: "R$ 4.2M" },
    { id: 2, name: "Aurum Tower", location: "Vila Nova, SP", units: 120, sold: 98, status: "Em obras", price: "R$ 2.4M" },
    { id: 3, name: "Legacy Mansion", location: "Morumbi, SP", units: 24, sold: 24, status: "Pronto", price: "R$ 5.8M" },
    { id: 4, name: "VPR Corporate", location: "Faria Lima, SP", units: 200, sold: 145, status: "Em obras", price: "Sob Consulta" },
    { id: 5, name: "Sky Blue Tower", location: "Pinheiros, SP", units: 80, sold: 15, status: "Lançamento", price: "R$ 1.8M" },
  ];

  const filteredImoveis = imoveis.filter(im => {
    const matchesSearch = im.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         im.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || im.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Lançamento": return "bg-primary/20 text-primary border-primary/30";
      case "Em obras": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Pronto": return "bg-green-500/20 text-green-400 border-green-500/30";
      default: return "bg-white/10 text-white/60 border-white/20";
    }
  };

  return (
    <MobileLayout role="admin">
      <div className="min-h-screen bg-background pb-8">
        <header className="px-6 pt-12 pb-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-display font-bold text-white">Imóveis</h1>
            <Button size="sm" className="h-9 bg-primary hover:bg-primary/90 text-black">
              <Plus className="w-4 h-4 mr-1" /> Novo
            </Button>
          </div>
          <p className="text-sm text-white/50">Gestão de empreendimentos</p>
        </header>

        <div className="px-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Buscar imóvel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white h-11 rounded-xl"
              data-testid="input-search-imoveis"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={filterStatus === null ? "default" : "ghost"}
              className={`text-xs ${filterStatus === null ? "bg-primary text-black" : "text-white/60"}`}
              onClick={() => setFilterStatus(null)}
            >
              Todos
            </Button>
            {["Lançamento", "Em obras", "Pronto"].map(status => (
              <Button
                key={status}
                size="sm"
                variant={filterStatus === status ? "default" : "ghost"}
                className={`text-xs ${filterStatus === status ? "bg-primary text-black" : "text-white/60"}`}
                onClick={() => setFilterStatus(status)}
              >
                {status}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-4 text-center">
                <Building2 className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">{imoveis.length}</p>
                <p className="text-[10px] text-primary/80 uppercase">Empreendimentos</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-2xl font-bold text-white">
                  {Math.round(imoveis.reduce((acc, im) => acc + (im.sold / im.units) * 100, 0) / imoveis.length)}%
                </p>
                <p className="text-[10px] text-white/50 uppercase">Média Vendas</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            {filteredImoveis.map((imovel, index) => (
              <motion.div
                key={imovel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-card border-white/5 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">{imovel.name}</h3>
                        <div className="flex items-center gap-1 text-xs text-white/50 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {imovel.location}
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(imovel.status)} text-[10px] border`}>
                        {imovel.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-white/50">
                          <Users className="w-3 h-3 inline mr-1" />
                          {imovel.sold}/{imovel.units} unidades
                        </span>
                      </div>
                      <span className="text-primary font-semibold">{imovel.price}</span>
                    </div>

                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(imovel.sold / imovel.units) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-white/40 mt-1 text-right">
                      {Math.round((imovel.sold / imovel.units) * 100)}% vendido
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
