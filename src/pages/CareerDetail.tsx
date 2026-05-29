import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Bookmark, BookmarkCheck, Share2, ExternalLink, CheckCircle2, TrendingUp, AlertCircle, Wifi } from 'lucide-react';
import { getCareerBySlug, careers } from '../data/careers';

const demandClr: Record<string, { color: string; bg: string; border: string }> = {
    Explosive: { color: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
    'Very High': { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' },
    High: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
    Medium: { color: '#a8a8a4', bg: '#2a2a2d', border: '#3a3a3d' },
    Low: { color: '#6b6b68', bg: '#1c1c1f', border: '#2a2a2d' },
};
const riskClr: Record<string, string> = { Low: '#34d399', Medium: '#fbbf24', High: '#f87171' };

const wrap = { maxWidth: 1100, margin: '0 auto', padding: '28px 24px 100px' };
const card = (extra: object = {}) => ({ background: '#111113', border: '1px solid #242426', borderRadius: 18, padding: '22px 24px', ...extra });

export default function CareerDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const career = getCareerBySlug(slug || '');
    const [saved, setSaved] = useState(() => {
        return JSON.parse(localStorage.getItem('saved_careers') || '[]').includes(slug);
    });

    if (!career) return (
        <div style={{ maxWidth: 500, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
            <p style={{ fontSize: 56, marginBottom: 16 }}>🔍</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, marginBottom: 12 }}>Career not found</h2>
            <p style={{ color: '#6b6b68', marginBottom: 32 }}>We couldn't find details for this career yet.</p>
            <Link to="/explore" style={{ padding: '12px 28px', borderRadius: 12, background: '#c87830', color: '#fff', fontWeight: 600, textDecoration: 'none' }}>
                Back to Explorer
            </Link>
        </div>
    );

    const toggleSave = () => {
        const stored = JSON.parse(localStorage.getItem('saved_careers') || '[]');
        const updated = saved ? stored.filter((s: string) => s !== slug) : [...stored, slug];
        localStorage.setItem('saved_careers', JSON.stringify(updated));
        setSaved(!saved);
    };

    const share = () => {
        if (navigator.share) navigator.share({ title: career.name, url: window.location.href });
        else { navigator.clipboard.writeText(window.location.href); }
    };

    const related = career.relatedCareers.map(r => careers.find(c => c.slug === r)).filter(Boolean).slice(0, 4);
    const d = demandClr[career.demandLevel];

    return (
        <div style={wrap}>
            {/* Back */}
            <button onClick={() => navigate(-1)}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#6b6b68', cursor: 'pointer', fontSize: 14, marginBottom: 24, padding: 0 }}
            >
                <ArrowLeft size={16} /> Back
            </button>

            {/* Hero card */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                style={{ padding: '36px 40px', borderRadius: 24, background: 'linear-gradient(135deg, rgba(200,120,48,0.08), #111113)', border: '1px solid rgba(200,120,48,0.2)', marginBottom: 28 }}
            >
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between' }}>
                    <div style={{ flex: 1, minWidth: 280 }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                            <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, background: 'rgba(200,120,48,0.1)', color: '#e8944a', fontFamily: 'Space Grotesk, sans-serif' }}>
                                {career.stream}
                            </span>
                            <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, background: d.bg, border: `1px solid ${d.border}`, color: d.color }}>
                                {career.demandLevel} Demand
                            </span>
                            {career.trending && (
                                <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, background: 'rgba(200,120,48,0.1)', color: '#c87830', display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <TrendingUp size={11} /> Trending
                                </span>
                            )}
                        </div>
                        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, marginBottom: 14 }}>{career.name}</h1>
                        <p style={{ color: '#a8a8a4', fontSize: 15, lineHeight: 1.7, maxWidth: 560 }}>{career.overview}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 10, flexShrink: 0, alignItems: 'flex-start' }}>
                        <button onClick={toggleSave}
                            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 12, border: `1px solid ${saved ? 'rgba(200,120,48,0.4)' : '#2a2a2d'}`, background: saved ? 'rgba(200,120,48,0.1)' : 'transparent', color: saved ? '#e8944a' : '#a8a8a4', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}
                        >
                            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                            {saved ? 'Saved' : 'Save'}
                        </button>
                        <button onClick={share}
                            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 12, border: '1px solid #2a2a2d', background: 'transparent', color: '#a8a8a4', cursor: 'pointer', fontSize: 14 }}
                        >
                            <Share2 size={16} /> Share
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Body */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 280px', gap: 20, alignItems: 'start' }}>

                {/* Left */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                    {/* Metrics */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}
                    >
                        {[
                            ['💰', 'Fresher Salary', career.salaryRange.fresher, ''],
                            ['📈', 'Avg Salary', career.salaryRange.average, ''],
                            ['🚀', 'Future Growth', `${career.futureGrowth}%`, ''],
                            ['🏠', 'Remote Work', career.remoteWork ? 'Available' : 'Office', career.remoteWork ? '#34d399' : ''],
                            ['🤖', 'AI Risk', career.automationRisk, riskClr[career.automationRisk]],
                            ['⚖️', 'Work-Life', `${career.workLifeBalance}/10`, ''],
                        ].map(([icon, label, val, clr]) => (
                            <div key={label as string} style={card()}>
                                <p style={{ fontSize: 20, marginBottom: 6 }}>{icon as string}</p>
                                <p style={{ fontSize: 15, fontWeight: 600, color: (clr as string) || '#f5f5f4' }}>{val as string}</p>
                                <p style={{ fontSize: 12, color: '#6b6b68', marginTop: 3 }}>{label as string}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Skills */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} style={card()}>
                        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                            ⚡ Required Skills
                        </h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {career.skills.map(skill => (
                                <span key={skill} style={{ padding: '6px 12px', borderRadius: 20, background: '#161618', border: '1px solid #2a2a2d', fontSize: 13, color: '#a8a8a4' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Roadmap */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} style={card()}>
                        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                            🗺️ Career Roadmap
                        </h2>
                        {career.roadmap.map((step, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.06 }}
                                style={{ display: 'flex', gap: 14 }}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div style={{
                                        width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: 12, fontWeight: 700, flexShrink: 0,
                                        background: i === 0 ? '#c87830' : i === career.roadmap.length - 1 ? '#34d399' : '#161618',
                                        border: `2px solid ${i === 0 ? '#c87830' : i === career.roadmap.length - 1 ? '#34d399' : '#2a2a2d'}`,
                                        color: i === 0 || i === career.roadmap.length - 1 ? '#fff' : '#6b6b68',
                                    }}>{i + 1}</div>
                                    {i < career.roadmap.length - 1 && (
                                        <div style={{ width: 2, flex: 1, background: 'linear-gradient(to bottom, #2a2a2d, transparent)', minHeight: 20, margin: '3px 0' }} />
                                    )}
                                </div>
                                <div style={{ paddingBottom: i < career.roadmap.length - 1 ? 16 : 0 }}>
                                    <p style={{ fontSize: 14, color: i === 0 ? '#e8944a' : i === career.roadmap.length - 1 ? '#34d399' : '#f5f5f4' }}>{step}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Job Roles */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={card()}>
                        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16, marginBottom: 14 }}>💼 Job Roles</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
                            {career.jobRoles.map(role => (
                                <div key={role} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#a8a8a4' }}>
                                    <CheckCircle2 size={13} style={{ color: '#c87830', flexShrink: 0 }} />{role}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Future Scope */}
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
                        style={{ ...card(), background: 'linear-gradient(135deg, rgba(200,120,48,0.05), #111113)', borderColor: 'rgba(200,120,48,0.15)' }}
                    >
                        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <TrendingUp size={17} style={{ color: '#c87830' }} /> Future Scope
                        </h2>
                        <p style={{ fontSize: 14, color: '#a8a8a4', lineHeight: 1.7, marginBottom: 16 }}>{career.futureScope}</p>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b6b68', marginBottom: 6 }}>
                                <span>Future Growth Score</span><span>{career.futureGrowth}%</span>
                            </div>
                            <div style={{ height: 7, borderRadius: 4, background: '#2a2a2d', overflow: 'hidden' }}>
                                <motion.div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #c87830, #34d399)' }}
                                    initial={{ width: 0 }} animate={{ width: `${career.futureGrowth}%` }}
                                    transition={{ delay: 0.6, duration: 1 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                        { title: '📋 Eligibility', content: <p style={{ fontSize: 13, color: '#a8a8a4', lineHeight: 1.7 }}>{career.eligibility}</p> },
                        { title: '📝 Entrance Exams', content: career.entranceExams.map(e => <div key={e} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#a8a8a4', marginBottom: 5 }}><AlertCircle size={13} style={{ color: '#c87830', marginTop: 1, flexShrink: 0 }} />{e}</div>) },
                        { title: '🎓 Degree Options', content: career.degreeOptions.map(d => <p key={d} style={{ fontSize: 13, color: '#a8a8a4', marginBottom: 4 }}>• {d}</p>) },
                        { title: '🏛️ Top Colleges', content: career.topColleges.map(c => <p key={c} style={{ fontSize: 13, color: '#a8a8a4', marginBottom: 4 }}>• {c}</p>) },
                    ].map(({ title, content }) => (
                        <motion.div key={title} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={card({ padding: '18px 20px' })}>
                            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14, marginBottom: 10 }}>{title}</p>
                            {content}
                        </motion.div>
                    ))}

                    {/* Quick Info */}
                    <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.28 }} style={card({ padding: '18px 20px' })}>
                        {[
                            ['Remote Work', career.remoteWork ? '✓ Available' : '✗ Office', career.remoteWork ? '#34d399' : '#6b6b68', <Wifi size={13} />],
                            ['AI Risk', career.automationRisk, riskClr[career.automationRisk], '🤖'],
                            ['Work-Life Balance', `${career.workLifeBalance}/10`, '#f5f5f4', '⚖️'],
                        ].map(([label, val, clr, icon]) => (
                            <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, fontSize: 13 }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#6b6b68' }}>{icon as any} {label as string}</span>
                                <span style={{ color: clr as string, fontWeight: 500 }}>{val as string}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Compare CTA */}
                    <Link to={`/compare?a=${career.slug}`} style={{ textDecoration: 'none' }}>
                        <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.32 }}
                            style={{ padding: '16px 20px', borderRadius: 16, background: 'rgba(200,120,48,0.08)', border: '1px solid rgba(200,120,48,0.2)', cursor: 'pointer' }}
                        >
                            <p style={{ fontSize: 14, fontWeight: 500, color: '#e8944a', display: 'flex', alignItems: 'center', gap: 8 }}>
                                <ExternalLink size={14} /> Compare this career
                            </p>
                            <p style={{ fontSize: 12, color: '#6b6b68', marginTop: 4 }}>Side-by-side comparison tool</p>
                        </motion.div>
                    </Link>
                </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ marginTop: 36 }}>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16, marginBottom: 14 }}>Related Careers</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                        {related.map(c => c && (
                            <Link key={c.slug} to={`/career/${c.slug}`} style={{ textDecoration: 'none' }}>
                                <motion.div whileHover={{ y: -4 }}
                                    style={{ ...card({ padding: '16px 18px' }), display: 'block' }}
                                >
                                    <p style={{ fontWeight: 500, fontSize: 14, color: '#f5f5f4', marginBottom: 4 }}>{c.name}</p>
                                    <p style={{ fontSize: 12, color: '#6b6b68' }}>{c.salaryRange.average} avg</p>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
}
