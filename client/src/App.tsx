
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Home from "@/pages/home";
import MasterDashboard from "@/pages/master/dashboard";
import GerentesList from "@/pages/master/gerentes";
import IAChat from "@/pages/ia/chat";
import GerentePainel from "@/pages/gerente/painel";
import RegistrarInteracao from "@/pages/gerente/registrar-interacao";
import CadastroImobiliaria from "@/pages/cadastro-imobiliaria";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Register} />
      
      <Route path="/home" component={Home} />
      
      {/* Master Routes */}
      <Route path="/master/dashboard" component={MasterDashboard} />
      <Route path="/master/gerentes" component={GerentesList} />
      <Route path="/ia" component={IAChat} />
      <Route path="/cadastro-imobiliaria" component={CadastroImobiliaria} />
      
      {/* Gerente Routes */}
      <Route path="/gerente/painel" component={GerentePainel} />
      <Route path="/gerente/registrar-interacao" component={RegistrarInteracao} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
