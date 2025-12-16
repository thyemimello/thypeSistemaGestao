
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function IAChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá, Roberto. Sou sua assistente estratégica. Analisei os dados de hoje e notei que a "Imobiliária Prime" está sem visitas há 30 dias, mesmo sendo um cliente Ouro. Gostaria de agendar um alerta para o gerente responsável?',
      timestamp: new Date()
    }
  ]);

  const suggestions = [
    "Quais gerentes não têm retorno?",
    "Quais clientes ouro estão esfriando?",
    "Onde investir mais no próximo mês?",
    "Gerar relatório de eficiência"
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");

    // Mock AI response
    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Entendido. Com base na análise dos dados históricos e KPIs atuais, identifiquei que o Gerente Carlos Silva apresenta um alto índice de esforço (muitas visitas), mas o ROI está 15% abaixo da média. Sugiro um treinamento focado em fechamento ou revisão da carteira dele.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1500);
  };

  return (
    <DashboardLayout role="master">
      <div className="h-[calc(100vh-8rem)] flex flex-col max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-6 text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-purple-600 shadow-lg shadow-primary/25 mb-4 animate-bounce-slow">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold">Assistente Estratégica</h1>
          <p className="text-muted-foreground">Pergunte sobre métricas, insights e recomendações.</p>
        </div>

        {/* Chat Area */}
        <div className="flex-1 bg-white border border-border rounded-2xl overflow-hidden flex flex-col shadow-lg shadow-primary/5">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <Avatar className={`w-8 h-8 border ${msg.role === 'assistant' ? 'border-primary/20 bg-primary/10' : 'border-border'}`}>
                    {msg.role === 'assistant' ? (
                      <div className="w-full h-full flex items-center justify-center text-primary"><Bot className="w-4 h-4" /></div>
                    ) : (
                      <AvatarImage src="https://github.com/shadcn.png" />
                    )}
                  </Avatar>
                  
                  <div className={`
                    max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-sm
                    ${msg.role === 'assistant' 
                      ? 'bg-secondary text-foreground border border-border rounded-tl-none' 
                      : 'bg-primary text-primary-foreground rounded-tr-none'}
                  `}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-border">
            
            {/* Suggestions */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin">
              {suggestions.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => setInput(s)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground text-xs font-medium transition-colors border border-border"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="relative flex items-center gap-2">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua pergunta para a IA..." 
                className="h-12 pl-4 pr-12 bg-secondary/30 border-input focus:border-primary/50 rounded-xl text-foreground placeholder:text-muted-foreground"
              />
              <Button 
                onClick={handleSend}
                size="icon" 
                className="absolute right-1 top-1 h-10 w-10 rounded-lg shadow-none"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
