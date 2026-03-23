import React, { useState } from 'react';
import { DollarSign, CheckCircle, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GoldButton } from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

interface CashVerificationScreenProps {
  fare: number;
}

export function CashVerificationScreen({ fare }: CashVerificationScreenProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [enteredAmount, setEnteredAmount] = useState('');
  
  const handleConfirm = () => {
    if (step === 1) {
      setStep(2);
    } else {
      // Replaced onComplete() prop with programmatic navigation
      navigate('/rating');
    }
  };
  
  return (
    <div className="min-h-screen bg-black safe-area flex flex-col items-center overflow-x-hidden">
      {/* Branded Responsive Header */}
      <motion.div 
        className="w-full max-w-md px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center py-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => step === 2 ? setStep(1) : navigate(-1)}
              className="p-3 glass-card rounded-xl text-[#D4AF37] min-w-[48px] min-h-[48px] flex items-center justify-center border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">Tuxedo</h1>
              <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-1">Premium Driver</p>
            </div>
          </div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/edit-profile')}
            className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden gold-glow shadow-lg shadow-[#D4AF37]/20"
          >
            <User className="text-[#D4AF37] w-6 h-6" />
          </motion.div>
        </div>
      </motion.div>

      <div className="w-full max-w-md px-6 pt-4 pb-8 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div 
              key="step-1"
              className="w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-10">
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/30 flex items-center justify-center gold-glow shadow-lg"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <DollarSign size={48} className="text-[#D4AF37]" />
                </motion.div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tight mb-2">Cash Receipt</h2>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Enter Physical Currency Collected</p>
              </div>
              
              <GlassCard variant="strong" className="mb-10 border-[#D4AF37]/40 shadow-2xl">
                <div className="text-center mb-8 border-b border-[#D4AF37]/10 pb-8">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3 italic">Calculated Fare</p>
                  <p className="text-5xl font-black text-white italic tracking-tighter">
                    <span className="text-[#D4AF37]">$</span>{fare.toFixed(2)}
                  </p>
                </div>
                
                <div className="px-1">
                  <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-4 ml-1">Manual Verification</label>
                  <div className="flex items-center gap-4 glass-card bg-black/40 p-6 border-2 border-[#D4AF37]/30 rounded-2xl min-h-[80px] focus-within:border-[#D4AF37] transition-all">
                    <DollarSign size={32} className="text-[#D4AF37]" />
                    <input 
                      type="number"
                      inputMode="decimal"
                      value={enteredAmount}
                      onChange={(e) => setEnteredAmount(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 bg-transparent outline-none text-white text-4xl font-black italic tracking-tighter placeholder:text-gray-900"
                      autoFocus
                    />
                  </div>
                </div>
                
                {parseFloat(enteredAmount) > fare && (
                  <motion.div 
                    className="mt-6 p-5 bg-green-500/10 border-2 border-green-500/20 rounded-2xl text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-[10px] font-black text-green-400 uppercase tracking-widest">
                      Return Change: <span className="text-2xl ml-2 italic font-black">${(parseFloat(enteredAmount) - fare).toFixed(2)}</span>
                    </p>
                  </motion.div>
                )}
              </GlassCard>
              
              <GoldButton 
                onClick={handleConfirm}
                disabled={!enteredAmount || parseFloat(enteredAmount) < fare}
                className="w-full py-6 text-xl font-black uppercase tracking-tighter italic"
              >
                Proceed to Audit
              </GoldButton>
            </motion.div>
          ) : (
            <motion.div 
              key="step-2"
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-10">
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)]"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle size={48} className="text-green-500" />
                </motion.div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tight mb-2">Final Protocol</h2>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Verify Registry Transaction</p>
              </div>
              
              <GlassCard variant="strong" className="mb-10 border-[#D4AF37]/40 shadow-2xl">
                <div className="space-y-1">
                  <div className="flex items-center justify-between py-6 border-b border-white/5 px-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Booking Fare</span>
                    <span className="text-xl font-black text-white italic tracking-tight">${fare.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-6 border-b border-white/5 px-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Cash Collection</span>
                    <span className="text-xl font-black text-green-400 italic tracking-tight">${parseFloat(enteredAmount).toFixed(2)}</span>
                  </div>
                  
                  {parseFloat(enteredAmount) > fare && (
                    <div className="flex items-center justify-between py-6 border-b border-white/5 px-2">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Change Distributed</span>
                      <span className="text-xl font-black text-red-500 italic tracking-tight">
                        -${(parseFloat(enteredAmount) - fare).toFixed(2)}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between py-8 bg-gradient-to-r from-[#D4AF37]/10 to-transparent -mx-4 px-6 rounded-2xl mt-6 border border-[#D4AF37]/20 shadow-inner">
                    <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em]">Net Revenue</span>
                    <span className="text-4xl text-[#D4AF37] font-black italic tracking-tighter">${fare.toFixed(2)}</span>
                  </div>
                </div>
              </GlassCard>
              
              <div className="space-y-4">
                <GoldButton 
                  onClick={handleConfirm} 
                  className="w-full py-6 text-xl font-black uppercase tracking-tighter italic"
                >
                  Establish Receipt
                </GoldButton>
                <GoldButton 
                  variant="ghost"
                  onClick={() => setStep(1)}
                  className="w-full text-[10px] font-black uppercase tracking-widest border-[#D4AF37]/10"
                >
                  Adjust Amount
                </GoldButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}