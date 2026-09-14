'use client';

import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';
import Image from 'next/image';

const footerLinks = {
  services: [
    { label: 'Agentic AI', href: '#' },
    { label: 'AI Training', href: '#' },
    { label: 'SaaS Development', href: '#' },
    { label: 'Data Visualization', href: '#' },
  ],
  solutions: [
    { label: 'Manufacturing', href: '#' },
    { label: 'Office Automation', href: '#' },
    { label: 'Home Automation', href: '#' },
    { label: 'Digital Infrastructure', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#contact' },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-16 border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-pink-500/5 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.a
              href="#"
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="relative w-20 h-20 flex items-center justify-center"
                whileHover={{
                  rotate: [0, -5, 5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(236, 72, 153, 0.3)',
                      '0 0 30px rgba(249, 115, 22, 0.3)',
                      '0 0 20px rgba(236, 72, 153, 0.3)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Image
                  src="/logo.png"
                  alt="VYOMAKE Logo - Cosmic Ideas Engineered Reality"
                  className="w-full h-full object-contain"
                  width={80}
                  height={80}
                />
              </motion.div>
            </motion.a>
            <p className="text-white/50 text-sm max-w-sm mb-6">
              Cosmic Ideas. Engineered Reality. We transform visionary concepts
              into intelligent, engineered systems that shape the future.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-pink-500/50"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg text-white text-sm font-medium hover:shadow-glow transition-shadow">
                Subscribe
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1 text-white/40 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span>by VYOMAKE Team</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-white/40 text-sm">
              © 2026 VYOMAKE. All rights reserved.
            </span>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-pink-500/30 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 text-white/70" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
