import React, { useState } from 'react';
import { Phone, Lock, ArrowRight, Shield, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GoldButton } from '../ui/GlassCard';
import { useNotification } from '../../contexts/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

export function LoginScreen() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const correctOtp = '123456'; // Demo OTP code
  const { showSuccess } = useNotification();
  
  const handlePhoneSubmit = () => {
    if (phone.length === 10) {
      setStep('otp');
      showSuccess('OTP Sent', `Verification code sent to ${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`);
    }
  };
  
  const handleOtpInput = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
    
    if (newOtp.every(digit => digit !== '') && index === 5) {
      setTimeout(() => navigate('/kyc'), 500);
    }
  };
  
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };
  
  const handleAutofillOtp = () => {
    const otpArray = correctOtp.split('');
    setOtp(otpArray);
    setTimeout(() => navigate('/kyc'), 800);
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-6 safe-area overflow-x-hidden">
      {/* Branded Luxury Header Identity */}
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center py-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">Tuxedo</h1>
            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-1">Premium Driver</p>
          </div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden gold-glow shadow-lg shadow-[#D4AF37]/20"
          >
            <User className="text-[#D4AF37] w-6 h-6" />
          </motion.div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <GlassCard className="w-full p-8 border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.15)] rounded-[2rem]">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-block p-5 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/20 mb-6 gold-glow shadow-lg shadow-[#D4AF37]/10"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Shield size={48} className="text-[#D4AF37]" />
            </motion.div>
            <h1 className="text-5xl mb-1 gold-shimmer bg-clip-text text-transparent font-black tracking-tighter uppercase italic">
              TUXEDO
            </h1>
            <p className="text-[#D4AF37] text-xs tracking-[0.4em] font-black uppercase opacity-80">System Credentials</p>
          </motion.div>
          
          <div className="space-y-6 mb-8">
            <AnimatePresence mode="wait">
              {step === 'phone' ? (
                <motion.div
                  key="phone-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4 ml-1">Dispatch Phone Registry</label>
                    <div className="flex items-center gap-4 glass-card bg-black/40 p-5 border-2 border-[#D4AF37]/30 rounded-2xl min-h-[64px] focus-within:border-[#D4AF37] transition-all">
                      <Phone size={24} className="text-[#D4AF37]" />
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="(555) 000-0000"
                        className="flex-1 bg-transparent outline-none text-white text-xl font-black italic placeholder:text-gray-800"
                        autoFocus
                      />
                    </div>
                    <p className="text-[10px] text-gray-600 mt-4 font-bold uppercase tracking-widest italic text-center">Protocol: Enter any 10-digits for entry</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {['5551234567', '5559876543', '5555555555'].map((num) => (
                      <motion.button
                        key={num}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPhone(num)}
                        className="glass-card bg-black/20 p-3 text-[10px] text-[#D4AF37] rounded-xl border-2 border-[#D4AF37]/10 hover:border-[#D4AF37]/50 transition-all min-h-[48px] font-black uppercase tracking-tighter italic"
                      >
                        {num.slice(0,3)}·{num.slice(3,6)}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-6 text-center italic">Verify Encrypted Access Key</label>
                  <div className="flex justify-center gap-2 mb-8">
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={value}
                        onChange={(e) => handleOtpInput(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-11 h-16 text-center text-3xl font-black bg-black/60 border-2 border-[#D4AF37]/30 rounded-xl text-white focus:outline-none focus:border-[#D4AF37] focus:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-300 italic"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>
                  <GoldButton 
                    variant="ghost"
                    onClick={() => setStep('phone')} 
                    className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] min-h-[44px] w-full text-center hover:text-white transition-all"
                  >
                    Modify Phone Registry
                  </GoldButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <AnimatePresence>
            {step === 'otp' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 p-6 bg-[#D4AF37]/5 rounded-2xl border-2 border-[#D4AF37]/20"
              >
                <div className="text-center">
                  <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-3">System Access Key</p>
                  <div className="text-4xl text-[#D4AF37] mb-6 font-black tracking-[0.4em] italic drop-shadow-lg">{correctOtp}</div>
                  <GoldButton onClick={handleAutofillOtp} variant="ghost" className="w-full py-2 text-[10px] font-black uppercase tracking-widest border-[#D4AF37]/20">
                    Bypass Authentication
                  </GoldButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="space-y-4">
            <GoldButton 
              onClick={step === 'phone' ? handlePhoneSubmit : () => navigate('/kyc')}
              disabled={step === 'phone' ? phone.length !== 10 : otp.some(d => d === '')}
              className="w-full py-6 text-xl font-black uppercase tracking-tighter italic"
              icon={step === 'phone' ? <ArrowRight className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            >
              {step === 'phone' ? 'Initiate Protocol' : 'Authenticate Entry'}
            </GoldButton>
            
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="w-full text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] min-h-[44px] hover:text-[#D4AF37] transition-all italic"
            >
              New driver? <span className="text-[#D4AF37]">Join the Fleet</span>
            </motion.button>
          </div>
        </GlassCard>
      </div>
      
      <motion.p 
        className="text-center text-[10px] text-gray-700 mt-10 font-black uppercase tracking-[0.3em] italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        Encrypted Device-Bound Dispatch Node
      </motion.p>
    </div>
  );
}