import React, { useState } from 'react';
import { Shield, User, Phone, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoldButton, GlassCard } from '../ui/GlassCard';
import { useNotification } from '../../contexts/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeVerificationScreenProps {
  passengerName: string;
  paymentType?: 'card' | 'cash'; // Added to determine the next step
}

export function CodeVerificationScreen({ passengerName, paymentType = 'card' }: CodeVerificationScreenProps) {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const correctCode = '1234'; // Demo code
  const { showSuccess, showError } = useNotification();
  
  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false);
    
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
    
    // Auto-verify when all 4 digits are entered
    if (index === 3 && value) {
      const enteredCode = [...newCode.slice(0, 3), value].join('');
      setTimeout(() => {
        if (enteredCode === correctCode) {
          showSuccess('Code Verified!', 'Passenger identity confirmed');
          
          // Navigation logic based on payment type
          setTimeout(() => {
            if (paymentType === 'cash') {
              navigate('/pre-trip-cash');
            } else {
              navigate('/ride');
            }
          }, 500);
        } else {
          setError(true);
          showError('Invalid Code', 'Please check the code and try again');
          setCode(['', '', '', '']);
          document.getElementById('code-0')?.focus();
        }
      }, 300);
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };
  
  const handleAutofill = () => {
    const codeArray = correctCode.split('');
    setCode(codeArray);
    
    // Auto-navigation for demo autofill
    setTimeout(() => {
      if (paymentType === 'cash') {
        navigate('/pre-trip-cash');
      } else {
        navigate('/ride');
      }
    }, 800);
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
              onClick={() => navigate(-1)}
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
            className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden gold-glow shadow-lg shadow-[#D4AF37]/20"
          >
            <User className="text-[#D4AF37] w-6 h-6" />
          </motion.div>
        </div>
      </motion.div>

      <div className="w-full max-w-md px-6 pt-2 pb-8 flex-1 flex flex-col justify-center">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div 
            className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
              error 
                ? 'bg-red-500/20 border-red-500/50 shadow-lg shadow-red-500/30' 
                : 'bg-[#D4AF37]/20 border-[#D4AF37]/30 gold-glow'
            }`}
            animate={error ? { x: [-10, 10, -10, 10, 0] } : { y: [0, -5, 0] }}
            transition={error ? { duration: 0.4 } : { duration: 3, repeat: Infinity }}
          >
            <Shield size={48} className={error ? 'text-red-500' : 'text-[#D4AF37]'} />
          </motion.div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tight italic mb-3">Identity Key</h2>
          <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-[10px]">Verify Passenger Pickup Protocol</p>
        </motion.div>
        
        {/* Passenger Info */}
        <GlassCard variant="subtle" className="mb-6 border-[#D4AF37]/10 bg-black/40">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 gold-glow">
              <User size={28} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Authenticated Guest</p>
              <p className="text-xl font-black text-white italic tracking-tight">{passengerName}</p>
            </div>
          </div>
        </GlassCard>
        
        {/* Code Input */}
        <GlassCard variant="strong" className={`mb-8 p-10 border-2 transition-colors duration-300 ${error ? 'border-red-500/50' : 'border-[#D4AF37]/40'} shadow-2xl`}>
          <div className="flex justify-center gap-3 mb-8">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-14 h-20 text-center text-4xl font-black rounded-2xl outline-none transition-all duration-300 bg-black/60 border-2 ${
                  error 
                    ? 'border-red-500 text-red-500' 
                    : digit 
                    ? 'border-[#D4AF37] text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                    : 'border-white/10 text-white focus:border-[#D4AF37]/60'
                }`}
                autoFocus={index === 0}
              />
            ))}
          </div>
          
          <AnimatePresence mode="wait">
            {error ? (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-red-500 text-[10px] font-black uppercase tracking-widest"
              >
                ✗ Registry Mismatch. Re-enter protocol.
              </motion.p>
            ) : code.every(d => d) ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center justify-center gap-2 text-green-500"
              >
                <CheckCircle size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Protocol Verified</span>
              </motion.div>
            ) : (
              <p className="text-center text-gray-600 text-[10px] font-black uppercase tracking-widest">Awaiting Identity Code</p>
            )}
          </AnimatePresence>
        </GlassCard>
        
        {/* Help */}
        <GlassCard variant="subtle" className="mb-10 border-[#D4AF37]/10 bg-[#D4AF37]/5">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-[#D4AF37]/10">
              <Phone size={18} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-[10px] font-black text-white uppercase tracking-tight mb-1">Access Issues?</p>
              <p className="text-[11px] text-gray-500 font-bold leading-relaxed">Establish direct communication or verify physical credentials to initiate manual bypass.</p>
            </div>
          </div>
        </GlassCard>
        
        {/* Demo Helper */}
        <GlassCard className="mb-10 border-green-500/30 bg-green-500/5 p-6">
          <div className="text-center">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-4 italic">Registry Bypass Key (Demo Mode)</p>
            <div className="text-4xl text-[#D4AF37] font-black mb-8 tracking-[0.5em] italic drop-shadow-lg ml-4">
              {correctCode}
            </div>
            <GoldButton onClick={handleAutofill} variant="ghost" className="w-full py-4 text-[10px] font-black uppercase tracking-widest border border-green-500/20">
              Execute Identity Bypass
            </GoldButton>
          </div>
        </GlassCard>
        
        <GoldButton 
          variant="secondary" 
          onClick={() => navigate('/home')}
          className="w-full py-6 text-sm font-black uppercase tracking-widest border-[#D4AF37]/20 italic"
        >
          Terminate Pickup
        </GoldButton>
      </div>
    </div>
  );
}