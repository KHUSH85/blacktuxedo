import React, { useState } from 'react';
import { Menu, DollarSign, User, MapPin, Clock, TrendingUp, Star, Car, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GoldButton } from '../ui/GlassCard';
import { useNotification } from '../../contexts/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

interface HomeScreenProps {
  isOnline: boolean;
  onToggleOnline: () => void;
}

export function HomeScreen({ isOnline, onToggleOnline }: HomeScreenProps) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { showSuccess, showInfo } = useNotification();
  
  const handleToggleOnline = () => {
    onToggleOnline();
    if (!isOnline) {
      showSuccess('You are now Online', 'Ready to accept ride requests');
    } else {
      showInfo('You are now Offline', 'You won\'t receive ride requests');
    }
  };
  
  const todayStats = {
    earnings: 245.50,
    trips: 12,
    hours: 6.5,
    rating: 4.9
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center safe-area overflow-x-hidden">
      {/* Branded Mobile Responsive Header */}
      <div className="w-full max-w-md px-6">
        <div className="flex justify-between items-center py-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">Tuxedo</h1>
            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-1">Premium Driver</p>
          </div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMenu(!showMenu)}
            className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden cursor-pointer gold-glow shadow-lg shadow-[#D4AF37]/20"
          >
            <User className="text-[#D4AF37] w-6 h-6" />
          </motion.div>
        </div>
      </div>

      {/* Menu Overlay */}
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            className="absolute inset-0 z-50 bg-black/95 backdrop-blur-md p-6 flex items-start justify-end" 
            onClick={() => setShowMenu(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="glass-strong border-2 border-[#D4AF37]/40 rounded-3xl p-8 w-full max-w-xs mt-16 mr-2 shadow-[0_0_50px_rgba(212,175,55,0.2)]" 
              onClick={(e) => e.stopPropagation()}
              initial={{ x: 50, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 50, opacity: 0, scale: 0.9 }}
            >
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-black text-[#D4AF37] uppercase tracking-tighter italic">Protocol</h3>
                <button onClick={() => setShowMenu(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { label: 'Edit Profile', path: '/edit-profile', icon: User },
                  { label: 'Earnings', path: '/earnings', icon: DollarSign },
                  { label: 'Manual Ride', path: '/manual-ride', icon: MapPin },
                ].map((item) => (
                  <motion.button 
                    key={item.path}
                    onClick={() => { navigate(item.path); setShowMenu(false); }} 
                    className="w-full text-left p-5 glass-card bg-black/40 border-[#D4AF37]/20 rounded-2xl hover:border-[#D4AF37]/60 transition-all group"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <item.icon size={22} className="text-[#D4AF37]" />
                        <span className="text-white font-bold uppercase tracking-widest text-xs">{item.label}</span>
                      </div>
                      <ChevronRight size={16} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="w-full max-w-md px-6 pt-4 pb-20">
        {/* Sub Header / Welcome */}
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">Fleet Status</h2>
          <p className="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-[10px]">John Driver • Platinum Tier</p>
        </motion.div>
        
        {/* Online/Offline Toggle */}
        <GlassCard 
          className={`mb-10 text-center w-full p-10 border-2 transition-all duration-500 ${isOnline ? 'gold-glow border-[#D4AF37]/60' : 'border-[#D4AF37]/10'}`}
          variant="strong"
        >
          <div className="mb-8">
            <motion.div 
              className={`w-28 h-28 mx-auto rounded-full border-4 flex items-center justify-center mb-6 shadow-2xl transition-all duration-500 ${
                isOnline ? 'bg-black border-[#D4AF37] status-online' : 'bg-black border-gray-800'
              }`}
              animate={isOnline ? { scale: [1, 1.05, 1] } : {}}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Car size={48} className={isOnline ? 'text-[#D4AF37]' : 'text-gray-700'} />
            </motion.div>
            <h2 className={`text-3xl font-black uppercase tracking-tighter italic mb-2 ${isOnline ? 'text-white' : 'text-gray-500'}`}>
              {isOnline ? "Dispatch Active" : "System Offline"}
            </h2>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
              {isOnline ? 'Ready for premium requests' : 'Establish connection to start earning'}
            </p>
          </div>
          
          <GoldButton
            onClick={handleToggleOnline}
            className={`w-full py-6 text-xl font-black uppercase tracking-tighter italic ${
              isOnline ? 'bg-black border-2 border-[#D4AF37]/40 text-[#D4AF37] shadow-none hover:bg-[#D4AF37]/10' : ''
            }`}
          >
            {isOnline ? 'Terminate Protocol' : 'Initiate Session'}
          </GoldButton>
        </GlassCard>
        
        {/* Today's Stats Matrix */}
        <div className="mb-10 w-full">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6 px-1 italic">Performance Matrix</h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileTap={{ scale: 0.97 }}>
              <GlassCard 
                onClick={() => navigate('/earnings')}
                className="cursor-pointer border-[#D4AF37]/10 hover:border-[#D4AF37]/40 p-6 flex flex-col items-center justify-center text-center transition-all"
              >
                <DollarSign size={20} className="text-[#D4AF37] mb-3 opacity-60" />
                <p className="text-2xl font-black text-white italic tracking-tighter mb-1">${todayStats.earnings.toFixed(2)}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Revenue</p>
              </GlassCard>
            </motion.div>
            
            <GlassCard className="border-[#D4AF37]/10 p-6 flex flex-col items-center justify-center text-center">
              <Clock size={20} className="text-[#D4AF37] mb-3 opacity-60" />
              <p className="text-2xl font-black text-white italic tracking-tighter mb-1">{todayStats.hours}h</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Duty Time</p>
            </GlassCard>
            
            <GlassCard className="border-[#D4AF37]/10 p-6 flex flex-col items-center justify-center text-center">
              <TrendingUp size={20} className="text-[#D4AF37] mb-3 opacity-60" />
              <p className="text-2xl font-black text-white italic tracking-tighter mb-1">{todayStats.trips}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Dispatches</p>
            </GlassCard>
            
            <GlassCard className="border-[#D4AF37]/10 p-6 flex flex-col items-center justify-center text-center">
              <Star size={20} className="text-[#D4AF37] mb-3 opacity-60" />
              <p className="text-2xl font-black text-white italic tracking-tighter mb-1">{todayStats.rating}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Protocol</p>
            </GlassCard>
          </div>
        </div>
        
        {/* Protocol Access */}
        <div className="pb-8 w-full">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-6 px-1 italic">Protocol Access</h3>
          <div className="space-y-4">
            {[
              { icon: DollarSign, label: "View Revenue Portfolio", path: "/earnings" },
              { icon: User, label: "Identity Profile settings", path: "/edit-profile" },
              { icon: MapPin, label: "Manual Guest Dispatch", path: "/manual-ride" }
            ].map((action) => (
              <GlassCard 
                key={action.path}
                onClick={() => navigate(action.path)}
                className="cursor-pointer border-[#D4AF37]/10 hover:border-[#D4AF37]/40 bg-black/20 p-5 group transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 glass-card bg-[#D4AF37]/5 border-[#D4AF37]/20 rounded-lg group-hover:border-[#D4AF37]/50 transition-colors">
                      <action.icon size={20} className="text-[#D4AF37]" />
                    </div>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{action.label}</span>
                  </div>
                  <ChevronRight size={18} className="text-[#D4AF37] opacity-40 group-hover:translate-x-1 transition-all" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}