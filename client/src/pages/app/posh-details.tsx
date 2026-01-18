import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Car, MapPin, Bed, Bath, Square, Star, Phone, MessageCircle, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PoshDetails() {
  const [, setLocation] = useLocation();
  const [showIntro, setShowIntro] = useState(true);
  const [introPhase, setIntroPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setIntroPhase(1), 500),
      setTimeout(() => setIntroPhase(2), 1500),
      setTimeout(() => setIntroPhase(3), 2500),
      setTimeout(() => setShowIntro(false), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const features = [
    { icon: Bed, label: "4 Suítes", sublabel: "Master com closet" },
    { icon: Bath, label: "5 Banheiros", sublabel: "Design Italiano" },
    { icon: Square, label: "380m²", sublabel: "Área privativa" },
    { icon: Car, label: "4 Vagas", sublabel: "Garagem coberta" },
  ];

  const mainImage = "/images/posh-building.png";
  
  const gallery = [
    "/images/posh-building.png",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
          >
            {/* Elegant background effects */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Radial gradient glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.02) 40%, transparent 70%)",
                }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
              />
              
              {/* Animated light particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-primary/30"
                  style={{
                    left: `${10 + (i * 4.5)}%`,
                    top: `${20 + (i % 5) * 15}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0.6, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -30, -60]
                  }}
                  transition={{ 
                    duration: 3 + (i % 3),
                    delay: 0.5 + (i * 0.15),
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              ))}
              
              {/* Subtle horizontal lines */}
              <motion.div
                className="absolute top-[35%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              <motion.div
                className="absolute top-[65%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/15 to-transparent"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
              
              {/* Corner accents */}
              <motion.div
                className="absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/20"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
              <motion.div
                className="absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/20"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </div>
            <motion.svg
              viewBox="0 0 400 120"
              className="absolute w-[88%] max-w-[500px] h-auto top-[32%]"
              style={{ filter: "drop-shadow(0 0 25px rgba(212, 175, 55, 0.9))" }}
              initial={{ x: "-120%", opacity: 0 }}
              animate={{ 
                x: introPhase >= 1 ? "0%" : "-120%", 
                opacity: introPhase >= 1 ? 1 : 0 
              }}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              {/* Porsche 911 - Clean minimalist silhouette */}
              {/* Complete body outline in one continuous path */}
              <motion.path
                d="M20,85 
                   L35,85 L42,80 L55,78 
                   Q70,76 85,74 
                   L105,70 L125,64 L145,56 L165,46 
                   Q185,36 210,28 
                   Q240,22 280,22 
                   Q320,24 345,35 
                   Q360,42 370,55 
                   L378,70 L382,80 L385,85 
                   L380,85"
                fill="none"
                stroke="url(#carGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: introPhase >= 1 ? 1 : 0 }}
                transition={{ duration: 2.5, ease: "easeOut" }}
              />
              
              {/* Bottom line connecting wheels */}
              <motion.path
                d="M55,88 L85,88 Q95,88 105,85 L295,85 Q305,88 315,88 L345,88"
                fill="none"
                stroke="url(#carGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: introPhase >= 1 ? 1 : 0 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              />
              
              {/* Window/cabin glass */}
              <motion.path
                d="M155,50 
                   Q175,38 205,30 
                   Q240,25 275,28 
                   Q305,34 325,48 
                   L340,60"
                fill="none"
                stroke="url(#carGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: introPhase >= 1 ? 1 : 0 }}
                transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
              />
              
              {/* A-pillar */}
              <motion.path
                d="M155,50 L145,56"
                fill="none"
                stroke="url(#carGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: introPhase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
              />
              
              {/* C-pillar (iconic 911 slant) */}
              <motion.path
                d="M340,60 L360,75"
                fill="none"
                stroke="url(#carGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: introPhase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.8, ease: "easeOut" }}
              />
              
              {/* Front light */}
              <motion.path
                d="M25,78 L38,74 L50,74"
                fill="none"
                stroke="url(#carGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: introPhase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 1, ease: "easeOut" }}
              />
              
              {/* Rear light bar */}
              <motion.path
                d="M375,75 L382,78 L382,82"
                fill="none"
                stroke="url(#carGradient)"
                strokeWidth="2"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: introPhase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 1, ease: "easeOut" }}
              />
              
              {/* Door line */}
              <motion.path
                d="M200,48 L200,80"
                fill="none"
                stroke="url(#carGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: introPhase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
              />
              
              {/* Side mirror */}
              <motion.path
                d="M150,52 L142,50 L142,55 L150,54"
                fill="none"
                stroke="url(#carGradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: introPhase >= 1 ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 1.3, ease: "easeOut" }}
              />
              
              {/* Front wheel with spokes */}
              <motion.circle cx="70" cy="88" r="20" fill="none" stroke="url(#carGradient)" strokeWidth="3" filter="url(#glow)" initial={{ pathLength: 0 }} animate={{ pathLength: introPhase >= 1 ? 1 : 0 }} transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }} />
              <motion.circle cx="70" cy="88" r="12" fill="none" stroke="url(#carGradient)" strokeWidth="2" filter="url(#glow)" initial={{ pathLength: 0 }} animate={{ pathLength: introPhase >= 1 ? 1 : 0 }} transition={{ duration: 0.5, delay: 1.6, ease: "easeOut" }} />
              <motion.circle cx="70" cy="88" r="5" fill="none" stroke="url(#carGradient)" strokeWidth="1.5" filter="url(#glow)" initial={{ pathLength: 0 }} animate={{ pathLength: introPhase >= 1 ? 1 : 0 }} transition={{ duration: 0.3, delay: 1.7, ease: "easeOut" }} />
              
              {/* Rear wheel with spokes */}
              <motion.circle cx="330" cy="88" r="20" fill="none" stroke="url(#carGradient)" strokeWidth="3" filter="url(#glow)" initial={{ pathLength: 0 }} animate={{ pathLength: introPhase >= 1 ? 1 : 0 }} transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }} />
              <motion.circle cx="330" cy="88" r="12" fill="none" stroke="url(#carGradient)" strokeWidth="2" filter="url(#glow)" initial={{ pathLength: 0 }} animate={{ pathLength: introPhase >= 1 ? 1 : 0 }} transition={{ duration: 0.5, delay: 1.6, ease: "easeOut" }} />
              <motion.circle cx="330" cy="88" r="5" fill="none" stroke="url(#carGradient)" strokeWidth="1.5" filter="url(#glow)" initial={{ pathLength: 0 }} animate={{ pathLength: introPhase >= 1 ? 1 : 0 }} transition={{ duration: 0.3, delay: 1.7, ease: "easeOut" }} />
              <defs>
                <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#B8860B" stopOpacity="0.6" />
                  <stop offset="20%" stopColor="#D4AF37" stopOpacity="1" />
                  <stop offset="50%" stopColor="#FFD700" stopOpacity="1" />
                  <stop offset="80%" stopColor="#D4AF37" stopOpacity="1" />
                  <stop offset="100%" stopColor="#B8860B" stopOpacity="0.6" />
                </linearGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </motion.svg>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: introPhase >= 2 ? 1 : 0, 
                scale: introPhase >= 2 ? 1 : 0.8 
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative z-10 text-center mt-56"
            >
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ 
                  y: introPhase >= 2 ? 0 : 30, 
                  opacity: introPhase >= 2 ? 1 : 0 
                }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center gap-4 mb-4"
              >
                <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-primary" />
                <span className="text-xs uppercase tracking-[0.4em] text-white/50 font-light">Where Elegance Resides</span>
                <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-primary" />
              </motion.div>
              
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                animate={{ 
                  y: introPhase >= 2 ? 0 : 50, 
                  opacity: introPhase >= 2 ? 1 : 0 
                }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-6xl md:text-8xl font-display font-bold text-white tracking-tight"
              >
                POSH
              </motion.h1>
              
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ 
                  y: introPhase >= 3 ? 0 : 30, 
                  opacity: introPhase >= 3 ? 1 : 0 
                }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-primary italic font-display mt-2"
              >
                Residence
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: introPhase >= 1 ? 1 : 0 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent origin-center"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative"
      >
        <div className="relative h-[60vh]">
          <img
            src={mainImage}
            alt="POSH Residence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
          
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setLocation("/app/home")}
            className="absolute top-12 left-6 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 left-6 right-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Car className="w-5 h-5 text-primary" />
              <span className="text-xs uppercase tracking-[0.2em] text-white/60">Conceito POSH</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
              POSH <span className="text-primary italic">Residence</span>
            </h1>
            <div className="flex items-center gap-2 text-white/70">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Jardins, São Paulo</span>
              <span className="mx-2">•</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-sm">Premium</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 -mt-6 bg-black rounded-t-3xl px-6 pt-8 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-4 gap-3 mb-8"
          >
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="text-center p-3 rounded-2xl bg-white/5 border border-white/10"
              >
                <feat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                <p className="text-white font-bold text-sm">{feat.label}</p>
                <p className="text-[10px] text-white/50">{feat.sublabel}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-8"
          >
            <h2 className="text-lg font-display font-bold text-white mb-3">Sobre o Empreendimento</h2>
            <p className="text-sm text-white/70 leading-relaxed">
              O POSH Residence representa a fusão perfeita entre a engenharia automotiva de alta performance 
              e a arquitetura contemporânea de luxo. Cada detalhe foi meticulosamente projetado para 
              proporcionar uma experiência de vida extraordinária, onde a sofisticação encontra a funcionalidade.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-8"
          >
            <h2 className="text-lg font-display font-bold text-white mb-3">Galeria</h2>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
              {gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden"
                >
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider">A partir de</p>
                  <p className="text-3xl font-display font-bold text-white">R$ 4.2M</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-primary uppercase tracking-wider">Condição especial</p>
                  <p className="text-sm text-white/80">Lançamento</p>
                </div>
              </div>
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl group" data-testid="button-contact">
                <Phone className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                Falar com Especialista
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/95 to-transparent"
        >
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-14 border-white/20 text-white hover:bg-white/10 rounded-xl" data-testid="button-whatsapp">
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp
            </Button>
            <Button className="flex-[2] h-14 bg-primary hover:bg-primary/90 text-black font-bold rounded-xl" data-testid="button-schedule">
              Agendar Visita
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
