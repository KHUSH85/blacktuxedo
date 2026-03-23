import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { NotificationProvider } from './contexts/NotificationContext';

// Screen Imports
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { KYCUploadScreen } from './components/screens/KYCUploadScreen';
import { ProfileSetupScreen } from './components/screens/ProfileSetupScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { RideRequestModal } from './components/modals/RideRequestModal';
import { CodeVerificationScreen } from './components/screens/CodeVerificationScreen';
import { PreTripCashScreen } from './components/screens/PreTripCashScreen';
import { RideFlowScreen } from './components/screens/RideFlowScreen';
import { CashVerificationScreen } from './components/screens/CashVerificationScreen';
import { RatingScreen } from './components/screens/RatingScreen';
import { EarningsScreen } from './components/screens/EarningsScreen';
import { DestinationEntryScreen } from './components/screens/DestinationEntryScreen';
import { EditProfileScreen } from './components/screens/EditProfileScreen';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Persistence State
  const [isOnline, setIsOnline] = useState(false);
  const [showRideRequest, setShowRideRequest] = useState(false);
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [paymentType, setPaymentType] = useState<'card' | 'cash'>('card');
  const [manualRideFare, setManualRideFare] = useState(0);

  // Background Simulation: Ride request logic
  useEffect(() => {
    if (isOnline && location.pathname === '/home') {
      const timer = setTimeout(() => {
        setShowRideRequest(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, location.pathname]);

  const handleAcceptRide = (payment: 'card' | 'cash') => {
    setShowRideRequest(false);
    setPaymentType(payment);
    navigate('/code-verify');
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center font-sans p-4 sm:p-0">
      <div className="w-full max-w-md bg-black min-h-[800px] h-[95vh] sm:h-screen relative shadow-2xl overflow-hidden rounded-3xl sm:rounded-none flex flex-col">
        
        {/* Demo Helper Menu */}
        {location.pathname !== '/' && (
          <button
            onClick={() => setShowDemoMenu(!showDemoMenu)}
            className="absolute top-4 right-4 z-[9999] w-12 h-12 rounded-full glass-strong border-2 border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] transition-all safe-top"
          >
            ⚡
          </button>
        )}
        
        {showDemoMenu && (
          <div className="absolute inset-0 z-[9999] bg-black/80 backdrop-blur-sm p-6 flex items-center justify-center" onClick={() => setShowDemoMenu(false)}>
            <div className="glass-strong border-2 border-[#D4AF37] rounded-2xl p-6 w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl text-[#D4AF37] mb-4">Quick Jump</h3>
              <div className="space-y-2">
                {[
                  { name: 'Login', path: '/login' },
                  { name: 'KYC', path: '/kyc' },
                  { name: 'Home', path: '/home' },
                  { name: 'Ride Flow', path: '/ride' },
                  { name: 'Earnings', path: '/earnings' },
                  { name: 'Edit Profile', path: '/edit-profile' },
                ].map((screen) => (
                  <button 
                    key={screen.path}
                    onClick={() => { navigate(screen.path); setShowDemoMenu(false); }} 
                    className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white"
                  >
                    {screen.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex-1 w-full h-full overflow-y-auto scrollbar-hide relative">
          <Routes>
            {/* Onboarding */}
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/kyc" element={<KYCUploadScreen />} />
            <Route path="/profile" element={<ProfileSetupScreen />} />
            
            {/* Main Dashboard */}
            <Route path="/home" element={
              <>
                <HomeScreen 
                  isOnline={isOnline}
                  onToggleOnline={() => setIsOnline(!isOnline)}
                />
                <RideRequestModal
                  isOpen={showRideRequest}
                  onAccept={handleAcceptRide}
                  onReject={() => setShowRideRequest(false)}
                  onCounter={() => alert('Counter offer sent!')}
                />
              </>
            } />
            
            {/* Active Ride Lifecycle */}
            <Route path="/code-verify" element={<CodeVerificationScreen passengerName="Sarah Johnson" paymentType={paymentType} />} />
            <Route path="/pre-trip-cash" element={<PreTripCashScreen fare={manualRideFare || 24.50} passengerName="Sarah Johnson" />} />
            <Route path="/ride" element={<RideFlowScreen paymentType={paymentType} />} />
            <Route path="/cash" element={<CashVerificationScreen fare={24.50} />} />
            <Route path="/rating" element={<RatingScreen passengerName="Sarah Johnson" />} />
            
            {/* Extras & Manual Entry */}
            <Route path="/earnings" element={<EarningsScreen />} />
            <Route path="/edit-profile" element={<EditProfileScreen />} />
            <Route path="/manual-ride" element={<DestinationEntryScreen onSetFare={setManualRideFare} />} />
            
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </NotificationProvider>
  );
}