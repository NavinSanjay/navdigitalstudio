'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Item = { logo: string; quote: string; name: string }
export function ProofStrip({ items }: { items: Item[] }) {
  return (
    <section className="border-y border-white/10 bg-white/[0.02]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.05 }} className="flex items-center gap-4 p-4 rounded-lg xray-outline bg-white/[0.01]">
              <div className="relative w-28 h-10 bg-white/5 rounded">
                <Image src={it.logo} alt="logo" fill className="object-contain p-2" />
              </div>
              <p className="text-sm text-neutral-300">“{it.quote}”</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
