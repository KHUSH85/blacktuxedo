import React, { useState, useEffect } from 'react';
import { MapPin, User, Banknote, CreditCard, Navigation, Clock } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { TimerRing } from '../ui/TimerRing';
import { useNotification } from '../../contexts/NotificationContext';

interface RideRequestModalProps {
  isOpen: boolean;
  onAccept: (paymentMethod: 'card' | 'cash' | 'other' | null) => void;
  onReject: () => void;
}

export function RideRequestModal({ isOpen, onAccept, onReject }: RideRequestModalProps) {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [eta, setEta] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('');
  const [dropoffTime, setDropoffTime] = useState<string>('');
  const { showSuccess, showInfo, showWarning } = useNotification();

  useEffect(() => {
    // Calculate realistic ETA for pickup and dropoff based on the current time
    const durationMins = 18; 
    const pickupMins = 5;
    const pTime = new Date(Date.now() + pickupMins * 60000);
    const dTime = new Date(pTime.getTime() + durationMins * 60000);
    
    const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    setEta(dTime.toLocaleTimeString([], timeOptions));
    setPickupTime(pTime.toLocaleTimeString([], timeOptions));
    setDropoffTime(dTime.toLocaleTimeString([], timeOptions));
  }, []);

  if (!isOpen) return null;

  const handleAccept = () => {
    setHasAccepted(true);
    showSuccess('Ride Accepted', `Navigating to passenger pickup location`);
    onAccept(rideDetails.paymentMethod);
  };

  const handleReject = () => {
    showInfo('Ride Declined', 'Looking for your next ride');
    onReject();
  };

  const rideDetails = {
    fare: '$45.00',
    passenger: 'Sarah Johnson',
    rating: 4.8,
    pickup: '123 Main Street, Downtown',
    dropoff: '456 Oak Avenue, Uptown',
    distance: '8.5 mi',
    duration: '18 min',
    // Simulate finalized backend paymentMethod:
    // - cash: cash collection required
    // - card/other: online payments
    // - null: passenger forgot to select payment method
    paymentMethod: ((): 'cash' | 'card' | 'other' | null => {
      const r = Math.random();
      if (r < 0.33) return 'cash';
      if (r < 0.66) return 'card';
      if (r < 0.9) return 'other';
      return null;
    })()
  };

  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-[1000] flex items-center justify-center animate-fade-in p-6 w-full h-full">
      <GlassCard
        variant="strong"
        className="w-full max-w-sm border-2 border-[#D4AF37] gold-glow-strong animate-scale-in shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <TimerRing duration={30} onComplete={onReject} active={!hasAccepted} />
          </div>
          <h2 className="text-2xl text-[#D4AF37] mb-2 tracking-tight">Incoming Ride Request</h2>
          <p className="text-gray-400 text-sm">Accept within 30 seconds</p>
        </div>

        {/* Dummy Map Preview & ETA */}
        <div className="relative w-full h-32 rounded-xl overflow-hidden mb-6 border-2 border-[#D4AF37]/20 shadow-inner group">
          <img src="/dummy-map.png" alt="Map Preview" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#D4AF37]/50 shadow-lg">
              <Clock size={14} className="text-[#D4AF37]" />
              <span className="text-xs font-bold text-[#D4AF37] tracking-wider">ETA: {eta}</span>
            </div>
            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
              <Navigation size={14} className="text-gray-300" />
              <span className="text-xs font-bold text-gray-300">{rideDetails.distance}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
              <User size={24} className="text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <p className="text-lg">{rideDetails.passenger}</p>
              <div className="flex items-center gap-1">
                <span className="text-[#D4AF37]">★</span>
                <span className="text-sm text-gray-400">{rideDetails.rating}</span>
              </div>
            </div>
            <div className="text-right">
              <div className={`flex items-center gap-1 text-xs mt-1 ${rideDetails.paymentMethod === 'cash' ? 'text-green-400' : 'text-blue-400'
                }`}>
                {rideDetails.paymentMethod === 'cash' ? (
                  <><Banknote size={14} /> Cash</>
                ) : (
                  <><CreditCard size={14} /> Card</>
                )}
              </div>
            </div>
          </div>

          <div className="glass-card p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-400">Pickup</p>
                  <p className="text-xs font-bold text-[#D4AF37]">{pickupTime}</p>
                </div>
                <p className="text-sm">{rideDetails.pickup}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-sm text-gray-400">Dropoff</p>
                  <p className="text-xs font-bold text-[#D4AF37]">{dropoffTime}</p>
                </div>
                <p className="text-sm">{rideDetails.dropoff}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2 border-t border-[#D4AF37]/20">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#D4AF37]" />
                <span className="text-sm font-bold text-white">{rideDetails.duration}</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest ml-1">Ride Time</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mt-6">
          {/* The Fare Place */}
          <div className="text-center py-4 rounded-2xl border-2 border-[#D4AF37]/20 bg-gradient-to-b from-[#D4AF37]/10 to-transparent">
            <p className="text-sm text-gray-400 mb-1">Estimated Fare</p>
            <p className="text-4xl font-bold text-[#D4AF37]">{rideDetails.fare}</p>
          </div>

          {/* Accept and Decline Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="danger"
              onClick={handleReject}
              className="w-full py-4 text-lg font-bold"
            >
              Decline
            </Button>
            <Button 
              onClick={handleAccept} 
              disabled={hasAccepted} 
              className="w-full py-4 text-lg font-bold shadow-lg shadow-[#D4AF37]/20"
            >
              Accept
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}