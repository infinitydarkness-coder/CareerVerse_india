import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Brain } from 'lucide-react';
import { quizQuestions } from '../data/quiz';

export default function Quiz() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const q = quizQuestions[step];
    const pct = ((step + 1) / quizQuestions.length) * 100;

    const setAns = (v: any) => setAnswers(prev => ({ ...prev, [q.id]: v }));
    const toggleMulti = (v: string) => {
        const cur: string[] = answers[q.id] || [];
        setAns(cur.includes(v) ? cur.filter(x => x !== v) : [...cur, v]);
    };
    const canNext = () => {
        const a = answers[q.id];
        if (q.type === 'slider') return a !== undefined;
        if (q.type === 'single') return !!a;
        if (q.type === 'multiselect') return Array.isArray(a) && a.length > 0;
        return true;
    };
    const next = () => {
        if (step < quizQuestions.length - 1) setStep(s => s + 1);
        else navigate('/quiz/results', { state: { answers } });
    };

    const sliderVal = answers[q.id] ?? 5;
    const sliderPct = ((sliderVal - (q.min || 1)) / ((q.max || 10) - (q.min || 1))) * 100;

    return (
        <div style={{ maxWidth: 620, margin: '0 auto', padding: '32px 24px 100px', minHeight: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(200,120,48,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Brain size={16} style={{ color: '#c87830' }} />
                    </div>
                    <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c87830', fontFamily: 'Space Grotesk, sans-serif' }}>AI Career Assessment</p>
                </div>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700 }}>Find Your Career Match</h1>
            </motion.div>

            {/* Progress */}
            <div style={{ marginBottom: 36 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b6b68', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 8 }}>
                    <span>Question {step + 1} of {quizQuestions.length}</span>
                    <span style={{ color: '#c87830' }}>{Math.round(pct)}% complete</span>
                </div>
                <div style={{ height: 5, borderRadius: 4, background: '#2a2a2d', overflow: 'hidden', marginBottom: 8 }}>
                    <motion.div style={{ height: '100%', borderRadius: 4, background: 'linear-gradient(90deg, #c87830, #e8944a)' }}
                        animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }}
                    />
                </div>
                <div style={{ display: 'flex', gap: 3 }}>
                    {quizQuestions.map((_, i) => (
                        <div key={i} style={{ height: 3, flex: 1, borderRadius: 2, background: i <= step ? '#c87830' : '#2a2a2d', transition: 'background 0.3s' }} />
                    ))}
                </div>
            </div>

            {/* Question */}
            <div style={{ flex: 1 }}>
                <AnimatePresence mode="wait">
                    <motion.div key={q.id}
                        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: 20, background: 'rgba(200,120,48,0.1)', fontSize: 12, color: '#e8944a', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 14 }}>
                            {q.category}
                        </span>
                        <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 600, marginBottom: 28, lineHeight: 1.45 }}>{q.question}</h2>

                        {/* Single */}
                        {q.type === 'single' && q.options && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {q.options.map(opt => {
                                    const sel = answers[q.id] === opt.value;
                                    return (
                                        <motion.button key={opt.value} onClick={() => setAns(opt.value)}
                                            whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                                            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 18px', borderRadius: 16, border: `1px solid ${sel ? 'rgba(200,120,48,0.4)' : '#2a2a2d'}`, background: sel ? 'rgba(200,120,48,0.08)' : '#111113', color: sel ? '#f5f5f4' : '#a8a8a4', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                                        >
                                            {opt.emoji && <span style={{ fontSize: 22, flexShrink: 0 }}>{opt.emoji}</span>}
                                            <span style={{ fontSize: 15, fontWeight: 500 }}>{opt.label}</span>
                                            {sel && <div style={{ marginLeft: 'auto', width: 18, height: 18, borderRadius: '50%', background: '#c87830', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#fff' }} />
                                            </div>}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Multi */}
                        {q.type === 'multiselect' && q.options && (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
                                {q.options.map(opt => {
                                    const cur = answers[q.id] || [];
                                    const sel = cur.includes(opt.value);
                                    return (
                                        <motion.button key={opt.value} onClick={() => toggleMulti(opt.value)}
                                            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                            style={{ padding: '16px 12px', borderRadius: 16, border: `1px solid ${sel ? 'rgba(200,120,48,0.4)' : '#2a2a2d'}`, background: sel ? 'rgba(200,120,48,0.08)' : '#111113', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s' }}
                                        >
                                            {opt.emoji && <div style={{ fontSize: 26, marginBottom: 8 }}>{opt.emoji}</div>}
                                            <p style={{ fontSize: 13, fontWeight: 500, color: sel ? '#f5f5f4' : '#a8a8a4', lineHeight: 1.3 }}>{opt.label}</p>
                                        </motion.button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Slider */}
                        {q.type === 'slider' && (
                            <div style={{ padding: '16px 0 24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#6b6b68', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 20 }}>
                                    <span>Not at all</span><span>Extremely</span>
                                </div>
                                <input type="range" min={q.min || 1} max={q.max || 10}
                                    value={sliderVal} onChange={e => setAns(parseInt(e.target.value))}
                                    style={{ width: '100%', accentColor: '#c87830', cursor: 'pointer' }}
                                />
                                <div style={{ textAlign: 'center', marginTop: 24 }}>
                                    <motion.span key={sliderVal} initial={{ scale: 0.7 }} animate={{ scale: 1 }}
                                        style={{ fontSize: 56, fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', color: '#c87830' }}
                                    >{sliderVal}</motion.span>
                                    <span style={{ fontSize: 24, color: '#6b6b68' }}> / {q.max || 10}</span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Nav buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, paddingTop: 24, borderTop: '1px solid #242426' }}>
                <button onClick={() => setStep(s => s - 1)} disabled={step === 0}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 12, border: '1px solid #2a2a2d', background: 'transparent', color: step === 0 ? '#3a3a3d' : '#a8a8a4', cursor: step === 0 ? 'not-allowed' : 'pointer', fontSize: 14 }}
                >
                    <ArrowLeft size={15} /> Back
                </button>
                <button onClick={next} disabled={!canNext()}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 24px', borderRadius: 12, background: canNext() ? '#c87830' : '#2a2a2d', color: canNext() ? '#fff' : '#6b6b68', cursor: canNext() ? 'pointer' : 'not-allowed', fontWeight: 600, fontSize: 14, transition: 'all 0.15s' }}
                >
                    {step === quizQuestions.length - 1 ? <><Brain size={15} /> Get Results</> : <>Next <ArrowRight size={15} /></>}
                </button>
            </div>
        </div>
    );
}
