'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useCallback, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { track } from '@/lib/analytics'
import { X, ArrowRight, ArrowLeft, ExternalLink,ChevronLeft, ChevronRight } from 'lucide-react'

type Proj = { 
  slug: string
  title: string
  year: string | number
  role: string
  stack?: string[]
  summary?: string
  problem?: { context?: string; constraints?: string[] }
  approach?: { strategy?: string; key_decisions?: string[] }
  outcome?: { results?: string[]; metrics?: { label: string; value: string }[] }
  media: string[] | { type?: string; src: string; alt?: string }[]
  cta?: { label?: string; href?: string }
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-black/10 rounded-full"
          initial={{
            x: Math.random() * 100 + '%',
            y: Math.random() * 100 + '%',
          }}
          animate={{
            y: [null, Math.random() * 100 + '%'],
            x: [null, Math.random() * 100 + '%'],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

// Grid pattern component
function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

// Animated corner accents
function CornerAccents() {
  return (
    <>
      <motion.div 
        className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-black/10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />
      <motion.div 
        className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-black/10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      />
      <motion.div 
        className="absolute bottom-8 left-8 w-24 h-24 border-l-2 border-b-2 border-black/10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.div 
        className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-black/10"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
    </>
  )
}

export function ProjectsRail({ items }: { items: Proj[] }) {
  const [ref, api] = useEmblaCarousel(
    { loop: true, align: 'start', skipSnaps: false },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  )
  const [selectedProject, setSelectedProject] = useState<Proj | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const scrollPrev = useCallback(() => api && api.scrollPrev(), [api])
  const scrollNext = useCallback(() => api && api.scrollNext(), [api])

  // Track scroll progress and selected index
  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setSelectedIndex(api.selectedScrollSnap())
    }

    const onScroll = () => {
      const progress = Math.max(0, Math.min(1, api.scrollProgress()))
      setScrollProgress(progress)
    }

    api.on('select', onSelect)
    api.on('scroll', onScroll)
    onSelect()

    return () => {
      api.off('select', onSelect)
      api.off('scroll', onScroll)
    }
  }, [api])

  const getMediaSrc = (media: string | { src: string }) => {
    return typeof media === 'string' ? media : media.src
  }

  const openCase = (p: Proj) => {
    track('case_study_opened', { slug: p.slug })
    setSelectedProject(p)
  }
  return (
    <>
      <section id="projects" className="relative py-24 md:py-32 bg-[#F3F3F3] min-h-screen w-full text-black overflow-hidden">
        {/* Background elements */}
        <GridPattern />
        <FloatingParticles />
        <CornerAccents />
        
        {/* Large decorative number */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 -left-20 text-[400px] font-bold text-black/[0.02] select-none pointer-events-none hidden lg:block"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          NAVDIGITALSTUDIOS
        </motion.div>

        {/* Vertical text accent */}
        <motion.div 
          className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-px h-20 bg-black/20" />
          <span className="text-xs tracking-[0.3em] uppercase text-black/40 [writing-mode:vertical-lr] rotate-180">
            Featured Work
          </span>
          <div className="w-px h-20 bg-black/20" />
        </motion.div>

        <div className="relative mx-auto max-w-7xl px-6">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <motion.div 
                  className="h-px bg-black/30"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.8 }}
                />
                <span className="text-sm tracking-widest uppercase text-neutral-500">Case Studies</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
              >
                Featured work
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-neutral-600 max-w-xl text-lg"
              >
                Real outcomes from real projects. Each case study shows the problem, 
                our approach, and the measurable results.
              </motion.p>
            </div>
            
            {/* Navigation controls */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              {/* Progress indicator */}
              {/* <div className="hidden md:flex items-center gap-2 mr-4">
                <span className="text-2xl font-bold">{String(selectedIndex + 1).padStart(2, '0')}</span>
                <div className="w-12 h-px bg-black/20 relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-black"
                    style={{ width: `${((selectedIndex + 1) / items.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-sm text-neutral-400">{String(items.length).padStart(2, '0')}</span>
              </div> */}
              
              {/* Navigation buttons - positioned in header for cleaner look */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={scrollPrev}
                  className="group w-10 h-10 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} className="text-black/70 group-hover:text-white transition-colors" />
                </button>
                <button 
                  onClick={scrollNext}
                  className="group w-10 h-10 rounded-full border border-black/20 flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} className="text-black/70 group-hover:text-white transition-colors" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Progress bar */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-px bg-black/10 mb-10 origin-left"
          >
            <motion.div 
              className="h-full bg-black/40"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </motion.div>

          {/* Carousel */}
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={ref}>
            <div className="flex gap-8">
              {items.map((p, idx) => (
                <motion.button
                  key={p.slug}
                  onClick={() => openCase(p)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="min-w-[340px] md:min-w-[500px] lg:min-w-[600px] group text-left flex-shrink-0"
                  data-testid={`project-card-${p.slug}`}
                >
                  <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-neutral-200 shadow-2xl shadow-black/10">
                    <Image 
                      src={getMediaSrc(p.media[0])} 
                      alt={p.title} 
                      fill 
                      className="object-cover transition-all duration-700 group-hover:scale-110" 
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Hover content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {p.stack?.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-3 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm text-white">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="px-5 py-3 rounded-full bg-white text-black text-sm font-medium w-fit">
                        View case study →
                      </div>
                    </div>
                    
                    {/* Index badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-medium">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                  </div>
                  
                  <div className="mt-8 flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold group-hover:text-neutral-600 transition-colors">{p.title}</h3>
                      <p className="text-neutral-500 mt-2 text-lg">{p.role}</p>
                    </div>
                    <motion.span 
                      className="text-4xl font-bold text-black/10 group-hover:text-black/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      {p.year}
                    </motion.span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => api?.scrollTo(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === selectedIndex 
                    ? 'w-8 h-2 bg-black' 
                    : 'w-2 h-2 bg-black/20 hover:bg-black/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Bottom decorative text */}
          <motion.div 
            className="flex justify-between items-center mt-16 pt-8 border-t border-black/10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <span className="text-sm text-neutral-400 tracking-widest uppercase">Scroll or drag to explore</span>
          </motion.div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-screen py-8 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-4xl mx-auto bg-neutral-950 rounded-3xl overflow-hidden shadow-2xl">
                {/* Modal header */}
                <div className="relative aspect-[16/9]">
                  <Image 
                    src={getMediaSrc(selectedProject.media[0])} 
                    alt={selectedProject.title} 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal content */}
                <div className="p-8 md:p-12 -mt-24 relative">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap items-center gap-4 mb-6"
                  >
                    <span className="text-sm text-neutral-400">{selectedProject.year}</span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-sm text-neutral-400">{selectedProject.role}</span>
                  </motion.div>

                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl font-bold mb-4"
                  >
                    {selectedProject.title}
                  </motion.h2>
                  
                  {selectedProject.summary && (
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-xl text-neutral-300 mb-8 leading-relaxed"
                    >
                      {selectedProject.summary}
                    </motion.p>
                  )}

                  {/* Stack */}
                  {selectedProject.stack && selectedProject.stack.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mb-10"
                    >
                      <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Tech Stack</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.stack.map((tech, i) => (
                          <motion.span 
                            key={i} 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.05 }}
                            className="px-5 py-2 text-sm rounded-full border border-white/10 text-neutral-300 hover:bg-white/5 transition-colors"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Problem */}
                  {selectedProject.problem?.context && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mb-10 p-8 rounded-2xl bg-white/[0.02] border border-white/10"
                    >
                      <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">The Problem</h4>
                      <p className="text-neutral-300 leading-relaxed text-lg">{selectedProject.problem.context}</p>
                      {selectedProject.problem.constraints && selectedProject.problem.constraints.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <h5 className="text-sm text-neutral-500 mb-4">Constraints</h5>
                          <ul className="space-y-3">
                            {selectedProject.problem.constraints.map((c, i) => (
                              <motion.li 
                                key={i} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + i * 0.1 }}
                                className="text-neutral-400 flex items-start gap-3"
                              >
                                <span className="text-white/40 mt-1.5">→</span>
                                {c}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Approach */}
                  {selectedProject.approach?.strategy && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="mb-10 p-8 rounded-2xl bg-white/[0.02] border border-white/10"
                    >
                      <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Our Approach</h4>
                      <p className="text-neutral-300 leading-relaxed text-lg">{selectedProject.approach.strategy}</p>
                      {selectedProject.approach.key_decisions && selectedProject.approach.key_decisions.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-white/10">
                          <h5 className="text-sm text-neutral-500 mb-4">Key Decisions</h5>
                          <ul className="space-y-3">
                            {selectedProject.approach.key_decisions.map((d, i) => (
                              <motion.li 
                                key={i} 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                className="text-neutral-400 flex items-start gap-3"
                              >
                                <span className="text-white/40 mt-1.5">→</span>
                                {d}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* Outcome */}
                  {(selectedProject.outcome?.results || selectedProject.outcome?.metrics) && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="mb-10 p-8 rounded-2xl bg-white/[0.02] border border-white/10"
                    >
                      <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-6">The Outcome</h4>
                      {selectedProject.outcome.metrics && selectedProject.outcome.metrics.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                          {selectedProject.outcome.metrics.map((m, i) => (
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.9 + i * 0.1 }}
                            >
                              <div className="text-3xl md:text-4xl font-bold text-white">{m.value}</div>
                              <div className="text-sm text-neutral-500 mt-1">{m.label}</div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                      {selectedProject.outcome.results && selectedProject.outcome.results.length > 0 && (
                        <ul className="space-y-3">
                          {selectedProject.outcome.results.map((r, i) => (
                            <motion.li 
                              key={i} 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1 + i * 0.1 }}
                              className="text-neutral-400 flex items-start gap-3"
                            >
                              <span className="text-green-400 mt-1">✓</span>
                              {r}
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  )}

                  {/* CTA */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    {selectedProject.cta?.href && selectedProject.cta.href !== '#' && (
                      <a
                        href={selectedProject.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition"
                      >
                        {selectedProject.cta.label || 'Visit site'}
                        <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                    <a
                      href="#booking"
                      onClick={() => {
                        track('cta_click', { area: 'case_study', project: selectedProject.slug })
                        setSelectedProject(null)
                      }}
                      className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition"
                    >
                      Start a similar project
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}