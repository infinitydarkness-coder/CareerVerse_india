import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Search, Home, Compass, Brain, Bookmark, BarChart3, Menu, X, ChevronRight } from 'lucide-react';
import { searchCareers } from '../data/careers';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/explore', label: 'Explore', icon: Compass },
    { path: '/quiz', label: 'AI Quiz', icon: Brain },
    { path: '/saved', label: 'Saved', icon: Bookmark },
    { path: '/compare', label: 'Compare', icon: BarChart3 },
];

const s = {
    nav: { position: 'fixed' as const, top: 0, left: 0, right: 0, zIndex: 40, background: 'rgba(10,10,11,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #1e1e22' },
    navInner: { maxWidth: 1440, margin: '0 auto', padding: '0 20px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 },
    logo: { display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#f5f5f4', flexShrink: 0 as const },
    logoBox: { width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg,#c87830,#e8944a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 12, color: '#fff' },
};

export default function Layout() {
    const loc = useLocation();
    const nav = useNavigate();
    const [q, setQ] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const results = q.length > 1 ? searchCareers(q).slice(0, 7) : [];

    const activeStyle = { background: 'rgba(200,120,48,0.1)', color: '#e8944a' };
    const inactiveStyle = { color: '#a8a8a4' };

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0b', color: '#f5f5f4', fontFamily: 'Inter, sans-serif' }}>

            {/* Navbar */}
            <header style={s.nav}>
                <div style={s.navInner}>
                    {/* Logo */}
                    <Link to="/" style={s.logo}>
                        <div style={s.logoBox}>CV</div>
                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 17 }}>CareerVerse</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1, justifyContent: 'center' }}>
                        {navItems.map(item => {
                            const active = loc.pathname === item.path;
                            return (
                                <Link key={item.path} to={item.path} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'all 0.15s', ...(active ? activeStyle : inactiveStyle) }}>
                                    <item.icon size={15} />
                                    <span style={{ display: 'none' }} className="nav-label">{item.label}</span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Search */}
                    <div style={{ position: 'relative' as const }}>
                        <button onClick={() => setSearchOpen(v => !v)}
                            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px', borderRadius: 10, background: '#161618', border: '1px solid #2a2a2d', color: '#6b6b68', fontSize: 13, cursor: 'pointer' }}
                        >
                            <Search size={14} /> Search
                        </button>

                        <AnimatePresence>
                            {searchOpen && (
                                <>
                                    <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => { setSearchOpen(false); setQ(''); }} />
                                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                                        style={{ position: 'absolute', right: 0, top: 48, width: 320, zIndex: 50, background: 'rgba(22,22,24,0.95)', backdropFilter: 'blur(20px)', border: '1px solid #2a2a2d', borderRadius: 16, padding: 12, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                                    >
                                        <input autoFocus value={q} onChange={e => setQ(e.target.value)}
                                            placeholder="Search careers, skills, fields..."
                                            style={{ width: '100%', background: '#0a0a0b', border: '1px solid #2a2a2d', borderRadius: 10, padding: '8px 12px', fontSize: 13, color: '#fff', outline: 'none', boxSizing: 'border-box' as const }}
                                        />
                                        {results.length > 0 && (
                                            <div style={{ marginTop: 8 }}>
                                                {results.map(c => (
                                                    <button key={c.slug} onClick={() => { nav(`/career/${c.slug}`); setSearchOpen(false); setQ(''); }}
                                                        style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 10px', borderRadius: 9, background: 'transparent', border: 'none', color: '#a8a8a4', fontSize: 13, cursor: 'pointer' }}
                                                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1c1c1f'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}
                                                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#a8a8a4'; }}
                                                    >
                                                        <span>{c.name}</span>
                                                        <span style={{ fontSize: 11, color: '#6b6b68' }}>{c.category}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        {q.length > 1 && results.length === 0 && (
                                            <p style={{ textAlign: 'center', color: '#6b6b68', fontSize: 13, padding: '16px 0' }}>No results</p>
                                        )}
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Mobile toggle */}
                    <button onClick={() => setMenuOpen(v => !v)} style={{ background: 'none', border: 'none', color: '#a8a8a4', cursor: 'pointer', padding: 4 }}>
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </header>

            {/* Mobile Slide Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
                        style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(10,10,11,0.97)', backdropFilter: 'blur(20px)', paddingTop: 80, paddingLeft: 24, paddingRight: 24 }}
                    >
                        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                            {navItems.map(item => (
                                <Link key={item.path} to={item.path} onClick={() => setMenuOpen(false)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14, fontSize: 16, textDecoration: 'none', ...(loc.pathname === item.path ? activeStyle : { color: '#a8a8a4' }) }}
                                >
                                    <item.icon size={20} />{item.label}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Page Content */}
            <main style={{ paddingTop: 60, minHeight: '100vh' }}>
                <AnimatePresence mode="wait">
                    <motion.div key={loc.pathname}
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Mobile Bottom Nav */}
            <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, background: 'rgba(10,10,11,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid #1e1e22', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '8px 0 12px' }}>
                {navItems.map(item => {
                    const active = loc.pathname === item.path;
                    return (
                        <Link key={item.path} to={item.path}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 8px', textDecoration: 'none', color: active ? '#e8944a' : '#6b6b68', transition: 'color 0.15s' }}
                        >
                            <item.icon size={19} />
                            <span style={{ fontSize: 10 }}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

        </div>
    );
}
