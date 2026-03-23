import React, { useState } from 'react';
import { MapPin, DollarSign, Clock, Navigation, Search, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GoldButton } from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

interface DestinationEntryScreenProps {
  onSetFare: (fare: number) => void; // Used to update the global manualRideFare state
}

export function DestinationEntryScreen({ onSetFare }: DestinationEntryScreenProps) {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [cashReceived, setCashReceived] = useState('');
  
  // Mock pricing calculation
  const quote = {
    distance: '8.5 mi',
    duration: '18 min',
    baseFare: 5.00,
    perMile: 2.50,
    total: 26.25
  };
  
  const handleGetQuote = () => {
    if (destination.trim()) {
      setShowQuote(true);
    }
  };
  
  const handleStartRide = () => {
    if (parseFloat(cashReceived) >= quote.total) {
      // Replaced onStartManualRide prop with global state update and navigation
      onSetFare(quote.total);
      navigate('/ride');
    }
  };
  
  return (
    <div className="min-h-screen bg-black safe-area flex flex-col items-center relative overflow-x-hidden">
      {/* Branded Responsive Header */}
      <motion.div 
        className="sticky top-0 z-50 w-full max-w-md glass-strong border-b border-[#D4AF37]/20 backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/home')}
              className="text-[#D4AF37] hover:text-[#F7E29F] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">Tuxedo</h1>
              <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-1">Premium Driver</p>
            </div>
          </div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/edit-profile')}
            className="w-11 h-11 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden gold-glow"
          >
            <User className="text-[#D4AF37] w-5 h-5" />
          </motion.div>
        </div>
      </motion.div>

      <div className="w-full max-w-md px-6 py-8">
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tight mb-1">Manual Entry</h2>
          <p className="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-[10px]">Guest Dispatch Protocol</p>
        </motion.div>
        
        {!showQuote ? (
          <motion.div 
            className="animate-fade-in space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Current Location */}
            <GlassCard variant="subtle" className="border-[#D4AF37]/10 bg-black/40">
              <div className="flex items-start gap-4">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-2 flex-shrink-0 status-online shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Pickup origin</p>
                  <p className="text-white font-bold text-sm">123 Main Street, Downtown</p>
                </div>
              </div>
            </GlassCard>
            
            {/* Destination Input */}
            <GlassCard variant="strong" className="border-[#D4AF37]/40 shadow-2xl">
              <label className="block text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4 ml-1">
                Target Destination
              </label>
              <div className="flex items-center gap-4 glass-card bg-black/40 p-5 border-2 border-[#D4AF37]/30 rounded-2xl min-h-[64px] focus-within:border-[#D4AF37] transition-all mb-8">
                <MapPin size={24} className="text-[#D4AF37]" />
                <input 
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter dropoff location"
                  className="flex-1 bg-transparent outline-none text-white text-lg font-black italic placeholder:text-gray-800"
                  autoFocus
                />
              </div>
              
              {/* Suggested Destinations */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2 px-1">Recent Registry</p>
                {['456 Oak Avenue, Uptown', 'City Airport Terminal 2', '789 Park Plaza'].map((addr, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDestination(addr)}
                    className="w-full text-left p-4 glass-card bg-black/20 rounded-xl border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-[#D4AF37] opacity-40" />
                      <span className="text-gray-300 font-bold text-xs uppercase tracking-widest">{addr}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </GlassCard>
            
            <div className="space-y-4 pt-4">
              <GoldButton 
                onClick={handleGetQuote}
                disabled={!destination.trim()}
                className="w-full py-6 text-xl font-black uppercase tracking-tighter italic"
                icon={<Search size={24} />}
              >
                Secure Quote
              </GoldButton>
              <GoldButton 
                variant="ghost" 
                onClick={() => navigate('/home')}
                className="w-full text-[10px] font-black uppercase tracking-widest border-[#D4AF37]/10"
              >
                Discard Entry
              </GoldButton>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="animate-fade-in space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Route Summary */}
            <GlassCard variant="subtle" className="border-[#D4AF37]/10 bg-black/40">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Pickup Origin</p>
                    <p className="text-sm font-bold text-white uppercase tracking-tight">123 Main Street, Downtown</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-0.5">Dropoff Target</p>
                    <p className="text-sm font-black text-white italic uppercase tracking-tight">{destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-8 pt-5 border-t border-[#D4AF37]/10">
                  <div className="flex items-center gap-2">
                    <Navigation size={18} className="text-[#D4AF37]" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{quote.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-[#D4AF37]" />
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{quote.duration}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            {/* Pricing Breakdown */}
            <GlassCard variant="strong" className="border-[#D4AF37]/50 gold-glow">
              <h3 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mb-6 italic text-center">Dispatch Rate Quote</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 px-2 border-b border-white/5">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Base Protocol Fee</span>
                  <span className="text-xs font-black text-white italic">${quote.baseFare.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-2 px-2 border-b border-white/5">
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Mileage ({quote.distance})</span>
                  <span className="text-xs font-black text-white italic">${(parseFloat(quote.distance) * quote.perMile).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-8 border-t border-[#D4AF37]/30 bg-gradient-to-r from-[#D4AF37]/10 to-transparent -mx-6 px-8 rounded-b-2xl">
                  <span className="text-lg font-black text-[#D4AF37] uppercase tracking-tighter italic">Total Collection</span>
                  <span className="text-4xl font-black text-[#D4AF37] italic tracking-tighter">${quote.total.toFixed(2)}</span>
                </div>
              </div>
            </GlassCard>
            
            {/* Cash Collection */}
            <GlassCard variant="strong" className="border-[#D4AF37]/30 bg-black/60 shadow-2xl">
              <h3 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-6 px-1">Physical Currency Verification</h3>
              <div className="flex items-center gap-4 glass-card bg-black/40 p-6 border-2 border-[#D4AF37]/40 rounded-2xl min-h-[80px] mb-8">
                <DollarSign size={32} className="text-[#D4AF37]" />
                <input 
                  type="number"
                  inputMode="decimal"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-transparent outline-none text-white text-4xl font-black italic tracking-tighter placeholder:text-gray-900"
                />
              </div>
              
              <AnimatePresence>
                {parseFloat(cashReceived) > quote.total && (
                  <motion.div 
                    className="mt-4 p-4 bg-green-500/10 border-2 border-green-500/30 rounded-2xl text-center"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <p className="text-[10px] font-black text-green-400 uppercase tracking-widest">
                      Return Change: <span className="text-2xl ml-2 italic font-black">${(parseFloat(cashReceived) - quote.total).toFixed(2)}</span>
                    </p>
                  </motion.div>
                )}
                
                {parseFloat(cashReceived) > 0 && parseFloat(cashReceived) < quote.total && (
                  <motion.div 
                    className="mt-4 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-2xl text-center"
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                      Insufficient: Needs ${(quote.total - parseFloat(cashReceived)).toFixed(2)} more
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
            
            <div className="space-y-4">
              <GoldButton 
                onClick={handleStartRide}
                disabled={!cashReceived || parseFloat(cashReceived) < quote.total}
                className="w-full py-6 text-xl font-black uppercase tracking-tighter italic"
              >
                Establish Protocol
              </GoldButton>
              <GoldButton 
                variant="ghost" 
                onClick={() => setShowQuote(false)}
                className="w-full text-[10px] font-black uppercase tracking-widest border-[#D4AF37]/10"
              >
                Modify Target
              </GoldButton>
            </div>
          </motion.div>  
        )}
      </div>
    </div>
  );
}