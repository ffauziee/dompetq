import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
};

const staggerItem = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const steps = [
  {
    number: "001",
    title: "Connect Accounts",
    description:
      "Link your bank accounts, e-wallets, or add cash manually. All your finances in one place — no more switching apps.",
  },
  {
    number: "002",
    title: "Set a Budget",
    description:
      "Define your daily spending limit and category budgets. We'll track every rupiah and warn you before you overspend.",
  },
  {
    number: "003",
    title: "Track Expenses",
    description:
      "Log transactions on the go with auto-categorization. See exactly where your money goes each month.",
  },
  {
    number: "004",
    title: "Know Your Runway",
    description:
      "DompetQ calculates how many days your money will last based on your daily spending habits. Stay in control, always.",
  },
];

export default function TutorialSection({ id }: { id?: string }) {
  return (
    <motion.section
      className="max-w-7xl mx-auto px-6 pt-10 pb-20 border-x border-black/10 dark:border-white/10"
      {...fadeInUp}
    >
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight text-black dark:text-white">
              Your money, under control in 4 simple steps.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-black/70 dark:text-white/70">
              No spreadsheets, no stress. DompetQ helps you track, budget, and
              plan your finances with a clean, simple dashboard.
            </p>
            <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-medium rounded-lg transition hover:bg-black/80 dark:hover:bg-white/90 flex items-center gap-2">
              <span className="text-lg leading-none">→</span>
              <span>Get Started Free</span>
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="w-full border-t border-black/10 dark:border-white/10"
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
      >
        <div className="grid md:grid-cols-4">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              className={`px-6 py-12 ${i < 3 ? "border-r border-black/10 dark:border-white/10" : ""}`}
              variants={staggerItem}
            >
              <div className="text-xs text-black/50 dark:text-white/50 font-mono tracking-wider mb-6">
                {item.number}
              </div>
              <div className="w-8 h-8 mb-6 text-black/50 dark:text-white/50">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="4" y="4" width="5" height="5" />
                  <rect x="15" y="4" width="5" height="5" />
                  <rect x="4" y="15" width="5" height="5" />
                  <rect x="15" y="15" width="5" height="5" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3 text-black dark:text-white">
                {item.title}
              </h3>
              <p className="text-sm text-black/50 dark:text-white/50 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
