// import Image from "next/image";
"use client";

/* ─── Types ─── */
interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  avatar: string;
  variant: "white" | "muted" | "dark";
}

import TestimonialEx1 from "@/components/landing/testimonial-ex-1";
import Hero from "@/components/landing/hero1";
import Cta from "@/components/landing/cta-ex-1";
import Cta2 from "@/components/landing/cta-ex-2";
import FAQ from "@/components/landing/faq1";
import Feature from "@/components/landing/feature-ex-1";
import Contact from "@/components/landing/contact-ex-2";
import Footer from "@/components/landing/footer";
import TutorialSection from "@/components/landing/tutorial";

export default function Home() {
  return (
    <>
      <Hero />
      <Feature id="features" />
      <TutorialSection id="tutorial" />
      <Cta />
      <TestimonialEx1 />
      <Contact id="contact" />
      <FAQ id="faq" />
      <Cta2 />
      <Footer />
    </>
  );
}
