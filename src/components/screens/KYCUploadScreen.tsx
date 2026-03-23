import React, { useState } from 'react';
import { Upload, CheckCircle, FileText, Shield, Car, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GoldButton } from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

interface Document {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  uploaded: boolean;
}

export function KYCUploadScreen() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'license',
      title: "Driver's License",
      description: 'Upload front and back',
      icon: <Shield size={32} className="text-[#D4AF37]" />,
      uploaded: false
    },
    {
      id: 'insurance',
      title: 'Insurance Certificate',
      description: 'Valid insurance proof',
      icon: <FileText size={32} className="text-[#D4AF37]" />,
      uploaded: false
    },
    {
      id: 'registration',
      title: 'Vehicle Registration',
      description: 'Current registration',
      icon: <Car size={32} className="text-[#D4AF37]" />,
      uploaded: false
    }
  ]);
  
  const handleUpload = (id: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === id ? { ...doc, uploaded: true } : doc
      )
    );
  };
  
  const allUploaded = documents.every(doc => doc.uploaded);
  
  return (
    <div className="min-h-full bg-black p-6 safe-area flex flex-col items-center overflow-x-hidden">
      <div className="w-full max-w-md pt-4 pb-8">
        
        {/* Branded Luxury Header Identity */}
        <div className="flex justify-between items-center py-6 mb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">Tuxedo</h1>
            <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-1">Premium Driver</p>
          </motion.div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden gold-glow shadow-lg shadow-[#D4AF37]/20"
          >
            <User className="text-[#D4AF37] w-6 h-6" />
          </motion.div>
        </div>

        <motion.div 
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tight mb-2">KYC Protocol</h2>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Upload Encrypted Identity Documents</p>
        </motion.div>
        
        <div className="space-y-4 mb-10">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard 
                variant={doc.uploaded ? "subtle" : "strong"}
                className={`transition-all duration-500 border-2 ${
                  doc.uploaded 
                    ? 'border-green-500/40 bg-green-500/5 shadow-[0_0_20px_rgba(34,197,94,0.1)]' 
                    : 'border-[#D4AF37]/20 hover:border-[#D4AF37]/40'
                }`}
              >
                <div className="flex items-start gap-5 p-1">
                  <div className={`p-4 rounded-2xl transition-all duration-500 flex-shrink-0 border-2 ${
                    doc.uploaded 
                      ? 'bg-green-500/20 border-green-500/30' 
                      : 'bg-[#D4AF37]/10 border-[#D4AF37]/20'
                  }`}>
                    {doc.uploaded ? (
                      <CheckCircle size={32} className="text-green-500" />
                    ) : (
                      <div className="text-[#D4AF37]">{doc.icon}</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tight mb-1 truncate">
                      {doc.title}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
                      {doc.description}
                    </p>
                    
                    <AnimatePresence mode="wait">
                      {doc.uploaded ? (
                        <motion.div 
                          key="complete"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-2 text-green-500"
                        >
                          <CheckCircle size={14} />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Secure</span>
                        </motion.div>
                      ) : (
                        <motion.button
                          key="upload"
                          whileTap={{ scale: 0.96 }}
                          onClick={() => handleUpload(doc.id)}
                          className="flex items-center gap-3 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] border-2 border-[#D4AF37]/30 px-5 py-3 rounded-xl hover:bg-[#D4AF37]/10 transition-all min-h-[48px] w-full justify-center"
                        >
                          <Upload size={16} />
                          <span>Initiate Upload</span>
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        
        <div className="pb-8">
          <GoldButton 
            onClick={() => navigate('/profile')}
            disabled={!allUploaded}
            className="w-full py-6 text-xl font-black uppercase tracking-tighter italic"
          >
            Advance to Profile
          </GoldButton>
        </div>
      </div>
    </div>
  );
}