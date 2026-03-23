import React from 'react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function BottomSheet({ isOpen, onClose, children, title }: BottomSheetProps) {
  if (!isOpen) return null;
  
  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 z-40 animate-fade-in"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up safe-bottom">
        <div className="glass-strong rounded-t-3xl p-6 min-h-[200px] max-h-[85vh] overflow-y-auto scroll-smooth border-t-2 border-[#D4AF37]">
          {title && (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl text-[#D4AF37]">{title}</h3>
              <button 
                onClick={onClose}
                className="text-[#D4AF37] hover:text-[#F4E5A1] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <X size={24} />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </>
  );
}