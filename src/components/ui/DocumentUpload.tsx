import React from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export type DocumentStatus = 'verified' | 'pending' | 'rejected' | 'none';

interface DocumentUploadProps {
  label: string;
  status: DocumentStatus;
  onUpload: () => void;
  icon?: React.ReactNode;
}

export function DocumentUpload({ label, status, onUpload, icon }: DocumentUploadProps) {
  const statusConfig = {
    verified: {
      icon: <CheckCircle size={20} className="text-green-400" />,
      text: 'Verified',
      textColor: 'text-green-400',
      borderColor: 'border-green-500/40',
      bgColor: 'bg-green-500/5'
    },
    pending: {
      icon: <Clock size={20} className="text-[#D4AF37]" />,
      text: 'Pending',
      textColor: 'text-[#D4AF37]',
      borderColor: 'border-[#D4AF37]/40',
      bgColor: 'bg-[#D4AF37]/5'
    },
    rejected: {
      icon: <AlertCircle size={20} className="text-red-400" />,
      text: 'Rejected',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/40',
      bgColor: 'bg-red-500/5'
    },
    none: {
      icon: <FileText size={20} className="text-gray-400" />,
      text: 'Not uploaded',
      textColor: 'text-gray-400',
      borderColor: 'border-gray-600/40',
      bgColor: 'bg-transparent'
    }
  };

  const config = statusConfig[status];

  return (
    <div className={`glass-card ${config.borderColor} ${config.bgColor} p-4 rounded-xl transition-all duration-300 hover-lift`}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="text-[#D4AF37] flex-shrink-0">
            {icon || <FileText size={24} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white truncate">{label}</p>
            <div className="flex items-center gap-2 mt-1">
              {config.icon}
              <span className={`text-xs ${config.textColor}`}>{config.text}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onUpload}
          className="glass-button-outline text-[#D4AF37] px-4 py-2 rounded-lg text-sm transition-all hover:bg-[#D4AF37]/10 min-h-[44px] flex items-center gap-2 flex-shrink-0"
        >
          <Upload size={16} />
          {status === 'none' ? 'Upload' : 'Replace'}
        </button>
      </div>
    </div>
  );
}
