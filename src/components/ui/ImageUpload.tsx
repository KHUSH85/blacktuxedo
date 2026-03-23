import React from 'react';
import { Camera, Upload } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  imageUrl?: string;
  onUpload: () => void;
  variant?: 'circle' | 'square';
  size?: 'small' | 'medium' | 'large';
}

export function ImageUpload({ 
  label, 
  imageUrl, 
  onUpload, 
  variant = 'square',
  size = 'medium' 
}: ImageUploadProps) {
  const sizeClasses = {
    small: 'w-20 h-20',
    medium: 'w-32 h-32',
    large: 'w-full h-40'
  };

  return (
    <div>
      <label className="block text-sm text-gray-400 mb-2">
        {label}
      </label>
      <button
        onClick={onUpload}
        className={`relative overflow-hidden glass-card border-2 border-dashed border-[#D4AF37]/40 ${sizeClasses[size]} ${
          variant === 'circle' ? 'rounded-full' : 'rounded-xl'
        } transition-all duration-300 hover:border-[#D4AF37] hover-lift group`}
      >
        {imageUrl ? (
          <>
            <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Camera className="text-[#D4AF37]" size={24} />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-[#D4AF37]">
            <Upload size={24} className="mb-2" />
            <span className="text-xs">Upload</span>
          </div>
        )}
      </button>
    </div>
  );
}
