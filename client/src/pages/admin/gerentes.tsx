
import { useState } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  MapPin, 
  Briefcase,
  UserPlus
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function AdminGerentes() {
  const [managers, setManagers] = useState([
    { id: 1, name: "Ricardo Silva", region: "Zona Sul", performance: 92, team: 12, email: "ricardo@vpr.my", phone: "(11) 99999-1111", avatar: "" },
    { id: 2, name: "Amanda Costa", region: "Jardins", performance: 88, team: 8, email: "amanda@vpr.my", phone: "(11) 99999-2222", avatar: "" },
    { id: 3, name: "Pedro Santos", region: "Zona Oeste", performance: 75, team: 15, email: "pedro@vpr.my", phone: "(11) 99999-3333", avatar: "" },
  ]);

  const [isNewManagerOpen, setIsNewManagerOpen] = useState(false);

  return (
    <MobileLayout role="admin">
      <div className="pb-8">
        <header className="px-6 pt-12 pb-6 bg-black/80 backdrop-blur-md sticky top-0 z-40 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-white mb-1">Equipe de Gerentes</h1>
              <p className="text-sm text-muted-foreground">Gestão e Performance</p>
            </div>
            
            <Dialog open={isNewManagerOpen} onOpenChange={setIsNewManagerOpen}>
              <DialogTrigger asChild>
                <Button size="icon" className="rounded-full bg-primary text-black hover:bg-primary/90">
                  <Plus className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1a1f3a] border-white/10 text-white max-w-sm mx-auto rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="font-display text-xl text-primary">Novo Gerente</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Nome Completo</Label>
                    <Input placeholder="Ex: João Souza" className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">E-mail Corporativo</Label>
                    <Input placeholder="joao@vpr.my" className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Região de Atuação</Label>
                    <Input placeholder="Ex: Zona Sul" className="bg-white/5 border-white/10 text-white" />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="w-full bg-primary text-black hover:bg-primary/90">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Cadastrar Gerente
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar gerente..." 
              className="pl-10 bg-white/5 border-white/10 text-white focus:border-primary/50 h-10 rounded-xl" 
            />
          </div>
        </header>

        <div className="px-6 mt-6 space-y-4">
          {managers.map((manager) => (
            <Card key={manager.id} className="bg-card border-white/5 overflow-hidden group">
              <CardContent className="p-0">
                <div className="p-4 flex items-start gap-4">
                  <Avatar className="h-14 w-14 border border-white/10">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-display">
                      {manager.name.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-white text-base truncate">{manager.name}</h3>
                        <p className="text-xs text-primary flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {manager.region}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3 text-white/40" />
                        <span className="text-white">{manager.team}</span> corretores
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${manager.performance > 90 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                        <span className="text-white">{manager.performance}%</span> performance
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 border-t border-white/5">
                  <button className="flex items-center justify-center gap-2 p-3 text-xs font-medium text-white/60 hover:bg-white/5 hover:text-primary transition-colors border-r border-white/5">
                    <Phone className="w-3.5 h-3.5" /> Ligar
                  </button>
                  <button className="flex items-center justify-center gap-2 p-3 text-xs font-medium text-white/60 hover:bg-white/5 hover:text-primary transition-colors">
                    <Mail className="w-3.5 h-3.5" /> Mensagem
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
