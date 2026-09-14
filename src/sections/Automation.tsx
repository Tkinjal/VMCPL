'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  Home,
  Building2,
  Lightbulb,
  Thermometer,
  Shield,
  Wifi,
  Smartphone,
  Settings
} from 'lucide-react';
import Image from 'next/image';

const officeFeatures = [
  { icon: Lightbulb, label: 'Smart Lighting', desc: 'Adaptive brightness control' },
  { icon: Thermometer, label: 'Climate Control', desc: 'AI-powered temperature' },
  { icon: Shield, label: 'Security Systems', desc: '24/7 monitoring' },
  { icon: Wifi, label: 'Network Management', desc: 'Seamless connectivity' },
];

const homeFeatures = [
  { icon: Smartphone, label: 'Mobile Control', desc: 'Manage from anywhere' },
  { icon: Settings, label: 'Voice Commands', desc: 'Works with Alexa & Google' },
  { icon: Thermometer, label: 'Energy Saving', desc: 'Optimize consumption' },
  { icon: Shield, label: 'Smart Locks', desc: 'Keyless entry systems' },
];

export function Automation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const leftX = useTransform(scrollYProgress, [0, 0.5], [-50, 0]);
  const rightX = useTransform(scrollYProgress, [0, 0.5], [50, 0]);

  return (
    <section
      id="automation"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
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
            className="inline-block px-4 py-1.5 rounded-full glass text-sm text-green-300 mb-4"
          >
            Smart Environments
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit text-white mb-4">
            Automation <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Transform your spaces into intelligent environments that adapt to your needs,
            optimize energy usage, and enhance security.
          </p>
        </motion.div>

        {/* Two cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Office Automation */}
          <motion.div
            style={{ x: leftX }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

            <div className="relative glass-strong rounded-2xl overflow-hidden border border-white/10">
              {/* Image */}
              <motion.div
                className="relative h-64 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/office-automation.jpg"
                  alt="Smart Office Automation - Intelligent workspace with adaptive lighting, climate control, and security by VYOMAKE"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />

              {/* Title overlay */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/30 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Office Automation</h3>
                </div>
                <p className="text-white/60 text-sm">
                  Create intelligent workspaces that boost productivity and reduce operational costs.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {officeFeatures.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{feature.label}</div>
                    <div className="text-white/40 text-xs">{feature.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>      {/* Home Automation */}
          <motion.div
            style={{ x: rightX }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

            <div className="relative glass-strong rounded-2xl overflow-hidden border border-white/10">
              {/* Image */}
              <motion.div
                className="relative h-64 overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src="/digital-infrastructure.jpg"
                  alt="Smart Home Automation - Connected living with mobile control, voice commands, and energy optimization by VYOMAKE"
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent" />

              {/* Title overlay */}
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center">
                    <Home className="w-5 h-5 text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Home Automation</h3>
                </div>
                <p className="text-white/60 text-sm">
                  Transform your living space into a smart home that responds to your lifestyle.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {homeFeatures.map((feature, i) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{feature.label}</div>
                    <div className="text-white/40 text-xs">{feature.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 mb-6">
            Ready to transform your space? Let's discuss your automation needs.
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium hover:shadow-glow transition-shadow"
          >
            Schedule a Consultation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default Automation;
