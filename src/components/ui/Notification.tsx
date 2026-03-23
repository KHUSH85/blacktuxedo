import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, XCircle, X } from 'lucide-react';

export interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  onClose: (id: string) => void;
}

export function Notification({ id, type, title, message, duration = 4000, onClose }: NotificationProps) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const typeStyles = {
    success: {
      icon: <CheckCircle size={24} className="text-green-400" />,
      border: 'border-green-500/40',
      glow: 'shadow-[0_0_30px_rgba(34,197,94,0.3)]',
      bg: 'bg-green-500/10'
    },
    error: {
      icon: <XCircle size={24} className="text-red-400" />,
      border: 'border-red-500/40',
      glow: 'shadow-[0_0_30px_rgba(239,68,68,0.3)]',
      bg: 'bg-red-500/10'
    },
    warning: {
      icon: <AlertCircle size={24} className="text-[#D4AF37]" />,
      border: 'border-[#D4AF37]/40',
      glow: 'gold-glow',
      bg: 'bg-[#D4AF37]/10'
    },
    info: {
      icon: <Info size={24} className="text-blue-400" />,
      border: 'border-blue-500/40',
      glow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]',
      bg: 'bg-blue-500/10'
    }
  };

  const style = typeStyles[type];

  return (
    <div className={`glass-strong ${style.border} ${style.glow} ${style.bg} rounded-2xl p-4 min-w-[300px] max-w-md animate-slide-down hover-lift`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-0.5">
          {style.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white mb-1">{title}</h4>
          {message && <p className="text-sm text-gray-400">{message}</p>}
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <X size={18} />
        </button>
      </div>
      {/* Progress bar */}
      {duration > 0 && (
        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className={`h-full ${type === 'success' ? 'bg-green-400' : type === 'error' ? 'bg-red-400' : type === 'warning' ? 'bg-[#D4AF37]' : 'bg-blue-400'}`}
            style={{
              animation: `shrink ${duration}ms linear`,
              width: '100%'
            }}
          />
        </div>
      )}
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
