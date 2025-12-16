
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  FileBarChart, 
  Bell, 
  Bot, 
  Menu, 
  X,
  LogOut,
  ChevronDown
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "master" | "gerente";
}

export default function DashboardLayout({ children, role = "master" }: DashboardLayoutProps) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = role === "master" ? [
    { icon: LayoutDashboard, label: "Visão Geral", href: "/master/dashboard" },
    { icon: Users, label: "Gerentes", href: "/master/gerentes" },
    { icon: Building2, label: "Imobiliárias", href: "/cadastro-imobiliaria" }, // Redirecting here for demo
    { icon: FileBarChart, label: "Relatórios", href: "/master/dashboard" }, // Mock link
    { icon: Bell, label: "Alertas", href: "/master/dashboard" }, // Mock link
    { icon: Bot, label: "IA Secretária", href: "/ia" },
  ] : [
    { icon: LayoutDashboard, label: "Meu Painel", href: "/gerente/painel" },
    { icon: Users, label: "Minha Carteira", href: "/gerente/painel" },
    { icon: FileBarChart, label: "Registrar Interação", href: "/gerente/registrar-interacao" },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#1a1f3a] border-r border-indigo-900/30 text-white">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
          <span className="font-display font-bold text-white text-lg">T</span>
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-white">THYPE</span>
      </div>

      <div className="flex-1 px-4 py-4 space-y-1 overflow-y-auto scrollbar-none">
        {menuItems.map((item, index) => {
          const isActive = location === item.href;
          return (
            <Link key={`${item.href}-${index}`} href={item.href} className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
              isActive 
                ? "bg-primary text-white shadow-md shadow-primary/25" 
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            )}>
              <item.icon className={cn("w-4 h-4", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-indigo-900/30">
        <div className="bg-indigo-950/50 border border-indigo-900/30 rounded-xl p-4 mb-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
              <Bot className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-200">Insight do Dia</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            "A taxa de conversão da equipe aumentou 5% após as últimas visitas técnicas."
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 fixed inset-y-0 z-50 shadow-xl shadow-indigo-900/5">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 border-r border-indigo-900/30 bg-[#1a1f3a] text-white">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 px-6 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <h2 className="text-sm font-medium text-slate-500 hidden sm:block">
              Gestão Estratégica &gt; <span className="text-slate-900">{role === 'master' ? 'Visão Master' : 'Visão Gerente'}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </Button>

            <div className="h-8 w-[1px] bg-slate-200 mx-1"></div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-4 h-10 hover:bg-slate-100 transition-colors rounded-full border border-transparent hover:border-slate-200">
                  <Avatar className="h-8 w-8 border border-slate-200">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-xs">
                    <span className="font-semibold text-slate-900">Admin User</span>
                    <span className="text-slate-500">{role === 'master' ? 'Gerente Master' : 'Gerente'}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-slate-200 shadow-lg shadow-slate-200/50">
                <DropdownMenuItem className="cursor-pointer hover:bg-slate-50 focus:bg-slate-50">
                  <Link href="/home" className="flex items-center w-full">
                    Voltar para Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-rose-600 cursor-pointer hover:bg-rose-50 focus:bg-rose-50 focus:text-rose-700">
                  <Link href="/login" className="flex items-center w-full">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-x-hidden bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
