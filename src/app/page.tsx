'use client';

import { useEffect } from 'react';
import { Navigation } from '@/components/cosmic/Navigation';
import dynamic from 'next/dynamic';
import { Hero } from '@/sections/Hero';
import { CustomerLogos } from '@/sections/CustomerLogos';
import { Services } from '@/sections/Services';
import { Manufacturing } from '@/sections/Manufacturing';
import { Dashboard } from '@/sections/Dashboard';
import { Automation } from '@/sections/Automation';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

// Dynamic import for Three.js - only load on client
const ParticleField = dynamic(
    () => import('@/components/cosmic/ParticleField'),
    { ssr: false }
);

export default function HomePage() {
    useEffect(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
        return () => {
            document.documentElement.style.scrollBehavior = 'auto';
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-dark-950 text-white overflow-x-hidden">
            {/* Particle background */}
            <ParticleField />

            {/* Navigation */}
            <Navigation />

            {/* Main content */}
            <main className="relative z-10">
                <Hero />
                <CustomerLogos />
                <Services />
                <Manufacturing />
                <Dashboard />
                <Automation />
                <Contact />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
