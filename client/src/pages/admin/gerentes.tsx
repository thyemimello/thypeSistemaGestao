import { useState } from "react";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MoreHorizontal, Plus, TrendingUp, TrendingDown, Search, Phone, Mail, MapPin, Users, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Manager {
  id: number;
  name: string;
  email: string;
  phone: string;
  region: string;
  avatar?: string;
  kpis: {
    roi: number;
    ieg: number;
    sales: number;
    reservations: number;
    effort: number;
    relationship: number;
  };
  partners: number;
}

export default function AdminGerentes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showCadastro, setShowCadastro] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    regiao: ""
  });

  const [managers, setManagers] = useState<Manager[]>([
    { 
      id: 1, 
      name: "Ricardo Silva", 
      email: "ricardo@thype.com.br",
      phone: "(11) 99999-1111",
      region: "Zona Sul",
      kpis: { roi: 125, ieg: 8.5, sales: 24, reservations: 12, effort: 87, relationship: 92 },
      partners: 18
    },
    { 
      id: 2, 
      name: "Amanda Costa", 
      email: "amanda@thype.com.br",
      phone: "(11) 99999-2222",
      region: "Jardins",
      kpis: { roi: 98, ieg: 7.8, sales: 18, reservations: 8, effort: 75, relationship: 85 },
      partners: 14
    },
    { 
      id: 3, 
      name: "Pedro Santos", 
      email: "pedro@thype.com.br",
      phone: "(11) 99999-3333",
      region: "Zona Oeste",
      kpis: { roi: 65, ieg: 6.2, sales: 10, reservations: 5, effort: 60, relationship: 70 },
      partners: 22
    },
    { 
      id: 4, 
      name: "Juliana Mendes", 
      email: "juliana@thype.com.br",
      phone: "(11) 99999-4444",
      region: "Centro",
      kpis: { roi: 110, ieg: 8.0, sales: 20, reservations: 10, effort: 82, relationship: 88 },
      partners: 16
    },
  ]);

  const filteredManagers = managers.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPerformanceColor = (roi: number) => {
    if (roi >= 100) return "text-green-500";
    if (roi >= 70) return "text-primary";
    return "text-yellow-500";
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.nome || !formData.email || !formData.regiao) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, email e região.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newManager: Manager = {
      id: managers.length + 1,
      name: formData.nome,
      email: formData.email,
      phone: formData.telefone,
      region: formData.regiao,
      kpis: { roi: 0, ieg: 0, sales: 0, reservations: 0, effort: 0, relationship: 0 },
      partners: 0
    };

    setManagers(prev => [newManager, ...prev]);
    setSaving(false);
    setShowCadastro(false);
    setFormData({ nome: "", email: "", telefone: "", regiao: "" });

    toast({
      title: "Gerente cadastrado!",
      description: `${newManager.name} foi adicionado com sucesso.`,
    });
  };

  return (
    <MobileLayout role="admin">
      <div className="pb-8">
        <header className="px-6 pt-12 pb-4">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Gerentes</h1>
          <p className="text-sm text-muted-foreground">Equipe de Relacionamento</p>
        </header>

        <div className="px-6 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Buscar gerente..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white h-11 rounded-xl"
              data-testid="input-search-gerentes"
            />
          </div>
        </div>

        <div className="px-6 flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Total de Gerentes</p>
            <p className="text-3xl font-bold text-white">{managers.length}</p>
          </div>
          <Button 
            size="sm" 
            className="h-10 bg-primary hover:bg-primary/90 text-black"
            onClick={() => setShowCadastro(true)}
            data-testid="button-add-manager"
          >
            <Plus className="w-4 h-4 mr-2" /> Novo Gerente
          </Button>
        </div>

        <div className="px-6 space-y-4">
          {filteredManagers.map((manager, index) => (
            <motion.div
              key={manager.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="bg-card border-white/5 overflow-hidden hover:border-primary/30 transition-colors"
                data-testid={`card-manager-${manager.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-14 w-14 border-2 border-white/10">
                      {manager.avatar ? (
                        <AvatarImage src={manager.avatar} alt={manager.name} />
                      ) : (
                        <AvatarFallback className="bg-primary/20 text-primary font-bold">
                          {manager.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-white text-base truncate" data-testid={`text-manager-name-${manager.id}`}>
                          {manager.name}
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 -mr-2 text-muted-foreground hover:text-white"
                          data-testid={`button-menu-${manager.id}`}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-white/50 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {manager.region}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] ${getPerformanceColor(manager.kpis.roi)} border-current`}
                        >
                          ROI: {manager.kpis.roi}%
                        </Badge>
                        <Badge variant="outline" className="text-[10px] text-white/60 border-white/20">
                          IEG: {manager.kpis.ieg}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] text-white/60 border-white/20">
                          <Users className="w-3 h-3 mr-1" /> {manager.partners}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-white" data-testid={`text-sales-${manager.id}`}>
                        {manager.kpis.sales}
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Vendas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white" data-testid={`text-reservations-${manager.id}`}>
                        {manager.kpis.reservations}
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Reservas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-primary" data-testid={`text-effort-${manager.id}`}>
                        {manager.kpis.effort}
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Esforço</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-primary" data-testid={`text-relationship-${manager.id}`}>
                        {manager.kpis.relationship}
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Relação</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {manager.kpis.roi >= 100 ? (
                      <div className="flex items-center gap-1 text-green-500 text-xs">
                        <TrendingUp className="w-3 h-3" />
                        <span>Alto Desempenho</span>
                      </div>
                    ) : manager.kpis.roi >= 70 ? (
                      <div className="flex items-center gap-1 text-primary text-xs">
                        <TrendingUp className="w-3 h-3" />
                        <span>Bom Desempenho</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-yellow-500 text-xs">
                        <TrendingDown className="w-3 h-3" />
                        <span>Precisa Atenção</span>
                      </div>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 text-xs border-white/10 hover:bg-white/5"
                      data-testid={`button-view-details-${manager.id}`}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filteredManagers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">Nenhum gerente encontrado.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showCadastro} onOpenChange={setShowCadastro}>
        <DialogContent className="bg-card border-white/10 text-white max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Novo Gerente
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <Label className="text-xs text-white/50">Nome Completo *</Label>
              <Input
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                placeholder="Nome do gerente"
                className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                data-testid="input-nome-gerente"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-white/50 flex items-center gap-1">
                <Mail className="w-3 h-3" /> E-mail *
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="email@thype.com.br"
                className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                data-testid="input-email-gerente"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-white/50 flex items-center gap-1">
                <Phone className="w-3 h-3" /> Telefone
              </Label>
              <Input
                value={formData.telefone}
                onChange={(e) => handleInputChange("telefone", e.target.value)}
                placeholder="(11) 99999-9999"
                className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                data-testid="input-telefone-gerente"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-white/50 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Região de Atuação *
              </Label>
              <Input
                value={formData.regiao}
                onChange={(e) => handleInputChange("regiao", e.target.value)}
                placeholder="Ex: Zona Sul, Jardins..."
                className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                data-testid="input-regiao-gerente"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                onClick={() => setShowCadastro(false)}
                variant="outline"
                className="flex-1 h-11 border-white/10 text-white hover:bg-white/5 rounded-xl"
              >
                <X className="w-4 h-4 mr-2" /> Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                disabled={saving}
                className="flex-1 h-11 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl"
                data-testid="button-salvar-gerente"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Cadastrar
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MobileLayout>
  );
}
