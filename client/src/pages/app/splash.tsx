
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
        className="z-10 flex flex-col items-center gap-6"
      >
        {/* THYPE Logo */}
        <div className="relative">
          <motion.div 
            className="w-28 h-28 border-2 border-primary/40 rounded-2xl flex items-center justify-center"
            animate={{ 
              boxShadow: ["0 0 20px rgba(212,175,55,0.1)", "0 0 40px rgba(212,175,55,0.3)", "0 0 20px rgba(212,175,55,0.1)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center backdrop-blur-sm border border-primary/30">
              <span className="font-display font-black text-4xl bg-gradient-to-r from-primary via-[#D4AF37] to-primary bg-clip-text text-transparent">T</span>
            </div>
          </motion.div>
        </div>
        
        <div className="text-center space-y-2">
          <motion.h1 
            className="font-display text-4xl font-black tracking-[0.15em] bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            THYPE
          </motion.h1>
          <p className="text-[10px] uppercase tracking-[0.5em] text-primary/60">Strategic Management</p>
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
