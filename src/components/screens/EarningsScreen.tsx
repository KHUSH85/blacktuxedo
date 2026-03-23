import React, { useState } from 'react';
import { DollarSign, TrendingUp, Download, ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

type Period = 'daily' | 'weekly' | 'monthly' | 'yearly';

export function EarningsScreen() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>('daily');
  
  const earningsData = {
    daily: {
      total: 245.50,
      trips: 12,
      tips: 28.50,
      chart: [
        { time: '8AM', earnings: 45 },
        { time: '10AM', earnings: 32 },
        { time: '12PM', earnings: 58 },
        { time: '2PM', earnings: 41 },
        { time: '4PM', earnings: 35 },
        { time: '6PM', earnings: 34.50 }
      ]
    },
    weekly: {
      total: 1456.80,
      trips: 68,
      tips: 182.40,
      chart: [
        { time: 'Mon', earnings: 198 },
        { time: 'Tue', earnings: 234 },
        { time: 'Wed', earnings: 189 },
        { time: 'Thu', earnings: 245 },
        { time: 'Fri', earnings: 312 },
        { time: 'Sat', earnings: 156 },
        { time: 'Sun', earnings: 122.80 }
      ]
    },
    monthly: {
      total: 6234.20,
      trips: 287,
      tips: 824.60,
      chart: [
        { time: 'Week 1', earnings: 1456 },
        { time: 'Week 2', earnings: 1623 },
        { time: 'Week 3', earnings: 1589 },
        { time: 'Week 4', earnings: 1566.20 }
      ]
    },
    yearly: {
      total: 74810.40,
      trips: 3442,
      tips: 9895.20,
      chart: [
        { time: 'Jan', earnings: 5234 },
        { time: 'Feb', earnings: 5823 },
        { time: 'Mar', earnings: 6456 },
        { time: 'Apr', earnings: 6234 },
        { time: 'May', earnings: 6789 },
        { time: 'Jun', earnings: 7012 },
        { time: 'Jul', earnings: 6890 },
        { time: 'Aug', earnings: 6234 },
        { time: 'Sep', earnings: 5987 },
        { time: 'Oct', earnings: 6234 },
        { time: 'Nov', earnings: 6002 },
        { time: 'Dec', earnings: 5915.40 }
      ]
    }
  };
  
  const data = earningsData[period];
  
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
          <div className="flex items-center gap-3">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="p-3 glass-card rounded-xl text-[#D4AF37] border border-[#D4AF37]/20"
            >
              <Download size={20} />
            </motion.button>
            <motion.div 
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/edit-profile')}
              className="w-11 h-11 rounded-full border-2 border-[#D4AF37]/30 glass-strong flex items-center justify-center overflow-hidden gold-glow"
            >
              <User className="text-[#D4AF37] w-5 h-5" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="w-full max-w-md px-6 py-8 space-y-8 pb-12">
        {/* Screen Title */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tight mb-1">Revenue</h2>
          <p className="text-[#D4AF37] font-bold uppercase tracking-[0.2em] text-[10px]">Portfolio Performance</p>
        </motion.div>

        {/* Period Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full no-select">
          {(['daily', 'weekly', 'monthly', 'yearly'] as Period[]).map((p) => (
            <motion.button
              key={p}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPeriod(p)}
              className={`px-6 py-3 rounded-xl whitespace-nowrap transition-all min-h-[48px] flex-shrink-0 font-black uppercase tracking-widest text-[10px] italic border-2 ${
                period === p
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F4E5A1] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                  : 'glass-card text-gray-500 border-white/5 hover:border-[#D4AF37]/30'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
        
        {/* Total Earnings */}
        <GlassCard variant="strong" className="mb-6 border-[#D4AF37]/50 gold-glow">
          <div className="text-center p-2">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Net Fleet Earnings</p>
            <h2 className="text-5xl font-black text-white mb-8 tracking-tighter italic">
              <span className="text-[#D4AF37]">$</span>{data.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card bg-black/40 p-5 rounded-2xl border-[#D4AF37]/10">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Completed</p>
                <p className="text-2xl font-black text-white italic">{data.trips}</p>
              </div>
              <div className="glass-card bg-black/40 p-5 rounded-2xl border-[#D4AF37]/10">
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">Gratuity</p>
                <p className="text-2xl font-black text-[#D4AF37] italic">${data.tips.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </GlassCard>
        
        {/* Chart */}
        <GlassCard className="mb-6 border-[#D4AF37]/20 bg-black/40">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] italic">Trend Analysis</h3>
            <TrendingUp size={18} className="text-[#D4AF37] opacity-50" />
          </div>
          
          <div className="h-64 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.chart} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#444', fontSize: 10, fontWeight: '900' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#444', fontSize: 10, fontWeight: '900' }}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(212, 175, 55, 0.05)' }}
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    border: '2px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '16px',
                    padding: '12px',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)'
                  }}
                  itemStyle={{ color: '#D4AF37', fontWeight: '900', fontSize: '12px', textTransform: 'uppercase', fontStyle: 'italic' }}
                  labelStyle={{ color: '#fff', marginBottom: '4px', fontWeight: '900', textTransform: 'uppercase', fontSize: '10px' }}
                  formatter={(value: number) => [`$${value.toFixed(2)}`, 'Revenue']}
                />
                <Bar 
                  dataKey="earnings" 
                  fill="#D4AF37"
                  radius={[6, 6, 2, 2]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
        
        {/* Tip Summary */}
        <GlassCard variant="subtle" className="border-[#D4AF37]/10 bg-black/40">
          <div className="flex items-center justify-between mb-6 px-2">
            <h3 className="text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] italic">Protocol Insights</h3>
            <DollarSign size={18} className="text-[#D4AF37] opacity-50" />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between py-5 border-b border-[#D4AF37]/10 px-2">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Total Tips</span>
              <span className="text-xl font-black text-[#D4AF37] italic">${data.tips.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between py-5 border-b border-[#D4AF37]/10 px-2">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Avg Per Dispatch</span>
              <span className="text-xl font-black text-white italic">${(data.tips / data.trips).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between py-5 px-2">
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">Revenue Share</span>
              <span className="text-xl font-black text-[#D4AF37] italic">
                {((data.tips / data.total) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}