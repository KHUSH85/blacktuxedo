import React, { useState } from 'react';
import { MapPin, User, Banknote, CreditCard, Navigation } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { TimerRing } from '../ui/TimerRing';
import { useNotification } from '../../contexts/NotificationContext';

interface RideRequestModalProps {
  isOpen: boolean;
  onAccept: (paymentType: 'card' | 'cash') => void;
  onReject: () => void;
  onCounter: () => void;
}

export function RideRequestModal({ isOpen, onAccept, onReject, onCounter }: RideRequestModalProps) {
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const { showSuccess, showInfo, showWarning } = useNotification();
  
  if (!isOpen) return null;

  const handleAccept = () => {
    setShowPaymentOptions(true);
  };

  const handlePaymentChoice = (type: 'card' | 'cash') => {
    showSuccess('Ride Accepted', `Navigating to passenger pickup location`);
    onAccept(type);
  };

  const handleReject = () => {
    showInfo('Ride Declined', 'Looking for your next ride');
    onReject();
  };

  const handleCounter = () => {
    showWarning('Counter Offer Sent', 'Waiting for passenger response');
    onCounter();
  };
  
  const rideDetails = {
    passenger: 'Sarah Johnson',
    rating: 4.8,
    pickup: '123 Main Street, Downtown',
    dropoff: '456 Oak Avenue, Uptown',
    distance: '8.5 mi',
    duration: '18 min',
    fare: 24.50,
    paymentMethod: Math.random() > 0.5 ? 'cash' : 'card' as 'card' | 'cash'
  };
  
  return (
    <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-[1000] flex items-center justify-center animate-fade-in p-6 w-full h-full">
      <GlassCard 
        variant="strong" 
        className="w-full max-w-sm border-2 border-[#D4AF37] gold-glow-strong animate-scale-in shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <TimerRing duration={10} onComplete={onReject} />
          </div>
          <h2 className="text-2xl text-[#D4AF37] mb-2 tracking-tight">Incoming Ride Request</h2>
          <p className="text-gray-400 text-sm">Accept within 10 seconds</p>
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
              <p className="text-2xl text-[#D4AF37]">${rideDetails.fare}</p>
              <div className={`flex items-center gap-1 text-xs mt-1 ${
                rideDetails.paymentMethod === 'cash' ? 'text-green-400' : 'text-blue-400'
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
                <p className="text-sm text-gray-400">Pickup</p>
                <p className="text-sm">{rideDetails.pickup}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
              <div className="flex-1">
                <p className="text-sm text-gray-400">Dropoff</p>
                <p className="text-sm">{rideDetails.dropoff}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 pt-2 border-t border-[#D4AF37]/20">
              <div className="flex items-center gap-2">
                <Navigation size={16} className="text-[#D4AF37]" />
                <span className="text-sm">{rideDetails.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">{rideDetails.duration}</span>
              </div>
            </div>
          </div>
        </div>
        
        {!showPaymentOptions ? (
          <div className="space-y-3">
            <Button onClick={handleAccept} className="w-full">
              Accept Ride
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                size="medium"
                onClick={handleCounter}
              >
                Counter Offer
              </Button>
              <Button 
                variant="danger" 
                size="medium"
                onClick={handleReject}
              >
                Decline
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-center text-gray-400 mb-3">Select payment method:</p>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="glass"
                size="medium"
                onClick={() => handlePaymentChoice('card')}
                icon={<CreditCard size={20} />}
              >
                Card
              </Button>
              <Button 
                variant="glass" 
                size="medium"
                onClick={() => handlePaymentChoice('cash')}
                icon={<Banknote size={20} />}
              >
                Cash
              </Button>
            </div>
            <Button 
              variant="secondary" 
              size="medium"
              onClick={() => setShowPaymentOptions(false)}
              className="w-full"
            >
              Back
            </Button>
          </div>
        )}
      </GlassCard>
    </div>
  );
}