
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Lock, User, ShieldCheck } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [role, setRole] = useState<'broker' | 'admin' | 'manager'>('broker');
  const [creci, setCreci] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate role-based redirect
    if (role === 'admin') {
      setLocation("/admin/dashboard");
    } else if (role === 'manager') {
      setLocation("/manager/dashboard");
    } else {
      setLocation("/app/home");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col relative">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Building" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-8 pt-20 pb-8">
        {/* Header */}
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
            Bem-vindo ao <br />
            <span className="text-primary">Extraordinário.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-sm"
          >
            Acesse o portal exclusivo para parceiros VPR.MY.
          </motion.p>
        </div>

        {/* Form */}
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleLogin}
          className="space-y-6 flex-1 flex flex-col"
        >
          {/* Role Toggle (Mock) */}
          <div className="flex bg-white/5 p-1 rounded-lg mb-4 overflow-hidden">
            <button 
              type="button"
              onClick={() => setRole('broker')}
              className={`flex-1 py-2 text-[10px] sm:text-xs font-medium rounded-md transition-all ${role === 'broker' ? 'bg-primary text-black shadow-lg' : 'text-muted-foreground hover:text-white'}`}
            >
              Corretor
            </button>
            <button 
              type="button"
              onClick={() => setRole('manager')}
              className={`flex-1 py-2 text-[10px] sm:text-xs font-medium rounded-md transition-all ${role === 'manager' ? 'bg-primary text-black shadow-lg' : 'text-muted-foreground hover:text-white'}`}
            >
              Gerente
            </button>
            <button 
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2 text-[10px] sm:text-xs font-medium rounded-md transition-all ${role === 'admin' ? 'bg-primary text-black shadow-lg' : 'text-muted-foreground hover:text-white'}`}
            >
              Admin
            </button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">E-mail Corporativo</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="seu@email.com" className="pl-10 bg-white/5 border-white/10 h-12 text-white focus:border-primary/50" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="password" placeholder="••••••••" className="pl-10 bg-white/5 border-white/10 h-12 text-white focus:border-primary/50" />
              </div>
            </div>

            {role === 'broker' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-2"
              >
                <Label className="text-xs uppercase tracking-wider text-primary">Validação CRECI</Label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3 h-4 w-4 text-primary" />
                  <Input 
                    value={creci}
                    onChange={(e) => setCreci(e.target.value)}
                    placeholder="Número do CRECI" 
                    className="pl-10 bg-primary/5 border-primary/30 h-12 text-primary placeholder:text-primary/40 focus:border-primary" 
                  />
                </div>
              </motion.div>
            )}
          </div>

          <div className="flex-1" />

          <Button type="submit" className="w-full h-14 text-base font-bold tracking-wide uppercase bg-gradient-to-r from-primary to-[#D4AF37] hover:opacity-90 text-black shadow-xl shadow-primary/10 rounded-xl">
            Acessar Plataforma
          </Button>

          <div className="flex flex-col gap-4 mt-6">
            <button 
              type="button" 
              onClick={() => setLocation("/register")}
              className="text-xs text-white/70 hover:text-primary transition-colors uppercase tracking-wider"
            >
              Não tem conta? <span className="text-primary font-bold">Solicitar Acesso</span>
            </button>
            <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest">
              Powered by VPR Technology
            </p>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
