import React, { useState } from 'react';
import { Star, MessageSquare, ArrowLeft, User, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoldButton, GlassCard } from '../ui/GlassCard';
import { useNotification } from '../../contexts/NotificationContext';
import { motion, AnimatePresence } from 'framer-motion';

interface RatingScreenProps {
  passengerName: string;
}

export function RatingScreen({ passengerName }: RatingScreenProps) {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState('');
  const { showSuccess } = useNotification();
  
  const noteTemplates = [
    'Great conversation',
    'Respectful passenger',
    'On time',
    'Clean and tidy',
    'Friendly',
    'Quiet ride',
    'Good tipper',
    'Polite'
  ];
  
  const toggleNote = (note: string) => {
    if (selectedNotes.includes(note)) {
      setSelectedNotes(selectedNotes.filter(n => n !== note));
    } else {
      setSelectedNotes([...selectedNotes, note]);
    }
  };
  
  const handleSubmit = () => {
    if (rating > 0) {
      showSuccess('Rating Submitted', `Thank you for rating ${passengerName}!`);
      // Replaced onComplete callback with programmatic navigation
      setTimeout(() => navigate('/home'), 800);
    }
  };
  
  return (
    <div className="min-h-full bg-black p-6 safe-area flex flex-col items-center">
      {/* Branded Luxury Header */}
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center py-6 animate-fade-in">
          <div>
            <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">Tuxedo</h1>
            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-1">Premium Driver</p>
          </div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden gold-glow shadow-lg shadow-[#D4AF37]/20"
          >
            <User className="text-[#D4AF37] w-6 h-6" />
          </motion.div>
        </div>

        <div className="pt-4 pb-8">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/20 flex items-center justify-center gold-glow">
              <MessageSquare size={48} className="text-[#D4AF37]" />
            </div>
            <h2 className="text-3xl font-black text-white uppercase italic tracking-tight mb-2">Rate Passenger</h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] italic">{passengerName}</p>
          </motion.div>
          
          {/* Star Rating */}
          <GlassCard variant="strong" className="mb-8 p-8 border-[#D4AF37]/40 shadow-[0_0_40px_rgba(212,175,55,0.1)]">
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="transition-all min-w-[52px] min-h-[52px] flex items-center justify-center"
                >
                  <Star 
                    size={42}
                    className={`transition-colors duration-300 ${
                      star <= (hoveredRating || rating) 
                        ? 'fill-[#D4AF37] text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]' 
                        : 'text-gray-800'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              {rating > 0 && (
                <motion.p 
                  key={rating}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-[#D4AF37] font-black uppercase tracking-widest text-xs italic"
                >
                  {rating === 5 && 'Excellent Service ⭐'}
                  {rating === 4 && 'Great Experience 👍'}
                  {rating === 3 && 'Good Protocol'}
                  {rating === 2 && 'Needs Improvement'}
                  {rating === 1 && 'Unsatisfactory'}
                </motion.p>
              )}
            </AnimatePresence>
          </GlassCard>
          
          {/* Note Templates */}
          <AnimatePresence>
            {rating > 0 && (
              <motion.div 
                className="mb-8 w-full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <GlassCard variant="subtle" className="border-[#D4AF37]/10">
                  <h3 className="text-[10px] font-black text-[#D4AF37] mb-6 uppercase tracking-[0.2em] flex items-center gap-2 px-1">
                    <Sparkles size={14} className="opacity-50" />
                    {rating >= 4 ? 'Distinguished Details' : 'Protocol Issues'}
                  </h3>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {noteTemplates.map((note) => (
                      <motion.button
                        key={note}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleNote(note)}
                        className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all min-h-[48px] border-2 ${
                          selectedNotes.includes(note)
                            ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                            : 'glass-card bg-black/40 text-gray-500 border-white/5 hover:border-[#D4AF37]/30'
                        }`}
                      >
                        {note}
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="px-1">
                    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Additional Commentary</label>
                    <textarea
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="Enter specific driver notes..."
                      rows={3}
                      className="w-full glass-card bg-black/40 p-4 rounded-2xl outline-none text-white text-sm font-medium border-2 border-[#D4AF37]/10 focus:border-[#D4AF37]/40 transition-all placeholder:text-gray-700 resize-none"
                    />
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
          
          <GoldButton 
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full py-6 text-xl font-black uppercase tracking-tighter italic"
          >
            Submit Protocol
          </GoldButton>
        </div>
      </div>
    </div>
  );
}