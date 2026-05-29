import { motion } from 'framer-motion';

export default function LoadingScreen() {
    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 24 }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                style={{ width: 48, height: 48, border: '3px solid #1e1e22', borderTop: '3px solid #c87830', borderRadius: '50%' }}
            />
            <motion.p
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                style={{ color: '#6b6b68', fontSize: 13, fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
                Loading...
            </motion.p>
        </div>
    );
}
