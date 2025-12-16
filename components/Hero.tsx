'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { track } from '@/lib/analytics'
import { useRef } from 'react'
import { ArrowRight, ArrowDown } from 'lucide-react'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section 
      ref={ref}
      id="hero" 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 xray-grid opacity-30" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40"
      >
        {/* Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-white/40" />
          <span className="text-sm tracking-widest uppercase text-neutral-400">
            Digital Studio
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
        >
          <span className="block">Precision-built</span>
          <span className="block mt-2 md:mt-4 text-neutral-400">digital systems.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 md:mt-12 text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed"
        >
          Strategy, design, and engineering for founders who build to win. 
          We create websites and products that convert—no templates, no compromise.
        </motion.p>

        {/* Stats row */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-8 md:gap-16"
        >
          {[
            { value: '40+', label: 'Projects shipped' },
            { value: '2-6', label: 'Weeks typical build' },
            { value: '100%', label: 'Code ownership' },
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4"
        >
          <a 
            href="#booking" 
            onClick={() => track('cta_click', { area: 'hero', action: 'book' })}
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-all duration-300"
            data-testid="hero-book-cta"
          >
            Book a discovery call
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="#projects" 
            onClick={() => track('cta_click', { area: 'hero', action: 'work' })}
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-all duration-300"
            data-testid="hero-work-cta"
          >
            See the work
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-neutral-500 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} className="text-neutral-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
