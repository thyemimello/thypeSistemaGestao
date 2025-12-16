
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { ArrowLeft, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [, setLocation] = useLocation();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLocation("/home");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden auth-gradient">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute bottom-[20%] left-[10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[100px]" />
      </div>

      <Card className="w-full max-w-md z-10 bg-white/80 backdrop-blur-xl border-border shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        <CardHeader className="space-y-2 text-center pb-6 pt-8">
          <div className="absolute top-4 left-4">
            <Link href="/login">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-display font-bold tracking-tight text-foreground">Criar Nova Conta</h1>
          <p className="text-muted-foreground text-sm">Preencha os dados para solicitar acesso</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" placeholder="Seu nome" className="bg-white border-input" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Corporativo</Label>
              <Input id="email" type="email" placeholder="nome@thype.com.br" className="bg-white border-input" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Tipo de Acesso</Label>
              <Select>
                <SelectTrigger className="bg-white border-input">
                  <SelectValue placeholder="Selecione sua função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="master">Gerente Master</SelectItem>
                  <SelectItem value="gerente">Gerente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" className="bg-white border-input" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirmar</Label>
                <Input id="confirm" type="password" className="bg-white border-input" />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 mt-2 text-base font-semibold shadow-lg shadow-primary/25">
              <UserPlus className="mr-2 w-4 h-4" />
              Criar Conta
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
