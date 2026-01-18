import { useEffect, useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, TrendingUp, TrendingDown } from "lucide-react";
import { api, type Manager } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function AdminGerentes() {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadManagers();
  }, []);

  async function loadManagers() {
    try {
      const data = await api.getManagers();
      setManagers(data);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar gerentes",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  const getPerformanceColor = (roi: number) => {
    if (roi >= 100) return "text-green-500";
    if (roi >= 70) return "text-primary";
    return "text-yellow-500";
  };

  return (
    <MobileLayout role="admin">
      <div className="pb-8">
        <header className="px-6 pt-12 pb-6">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Gerentes</h1>
          <p className="text-sm text-muted-foreground">Equipe de Relacionamento</p>
        </header>

        <div className="px-6 flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground">Total de Gerentes</p>
            <p className="text-3xl font-bold text-white">{managers.length}</p>
          </div>
          <Button 
            size="sm" 
            className="h-10 bg-primary hover:bg-primary/90 text-black"
            data-testid="button-add-manager"
          >
            <Plus className="w-4 h-4 mr-2" /> Novo Gerente
          </Button>
        </div>

        {loading ? (
          <div className="px-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card border-white/5 animate-pulse">
                <CardContent className="p-4">
                  <div className="h-16 bg-white/5 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="px-6 space-y-4">
            {managers.map((manager) => (
              <Card 
                key={manager.id} 
                className="bg-card border-white/5 overflow-hidden hover:border-primary/30 transition-colors"
                data-testid={`card-manager-${manager.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-14 w-14 border-2 border-white/10">
                      {manager.avatar ? (
                        <AvatarImage src={manager.avatar} alt={manager.name} />
                      ) : (
                        <AvatarFallback className="bg-primary/20 text-primary font-bold">
                          {manager.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-white text-base truncate" data-testid={`text-manager-name-${manager.id}`}>
                          {manager.name}
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 -mr-2 text-muted-foreground hover:text-white"
                          data-testid={`button-menu-${manager.id}`}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] ${getPerformanceColor(manager.kpis.roi)} border-current`}
                        >
                          ROI: {manager.kpis.roi}%
                        </Badge>
                        <Badge variant="outline" className="text-[10px] text-white/60 border-white/20">
                          IEG: {manager.kpis.ieg}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-xl font-bold text-white" data-testid={`text-sales-${manager.id}`}>
                        {manager.kpis.sales}
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Vendas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-white" data-testid={`text-reservations-${manager.id}`}>
                        {manager.kpis.reservations}
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Reservas</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-primary" data-testid={`text-effort-${manager.id}`}>
                        {manager.kpis.effort}
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Esforço</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-primary" data-testid={`text-relationship-${manager.id}`}>
                        {manager.kpis.relationship}
                      </p>
                      <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Relação</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {manager.kpis.roi >= 100 ? (
                      <div className="flex items-center gap-1 text-green-500 text-xs">
                        <TrendingUp className="w-3 h-3" />
                        <span>Alto Desempenho</span>
                      </div>
                    ) : manager.kpis.roi >= 70 ? (
                      <div className="flex items-center gap-1 text-primary text-xs">
                        <TrendingUp className="w-3 h-3" />
                        <span>Bom Desempenho</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-yellow-500 text-xs">
                        <TrendingDown className="w-3 h-3" />
                        <span>Precisa Atenção</span>
                      </div>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8 text-xs border-white/10 hover:bg-white/5"
                      data-testid={`button-view-details-${manager.id}`}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {managers.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-sm">Nenhum gerente cadastrado ainda.</p>
                <Button className="mt-4 bg-primary hover:bg-primary/90 text-black">
                  <Plus className="w-4 h-4 mr-2" /> Adicionar Primeiro Gerente
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
