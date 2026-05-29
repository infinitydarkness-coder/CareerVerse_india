import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, CheckCircle2, XCircle } from 'lucide-react';
import { careers } from '../data/careers';

const demandScore: Record<string, number> = { Explosive: 5, 'Very High': 4, High: 3, Medium: 2, Low: 1 };
const riskScore: Record<string, number> = { Low: 3, Medium: 2, High: 1 };
const riskClr: Record<string, string> = { Low: '#34d399', Medium: '#fbbf24', High: '#f87171' };

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
    return (
        <div style={{ flex: 1, height: 7, borderRadius: 4, background: '#2a2a2d', overflow: 'hidden' }}>
            <motion.div style={{ height: '100%', borderRadius: 4, background: color }}
                initial={{ width: 0 }}
                animate={{ width: `${(value / max) * 100}%` }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
        </div>
    );
}

function Select({ value, onChange, exclude }: { value: string; onChange: (v: string) => void; exclude?: string }) {
    return (
        <select value={value} onChange={e => onChange(e.target.value)}
            style={{ width: '100%', background: '#111113', border: '1px solid #242426', borderRadius: 14, padding: '11px 14px', fontSize: 14, color: value ? '#f5f5f4' : '#6b6b68', outline: 'none', cursor: 'pointer' }}
        >
            <option value="">Select a career...</option>
            {careers.filter(c => c.slug !== exclude).map(c => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
        </select>
    );
}

const wrap = { maxWidth: 960, margin: '0 auto', padding: '32px 24px 100px' };
const card = (extra: object = {}) => ({ background: '#111113', border: '1px solid #242426', borderRadius: 18, padding: '22px 24px', ...extra });

export default function Compare() {
    const [params] = useSearchParams();
    const [slugA, setSlugA] = useState(params.get('a') || '');
    const [slugB, setSlugB] = useState('');

    const A = careers.find(c => c.slug === slugA);
    const B = careers.find(c => c.slug === slugB);

    const metrics = A && B ? [
        { label: 'Future Demand', aV: demandScore[A.demandLevel], bV: demandScore[B.demandLevel], max: 5, fmt: (v: number) => Object.keys(demandScore).find(k => demandScore[k] === v) || '' },
        { label: 'Future Growth %', aV: A.futureGrowth, bV: B.futureGrowth, max: 100, fmt: (v: number) => `${v}%` },
        { label: 'Work-Life', aV: A.workLifeBalance, bV: B.workLifeBalance, max: 10, fmt: (v: number) => `${v}/10` },
        { label: 'AI Safety', aV: riskScore[A.automationRisk], bV: riskScore[B.automationRisk], max: 3, fmt: (v: number) => ['', 'At Risk', 'Moderate', 'Safe'][v] },
    ] : [];

    return (
        <div style={wrap}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 36 }}>
                <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 10 }}>Career Intelligence</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px,4vw,50px)', fontWeight: 700, marginBottom: 8 }}>Compare Careers</h1>
                <p style={{ color: '#a8a8a4', fontSize: 14 }}>Select two careers to see a side-by-side comparison</p>
            </motion.div>

            {/* Selectors */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 36 }}
            >
                <div>
                    <p style={{ fontSize: 12, color: '#6b6b68', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>Career A</p>
                    <Select value={slugA} onChange={setSlugA} exclude={slugB} />
                </div>
                <div>
                    <p style={{ fontSize: 12, color: '#6b6b68', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>Career B</p>
                    <Select value={slugB} onChange={setSlugB} exclude={slugA} />
                </div>
            </motion.div>

            {A && B ? (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
                >
                    {/* Name cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        {[{ career: A, color: '#c87830', label: 'A' }, { career: B, color: '#60a5fa', label: 'B' }].map(({ career, color, label }) => (
                            <div key={label} style={{ ...card(), borderColor: color + '30', background: color + '08' }}>
                                <p style={{ fontSize: 11, color, fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6 }}>Career {label}</p>
                                <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 20, marginBottom: 4 }}>{career.name}</h2>
                                <p style={{ fontSize: 12, color: '#6b6b68' }}>{career.stream} · {career.category}</p>
                            </div>
                        ))}
                    </div>

                    {/* Salary */}
                    <div style={card()}>
                        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                            <BarChart3 size={18} style={{ color: '#c87830' }} /> Salary Comparison
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
                            {(['fresher', 'average', 'experienced'] as const).map(type => (
                                <div key={type} style={{ textAlign: 'center', padding: '16px 12px', borderRadius: 14, background: '#161618' }}>
                                    <p style={{ fontSize: 11, color: '#6b6b68', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 14 }}>{type}</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        <div>
                                            <p style={{ fontSize: 11, color: '#c87830', marginBottom: 3 }}>A</p>
                                            <p style={{ fontWeight: 700, fontSize: 13 }}>{A.salaryRange[type]}</p>
                                        </div>
                                        <div style={{ height: 1, background: '#2a2a2d' }} />
                                        <div>
                                            <p style={{ fontSize: 11, color: '#60a5fa', marginBottom: 3 }}>B</p>
                                            <p style={{ fontWeight: 700, fontSize: 13 }}>{B.salaryRange[type]}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bar metrics */}
                    <div style={card()}>
                        <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16, marginBottom: 24 }}>Key Metrics</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                            {metrics.map(m => (
                                <div key={m.label}>
                                    <p style={{ fontSize: 11, color: '#6b6b68', fontFamily: 'Space Grotesk, sans-serif', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10 }}>{m.label}</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <span style={{ fontSize: 12, color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', width: 16, flexShrink: 0 }}>A</span>
                                            <Bar value={m.aV} max={m.max} color="#c87830" />
                                            <span style={{ fontSize: 12, color: '#a8a8a4', width: 68, textAlign: 'right', flexShrink: 0 }}>{m.fmt(m.aV)}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                            <span style={{ fontSize: 12, color: '#60a5fa', fontFamily: 'Space Grotesk, sans-serif', width: 16, flexShrink: 0 }}>B</span>
                                            <Bar value={m.bV} max={m.max} color="#60a5fa" />
                                            <span style={{ fontSize: 12, color: '#a8a8a4', width: 68, textAlign: 'right', flexShrink: 0 }}>{m.fmt(m.bV)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Job roles side by side */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {[{ career: A, color: '#c87830' }, { career: B, color: '#60a5fa' }].map(({ career, color }) => (
                            <div key={career.slug} style={card()}>
                                <p style={{ fontSize: 12, color, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 12 }}>{career.name} — Job Roles</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {career.jobRoles.slice(0, 5).map(r => (
                                        <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#a8a8a4' }}>
                                            <CheckCircle2 size={12} style={{ color, flexShrink: 0 }} />{r}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Booleans */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        {[{ career: A, color: '#c87830' }, { career: B, color: '#60a5fa' }].map(({ career, color }) => (
                            <div key={career.slug} style={card()}>
                                <p style={{ fontSize: 12, color, fontFamily: 'Space Grotesk, sans-serif', marginBottom: 14 }}>{career.name}</p>
                                {[
                                    ['Remote Work', career.remoteWork],
                                    ['Trending', career.trending],
                                ].map(([label, val]) => (
                                    <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, fontSize: 13 }}>
                                        <span style={{ color: '#6b6b68' }}>{label as string}</span>
                                        {val ? <CheckCircle2 size={16} style={{ color: '#34d399' }} /> : <XCircle size={16} style={{ color: '#f87171' }} />}
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
                                    <span style={{ color: '#6b6b68' }}>AI Risk</span>
                                    <span style={{ color: riskClr[career.automationRisk], fontWeight: 500 }}>{career.automationRisk}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', padding: '80px 24px', border: '1px dashed #2a2a2d', borderRadius: 24 }}
                >
                    <BarChart3 size={44} style={{ color: '#3a3a3d', margin: '0 auto 16px' }} />
                    <p style={{ color: '#6b6b68', fontSize: 15 }}>Select two careers above to start comparing</p>
                </motion.div>
            )}
        </div>
    );
}
