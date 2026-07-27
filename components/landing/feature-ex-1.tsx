"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ══════════════════════════════════════════
   SVG ILLUSTRATIONS — currentColor for dark mode
══════════════════════════════════════════ */

function ExpenseSvg() {
    return (
        <svg viewBox="0 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-black dark:text-white">
            <rect x="55" y="30" width="130" height="95" rx="10" stroke="currentColor" strokeWidth="1.6" fill="none"/>
            <rect x="65" y="45" width="110" height="65" rx="6" stroke="currentColor" strokeWidth="1.2" fill="none" opacity=".3"/>
            <line x1="80" y1="58" x2="120" y2="58" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".2"/>
            <line x1="80" y1="70" x2="140" y2="70" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".4"/>
            <line x1="80" y1="82" x2="110" y2="82" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".6"/>
            <line x1="80" y1="94" x2="130" y2="94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".8"/>
            <circle cx="180" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M176 50h8 M180 46v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <rect x="55" y="120" width="130" height="3" rx="1.5" fill="currentColor" opacity=".1"/>
        </svg>
    );
}

function BudgetSvg() {
    return (
        <svg viewBox="0 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-black dark:text-white">
            <rect x="35" y="20" width="170" height="120" rx="12" stroke="currentColor" strokeWidth="1.6" fill="none"/>
            <rect x="55" y="48" width="100" height="10" rx="5" fill="currentColor" opacity=".08"/>
            <rect x="55" y="48" width="80" height="10" rx="5" fill="currentColor" opacity=".8"/>
            <rect x="55" y="72" width="100" height="10" rx="5" fill="currentColor" opacity=".08"/>
            <rect x="55" y="72" width="60" height="10" rx="5" fill="currentColor" opacity=".55"/>
            <rect x="55" y="96" width="100" height="10" rx="5" fill="currentColor" opacity=".08"/>
            <rect x="55" y="96" width="30" height="10" rx="5" fill="currentColor" opacity=".25"/>
            <text x="165" y="57" fontSize="10" fill="currentColor" fontWeight="600" fontFamily="Inter,sans-serif" opacity=".8">80%</text>
            <text x="165" y="81" fontSize="10" fill="currentColor" fontWeight="600" fontFamily="Inter,sans-serif" opacity=".55">60%</text>
            <text x="165" y="105" fontSize="10" fill="currentColor" fontWeight="600" fontFamily="Inter,sans-serif" opacity=".25">20%</text>
            <text x="55" y="40" fontSize="9" fill="currentColor" opacity=".5" fontFamily="Inter,sans-serif">Food</text>
            <text x="55" y="64" fontSize="9" fill="currentColor" opacity=".5" fontFamily="Inter,sans-serif">Transport</text>
            <text x="55" y="88" fontSize="9" fill="currentColor" opacity=".5" fontFamily="Inter,sans-serif">Shopping</text>
        </svg>
    );
}

function RunwaySvg() {
    return (
        <svg viewBox="0 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-black dark:text-white">
            <circle cx="120" cy="85" r="55" stroke="currentColor" strokeWidth="1.6" fill="none"/>
            <circle cx="120" cy="85" r="42" stroke="currentColor" strokeWidth="6" opacity=".1" fill="none"/>
            <circle cx="120" cy="85" r="42" stroke="currentColor" strokeWidth="6" strokeDasharray="185 264" strokeLinecap="round" transform="rotate(-90 120 85)" opacity=".8"/>
            <rect x="117" y="48" width="6" height="30" rx="3" fill="currentColor"/>
            <rect x="117" y="48" width="6" height="30" rx="3" fill="currentColor" transform="rotate(60 120 85)"/>
            <circle cx="120" cy="85" r="5" fill="currentColor"/>
            <text x="105" y="90" fontSize="11" fill="currentColor" fontWeight="700" fontFamily="Inter,sans-serif">25</text>
            <text x="99" y="101" fontSize="7" fill="currentColor" opacity=".5" fontFamily="Inter,sans-serif">days</text>
            <rect x="40" y="140" width="160" height="6" rx="3" fill="currentColor" opacity=".08"/>
            <rect x="40" y="140" width="130" height="6" rx="3" fill="currentColor" opacity=".7"/>
        </svg>
    );
}

function SavingsSvg() {
    return (
        <svg viewBox="0 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-black dark:text-white">
            <circle cx="120" cy="70" r="45" stroke="currentColor" strokeWidth="1.6" fill="none"/>
            <circle cx="120" cy="70" r="32" stroke="currentColor" strokeWidth="1.2" fill="none" opacity=".3"/>
            <circle cx="120" cy="70" r="18" stroke="currentColor" strokeWidth="1.4" fill="none"/>
            <circle cx="115" cy="64" r="5" fill="currentColor" opacity=".35"/>
            <path d="M98 84 q22-12 44 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity=".5"/>
            <path d="M172 28l-8 8 M180 28l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <circle cx="172" cy="18" r="18" stroke="currentColor" strokeWidth="1.4" fill="none"/>
            <text x="164" y="23" fontSize="10" fill="currentColor" fontWeight="700" fontFamily="Inter,sans-serif">Rp</text>
            <rect x="60" y="130" width="120" height="6" rx="3" fill="currentColor" opacity=".08"/>
            <rect x="60" y="130" width="84" height="6" rx="3" fill="currentColor" opacity=".7"/>
        </svg>
    );
}

function ReportSvg() {
    return (
        <svg viewBox="0 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-black dark:text-white">
            <rect x="30" y="20" width="180" height="120" rx="10" stroke="currentColor" strokeWidth="1.6" fill="none"/>
            <line x1="55" y1="50" x2="55" y2="120" stroke="currentColor" strokeWidth="1.2" opacity=".3"/>
            <line x1="55" y1="120" x2="195" y2="120" stroke="currentColor" strokeWidth="1.2" opacity=".3"/>
            <rect x="75" y="80" width="22" height="40" rx="3" fill="currentColor" opacity=".85"/>
            <rect x="107" y="60" width="22" height="60" rx="3" fill="currentColor" opacity=".65"/>
            <rect x="139" y="72" width="22" height="48" rx="3" fill="currentColor" opacity=".45"/>
            <rect x="171" y="45" width="22" height="75" rx="3" fill="currentColor" opacity=".25"/>
            <path d="M86 80 L118 60 L150 72 L182 45" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
            <circle cx="86" cy="80" r="3" fill="currentColor"/>
            <circle cx="118" cy="60" r="3" fill="currentColor"/>
            <circle cx="150" cy="72" r="3" fill="currentColor"/>
            <circle cx="182" cy="45" r="3" fill="currentColor"/>
        </svg>
    );
}

/* ─── Features ─── */
const features = [
    { id: 1, title: "Expense Tracking",   desc: "Track every income and expense effortlessly. Transactions are auto-categorized so you always know where your money goes.",                                          Illustration: ExpenseSvg },
    { id: 2, title: "Budget Planning",    desc: "Set daily and category budgets with real-time progress bars. Get warned before you overspend.",                                                               Illustration: BudgetSvg },
    { id: 3, title: "Runway Calculator",  desc: "See exactly how many days your money will last based on your balance and daily spending average. Stay ahead, never run out.",                              Illustration: RunwaySvg },
    { id: 4, title: "Savings Goals",      desc: "Set savings targets with deadlines and track your progress. Watch your goals get closer with every deposit.",                                               Illustration: SavingsSvg },
    { id: 5, title: "Smart Reports",      desc: "Visual spending patterns, monthly trends, and actionable insights to help you make better financial decisions.",                                           Illustration: ReportSvg },
];

function FeatureCard({ title, desc, Illustration }: { title: string; desc: string; Illustration: React.FC }) {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 36px rgba(0,0,0,0.10)" }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm flex flex-col cursor-pointer"
        >
            <div className="w-full h-[160px] flex items-center justify-center p-4 bg-zinc-50/80 dark:bg-zinc-950 border-b border-black/8 dark:border-white/8">
                <Illustration />
            </div>
            <div className="p-5 flex flex-col gap-1.5">
                <h3 className="text-[14.5px] font-semibold text-black dark:text-white tracking-tight">{title}</h3>
                <p className="text-[13px] text-black/50 dark:text-white/50 leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    );
}

export default function FeaturesSection( {id}: {id?: string} ) {
    return (
        <section id="features" className="w-full bg-white dark:bg-zinc-950 py-20 px-4 font-[Inter,system-ui,sans-serif]">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white tracking-tight">
                        Everything you need to manage your money
                    </h2>
                    <p className="mt-3 text-[15px] text-black/50 dark:text-white/50 max-w-md mx-auto">
                        From tracking expenses to planning your financial future — DompetQ has you covered.
                    </p>
                </div>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={containerVariants}>
                    {/* Row 1 — 2 cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {features.slice(0, 2).map((f) => <FeatureCard key={f.id} {...f} />)}
                    </div>
                    {/* Row 2 — 3 cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {features.slice(2).map((f) => <FeatureCard key={f.id} {...f} />)}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}