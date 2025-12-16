
import DashboardLayout from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/ui/kpi-card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { managers, clients, monthlyData } from "@/mock/data";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  AlertTriangle, 
  ArrowUpRight,
  Filter
} from "lucide-react";

export default function MasterDashboard() {
  const COLORS = ['#8b5cf6', '#06b6d4', '#ec4899', '#64748b'];

  const pieData = [
    { name: 'Ouro', value: clients.filter(c => c.classification === 'Ouro').length },
    { name: 'Prata', value: clients.filter(c => c.classification === 'Prata').length },
    { name: 'Bronze', value: clients.filter(c => c.classification === 'Bronze').length },
  ];

  return (
    <DashboardLayout role="master">
      <div className="space-y-8">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">Dashboard Estratégico</h1>
            <p className="text-muted-foreground">Visão geral de performance e relacionamento.</p>
          </div>
          
          <div className="flex items-center gap-2 bg-card p-1.5 rounded-lg border border-border shadow-sm">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
              <Filter className="w-4 h-4" />
            </Button>
            <Select defaultValue="this-month">
              <SelectTrigger className="w-[140px] h-9 border-0 bg-transparent focus:ring-0">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">Este Mês</SelectItem>
                <SelectItem value="last-month">Mês Passado</SelectItem>
                <SelectItem value="quarter">Este Trimestre</SelectItem>
              </SelectContent>
            </Select>
            <div className="w-[1px] h-6 bg-border mx-1"></div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] h-9 border-0 bg-transparent focus:ring-0">
                <SelectValue placeholder="Gerente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {managers.map(m => (
                  <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard 
            title="Score Médio de Esforço" 
            value="78.5" 
            trend="up" 
            trendValue="12%" 
            icon={Zap}
          />
          <KPICard 
            title="Relacionamento (NPS)" 
            value="9.2" 
            subValue="/ 10"
            trend="neutral" 
            trendValue="0.5%" 
            icon={Users}
          />
          <KPICard 
            title="Retorno (ROI)" 
            value="R$ 1.2M" 
            trend="up" 
            trendValue="8%" 
            icon={TrendingUp}
          />
          <KPICard 
            title="Índice de Eficiência (IEG)" 
            value="1.45" 
            trend="down" 
            trendValue="2%" 
            icon={Target}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart */}
          <Card className="lg:col-span-2 glass-card border-border">
            <CardHeader>
              <CardTitle>Vendas e Reservas</CardTitle>
              <CardDescription>Evolução mensal comparativa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.8} />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#0f172a' }}
                    />
                    <Line type="monotone" dataKey="vendas" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="reservas" stroke="#06b6d4" strokeWidth={3} dot={{ r: 4, fill: '#06b6d4' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Distribution Chart */}
          <Card className="glass-card border-border">
            <CardHeader>
              <CardTitle>Carteira de Clientes</CardTitle>
              <CardDescription>Distribuição por classificação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(0,0,0,0)" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      itemStyle={{ color: '#0f172a' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="text-3xl font-bold font-display text-foreground">{clients.length}</span>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                {pieData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-semibold text-foreground">{item.value} ({Math.round(item.value / clients.length * 100)}%)</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Ranking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Alerts */}
          <Card className="glass-card border-border h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Alertas Inteligentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Cliente Ouro sem visita", desc: "Imobiliária Prime (30 dias)", priority: "high" },
                { title: "Gerente Baixo Retorno", desc: "Carlos Silva (Alto esforço)", priority: "medium" },
                { title: "Potencial Upgrade", desc: "Corretora Maria (Bronze -> Prata)", priority: "low" },
                { title: "Queda Conversão", desc: "Equipe Sul (-5% este mês)", priority: "high" },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary border border-border transition-colors">
                  <div className={`w-2 h-2 mt-2 rounded-full ${alert.priority === 'high' ? 'bg-destructive' : alert.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                  <div>
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">{alert.desc}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto opacity-50 hover:opacity-100">
                    <ArrowUpRight className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Ranking Table */}
          <Card className="lg:col-span-2 glass-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Ranking de Imobiliárias</CardTitle>
                <CardDescription>Top performance por ROI</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="hidden sm:flex border-border">Ver relatório completo</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border">
                    <TableHead>Imobiliária</TableHead>
                    <TableHead>Classificação</TableHead>
                    <TableHead>Relacionamento</TableHead>
                    <TableHead className="text-right">ROI (%)</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clients.slice(0, 5).map((client) => (
                    <TableRow key={client.id} className="hover:bg-secondary/50 border-border">
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell><StatusBadge value={client.classification} type="classification" /></TableCell>
                      <TableCell><StatusBadge value={client.relationship} type="relationship" /></TableCell>
                      <TableCell className="text-right font-mono text-emerald-600">+{client.metrics.roi}%</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
