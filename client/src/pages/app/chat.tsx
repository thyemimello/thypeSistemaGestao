
import MobileLayout from "@/components/layout/MobileLayout";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Phone, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function Chat() {
  const [activeChat, setActiveChat] = useState<string | null>(null);

  const contacts = [
    { id: '1', name: "Ricardo (Gerente)", role: "Gerente Comercial", online: true, unread: 2 },
    { id: '2', name: "Suporte VPR", role: "Atendimento Geral", online: false, unread: 0 },
  ];

  const messages = [
    { id: 1, sender: 'other', text: 'Olá Carlos, vi que você baixou a tabela do POSH. Precisa de ajuda?', time: '10:30' },
    { id: 2, sender: 'me', text: 'Bom dia Ricardo! Sim, tenho um cliente interessado na cobertura.', time: '10:32' },
    { id: 3, sender: 'other', text: 'Excelente. A unidade 2401 está disponível. Quer agendar visita?', time: '10:33' },
  ];

  if (activeChat) {
    return (
      <div className="h-screen bg-black flex flex-col">
        {/* Chat Header */}
        <header className="h-16 px-4 border-b border-white/10 flex items-center justify-between bg-black/90 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => setActiveChat(null)} className="-ml-2">
              <span className="text-xl">←</span>
            </Button>
            <div className="relative">
              <Avatar className="h-9 w-9 border border-primary/30">
                <AvatarFallback>RM</AvatarFallback>
              </Avatar>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Ricardo (Gerente)</h3>
              <p className="text-[10px] text-primary">Online agora</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="text-white/60"><Phone className="w-4 h-4" /></Button>
            <Button variant="ghost" size="icon" className="text-white/60"><MoreVertical className="w-4 h-4" /></Button>
          </div>
        </header>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 bg-white/5">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`
                  max-w-[80%] p-3 rounded-2xl text-sm
                  ${msg.sender === 'me' 
                    ? 'bg-primary text-black rounded-tr-none' 
                    : 'bg-white/10 text-white rounded-tl-none border border-white/5'}
                `}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-black/60' : 'text-white/40'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 bg-black border-t border-white/10">
          <div className="flex gap-2">
            <Input placeholder="Digite sua mensagem..." className="bg-white/5 border-white/10 text-white focus:border-primary/50" />
            <Button size="icon" className="bg-primary text-black hover:bg-primary/90">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MobileLayout>
      <div className="px-6 pt-12">
        <h1 className="text-2xl font-display font-bold text-white mb-6">Mensagens</h1>
        
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div 
              key={contact.id} 
              onClick={() => setActiveChat(contact.id)}
              className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5 active:bg-white/5 transition-colors"
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border border-white/10">
                  <AvatarFallback className="bg-white/5 text-primary">{contact.name.substring(0, 1)}</AvatarFallback>
                </Avatar>
                {contact.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-white text-sm">{contact.name}</h3>
                  {contact.unread > 0 && (
                    <span className="bg-primary text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {contact.unread}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{contact.role}</p>
              </div>
            </div>
          ))}
          
          <div className="mt-8 p-4 rounded-xl border border-dashed border-white/10 text-center">
            <p className="text-xs text-muted-foreground mb-3">Precisa falar com um setor específico?</p>
            <Button variant="outline" className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:text-primary">
              Iniciar Chat Geral
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
