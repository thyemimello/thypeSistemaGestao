import { useState, useRef, useEffect } from "react";
import MobileLayout from "@/components/layout/MobileLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestions = [
  { icon: TrendingUp, text: "Qual gerente tem melhor ROI?" },
  { icon: AlertTriangle, text: "Alertas de clientes inativos" },
  { icon: Lightbulb, text: "Sugestões de ações estratégicas" },
];

const mockResponses: Record<string, string> = {
  "default": "Olá! Sou a IA Secretária do THYPE. Posso ajudá-lo a analisar o desempenho dos gerentes, identificar oportunidades de melhoria e sugerir ações estratégicas. Como posso ajudar?",
  "roi": "Baseado nos dados atuais, o gerente **Roberto Almeida** apresenta o melhor ROI com **120%**, seguido por Fernanda Costa com 50%. Roberto tem se destacado pelo alto número de interações de qualidade com clientes classificados como Ouro.",
  "alertas": "🔔 **Alertas Identificados:**\n\n1. **Imobiliária Prime** (Ouro) está há mais de 60 dias sem contato\n2. **Carlos Silva** precisa de atenção - baixo número de interações\n3. Conversão geral caiu 5% este mês\n\nRecomendo priorizar contato com clientes classificação Ouro inativos.",
  "sugestoes": "💡 **Sugestões Estratégicas:**\n\n1. Agendar almoço estratégico com Imobiliária Elite\n2. Realizar treinamento para equipe sobre novos empreendimentos\n3. Aumentar frequência de visitas técnicas em clientes Bronze com potencial de upgrade\n\nQuer que eu detalhe alguma dessas ações?",
};

export default function AdminChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Olá! Sou a **IA Secretária** do THYPE. Posso analisar dados dos gerentes, identificar oportunidades e sugerir ações estratégicas. Como posso ajudar você hoje?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes("roi") || lowerMessage.includes("melhor")) {
      return mockResponses.roi;
    } else if (lowerMessage.includes("alerta") || lowerMessage.includes("inativo")) {
      return mockResponses.alertas;
    } else if (lowerMessage.includes("sugest") || lowerMessage.includes("ação") || lowerMessage.includes("estrateg")) {
      return mockResponses.sugestoes;
    }
    return mockResponses.default;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(input);
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const boldFormatted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>');
      return (
        <span key={i} dangerouslySetInnerHTML={{ __html: boldFormatted }} className="block" />
      );
    });
  };

  return (
    <MobileLayout role="admin">
      <div className="flex flex-col h-[calc(100vh-80px)]">
        <header className="px-6 pt-12 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-display font-bold text-white">IA Secretária</h1>
              <p className="text-xs text-muted-foreground">Assistente Estratégico THYPE</p>
            </div>
            <div className="ml-auto flex items-center gap-1 text-green-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs">Online</span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                    message.role === "assistant"
                      ? "bg-primary/20 border border-primary/30"
                      : "bg-white/10 border border-white/20"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Bot className="w-4 h-4 text-primary" />
                  ) : (
                    <User className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "assistant"
                      ? "bg-white/5 border border-white/10 rounded-tl-sm"
                      : "bg-primary text-black rounded-tr-sm"
                  }`}
                >
                  <div className={`text-sm leading-relaxed ${message.role === "user" ? "text-black" : "text-white/90"}`}>
                    {formatContent(message.content)}
                  </div>
                  <p className={`text-[10px] mt-2 ${message.role === "user" ? "text-black/60" : "text-white/40"}`}>
                    {message.timestamp.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="px-4 pb-4">
            <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Sugestões
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, i) => (
                <Button
                  key={i}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="h-auto py-2 px-3 text-xs border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                  data-testid={`button-suggestion-${i}`}
                >
                  <suggestion.icon className="w-3 h-3 mr-2 text-primary" />
                  {suggestion.text}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-white/5 bg-black/50 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre gerentes, clientes, KPIs..."
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12 rounded-xl"
              data-testid="input-chat-message"
            />
            <Button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="h-12 w-12 bg-primary hover:bg-primary/90 text-black rounded-xl"
              data-testid="button-send-message"
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </MobileLayout>
  );
}
