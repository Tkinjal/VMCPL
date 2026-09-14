'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Activity,
  Wrench,
  Zap,
  Shield
} from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    description: '24/7 visibility into every aspect of your manufacturing process with instant alerts.',
  },
  {
    icon: Wrench,
    title: 'Predictive Maintenance',
    description: 'AI-powered predictions that prevent downtime before it happens.',
  },
  {
    icon: Zap,
    title: 'Smart Resource Allocation',
    description: 'Optimize energy, materials, and workforce in real-time.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Automated defect detection with 99.9% accuracy.',
  },
];

const stats = [
  { value: '40%', label: 'Cost Reduction' },
  { value: '60%', label: 'Efficiency Gain' },
  { value: '99.9%', label: 'Uptime' },
];

export function Manufacturing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="manufacturing"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full glass text-sm text-cyan-300 mb-4"
            >
              Industry 4.0
            </motion.span>

            <h2 className="text-3xl md:text-5xl font-bold font-outfit text-white mb-6">
              IoT-based <span className="text-gradient">Manufacturing</span> Automation
            </h2>

            <p className="text-white/60 text-lg mb-8">
              Connect every sensor, machine, and process into a unified intelligent ecosystem.
              Our IoT solutions transform traditional factories into smart, self-optimizing
              production facilities.
            </p>

            {/* Features list */}
            <div className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center flex-shrink-0 group-hover:from-purple-500/50 group-hover:to-blue-500/50 transition-all">
                    <feature.icon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                    <p className="text-white/50 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl opacity-50" />

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <motion.div style={{ scale: imageScale, y: imageY }} className="relative w-full aspect-[3/2]">
                <Image
                  src="/manufacturing-iot.jpg"
                  alt="IoT Manufacturing Automation - Smart factory with connected sensors, real-time monitoring, and predictive maintenance by VYOMAKE"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>

              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />

              {/* Scanline effect */}
              <motion.div
                className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              />

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-purple-500/50 rounded-tl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-blue-500/50 rounded-br-lg" />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-4 glass-strong rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-white/80">System Active</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Manufacturing;
