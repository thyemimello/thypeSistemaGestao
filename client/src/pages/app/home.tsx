
import MobileLayout from "@/components/layout/MobileLayout";
import { motion } from "framer-motion";
import { Bell, MapPin, ArrowRight, Star, Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <MobileLayout>
      <div className="pb-8">
        {/* Header */}
        <header className="px-6 pt-12 pb-6 flex items-center justify-between sticky top-0 bg-black/80 backdrop-blur-md z-40 border-b border-white/5">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Bom dia,</p>
            <h1 className="text-xl font-display font-bold text-white">Carlos Silva</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </div>
        </header>

        {/* Hero Section - Empreendimento Âncora (POSH) */}
        <section className="px-6 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display text-primary tracking-wide">Lançamento Exclusivo</h2>
            <span className="px-2 py-0.5 rounded-full border border-primary/30 text-[10px] text-primary uppercase bg-primary/5">
              Âncora
            </span>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative group"
          >
            {/* Background Image - Luxury Car / Building */}
            <img 
              src="/images/posh-building.png" 
              alt="POSH Concept" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6">
              <div className="flex items-center gap-2 mb-2">
                <Car className="w-4 h-4 text-primary" />
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Conceito POSH</span>
              </div>
              <h3 className="text-4xl font-display font-bold text-white mb-2 leading-none">
                POSH <span className="text-primary italic">Residence</span>
              </h3>
              <p className="text-sm text-white/70 line-clamp-2 mb-4">
                Onde a engenharia automotiva de luxo encontra a arquitetura contemporânea.
              </p>
              
              <Button 
                onClick={() => setLocation("/app/posh-details")}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white group-hover:border-primary/50 transition-all"
                data-testid="button-explore-posh"
              >
                Explorar Detalhes <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Categories / Quick Filters */}
        <section className="mt-8 px-6">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {['Lançamentos', 'Em Obras', 'Prontos', 'Comercial'].map((cat, i) => (
              <button key={i} className={`
                whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium border transition-all
                ${i === 0 ? 'bg-primary text-black border-primary' : 'bg-transparent text-white/60 border-white/10'}
              `}>
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Catalog List */}
        <section className="mt-4 px-6 space-y-6">
          {[
            { name: "Aurum Tower", loc: "Jardins", price: "R$ 2.4M", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop" },
            { name: "Legacy Mansion", loc: "Vila Nova", price: "R$ 5.8M", img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" },
            { name: "VPR Corporate", loc: "Faria Lima", price: "Sob Consulta", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card className="bg-card border-white/5 overflow-hidden rounded-xl group cursor-pointer active:scale-98 transition-transform">
                <div className="h-48 relative">
                  <img src={item.img} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-[10px] text-primary font-bold uppercase tracking-wide">
                      {item.price}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-display font-bold text-white">{item.name}</h4>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                        <MapPin className="w-3 h-3" />
                        {item.loc}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                      <Star className="w-4 h-4 text-white/40" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </section>
      </div>
    </MobileLayout>
  );
}
