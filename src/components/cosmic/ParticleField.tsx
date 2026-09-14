'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
}

function ParticleSystem({ count = 200, color = '#7e43ff', size = 2, speed = 0.3 }: ParticleSystemProps) {
  const meshRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      
      velocities[i * 3] = (Math.random() - 0.5) * speed * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * speed * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * speed * 0.005;
    }
    
    return [positions, velocities];
  }, [count, speed]);

  const colors = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const colorObj = new THREE.Color(color);
    
    for (let i = 0; i < count; i++) {
      const variation = 0.3;
      colors[i * 3] = Math.min(1, colorObj.r + (Math.random() - 0.5) * variation);
      colors[i * 3 + 1] = Math.min(1, colorObj.g + (Math.random() - 0.5) * variation);
      colors[i * 3 + 2] = Math.min(1, colorObj.b + (Math.random() - 0.5) * variation);
    }
    
    return colors;
  }, [count, color]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const positionArray = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      positionArray[i3] += velocities[i3] + Math.sin(time * 0.5 + i * 0.1) * 0.002;
      positionArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.3 + i * 0.1) * 0.002;
      positionArray[i3 + 2] += velocities[i3 + 2];
      
      // Boundary wrapping
      if (positionArray[i3] > 10) positionArray[i3] = -10;
      if (positionArray[i3] < -10) positionArray[i3] = 10;
      if (positionArray[i3 + 1] > 10) positionArray[i3 + 1] = -10;
      if (positionArray[i3 + 1] < -10) positionArray[i3 + 1] = 10;
      if (positionArray[i3 + 2] > 5) positionArray[i3 + 2] = -5;
      if (positionArray[i3 + 2] < -5) positionArray[i3 + 2] = 5;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.02;
  });

  const positionAttribute = useMemo(() => {
    return new THREE.BufferAttribute(positions, 3);
  }, [positions]);

  const colorAttribute = useMemo(() => {
    return new THREE.BufferAttribute(colors, 3);
  }, [colors]);

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={positionAttribute} />
        <primitive attach="attributes-color" object={colorAttribute} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ConnectionLines({ count = 100 }: { count?: number }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const [positions, linePositions] = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      positions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5
      ));
    }
    
    const linePositions = new Float32Array(count * count * 6);
    return [positions, linePositions];
  }, [count]);

  useFrame((state) => {
    if (!linesRef.current) return;
    
    const time = state.clock.elapsedTime;
    const posArray = linesRef.current.geometry.attributes.position.array as Float32Array;
    let idx = 0;
    
    for (let i = 0; i < count; i++) {
      positions[i].x += Math.sin(time * 0.2 + i) * 0.002;
      positions[i].y += Math.cos(time * 0.15 + i) * 0.002;
    }
    
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dist = positions[i].distanceTo(positions[j]);
        if (dist < 2.5) {
          posArray[idx++] = positions[i].x;
          posArray[idx++] = positions[i].y;
          posArray[idx++] = positions[i].z;
          posArray[idx++] = positions[j].x;
          posArray[idx++] = positions[j].y;
          posArray[idx++] = positions[j].z;
        }
      }
    }
    
    // Fill remaining with zeros
    while (idx < posArray.length) {
      posArray[idx++] = 0;
    }
    
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const lineAttribute = useMemo(() => {
    return new THREE.BufferAttribute(linePositions, 3);
  }, [linePositions]);

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={lineAttribute} />
      </bufferGeometry>
      <lineBasicMaterial color="#7e43ff" transparent opacity={0.15} />
    </lineSegments>
  );
}

function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  
  const orbs = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4
      ] as [number, number, number],
      scale: 0.3 + Math.random() * 0.5,
      color: i % 2 === 0 ? '#7e43ff' : '#3b82f6',
      speed: 0.5 + Math.random() * 0.5
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    
    groupRef.current.children.forEach((child, i) => {
      child.position.y += Math.sin(time * orbs[i].speed + i) * 0.003;
      child.rotation.x = time * 0.1 * orbs[i].speed;
      child.rotation.y = time * 0.15 * orbs[i].speed;
    });
  });

  return (
    <group ref={groupRef}>
      {orbs.map((orb, i) => (
        <mesh key={i} position={orb.position} scale={orb.scale}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial 
            color={orb.color} 
            transparent 
            opacity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleField() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSystem count={300} color="#7e43ff" size={0.05} speed={0.5} />
        <ParticleSystem count={200} color="#3b82f6" size={0.04} speed={0.3} />
        <ParticleSystem count={150} color="#06b6d4" size={0.03} speed={0.4} />
        <ConnectionLines count={80} />
        <FloatingOrbs />
      </Canvas>
    </div>
  );
}
