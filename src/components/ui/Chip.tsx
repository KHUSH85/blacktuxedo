import React from 'react';
import { Check } from 'lucide-react';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export function Chip({ label, selected, onClick, icon }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 min-h-[44px] flex items-center gap-2 ${
        selected
          ? 'bg-[#D4AF37] text-black gold-shimmer'
          : 'glass-card text-gray-400 hover:text-white hover:border-[#D4AF37]/50'
      }`}
    >
      {icon && <span className={selected ? 'text-black' : 'text-[#D4AF37]'}>{icon}</span>}
      {label}
      {selected && <Check size={16} className="ml-1" />}
    </button>
  );
}
