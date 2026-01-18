
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Splash from "@/pages/app/splash";
import Login from "@/pages/app/login";
import Register from "@/pages/app/register";
import Home from "@/pages/app/home";
import Chat from "@/pages/app/chat";
import Catalogo from "@/pages/app/catalogo";
import Proposta from "@/pages/app/proposta";
import Perfil from "@/pages/app/perfil";
import PoshDetails from "@/pages/app/posh-details";

// Admin Pages
import AdminDashboard from "@/pages/admin/dashboard";
import AdminGerentes from "@/pages/admin/gerentes";
import AdminImoveis from "@/pages/admin/imoveis";
import AdminChat from "@/pages/admin/chat";
import AdminPerfil from "@/pages/admin/perfil";

// Manager Pages
import ManagerDashboard from "@/pages/manager/dashboard";
import ManagerCarteira from "@/pages/manager/carteira";
import ManagerInteracoes from "@/pages/manager/interacoes";
import ManagerChat from "@/pages/manager/chat";
import ManagerPerfil from "@/pages/manager/perfil";

import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* App Routes (Broker) */}
      <Route path="/app" component={Home} />
      <Route path="/app/home" component={Home} />
      <Route path="/app/chat" component={Chat} />
      <Route path="/app/catalogo" component={Catalogo} />
      <Route path="/app/proposta" component={Proposta} />
      <Route path="/app/perfil" component={Perfil} />
      <Route path="/app/posh-details" component={PoshDetails} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/gerentes" component={AdminGerentes} />
      <Route path="/admin/imoveis" component={AdminImoveis} />
      <Route path="/admin/chat" component={AdminChat} />
      <Route path="/admin/perfil" component={AdminPerfil} />

      {/* Manager Routes */}
      <Route path="/manager" component={ManagerDashboard} />
      <Route path="/manager/dashboard" component={ManagerDashboard} />
      <Route path="/manager/carteira" component={ManagerCarteira} />
      <Route path="/manager/interacoes" component={ManagerInteracoes} />
      <Route path="/manager/chat" component={ManagerChat} />
      <Route path="/manager/perfil" component={ManagerPerfil} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
