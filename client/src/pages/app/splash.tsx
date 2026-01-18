
import { useEffect } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function Splash() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation("/login");
    }, 2500);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black opacity-50" />
      
      {/* Logo Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 flex flex-col items-center gap-4"
      >
        {/* Simulated Logo based on user upload */}
        <div className="relative">
          <div className="w-24 h-24 border-2 border-primary/30 rounded-full flex items-center justify-center animate-pulse">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/50">
              <span className="font-display font-bold text-3xl text-primary tracking-widest">VPR</span>
            </div>
          </div>
        </div>
        
        <div className="text-center space-y-1">
          <h1 className="font-display text-2xl font-bold tracking-[0.2em] text-white">
            VPR<span className="text-primary">.MY</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Empreendimentos</p>
        </div>
      </motion.div>

      {/* Loading Bar */}
      <div className="absolute bottom-20 w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
