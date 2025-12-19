'use client'

import { motion } from 'framer-motion'
import { track } from '@/lib/analytics'
import { ArrowRight, ArrowDown } from 'lucide-react'

type HeroProps = {
  introDone: boolean
}

export function Hero({ introDone }: HeroProps) {
  const active = introDone

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background video (hero1 only) */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
        >
          <source src="/images/hero1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 xray-grid opacity-25 pointer-events-none" />

      {/* Gradient to ground the center content */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

      {/* Main content – driven by introDone */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{
          duration: 1.4,
          ease: [0.16, 0.84, 0.44, 1],
        }}
        className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 1.1,
            delay: 0.2,
            ease: [0.16, 0.84, 0.44, 1],
          }}
          className="flex items-center gap-3 mb-8"
        >
          <div className="h-px w-12 bg-white/40" />
          <span className="text-sm tracking-widest uppercase text-neutral-400">
            Digital Studio
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: 1.3,
            delay: 0.4,
            ease: [0.16, 0.84, 0.44, 1],
          }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95]"
        >
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '100%' }}
              animate={active ? { y: '0%' } : { y: '100%' }}
              transition={{
                duration: 1.3,
                delay: 0.4,
                ease: [0.16, 0.84, 0.44, 1],
              }}
              className="block"
            >
              Let us Nav-igate
            </motion.span>
          </span>
          <span className="block mt-2 md:mt-4 text-neutral-400 overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              animate={
                active
                  ? { y: '0%', opacity: 1 }
                  : { y: '100%', opacity: 0 }
              }
              transition={{
                duration: 1.3,
                delay: 0.6,
                ease: [0.16, 0.84, 0.44, 1],
              }}
              className="block"
            >
              the hard parts.
            </motion.span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{
            duration: 1.2,
            delay: 0.9,
            ease: [0.16, 0.84, 0.44, 1],
          }}
          className="mt-8 md:mt-12 text-lg md:text-xl text-neutral-300 max-w-2xl leading-relaxed"
        >
          We build digital systems and websites that fit your business.
          Improving what already works and removing what doesn’t, so your
          business runs easier.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{
            duration: 1.0,
            delay: 1.3,
            ease: [0.16, 0.84, 0.44, 1],
          }}
          className="mt-10 flex flex-wrap gap-8 md:gap-16"
        >
          {[
            { value: 'Client-owned', label: 'No lock-in, ever' },
            { value: '2-6 weeks', label: 'typical build' },
            { value: 'Clear costs', label: 'No hidden fees' },
          ].map((stat, i) => (
            <div key={i} className="group">
              <div className="text-2xl md:text-3xl font-bold">
                {stat.value}
              </div>
              <div className="text-sm text-neutral-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 1.0,
            delay: 1.6,
            ease: [0.16, 0.84, 0.44, 1],
          }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#booking"
            onClick={() =>
              track('cta_click', { area: 'hero', action: 'book' })
            }
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-all duration-300"
            data-testid="hero-book-cta"
          >
            Book a discovery call
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#projects"
            onClick={() =>
              track('cta_click', { area: 'hero', action: 'work' })
            }
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
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 2.0 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-neutral-500 uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ArrowDown size={16} className="text-neutral-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}
