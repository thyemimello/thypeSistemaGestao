
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Lock, User, ShieldCheck, Mail, Phone, FileText, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    creciUF: "",
    creciNumber: "",
    password: "",
    confirmPassword: ""
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate CRECI Validation with External API
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock validation logic
      if (formData.creciNumber.length < 4) {
        toast({
          title: "Validação Falhou",
          description: "Número do CRECI inválido ou não encontrado na base do COFECI.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Cadastro Realizado",
        description: "Seu CRECI foi validado com sucesso. Bem-vindo à VPR.MY.",
        className: "bg-primary text-black border-none"
      });
      
      setLocation("/app/home");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex-1 flex flex-col px-8 pt-12 pb-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={() => setLocation("/login")} className="text-white hover:bg-white/10 -ml-2">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-display font-bold text-white">Criar Conta</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex gap-2 mb-8">
          <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-white/10'}`} />
          <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-white/10'}`} />
        </div>

        <form onSubmit={handleRegister} className="flex-1 flex flex-col space-y-6">
          
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nome Completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Seu nome" 
                    className="pl-10 bg-white/5 border-white/10 h-12 text-white focus:border-primary/50" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">CPF</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    value={formData.cpf}
                    onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                    placeholder="000.000.000-00" 
                    className="pl-10 bg-white/5 border-white/10 h-12 text-white focus:border-primary/50" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Celular</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="(00) 00000-0000" 
                    className="pl-10 bg-white/5 border-white/10 h-12 text-white focus:border-primary/50" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="seu@email.com" 
                    type="email"
                    className="pl-10 bg-white/5 border-white/10 h-12 text-white focus:border-primary/50" 
                  />
                </div>
              </div>

              <Button type="button" onClick={() => setStep(2)} className="w-full h-14 mt-4 text-base font-bold bg-white/10 hover:bg-white/20 text-white rounded-xl">
                Continuar
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* CRECI Validation Section */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  <h3 className="text-sm font-bold text-primary">Validação Profissional</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-2">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">UF</Label>
                    <Select onValueChange={(v) => setFormData({...formData, creciUF: v})}>
                      <SelectTrigger className="bg-black/50 border-white/10 h-12 text-white">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10 text-white">
                        <SelectItem value="SP">SP</SelectItem>
                        <SelectItem value="RJ">RJ</SelectItem>
                        <SelectItem value="MG">MG</SelectItem>
                        <SelectItem value="RS">RS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label className="text-[10px] uppercase tracking-wider text-muted-foreground">Número CRECI</Label>
                    <Input 
                      value={formData.creciNumber}
                      onChange={(e) => setFormData({...formData, creciNumber: e.target.value})}
                      placeholder="12345" 
                      className="bg-black/50 border-white/10 h-12 text-white focus:border-primary/50" 
                    />
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Seus dados serão validados automaticamente junto ao COFECI. Apenas corretores com registro ATIVO podem acessar.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••" 
                    className="pl-10 bg-white/5 border-white/10 h-12 text-white focus:border-primary/50" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="••••••••" 
                    className="pl-10 bg-white/5 border-white/10 h-12 text-white focus:border-primary/50" 
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <Button type="button" onClick={() => setStep(1)} variant="outline" className="flex-1 h-14 border-white/10 text-white hover:bg-white/5 rounded-xl">
                  Voltar
                </Button>
                <Button type="submit" disabled={isLoading} className="flex-[2] h-14 text-base font-bold bg-primary hover:bg-primary/90 text-black rounded-xl shadow-lg shadow-primary/20">
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Validando...</>
                  ) : (
                    "Finalizar Cadastro"
                  )}
                </Button>
              </div>
            </motion.div>
          )}

        </form>
      </div>
    </div>
  );
}
