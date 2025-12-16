'use client'
import { motion } from 'framer-motion'
import { track } from '@/lib/analytics'

export function Hero() {
  return (
    <section className="relative overflow-hidden h-screen w-full">
      <div className="mx-auto max-w-6xl px-6 py-28 md:py-36">
        <motion.h1 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-tight">
          Nav Digital Studio
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-lg text-neutral-300 max-w-2xl">
          Black-and-white, x-ray-aesthetic builds that prove capability fast and convert into booked calls.
        </motion.p>
        <div className="mt-10 flex gap-4">
          <a href="#booking" onClick={() => track('cta_click', { area: 'hero' })}
            className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition xray-outline">
            Book a discovery call
          </a>
          <a href="#projects" className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition">
            See work
          </a>
        </div>
      </div>
    </section>
  )
}
