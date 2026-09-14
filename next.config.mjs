/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode
    reactStrictMode: true,

    // Transpile Three.js related packages
    transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

    // Image optimization enabled for Vercel
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'vyomake.com',
            },
        ],
    },

    // Turbopack config (Next.js 16 default)
    turbopack: {},
};

export default nextConfig;
