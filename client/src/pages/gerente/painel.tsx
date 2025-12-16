
import DashboardLayout from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/ui/kpi-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { clients } from "@/mock/data";
import { Search, Filter, PlusCircle, MessageSquarePlus } from "lucide-react";
import { Link } from "wouter";

export default function GerentePainel() {
  // Mock logged in manager ID
  const myId = 'm1';
  const myClients = clients.filter(c => c.managerId === myId);

  return (
    <DashboardLayout role="gerente">
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Meu Painel</h1>
            <p className="text-muted-foreground">Gerencie sua carteira e interações diárias.</p>
          </div>
          <Link href="/gerente/registrar-interacao">
            <Button className="shadow-lg shadow-primary/25">
              <PlusCircle className="w-4 h-4 mr-2" />
              Nova Interação
            </Button>
          </Link>
        </div>

        {/* My KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Meu Esforço" value="85" subValue="/ 100" trend="up" trendValue="5%" />
          <KPICard title="Meu ROI" value="120%" trend="up" trendValue="12%" />
          <KPICard title="Clientes Ativos" value={myClients.length} trend="neutral" trendValue="0" />
          <KPICard title="Vendas Mês" value="15" trend="down" trendValue="2" />
        </div>

        {/* Clients List */}
        <Card className="glass-card border-white/5">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle>Minha Carteira</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar cliente..." className="pl-9 bg-secondary/50 border-white/5" />
              </div>
              <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-white/5">
                  <TableHead>Cliente</TableHead>
                  <TableHead>Classificação</TableHead>
                  <TableHead>Relacionamento</TableHead>
                  <TableHead>Última Interação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myClients.map((client) => (
                  <TableRow key={client.id} className="hover:bg-white/5 border-white/5 group">
                    <TableCell>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-xs text-muted-foreground">{client.city} • {client.contactName}</p>
                      </div>
                    </TableCell>
                    <TableCell><StatusBadge value={client.classification} type="classification" /></TableCell>
                    <TableCell><StatusBadge value={client.relationship} type="relationship" /></TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(client.metrics.lastContact).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/gerente/registrar-interacao?client=${client.id}`}>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MessageSquarePlus className="w-4 h-4 mr-2" />
                          Registrar
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
