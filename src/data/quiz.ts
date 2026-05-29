export interface QuizQuestion {
    id: string;
    category: string;
    question: string;
    type: 'slider' | 'emoji' | 'multiselect' | 'single';
    options?: { label: string; emoji?: string; value: string }[];
    min?: number; max?: number;
    weights: Record<string, number[]>;
}

export const quizQuestions: QuizQuestion[] = [
    {
        id: 'subjects', category: 'Academic', question: 'Which subjects do you enjoy the most?',
        type: 'multiselect',
        options: [
            { label: 'Mathematics', emoji: '🔢', value: 'math' },
            { label: 'Physics', emoji: '⚛️', value: 'physics' },
            { label: 'Chemistry', emoji: '🧪', value: 'chemistry' },
            { label: 'Biology', emoji: '🧬', value: 'biology' },
            { label: 'Computer Science', emoji: '💻', value: 'cs' },
            { label: 'Economics', emoji: '📈', value: 'economics' },
            { label: 'History', emoji: '📜', value: 'history' },
            { label: 'English/Languages', emoji: '📝', value: 'languages' },
            { label: 'Art/Drawing', emoji: '🎨', value: 'art' },
        ],
        weights: { math: [1, 0, 0, 0, 1], physics: [1, 0, 0, 0, 0], cs: [1, 0, 0, 1, 1], biology: [0, 1, 0, 0, 0], economics: [0, 0, 1, 0, 0], art: [0, 0, 0, 0, 0] }
    },
    {
        id: 'personality', category: 'Personality', question: 'How would you describe yourself?',
        type: 'single',
        options: [
            { label: 'Introvert - I prefer working alone', emoji: '🧑‍💻', value: 'introvert' },
            { label: 'Extrovert - I love teamwork', emoji: '🎤', value: 'extrovert' },
            { label: 'Ambivert - Depends on the situation', emoji: '🔄', value: 'ambivert' },
        ],
        weights: { introvert: [1, 0, 0, 1, 1], extrovert: [0, 1, 1, 0, 0], ambivert: [1, 1, 1, 1, 1] }
    },
    {
        id: 'thinking', category: 'Personality', question: 'Are you more creative or analytical?',
        type: 'single',
        options: [
            { label: 'Analytical - I love solving problems logically', emoji: '🧠', value: 'analytical' },
            { label: 'Creative - I love creating new things', emoji: '✨', value: 'creative' },
            { label: 'Both equally', emoji: '⚖️', value: 'both' },
        ],
        weights: { analytical: [1, 0, 1, 1, 1], creative: [0, 0, 0, 0, 0], both: [1, 0, 1, 1, 1] }
    },
    {
        id: 'tech-interest', category: 'Interest', question: 'How interested are you in technology?',
        type: 'slider', min: 1, max: 10,
        weights: {}
    },
    {
        id: 'coding', category: 'Interest', question: 'Do you enjoy coding / programming?',
        type: 'single',
        options: [
            { label: 'Love it!', emoji: '💖', value: 'love' },
            { label: 'It\'s okay', emoji: '👍', value: 'okay' },
            { label: 'Not really', emoji: '😅', value: 'no' },
            { label: 'Never tried', emoji: '🤷', value: 'never' },
        ],
        weights: { love: [1, 0, 0, 1, 1], okay: [1, 0, 0, 0, 1], no: [0, 1, 1, 0, 0], never: [0, 0, 0, 0, 0] }
    },
    {
        id: 'hobbies', category: 'Hobbies', question: 'Pick your favorite hobbies',
        type: 'multiselect',
        options: [
            { label: 'Gaming', emoji: '🎮', value: 'gaming' },
            { label: 'Drawing/Art', emoji: '🎨', value: 'drawing' },
            { label: 'Reading', emoji: '📚', value: 'reading' },
            { label: 'Coding', emoji: '👨‍💻', value: 'coding' },
            { label: 'Music', emoji: '🎵', value: 'music' },
            { label: 'Sports/Fitness', emoji: '🏃', value: 'sports' },
            { label: 'Video Editing', emoji: '🎬', value: 'video' },
            { label: 'Writing', emoji: '✍️', value: 'writing' },
            { label: 'Photography', emoji: '📸', value: 'photography' },
            { label: 'Business Ideas', emoji: '💡', value: 'business' },
        ],
        weights: {}
    },
    {
        id: 'salary', category: 'Lifestyle', question: 'How important is a high salary to you?',
        type: 'slider', min: 1, max: 10,
        weights: {}
    },
    {
        id: 'worklife', category: 'Lifestyle', question: 'How important is work-life balance?',
        type: 'slider', min: 1, max: 10,
        weights: {}
    },
    {
        id: 'remote', category: 'Lifestyle', question: 'Do you prefer working from home?',
        type: 'single',
        options: [
            { label: 'Yes, remote work is a must', emoji: '🏠', value: 'yes' },
            { label: 'Hybrid is fine', emoji: '🔄', value: 'hybrid' },
            { label: 'I prefer office/fieldwork', emoji: '🏢', value: 'no' },
        ],
        weights: {}
    },
    {
        id: 'risk', category: 'Personality', question: 'Are you comfortable with career risks?',
        type: 'single',
        options: [
            { label: 'I love risks and challenges', emoji: '🚀', value: 'high' },
            { label: 'Moderate risk is fine', emoji: '⚡', value: 'moderate' },
            { label: 'I prefer stability', emoji: '🏛️', value: 'low' },
        ],
        weights: {}
    },
    {
        id: 'helping', category: 'Interest', question: 'Do you enjoy helping others?',
        type: 'slider', min: 1, max: 10,
        weights: {}
    },
    {
        id: 'leadership', category: 'Personality', question: 'Do you see yourself as a leader?',
        type: 'single',
        options: [
            { label: 'Born leader!', emoji: '👑', value: 'yes' },
            { label: 'Sometimes', emoji: '🙋', value: 'sometimes' },
            { label: 'I prefer following', emoji: '🤝', value: 'no' },
        ],
        weights: {}
    },
];

export interface QuizResult {
    careerSlug: string;
    careerName: string;
    matchPercentage: number;
    reasons: string[];
    strengths: string[];
    improvementAreas: string[];
}

export function calculateRecommendations(answers: Record<string, any>): QuizResult[] {
    const scores: Record<string, number> = {};
    const reasonsMap: Record<string, string[]> = {};

    const careerProfiles: Record<string, { tags: string[]; maxScore: number; reasons: Record<string, string> }> = {
        'computer-engineering': { tags: ['math', 'cs', 'coding-love', 'analytical', 'tech-high', 'gaming'], maxScore: 60, reasons: { math: 'Strong math foundation', cs: 'Interest in computer science', 'coding-love': 'Passion for coding', analytical: 'Analytical thinking', 'tech-high': 'High tech interest' } },
        'ai-data-science': { tags: ['math', 'cs', 'coding-love', 'analytical', 'tech-high', 'reading'], maxScore: 60, reasons: { math: 'Mathematical aptitude', cs: 'CS background', 'coding-love': 'Coding enthusiasm', analytical: 'Strong analytical skills', 'tech-high': 'Technology passion' } },
        'cybersecurity': { tags: ['cs', 'coding-love', 'analytical', 'tech-high', 'gaming', 'risk-high'], maxScore: 60, reasons: { cs: 'Tech background', 'coding-love': 'Coding skills', analytical: 'Problem-solving ability', 'tech-high': 'Technology passion', 'risk-high': 'Risk-taking attitude' } },
        'mbbs': { tags: ['biology', 'helping-high', 'reading', 'risk-low', 'extrovert'], maxScore: 50, reasons: { biology: 'Biology interest', 'helping-high': 'Desire to help others', reading: 'Love of learning' } },
        'chartered-accountant': { tags: ['math', 'economics', 'analytical', 'risk-low', 'reading'], maxScore: 50, reasons: { math: 'Math skills', economics: 'Economics interest', analytical: 'Analytical mindset' } },
        'ui-ux-design': { tags: ['art', 'drawing', 'creative', 'tech-high', 'photography'], maxScore: 50, reasons: { art: 'Artistic ability', drawing: 'Design skills', creative: 'Creative mindset', 'tech-high': 'Tech awareness' } },
        'game-developer': { tags: ['gaming', 'cs', 'coding-love', 'creative', 'tech-high'], maxScore: 50, reasons: { gaming: 'Gaming passion', cs: 'CS knowledge', 'coding-love': 'Coding love', creative: 'Creativity' } },
        'data-scientist': { tags: ['math', 'cs', 'analytical', 'tech-high', 'reading'], maxScore: 50, reasons: { math: 'Math foundation', analytical: 'Analytical thinking', 'tech-high': 'Tech interest' } },
        'psychology': { tags: ['helping-high', 'reading', 'writing', 'extrovert'], maxScore: 40, reasons: { 'helping-high': 'Empathy', reading: 'Intellectual curiosity' } },
        'digital-marketing': { tags: ['business', 'creative', 'writing', 'extrovert', 'video'], maxScore: 50, reasons: { business: 'Business mindset', creative: 'Creative skills', writing: 'Communication' } },
        'ethical-hacking': { tags: ['cs', 'coding-love', 'gaming', 'analytical', 'risk-high', 'tech-high'], maxScore: 60, reasons: { cs: 'Tech skills', gaming: 'Puzzle-solving', analytical: 'Analytical mind', 'risk-high': 'Adventurous spirit' } },
        'law': { tags: ['reading', 'writing', 'languages', 'analytical', 'extrovert'], maxScore: 50, reasons: { reading: 'Research aptitude', writing: 'Writing skills', analytical: 'Logical thinking' } },
        'web-development': { tags: ['cs', 'coding-love', 'creative', 'tech-high', 'art'], maxScore: 50, reasons: { cs: 'Tech background', 'coding-love': 'Coding passion', creative: 'Design sense' } },
        'software-engineering': { tags: ['math', 'cs', 'coding-love', 'analytical', 'tech-high'], maxScore: 50, reasons: { math: 'Math skills', cs: 'CS interest', 'coding-love': 'Programming love' } },
        'ai-engineer': { tags: ['math', 'cs', 'coding-love', 'analytical', 'tech-high', 'reading'], maxScore: 60, reasons: { math: 'Strong math', cs: 'CS foundation', 'coding-love': 'Code expertise', 'tech-high': 'Tech passion' } },
    };

    // Extract user tags from answers
    const userTags = new Set<string>();

    // Subjects
    const subjects = answers['subjects'] || [];
    subjects.forEach((s: string) => userTags.add(s));

    // Personality
    if (answers['personality'] === 'introvert') userTags.add('introvert');
    if (answers['personality'] === 'extrovert') userTags.add('extrovert');

    // Thinking
    if (answers['thinking'] === 'analytical') userTags.add('analytical');
    if (answers['thinking'] === 'creative') userTags.add('creative');
    if (answers['thinking'] === 'both') { userTags.add('analytical'); userTags.add('creative'); }

    // Tech interest (slider)
    const techLevel = answers['tech-interest'] || 5;
    if (techLevel >= 7) userTags.add('tech-high');

    // Coding
    if (answers['coding'] === 'love') userTags.add('coding-love');
    if (answers['coding'] === 'okay') userTags.add('coding-okay');

    // Hobbies
    const hobbies = answers['hobbies'] || [];
    hobbies.forEach((h: string) => userTags.add(h));

    // Risk
    if (answers['risk'] === 'high') userTags.add('risk-high');
    if (answers['risk'] === 'low') userTags.add('risk-low');

    // Helping
    const helpLevel = answers['helping'] || 5;
    if (helpLevel >= 7) userTags.add('helping-high');

    // Calculate scores
    Object.entries(careerProfiles).forEach(([slug, profile]) => {
        let score = 0;
        const matched: string[] = [];
        profile.tags.forEach(tag => {
            if (userTags.has(tag)) {
                score += 10;
                if (profile.reasons[tag]) matched.push(profile.reasons[tag]);
            }
        });
        scores[slug] = Math.min(99, Math.round((score / profile.maxScore) * 100));
        reasonsMap[slug] = matched;
    });

    const nameMap: Record<string, string> = {
        'computer-engineering': 'Computer Engineering',
        'ai-data-science': 'AI & Data Science',
        'cybersecurity': 'Cybersecurity',
        'mbbs': 'MBBS (Doctor)',
        'chartered-accountant': 'Chartered Accountant',
        'ui-ux-design': 'UI/UX Design',
        'game-developer': 'Game Developer',
        'data-scientist': 'Data Scientist',
        'psychology': 'Psychology',
        'digital-marketing': 'Digital Marketing',
        'ethical-hacking': 'Ethical Hacking',
        'law': 'Law',
        'web-development': 'Web Development',
        'software-engineering': 'Software Engineering',
        'ai-engineer': 'AI Engineer',
    };

    return Object.entries(scores)
        .map(([slug, score]) => ({
            careerSlug: slug,
            careerName: nameMap[slug] || slug,
            matchPercentage: score,
            reasons: reasonsMap[slug] || [],
            strengths: reasonsMap[slug]?.slice(0, 3) || [],
            improvementAreas: score < 50 ? ['Explore this field more', 'Try related online courses'] : [],
        }))
        .sort((a, b) => b.matchPercentage - a.matchPercentage)
        .slice(0, 10);
}
