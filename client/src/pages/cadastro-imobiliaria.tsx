
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { ArrowLeft, Building, User } from "lucide-react";

export default function CadastroImobiliaria() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [type, setType] = useState("imobiliaria");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Cadastro realizado!",
      description: "O novo parceiro foi adicionado à base.",
    });

    setTimeout(() => {
      setLocation("/master/dashboard");
    }, 1500);
  };

  return (
    <DashboardLayout role="master">
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => window.history.back()} className="mb-4 pl-0">
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>

        <Card className="glass-card border-border">
          <CardHeader>
            <CardTitle>Novo Cadastro</CardTitle>
            <CardDescription>Cadastre uma Imobiliária ou Corretor Autônomo.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${type === 'imobiliaria' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/30'}`}
                  onClick={() => setType('imobiliaria')}
                >
                  <Building className="w-6 h-6" />
                  <span className="font-medium">Imobiliária</span>
                </div>
                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col items-center gap-2 ${type === 'corretor' ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/30'}`}
                  onClick={() => setType('corretor')}
                >
                  <User className="w-6 h-6" />
                  <span className="font-medium">Corretor</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Nome Comercial</Label>
                <Input placeholder={type === 'imobiliaria' ? "Ex: Imobiliária Elite" : "Ex: João Silva"} className="bg-white border-input" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cidade/Região</Label>
                  <Input placeholder="Ex: São Paulo" className="bg-white border-input" />
                </div>
                <div className="space-y-2">
                  <Label>Classificação Inicial</Label>
                  <Select>
                    <SelectTrigger className="bg-white border-input">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ouro">Ouro</SelectItem>
                      <SelectItem value="prata">Prata</SelectItem>
                      <SelectItem value="bronze">Bronze</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Responsável / Contato Principal</Label>
                <Input placeholder="Nome do contato" className="bg-white border-input" />
              </div>

              <div className="flex items-center gap-2 pt-2">
                 <input type="checkbox" id="active" className="rounded border-input bg-white" defaultChecked />
                 <Label htmlFor="active" className="cursor-pointer">Cadastro Ativo</Label>
              </div>

              <Button type="submit" className="w-full h-11 text-base shadow-lg shadow-primary/25 mt-4">
                Cadastrar Parceiro
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
