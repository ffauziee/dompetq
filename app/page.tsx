import TestimonialEx1 from "@/components/landing/testimonial-ex-1";
// import Hero from "@/components/landing/hero1";
import Cta from "@/components/landing/cta-ex-1";
import Cta2 from "@/components/landing/cta-ex-2";
import FAQ from "@/components/landing/faq1";
import Feature from "@/components/landing/feature-ex-1";
import Contact from "@/components/landing/contact-ex-2";
import Footer from "@/components/landing/footer";
import TutorialSection from "@/components/landing/tutorial";
import ConstellationBackground from "@/components/ui/constellation-background";
import ConstellationHero from "@/components/ui/constellation-grid";

export default function Home() {
  return (
    <>
      <ConstellationBackground />
      <ConstellationHero />
      {/* <Hero /> */}

      <div className="relative">
        {/* fade from hero to scrim */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 -z-[1] bg-gradient-to-b from-transparent via-white/40 to-white/80 dark:via-zinc-950/40 dark:to-zinc-950/80"
        />
        {/* main scrim */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-32 bottom-0 -z-[1] bg-white/80 dark:bg-zinc-950/80"
        />

        <Feature id="features" />
        <TutorialSection id="tutorial" />
        <Cta />
        <TestimonialEx1 />
        <Contact id="contact" />
        <FAQ id="faq" />
        <Cta2 />
        <Footer />
      </div>
    </>
  );
}
