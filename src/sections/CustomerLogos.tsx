'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// Customer data with project counts
const customers = [
  {
    name: 'Dixon',
    projects: 3,
    color: '#7e43ff',
    logo: 'DX',
    logoSrc: '/dixon-logo.png' // Add the uploaded image to the public folder with this name
  },
  {
    name: 'Padget',
    projects: 2,
    color: '#3b82f6',
    logo: 'PG',
    logoSrc: '/padget-logo.png' // Add a padget logo to the public folder too
  },
  {
    name: 'DataFlow',
    projects: 15,
    color: '#06b6d4',
    logo: 'DF'
  },
  {
    name: 'CloudNine',
    projects: 6,
    color: '#8b5cf6',
    logo: 'C9'
  },
  {
    name: 'AIVentures',
    projects: 10,
    color: '#ec4899',
    logo: 'AI'
  },
  {
    name: 'SmartSys',
    projects: 7,
    color: '#10b981',
    logo: 'SS'
  },
];

function LogoCard({
  customer,
  index
}: {
  customer: typeof customers[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${customer.color}30 0%, transparent 70%)`,
        }}
        animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity }}
      />

      {/* Card */}
      <motion.div
        className="relative glass-strong rounded-xl p-6 border border-white/10 overflow-hidden"
        whileHover={{
          scale: 1.05,
          borderColor: `${customer.color}50`,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {/* Pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2"
          style={{ borderColor: customer.color }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.3,
          }}
        />

        {/* Logo */}
        <div className="flex items-center justify-center mb-4">
          <motion.div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${customer.color}30, ${customer.color}10)`,
              color: customer.color,
            }}
            animate={isHovered ? {
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1],
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {customer.logoSrc ? (
              <img
                src={customer.logoSrc}
                alt={`${customer.name} logo`}
                className="w-full h-full object-contain p-0"
                onError={(e) => {
                  // Fallback to text if image fails to load
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const span = document.createElement('span');
                    span.innerText = customer.logo;
                    parent.appendChild(span);
                  }
                }}
              />
            ) : (
              customer.logo
            )}
          </motion.div>
        </div>

        {/* Company name */}
        <h4 className="text-white font-semibold text-center mb-2">{customer.name}</h4>

        {/* Project count with pulse */}
        <div className="flex items-center justify-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: customer.color }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span className="text-white/60 text-sm">
            {customer.projects} Projects
          </span>
        </div>

        {/* Hover reveal stats */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? 'auto' : 0
          }}
          className="mt-4 pt-4 border-t border-white/10 overflow-hidden"
        >
          <div className="flex justify-between text-xs">
            <span className="text-white/40">Success Rate</span>
            <span className="text-green-400">98%</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-white/40">Satisfaction</span>
            <span className="text-purple-400">4.9/5</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function CustomerLogos() {
  const totalProjects = customers.reduce((sum, c) => sum + c.projects, 0);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full glass text-sm text-purple-300 mb-4"
          >
            Trusted Partners
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold font-outfit text-white mb-4">
            Companies We <span className="text-gradient">Work With</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Proud to partner with industry leaders in their digital transformation journey
          </p>
        </motion.div>

        {/* Total projects counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <motion.div
            className="glass-strong rounded-2xl px-8 py-4 flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(126, 67, 255, 0.3)',
                  '0 0 40px rgba(126, 67, 255, 0.5)',
                  '0 0 20px rgba(126, 67, 255, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white font-bold text-xl">{totalProjects}</span>
            </motion.div>
            <div>
              <div className="text-white font-semibold">Total Projects Delivered</div>
              <div className="text-white/50 text-sm">Across all partnerships</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Logo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {customers.map((customer, i) => (
            <LogoCard key={customer.name} customer={customer} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-white/50 text-sm mb-4">
            Join our growing list of satisfied clients
          </p>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 glass rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            Become a Partner
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default CustomerLogos;
