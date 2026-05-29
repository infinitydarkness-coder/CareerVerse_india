import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowLeft, Search, X } from 'lucide-react';
import { careerTree, type CareerCategory } from '../data/careerTypes';
import { careers, searchCareers } from '../data/careers';

type TreeNode = CareerCategory & { children: (CareerCategory | string)[] };

const icons: Record<string, string> = {
    science: '🔬', engineering: '⚙️', medical: '🏥', research: '🧪',
    commerce: '📊', arts: '🎨', creative: '✨', 'skill-based': '🛠️',
    government: '🏛️', future: '🚀',
};

const demandClr: Record<string, { color: string; bg: string }> = {
    Explosive: { color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
    'Very High': { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
    High: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
    Medium: { color: '#a8a8a4', bg: '#2a2a2d' },
    Low: { color: '#6b6b68', bg: '#1c1c1f' },
};

const wrap = { maxWidth: 1200, margin: '0 auto', padding: '32px 24px 100px' };
const cardBase = { background: '#111113', border: '1px solid #242426', borderRadius: 18, padding: '20px', transition: 'all 0.2s', cursor: 'pointer', textAlign: 'left' as const, width: '100%' };

export default function CareerExplorer() {
    const navigate = useNavigate();
    const [path, setPath] = useState<TreeNode[]>([]);
    const [sq, setSq] = useState('');
    const current = path.length > 0 ? path[path.length - 1] : null;
    const items: (CareerCategory | string)[] = current ? current.children : (careerTree as TreeNode[]);
    const searchResults = sq.length > 1 ? searchCareers(sq) : [];

    const handleClick = (item: CareerCategory | string) => {
        if (typeof item === 'string') { navigate(`/career/${item}`); return; }
        setPath(prev => [...prev, item as TreeNode]);
    };

    const isLeafLevel = items.length > 0 && typeof items[0] === 'string';

    return (
        <div style={wrap}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 10 }}>Interactive Career Graph</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 700, marginBottom: 10 }}>Explore Careers</h1>
                <p style={{ color: '#a8a8a4', fontSize: 15 }}>Click any stream to drill deeper. Each click reveals the next level.</p>
            </motion.div>

            {/* Search */}
            <div style={{ position: 'relative', maxWidth: 520, marginBottom: 32 }}>
                <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#6b6b68' }} />
                <input value={sq} onChange={e => setSq(e.target.value)}
                    placeholder="Search any career, skill, or field..."
                    style={{ width: '100%', background: '#111113', border: '1px solid #242426', borderRadius: 12, padding: '11px 40px 11px 38px', fontSize: 14, color: '#f5f5f4', outline: 'none', boxSizing: 'border-box' as const }}
                />
                {sq && <button onClick={() => setSq('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#6b6b68', cursor: 'pointer' }}>
                    <X size={14} />
                </button>}
            </div>

            {/* Search Results */}
            <AnimatePresence>
                {searchResults.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{ marginBottom: 32 }}>
                        <p style={{ fontSize: 12, color: '#6b6b68', marginBottom: 12, fontFamily: 'Space Grotesk, sans-serif' }}>{searchResults.length} results for "{sq}"</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
                            {searchResults.map(c => (
                                <motion.button key={c.slug} onClick={() => navigate(`/career/${c.slug}`)}
                                    whileHover={{ y: -3 }} style={cardBase}
                                >
                                    <p style={{ fontWeight: 600, fontSize: 14, color: '#f5f5f4', marginBottom: 4 }}>{c.name}</p>
                                    <p style={{ fontSize: 12, color: '#6b6b68' }}>{c.category} · {c.stream}</p>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Breadcrumb */}
            {path.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    <button onClick={() => setPath([])} style={{ background: 'none', border: 'none', color: '#6b6b68', cursor: 'pointer', fontSize: 13, padding: 0 }}>All Streams</button>
                    {path.map((p, i) => (
                        <span key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <ChevronRight size={13} style={{ color: '#3a3a3d' }} />
                            <button onClick={() => setPath(prev => prev.slice(0, i + 1))}
                                style={{ background: 'none', border: 'none', fontSize: 13, cursor: 'pointer', color: i === path.length - 1 ? '#e8944a' : '#6b6b68', padding: 0 }}
                            >{p.name}</button>
                        </span>
                    ))}
                </div>
            )}

            {/* Back button */}
            {path.length > 0 && (
                <button onClick={() => setPath(prev => prev.slice(0, -1))}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: '#a8a8a4', cursor: 'pointer', fontSize: 14, marginBottom: 24, padding: 0 }}
                >
                    <ArrowLeft size={16} /> Back to {path.length > 1 ? path[path.length - 2].name : 'All Streams'}
                </button>
            )}

            {/* Info row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                {current && (
                    <span style={{ padding: '4px 12px', borderRadius: 20, background: 'rgba(200,120,48,0.1)', border: '1px solid rgba(200,120,48,0.2)', fontSize: 12, color: '#e8944a', fontFamily: 'Space Grotesk, sans-serif' }}>
                        {icons[current.id] || '📁'} {current.name}
                    </span>
                )}
                <span style={{ fontSize: 12, color: '#6b6b68' }}>
                    {items.length} {isLeafLevel ? 'careers' : 'categories'} · Click to {isLeafLevel ? 'view details' : 'explore'}
                </span>
            </div>

            {/* Grid */}
            <AnimatePresence mode="wait">
                <motion.div key={current?.id || 'root'}
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                    style={{ display: 'grid', gridTemplateColumns: isLeafLevel ? 'repeat(auto-fill, minmax(280px, 1fr))' : 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}
                >
                    {items.map((item, i) => {
                        const isStr = typeof item === 'string';
                        const career = isStr ? careers.find(c => c.slug === item) : null;
                        const node = !isStr ? (item as CareerCategory) : null;
                        const demandInfo = career ? demandClr[career.demandLevel] : null;

                        return (
                            <motion.button key={isStr ? item : (item as CareerCategory).id}
                                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.04 }}
                                whileHover={{ y: -5, borderColor: 'rgba(200,120,48,0.35)' }}
                                onClick={() => handleClick(item)}
                                style={{ ...cardBase, position: 'relative', overflow: 'hidden' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <span style={{ fontSize: 28 }}>
                                        {isStr ? (career ? '🎯' : '📌') : (icons[node!.id] || '📁')}
                                    </span>
                                    <ChevronRight size={15} style={{ color: '#3a3a3d' }} />
                                </div>
                                <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: isStr ? 14 : 15, color: '#f5f5f4', marginBottom: 6 }}>
                                    {isStr ? (career?.name || item) : node!.name}
                                </p>
                                {isStr && career ? (
                                    <div>
                                        <p style={{ fontSize: 12, color: '#6b6b68', marginBottom: 8, lineHeight: 1.6 }}>{career.overview.slice(0, 65)}...</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                            {demandInfo && (
                                                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 20, background: demandInfo.bg, color: demandInfo.color, fontWeight: 500 }}>
                                                    {career.demandLevel}
                                                </span>
                                            )}
                                            <span style={{ fontSize: 11, color: '#6b6b68' }}>{career.salaryRange.average}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <p style={{ fontSize: 12, color: '#6b6b68' }}>
                                        {node && Array.isArray(node.children) ? `${(node.children as any[]).length} ${(node.children as any[])[0] && typeof (node.children as any[])[0] === 'string' ? 'careers' : 'sub-categories'}` : ''}
                                    </p>
                                )}
                            </motion.button>
                        );
                    })}
                </motion.div>
            </AnimatePresence>

            {path.length === 0 && !sq && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    style={{ marginTop: 40, padding: 20, borderRadius: 16, border: '1px dashed #2a2a2d', textAlign: 'center' }}
                >
                    <p style={{ fontSize: 14, color: '#6b6b68' }}>
                        💡 Click any stream above to drill down → Science → Engineering → Computer Engineering → Career Details
                    </p>
                </motion.div>
            )}
        </div>
    );
}
