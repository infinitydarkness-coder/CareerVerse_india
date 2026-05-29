export interface CareerCategory {
    id: string;
    name: string;
    icon: string;
    children: (CareerCategory | string)[];
}

export const careerTree: CareerCategory[] = [
    {
        id: 'science', name: 'Science', icon: '🔬',
        children: [
            {
                id: 'engineering', name: 'Engineering', icon: '⚙️',
                children: [
                    'computer-engineering', 'information-technology', 'ai-data-science',
                    'cybersecurity', 'cloud-computing', 'software-engineering', 'extc',
                    'electrical-engineering', 'mechanical-engineering', 'civil-engineering',
                    'chemical-engineering', 'aerospace-engineering', 'robotics-engineering',
                    'mechatronics', 'automobile-engineering', 'petroleum-engineering',
                    'marine-engineering', 'biomedical-engineering', 'environmental-engineering',
                    'industrial-engineering', 'mining-engineering', 'production-engineering',
                    'metallurgy-engineering'
                ]
            },
            {
                id: 'medical', name: 'Medical', icon: '🏥',
                children: [
                    'mbbs', 'bds', 'bams', 'bhms', 'pharmacy', 'physiotherapy', 'nursing',
                    'veterinary-science', 'clinical-research', 'biotechnology', 'microbiology',
                    'genetics', 'public-health', 'nutritionist', 'radiology', 'lab-technician',
                    'occupational-therapy'
                ]
            },
            {
                id: 'research', name: 'Research & Science', icon: '🧪',
                children: [
                    'physics', 'chemistry', 'mathematics', 'astronomy', 'astrophysics',
                    'space-science', 'nanotechnology', 'geology', 'environmental-science'
                ]
            }
        ]
    },
    {
        id: 'commerce', name: 'Commerce', icon: '📊',
        children: [
            'chartered-accountant', 'company-secretary', 'cma', 'investment-banker',
            'financial-analyst', 'stock-market-trader', 'accountant', 'tax-consultant',
            'auditor', 'digital-marketing', 'e-commerce', 'fintech', 'business-analytics',
            'human-resource', 'international-business', 'entrepreneurship', 'mba',
            'banking', 'insurance', 'supply-chain-management'
        ]
    },
    {
        id: 'arts', name: 'Arts & Humanities', icon: '🎨',
        children: [
            'psychology', 'journalism', 'mass-communication', 'law', 'political-science',
            'sociology', 'social-work', 'history', 'geography', 'teaching', 'upsc-civil',
            'foreign-languages', 'philosophy', 'public-relations', 'event-management'
        ]
    },
    {
        id: 'creative', name: 'Creative Careers', icon: '✨',
        children: [
            'ui-ux-design', 'graphic-design', 'motion-graphics', 'animation', '3d-artist',
            'vfx-artist', 'game-designer', 'game-developer', 'film-making', 'video-editing',
            'photography', 'music-production', 'fashion-design', 'interior-design',
            'product-design', 'content-creator', 'script-writer', 'voice-artist'
        ]
    },
    {
        id: 'skill-based', name: 'Skill-Based', icon: '🛠️',
        children: [
            'ethical-hacking', 'web-development', 'app-development', 'freelancer',
            'seo-expert', 'social-media-manager', 'fitness-trainer', 'chef', 'baker',
            'makeup-artist', 'pilot', 'cabin-crew', 'hotel-management', 'tourism',
            'event-planner'
        ]
    },
    {
        id: 'government', name: 'Government', icon: '🏛️',
        children: [
            'upsc-civil', 'mpsc', 'ssc', 'banking-exams', 'railways', 'defense', 'navy',
            'air-force', 'police', 'forest-officer', 'income-tax-officer', 'rbi-grade-b',
            'psu-jobs'
        ]
    },
    {
        id: 'future', name: 'Future & Trending', icon: '🚀',
        children: [
            'ai-engineer', 'prompt-engineer', 'ml-engineer', 'data-scientist',
            'cybersecurity-analyst', 'cloud-engineer', 'devops-engineer',
            'blockchain-developer', 'ar-vr-developer', 'quantum-computing',
            'product-manager', 'digital-creator', 'ai-content-strategist',
            'automation-engineer', 'sustainability-consultant', 'renewable-energy',
            'drone-engineer', 'ai-healthcare', 'bioinformatics'
        ]
    }
];
