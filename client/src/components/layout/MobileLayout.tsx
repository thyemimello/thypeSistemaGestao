
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  Home, 
  Search, 
  MessageSquare, 
  User, 
  PlusCircle, 
  Menu,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
  role?: "broker" | "admin";
}

export default function MobileLayout({ children, role = "broker" }: MobileLayoutProps) {
  const [location] = useLocation();

  // Bottom Tab Navigation Items
  const tabs = role === "broker" ? [
    { icon: Home, label: "Início", href: "/app/home" },
    { icon: Search, label: "Catálogo", href: "/app/catalogo" },
    { icon: PlusCircle, label: "Proposta", href: "/app/proposta", highlight: true },
    { icon: MessageSquare, label: "Chat", href: "/app/chat" },
    { icon: User, label: "Perfil", href: "/app/perfil" },
  ] : [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Briefcase, label: "Gerentes", href: "/admin/gerentes" },
    { icon: Search, label: "Imóveis", href: "/admin/imoveis" },
    { icon: MessageSquare, label: "Chat Geral", href: "/admin/chat" },
    { icon: User, label: "Perfil", href: "/admin/perfil" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col max-w-md mx-auto shadow-2xl overflow-hidden relative border-x border-white/5">
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
        {children}
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 h-20 px-6 max-w-md mx-auto">
        <div className="flex items-center justify-between h-full">
          {tabs.map((tab, index) => {
            const isActive = location === tab.href;
            
            if (tab.highlight) {
              return (
                <Link key={index} href={tab.href}>
                  <div className="relative -top-6">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 border-4 border-black transition-transform active:scale-95">
                      <tab.icon className="w-6 h-6 text-black" />
                    </div>
                  </div>
                </Link>
              );
            }

            return (
              <Link key={index} href={tab.href} className="flex flex-col items-center justify-center gap-1 w-12 transition-colors active:scale-95">
                <tab.icon className={cn(
                  "w-6 h-6 transition-colors", 
                  isActive ? "text-primary" : "text-muted-foreground"
                )} />
                <span className={cn(
                  "text-[10px] font-medium",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
