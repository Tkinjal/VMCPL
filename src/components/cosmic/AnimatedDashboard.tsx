'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Animated line chart data
const generateLineData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    name: `${i * 5}s`,
    value: 60 + Math.random() * 30,
    value2: 40 + Math.random() * 25,
  }));
};

const generateBarData = () => {
  return Array.from({ length: 7 }, (_, i) => ({
    name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    value: 30 + Math.random() * 50,
  }));
};

const pieData = [
  { name: 'AI', value: 35, color: '#7e43ff' },
  { name: 'IoT', value: 25, color: '#3b82f6' },
  { name: 'Data', value: 20, color: '#06b6d4' },
  { name: 'Cloud', value: 20, color: '#8b5cf6' },
];

export function LiveLineChart() {
  const [data, setData] = useState(generateLineData());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1)];
        newData.push({
          name: `${Date.now() % 60}s`,
          value: 60 + Math.random() * 30,
          value2: 40 + Math.random() * 25,
        });
        return newData;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-32 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7e43ff" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#7e43ff" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorValue2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(10, 10, 10, 0.9)', 
              border: '1px solid rgba(126, 67, 255, 0.3)',
              borderRadius: '8px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#7e43ff" 
            fillOpacity={1} 
            fill="url(#colorValue)" 
            strokeWidth={2}
            animationDuration={300}
          />
          <Area 
            type="monotone" 
            dataKey="value2" 
            stroke="#3b82f6" 
            fillOpacity={1} 
            fill="url(#colorValue2)" 
            strokeWidth={2}
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LiveBarChart() {
  const [data, setData] = useState(generateBarData());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateBarData());
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-28 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(10, 10, 10, 0.9)', 
              border: '1px solid rgba(126, 67, 255, 0.3)',
              borderRadius: '8px'
            }}
          />
          <Bar 
            dataKey="value" 
            fill="#7e43ff" 
            radius={[4, 4, 0, 0]}
            animationDuration={500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LivePieChart() {
  return (
    <div className="h-28 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={45}
            paddingAngle={3}
            dataKey="value"
            animationDuration={1000}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(10, 10, 10, 0.9)', 
              border: '1px solid rgba(126, 67, 255, 0.3)',
              borderRadius: '8px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon,
  delay = 0 
}: { 
  title: string; 
  value: string; 
  change: string; 
  icon: React.ComponentType<{ className?: string }>;
  delay?: number;
}) {
  const isPositive = change.startsWith('+');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/60 text-sm">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
          <Icon className="w-4 h-4 text-purple-400" />
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {change} <span className="text-white/40">vs last week</span>
      </div>
    </motion.div>
  );
}

export function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl opacity-50" />
      
      {/* Dashboard container */}
      <div className="relative glass-strong rounded-2xl overflow-hidden border border-white/10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-white/60 text-sm font-mono">VYOMAKE Analytics Dashboard</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs">LIVE</span>
          </div>
        </div>
        
        {/* Dashboard content */}
        <div className="p-6 grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <div className="col-span-3 space-y-2">
            {['Overview', 'Analytics', 'Reports', 'Settings'].map((item, i) => (
              <div 
                key={item}
                className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                  i === 0 ? 'bg-purple-500/20 text-purple-300' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                {item}
              </div>
            ))}
          </div>
          
          {/* Main content */}
          <div className="col-span-9 space-y-4">
            {/* Metrics row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="glass rounded-lg p-3">
                <div className="text-white/50 text-xs mb-1">Total Revenue</div>
                <div className="text-xl font-bold text-white">$1.2M</div>
                <div className="text-green-400 text-xs">+15%</div>
              </div>
              <div className="glass rounded-lg p-3">
                <div className="text-white/50 text-xs mb-1">Active Users</div>
                <div className="text-xl font-bold text-white">8,500</div>
                <div className="text-green-400 text-xs">+8%</div>
              </div>
              <div className="glass rounded-lg p-3">
                <div className="text-white/50 text-xs mb-1">Conversion</div>
                <div className="text-xl font-bold text-white">4.2%</div>
                <div className="text-red-400 text-xs">-0.5%</div>
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-3">
                <div className="text-white/70 text-sm mb-2">Real-time Traffic</div>
                <LiveLineChart />
              </div>
              <div className="glass rounded-lg p-3">
                <div className="text-white/70 text-sm mb-2">Weekly Activity</div>
                <LiveBarChart />
              </div>
            </div>
            
            {/* Bottom section */}
            <div className="grid grid-cols-3 gap-4">
              <div className="glass rounded-lg p-3 col-span-2">
                <div className="text-white/70 text-sm mb-2">System Performance</div>
                <div className="space-y-2">
                  {[
                    { label: 'CPU Usage', value: 72, color: 'bg-purple-500' },
                    { label: 'Memory', value: 58, color: 'bg-blue-500' },
                    { label: 'Network', value: 85, color: 'bg-cyan-500' },
                  ].map((metric) => (
                    <div key={metric.label} className="flex items-center gap-3">
                      <span className="text-white/50 text-xs w-20">{metric.label}</span>
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${metric.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-white/70 text-xs w-10">{metric.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-lg p-3">
                <div className="text-white/70 text-sm mb-2">Distribution</div>
                <LivePieChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardMockup;
