import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CodeVerificationScreenProps {
  passengerName: string;
  paymentType?: 'card' | 'cash'; // Kept for backward compatibility
}

export function CodeVerificationScreen({ passengerName, paymentType = 'card' }: CodeVerificationScreenProps) {
  const navigate = useNavigate();
  useEffect(() => {
    // Code verification removed: accepted rides now go straight to ride navigation/trip screen.
    // Keeping this screen as a safety fallback for any stray navigation.
    navigate('/ride');
  }, [navigate]);

  // Verification UI removed entirely.
  return null;
}