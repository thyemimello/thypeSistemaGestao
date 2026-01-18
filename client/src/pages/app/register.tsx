import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Lock, User, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "manager" as 'master' | 'manager'
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      await register({
        username: formData.username,
        password: formData.password,
        name: formData.name,
        role: formData.role,
      });

      toast({
        title: "Cadastro Realizado",
        description: "Bem-vindo ao THYPE!",
        className: "bg-primary text-black border-none"
      });
      
      if (formData.role === 'master') {
        setLocation("/admin/dashboard");
      } else {
        setLocation("/manager/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao registrar",
        description: error.message || "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex-1 flex flex-col px-8 pt-12 pb-8">
        
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setLocation("/login")} 
            className="text-white hover:bg-white/10 -ml-2"
            data-testid="button-back"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-display font-bold text-white">Criar Conta</h1>
        </div>

        <form onSubmit={handleRegister} className="flex-1 flex flex-col space-y-6">
          
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
                  data-testid="input-name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Usuário</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  placeholder="seu.usuario" 
                  className="pl-10 bg-white/5 border-white/10 h-12 text-white focus:border-primary/50"
                  data-testid="input-username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Tipo de Conta</Label>
              <Select 
                value={formData.role} 
                onValueChange={(v) => setFormData({...formData, role: v as 'master' | 'manager'})}
              >
                <SelectTrigger 
                  className="bg-white/5 border-white/10 h-12 text-white"
                  data-testid="select-role"
                >
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/10 text-white">
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="master">Master (Admin)</SelectItem>
                </SelectContent>
              </Select>
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
                  data-testid="input-password"
                  required
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
                  data-testid="input-confirm-password"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-14 text-base font-bold bg-primary hover:bg-primary/90 text-black rounded-xl shadow-lg shadow-primary/20 mt-6"
              data-testid="button-register"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Registrando...</>
              ) : (
                "Criar Conta"
              )}
            </Button>
          </motion.div>

        </form>

        <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest mt-8">
          Powered by THYPE Technology
        </p>
      </div>
    </div>
  );
}
