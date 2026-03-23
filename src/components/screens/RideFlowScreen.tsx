import React, { useState } from 'react';
// Add Star to the list below
import { Navigation, User, Phone, MessageCircle, MapPin, Clock, Star } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { GlassCard, GoldButton } from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';  

interface RideFlowScreenProps {
  paymentType?: 'card' | 'cash';
}

type RideStatus = 'navigate' | 'arrive' | 'start' | 'complete';

export function RideFlowScreen({ paymentType = 'card' }: RideFlowScreenProps) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<RideStatus>('navigate');
  
  const rideDetails = {
    passenger: 'Sarah Johnson',
    rating: 4.8,
    phone: '+1 (555) 123-4567',
    pickup: '123 Main Street, Downtown',
    dropoff: '456 Oak Avenue, Uptown',
    distance: '8.5 mi',
    duration: '18 min',
    fare: 24.50
  };
  
  const statusConfig = {
    navigate: {
      title: 'Navigate to Pickup',
      subtitle: 'ETA: 5 minutes',
      action: 'I Have Arrived',
      nextStatus: 'arrive' as RideStatus,
      icon: <Navigation size={48} className="text-[#D4AF37]" />,
      color: 'blue'
    },
    arrive: {
      title: 'Arrived at Pickup',
      subtitle: 'Waiting for passenger',
      action: 'Start Trip',
      nextStatus: 'start' as RideStatus,
      icon: <MapPin size={48} className="text-green-500" />,
      color: 'green'
    },
    start: {
      title: 'Trip in Progress',
      subtitle: 'Navigate to destination',
      action: 'End Trip',
      nextStatus: 'complete' as RideStatus,
      icon: <Clock size={48} className="text-[#D4AF37]" />,
      color: 'gold'
    },
    complete: {
      title: 'Trip Completed',
      subtitle: 'Arrived at destination',
      action: 'Complete & Collect Payment',
      nextStatus: 'complete' as RideStatus,
      icon: <MapPin size={48} className="text-green-500" />,
      color: 'green'
    }
  };
  
  const config = statusConfig[status];
  
  const handleAction = () => {
    if (status === 'complete') {
      if (paymentType === 'cash') {
        navigate('/cash');
      } else {
        navigate('/rating');
      }
    } else {
      setStatus(config.nextStatus);
    }
  };
  
  const getProgress = () => {
    switch(status) {
      case 'navigate': return 25;
      case 'arrive': return 50;
      case 'start': return 75;
      case 'complete': return 100;
    }
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col safe-area overflow-hidden">
      {/* Branded Header Identity */}
      <div className="z-30 px-4">
        <div className="flex justify-between items-center py-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">Tuxedo</h1>
            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-1">Premium Driver</p>
          </div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden gold-glow"
          >
            <User className="text-[#D4AF37] w-6 h-6" />
          </motion.div>
        </div>
      </div>

      {/* Map Area with Navigation Preview */}
      <div className="flex-1 relative bg-gradient-to-b from-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-40">
          <div className="text-center animate-pulse-gold">
            {config.icon}
            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mt-4">Navigation Active</p>
          </div>
        </div>
        
        {/* Top Status Card with Lifecycle Stage */}
        <div className="absolute top-2 left-6 right-6 z-20">
          <GlassCard variant="strong" className="border-[#D4AF37]/40 gold-glow p-5">
            <AnimatePresence mode="wait">
              <motion.div 
                key={status}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-center mb-4"
              >
                <div className={`w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-500 ${
                  status === 'navigate' ? 'bg-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]' :
                  status === 'arrive' ? 'bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.3)]' :
                  status === 'start' ? 'bg-[#D4AF37]/20 shadow-[0_0_15px_rgba(212,175,55,0.3)]' :
                  'bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                }`}>
                  {React.cloneElement(config.icon as React.ReactElement, { size: 32 })}
                </div>
                <h2 className="text-lg font-black text-white uppercase italic tracking-tight">{config.title}</h2>
                <p className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em]">{config.subtitle}</p>
              </motion.div>
            </AnimatePresence>
            
            {/* Luxury Progress Bar */}
            <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden border border-white/5">
              <motion.div 
                className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F4E5A1] to-[#D4AF37] gold-shimmer"
                initial={{ width: 0 }}
                animate={{ width: `${getProgress()}%` }}
                transition={{ duration: 0.8, ease: "circOut" }}
              />
            </div>
            <div className="flex justify-between mt-3 text-[9px] font-black uppercase tracking-widest text-gray-500">
              <span className={status === 'navigate' ? 'text-[#D4AF37]' : ''}>Nav</span>
              <span className={status === 'arrive' ? 'text-[#D4AF37]' : ''}>Arrived</span>
              <span className={status === 'start' ? 'text-[#D4AF37]' : ''}>Active</span>
              <span className={status === 'complete' ? 'text-[#D4AF37]' : ''}>End</span>
            </div>
          </GlassCard>
        </div>
        
        {/* Distance/Duration overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <AnimatePresence>
            {(status === 'navigate' || status === 'start') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <GlassCard variant="subtle" className="flex items-center justify-between py-3 px-5 border-[#D4AF37]/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#D4AF37]/10">
                      {status === 'navigate' ? <Navigation size={18} className="text-[#D4AF37]" /> : <Clock size={18} className="text-[#D4AF37]" />}
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      {status === 'navigate' ? '5 min away' : `${rideDetails.duration} remaining`}
                    </span>
                  </div>
                  <span className="text-xs font-black text-[#D4AF37] uppercase italic">{status === 'navigate' ? '1.2 mi' : rideDetails.distance}</span>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Bottom Sheet - Ride Details */}
      <div className="glass-strong rounded-t-[2.5rem] p-8 border-t-2 border-[#D4AF37]/50 safe-bottom shadow-[0_-20px_40px_rgba(0,0,0,0.8)] z-30">
        <div className="max-w-md mx-auto">
          {/* Passenger Info */}
          <div className="flex items-center gap-5 mb-8">
            <div className="w-16 h-16 rounded-full border-2 border-[#D4AF37] p-1 gold-glow shadow-lg">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                <User size={32} className="text-[#D4AF37]" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-black text-white italic truncate tracking-tight">{rideDetails.passenger}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Star size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{rideDetails.rating} Protocol Rating</span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <motion.button whileTap={{ scale: 0.9 }} className="p-4 glass-card bg-black/40 rounded-2xl text-[#D4AF37] border-[#D4AF37]/30 flex items-center justify-center hover-lift">
                <Phone size={22} />
              </motion.button>
              <motion.button whileTap={{ scale: 0.9 }} className="p-4 glass-card bg-black/40 rounded-2xl text-[#D4AF37] border-[#D4AF37]/30 flex items-center justify-center hover-lift">
                <MessageCircle size={22} />
              </motion.button>
            </div>
          </div>
          
          {/* Locations */}
          <GlassCard variant="subtle" className="mb-8 border-[#D4AF37]/10 bg-black/40">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0 status-online" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Pickup Origin</p>
                  <p className="text-sm font-bold text-white">{rideDetails.pickup}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Destination Target</p>
                  <p className="text-sm font-bold text-white italic">{rideDetails.dropoff}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-5 border-t border-[#D4AF37]/20">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{rideDetails.distance} • {rideDetails.duration}</span>
                <span className="text-2xl font-black text-[#D4AF37] italic tracking-tighter">${rideDetails.fare.toFixed(2)}</span>
              </div>
            </div>
          </GlassCard>
          
          {/* Actions */}
          <div className="space-y-4">
            <GoldButton onClick={handleAction} className="py-6 text-xl font-black italic tracking-tighter">
              {config.action}
            </GoldButton>
            
            {status !== 'complete' && (
              <GoldButton 
                variant="ghost" 
                onClick={() => navigate('/home')}
                className="text-xs font-bold uppercase tracking-widest border-[#D4AF37]/10"
              >
                Cancel Protocol
              </GoldButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}