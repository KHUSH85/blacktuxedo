import React from 'react';
import { Clock } from 'lucide-react';

interface TimeInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

export function TimeInput({ label, value, onChange }: TimeInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-gray-400 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] pointer-events-none">
          <Clock size={20} />
        </div>
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full glass-card px-4 py-3 pl-12 rounded-xl bg-transparent outline-none text-white transition-all duration-300 border border-transparent focus:border-[#D4AF37] focus:gold-glow"
        />
      </div>
    </div>
  );
}
