import type { Metadata } from 'next';
import { Outfit, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ['latin'],
    variable: '--font-ibm-plex-sans',
    display: 'swap',
    weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
    title: {
        default: 'VYOMAKE - Cosmic Ideas. Engineered Reality. | AI Solutions, SaaS & IoT Automation',
        template: '%s | VYOMAKE',
    },
    description:
        'VYOMAKE builds intelligent systems that bridge the gap between imagination and implementation. Services include Agentic AI Development, AI Teaching & Training, SaaS Development, IoT Manufacturing Automation, and Data Visualization Dashboards.',
    keywords: [
        'VYOMAKE',
        'Agentic AI',
        'AI Development',
        'AI Training',
        'SaaS',
        'IoT Automation',
        'Data Visualization',
        'Manufacturing Automation',
        'Office Automation',
        'Home Automation',
        'Digital Infrastructure',
        'Edge Computing',
        'Cloud Architecture',
        'Machine Learning',
    ],
    authors: [{ name: 'VYOMAKE' }],
    creator: 'VYOMAKE',
    publisher: 'VYOMAKE',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://vyomake.com/',
        siteName: 'VYOMAKE',
        title: 'VYOMAKE - Cosmic Ideas. Engineered Reality.',
        description:
            'We build intelligent systems that bridge the gap between imagination and implementation. Transforming visionary concepts into AI-powered engineered solutions.',
        images: [
            {
                url: 'https://vyomake.com/hero-cosmic.jpg',
                width: 1200,
                height: 630,
                alt: 'VYOMAKE - Cosmic Ideas. Engineered Reality.',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'VYOMAKE - Cosmic Ideas. Engineered Reality.',
        description:
            'We build intelligent systems that bridge the gap between imagination and implementation. Next-gen AI solutions.',
        images: ['https://vyomake.com/hero-cosmic.jpg'],
    },
    metadataBase: new URL('https://vyomake.com'),
    alternates: {
        canonical: '/',
    },
    icons: {
        icon: '/logo.png',
        apple: '/logo.png',
    },
    other: {
        'theme-color': '#0a0a0a',
    },
};

// JSON-LD Structured Data
const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VYOMAKE',
    url: 'https://vyomake.com',
    logo: 'https://vyomake.com/logo.png',
    description:
        'VYOMAKE builds intelligent systems that bridge the gap between imagination and implementation. Specializing in Agentic AI, SaaS, IoT Automation, and Data Visualization.',
    foundingDate: '2024',
    contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@vyomake.com',
        telephone: '+91 7906697847',
        contactType: 'customer service',
        areaServed: 'Worldwide',
    },
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bareilly',
        addressRegion: 'UP',
        addressCountry: 'IN',
    },
    sameAs: [
        'https://linkedin.com/company/vyomake',
        'https://twitter.com/vyomake',
        'https://github.com/vyomake',
    ],
};

const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VYOMAKE',
    url: 'https://vyomake.com',
    description: 'Cosmic Ideas. Engineered Reality. Next-Gen AI Solutions.',
    publisher: {
        '@type': 'Organization',
        name: 'VYOMAKE',
    },
};

const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'VYOMAKE Services',
    itemListElement: [
        {
            '@type': 'Service',
            position: 1,
            name: 'Agentic AI Development',
            description:
                'Autonomous AI agents that learn, adapt, and execute complex tasks with minimal human intervention.',
            provider: { '@type': 'Organization', name: 'VYOMAKE' },
        },
        {
            '@type': 'Service',
            position: 2,
            name: 'AI Teaching & Training',
            description:
                'Comprehensive AI education and workforce training programs for the next generation of tech leaders.',
            provider: { '@type': 'Organization', name: 'VYOMAKE' },
        },
        {
            '@type': 'Service',
            position: 3,
            name: 'Software as a Solution (SaaS)',
            description:
                'Scalable cloud-native applications designed for performance, security, and seamless user experience.',
            provider: { '@type': 'Organization', name: 'VYOMAKE' },
        },
        {
            '@type': 'Service',
            position: 4,
            name: 'Dashboarding & Data Visualization',
            description: 'Transform complex data into actionable insights with real-time, interactive visual analytics.',
            provider: { '@type': 'Organization', name: 'VYOMAKE' },
        },
        {
            '@type': 'Service',
            position: 5,
            name: 'IoT Manufacturing Automation',
            description: 'Smart factory solutions with connected sensors and intelligent process control for Industry 4.0.',
            provider: { '@type': 'Organization', name: 'VYOMAKE' },
        },
        {
            '@type': 'Service',
            position: 6,
            name: 'Office & Home Automation',
            description: 'Intelligent environments that adapt to your needs and optimize energy usage.',
            provider: { '@type': 'Organization', name: 'VYOMAKE' },
        },
        {
            '@type': 'Service',
            position: 7,
            name: 'Digital Infrastructure',
            description: 'Robust digital backbone for manual operations transformation.',
            provider: { '@type': 'Organization', name: 'VYOMAKE' },
        },
        {
            '@type': 'Service',
            position: 8,
            name: 'Edge Computing',
            description: 'Low-latency processing at the edge for real-time decision making.',
            provider: { '@type': 'Organization', name: 'VYOMAKE' },
        },
    ],
};

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What services does VYOMAKE offer?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'VYOMAKE offers Agentic AI Development, AI Teaching & Training, SaaS Development, Dashboarding & Data Visualization, IoT Manufacturing Automation, Office & Home Automation, Digital Infrastructure, and Edge Computing solutions.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is Agentic AI Development?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Agentic AI Development involves building autonomous AI agents that learn, adapt, and execute complex tasks with minimal human intervention. This includes Autonomous Decision Making, Multi-Agent Systems, Reinforcement Learning, and Natural Language Processing.',
            },
        },
        {
            '@type': 'Question',
            name: 'How can I contact VYOMAKE?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'You can reach VYOMAKE at info@vyomake.com or call +91 7906697847. They are located in Bareilly, UP.',
            },
        },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${outfit.variable} ${ibmPlexSans.variable}`}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
