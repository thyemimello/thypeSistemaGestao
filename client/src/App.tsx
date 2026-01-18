
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Splash from "@/pages/app/splash";
import Login from "@/pages/app/login";
import Register from "@/pages/app/register";
import Home from "@/pages/app/home";
import Chat from "@/pages/app/chat";
import Catalogo from "@/pages/app/catalogo";
import Proposta from "@/pages/app/proposta";
import Perfil from "@/pages/app/perfil";

// Admin Pages
import AdminDashboard from "@/pages/admin/dashboard";
import AdminGerentes from "@/pages/admin/gerentes";
import AdminImoveis from "@/pages/admin/imoveis";
import AdminChat from "@/pages/admin/chat";
import AdminPerfil from "@/pages/admin/perfil";

import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* App Routes (Broker) */}
      <Route path="/app/home" component={Home} />
      <Route path="/app/chat" component={Chat} />
      <Route path="/app/catalogo" component={Catalogo} />
      <Route path="/app/proposta" component={Proposta} />
      <Route path="/app/perfil" component={Perfil} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/gerentes" component={AdminGerentes} />
      <Route path="/admin/imoveis" component={AdminImoveis} />
      <Route path="/admin/chat" component={AdminChat} />
      <Route path="/admin/perfil" component={AdminPerfil} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}
