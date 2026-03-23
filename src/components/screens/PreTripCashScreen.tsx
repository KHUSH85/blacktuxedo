import React, { useState } from 'react';
import { DollarSign, AlertCircle, CheckCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GoldButton } from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

interface PreTripCashScreenProps {
  fare: number;
  passengerName: string;
}

export function PreTripCashScreen({ fare, passengerName }: PreTripCashScreenProps) {
  const navigate = useNavigate();
  const [cashReceived, setCashReceived] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  
  const handleConfirm = () => {
    if (parseFloat(cashReceived) >= fare) {
      setConfirmed(true);
      // Replaced onCollected() with programmatic navigation to /ride
      setTimeout(() => navigate('/ride'), 1000);
    }
  };
  
  return (
    <div className="min-h-full bg-black p-6 safe-area flex flex-col items-center">
      <div className="w-full max-w-md pt-4 pb-8">
        
        {/* Branded Luxury Header Identity */}
        <div className="flex justify-between items-center py-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">Tuxedo</h1>
            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-1">Premium Driver</p>
          </motion.div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden gold-glow shadow-lg shadow-[#D4AF37]/20"
          >
            <User className="text-[#D4AF37] w-6 h-6" />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {!confirmed ? (
            <motion.div 
              key="payment-entry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full"
            >
              <div className="text-center mb-10">
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/20 flex items-center justify-center gold-glow"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <DollarSign size={48} className="text-[#D4AF37]" />
                </motion.div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tight mb-2">Upfront Collection</h2>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Cash Protocol Required Before Dispatch</p>
              </div>
              
              <GlassCard variant="subtle" className="mb-6 border-yellow-500/20 bg-yellow-500/5">
                <div className="flex items-start gap-4 p-2">
                  <div className="p-2 rounded-lg bg-yellow-500/10">
                    <AlertCircle size={20} className="text-yellow-500 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-1">Cash Ride Policy</p>
                    <p className="text-xs font-medium text-gray-400 leading-relaxed">
                      For cash rides, collect the full fare from <span className="text-white font-bold">{passengerName}</span> before initiating the trip sequence.
                    </p>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard variant="strong" className="mb-8 border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
                <div className="text-center mb-8 border-b border-[#D4AF37]/10 pb-6">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">Expected Trip Fare</p>
                  <p className="text-5xl font-black text-white italic tracking-tighter">
                    <span className="text-[#D4AF37]">$</span>{fare.toFixed(2)}
                  </p>
                </div>
                
                <div className="px-1">
                  <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-4">Verification Amount</label>
                  <div className="flex items-center gap-4 glass-card bg-black/40 p-5 border-2 border-[#D4AF37]/30 rounded-2xl min-h-[72px] focus-within:border-[#D4AF37] transition-all">
                    <DollarSign size={28} className="text-[#D4AF37]" />
                    <input 
                      type="number"
                      inputMode="decimal"
                      value={cashReceived}
                      onChange={(e) => setCashReceived(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 bg-transparent outline-none text-white text-3xl font-black italic placeholder:text-gray-800"
                      autoFocus
                    />
                  </div>
                </div>
                
                {parseFloat(cashReceived) > fare && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-4 bg-green-500/10 border-2 border-green-500/20 rounded-2xl text-center"
                  >
                    <p className="text-xs font-black text-green-400 uppercase tracking-widest">
                      Return Change: <span className="text-xl ml-1 italic font-black">${(parseFloat(cashReceived) - fare).toFixed(2)}</span>
                    </p>
                  </motion.div>
                )}
                
                {parseFloat(cashReceived) > 0 && parseFloat(cashReceived) < fare && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-4 bg-red-500/10 border-2 border-red-500/20 rounded-2xl text-center"
                  >
                    <p className="text-xs font-black text-red-400 uppercase tracking-widest">
                      Insufficient: Needs ${(fare - parseFloat(cashReceived)).toFixed(2)} more
                    </p>
                  </motion.div>
                )}
              </GlassCard>
              
              <div className="space-y-4">
                <GoldButton 
                  onClick={handleConfirm}
                  disabled={!cashReceived || parseFloat(cashReceived) < fare}
                  className="w-full py-6 text-xl font-black uppercase tracking-tighter italic"
                >
                  Confirm Collection
                </GoldButton>
                {/* Replaced onCancel with programmatic navigation */}
                <GoldButton 
                  variant="ghost" 
                  onClick={() => navigate('/home')} 
                  className="w-full text-xs font-bold uppercase tracking-widest border-[#D4AF37]/10"
                >
                  Cancel Protocol
                </GoldButton>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div 
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 border-2 border-green-500/40 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <CheckCircle size={48} className="text-green-500" />
              </motion.div>
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tight mb-2">Payment Verified</h2>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] animate-pulse">Initiating Trip Sequence...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}