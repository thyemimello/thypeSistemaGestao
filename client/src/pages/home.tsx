
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Building2, 
  CalendarDays, 
  TrendingUp, 
  Bell, 
  ArrowRight,
  Activity,
  LogOut,
  Users
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Topbar */}
      <header className="h-16 px-8 border-b border-border bg-white/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-white text-lg">T</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground">THYPE</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground">Roberto Almeida</p>
              <p className="text-xs text-muted-foreground">Gerente Master</p>
            </div>
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>RA</AvatarFallback>
            </Avatar>
          </div>
          <Link href="/login">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
              <LogOut className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Welcome Section */}
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-display font-bold text-foreground">Bom dia, Roberto.</h1>
          <p className="text-lg text-muted-foreground">Aqui está o resumo estratégico de hoje.</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Imobiliárias Ativas", value: "142", icon: Building2, color: "text-blue-600", bg: "bg-blue-100" },
            { label: "Reservas no Mês", value: "28", icon: CalendarDays, color: "text-purple-600", bg: "bg-purple-100" },
            { label: "Vendas no Mês", value: "12", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-100" },
            { label: "Novos Alertas", value: "5", icon: Bell, color: "text-amber-600", bg: "bg-amber-100" },
          ].map((item, index) => (
            <div key={index} className="glass-card p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300 border border-border shadow-sm bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className={`${item.bg} p-3 rounded-lg`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
              <div>
                <span className="text-3xl font-display font-bold text-foreground">{item.value}</span>
                <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/master/dashboard">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-purple-100 border border-border p-8 cursor-pointer hover:border-primary/50 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Activity className="w-32 h-32 text-primary" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-display font-bold text-foreground">Painel Master</h3>
                <p className="text-muted-foreground max-w-sm">
                  Acesse a visão completa de KPIs, desempenho de gerentes e relatórios estratégicos.
                </p>
                <Button className="group-hover:translate-x-2 transition-transform duration-300 shadow-lg shadow-primary/20">
                  Acessar Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/gerente/painel">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-border p-8 cursor-pointer hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Users className="w-32 h-32 text-blue-600" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-display font-bold text-foreground">Painel do Gerente</h3>
                <p className="text-muted-foreground max-w-sm">
                  Simulação da visão individual do gerente, com carteira de clientes e registro de interações.
                </p>
                <Button variant="secondary" className="group-hover:translate-x-2 transition-transform duration-300 bg-white hover:bg-white/80 text-blue-700">
                  Ver Visão Gerente <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity Mock */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-foreground">Últimas Atividades</h3>
          <div className="glass-panel rounded-xl p-1 divide-y divide-border bg-white border border-border shadow-sm">
            {[
              { user: "Fernanda Costa", action: "registrou visita técnica", target: "Imobiliária Elite", time: "há 10 min" },
              { user: "Carlos Silva", action: "atualizou o status de", target: "Corretor João", time: "há 32 min" },
              { user: "Roberto Almeida", action: "finalizou venda", target: "Reserva #4092", time: "há 1 hora" },
              { user: "Sistema IA", action: "gerou alerta de risco", target: "Carteira Sul", time: "há 2 horas" },
            ].map((activity, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold border border-primary/20">
                      {activity.user.substring(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-foreground">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium text-primary">{activity.target}</span>
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Development Sitemap - For easy navigation review */}
        <div className="pt-10 border-t border-border">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Mapa do Site (Acesso Rápido)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/login">
              <Button variant="outline" className="w-full justify-start text-xs border-border bg-secondary/30 hover:bg-secondary text-muted-foreground">
                Login
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button variant="outline" className="w-full justify-start text-xs border-border bg-secondary/30 hover:bg-secondary text-muted-foreground">
                Cadastro Usuário
              </Button>
            </Link>
            <Link href="/master/dashboard">
              <Button variant="outline" className="w-full justify-start text-xs border-border bg-secondary/30 hover:bg-secondary text-muted-foreground">
                Dashboard Master
              </Button>
            </Link>
            <Link href="/master/gerentes">
              <Button variant="outline" className="w-full justify-start text-xs border-border bg-secondary/30 hover:bg-secondary text-muted-foreground">
                Lista de Gerentes
              </Button>
            </Link>
            <Link href="/cadastro-imobiliaria">
              <Button variant="outline" className="w-full justify-start text-xs border-border bg-secondary/30 hover:bg-secondary text-muted-foreground">
                Cadastro Imobiliária
              </Button>
            </Link>
            <Link href="/ia">
              <Button variant="outline" className="w-full justify-start text-xs border-border bg-secondary/30 hover:bg-secondary text-muted-foreground">
                IA Secretária
              </Button>
            </Link>
            <Link href="/gerente/painel">
              <Button variant="outline" className="w-full justify-start text-xs border-border bg-secondary/30 hover:bg-secondary text-muted-foreground">
                Painel Gerente
              </Button>
            </Link>
            <Link href="/gerente/registrar-interacao">
              <Button variant="outline" className="w-full justify-start text-xs border-border bg-secondary/30 hover:bg-secondary text-muted-foreground">
                Registrar Interação
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
