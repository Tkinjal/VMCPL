'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Play, ChevronDown, Sparkles, Zap, Cpu } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Interactive floating orb that follows mouse
function InteractiveOrb({
  color,
  size,
  initialX,
  initialY,
  mouseX,
  mouseY
}: {
  color: string;
  size: number;
  initialX: number;
  initialY: number;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = initialX + springX.get() * 2;
      meshRef.current.position.y = initialY + springY.get() * 2;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
    }
  });

  return (
    <mesh ref={meshRef} position={[initialX, initialY, 0]}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
}

// Orbiting rings component with scroll-based speed
function OrbitRings({ scrollProgress }: { scrollProgress: ReturnType<typeof useMotionValue<number>> }) {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const speed = 1 + scrollProgress.get() * 2;

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.05 * speed;
      ring1Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.03 * speed;
      ring2Ref.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.08) * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = state.clock.elapsedTime * 0.02 * speed;
      ring3Ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.15;
    }
  });

  return (
    <group>
      <mesh ref={ring1Ref} rotation={[0, 0, 0]}>
        <torusGeometry args={[4, 0.02, 16, 100]} />
        <meshBasicMaterial color="#7e43ff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[3.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

// Animated character for text reveal
function AnimatedChar({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 100, rotateX: 90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.19, 1, 0.22, 1],
      }}
      className="inline-block"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

// Split text animation component
function SplitText({ text, baseDelay = 0 }: { text: string; baseDelay?: number }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <AnimatedChar key={i} char={char} delay={baseDelay + i * 0.03} />
      ))}
    </>
  );
}

// Floating interactive element
function FloatingElement({
  children,
  delay = 0,
  left = '0%',
  top = '0%',
  className = ''
}: {
  children: React.ReactNode;
  delay?: number;
  left?: string;
  top?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      className={`absolute ${className}`}
      style={{ left, top }}
      whileHover={{
        scale: 1.2,
        rotate: 10,
        transition: { type: 'spring', stiffness: 300 }
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(-y);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y, scale }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/hero-cosmic.jpg)',
            transform: 'scale(1.1)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/60 via-dark-950/40 to-dark-950" />
      </motion.div>

      {/* 3D Orbit rings with interactive orbs */}
      <div className="absolute inset-0 z-[1]">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <OrbitRings scrollProgress={scrollYProgress} />
          <InteractiveOrb color="#7e43ff" size={0.15} initialX={-3} initialY={2} mouseX={mouseX} mouseY={mouseY} />
          <InteractiveOrb color="#3b82f6" size={0.12} initialX={3.5} initialY={-1.5} mouseX={mouseX} mouseY={mouseY} />
          <InteractiveOrb color="#06b6d4" size={0.1} initialX={2} initialY={2.5} mouseX={mouseX} mouseY={mouseY} />
        </Canvas>
      </div>

      {/* Floating interactive elements */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <FloatingElement delay={2} left="10%" top="20%" className="pointer-events-auto">
          <div className="w-12 h-12 rounded-xl glass flex items-center justify-center cursor-pointer hover:bg-purple-500/30 transition-colors">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
        </FloatingElement>

        <FloatingElement delay={2.3} left="85%" top="30%" className="pointer-events-auto">
          <div className="w-10 h-10 rounded-lg glass flex items-center justify-center cursor-pointer hover:bg-blue-500/30 transition-colors">
            <Zap className="w-5 h-5 text-blue-400" />
          </div>
        </FloatingElement>

        <FloatingElement delay={2.6} left="15%" top="70%" className="pointer-events-auto">
          <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center cursor-pointer hover:bg-cyan-500/30 transition-colors">
            <Cpu className="w-7 h-7 text-cyan-400" />
          </div>
        </FloatingElement>

        <FloatingElement delay={2.9} left="80%" top="75%" className="pointer-events-auto">
          <motion.div
            className="px-4 py-2 rounded-full glass flex items-center gap-2 cursor-pointer hover:bg-purple-500/20 transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/70">AI Active</span>
          </motion.div>
        </FloatingElement>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          opacity,
          rotateX,
          transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
        }}
      >
        {/* Badge with hover effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 cursor-pointer hover:bg-purple-500/20 transition-colors"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-sm text-white/70">Next-Gen AI Solutions</span>
        </motion.div>

        {/* Main heading with hover glow */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-outfit mb-6 perspective-1000"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="block text-white mb-2">
            <SplitText text="Cosmic Ideas." baseDelay={0.2} />
          </span>
          <span className="block">
            <SplitText text="Engineered Reality." baseDelay={0.6} />
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10"
        >
          We build intelligent systems that bridge the gap between imagination
          and implementation. Transforming visionary concepts into engineered solutions.
        </motion.p>

        {/* CTA Buttons with enhanced hover */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 1.5,
            ease: [0.34, 1.56, 0.64, 1]
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={scrollToServices}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white font-medium overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 40px rgba(126, 67, 255, 0.5)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Our Expertise
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="group flex items-center gap-3 px-6 py-4 glass rounded-xl text-white/80 hover:text-white transition-all hover:bg-white/10"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Play className="w-4 h-4 ml-0.5" />
            </motion.div>
            <span className="font-medium">Watch Demo</span>
          </motion.button>
        </motion.div>

        {/* Stats with hover animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '150+', label: 'Projects' },
            { value: '50+', label: 'Clients' },
            { value: '99%', label: 'Uptime' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center cursor-pointer group"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="text-2xl md:text-3xl font-bold text-gradient group-hover:glow-text transition-all"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-white/50 group-hover:text-white/70 transition-colors">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40 cursor-pointer hover:text-white/70 transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-950 to-transparent z-[5]" />
    </section>
  );
}

export default Hero;
