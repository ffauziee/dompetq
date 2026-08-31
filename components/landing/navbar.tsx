/* eslint-disable @next/next/no-img-element */
"use client";

import { useTheme } from "@/components/theme/themeProvider";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/** Height of the fixed header in px — used to offset anchor scrolling. */
const HEADER_H = 64;

const navLinks = [
  { target: "features", label: "Features" },
  { target: "tutorial", label: "How it works" },
  { target: "faq", label: "FAQ" },
  { target: "contact", label: "Contact" },
];

/* ─── Switch ─── */

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label="Toggle dark mode"
      onClick={() => onChange(!checked)}
      className={`relative flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 cursor-pointer ${
        checked
          ? "bg-gray-900 dark:bg-neutral-50"
          : "bg-gray-200 dark:bg-neutral-700"
      }`}
    >
      <motion.span
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="h-4 w-4 rounded-full bg-white shadow-sm dark:bg-neutral-900"
      />
    </button>
  );
}

/* ─── Sun / switch / moon cluster ─── */

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const darkMode = theme === "dark";

  return (
    <motion.div
      layout
      className="flex items-center gap-1.5 rounded-lg px-2 py-1.5"
      transition={{ layout: { duration: 0.25 } }}
    >
      <motion.button
        type="button"
        onClick={toggle}
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

      <Toggle checked={darkMode} onChange={toggle} />

      <motion.button
        type="button"
        onClick={toggle}
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

/* ─── Navbar ─── */

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Manual offset instead of scrollIntoView: the header is fixed, so
  // scrollIntoView parks the section title underneath it.
  const scrollToSection = (target: string) => {
    const el = document.getElementById(target);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_H;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
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
          {/* Left: logo + desktop nav */}
          <motion.div
            className="flex items-center gap-8"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Link href="/" aria-label="DompetQ home" className="shrink-0">
              <img
                src="/IconLogo.svg"
                alt="DompetQ"
                width={40}
                height={40}
                className="w-9 h-9 object-contain"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <button
                  key={l.target}
                  type="button"
                  onClick={() => {
                    scrollToSection(l.target);
                    setMenuOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-md text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-100/70 dark:hover:bg-zinc-800/50 transition-all duration-150 font-medium cursor-pointer"
                >
                  {l.label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Right: theme + auth (desktop) */}
          <motion.div
            className="hidden md:flex items-center gap-2"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="px-3.5 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
              >
                Sign up
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: theme + burger (mobile) */}
          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
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
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setTimeout(() => scrollToSection(l.target), 200);
                  }}
                  className="block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div className="px-4 py-3 border-t border-zinc-100 dark:border-zinc-800/60 space-y-2">
              <Link
                href="/auth/login"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              >
                Sign in
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2.5 rounded-md text-sm font-medium bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-center"
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
