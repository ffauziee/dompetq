"use client";

import { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: "001",
    question: "What is DompetQ?",
    answer:
      "DompetQ is a personal finance management app that helps you track expenses, set budgets, and achieve your financial goals. It provides a clear overview of your spending habits and savings progress.",
  },
  {
    id: "002",
    question: "Is my financial data secure?",
    answer:
      "Yes, your data is encrypted and stored securely. We use industry-standard encryption protocols and never share your personal financial information with third parties without your explicit consent.",
  },
  {
    id: "003",
    question: "Can I track multiple accounts?",
    answer:
      "Absolutely! You can add and manage multiple accounts including savings, checking, credit cards, and investment portfolios — all in one place for a complete view of your finances.",
  },
  {
    id: "004",
    question: "Is there a mobile app?",
    answer:
      "DompetQ is fully responsive and works seamlessly on mobile, tablet, and desktop browsers. A dedicated mobile app for iOS and Android is currently in development.",
  },
  {
    id: "005",
    question: "Is DompetQ free to use?",
    answer:
      "We offer a generous free tier with essential features. Premium plans with advanced analytics, custom categories, and export options are available for users who need more.",
  },
  {
    id: "006",
    question: "How do I export my data?",
    answer:
      "You can export your financial data in CSV and PDF formats at any time. Premium users also get access to detailed report exports for tax preparation and financial planning.",
  },
];

export default function FAQ({ id }: { id?: string }) {
  const [expandedId, setExpandedId] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const faqListRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Animate header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            },
          },
        );
      }

      // Animate FAQ items with stagger
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 60%",
                scrub: 1,
              },
              delay: index * 0.05,
            },
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (id: string, index: number) => {
    const itemEl = itemsRef.current[index];
    const contentEl = itemEl?.querySelector(
      `#faq-content-${id}`,
    ) as HTMLElement;

    if (!contentEl) return;

    const isExpanding = expandedId !== id;
    const lenisEase = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

    if (isExpanding) {
      // Close other open item
      if (expandedId) {
        const otherIndex = faqItems.findIndex((item) => item.id === expandedId);
        const otherItemEl = itemsRef.current[otherIndex];
        const otherContentEl = otherItemEl?.querySelector(
          `#faq-content-${expandedId}`,
        ) as HTMLElement;
        if (otherContentEl) {
          gsap.to(otherContentEl, {
            height: 0,
            opacity: 0,
            duration: 0.6,
            ease: lenisEase,
          });
        }
      }

      setExpandedId(id);

      requestAnimationFrame(() => {
        const actualHeight = contentEl.scrollHeight;
        gsap.fromTo(
          contentEl,
          { height: 0, opacity: 0 },
          {
            height: actualHeight,
            opacity: 1,
            duration: 0.8,
            ease: lenisEase,
          },
        );

        // Animate text fade in
        const textEl = contentEl.querySelector("p");
        if (textEl) {
          gsap.fromTo(
            textEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: lenisEase, delay: 0.1 },
          );
        }
      });
    } else {
      // Collapse
      gsap.to(contentEl, {
        height: 0,
        opacity: 0,
        duration: 0.6,
        ease: lenisEase,
        onComplete: () => {
          setExpandedId("");
        },
      });
    }
  };

  return (
    <div id={id} ref={containerRef} className="min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-2 sm:py-6 md:py-16">
        {/* Main Layout - Two columns: Title on left, FAQs on right */}
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          {/* Left Column - Title & Description */}
          <div ref={headerRef} className="w-full md:w-1/3 flex-shrink-0">
            <h1 className="font-sans text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-black dark:text-white leading-none mb-4 sm:mb-6">
              FAQ.
            </h1>
            <p className="font-sans text-xs sm:text-sm md:text-base font-normal leading-relaxed text-black/70 dark:text-white/70">
              Everything you need to know about DompetQ. Cant find what youre
              looking for? Reach out to our support team.
            </p>
          </div>

          {/* Right Column - FAQ Items */}
          <div ref={faqListRef} className="flex-1 w-full md:w-2/3">
            <div className="space-y-0">
              {faqItems.map((item, index) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) itemsRef.current[index] = el;
                  }}
                  className="border-b border-black/10 dark:border-white/10"
                >
                  <button
                    onClick={() => toggleFAQ(item.id, index)}
                    className="w-full flex items-start justify-between gap-4 sm:gap-6 py-4 p-3 sm:py-5 md:py-6 hover:bg-black/2 dark:hover:bg-white/5 transition-colors text-left group cursor-pointer rounded"
                  >
                    <h3 className="font-sans text-sm sm:text-base md:text-lg font-normal tracking-tight text-black dark:text-white flex-1 text-left">
                      {item.question}
                    </h3>
                    <span className="flex-shrink-0 text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors pointer-events-none min-w-fit">
                      {expandedId === item.id ? (
                        <span className="text-lg sm:text-xl font-light">−</span>
                      ) : (
                        <Plus size={20} className="sm:w-6 sm:h-6" />
                      )}
                    </span>
                  </button>

                  {/* Expanded Content */}
                  <div
                    id={`faq-content-${item.id}`}
                    style={{
                      overflow: "hidden",
                      height: 0,
                      opacity: 0,
                    }}
                  >
                    <div className="pb-4 sm:pb-5 md:pb-6 border-t border-black/5 dark:border-white/5">
                      <p className="font-sans text-xs sm:text-sm md:text-base font-normal p-6 leading-relaxed text-black/70 dark:text-white/70 pt-4 sm:pt-5 md:pt-6">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
