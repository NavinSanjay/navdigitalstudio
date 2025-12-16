'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { track } from '@/lib/analytics'

type Proj = { slug: string; title: string; year: string; role: string; media: string[] }

export function ProjectsRail({ items }: { items: Proj[] }) {
  const [ref, api] = useEmblaCarousel({ loop: true, align: 'start' })
  const scrollPrev = useCallback(() => api && api.scrollPrev(), [api])
  const scrollNext = useCallback(() => api && api.scrollNext(), [api])

  return (
    <section id="projects" className="py-24 bg-[#F3F3F3] h-screen w-full text-black overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:mb-72">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Featured projects</h2>
          <div className="flex gap-2">
            <button onClick={scrollPrev} className="px-3 py-2 border border-white/20 rounded-lg">Prev</button>
            <button onClick={scrollNext} className="px-3 py-2 border border-white/20 rounded-lg">Next</button>
          </div>
        </div>

        <div className="mt-8 overflow-hidden" ref={ref}>
          <div className="flex gap-6">
            {items.map((p, idx) => (
              <motion.a href={`/#case-${p.slug}`} onClick={() => track('case_study_opened', { slug: p.slug })}
                key={p.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="min-w-[320px] md:min-w-[520px] group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] xray-outline">
                <div className="relative aspect-[16/9]">
                  <Image src={p.media[0]} alt={p.title} fill className="object-cover" />
                  <div className="absolute inset-0 pointer-events-none ring-1 ring-white/10" />
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{p.title}</h3>
                    <p className="text-sm text-neutral-400">{p.role}</p>
                  </div>
                  <span className="text-xs text-neutral-400">{p.year}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
