import React from 'react';
import { 
  LogIn, 
  Shield, 
  User, 
  Home, 
  Navigation, 
  DollarSign, 
  Star, 
  TrendingUp,
  CheckCircle,
  MapPin,
  Clock,
  Zap,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GoldButton } from '../ui/GlassCard';
import { motion } from 'framer-motion';

export function FeatureOverviewScreen() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <LogIn size={32} className="text-[#D4AF37]" />,
      title: 'Login & Onboarding',
      description: 'Secure phone-based authentication'
    },
    {
      icon: <Shield size={32} className="text-[#D4AF37]" />,
      title: 'KYC Verification',
      description: 'Upload license, insurance, registration'
    },
    {
      icon: <User size={32} className="text-[#D4AF37]" />,
      title: 'Driver Profile Setup',
      description: 'Vehicle type & amenities (WiFi, car seat, etc.)'
    },
    {
      icon: <Home size={32} className="text-[#D4AF37]" />,
      title: 'Home Dashboard',
      description: 'Online/offline toggle with gold glow'
    },
    {
      icon: <CheckCircle size={32} className="text-green-500" />,
      title: 'Ride Request Popup',
      description: 'Accept / Reject / Counter-offer (Card/Cash)'
    },
    {
      icon: <Shield size={32} className="text-blue-400" />,
      title: 'Code Verification',
      description: 'Mandatory 4-digit code before pickup'
    },
    {
      icon: <DollarSign size={32} className="text-green-400" />,
      title: 'Pre-Trip Cash Collection',
      description: 'Collect cash upfront for cash rides'
    },
    {
      icon: <Navigation size={32} className="text-[#D4AF37]" />,
      title: 'Ride Lifecycle',
      description: 'Navigate → Arrive → Start → End Trip'
    },
    {
      icon: <MapPin size={32} className="text-[#D4AF37]" />,
      title: 'Manual Ride Entry',
      description: 'For passengers without phone/app'
    },
    {
      icon: <DollarSign size={32} className="text-[#D4AF37]" />,
      title: 'Post-Trip Cash Verification',
      description: '2-step payment verification (Card rides)'
    },
    {
      icon: <Star size={32} className="text-[#D4AF37]" />,
      title: 'Passenger Rating',
      description: '5-star rating with preset note templates'
    },
    {
      icon: <TrendingUp size={32} className="text-[#D4AF37]" />,
      title: 'Earnings Dashboard',
      description: 'Daily, weekly, monthly, yearly analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center safe-area overflow-x-hidden">
      {/* Branded Mobile Responsive Header */}
      <div className="w-full max-w-2xl px-6">
        <div className="flex justify-between items-center py-6 animate-fade-in">
          <div className="flex items-center gap-4">
             <button 
                onClick={() => navigate(-1)}
                className="p-3 glass-card rounded-xl text-[#D4AF37] min-w-[48px] min-h-[48px] flex items-center justify-center border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all"
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
            className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden cursor-pointer gold-glow shadow-lg shadow-[#D4AF37]/20"
          >
            <User className="text-[#D4AF37] w-6 h-6" />
          </motion.div>
        </div>
      </div>

      <div className="w-full max-w-2xl px-6 pt-4 pb-8">
        {/* Header Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-5xl mb-4 gold-shimmer bg-clip-text text-transparent font-black tracking-tighter uppercase italic">
            TUXEDO DRIVER
          </h1>
          <p className="text-xl text-gray-400 font-bold uppercase tracking-widest mb-2">Premium Chauffeur Platform</p>
          <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[0.3em]">Black-White-Gold Glassmorphism Design</p>
        </motion.div>

        {/* Design System Preview */}
        <GlassCard variant="strong" className="mb-10 border-[#D4AF37]/50 gold-glow">
          <h3 className="text-sm font-black text-[#D4AF37] mb-6 uppercase tracking-[0.2em] italic">Architecture & Design System</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-3 glass-card bg-black/40 border-[#D4AF37]/10">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Dark Core</span>
              <div className="w-8 h-8 rounded-lg bg-black border-2 border-[#D4AF37]/30 shadow-inner" />
            </div>
            <div className="flex items-center justify-between p-3 glass-card bg-black/40 border-[#D4AF37]/10">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Luxury Gold</span>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F4E5A1] shadow-lg shadow-[#D4AF37]/20" />
            </div>
            <div className="flex items-center justify-between p-3 glass-card bg-black/40 border-[#D4AF37]/10">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Glass Layers</span>
              <div className="w-8 h-8 rounded-lg backdrop-blur-xl bg-white/10 border border-white/20" />
            </div>
            <div className="flex items-center justify-between p-3 glass-card bg-black/40 border-[#D4AF37]/10">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Glow</span>
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] status-online" />
            </div>
          </div>
        </GlassCard>

        {/* Features Grid */}
        <div className="mb-10">
          <h3 className="text-sm font-black text-[#D4AF37] mb-8 uppercase tracking-[0.2em] italic px-2">Complete Protocol Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className="h-full border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all duration-500 group">
                  <div className="flex items-start gap-4 p-1">
                    <div className="p-3 glass-card bg-black/40 rounded-2xl border-[#D4AF37]/20 group-hover:border-[#D4AF37]/50 transition-colors flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base mb-1 font-bold text-white uppercase tracking-tight">{feature.title}</h4>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        <GlassCard variant="subtle" className="mb-10 border-[#D4AF37]/20">
          <h3 className="text-sm font-black text-[#D4AF37] mb-6 uppercase tracking-[0.2em] italic">iOS Performance Optimization</h3>
          <div className="grid grid-cols-1 gap-4 px-2">
            {[
              "Safe Area Support (Notch & Home Indicator)",
              "44pt Minimum Touch Targets (iOS HIG)",
              "Momentum Scrolling & No Zoom on Input",
              "Glassmorphism with Backdrop Blur",
              "Smooth Animations & Transitions"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <CheckCircle size={14} className="text-green-500" />
                </div>
                <p className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors tracking-wide uppercase">{text}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* CTA */}
        <GoldButton
          onClick={() => navigate('/')}
          className="w-full py-6 text-xl font-black uppercase tracking-tighter italic"
        >
          Start Premium Demo
        </GoldButton>
        
        <motion.div 
          className="flex items-center justify-center gap-2 mt-8 opacity-60"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Zap size={14} className="text-[#D4AF37]" />
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">
            Access Demo Engine (Top-Right)
          </p>
        </motion.div>
      </div>
    </div>
  );
}