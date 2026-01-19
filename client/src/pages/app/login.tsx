import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Lock, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(username, password);
      const user = await fetch('/api/auth/user', { credentials: 'include' }).then(r => r.json());
      
      if (user.role === 'master') {
        setLocation("/admin/dashboard");
      } else if (user.role === 'manager') {
        setLocation("/manager/dashboard");
      } else {
        setLocation("/app/home");
      }
    } catch (error: any) {
      toast({
        title: "Erro ao fazer login",
        description: error.message || "Credenciais inválidas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Building" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-8 pt-20 pb-8">
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/30 mb-6"
          >
            <span className="font-display font-bold text-xl text-primary">V</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-display font-bold text-white mb-2"
          >
            Bem-vindo a <br />
            <span className="text-primary">VPR.M7</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm"
          >
            Sistema de Gestão Estratégica de Relacionamentos
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleLogin}
          className="space-y-6 flex-1 flex flex-col"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Usuário</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="seu.usuario" 
                  className="pl-10 bg-white/5 border-white/10 h-12 text-white focus:border-primary/50"
                  data-testid="input-username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="pl-10 bg-white/5 border-white/10 h-12 text-white focus:border-primary/50"
                  data-testid="input-password"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex-1" />

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 text-base font-bold tracking-wide uppercase bg-gradient-to-r from-primary to-[#D4AF37] hover:opacity-90 text-black shadow-xl shadow-primary/10 rounded-xl"
            data-testid="button-login"
          >
            {loading ? "Entrando..." : "Acessar Plataforma"}
          </Button>

          <div className="flex flex-col gap-4 mt-6">
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={() => setLocation("/app/home")}
                className="flex-1 text-[10px] py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                data-testid="button-demo-corretor"
              >
                Demo Corretor
              </button>
              <button 
                type="button" 
                onClick={() => setLocation("/manager/dashboard")}
                className="flex-1 text-[10px] py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                data-testid="button-demo-gerente"
              >
                Demo Gerente
              </button>
              <button 
                type="button" 
                onClick={() => setLocation("/admin/dashboard")}
                className="flex-1 text-[10px] py-2 px-3 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                data-testid="button-demo-admin"
              >
                Demo Admin
              </button>
            </div>
            <button 
              type="button" 
              onClick={() => setLocation("/register")}
              className="text-xs text-white/70 hover:text-primary transition-colors uppercase tracking-wider"
              data-testid="link-register"
            >
              Não tem conta? <span className="text-primary font-bold">Solicitar Acesso</span>
            </button>
            <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest">
              Powered by VPR.M7
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
