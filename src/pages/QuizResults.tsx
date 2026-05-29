import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { calculateRecommendations, type QuizResult } from '../data/quiz';
import { TrendingUp, RotateCcw, ArrowRight, Bookmark } from 'lucide-react';

const matchColor = (p: number) => p >= 80 ? '#34d399' : p >= 60 ? '#c87830' : p >= 40 ? '#fbbf24' : '#6b6b68';

// Animated SVG radial progress ring
function Ring({ pct, size = 80, color = '#c87830' }: { pct: number; size?: number; color?: string }) {
    const r = (size - 10) / 2;
    const circ = 2 * Math.PI * r;
    return (
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#2a2a2d" strokeWidth={7} />
                <motion.circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={7}
                    strokeLinecap="round" strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                    style={{ fontSize: size > 72 ? 15 : 12, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', color }}
                >{pct}%</motion.span>
            </div>
        </div>
    );
}

const wrap = { maxWidth: 960, margin: '0 auto', padding: '32px 24px 100px' };
const card = (extra: object = {}) => ({ background: '#111113', border: '1px solid #242426', borderRadius: 18, padding: '22px 24px', ...extra });

export default function QuizResults() {
    const loc = useLocation();
    const nav = useNavigate();
    const [results, setResults] = useState<QuizResult[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const a = loc.state?.answers || {};
        const t = setTimeout(() => { setResults(calculateRecommendations(a)); setLoading(false); }, 1800);
        return () => clearTimeout(t);
    }, []);

    if (!loc.state?.answers) return (
        <div style={{ maxWidth: 480, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
            <p style={{ fontSize: 52, marginBottom: 16 }}>🧭</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, marginBottom: 12 }}>No quiz data</h2>
            <p style={{ color: '#6b6b68', marginBottom: 28 }}>Please complete the quiz first.</p>
            <Link to="/quiz" style={{ padding: '12px 28px', borderRadius: 12, background: '#c87830', color: '#fff', fontWeight: 600, textDecoration: 'none' }}>Take the Quiz</Link>
        </div>
    );

    if (loading) return (
        <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                style={{ width: 56, height: 56, border: '3px solid #2a2a2d', borderTop: '3px solid #c87830', borderRadius: '50%' }}
            />
            <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity }}
                style={{ color: '#a8a8a4', fontSize: 14, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.1em' }}
            >Analysing your personality...</motion.p>
        </div>
    );

    const top = results[0];

    return (
        <div style={wrap}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 12 }}>AI Analysis Complete</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px,4vw,50px)', fontWeight: 700, marginBottom: 12 }}>Your Career Matches</h1>
                <p style={{ color: '#a8a8a4', maxWidth: 480, margin: '0 auto', fontSize: 15, lineHeight: 1.65 }}>
                    Based on your personality, interests, and skills — here are your top career recommendations.
                </p>
            </motion.div>

            {/* Top match hero */}
            {top && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15 }}
                    style={{ padding: '36px 40px', borderRadius: 24, background: 'linear-gradient(135deg, rgba(200,120,48,0.1), #111113)', border: '1px solid rgba(200,120,48,0.25)', marginBottom: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}
                >
                    <Ring pct={top.matchPercentage} size={110} color={matchColor(top.matchPercentage)} />
                    <div style={{ flex: 1, minWidth: 220 }}>
                        <p style={{ fontSize: 11, color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 8 }}>🏆 Best Match</p>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px,3vw,36px)', fontWeight: 700, marginBottom: 12 }}>{top.careerName}</h2>
                        {top.reasons.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {top.reasons.slice(0, 3).map(r => (
                                    <span key={r} style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(200,120,48,0.1)', color: '#e8944a', fontSize: 12 }}>{r}</span>
                                ))}
                            </div>
                        )}
                    </div>
                    <Link to={`/career/${top.careerSlug}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', borderRadius: 12, background: '#c87830', color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none', whiteSpace: 'nowrap' as const }}
                    >
                        Explore <ArrowRight size={15} />
                    </Link>
                </motion.div>
            )}

            {/* Results grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 14, marginBottom: 32 }}>
                {results.map((r, i) => (
                    <motion.div key={r.careerSlug}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.06 }}
                        style={card()}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
                            <Ring pct={r.matchPercentage} size={60} color={matchColor(r.matchPercentage)} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                                    <span style={{ fontSize: 12, color: '#6b6b68', fontFamily: 'Space Grotesk, sans-serif' }}>#{i + 1}</span>
                                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14, color: '#f5f5f4', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>{r.careerName}</p>
                                </div>
                                <p style={{ fontSize: 12, color: '#6b6b68', lineHeight: 1.5 }}>
                                    {r.reasons.length > 0 ? r.reasons.join(' · ') : 'Potential match based on your profile'}
                                </p>
                            </div>
                        </div>
                        <Link to={`/career/${r.careerSlug}`}
                            style={{ display: 'block', textAlign: 'center', padding: '8px', borderRadius: 10, background: '#161618', border: '1px solid #2a2a2d', fontSize: 13, color: '#a8a8a4', textDecoration: 'none', transition: 'all 0.15s' }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff'; (e.currentTarget as HTMLElement).style.borderColor = '#3a3a3d'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#a8a8a4'; (e.currentTarget as HTMLElement).style.borderColor = '#2a2a2d'; }}
                        >
                            View Career Details →
                        </Link>
                    </motion.div>
                ))}
            </div>

            {/* AI Insight */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                style={{ ...card(), marginBottom: 32 }}
            >
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <TrendingUp size={18} style={{ color: '#c87830' }} /> AI Insight
                </h3>
                <p style={{ fontSize: 14, color: '#a8a8a4', lineHeight: 1.75 }}>
                    Your responses indicate a <strong style={{ color: '#f5f5f4' }}>
                        {results[0]?.matchPercentage >= 70 ? 'strong affinity' : 'growing interest'}
                    </strong> toward <strong style={{ color: '#e8944a' }}>{results[0]?.careerName}</strong> and related fields.
                    Explore your top 3 matches in depth through the Career Explorer to understand full roadmaps and requirements.
                </p>
            </motion.div>

            {/* Action buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 12, background: '#c87830', color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                    <TrendingUp size={16} /> Explore Careers
                </Link>
                <button onClick={() => nav('/quiz')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 12, border: '1px solid #2a2a2d', background: 'transparent', color: '#a8a8a4', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
                >
                    <RotateCcw size={16} /> Retake Quiz
                </button>
                <Link to="/saved" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 12, border: '1px solid #2a2a2d', color: '#a8a8a4', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                    <Bookmark size={16} /> Saved Careers
                </Link>
            </div>
        </div>
    );
}
