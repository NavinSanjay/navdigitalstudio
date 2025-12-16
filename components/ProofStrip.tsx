'use client'
import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

type Item = { 
  logo?: string
  quote: string
  name: string
  role?: string
  company?: string
}

export function ProofStrip({ items }: { items: Item[] }) {
  return (
    <section className="py-20 md:py-28 border-y border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-sm tracking-widest uppercase text-neutral-500">Testimonials</span>
            <div className="h-px w-12 bg-white/20" />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">Trusted by founders who build to win</h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
            >
              {/* Quote icon */}
              <Quote size={32} className="text-white/10 mb-6" />
              
              {/* Quote text */}
              <p className="text-lg text-neutral-200 leading-relaxed mb-8">
                "{it.quote}"
              </p>
              
              {/* Attribution */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-lg font-semibold">
                  {it.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-neutral-500">
                    {it.role && <span>{it.role}</span>}
                    {it.role && it.company && <span> @ </span>}
                    {it.company && <span>{it.company}</span>}
                    {!it.role && !it.company && <span>Client</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
