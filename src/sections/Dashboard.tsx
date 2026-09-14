'use client';

import { motion } from 'framer-motion';
import { 
  LineChart, 
  BarChart3, 
  PieChart, 
  Activity,
  TrendingUp,
  Eye,
  Zap
} from 'lucide-react';
import { DashboardMockup } from '../components/cosmic/AnimatedDashboard';

const capabilities = [
  {
    icon: LineChart,
    title: 'Real-time Analytics',
    description: 'Live data streams with millisecond latency',
  },
  {
    icon: BarChart3,
    title: 'Custom Reports',
    description: 'Build reports tailored to your KPIs',
  },
  {
    icon: PieChart,
    title: 'Data Distribution',
    description: 'Visual breakdown of key metrics',
  },
  {
    icon: Activity,
    title: 'Performance Monitoring',
    description: 'Track system health 24/7',
  },
];

export function Dashboard() {
  return (
    <section id="dashboard" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full glass text-sm text-blue-300 mb-4"
          >
            Data Intelligence
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit text-white mb-4">
            Dashboarding & <span className="text-gradient">Data Visualization</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Transform raw data into actionable insights with real-time visual analytics. 
            Our dashboards bring clarity to complexity.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <DashboardMockup />
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, i) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-xl p-6 group hover:bg-white/10 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center mb-4 group-hover:from-purple-500/50 group-hover:to-blue-500/50 transition-all">
                <capability.icon className="w-6 h-6 text-purple-300" />
              </div>
              <h4 className="text-white font-semibold mb-2">{capability.title}</h4>
              <p className="text-white/50 text-sm">{capability.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: TrendingUp,
              title: 'Predictive Analytics',
              description: 'Forecast trends and make data-driven decisions with AI-powered predictions.',
            },
            {
              icon: Eye,
              title: 'Interactive Exploration',
              description: 'Drill down into data with intuitive click-through exploration.',
            },
            {
              icon: Zap,
              title: 'Instant Insights',
              description: 'Get answers in milliseconds with our optimized query engine.',
            },
          ].map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                <feature.icon className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
              <p className="text-white/50 text-sm">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Dashboard;
