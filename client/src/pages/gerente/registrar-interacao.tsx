
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { clients } from "@/mock/data";
import { useLocation } from "wouter";
import { CheckCircle2, ArrowLeft } from "lucide-react";

export default function RegistrarInteracao() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [quality, setQuality] = useState([3]);

  // Handle URL params manually since wouter's hook is simple
  const searchParams = new URLSearchParams(window.location.search);
  const preSelectedClientId = searchParams.get('client');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Interação registrada!",
      description: "Os dados foram salvos e o score recalculado (simulação).",
      action: <CheckCircle2 className="text-emerald-500" />,
    });

    setTimeout(() => {
      setLocation("/gerente/painel");
    }, 1500);
  };

  return (
    <DashboardLayout role="gerente">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4 pl-0 hover:pl-2 transition-all">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>

        <Card className="glass-card border-border">
          <CardHeader>
            <CardTitle>Registrar Nova Interação</CardTitle>
            <CardDescription>Documente cada ponto de contato para alimentar o algoritmo de score.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <Label>Cliente</Label>
                <Select defaultValue={preSelectedClientId || undefined}>
                  <SelectTrigger className="bg-white border-input">
                    <SelectValue placeholder="Selecione o cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients.map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.name} ({c.classification})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tipo de Interação</Label>
                  <Select>
                    <SelectTrigger className="bg-white border-input">
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="ligacao">Ligação</SelectItem>
                      <SelectItem value="reuniao-online">Reunião Online</SelectItem>
                      <SelectItem value="reuniao-presencial">Reunião Presencial</SelectItem>
                      <SelectItem value="visita-tecnica">Visita Técnica</SelectItem>
                      <SelectItem value="almoco">Almoço Estratégico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Data</Label>
                  <Input type="date" className="bg-white border-input" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <Label>Duração (minutos)</Label>
                  <Input type="number" placeholder="Ex: 30" className="bg-white border-input" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Qualidade da Interação (1 a 5)</Label>
                  <span className="font-bold text-primary">{quality[0]}</span>
                </div>
                <Slider 
                  value={quality} 
                  onValueChange={setQuality} 
                  max={5} 
                  step={1} 
                  className="py-4"
                />
                <p className="text-xs text-muted-foreground">
                  1 = Fraca/Sem resposta | 5 = Excelente/Fechamento
                </p>
              </div>

              <div className="space-y-2">
                <Label>Observações e Próximos Passos</Label>
                <Textarea 
                  placeholder="Descreva o que foi conversado e qual o próximo passo combinado..." 
                  className="bg-white border-input min-h-[100px]"
                />
              </div>

              <Button type="submit" className="w-full h-11 text-base shadow-lg shadow-primary/25">
                Salvar Interação
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
