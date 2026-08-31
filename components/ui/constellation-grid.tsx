/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import Navbar from '@/components/landing/navbar';

export default function ConstellationHero() {
    return (
        <>
            <Navbar />

            {/* pt-16 clears the fixed 64px header so the content stays optically centered */}
            <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16 text-center">
                <h1 className="m-0">
                    <img
                        src="/logoFull.svg"
                        alt="DompetQ"
                        width={998}
                        height={482}
                        fetchPriority="high"
                        className="h-auto w-[260px] md:w-[400px] dark:invert"
                    />
                </h1>
                <h2 className="mt-8 max-w-2xl text-2xl md:text-4xl font-bold leading-tight tracking-tight text-black dark:text-white">
                    Know exactly where your money goes.
                </h2>
                <p className="mt-4 max-w-md text-sm md:text-base leading-relaxed text-black/65 dark:text-white/70">
                    Track income and expenses, set budgets by category, and see how many
                    days your balance will actually last.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        href="/auth/register"
                        className="bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full px-7 py-3.5 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                        Get Started Free
                    </Link>
                    <Link
                        href="/auth/login"
                        className="border-2 border-black dark:border-white text-black dark:text-white text-sm font-semibold rounded-full px-7 py-3.5 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            </section>
        </>
    );
}
