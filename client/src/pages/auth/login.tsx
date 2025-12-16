
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { ArrowRight, Lock } from "lucide-react";

export default function LoginPage() {
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/home");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden auth-gradient">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <Card className="w-full max-w-md z-10 bg-white/80 backdrop-blur-xl border-border shadow-2xl">
        <CardHeader className="space-y-6 text-center pb-8 pt-10">
          <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 mb-4">
            <span className="font-display font-bold text-white text-3xl">T</span>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Bem-vindo ao THYPE</h1>
            <p className="text-muted-foreground text-sm">Sistema de Gestão Estratégica</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Corporativo</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="nome@thype.com.br" 
                className="bg-white border-input focus:border-primary text-foreground"
                defaultValue="admin@thype.com.br"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="#" className="text-xs text-primary hover:text-primary/80">Esqueceu a senha?</Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="bg-white border-input focus:border-primary text-foreground"
                defaultValue="password"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/25">
              Entrar na Plataforma
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center pb-8">
          <p className="text-sm text-muted-foreground">
            Ainda não tem acesso? <Link href="/cadastro" className="text-primary hover:underline font-medium">Solicitar conta</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
