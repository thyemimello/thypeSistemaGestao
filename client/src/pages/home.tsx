
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
      <header className="h-16 px-8 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-white text-lg">T</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight">THYPE</span>
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
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-12">
        {/* Welcome Section */}
        <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-display font-bold text-white">Bom dia, Roberto.</h1>
          <p className="text-lg text-muted-foreground">Aqui está o resumo estratégico de hoje.</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Imobiliárias Ativas", value: "142", icon: Building2, color: "text-blue-400", bg: "bg-blue-400/10" },
            { label: "Reservas no Mês", value: "28", icon: CalendarDays, color: "text-purple-400", bg: "bg-purple-400/10" },
            { label: "Vendas no Mês", value: "12", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-400/10" },
            { label: "Novos Alertas", value: "5", icon: Bell, color: "text-amber-400", bg: "bg-amber-400/10" },
          ].map((item, index) => (
            <div key={index} className="glass-card p-6 rounded-xl hover:translate-y-[-4px] transition-transform duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className={`${item.bg} p-3 rounded-lg`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
              <div>
                <span className="text-3xl font-display font-bold">{item.value}</span>
                <p className="text-sm text-muted-foreground mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/master/dashboard">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-purple-900/20 border border-white/10 p-8 cursor-pointer hover:border-primary/50 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-display font-bold">Painel Master</h3>
                <p className="text-muted-foreground max-w-sm">
                  Acesse a visão completa de KPIs, desempenho de gerentes e relatórios estratégicos.
                </p>
                <Button className="group-hover:translate-x-2 transition-transform duration-300">
                  Acessar Dashboard <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Link>

          <Link href="/gerente/painel">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-900/10 border border-white/10 p-8 cursor-pointer hover:border-blue-500/50 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="w-32 h-32" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-display font-bold">Painel do Gerente</h3>
                <p className="text-muted-foreground max-w-sm">
                  Simulação da visão individual do gerente, com carteira de clientes e registro de interações.
                </p>
                <Button variant="secondary" className="group-hover:translate-x-2 transition-transform duration-300">
                  Ver Visão Gerente <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity Mock */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Últimas Atividades</h3>
          <div className="glass-panel rounded-xl p-1 divide-y divide-white/5">
            {[
              { user: "Fernanda Costa", action: "registrou visita técnica", target: "Imobiliária Elite", time: "há 10 min" },
              { user: "Carlos Silva", action: "atualizou o status de", target: "Corretor João", time: "há 32 min" },
              { user: "Roberto Almeida", action: "finalizou venda", target: "Reserva #4092", time: "há 1 hora" },
              { user: "Sistema IA", action: "gerou alerta de risco", target: "Carteira Sul", time: "há 2 horas" },
            ].map((activity, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      {activity.user.substring(0,2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">{activity.user}</span>{" "}
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
        <div className="pt-10 border-t border-white/5">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Mapa do Site (Acesso Rápido)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/login">
              <Button variant="outline" className="w-full justify-start text-xs border-white/5 bg-white/5 hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link href="/cadastro">
              <Button variant="outline" className="w-full justify-start text-xs border-white/5 bg-white/5 hover:bg-white/10">
                Cadastro Usuário
              </Button>
            </Link>
            <Link href="/master/dashboard">
              <Button variant="outline" className="w-full justify-start text-xs border-white/5 bg-white/5 hover:bg-white/10">
                Dashboard Master
              </Button>
            </Link>
            <Link href="/master/gerentes">
              <Button variant="outline" className="w-full justify-start text-xs border-white/5 bg-white/5 hover:bg-white/10">
                Lista de Gerentes
              </Button>
            </Link>
            <Link href="/cadastro-imobiliaria">
              <Button variant="outline" className="w-full justify-start text-xs border-white/5 bg-white/5 hover:bg-white/10">
                Cadastro Imobiliária
              </Button>
            </Link>
            <Link href="/ia">
              <Button variant="outline" className="w-full justify-start text-xs border-white/5 bg-white/5 hover:bg-white/10">
                IA Secretária
              </Button>
            </Link>
            <Link href="/gerente/painel">
              <Button variant="outline" className="w-full justify-start text-xs border-white/5 bg-white/5 hover:bg-white/10">
                Painel Gerente
              </Button>
            </Link>
            <Link href="/gerente/registrar-interacao">
              <Button variant="outline" className="w-full justify-start text-xs border-white/5 bg-white/5 hover:bg-white/10">
                Registrar Interação
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
