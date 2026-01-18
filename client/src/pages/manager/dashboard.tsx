
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, User, ChevronRight, Filter } from "lucide-react";

export default function ManagerDashboard() {
  const [teamMembers] = useState([
    { id: 1, name: "Carlos Silva", status: "Ativo", sales: "R$ 2.4M", leads: 15 },
    { id: 2, name: "Ana Oliveira", status: "Ativo", sales: "R$ 1.8M", leads: 8 },
    { id: 3, name: "Marcos Souza", status: "Pendente", sales: "R$ 0", leads: 0 },
  ]);

  return (
    <MobileLayout role="manager">
      <div className="pb-8">
        <header className="px-6 pt-12 pb-6 bg-black/80 backdrop-blur-md sticky top-0 z-40 border-b border-white/5">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Minha Carteira</h1>
          <p className="text-sm text-muted-foreground">Gestão da sua equipe de vendas</p>
          
          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar corretor..." 
                className="pl-10 bg-white/5 border-white/10 text-white focus:border-primary/50 h-10 rounded-xl" 
              />
            </div>
            <Button variant="outline" size="icon" className="border-white/10 hover:bg-white/5 hover:text-primary">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </header>

        {/* Team Overview */}
        <div className="px-6 mt-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Card className="bg-primary/10 border-primary/20">
              <CardContent className="p-4 text-center">
                <span className="text-2xl font-bold text-white block">{teamMembers.length}</span>
                <span className="text-[10px] uppercase tracking-wider text-primary/80">Corretores</span>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <span className="text-2xl font-bold text-white block">23</span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Leads Ativos</span>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-lg font-bold text-white mb-4">Membros da Equipe</h2>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <Card key={member.id} className="bg-card border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="h-10 w-10 border border-white/10">
                    <AvatarFallback className="bg-white/5 text-muted-foreground group-hover:text-primary transition-colors">
                      {member.name.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-white text-sm">{member.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                        member.status === 'Ativo' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{member.leads} leads</span>
                      <span className="text-white font-medium">{member.sales}</span>
                    </div>
                  </div>
                  
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
