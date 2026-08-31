/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {
  FaInstagram, // Instagram
  FaLinkedin, // LinkedIn
  FaGithub, // GitHub
  FaThreads, // Threads
} from "react-icons/fa6";

// const navLinks = [
//   { target: "features", label: "Features" },
//   { target: "pricing", label: "Pricing" },
//   { target: "about", label: "About" },
//   { target: "contact", label: "Contact" },
// ];

// const FOOTER_PRODUCT = [
//   { label: "Blocks", href: "/blocks" },
//   { label: "Templates", href: "/templates" },
//   { label: "Pricing", href: "/pricing" },
//   { label: "Docs", href: "/docs" },
//   { label: "Changelog", href: "/changelog" },
// ];

const FOOTER_MORE = [
  { label: "FAQ", href: "/#faq" },
  { label: "Login", href: "/auth/login" },
  { label: "Sign up", href: "/auth/register" },
];

const FOOTER_LEGAL = [
  { label: "License", href: "/license" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "mailto:fauzie2539@gmail.com" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ffauziee/",
    Icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ffauziee",
    Icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/ffauziee",
    Icon: FaGithub,
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@ffauziee",
    Icon: FaThreads,
  },
];

export default function Footer1() {
  return (
    <footer className="border-t border-gray-100 dark:border-zinc-800 mt-24 py-16 px-6">
      <div className="max-w-7xl mx-auto px-6 pt-10s">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-2">
            <div className="mb-3">
              <img
                src="/logoFull.svg"
                alt="DompetQ"
                width={998}
                height={482}
                className="h-10 w-auto dark:invert"
              />
            </div>
            <p className="text-gray-400 dark:text-zinc-500 text-xs leading-relaxed max-w-45">
              Manage your finances with ease and confidence. DompetQ is your
              trusted partner for smart money management.
            </p>
          </div>
          <div>
            <p className="text-gray-400 dark:text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">
              More
            </p>
            <ul className="space-y-2.5">
              {FOOTER_MORE.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-gray-400 dark:text-zinc-500 text-xs font-semibold uppercase tracking-widest mb-4">
              Legal
            </p>
            <ul className="space-y-2.5">
              {FOOTER_LEGAL.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-gray-500 dark:text-zinc-400 hover:text-black dark:hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-8 border-t border-gray-100 dark:border-zinc-800">
          <p className="text-gray-400 dark:text-zinc-500 text-xs">
            © {new Date().getFullYear()} DompetQ — Personal Finance Manager.
            Built with care by{" "}
            <a
              href="https://github.com/ffauziee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-gray-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-colors underline underline-offset-4"
            >
              ffauziee
            </a>
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                className="w-9 h-9 flex items-center justify-center text-gray-400 dark:text-zinc-500 hover:text-black dark:hover:text-white transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
