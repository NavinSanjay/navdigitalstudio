'use client'

import { motion } from 'framer-motion'

export default function Pricing() {
  return (
    <section className="h-screen flex items-center justify-center px-4 snap-start">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center max-w-2xl"
      >
        <h2 className="text-4xl font-bold mb-4">Pricing</h2>
        <p className="text-muted-foreground">This is the pricing section. Customize it as needed.</p>
      </motion.div>
    </section>
  )
}
