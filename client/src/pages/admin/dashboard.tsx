
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Users, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const managers = [
    { id: 1, name: "Ricardo Silva", region: "Zona Sul", performance: 92, team: 12 },
    { id: 2, name: "Amanda Costa", region: "Jardins", performance: 88, team: 8 },
    { id: 3, name: "Pedro Santos", region: "Zona Oeste", performance: 75, team: 15 },
  ];

  return (
    <MobileLayout role="admin">
      <div className="pb-8">
        <header className="px-6 pt-12 pb-6">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Gestão de Equipes</h1>
          <p className="text-sm text-muted-foreground">Administração de Gerentes e KPIs</p>
        </header>

        {/* KPIs */}
        <div className="px-6 grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Users className="w-6 h-6 text-primary mb-2" />
              <span className="text-2xl font-bold text-white">42</span>
              <span className="text-[10px] uppercase tracking-wider text-primary/80">Gerentes Ativos</span>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <TrendingUp className="w-6 h-6 text-white mb-2" />
              <span className="text-2xl font-bold text-white">R$ 12M</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Vendas Mês</span>
            </CardContent>
          </Card>
        </div>

        {/* Manager List */}
        <div className="px-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Gerentes Cadastrados</h2>
            <Button size="sm" className="h-8 bg-white/10 hover:bg-white/20 text-white border border-white/10">
              <Plus className="w-4 h-4 mr-1" /> Novo
            </Button>
          </div>

          <div className="space-y-4">
            {managers.map((manager) => (
              <Card key={manager.id} className="bg-card border-white/5 overflow-hidden">
                <CardContent className="p-4 flex items-center gap-4">
                  <Avatar className="h-12 w-12 border border-white/10">
                    <AvatarFallback className="bg-white/5 text-primary">{manager.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white text-sm truncate">{manager.name}</h3>
                      <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2 text-muted-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{manager.region} • {manager.team} corretores</p>
                    
                    {/* Mini Performance Bar */}
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${manager.performance > 90 ? 'bg-green-500' : manager.performance > 80 ? 'bg-primary' : 'bg-yellow-500'}`} 
                        style={{ width: `${manager.performance}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
