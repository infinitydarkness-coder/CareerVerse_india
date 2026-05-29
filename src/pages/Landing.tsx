import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import {
    ArrowRight, Sparkles, TrendingUp, Brain, Network,
    Shield, Palette, Building2, ChevronDown, Star, CheckCircle2
} from 'lucide-react';
import HeroScene from '../components/HeroScene';

/* ─── Animation helpers ─────────────────────────────────── */
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
});

/* ─── Data ───────────────────────────────────────────────── */
const features = [
    { icon: Network, title: 'Interactive Career Graph', desc: 'Explore 200+ careers through a click-to-expand neural-network mind map.' },
    { icon: Brain, title: 'AI Career Quiz', desc: 'Personality-based AI recommendations matching your unique strengths & interests.' },
    { icon: TrendingUp, title: 'Future Demand Analytics', desc: 'Data-driven insights on salary, growth, and AI-readiness for every career.' },
    { icon: Shield, title: 'Complete Roadmaps', desc: 'Step-by-step paths from 10th standard all the way to your dream career.' },
    { icon: Palette, title: '200+ Indian Careers', desc: 'Engineering, medical, creative, government, freelancing and future AI careers.' },
    { icon: Building2, title: 'College & Exam Database', desc: 'Top colleges, entrance exams, fees, and placement data at your fingertips.' },
];

const categories = [
    { name: 'Science & Engineering', icon: '⚙️', count: '50+ careers' },
    { name: 'Medical & Healthcare', icon: '🏥', count: '17+ careers' },
    { name: 'Commerce & Finance', icon: '📊', count: '20+ careers' },
    { name: 'Arts & Humanities', icon: '🎨', count: '15+ careers' },
    { name: 'Creative & Design', icon: '✨', count: '20+ careers' },
    { name: 'Future & AI Careers', icon: '🚀', count: '25+ careers' },
];

const testimonials = [
    { name: 'Priya Sharma', role: 'Class 12 Science', text: 'CareerVerse helped me discover AI Engineering. The career quiz was spot-on with my personality!' },
    { name: 'Rahul Mehta', role: 'Class 10 Student', text: 'The career graph is amazing! I could visually explore all paths from Science to specific jobs.' },
    { name: 'Ananya Patel', role: 'B.Tech Student', text: 'I compared careers side by side and found my passion in UI/UX Design. Best platform ever!' },
];

const faqs = [
    { q: 'Is CareerVerse free to use?', a: 'Yes! Career exploration, the graph explorer, and the AI quiz are completely free for all Indian students.' },
    { q: 'How accurate is the AI career quiz?', a: 'Our quiz analyses 12+ personality dimensions and matches across 200+ careers. Students report 90%+ satisfaction.' },
    { q: 'Who is this platform for?', a: 'Students after 10th, 12th, and early college who want to explore career options available in India.' },
    { q: 'Can I compare two careers?', a: 'Yes! Our comparison tool lets you see salary, demand, work-life balance and more side-by-side.' },
];

/* ─── Sub-components ─────────────────────────────────────── */
function Navbar() {
    return (
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, borderBottom: '1px solid #1e1e22' }}
            className="glass"
        >
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,#c87830,#e8944a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, color: '#fff' }}>CV</div>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 18 }}>CareerVerse</span>
                </div>
                <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="hidden-mobile">
                    {['Features', 'Careers', 'Reviews', 'FAQ'].map(l => (
                        <a key={l} href={`#${l.toLowerCase()}`} style={{ color: '#a8a8a4', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#a8a8a4')}
                        >{l}</a>
                    ))}
                </nav>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Link to="/dashboard" style={{ color: '#a8a8a4', fontSize: 14, textDecoration: 'none' }}>Try App</Link>
                    <Link to="/explore" style={{ padding: '8px 18px', borderRadius: 10, background: '#c87830', color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                        Explore Careers
                    </Link>
                </div>
            </div>
        </header>
    );
}

/* ─── Main Page ──────────────────────────────────────────── */
export default function Landing() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div style={{ background: '#0a0a0b', color: '#f5f5f4', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
            <Navbar />

            {/* ── HERO ─────────────────────────────────────────── */}
            <motion.section ref={heroRef} style={{ opacity: heroOpacity, y: heroY, position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 64 }}>
                <HeroScene />
                <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
                    <motion.p {...fadeUp(0.2)} style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 24 }}>
                        Future Discovery Engine
                    </motion.p>
                    <motion.h1 {...fadeUp(0.35)} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(44px, 6vw, 80px)', fontWeight: 700, lineHeight: 1.08, marginBottom: 24, maxWidth: 640 }}>
                        Your future<br />
                        is <em style={{ color: '#c87830', fontStyle: 'italic' }}>not</em> a<br />
                        straight line.
                    </motion.h1>
                    <motion.p {...fadeUp(0.5)} style={{ color: '#a8a8a4', fontSize: 17, lineHeight: 1.7, maxWidth: 480, marginBottom: 40 }}>
                        Discover the perfect career path based on your interests, personality, and skills — built for Indian students after 10th and 12th.
                    </motion.p>
                    <motion.div {...fadeUp(0.65)} style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
                        <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 12, background: '#fff', color: '#0a0a0b', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                            Explore Careers <ArrowRight size={16} />
                        </Link>
                        <Link to="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 12, border: '1px solid #2a2a2d', color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                            <Sparkles size={16} style={{ color: '#c87830' }} /> Take Career Quiz
                        </Link>
                    </motion.div>
                    <motion.div {...fadeUp(0.85)} style={{ display: 'flex', gap: 48, marginTop: 56 }}>
                        {[['Mapping Precision', '99.4%'], ['Active Students', '0K']].map(([label, val]) => (
                            <div key={label}>
                                <p style={{ fontSize: 10, color: '#6b6b68', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6 }}>{label}</p>
                                <p style={{ fontSize: 26, fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>{val}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
                    style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}>
                    <ChevronDown size={22} style={{ color: '#6b6b68' }} />
                </motion.div>
            </motion.section>

            {/* ── FEATURES ─────────────────────────────────────── */}
            <section id="features" style={{ padding: '96px 0' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <motion.p {...fadeUp(0)} style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 16 }}>Why CareerVerse</motion.p>
                        <motion.h2 {...fadeUp(0.1)} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, marginBottom: 16 }}>Your career, decoded.</motion.h2>
                        <motion.p {...fadeUp(0.2)} style={{ color: '#a8a8a4', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>Everything you need to make the most important decision of your life.</motion.p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
                        {features.map((f, i) => (
                            <motion.div key={i} {...fadeUp(i * 0.08)}
                                style={{ padding: 24, borderRadius: 20, background: '#111113', border: '1px solid #2a2a2d', transition: 'border-color 0.2s, transform 0.2s' }}
                                whileHover={{ y: -4, borderColor: '#3a3a3d' }}
                            >
                                <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(200,120,48,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                                    <f.icon size={20} style={{ color: '#c87830' }} />
                                </div>
                                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 17, marginBottom: 8 }}>{f.title}</h3>
                                <p style={{ fontSize: 14, color: '#a8a8a4', lineHeight: 1.65 }}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CATEGORIES ───────────────────────────────────── */}
            <section id="careers" style={{ padding: '96px 0', background: '#0d0d0f' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <motion.p {...fadeUp(0)} style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 16 }}>Career Streams</motion.p>
                        <motion.h2 {...fadeUp(0.1)} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700 }}>Every path. Explored.</motion.h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                        {categories.map((cat, i) => (
                            <motion.div key={i} {...fadeUp(i * 0.07)}
                                whileHover={{ y: -5, scale: 1.02 }}
                                style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 24px', borderRadius: 18, background: '#161618', border: '1px solid #2a2a2d', cursor: 'pointer', transition: 'all 0.2s' }}
                            >
                                <span style={{ fontSize: 32 }}>{cat.icon}</span>
                                <div>
                                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{cat.name}</p>
                                    <p style={{ fontSize: 13, color: '#6b6b68' }}>{cat.count}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 48 }}>
                        <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', borderRadius: 12, background: '#c87830', color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                            Explore All <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ─────────────────────────────────── */}
            <section id="reviews" style={{ padding: '96px 0' }}>
                <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <motion.p {...fadeUp(0)} style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 16 }}>Student Stories</motion.p>
                        <motion.h2 {...fadeUp(0.1)} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700 }}>Trusted by thousands.</motion.h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
                        {testimonials.map((t, i) => (
                            <motion.div key={i} {...fadeUp(i * 0.12)}
                                style={{ padding: 24, borderRadius: 20, background: '#111113', border: '1px solid #2a2a2d' }}>
                                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                                    {[...Array(5)].map((_, j) => <Star key={j} size={14} style={{ color: '#c87830', fill: '#c87830' }} />)}
                                </div>
                                <p style={{ fontSize: 14, color: '#a8a8a4', lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
                                <div>
                                    <p style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</p>
                                    <p style={{ fontSize: 12, color: '#6b6b68', marginTop: 2 }}>{t.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ──────────────────────────────────────────── */}
            <section id="faq" style={{ padding: '96px 0', background: '#0d0d0f' }}>
                <div style={{ maxWidth: 720, margin: '0 auto', padding: '0 24px' }}>
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <motion.p {...fadeUp(0)} style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c87830', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 16 }}>FAQ</motion.p>
                        <motion.h2 {...fadeUp(0.1)} style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700 }}>Questions? Answered.</motion.h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {faqs.map((faq, i) => (
                            <motion.div key={i} {...fadeUp(i * 0.08)}
                                style={{ padding: '20px 24px', borderRadius: 18, background: '#161618', border: `1px solid ${openFaq === i ? 'rgba(200,120,48,0.3)' : '#2a2a2d'}`, cursor: 'pointer', transition: 'border-color 0.2s' }}
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15 }}>{faq.q}</p>
                                    <ChevronDown size={16} style={{ color: '#6b6b68', flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                                </div>
                                {openFaq === i && (
                                    <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                        style={{ marginTop: 12, fontSize: 14, color: '#a8a8a4', lineHeight: 1.7 }}
                                    >{faq.a}</motion.p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────── */}
            <section style={{ padding: '96px 24px' }}>
                <motion.div {...fadeUp(0)}
                    style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '64px 48px', borderRadius: 28, background: 'linear-gradient(135deg, rgba(200,120,48,0.08), #111113)', border: '1px solid rgba(200,120,48,0.2)' }}
                >
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, marginBottom: 16 }}>Ready to discover your path?</h2>
                    <p style={{ color: '#a8a8a4', maxWidth: 400, margin: '0 auto 36px', lineHeight: 1.7 }}>Join thousands of Indian students discovering their ideal career path.</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
                        <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 12, background: '#c87830', color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                            Start Exploring <ArrowRight size={16} />
                        </Link>
                        <Link to="/quiz" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 32px', borderRadius: 12, border: '1px solid #2a2a2d', color: '#fff', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
                            Take the Quiz
                        </Link>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 32 }}>
                        {['Free forever', 'No signup required to explore', '200+ careers covered'].map(l => (
                            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6b6b68' }}>
                                <CheckCircle2 size={14} style={{ color: '#34d399' }} />{l}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* ── FOOTER ───────────────────────────────────────── */}
            <footer style={{ padding: '40px 24px', borderTop: '1px solid #1e1e22' }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 6, background: 'linear-gradient(135deg,#c87830,#e8944a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, color: '#fff' }}>CV</div>
                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>CareerVerse India</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#6b6b68' }}>© 2025 CareerVerse India · Built for Indian students, by Indian students.</p>
                </div>
            </footer>
        </div>
    );
}
