'use client';

import React from 'react';
import AnimatedList from '@/components/ui/AnimatedList';
import { motion } from 'framer-motion';

const faqItems = [
  (
    <div key="1" className="space-y-1">
      <h4 className="font-semibold text-white">How does the AI optimize my resume?</h4>
      <p className="text-zinc-400 text-sm">Our AI analyzes job descriptions and compares them against your experience. It suggest relevant keywords and rewrites bullet points to maximize impact.</p>
    </div>
  ),
  (
    <div key="2" className="space-y-1">
      <h4 className="font-semibold text-white">Will it pass standard ATS systems?</h4>
      <p className="text-zinc-400 text-sm">Yes. All our templates are parsed and tested against Workday, Greenhouse, Lever, and other major Applicant Tracking Systems.</p>
    </div>
  ),
  (
    <div key="3" className="space-y-1">
      <h4 className="font-semibold text-white">Is there a free trial?</h4>
      <p className="text-zinc-400 text-sm">We provide basic resume analysis and one free AI generation so you can see the value before upgrading to a Pro plan.</p>
    </div>
  ),
  (
    <div key="4" className="space-y-1">
      <h4 className="font-semibold text-white">Can I import my existing LinkedIn profile?</h4>
      <p className="text-zinc-400 text-sm">Absolutely. You can import from LinkedIn or upload an existing PDF, and we will instantly convert it into an editable format.</p>
    </div>
  ),
  (
    <div key="5" className="space-y-1">
      <h4 className="font-semibold text-white">How long does the AI formatting take?</h4>
      <p className="text-zinc-400 text-sm">Usually around 10-15 seconds. We use specialized language models to ensure high-quality output instantly.</p>
    </div>
  ),
  (
    <div key="6" className="space-y-1">
      <h4 className="font-semibold text-white">Do I retain ownership of my data?</h4>
      <p className="text-zinc-400 text-sm">Yes, you completely own your data. We do not sell your personal information, and you can delete your account at any time.</p>
    </div>
  ),
];

export function FAQSection() {
  return (
    <section className="py-20 relative bg-zinc-950 overflow-hidden text-center z-10 border-t border-white/5">
      <div className="container px-6 mx-auto relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium mb-4 border border-blue-500/20">
            Support & FAQs
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
            Commonly Asked Questions
          </h2>
          <p className="text-zinc-400 text-lg">
            Everything you need to know about ROZGAR 24/7 and how it works.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-left"
        >
          <AnimatedList 
            items={faqItems}
            showGradients={true}
            enableArrowNavigation={true}
            displayScrollbar={true}
          />
        </motion.div>
      </div>
      
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
}
