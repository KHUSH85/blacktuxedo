import React, { useState } from 'react';
import { Wifi, Baby, Droplets, Music, Newspaper, ChevronRight, Smartphone, CloudRain, Briefcase, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GoldButton } from '../ui/GlassCard';
import { motion } from 'framer-motion';

interface Amenity {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export function ProfileSetupScreen() {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState('limousine');
  const [amenities, setAmenities] = useState<Amenity[]>([
    { id: 'wifi', name: 'WiFi', icon: <Wifi size={28} />, enabled: false },
    { id: 'charger', name: 'Phone Charger', icon: <Smartphone size={28} />, enabled: false },
    { id: 'water', name: 'Bottled Water', icon: <Droplets size={28} />, enabled: false },
    { id: 'music', name: 'Premium Audio', icon: <Music size={28} />, enabled: false },
    { id: 'newspaper', name: 'Newspaper', icon: <Newspaper size={28} />, enabled: false },
    { id: 'umbrella', name: 'Umbrella', icon: <CloudRain size={28} />, enabled: false },
    { id: 'carseat', name: 'Child Seat', icon: <Baby size={28} />, enabled: false },
    { id: 'luggage', name: 'Extra Luggage', icon: <Briefcase size={28} />, enabled: false }
  ]);
  
  const toggleAmenity = (id: string) => {
    setAmenities(items => 
      items.map(item => 
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };
  
  return (
    <div className="min-h-full bg-black p-6 safe-area flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-md pt-4 pb-8 animate-fade-in">
        
        {/* Branded Luxury Header Identity */}
        <div className="flex justify-between items-center py-6 mb-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none text-left">Tuxedo</h1>
            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-1 text-left">Premium Driver</p>
          </motion.div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden gold-glow shadow-lg shadow-[#D4AF37]/20"
          >
            <User className="text-[#D4AF37] w-6 h-6" />
          </motion.div>
        </div>

        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tight mb-2">Fleet Profile</h2>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Configure Vehicle Standards & Amenities</p>
        </div>
        
        <GlassCard variant="strong" className="mb-10 border-[#D4AF37]/40">
          <h3 className="text-xs font-black text-[#D4AF37] mb-6 uppercase tracking-[0.2em] italic px-1">Executive Vehicle Class</h3>
          <div className="space-y-4">
            {[
              { type: 'Limousine', desc: 'Extended luxury sedan' },
              { type: 'Executive Sedan', desc: 'Mercedes S-Class, BMW 7 Series' },
              { type: 'Luxury SUV', desc: 'Range Rover, Cadillac Escalade' },
              { type: 'Luxury Van', desc: 'Mercedes Sprinter, luxury shuttle' },
              { type: 'Exotic Car', desc: 'Sports cars, supercars' }
            ].map((vehicle) => (
              <motion.button
                key={vehicle.type}
                whileTap={{ scale: 0.98 }}
                onClick={() => setVehicleType(vehicle.type.toLowerCase())}
                className={`w-full p-5 rounded-2xl border-2 transition-all min-h-[80px] flex items-center justify-between ${
                  vehicleType === vehicle.type.toLowerCase()
                    ? 'border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-transparent gold-glow'
                    : 'border-[#D4AF37]/10 glass-card bg-black/20 hover:border-[#D4AF37]/30'
                }`}
              >
                <div className="text-left">
                  <div className={`text-sm font-black uppercase tracking-widest mb-1 ${vehicleType === vehicle.type.toLowerCase() ? 'text-[#D4AF37]' : 'text-white'}`}>
                    {vehicle.type}
                  </div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter italic">{vehicle.desc}</div>
                </div>
                <ChevronRight size={20} className={vehicleType === vehicle.type.toLowerCase() ? 'text-[#D4AF37]' : 'text-gray-700'} />
              </motion.button>
            ))}
          </div>
        </GlassCard>
        
        <GlassCard variant="subtle" className="mb-10 border-[#D4AF37]/10 bg-black/40">
          <h3 className="text-xs font-black text-[#D4AF37] mb-6 uppercase tracking-[0.2em] italic px-1">Concierge Amenities</h3>
          <div className="grid grid-cols-2 gap-4">
            {amenities.map((amenity) => (
              <motion.button
                key={amenity.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleAmenity(amenity.id)}
                className={`p-6 rounded-2xl border-2 transition-all min-h-[120px] flex flex-col items-center justify-center gap-4 ${
                  amenity.enabled
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 gold-glow'
                    : 'border-white/5 glass-card bg-black/20 hover:border-[#D4AF37]/30'
                }`}
              >
                <div className={`relative ${amenity.enabled ? 'text-[#D4AF37] drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'text-gray-600'}`}>
                  {amenity.icon}
                  {amenity.enabled && (
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#D4AF37] rounded-full border-2 border-black gold-shimmer shadow-lg"></div>
                  )}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest text-center leading-tight ${amenity.enabled ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                  {amenity.name}
                </span>
              </motion.button>
            ))}
          </div>
        </GlassCard>
        
        <div className="pb-8">
          {/* Programmatic Navigation */}
          <GoldButton 
            onClick={() => navigate('/home')} 
            className="w-full py-6 text-xl font-black uppercase tracking-tighter italic"
          >
            Establish Protocol
          </GoldButton>
        </div>
      </div>
    </div>
  );
}