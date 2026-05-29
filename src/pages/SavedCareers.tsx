import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { BookmarkX, ArrowRight, Bookmark } from 'lucide-react';
import { careers } from '../data/careers';

const demandClr: Record<string, { color: string; bg: string }> = {
    Explosive: { color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
    'Very High': { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
    High: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
    Medium: { color: '#a8a8a4', bg: '#2a2a2d' },
    Low: { color: '#6b6b68', bg: '#1c1c1f' },
};

const wrap = { maxWidth: 1100, margin: '0 auto', padding: '32px 24px 100px' };

export default function SavedCareers() {
    const [slugs, setSlugs] = useState<string[]>(() =>
        JSON.parse(localStorage.getItem('saved_careers') || '[]')
    );
    const saved = careers.filter(c => slugs.includes(c.slug));

    const remove = (slug: string) => {
        const updated = slugs.filter(s => s !== slug);
        localStorage.setItem('saved_careers', JSON.stringify(updated));
        setSlugs(updated);
    };

    return (
        <div style={wrap}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 36 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 10 }}>Your Collection</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px,4vw,50px)', fontWeight: 700, marginBottom: 8 }}>Saved Careers</h1>
                <p style={{ color: '#a8a8a4', fontSize: 14 }}>{saved.length} career{saved.length !== 1 ? 's' : ''} saved</p>
            </motion.div>

            {/* Empty state */}
            {saved.length === 0 ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    style={{ textAlign: 'center', paddingTop: 80, paddingBottom: 80 }}
                >
                    <div style={{ width: 80, height: 80, margin: '0 auto 24px', borderRadius: '50%', background: '#161618', border: '1px solid #2a2a2d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Bookmark size={32} style={{ color: '#3a3a3d' }} />
                    </div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, marginBottom: 10 }}>No saved careers yet</h2>
                    <p style={{ color: '#6b6b68', marginBottom: 32, fontSize: 15 }}>Explore careers and click "Save" to bookmark them here.</p>
                    <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 12, background: '#c87830', color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                        Start Exploring <ArrowRight size={16} />
                    </Link>
                </motion.div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                    <AnimatePresence>
                        {saved.map((career, i) => {
                            const d = demandClr[career.demandLevel];
                            return (
                                <motion.div key={career.slug}
                                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.88, y: -10 }}
                                    transition={{ delay: i * 0.06 }}
                                    style={{ background: '#111113', border: '1px solid #242426', borderRadius: 18, padding: '22px 22px', position: 'relative' as const }}
                                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#3a3a3d'}
                                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#242426'}
                                >
                                    {/* Top row */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                                        <span style={{ padding: '4px 10px', borderRadius: 20, background: d.bg, color: d.color, fontSize: 12, fontWeight: 500 }}>
                                            {career.demandLevel}
                                        </span>
                                        <button onClick={() => remove(career.slug)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b6b68', padding: 4, borderRadius: 8, opacity: 0, transition: 'all 0.15s' }}
                                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.color = '#f87171'; (e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.1)'; }}
                                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
                                            title="Remove from saved"
                                        >
                                            <BookmarkX size={16} />
                                        </button>
                                    </div>

                                    <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 18, color: '#f5f5f4', marginBottom: 4 }}>{career.name}</h3>
                                    <p style={{ fontSize: 12, color: '#6b6b68', marginBottom: 12 }}>{career.category} · {career.stream}</p>
                                    <p style={{ fontSize: 13, color: '#a8a8a4', lineHeight: 1.65, marginBottom: 16 }}>
                                        {career.overview.slice(0, 90)}...
                                    </p>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                                        <div>
                                            <p style={{ fontSize: 11, color: '#6b6b68', marginBottom: 2 }}>Avg Salary</p>
                                            <p style={{ fontSize: 15, fontWeight: 600, color: '#e8944a' }}>{career.salaryRange.average}</p>
                                        </div>
                                        <Link to={`/career/${career.slug}`}
                                            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#c87830', textDecoration: 'none', fontWeight: 500 }}
                                        >
                                            View details <ArrowRight size={13} />
                                        </Link>
                                    </div>

                                    {/* Skills tags */}
                                    <div style={{ paddingTop: 14, borderTop: '1px solid #1e1e22', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                        {career.skills.slice(0, 3).map(s => (
                                            <span key={s} style={{ padding: '3px 10px', borderRadius: 20, background: '#161618', border: '1px solid #2a2a2d', fontSize: 11, color: '#6b6b68' }}>
                                                {s}
                                            </span>
                                        ))}
                                        {career.skills.length > 3 && (
                                            <span style={{ fontSize: 12, color: '#6b6b68', padding: '3px 0' }}>+{career.skills.length - 3}</span>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
