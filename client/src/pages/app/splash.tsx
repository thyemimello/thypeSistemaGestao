
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
        className="z-10 flex flex-col items-center"
      >
        {/* VPR.M7 Logo */}
        <motion.img 
          src="/vprm7-logo.png"
          alt="VPR.M7 Empreendimentos"
          className="w-64 h-auto"
          animate={{ 
            filter: ["drop-shadow(0 0 10px rgba(212,175,55,0.2))", "drop-shadow(0 0 25px rgba(212,175,55,0.4))", "drop-shadow(0 0 10px rgba(212,175,55,0.2))"]
          }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
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
