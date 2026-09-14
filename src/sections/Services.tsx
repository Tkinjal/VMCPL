'use client';

import { motion, type TargetAndTransition } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { 
  Brain, 
  GraduationCap, 
  Cloud, 
  BarChart3,
  Cpu,
  Home,
  Factory,
  Network
} from 'lucide-react';
import { ServiceCard } from '../components/cosmic/ServiceCard';

interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  gradient: string;
  iconAnimation: TargetAndTransition;
}

interface AdditionalServiceItem {
  title: string;
  icon: LucideIcon;
  description: string;
  iconAnimation: TargetAndTransition;
}

const services: ServiceItem[] = [
  {
    title: 'Agentic AI Development',
    description: 'Autonomous AI agents that learn, adapt, and execute complex tasks with minimal human intervention.',
    icon: Brain,
    features: [
      'Autonomous Decision Making',
      'Multi-Agent Systems',
      'Reinforcement Learning',
      'Natural Language Processing',
    ],
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconAnimation: {
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1],
    },
  },
  {
    title: 'AI Teaching & Training',
    description: 'Comprehensive AI education and workforce training programs for the next generation of tech leaders.',
    icon: GraduationCap,
    features: [
      'Custom Curriculum Design',
      'Hands-on Workshops',
      'Enterprise Training',
      'Certification Programs',
    ],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconAnimation: {
      y: [0, -5, 0],
      rotate: [0, 5, 0],
    },
  },
  {
    title: 'Software as a Solution (SaaS)',
    description: 'Scalable cloud-native applications designed for performance, security, and seamless user experience.',
    icon: Cloud,
    features: [
      'Cloud Architecture',
      'Microservices Design',
      'API Development',
      'DevOps Integration',
    ],
    gradient: 'from-cyan-500/20 to-teal-500/20',
    iconAnimation: {
      x: [0, 3, -3, 0],
      y: [0, -3, 0],
    },
  },
  {
    title: 'Dashboarding & Data Visualization',
    description: 'Transform complex data into actionable insights with real-time, interactive visual analytics.',
    icon: BarChart3,
    features: [
      'Real-time Analytics',
      'Interactive Reports',
      'Custom Visualizations',
      'Predictive Insights',
    ],
    gradient: 'from-orange-500/20 to-red-500/20',
    iconAnimation: {
      scaleY: [1, 1.2, 0.8, 1],
      rotate: [0, 5, -5, 0],
    },
  },
];

const additionalServices: AdditionalServiceItem[] = [
  {
    title: 'IoT Manufacturing Automation',
    icon: Factory,
    description: 'Smart factory solutions with connected sensors and intelligent process control.',
    iconAnimation: {
      rotate: [0, 360],
    },
  },
  {
    title: 'Office & Home Automation',
    icon: Home,
    description: 'Intelligent environments that adapt to your needs and optimize energy usage.',
    iconAnimation: {
      scale: [1, 1.2, 1],
      y: [0, -5, 0],
    },
  },
  {
    title: 'Digital Infrastructure',
    icon: Network,
    description: 'Robust digital backbone for manual operations transformation.',
    iconAnimation: {
      opacity: [1, 0.5, 1],
      scale: [1, 1.1, 1],
    },
  },
  {
    title: 'Edge Computing',
    icon: Cpu,
    description: 'Low-latency processing at the edge for real-time decision making.',
    iconAnimation: {
      rotate: [0, 180, 360],
      scale: [1, 1.1, 1],
    },
  },
];

// Animated icon component
function AnimatedIcon({ 
  icon: Icon, 
  animation,
  className 
}: { 
  icon: typeof Brain;
  animation: TargetAndTransition;
  className?: string;
}) {
  return (
    <motion.div
      animate={animation}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale: 1.3,
        rotate: 15,
        transition: { duration: 0.3 }
      }}
    >
      <Icon className={className} />
    </motion.div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-cosmic opacity-50" />
      
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
            className="inline-block px-4 py-1.5 rounded-full glass text-sm text-purple-300 mb-4"
          >
            Our Expertise
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit text-white mb-4">
            End-to-End <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From concept to deployment, we deliver comprehensive digital solutions 
            that drive innovation and accelerate growth.
          </p>
        </motion.div>

        {/* Main service cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={i * 0.1}
            />
          ))}
        </div>

        {/* Additional services with animated icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {additionalServices.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass rounded-xl p-4 text-center group cursor-pointer hover:bg-white/10 transition-all"
            >
              {/* Animated icon container */}
              <motion.div 
                className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center mb-3 group-hover:from-purple-500/50 group-hover:to-blue-500/50 transition-all relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
              >
                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <AnimatedIcon 
                  icon={service.icon} 
                  animation={service.iconAnimation}
                  className="w-6 h-6 text-purple-300 relative z-10"
                />
              </motion.div>
              <h4 className="text-sm font-semibold text-white mb-1">{service.title}</h4>
              <p className="text-xs text-white/50 line-clamp-2">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Services;
