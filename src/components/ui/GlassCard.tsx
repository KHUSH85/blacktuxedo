import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  variant?: 'default' | 'strong' | 'subtle';
  onClick?: () => void;
}

export const GlassCard = ({ 
  children, 
  className = '', 
  animate = true,
  variant = 'default',
  onClick
}: GlassCardProps) => {
  const CardComponent = animate ? motion.div : 'div';
  const variantClasses = {
    default: 'glass-card',
    strong: 'glass-strong',
    subtle: 'glass-subtle'
  };
  
  return (
    <CardComponent
      onClick={onClick}
      {...(animate ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      } : {})}
      className={`${variantClasses[variant]} backdrop-blur-xl bg-black/60 border-2 border-[#D4AF37]/20 rounded-2xl shadow-2xl transition-all duration-300 ${className}`}
    >
      {children}
    </CardComponent>
  );
};

interface GoldButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  icon?: ReactNode;
}

/**
 * Mobile-Optimized Luxury Gold Button
 * Features: High-tap target (58px), immediate tactile feedback, 
 * and shimmering gold gradients.
 */
export const GoldButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  icon,
}: GoldButtonProps) => {
  const variants = {
    // Solid Gold with shimmer - Primary Action
    primary: `
      bg-gradient-to-r from-[#D4AF37] via-[#F4E5A1] to-[#D4AF37] 
      text-black shadow-[0_10px_20px_-10px_rgba(212,175,55,0.5)] 
      gold-shimmer border-none
    `,
    // Outlined Gold - Secondary Action
    secondary: `
      border-2 border-[#D4AF37]/50 text-[#D4AF37] 
      bg-[#D4AF37]/5 backdrop-blur-sm
    `,
    // Ghost - Subtle Action
    ghost: `
      text-[#D4AF37]/80 hover:text-[#D4AF37] 
      border-2 border-transparent
    `,
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      // Mobile Tactile Feedback: Slight shrink on press feels more natural than a hover
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className={`
        ${variants[variant]}
        ${className}
        /* Mobile Specifics */
        w-full                    /* Buttons usually span full width on mobile */
        min-h-[58px]              /* Ideal touch target height for drivers */
        px-8 py-4 
        rounded-2xl               /* Softer, more modern luxury radius */
        flex items-center justify-center gap-3 
        
        /* Typography */
        text-sm font-black uppercase tracking-[0.15em] italic
        
        /* Transitions & States */
        transition-all duration-300
        disabled:opacity-40 disabled:grayscale disabled:cursor-not-allowed
        active:brightness-90      /* Visual cue for touch down */
      `}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </motion.button>
  );
};