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
   Shared grid: viewBox 240×150, safe area x 24..216 / y 16..134
══════════════════════════════════════════ */

const svgProps = {
    viewBox: "0 0 240 150",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: "w-full h-full text-black dark:text-white",
} as const;

function ExpenseSvg() {
    return (
        <svg {...svgProps}>
            {/* transaction list card */}
            <rect x="32" y="18" width="176" height="114" rx="12" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="32" y1="61" x2="208" y2="61" stroke="currentColor" strokeWidth="1" opacity=".1"/>
            <line x1="32" y1="91" x2="208" y2="91" stroke="currentColor" strokeWidth="1" opacity=".1"/>

            {/* row 1 — expense */}
            <circle cx="56" cy="40" r="9" stroke="currentColor" strokeWidth="1.2" opacity=".35"/>
            <path d="M56 36v8M52.5 40.5 56 44l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
            <rect x="74" y="34" width="62" height="5" rx="2.5" fill="currentColor" opacity=".22"/>
            <rect x="74" y="43" width="38" height="4" rx="2" fill="currentColor" opacity=".1"/>
            <rect x="158" y="36" width="32" height="8" rx="4" fill="currentColor" opacity=".85"/>

            {/* row 2 — income */}
            <circle cx="56" cy="76" r="9" stroke="currentColor" strokeWidth="1.2" opacity=".35"/>
            <path d="M56 80v-8M52.5 75.5 56 72l3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
            <rect x="74" y="70" width="48" height="5" rx="2.5" fill="currentColor" opacity=".22"/>
            <rect x="74" y="79" width="30" height="4" rx="2" fill="currentColor" opacity=".1"/>
            <rect x="166" y="72" width="24" height="8" rx="4" fill="currentColor" opacity=".5"/>

            {/* row 3 — expense */}
            <circle cx="56" cy="110" r="9" stroke="currentColor" strokeWidth="1.2" opacity=".35"/>
            <path d="M56 106v8M52.5 110.5 56 114l3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
            <rect x="74" y="104" width="54" height="5" rx="2.5" fill="currentColor" opacity=".22"/>
            <rect x="74" y="113" width="34" height="4" rx="2" fill="currentColor" opacity=".1"/>
            <rect x="162" y="106" width="28" height="8" rx="4" fill="currentColor" opacity=".28"/>
        </svg>
    );
}

function BudgetSvg() {
    return (
        <svg {...svgProps}>
            <rect x="28" y="16" width="184" height="118" rx="12" stroke="currentColor" strokeWidth="1.5"/>

            {/* Food — 80% */}
            <text x="48" y="45" fontSize="9" fill="currentColor" opacity=".45" fontFamily="Inter,sans-serif">Food</text>
            <rect x="48" y="52" width="112" height="8" rx="4" fill="currentColor" opacity=".08"/>
            <rect x="48" y="52" width="90" height="8" rx="4" fill="currentColor" opacity=".85"/>
            <text x="192" y="59" fontSize="9.5" fill="currentColor" opacity=".8" fontWeight="600" textAnchor="end" fontFamily="Inter,sans-serif">80%</text>

            {/* Transport — 60% */}
            <text x="48" y="79" fontSize="9" fill="currentColor" opacity=".45" fontFamily="Inter,sans-serif">Transport</text>
            <rect x="48" y="86" width="112" height="8" rx="4" fill="currentColor" opacity=".08"/>
            <rect x="48" y="86" width="67" height="8" rx="4" fill="currentColor" opacity=".55"/>
            <text x="192" y="93" fontSize="9.5" fill="currentColor" opacity=".55" fontWeight="600" textAnchor="end" fontFamily="Inter,sans-serif">60%</text>

            {/* Shopping — 20% */}
            <text x="48" y="113" fontSize="9" fill="currentColor" opacity=".45" fontFamily="Inter,sans-serif">Shopping</text>
            <rect x="48" y="120" width="112" height="8" rx="4" fill="currentColor" opacity=".08"/>
            <rect x="48" y="120" width="23" height="8" rx="4" fill="currentColor" opacity=".28"/>
            <text x="192" y="127" fontSize="9.5" fill="currentColor" opacity=".3" fontWeight="600" textAnchor="end" fontFamily="Inter,sans-serif">20%</text>
        </svg>
    );
}

function RunwaySvg() {
    return (
        <svg {...svgProps}>
            {/* gauge track + progress (r=46 → C ≈ 289) */}
            <circle cx="120" cy="75" r="46" stroke="currentColor" strokeWidth="10" opacity=".1"/>
            <circle
                cx="120" cy="75" r="46"
                stroke="currentColor" strokeWidth="10" strokeLinecap="round"
                strokeDasharray="208 289" transform="rotate(-90 120 75)" opacity=".85"
            />
            <text x="120" y="76" fontSize="28" fontWeight="700" fill="currentColor" textAnchor="middle" fontFamily="Inter,sans-serif">25</text>
            <text x="120" y="92" fontSize="9" fill="currentColor" opacity=".45" textAnchor="middle" fontFamily="Inter,sans-serif">days left</text>

            {/* daily burn hint */}
            <rect x="76" y="130" width="88" height="6" rx="3" fill="currentColor" opacity=".08"/>
            <rect x="76" y="130" width="62" height="6" rx="3" fill="currentColor" opacity=".6"/>
        </svg>
    );
}

function SavingsSvg() {
    return (
        <svg {...svgProps}>
            {/* coin stack — bottom (faint) to top (solid) */}
            <ellipse cx="120" cy="98" rx="42" ry="12" stroke="currentColor" strokeWidth="1.4" opacity=".25"/>
            <ellipse cx="120" cy="80" rx="42" ry="12" stroke="currentColor" strokeWidth="1.4" opacity=".45"/>
            <ellipse cx="120" cy="62" rx="42" ry="12" stroke="currentColor" strokeWidth="1.5"/>
            <ellipse cx="120" cy="62" rx="26" ry="7" stroke="currentColor" strokeWidth="1.1" opacity=".3"/>
            <text x="120" y="66" fontSize="11" fontWeight="700" fill="currentColor" textAnchor="middle" fontFamily="Inter,sans-serif">Rp</text>
            <path d="M78 62v18M162 62v18" stroke="currentColor" strokeWidth="1.4" opacity=".35"/>

            {/* goal progress */}
            <rect x="66" y="126" width="108" height="7" rx="3.5" fill="currentColor" opacity=".08"/>
            <rect x="66" y="126" width="76" height="7" rx="3.5" fill="currentColor" opacity=".8"/>
            <path d="M138 116v10" stroke="currentColor" strokeWidth="1.2" opacity=".3" strokeDasharray="2 3"/>
        </svg>
    );
}

function ReportSvg() {
    return (
        <svg {...svgProps}>
            <rect x="28" y="16" width="184" height="118" rx="12" stroke="currentColor" strokeWidth="1.5"/>

            {/* grid */}
            <line x1="52" y1="58" x2="194" y2="58" stroke="currentColor" strokeWidth="1" opacity=".12" strokeDasharray="3 4"/>
            <line x1="52" y1="84" x2="194" y2="84" stroke="currentColor" strokeWidth="1" opacity=".12" strokeDasharray="3 4"/>
            <line x1="52" y1="110" x2="194" y2="110" stroke="currentColor" strokeWidth="1" opacity=".25"/>

            {/* bars */}
            <rect x="62" y="82" width="18" height="28" rx="4" fill="currentColor" opacity=".18"/>
            <rect x="90" y="66" width="18" height="44" rx="4" fill="currentColor" opacity=".18"/>
            <rect x="118" y="74" width="18" height="36" rx="4" fill="currentColor" opacity=".18"/>
            <rect x="146" y="52" width="18" height="58" rx="4" fill="currentColor" opacity=".18"/>
            <rect x="174" y="44" width="18" height="66" rx="4" fill="currentColor" opacity=".18"/>

            {/* trend line */}
            <path d="M71 82 99 66 127 74 155 52 183 44" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="71" cy="82" r="2.6" fill="currentColor"/>
            <circle cx="99" cy="66" r="2.6" fill="currentColor"/>
            <circle cx="127" cy="74" r="2.6" fill="currentColor"/>
            <circle cx="155" cy="52" r="2.6" fill="currentColor"/>
            <circle cx="183" cy="44" r="2.6" fill="currentColor"/>
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
            className="bg-white/60 dark:bg-zinc-900/55 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm flex flex-col cursor-pointer"
        >
            {/* wrapper capped at 240px so every illustration renders at the same scale,
                regardless of card width (2-col row vs 3-col row) */}
            <div className="w-full h-[170px] flex items-center justify-center px-5 py-4 bg-zinc-50/50 dark:bg-zinc-950/50 border-b border-black/8 dark:border-white/8">
                <div className="w-full max-w-[240px] h-full">
                    <Illustration />
                </div>
            </div>
            <div className="p-5 flex flex-col gap-1.5">
                <h3 className="text-[14.5px] font-semibold text-black dark:text-white tracking-tight">{title}</h3>
                <p className="text-[13px] text-black/65 dark:text-white/50 leading-relaxed">{desc}</p>
            </div>
        </motion.div>
    );
}

export default function FeaturesSection({ id }: { id?: string }) {
    return (
        <section id={id ?? "features"} className="w-full py-20 px-4 font-[Inter,system-ui,sans-serif]">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl font-semibold text-black dark:text-white tracking-tight">
                        Everything you need to manage your money
                    </h2>
                    <p className="mt-3 text-[15px] text-black/65 dark:text-white/50 max-w-md mx-auto">
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