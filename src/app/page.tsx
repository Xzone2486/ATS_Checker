import { Link } from "react-router-dom";
import { Header } from "@/components/ui/header-1";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/landing/Hero";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ResumeCarousel } from "@/components/landing/ResumeCarousel";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { HowWeHelp } from "@/components/landing/HowWeHelp";
import { WithYouEveryStep } from "@/components/landing/WithYouEveryStep";
import { FAQSection } from "@/components/landing/FAQSection";
import LineWaves from "@/components/landing/LineWaves";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col selection:bg-teal-500/30 relative">

      <Header />
      
      <div className="flex-1 flex flex-col relative z-10">
        <Hero />
        <FeaturesSection />
        <ResumeCarousel />
        <Testimonials />
        
        <HowWeHelp />

        <WithYouEveryStep />
        <HowItWorks />
        <FAQSection />
      </div>

      {/* Pre-footer CTA — LineWaves shader background */}
      <section className="py-20 relative overflow-hidden border-t border-white/10 bg-zinc-950 z-10 dark">
        {/* Full-bleed shader canvas */}
        <div aria-hidden="true" className="absolute inset-0 z-0 mix-blend-screen opacity-20">
          <LineWaves
            speed={0.3}
            innerLineCount={64}
            outerLineCount={72}
            warpIntensity={1}
            rotation={-45}
            edgeFadeWidth={0}
            colorCycleSpeed={1}
            brightness={0.8}
            color1="#7cff67"
            color2="#B19EEF"
            color3="#5227FF"
            enableMouseInteraction={true}
          />
        </div>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 z-[1] bg-black/50" />
        
        <div className="container px-6 mx-auto text-center relative z-[2]">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Join 50,000+ professionals who have supercharged their career with ROZGAR 24/7.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/ats-analysis"
              className="bg-white text-zinc-900 border border-white/20 hover:bg-white/90 hover:scale-[1.03] h-14 rounded-xl px-10 text-base font-semibold transition-all inline-flex items-center justify-center whitespace-nowrap shadow-lg"
            >
              Analyze My Resume
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
