'use client';

import { useRef, useState } from 'react';
import { motion, type TargetAndTransition } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  delay?: number;
  gradient?: string;
  iconAnimation?: TargetAndTransition;
}

export function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  features,
  delay = 0,
  gradient = 'from-purple-500/20 to-blue-500/20',
  iconAnimation = {
    rotate: [0, 5, -5, 0],
    scale: [1, 1.05, 1],
  }
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -10;
    const rotateY = (mouseX / (rect.width / 2)) * 10;
    
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.19, 1, 0.22, 1]
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group perspective-1000"
    >
      {/* Glow effect */}
      <div 
        className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
      />
      
      {/* Card */}
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative h-full glass-strong rounded-xl p-6 border border-white/10 overflow-hidden preserve-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(126, 67, 255, 0.3), transparent)',
              backgroundSize: '200% 100%',
            }}
            animate={isHovered ? {
              backgroundPosition: ['200% 0%', '-200% 0%'],
            } : {}}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        
        {/* Animated Icon */}
        <motion.div 
          className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center mb-4 group-hover:from-purple-500/50 group-hover:to-blue-500/50 transition-all duration-300 overflow-hidden"
          style={{ transform: 'translateZ(30px)' }}
          animate={isHovered ? {
            boxShadow: [
              '0 0 20px rgba(126, 67, 255, 0.3)',
              '0 0 40px rgba(126, 67, 255, 0.5)',
              '0 0 20px rgba(126, 67, 255, 0.3)',
            ]
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
          
          {/* Animated icon */}
          <motion.div
            animate={iconAnimation}
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
            <Icon className="w-7 h-7 text-purple-300" />
          </motion.div>
        </motion.div>
        
        {/* Content */}
        <div style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gradient transition-all duration-300">
            {title}
          </h3>
          <p className="text-white/60 text-sm mb-4 leading-relaxed">
            {description}
          </p>
          
          {/* Features */}
          <ul className="space-y-2">
            {features.map((feature, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.1 * i, duration: 0.5 }}
                className="flex items-center gap-2 text-sm text-white/70"
              >
                <motion.div 
                  className="w-1.5 h-1.5 rounded-full bg-purple-500"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>
        
        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-500 rounded-tr-lg" />
        </div>
        <div className="absolute bottom-0 left-0 w-20 h-20 opacity-10 group-hover:opacity-20 transition-opacity">
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-500 rounded-bl-lg" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ServiceCard;
