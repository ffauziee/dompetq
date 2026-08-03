/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Calendar, Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/theme/themeProvider";

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer ${
        checked
          ? "bg-gray-900 dark:bg-neutral-50"
          : "bg-gray-200 dark:bg-neutral-700"
      }`}
    >
      <motion.span
        // layout
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="h-4 w-4 rounded-full bg-white shadow-sm dark:bg-neutral-900"
        // style={{ marginLeft: checked ? "18px" : "2px" }}
      />
    </button>
  );
}

function ThemeToggle({
  darkMode,
  onToggleTheme,
}: {
  darkMode: boolean;
  onToggleTheme: () => void;
}) {
  return (
    <motion.div
      layout
      className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
      transition={{
        layout: { duration: 0.25 },
      }}
    >
      <motion.button
        type="button"
        onClick={() => onToggleTheme()}
        aria-label="Switch to light mode"
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.15 }}
        className={`flex h-4 w-4 cursor-pointer items-center justify-center ${
          darkMode ? "text-gray-500 hover:text-gray-300" : "text-gray-900"
        }`}
      >
        <AnimatePresence mode="wait">
          {!darkMode && (
            <motion.div
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={14} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <Toggle checked={darkMode} onChange={onToggleTheme} />

      <motion.button
        type="button"
        onClick={() => onToggleTheme()}
        aria-label="Switch to dark mode"
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.15 }}
        className={`flex h-4 w-4 cursor-pointer items-center justify-center ${
          darkMode ? "text-gray-50" : "text-gray-300 hover:text-gray-500"
        }`}
      >
        <AnimatePresence mode="wait">
          {darkMode && (
            <motion.div
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={14} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}

export default function Hero1() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px 0px" });

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 120]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  const bars = [40, 65, 45, 80, 75, 90];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { target: "features", label: "Features" },
    { target: "about", label: "About" },
    { target: "contact", label: "Contact" },
  ];
  return (
    <div
      className="min-h-screen bg-white dark:bg-zinc-950 overflow-hidden"
      style={{
        fontFamily: "var(--font-geist-sans, 'Geist', system-ui, sans-serif)",
      }}
      ref={heroRef}
    >
      <motion.header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
            : "bg-transparent",
        ].join(" ")}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="flex items-center gap-8"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <Link href="/" className="bg-white rounded-xl overflow-hidden">
                <img
                  src="/LogoFull.svg"
                  alt="DompetQ logo"
                  className="w-10 h-10 object-contain"
                />
              </Link>

              <nav className="hidden md:block">
                {navLinks.map((l) => (
                  <button
                    key={l.target}
                    onClick={() => {
                      scrollToSection(l.target);
                      setMenuOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-md text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 transition-all duration-150 font-medium"
                  >
                    {l.label}
                  </button>
                ))}
              </nav>
            </motion.div>

            <motion.div
              className="hidden md:flex items-center gap-2"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <ThemeToggle
                darkMode={theme === "dark"}
                onToggleTheme={toggleTheme}
              />
              <Link
                href="/auth/login"
                className="px-3.5 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
              >
                Sign in
              </Link>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/auth/register"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                >
                  Sign up
                </Link>
              </motion.div>
            </motion.div>

            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle
                darkMode={theme === "dark"}
                onToggleTheme={toggleTheme}
              />
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800/60"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="px-4 py-3 space-y-0.5">
                {navLinks.map((l) => (
                  <button
                    key={l.target}
                    onClick={() => {
                      setMenuOpen(false);
                      setTimeout(() => {
                        scrollToSection(l.target);
                      }, 200);
                    }}
                    className="block px-3 py-2.5 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800/60 space-y-2">
                <Link
                  href="/auth/login"
                  className="block px-3 py-2.5 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/auth/register"
                  className="block px-3 py-2.5 rounded-md text-sm font-medium bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <section className="relative pt-28 pb-24 md:pt-36 md:pb-32 overflow-hidden">
        <motion.div
          className="pointer-events-none absolute -top-32 -right-32 w-125 h-125 rounded-full bg-zinc-100 dark:bg-zinc-900"
          style={{ y: y1 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className="pointer-events-none absolute -bottom-48 -left-48 w-150 h-150 rounded-full bg-zinc-100 dark:bg-zinc-900"
          style={{ y: y2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">
            <div className="lg:w-1/2 mb-14 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-8"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs font-medium tracking-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  New — Beta v1.0 available
                </span>
              </motion.div>

              <motion.h1
                className="text-[2.6rem] sm:text-5xl lg:text-[3.4rem] font-semibold leading-[1.1] tracking-[-0.03em] text-zinc-950 dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                Take control
                <br />
                of your{" "}
                <span className="relative">
                  <span className="relative z-10">finances</span>
                  <motion.span
                    className="absolute bottom-1 left-0 right-0 h-1.25 bg-zinc-200 dark:bg-zinc-700 rounded-full z-0"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.75 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed mb-9 max-w-md"
                initial={{ opacity: 0 }}
                animate={heroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                DompetQ helps you take control of your personal finances. Track
                expenses, set budgets, and reach your financial goals with
                confidence.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                  >
                    Sign in
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                  >
                    Create account
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.75,
                delay: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className="absolute -right-4 -bottom-4 w-32 h-32 bg-zinc-100 dark:bg-zinc-900 rounded-2xl"
                initial={{ rotate: 0 }}
                animate={{ rotate: 8 }}
                transition={{ type: "spring", stiffness: 60, delay: 1 }}
              />

              <div className="relative z-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_40px_-8px_rgba(0,0,0,0.6)] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-tight">
                    DompetQ — Dashboard
                  </span>
                  <div className="w-12" />
                </div>

                <div className="p-5 space-y-5">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        label: "Balance",
                        value: "Rp 12,5jt",
                        delta: "+Rp 2,1jt",
                      },
                      { label: "Spending", value: "Rp 4,2jt", delta: "-8%" },
                      { label: "Goals", value: "3/5", delta: "2 active" },
                    ].map((s, i) => (
                      <motion.div
                        key={i}
                        className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-3 border border-zinc-100 dark:border-zinc-800"
                        initial={{ opacity: 0, y: 8 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                      >
                        <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 mb-1 tracking-wide uppercase">
                          {s.label}
                        </p>
                        <p className="text-xl font-semibold text-zinc-950 dark:text-white tracking-tight">
                          {s.value}
                        </p>
                        <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                          {s.delta}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-white mb-3 tracking-tight">
                      Recent Transactions
                    </p>
                    <div className="space-y-2">
                      {[
                        {
                          name: "Monthly Budget",
                          date: "Dec 1, 2025",
                          count: "Rp 5,0jt",
                        },
                        {
                          name: "Emergency Fund",
                          date: "Dec 5, 2025",
                          count: "Rp 2,5jt",
                        },
                      ].map((ev, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800"
                          initial={{ opacity: 0, x: -8 }}
                          animate={heroInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.7 + i * 0.1, duration: 0.4 }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                              <Calendar className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                            </div>
                            <div>
                              <p className="text-[13px] font-medium text-zinc-900 dark:text-white leading-none">
                                {ev.name}
                              </p>
                              <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                                {ev.date}
                              </p>
                            </div>
                          </div>
                          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                            {ev.count} budgeted
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-white mb-3 tracking-tight">
                      Monthly stats
                    </p>
                    <div className="flex items-end gap-2 h-20 px-1">
                      {bars.map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 flex flex-col items-center gap-1"
                        >
                          <motion.div
                            className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-t-md"
                            style={{ height: `${h}%` }}
                            initial={{ scaleY: 0, originY: 1 }}
                            animate={heroInView ? { scaleY: 1 } : {}}
                            transition={{
                              delay: 0.8 + i * 0.06,
                              duration: 0.5,
                              ease: "easeOut",
                            }}
                          >
                            {h === 90 && (
                              <div className="w-full h-full bg-zinc-900 dark:bg-white rounded-t-md" />
                            )}
                          </motion.div>
                          <span className="text-[9px] text-zinc-400 dark:text-zinc-600">
                            {months[i]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            {/* <p className="text-center text-xs font-medium text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-6">
              Trusted by
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {[
                "https://www.google.com/favicon.ico",
                "https://www.microsoft.com/favicon.ico",
                "https://www.amazon.com/favicon.ico",
                "https://www.apple.com/favicon.ico",
              ].map((logo, i) => (
                <img
                  key={i}
                  src={logo}
                  alt={`Partner logo ${i + 1}`}
                  className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
                />
              ))}
            </div> */}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
