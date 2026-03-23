import React, { useEffect } from 'react';
import { Car } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Replaced onComplete prop with programmatic navigation
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center safe-area overflow-hidden">
      {/* Header Identity - Mobile Responsive Branded Top */}
      <motion.div 
        className="absolute top-0 w-full max-w-md px-6 py-10 flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">Tuxedo</h2>
          <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-1">Premium Driver</p>
        </div>
        <div className="w-10 h-[1px] bg-[#D4AF37]/30" />
      </motion.div>

      <div className="text-center px-6 w-full max-w-md">
        <motion.div 
          className="mb-12 inline-block p-12 rounded-full glass-strong border-2 border-[#D4AF37]/20 shadow-[0_0_60px_rgba(212,175,55,0.2)] animate-pulse-gold"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Car size={96} className="text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" strokeWidth={1} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-7xl mb-2 gold-shimmer bg-clip-text text-transparent font-black tracking-tighter uppercase italic">
            TUXEDO
          </h1>
          <p className="text-[#D4AF37] text-sm tracking-[0.5em] font-black uppercase opacity-80 mb-12">
            DRIVER PROTOCOL
          </p>
        </motion.div>

        {/* Mobile-Optimized Loading Indicator */}
        <div className="flex items-center justify-center gap-3">
          {[0, 200, 400].map((delay) => (
            <motion.div 
              key={delay}
              className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3] 
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                delay: delay / 1000 
              }}
            />
          ))}
        </div>
      </div>

      {/* Footer Branding */}
      <motion.div 
        className="absolute bottom-12 text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Encrypted Luxury Dispatch
      </motion.div>
    </div>
  );
}