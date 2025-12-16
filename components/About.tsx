'use client'
import { motion } from 'framer-motion'

const principles = [
  { title: 'Precision over personality', description: 'Clear systems and sharp execution beat vague creativity.' },
  { title: 'Proof over promises', description: 'We show results, not slide decks. Every project has measurable outcomes.' },
  { title: 'Systems over aesthetics', description: 'Beautiful surfaces built on solid foundations. Design that works, then delights.' },
  { title: 'Decisive not exploratory', description: 'We make opinionated choices quickly. Iteration beats deliberation.' },
]

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-12 bg-white/30" />
              <span className="text-sm tracking-widest uppercase text-neutral-500">Philosophy</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-8"
            >
              Built different.
              <span className="text-neutral-500"> On purpose.</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6 text-lg text-neutral-400"
            >
              <p>
                Nav Digital Studio exists to build digital systems that move the needle. 
                Not template sites. Not trend-chasing designs. Systems that work.
              </p>
              <p>
                We partner with founders and businesses who understand that a website isn't 
                a brochure—it's infrastructure. A tool for growth. A competitive advantage.
              </p>
              <p>
                Every project gets the same rigorous approach: understand the constraints, 
                make decisive choices, build with precision, measure the outcomes.
              </p>
            </motion.div>
          </div>

          {/* Right column - Principles */}
          <div className="space-y-6">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm uppercase tracking-widest text-neutral-500 mb-8"
            >
              Operating Principles
            </motion.h3>
            {principles.map((principle, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10"
              >
                <h4 className="font-semibold mb-2">{principle.title}</h4>
                <p className="text-neutral-400">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
