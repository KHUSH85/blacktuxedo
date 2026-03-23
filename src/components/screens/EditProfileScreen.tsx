import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  Car,
  Settings,
  Shield, 
  Lock,
  Save,
  X,
  Star,
  Camera,
  CreditCard,
  Navigation,
  Globe,
  Apple,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard, GoldButton } from '../ui/GlassCard';
import { Input } from '../ui/Input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/Select';
import { Toggle } from '../ui/Toggle';
import { Chip } from '../ui/Chip';
import { DocumentUpload, DocumentStatus } from '../ui/DocumentUpload';
import { ImageUpload } from '../ui/ImageUpload';
import { useNotification } from '../../contexts/NotificationContext';
import { motion } from 'framer-motion';

export function EditProfileScreen() {
  const navigate = useNavigate();
  const { showSuccess } = useNotification();
  
  // Profile state
  const [profilePhoto, setProfilePhoto] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400');
  const [fullName, setFullName] = useState('Michael Anderson');
  const [phone, setPhone] = useState('555-123-4567');
  const [email, setEmail] = useState('michael.anderson@tuxedo.com');
  const [dob, setDob] = useState('1985-06-15');
  const [gender, setGender] = useState('male');
  
  // KYC Documents
  const [documents, setDocuments] = useState({
    license: 'verified' as DocumentStatus,
    insurance: 'verified' as DocumentStatus,
    registration: 'pending' as DocumentStatus,
    background: 'verified' as DocumentStatus,
    idProof: 'verified' as DocumentStatus
  });
  
  // Vehicle info
  const [vehicleType, setVehicleType] = useState('Executive Sedan');
  const [vehicleMake, setVehicleMake] = useState('Mercedes-Benz S-Class');
  const [vehicleYear, setVehicleYear] = useState('2022');
  const [vehicleColor, setVehicleColor] = useState('Black');
  const [licensePlate, setLicensePlate] = useState('TUX 2024');
  const [capacity, setCapacity] = useState('4');
  const [vehiclePhotos, setVehiclePhotos] = useState({
    front: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
    side: '',
    interior: ''
  });
  
  // Preferences
  const [navApp, setNavApp] = useState<'google' | 'apple' | 'waze'>('google');
  const [acceptCash, setAcceptCash] = useState(true);
  const [maxLuggage, setMaxLuggage] = useState('3');
  const [amenities, setAmenities] = useState(['wifi', 'charger', 'water']);
  
  // Safety & Security
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  
  const handleSave = () => {
    showSuccess('Profile Updated', 'Your changes have been saved successfully');
    setTimeout(() => navigate(-1), 1000);
  };
  
  const handleDocumentUpload = (docType: string) => {
    showSuccess('Document Uploaded', 'Your document is being verified');
  };

  return (
    <div className="min-h-full bg-black safe-area flex flex-col items-center relative overflow-x-hidden">
      {/* Branded Responsive Header */}
      <motion.div 
        className="sticky top-0 z-50 w-full max-w-md glass-strong border-b border-[#D4AF37]/20 backdrop-blur-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="text-[#D4AF37] hover:text-[#F7E29F] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-[#D4AF37]/5 border border-[#D4AF37]/20"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">Tuxedo</h1>
              <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.3em] mt-1">Premium Driver</p>
            </div>
          </div>
          <motion.div 
            whileTap={{ scale: 0.9 }}
            className="w-11 h-11 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden gold-glow"
          >
            <User className="text-[#D4AF37] w-5 h-5" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="w-full max-w-md px-6 py-8 space-y-8 pb-32">
        {/* Profile Header */}
        <GlassCard variant="strong" className="border-[#D4AF37]/40 gold-glow">
          <div className="flex flex-col items-center text-center space-y-5">
            <div className="relative">
              <motion.div 
                className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                whileHover={{ scale: 1.05 }}
              >
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              </motion.div>
              <motion.button 
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center gold-shimmer border-2 border-black shadow-lg"
              >
                <Camera size={20} />
              </motion.button>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white italic tracking-tight">{fullName}</h2>
              <div className="flex items-center justify-center gap-1.5 mt-1.5">
                <Star size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm font-black tracking-widest">4.9</span>
                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-1">(1,247 rides)</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Personal Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4 flex items-center gap-2 px-1">
            <User size={14} className="opacity-70" />
            Identity Protocol
          </h3>
          <GlassCard variant="subtle" className="space-y-6 border-[#D4AF37]/10 bg-black/40">
            <Input
              label="Legal Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<User size={18} className="text-[#D4AF37]/70" />}
            />
            <Input
              label="Registry Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              icon={<Phone size={18} className="text-[#D4AF37]/70" />}
            />
            <Input
              label="Official Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              icon={<Mail size={18} className="text-[#D4AF37]/70" />}
            />
            <Input
              label="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              type="date"
              icon={<Calendar size={18} className="text-[#D4AF37]/70" />}
            />
            
            <div className="space-y-2 px-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Gender Class</label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full bg-black/60 border-[#D4AF37]/20 text-white h-14 rounded-2xl focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-[#D4AF37]/30 text-white rounded-2xl">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </GlassCard>
        </motion.div>

        {/* KYC Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4 flex items-center gap-2 px-1">
            <FileText size={14} className="opacity-70" />
            Registry Credentials
          </h3>
          <GlassCard variant="subtle" className="space-y-3 border-[#D4AF37]/10 bg-black/40">
            <DocumentUpload
              label="Driver's License"
              status={documents.license}
              onUpload={() => handleDocumentUpload('license')}
              icon={<CreditCard size={20} className="text-[#D4AF37]" />}
            />
            <DocumentUpload
              label="Vehicle Insurance"
              status={documents.insurance}
              onUpload={() => handleDocumentUpload('insurance')}
              icon={<Shield size={20} className="text-[#D4AF37]" />}
            />
            <DocumentUpload
              label="Registration Certificate"
              status={documents.registration}
              onUpload={() => handleDocumentUpload('registration')}
              icon={<FileText size={20} className="text-[#D4AF37]" />}
            />
            <DocumentUpload
              label="Background Check"
              status={documents.background}
              onUpload={() => handleDocumentUpload('background')}
              icon={<Shield size={20} className="text-[#D4AF37]" />}
            />
            <DocumentUpload
              label="ID Proof"
              status={documents.idProof}
              onUpload={() => handleDocumentUpload('idProof')}
              icon={<CreditCard size={20} className="text-[#D4AF37]" />}
            />
          </GlassCard>
        </motion.div>

        {/* Vehicle Information */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4 flex items-center gap-2 px-1">
            <Car size={14} className="opacity-70" />
            Fleet Registry
          </h3>
          <GlassCard variant="subtle" className="space-y-6 border-[#D4AF37]/10 bg-black/40">
            <div className="space-y-2 px-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Luxury Vehicle Tier</label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger className="w-full bg-black/60 border-[#D4AF37]/20 text-white h-14 rounded-2xl focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-[#D4AF37]/30 text-white rounded-2xl">
                  <SelectItem value="Limousine">Limousine</SelectItem>
                  <SelectItem value="Executive Sedan">Executive Sedan</SelectItem>
                  <SelectItem value="Luxury SUV">Luxury SUV</SelectItem>
                  <SelectItem value="Luxury Van">Luxury Van</SelectItem>
                  <SelectItem value="Exotic Car">Exotic Car</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              label="Fleet Model Designation"
              value={vehicleMake}
              onChange={(e) => setVehicleMake(e.target.value)}
              icon={<Car size={18} className="text-[#D4AF37]/70" />}
              placeholder="e.g., Mercedes-Benz S-Class"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Registry Year"
                value={vehicleYear}
                onChange={(e) => setVehicleYear(e.target.value)}
                type="number"
                icon={<Calendar size={18} className="text-[#D4AF37]/70" />}
              />
              <Input
                label="Design Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="License ID"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
              <div className="space-y-2 px-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Seat Capacity</label>
                <Select value={capacity} onValueChange={setCapacity}>
                  <SelectTrigger className="w-full bg-black/60 border-[#D4AF37]/20 text-white h-14 rounded-2xl focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all">
                    <SelectValue placeholder="Capacity" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-[#D4AF37]/30 text-white rounded-2xl">
                    <SelectItem value="2">2 passengers</SelectItem>
                    <SelectItem value="4">4 passengers</SelectItem>
                    <SelectItem value="6">6 passengers</SelectItem>
                    <SelectItem value="8">8 passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="px-1">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 ml-1">Fleet Portfolio Images</label>
              <div className="grid grid-cols-3 gap-3">
                <ImageUpload label="Front" imageUrl={vehiclePhotos.front} onUpload={() => {}} size="small" />
                <ImageUpload label="Side" imageUrl={vehiclePhotos.side} onUpload={() => {}} size="small" />
                <ImageUpload label="Interior" imageUrl={vehiclePhotos.interior} onUpload={() => {}} size="small" />
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Driver Preferences */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4 flex items-center gap-2 px-1">
            <Settings size={14} className="opacity-70" />
            Dispatch Protocols
          </h3>
          <GlassCard variant="subtle" className="space-y-8 border-[#D4AF37]/10 bg-black/40">
            <div className="px-1">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 ml-1">Navigation System</label>
              <div className="grid grid-cols-3 gap-3">
                <Chip label="Google" selected={navApp === 'google'} onClick={() => setNavApp('google')} icon={<Globe size={14} />} />
                <Chip label="Apple" selected={navApp === 'apple'} onClick={() => setNavApp('apple')} icon={<Apple size={14} />} />
                <Chip label="Waze" selected={navApp === 'waze'} onClick={() => setNavApp('waze')} icon={<Navigation size={14} />} />
              </div>
            </div>

            <div className="flex items-center justify-between px-2 bg-white/5 p-4 rounded-2xl border border-[#D4AF37]/10">
              <div>
                <p className="text-white font-black text-xs uppercase tracking-widest">Accept Cash Protocol</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold mt-1">Allow physical currency collection</p>
              </div>
              <Toggle pressed={acceptCash} onPressedChange={setAcceptCash} />
            </div>

            <div className="space-y-2 px-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Maximum Luggage Class</label>
              <Select value={maxLuggage} onValueChange={setMaxLuggage}>
                <SelectTrigger className="w-full bg-black/60 border-[#D4AF37]/20 text-white h-14 rounded-2xl focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all">
                  <SelectValue placeholder="Select luggage" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-[#D4AF37]/30 text-white rounded-2xl">
                  <SelectItem value="1">1 bag</SelectItem>
                  <SelectItem value="2">2 bags</SelectItem>
                  <SelectItem value="3">3 bags</SelectItem>
                  <SelectItem value="4">4+ bags</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </GlassCard>
        </motion.div>

        {/* Account Security */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] mb-4 flex items-center gap-2 px-1">
            <Lock size={14} className="opacity-70" />
            Encryption Security
          </h3>
          <GlassCard variant="subtle" className="space-y-4 border-[#D4AF37]/10 bg-black/40">
            <div className="flex items-center justify-between p-4 glass-card bg-black/40 rounded-2xl border border-[#D4AF37]/10 group">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[#D4AF37]/10">
                  <Shield size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white text-xs font-black uppercase tracking-widest">Biometric Access</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mt-0.5">Face ID / Touch ID Registry</p>
                </div>
              </div>
              <Toggle pressed={biometricEnabled} onPressedChange={setBiometricEnabled} />
            </div>

            <div className="flex items-center justify-between p-4 glass-card bg-black/40 rounded-2xl border border-[#D4AF37]/10 group">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-[#D4AF37]/10">
                  <Lock size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white text-xs font-black uppercase tracking-widest">2FA Node Security</p>
                  <p className="text-[10px] text-gray-500 uppercase font-bold mt-0.5">Dual-Layer verification layer</p>
                </div>
              </div>
              <Toggle pressed={twoFactorEnabled} onPressedChange={setTwoFactorEnabled} />
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-auto bg-gradient-to-t from-black via-black/90 to-transparent p-6 pb-safe backdrop-blur-sm">
        <div className="w-full max-w-md grid grid-cols-2 gap-4">
          <GoldButton 
            variant="secondary" 
            onClick={() => navigate(-1)} 
            className="border-[#D4AF37]/30 text-xs font-black uppercase tracking-widest py-6"
          >
            Discard
          </GoldButton>
          <GoldButton 
            onClick={handleSave} 
            className="py-6 text-xs font-black uppercase tracking-widest italic"
          >
            Commit Changes
          </GoldButton>
        </div>
      </div>
    </div>
  );
}