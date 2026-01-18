import { useState } from "react";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Plus, MessageSquare, Phone, Video, Users, Coffee, 
  GraduationCap, Package, Calendar, Clock, Star, Check, X, Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Interaction {
  id: number;
  partnerName: string;
  type: string;
  date: string;
  duration: number;
  quality: number;
  notes: string;
}

const interactionTypes = [
  { value: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { value: "ligacao", label: "Ligação", icon: Phone },
  { value: "reuniao_online", label: "Reunião Online", icon: Video },
  { value: "reuniao_presencial", label: "Reunião Presencial", icon: Users },
  { value: "visita_tecnica", label: "Visita Técnica", icon: Users },
  { value: "treinamento", label: "Treinamento", icon: GraduationCap },
  { value: "almoco_estrategico", label: "Almoço Estratégico", icon: Coffee },
  { value: "entrega_material", label: "Entrega de Material", icon: Package },
];

export default function ManagerInteracoes() {
  const [showRegistro, setShowRegistro] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    parceiro: "",
    tipo: "whatsapp",
    data: new Date().toISOString().split('T')[0],
    duracao: "30",
    qualidade: "4",
    notas: ""
  });

  const [interactions, setInteractions] = useState<Interaction[]>([
    { id: 1, partnerName: "Imobiliária Premium", type: "reuniao_presencial", date: "Hoje, 14:00", duration: 60, quality: 5, notes: "Apresentação do novo empreendimento POSH" },
    { id: 2, partnerName: "Corretor João Mendes", type: "whatsapp", date: "Hoje, 10:30", duration: 15, quality: 4, notes: "Follow-up da proposta" },
    { id: 3, partnerName: "Imobiliária Elite", type: "ligacao", date: "Ontem, 16:00", duration: 20, quality: 4, notes: "Alinhamento de metas do mês" },
    { id: 4, partnerName: "Corretor Pedro Lima", type: "treinamento", date: "Ontem, 09:00", duration: 120, quality: 5, notes: "Treinamento sobre tabela de vendas" },
    { id: 5, partnerName: "Imobiliária Luxo SP", type: "almoco_estrategico", date: "3 dias atrás", duration: 90, quality: 5, notes: "Almoço com diretoria para fechar parceria" },
  ]);

  const filteredInteractions = filterType 
    ? interactions.filter(i => i.type === filterType)
    : interactions;

  const getTypeInfo = (type: string) => {
    return interactionTypes.find(t => t.value === type) || interactionTypes[0];
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!formData.parceiro) {
      toast({
        title: "Campo obrigatório",
        description: "Selecione um parceiro.",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newInteraction: Interaction = {
      id: interactions.length + 1,
      partnerName: formData.parceiro,
      type: formData.tipo,
      date: "Agora",
      duration: parseInt(formData.duracao),
      quality: parseInt(formData.qualidade),
      notes: formData.notas
    };

    setInteractions(prev => [newInteraction, ...prev]);
    setSaving(false);
    setShowRegistro(false);
    setFormData({
      parceiro: "",
      tipo: "whatsapp",
      data: new Date().toISOString().split('T')[0],
      duracao: "30",
      qualidade: "4",
      notas: ""
    });

    toast({
      title: "Interação registrada!",
      description: "O registro foi salvo com sucesso.",
    });
  };

  const partners = [
    "Imobiliária Premium",
    "Corretor João Mendes",
    "Imobiliária Elite",
    "Corretor Pedro Lima",
    "Imobiliária Luxo SP",
    "Corretor Marcos Oliveira"
  ];

  return (
    <MobileLayout role="manager">
      <div className="pb-8">
        <header className="px-6 pt-12 pb-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-display font-bold text-white">Interações</h1>
            <Button 
              size="sm" 
              className="h-9 bg-primary hover:bg-primary/90 text-black"
              onClick={() => setShowRegistro(true)}
              data-testid="button-nova-interacao"
            >
              <Plus className="w-4 h-4 mr-1" /> Registrar
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Histórico de contatos</p>
        </header>

        <div className="px-6 mb-4 flex gap-2 flex-wrap">
          <Button
            size="sm"
            variant={filterType === null ? "default" : "ghost"}
            className={`text-xs ${filterType === null ? "bg-primary text-black" : "text-white/60"}`}
            onClick={() => setFilterType(null)}
          >
            Todos
          </Button>
          {interactionTypes.slice(0, 4).map(type => (
            <Button
              key={type.value}
              size="sm"
              variant={filterType === type.value ? "default" : "ghost"}
              className={`text-xs ${filterType === type.value ? "bg-primary text-black" : "text-white/60"}`}
              onClick={() => setFilterType(type.value)}
            >
              <type.icon className="w-3 h-3 mr-1" />
              {type.label}
            </Button>
          ))}
        </div>

        <div className="px-6 grid grid-cols-2 gap-3 mb-6">
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-white">{interactions.length}</p>
              <p className="text-[9px] text-primary/80 uppercase">Esta Semana</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-white">
                {Math.round(interactions.reduce((acc, i) => acc + i.duration, 0) / 60)}h
              </p>
              <p className="text-[9px] text-white/50 uppercase">Tempo Total</p>
            </CardContent>
          </Card>
        </div>

        <div className="px-6 space-y-3">
          {filteredInteractions.map((interaction, index) => {
            const typeInfo = getTypeInfo(interaction.type);
            const TypeIcon = typeInfo.icon;
            
            return (
              <motion.div
                key={interaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-card border-white/5 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <TypeIcon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-white text-sm truncate">{interaction.partnerName}</h3>
                        <p className="text-xs text-white/50">{typeInfo.label}</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star 
                            key={star} 
                            className={`w-3 h-3 ${star <= interaction.quality ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-white/40 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {interaction.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {interaction.duration} min
                      </span>
                    </div>

                    {interaction.notes && (
                      <p className="text-xs text-white/60 bg-white/5 rounded-lg p-2 mt-2">
                        {interaction.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          {filteredInteractions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm">Nenhuma interação encontrada.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showRegistro} onOpenChange={setShowRegistro}>
        <DialogContent className="bg-card border-white/10 text-white max-w-sm mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Registrar Interação
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <Label className="text-xs text-white/50">Parceiro *</Label>
              <Select value={formData.parceiro} onValueChange={(v) => handleInputChange("parceiro", v)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl">
                  <SelectValue placeholder="Selecione o parceiro" />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  {partners.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-white/50">Tipo de Interação</Label>
              <Select value={formData.tipo} onValueChange={(v) => handleInputChange("tipo", v)}>
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  {interactionTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <span className="flex items-center gap-2">
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Data
                </Label>
                <Input
                  type="date"
                  value={formData.data}
                  onChange={(e) => handleInputChange("data", e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-white/50 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Duração (min)
                </Label>
                <Input
                  type="number"
                  value={formData.duracao}
                  onChange={(e) => handleInputChange("duracao", e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-white/50">Qualidade da Interação</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleInputChange("qualidade", star.toString())}
                    className="p-2"
                  >
                    <Star 
                      className={`w-6 h-6 transition-colors ${
                        star <= parseInt(formData.qualidade) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-white/20 hover:text-yellow-400/50'
                      }`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs text-white/50">Observações</Label>
              <Textarea
                value={formData.notas}
                onChange={(e) => handleInputChange("notas", e.target.value)}
                placeholder="Descreva os principais pontos da interação..."
                className="bg-white/5 border-white/10 text-white rounded-xl min-h-[80px] resize-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                onClick={() => setShowRegistro(false)}
                variant="outline"
                className="flex-1 h-11 border-white/10 text-white hover:bg-white/5 rounded-xl"
              >
                <X className="w-4 h-4 mr-2" /> Cancelar
              </Button>
              <Button 
                onClick={handleSave}
                disabled={saving}
                className="flex-1 h-11 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl"
                data-testid="button-salvar-interacao"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Registrar
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
