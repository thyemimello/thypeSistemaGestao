import { useState } from "react";
import { motion } from "framer-motion";
import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Bot, User, Building2 } from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "ai";
  text: string;
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  type: "ai" | "partner";
  lastMessage: string;
  time: string;
  unread: number;
}

export default function ManagerChat() {
  const [activeTab, setActiveTab] = useState<"ia" | "parceiros">("ia");
  const [message, setMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "ai", text: "Olá! Sou a IA assistente da THYPE. Como posso ajudá-lo hoje?", time: "10:00" },
    { id: 2, sender: "user", text: "Quais parceiros precisam de atenção essa semana?", time: "10:01" },
    { id: 3, sender: "ai", text: "Analisando sua carteira, identifiquei 3 parceiros que precisam de atenção:\n\n1. **Corretor Marcos Oliveira** - Sem contato há 2 semanas (classificação Bronze)\n2. **Imobiliária Luxo SP** - Queda de 30% nas vendas\n3. **Corretor Pedro Lima** - Relacionamento esfriando\n\nRecomendo priorizar o contato com Marcos Oliveira.", time: "10:01" },
  ]);

  const conversations: Conversation[] = [
    { id: 1, name: "Imobiliária Premium", type: "partner", lastMessage: "Vamos agendar a visita técnica?", time: "14:30", unread: 2 },
    { id: 2, name: "Corretor João Mendes", type: "partner", lastMessage: "Obrigado pelo material!", time: "11:20", unread: 0 },
    { id: 3, name: "Imobiliária Elite", type: "partner", lastMessage: "Confirmado para amanhã", time: "Ontem", unread: 0 },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      text: message,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        sender: "ai",
        text: "Entendido! Vou analisar os dados e preparar um relatório detalhado para você. Isso pode levar alguns segundos...",
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  return (
    <MobileLayout role="manager">
      <div className="flex flex-col h-[calc(100vh-5rem)]">
        <header className="px-6 pt-12 pb-4">
          <h1 className="text-2xl font-display font-bold text-white mb-1">Chat</h1>
          <p className="text-sm text-muted-foreground">Comunicação estratégica</p>
        </header>

        <div className="px-6 mb-4">
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("ia")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "ia" ? "bg-primary text-black" : "text-white/60"
              }`}
            >
              <Bot className="w-4 h-4 inline mr-2" />
              IA Assistente
            </button>
            <button
              onClick={() => setActiveTab("parceiros")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === "parceiros" ? "bg-primary text-black" : "text-white/60"
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              Parceiros
            </button>
          </div>
        </div>

        {activeTab === "ia" ? (
          <>
            <div className="flex-1 overflow-y-auto px-6 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={msg.sender === "ai" ? "bg-primary/20 text-primary" : "bg-white/10 text-white"}>
                      {msg.sender === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[75%] ${msg.sender === "user" ? "text-right" : ""}`}>
                    <div className={`inline-block p-3 rounded-2xl text-sm ${
                      msg.sender === "ai" 
                        ? "bg-card border border-white/5 text-white" 
                        : "bg-primary text-black"
                    }`}>
                      <p className="whitespace-pre-line">{msg.text}</p>
                    </div>
                    <p className="text-[10px] text-white/30 mt-1">{msg.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t border-white/5">
              <div className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Pergunte algo à IA..."
                  className="flex-1 bg-white/5 border-white/10 text-white h-11 rounded-xl"
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon" 
                  className="h-11 w-11 bg-primary hover:bg-primary/90 text-black rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto px-6">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Buscar conversa..."
                className="pl-10 bg-white/5 border-white/10 text-white h-11 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              {conversations.map((conv, index) => (
                <motion.div
                  key={conv.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className="bg-card border-white/5 cursor-pointer hover:border-primary/30 transition-colors"
                    onClick={() => setSelectedConversation(conv.id)}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <Avatar className="h-12 w-12 border border-white/10">
                        <AvatarFallback className="bg-primary/20 text-primary">
                          <Building2 className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-white text-sm truncate">{conv.name}</h3>
                          <span className="text-[10px] text-white/40">{conv.time}</span>
                        </div>
                        <p className="text-xs text-white/50 truncate">{conv.lastMessage}</p>
                      </div>
                      {conv.unread > 0 && (
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-[10px] text-black font-bold">{conv.unread}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
