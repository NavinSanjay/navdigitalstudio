'use client'
import { motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState } from 'react'

type Item = { 
  logo?: string
  quote: string
  name: string
  role?: string
  company?: string
}

export function ProofStrip({ items }: { items: Item[] }) {
  // Triple the items for seamless infinite scroll illusion
  const extendedItems = [...items, ...items, ...items]
  
  const [ref, api] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'center',
      skipSnaps: false,
      dragFree: true,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  )
  
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => api && api.scrollPrev(), [api])
  const scrollNext = useCallback(() => api && api.scrollNext(), [api])

  useEffect(() => {
    if (!api) return
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap())
    api.on('select', onSelect)
    onSelect()
    return () => { api.off('select', onSelect) }
  }, [api])

  return (
    <section className="relative py-16 md:py-20 bg-black overflow-hidden">
      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]" />
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      {/* Floating accent lines */}
      <motion.div 
        className="absolute top-8 left-1/4 w-px h-16 bg-gradient-to-b from-white/20 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div 
        className="absolute bottom-8 right-1/4 w-px h-16 bg-gradient-to-t from-white/20 to-transparent"
        initial={{ opacity: 0, scaleY: 0 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Compact header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="h-px bg-white/30"
                initial={{ width: 0 }}
                whileInView={{ width: 32 }}
                transition={{ duration: 0.6 }}
              />
              <span className="text-xs tracking-[0.2em] uppercase text-neutral-500">Testimonials</span>
            </div>
            <h2 className="text-xl md:text-2xl font-medium text-white/90">Trusted by founders</h2>
          </div>
          
          {/* Navigation buttons - positioned in header for cleaner look */}
          <div className="flex items-center gap-2">
            <button 
              onClick={scrollPrev}
              className="group w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} className="text-white/70 group-hover:text-black transition-colors" />
            </button>
            <button 
              onClick={scrollNext}
              className="group w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} className="text-white/70 group-hover:text-black transition-colors" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={ref}>
          <div className="flex">
            {extendedItems.map((it, i) => {
              const isCenter = i % items.length === selectedIndex % items.length
              
              return (
                <motion.div
                  key={i}
                  className="min-w-[320px] md:min-w-[400px] lg:min-w-[440px] pl-4 md:pl-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                >
                  <div 
                    className={`
                      relative h-full p-6 md:p-8 rounded-2xl transition-all duration-500 cursor-grab active:cursor-grabbing
                      ${isCenter 
                        ? 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/20 scale-100' 
                        : 'bg-white/[0.02] border-white/10 scale-[0.97] opacity-70'
                      }
                      border backdrop-blur-sm
                    `}
                    style={{
                      transform: isCenter ? 'perspective(1000px) rotateY(0deg)' : 'perspective(1000px) rotateY(2deg)',
                      boxShadow: isCenter 
                        ? '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.1)' 
                        : '0 10px 30px -10px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#c9ae75]/[0.05] via-transparent to-transparent pointer-events-none" />
                    
                    {/* Quote icon with glow */}
                    <div className="relative mb-5">
                      <Quote size={24} className="text-white/20" />
                      {/* <div className="absolute inset-0 blur-xl bg-[#c9ae75]/5 rounded-full scale-150" /> */}
                    </div>
                    
                    {/* Quote text */}
                    <p className="relative text-base md:text-lg text-neutral-200 leading-relaxed mb-6 line-clamp-4">
                      "{it.quote}"
                    </p>
                    
                    {/* Attribution with 3D effect */}
                    <div className="relative flex items-center gap-4 pt-4 border-t border-white/10">
                      {/* Avatar with ring */}
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-sm" />
                        <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-sm font-semibold border border-white/10">
                          {it.name.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-white/90 truncate">{it.name}</div>
                        <div className="text-xs text-neutral-500 truncate">
                          {it.role && <span>{it.role}</span>}
                          {it.role && it.company && <span className="mx-1">·</span>}
                          {it.company && <span>{it.company}</span>}
                          {!it.role && !it.company && <span>Client</span>}
                        </div>
                      </div>
                    </div>
                    
                    {/* Corner accent */}
                    <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/10 rounded-tr-lg" />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom accent bar */}
        <motion.div 
          className="mt-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            <span className="text-xs text-neutral-600 tracking-wider">SCROLL TO EXPLORE</span>
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
        </motion.div>
      </div>
    </section>
  )
}