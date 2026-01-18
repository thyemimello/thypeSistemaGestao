import { useState } from "react";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, MapPin, ChevronRight, Filter, Plus, Building2, User, Phone, 
  TrendingUp, TrendingDown, Star, Flame, Snowflake, ThermometerSun, Check, X 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Partner {
  id: number;
  name: string;
  type: "imobiliaria" | "corretor";
  classification: "ouro" | "prata" | "bronze";
  relationship: "frio" | "morno" | "quente" | "estrategico";
  city: string;
  contactName: string;
  phone: string;
  sales: number;
  reservations: number;
  lastContact: string;
}

export default function ManagerCarteira() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showCadastro, setShowCadastro] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nome: "",
    tipo: "imobiliaria",
    cidade: "",
    contato: "",
    telefone: ""
  });

  const [partners, setPartners] = useState<Partner[]>([
    { id: 1, name: "Imobiliária Premium", type: "imobiliaria", classification: "ouro", relationship: "estrategico", city: "São Paulo", contactName: "Carlos Silva", phone: "(11) 99999-0001", sales: 15, reservations: 8, lastContact: "Hoje" },
    { id: 2, name: "Corretor João Mendes", type: "corretor", classification: "prata", relationship: "quente", city: "São Paulo", contactName: "João Mendes", phone: "(11) 99999-0002", sales: 8, reservations: 3, lastContact: "Ontem" },
    { id: 3, name: "Imobiliária Elite", type: "imobiliaria", classification: "ouro", relationship: "quente", city: "Campinas", contactName: "Ana Costa", phone: "(19) 99999-0003", sales: 12, reservations: 5, lastContact: "3 dias" },
    { id: 4, name: "Corretor Pedro Lima", type: "corretor", classification: "bronze", relationship: "morno", city: "São Paulo", contactName: "Pedro Lima", phone: "(11) 99999-0004", sales: 3, reservations: 1, lastContact: "1 semana" },
    { id: 5, name: "Imobiliária Luxo SP", type: "imobiliaria", classification: "prata", relationship: "morno", city: "Santos", contactName: "Maria Santos", phone: "(13) 99999-0005", sales: 6, reservations: 2, lastContact: "5 dias" },
    { id: 6, name: "Corretor Marcos Oliveira", type: "corretor", classification: "bronze", relationship: "frio", city: "Guarulhos", contactName: "Marcos Oliveira", phone: "(11) 99999-0006", sales: 1, reservations: 0, lastContact: "2 semanas" },
  ]);

  const filteredPartners = partners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.contactName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !filterType || p.type === filterType;
    return matchesSearch && matchesType;
  });

  const getClassificationColor = (c: string) => {
    switch(c) {
      case "ouro": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "prata": return "bg-gray-400/20 text-gray-300 border-gray-400/30";
      case "bronze": return "bg-orange-600/20 text-orange-400 border-orange-600/30";
      default: return "bg-white/10 text-white/60";
    }
  };

  const getRelationshipIcon = (r: string) => {
    switch(r) {
      case "estrategico": return <Star className="w-3 h-3 text-yellow-400" />;
      case "quente": return <Flame className="w-3 h-3 text-red-400" />;
      case "morno": return <ThermometerSun className="w-3 h-3 text-orange-400" />;
      case "frio": return <Snowflake className="w-3 h-3 text-blue-400" />;
      default: return null;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.nome || !formData.cidade || !formData.contato) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, cidade e contato.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newPartner: Partner = {
      id: partners.length + 1,
      name: formData.nome,
      type: formData.tipo as "imobiliaria" | "corretor",
      classification: "bronze",
      relationship: "frio",
      city: formData.cidade,
      contactName: formData.contato,
      phone: formData.telefone,
      sales: 0,
      reservations: 0,
      lastContact: "Agora"
    };

    setPartners(prev => [newPartner, ...prev]);
    setSaving(false);
    setShowCadastro(false);
    setFormData({ nome: "", tipo: "imobiliaria", cidade: "", contato: "", telefone: "" });

    toast({
      title: "Parceiro cadastrado!",
      description: `${newPartner.name} foi adicionado à sua carteira.`,
    });
  };

  const totalSales = partners.reduce((acc, p) => acc + p.sales, 0);
  const totalReservations = partners.reduce((acc, p) => acc + p.reservations, 0);

  return (
    <MobileLayout role="manager">
      <div className="pb-8">
        <header className="px-6 pt-12 pb-4">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Minha Carteira</h1>
          <p className="text-sm text-muted-foreground">Parceiros imobiliários</p>
        </header>

        <div className="px-6 mb-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Buscar parceiro..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white h-11 rounded-xl"
                data-testid="input-search-parceiros"
              />
            </div>
            <Button 
              size="icon" 
              className="h-11 w-11 bg-primary hover:bg-primary/90 text-black rounded-xl"
              onClick={() => setShowCadastro(true)}
              data-testid="button-add-parceiro"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="px-6 flex gap-2 mb-4">
          <Button
            size="sm"
            variant={filterType === null ? "default" : "ghost"}
            className={`text-xs ${filterType === null ? "bg-primary text-black" : "text-white/60"}`}
            onClick={() => setFilterType(null)}
          >
            Todos ({partners.length})
          </Button>
          <Button
            size="sm"
            variant={filterType === "imobiliaria" ? "default" : "ghost"}
            className={`text-xs ${filterType === "imobiliaria" ? "bg-primary text-black" : "text-white/60"}`}
            onClick={() => setFilterType("imobiliaria")}
          >
            <Building2 className="w-3 h-3 mr-1" /> Imobiliárias
          </Button>
          <Button
            size="sm"
            variant={filterType === "corretor" ? "default" : "ghost"}
            className={`text-xs ${filterType === "corretor" ? "bg-primary text-black" : "text-white/60"}`}
            onClick={() => setFilterType("corretor")}
          >
            <User className="w-3 h-3 mr-1" /> Corretores
          </Button>
        </div>

        <div className="px-6 grid grid-cols-3 gap-3 mb-6">
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-white">{partners.length}</p>
              <p className="text-[9px] text-primary/80 uppercase">Parceiros</p>
            </CardContent>
          </Card>
          <Card className="bg-green-500/10 border-green-500/20">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-green-400">{totalSales}</p>
              <p className="text-[9px] text-green-400/80 uppercase">Vendas</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-500/10 border-blue-500/20">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-blue-400">{totalReservations}</p>
              <p className="text-[9px] text-blue-400/80 uppercase">Reservas</p>
            </CardContent>
          </Card>
        </div>

        <div className="px-6 space-y-3">
          {filteredPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card 
                className="bg-card border-white/5 overflow-hidden hover:border-primary/30 transition-colors cursor-pointer group"
                data-testid={`card-partner-${partner.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <Avatar className="h-12 w-12 border border-white/10">
                      <AvatarFallback className="bg-primary/20 text-primary font-bold text-sm">
                        {partner.type === "imobiliaria" ? <Building2 className="w-5 h-5" /> : partner.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bold text-white text-sm truncate pr-2">{partner.name}</h3>
                        <div className="flex items-center gap-1">
                          {getRelationshipIcon(partner.relationship)}
                          <Badge className={`text-[9px] border ${getClassificationColor(partner.classification)}`}>
                            {partner.classification.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-white/50 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {partner.city}
                      </p>
                      <p className="text-xs text-white/40 mt-0.5">{partner.contactName}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-xs">
                      <span className="text-green-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {partner.sales} vendas
                      </span>
                      <span className="text-blue-400">{partner.reservations} reservas</span>
                    </div>
                    <span className="text-[10px] text-white/30">{partner.lastContact}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filteredPartners.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">Nenhum parceiro encontrado.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showCadastro} onOpenChange={setShowCadastro}>
        <DialogContent className="bg-card border-white/10 text-white max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Novo Parceiro
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <Label className="text-xs text-white/50">Tipo</Label>
              <Select value={formData.tipo} onValueChange={(v) => handleInputChange("tipo", v)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  <SelectItem value="imobiliaria">Imobiliária</SelectItem>
                  <SelectItem value="corretor">Corretor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-white/50">Nome *</Label>
              <Input
                value={formData.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                placeholder={formData.tipo === "imobiliaria" ? "Nome da imobiliária" : "Nome do corretor"}
                className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                data-testid="input-nome-parceiro"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-white/50 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Cidade *
              </Label>
              <Input
                value={formData.cidade}
                onChange={(e) => handleInputChange("cidade", e.target.value)}
                placeholder="São Paulo"
                className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                data-testid="input-cidade-parceiro"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-white/50 flex items-center gap-1">
                <User className="w-3 h-3" /> Nome do Contato *
              </Label>
              <Input
                value={formData.contato}
                onChange={(e) => handleInputChange("contato", e.target.value)}
                placeholder="Nome da pessoa de contato"
                className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                data-testid="input-contato-parceiro"
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
                data-testid="input-telefone-parceiro"
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
                data-testid="button-salvar-parceiro"
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
