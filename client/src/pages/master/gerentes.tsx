
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { managers, clients } from "@/mock/data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Mail, Phone, MapPin, ChevronRight, Activity, TrendingUp } from "lucide-react";

export default function GerentesPage() {
  const [selectedManager, setSelectedManager] = useState(managers[0]);

  return (
    <DashboardLayout role="master">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold">Equipe de Gerentes</h1>
          <p className="text-muted-foreground">Gestão de performance individual da equipe comercial.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {managers.map((manager) => (
            <Card key={manager.id} className="glass-card border-white/5 hover:border-primary/30 transition-all duration-300 group">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-16 w-16 border-2 border-primary/20 group-hover:border-primary transition-colors">
                  <AvatarImage src={manager.avatar} />
                  <AvatarFallback>{manager.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{manager.name}</CardTitle>
                  <CardDescription>{manager.role}</CardDescription>
                  <div className="flex gap-2 mt-2">
                    <Button variant="outline" size="icon" className="h-7 w-7 rounded-full"><Mail className="w-3 h-3" /></Button>
                    <Button variant="outline" size="icon" className="h-7 w-7 rounded-full"><Phone className="w-3 h-3" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">IEG (Eficiência)</p>
                    <p className="font-bold text-lg">{manager.kpis.ieg}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">ROI</p>
                    <p className="font-bold text-lg text-emerald-400">{manager.kpis.roi}%</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Esforço</span>
                    <span>{manager.kpis.effort}%</span>
                  </div>
                  <Progress value={manager.kpis.effort} className="h-1.5 bg-secondary" />
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full group-hover:bg-primary/90" onClick={() => setSelectedManager(manager)}>
                      Ver Detalhes Completos <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col bg-card border-white/10">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedManager.avatar} />
                          <AvatarFallback>RM</AvatarFallback>
                        </Avatar>
                        {selectedManager.name}
                      </DialogTitle>
                      <DialogDescription>Análise detalhada de performance e carteira.</DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 overflow-y-auto">
                      {/* Left Column: KPIs */}
                      <div className="space-y-6">
                        <Card className="bg-secondary/20 border-white/5">
                          <CardHeader className="pb-2"><CardTitle className="text-sm">Score de Esforço</CardTitle></CardHeader>
                          <CardContent>
                            <span className="text-3xl font-bold">{selectedManager.kpis.effort}</span>
                            <Progress value={selectedManager.kpis.effort} className="h-2 mt-2" />
                          </CardContent>
                        </Card>
                        <Card className="bg-secondary/20 border-white/5">
                          <CardHeader className="pb-2"><CardTitle className="text-sm">Retorno (ROI)</CardTitle></CardHeader>
                          <CardContent>
                            <span className="text-3xl font-bold text-emerald-400">{selectedManager.kpis.roi}%</span>
                          </CardContent>
                        </Card>
                        <div className="h-[200px]">
                          <p className="text-sm font-medium mb-4">Esforço vs Retorno</p>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                              { name: 'Esforço', val: selectedManager.kpis.effort },
                              { name: 'Retorno', val: selectedManager.kpis.roi }
                            ]}>
                              <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px' }} />
                              <Bar dataKey="val" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Middle/Right Column: Carteira */}
                      <div className="md:col-span-2 space-y-4">
                        <h3 className="font-semibold flex items-center gap-2">
                          <Activity className="w-4 h-4 text-primary" />
                          Carteira de Clientes
                        </h3>
                        <ScrollArea className="h-[400px] rounded-lg border border-white/5 bg-secondary/10 p-4">
                          <div className="space-y-3">
                            {clients.filter(c => c.managerId === selectedManager.id).map(client => (
                              <div key={client.id} className="flex items-center justify-between p-3 rounded-lg bg-card hover:bg-card/80 transition-colors border border-white/5">
                                <div className="flex items-center gap-3">
                                  <div className={`w-2 h-2 rounded-full ${client.classification === 'Ouro' ? 'bg-amber-400' : client.classification === 'Prata' ? 'bg-slate-300' : 'bg-orange-700'}`} />
                                  <div>
                                    <p className="font-medium text-sm">{client.name}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                      <MapPin className="w-3 h-3" /> {client.city}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <Badge variant="outline" className="mb-1 border-white/10">{client.relationship}</Badge>
                                  <p className="text-xs text-muted-foreground">Último contato: {new Date(client.metrics.lastContact).toLocaleDateString()}</p>
                                </div>
                              </div>
                            ))}
                            {clients.filter(c => c.managerId === selectedManager.id).length === 0 && (
                              <p className="text-center text-muted-foreground py-10">Nenhum cliente vinculado.</p>
                            )}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
