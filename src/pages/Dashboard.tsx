import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getTrendingCareers } from '../data/careers';
import { Compass, Brain, Bookmark, BarChart3, TrendingUp, ArrowRight, Star, Users, Zap } from 'lucide-react';

const trending = getTrendingCareers().slice(0, 6);

const wrap = { maxWidth: 1200, margin: '0 auto', padding: '32px 24px 100px' };

const card = (extra: object = {}) => ({
    background: '#111113', border: '1px solid #242426', borderRadius: 18,
    padding: '20px 22px', transition: 'border-color 0.2s, transform 0.2s',
    ...extra,
});

const demandClr: Record<string, string> = {
    Explosive: '#34d399', 'Very High': '#60a5fa', High: '#fbbf24', Medium: '#a8a8a4', Low: '#6b6b68',
};
const demandBg: Record<string, string> = {
    Explosive: 'rgba(52,211,153,0.1)', 'Very High': 'rgba(96,165,250,0.1)', High: 'rgba(251,191,36,0.1)', Medium: 'rgba(42,42,45,1)', Low: 'rgba(42,42,45,1)',
};

const quickLinks = [
    { to: '/explore', icon: Compass, label: 'Career Graph', desc: 'Explore interactive career tree', color: '#c87830' },
    { to: '/quiz', icon: Brain, label: 'AI Career Quiz', desc: 'Find careers matching your personality', color: '#34d399' },
    { to: '/saved', icon: Bookmark, label: 'Saved Careers', desc: 'View your bookmarked careers', color: '#60a5fa' },
    { to: '/compare', icon: BarChart3, label: 'Compare', desc: 'Compare two careers side by side', color: '#c084fc' },
];

const stats = [
    { label: 'Career Paths', value: '200+', icon: Compass, color: '#c87830' },
    { label: 'Indian Students', value: '12.8k', icon: Users, color: '#34d399' },
    { label: 'Career Streams', value: '8', icon: BarChart3, color: '#60a5fa' },
    { label: 'AI Accuracy', value: '99%', icon: Zap, color: '#c084fc' },
];

const streams = [
    { name: 'Science & Engineering', count: 50, icon: '⚙️' },
    { name: 'Medical & Healthcare', count: 17, icon: '🏥' },
    { name: 'Commerce & Finance', count: 20, icon: '📊' },
    { name: 'Arts & Humanities', count: 15, icon: '🎨' },
    { name: 'Creative Careers', count: 20, icon: '✨' },
    { name: 'Future & AI', count: 25, icon: '🚀' },
];

export default function Dashboard() {
    return (
        <div style={wrap}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 40 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 10 }}>Career Intelligence Dashboard</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, marginBottom: 10 }}>Discover Your Path 🚀</h1>
                <p style={{ color: '#a8a8a4', fontSize: 15, lineHeight: 1.6 }}>Explore 200+ Indian careers, take the AI quiz, and find your perfect future.</p>
            </motion.div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 36 }}>
                {stats.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                        style={card()}
                    >
                        <div style={{ width: 34, height: 34, borderRadius: 10, background: s.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                            <s.icon size={17} style={{ color: s.color }} />
                        </div>
                        <p style={{ fontSize: 26, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>{s.value}</p>
                        <p style={{ fontSize: 12, color: '#6b6b68', marginTop: 4 }}>{s.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ marginBottom: 36 }}>
                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 17, marginBottom: 14 }}>Quick Actions</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
                    {quickLinks.map((q) => (
                        <Link key={q.to} to={q.to} style={{ textDecoration: 'none' }}>
                            <motion.div whileHover={{ y: -5, borderColor: '#3a3a3d' }} style={card({ cursor: 'pointer', display: 'block' })}>
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: q.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                                    <q.icon size={20} style={{ color: q.color }} />
                                </div>
                                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, color: '#f5f5f4', marginBottom: 5 }}>{q.label}</p>
                                <p style={{ fontSize: 13, color: '#6b6b68' }}>{q.desc}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>

            {/* Two columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>

                {/* Trending */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <TrendingUp size={18} style={{ color: '#c87830' }} />
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16 }}>Trending in India</p>
                        </div>
                        <Link to="/explore" style={{ fontSize: 13, color: '#c87830', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                            View all <ArrowRight size={13} />
                        </Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {trending.map((c, i) => (
                            <Link key={c.slug} to={`/career/${c.slug}`} style={{ textDecoration: 'none' }}>
                                <motion.div whileHover={{ x: 4 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: 14, ...card({ padding: '14px 18px' }) }}
                                >
                                    <span style={{ fontSize: 15, fontWeight: 700, color: '#2a2a2d', fontFamily: 'Space Grotesk, sans-serif', minWidth: 20, textAlign: 'center' }}>{i + 1}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontWeight: 500, fontSize: 14, color: '#f5f5f4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</p>
                                        <p style={{ fontSize: 12, color: '#6b6b68' }}>{c.category}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                                        <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, fontWeight: 500, background: demandBg[c.demandLevel], color: demandClr[c.demandLevel] }}>
                                            {c.demandLevel}
                                        </span>
                                        <span style={{ fontSize: 12, color: '#6b6b68', display: 'flex', alignItems: 'center', gap: 3 }}>
                                            <Star size={10} style={{ fill: '#c87830', color: '#c87830' }} /> {c.futureGrowth}%
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Career Streams */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16 }}>Career Streams</p>
                        <Link to="/explore" style={{ fontSize: 13, color: '#c87830', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                            Explore <ArrowRight size={13} />
                        </Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {streams.map((st, i) => (
                            <Link key={st.name} to="/explore" style={{ textDecoration: 'none' }}>
                                <motion.div whileHover={{ x: 4 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: 14, ...card({ padding: '14px 18px' }) }}
                                >
                                    <span style={{ fontSize: 24 }}>{st.icon}</span>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 500, fontSize: 14, color: '#f5f5f4' }}>{st.name}</p>
                                        <p style={{ fontSize: 12, color: '#6b6b68', marginTop: 2 }}>{st.count}+ careers</p>
                                    </div>
                                    <div style={{ width: 72, height: 5, borderRadius: 4, background: '#2a2a2d', overflow: 'hidden' }}>
                                        <motion.div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg,#c87830,#e8944a)' }}
                                            initial={{ width: 0 }} animate={{ width: `${(st.count / 55) * 100}%` }}
                                            transition={{ delay: 0.6 + i * 0.08, duration: 0.8 }}
                                        />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* CTA Banner */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                style={{ marginTop: 36, padding: '36px 40px', borderRadius: 24, background: 'linear-gradient(135deg, rgba(200,120,48,0.1), #111113)', border: '1px solid rgba(200,120,48,0.2)', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}
            >
                <div>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Not sure where to start?</h3>
                    <p style={{ color: '#a8a8a4', fontSize: 14 }}>Take our 5-minute AI quiz and discover careers built for your personality.</p>
                </div>
                <Link to="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 12, background: '#c87830', color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none', whiteSpace: 'nowrap' as const }}>
                    <Brain size={18} /> Take AI Quiz
                </Link>
            </motion.div>
        </div>
    );
}
