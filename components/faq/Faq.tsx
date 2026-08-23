"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MotionAccordion } from "@/components/unlumen-ui/motion-faqs-accordion";
import { faqData } from "./faqData";

function CategoryAccordion({ category, isOpen, onToggle }: { category: typeof faqData[0], isOpen: boolean, onToggle: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="text-2xl md:text-3xl font-medium tracking-tight text-white/90">
          {category.section}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/70"
        >
          {isOpen ? (
            <svg width="14" height="14" viewBox="0 0 14 2" fill="none">
              <path d="M1 1h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          )}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 pt-2">
              <MotionAccordion 
                items={category.questions.map(q => ({
                  question: q.question,
                  answer: <span className="whitespace-pre-wrap">{q.answer}</span>
                }))} 
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openSection, setOpenSection] = useState<string | null>(faqData[0].section);

  return (
    <section className="relative z-10 bg-[#0a0a0a] px-6 py-24 sm:py-32 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-[clamp(2.6rem,8vw,6rem)] leading-none tracking-[-0.03em] text-[#8a6a28] italic">
            FAQs.
          </h2>
        </div>
        
        <div className="flex flex-col">
          {faqData.map((category) => (
            <CategoryAccordion
              key={category.section}
              category={category}
              isOpen={openSection === category.section}
              onToggle={() => setOpenSection(openSection === category.section ? null : category.section)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
