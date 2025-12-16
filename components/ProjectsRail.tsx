'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { track } from '@/lib/analytics'
import { X, ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react'

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

export function ProjectsRail({ items }: { items: Proj[] }) {
  const [ref, api] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selectedProject, setSelectedProject] = useState<Proj | null>(null)
  
  const scrollPrev = useCallback(() => api && api.scrollPrev(), [api])
  const scrollNext = useCallback(() => api && api.scrollNext(), [api])

  const getMediaSrc = (media: string | { src: string }) => {
    return typeof media === 'string' ? media : media.src
  }

  const openCase = (p: Proj) => {
    track('case_study_opened', { slug: p.slug })
    setSelectedProject(p)
  }

  return (
    <>
      <section id="projects" className="py-24 md:py-32 bg-[#F3F3F3] min-h-screen w-full text-black overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="h-px w-12 bg-black/30" />
                <span className="text-sm tracking-widest uppercase text-neutral-500">Case Studies</span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold tracking-tight"
              >
                Featured work
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-neutral-600 max-w-xl"
              >
                Real outcomes from real projects. Each case study shows the problem, 
                our approach, and the measurable results.
              </motion.p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={scrollPrev} 
                className="p-3 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Previous project"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={scrollNext} 
                className="p-3 rounded-full border border-black/20 hover:bg-black hover:text-white transition-all duration-300"
                aria-label="Next project"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="overflow-hidden" ref={ref}>
            <div className="flex gap-6">
              {items.map((p, idx) => (
                <motion.button
                  key={p.slug}
                  onClick={() => openCase(p)}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="min-w-[320px] md:min-w-[480px] lg:min-w-[560px] group text-left"
                  data-testid={`project-card-${p.slug}`}
                >
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-200">
                    <Image 
                      src={getMediaSrc(p.media[0])} 
                      alt={p.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="px-4 py-2 rounded-full bg-white text-black text-sm font-medium">
                        View case study
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-start justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold group-hover:underline decoration-2 underline-offset-4">{p.title}</h3>
                      <p className="text-neutral-500 mt-2">{p.role}</p>
                    </div>
                    <span className="text-sm text-neutral-400 font-medium">{p.year}</span>
                  </div>
                  {p.stack && p.stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.stack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-xs rounded-full bg-black/5 text-neutral-600">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
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
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className="min-h-screen py-8 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-w-4xl mx-auto bg-neutral-950 rounded-3xl overflow-hidden">
                {/* Modal header */}
                <div className="relative aspect-[16/9]">
                  <Image 
                    src={getMediaSrc(selectedProject.media[0])} 
                    alt={selectedProject.title} 
                    fill 
                    className="object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-3 rounded-full bg-black/50 hover:bg-black transition-colors"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Modal content */}
                <div className="p-8 md:p-12 -mt-20 relative">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="text-sm text-neutral-400">{selectedProject.year}</span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-sm text-neutral-400">{selectedProject.role}</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{selectedProject.title}</h2>
                  
                  {selectedProject.summary && (
                    <p className="text-lg text-neutral-300 mb-8">{selectedProject.summary}</p>
                  )}

                  {/* Stack */}
                  {selectedProject.stack && selectedProject.stack.length > 0 && (
                    <div className="mb-10">
                      <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((tech, i) => (
                          <span key={i} className="px-4 py-2 text-sm rounded-full border border-white/10 text-neutral-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Problem */}
                  {selectedProject.problem?.context && (
                    <div className="mb-10 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                      <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">The Problem</h4>
                      <p className="text-neutral-300 leading-relaxed">{selectedProject.problem.context}</p>
                      {selectedProject.problem.constraints && selectedProject.problem.constraints.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <h5 className="text-sm text-neutral-500 mb-3">Constraints</h5>
                          <ul className="space-y-2">
                            {selectedProject.problem.constraints.map((c, i) => (
                              <li key={i} className="text-neutral-400 text-sm flex items-start gap-2">
                                <span className="text-white/40 mt-1">•</span>
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Approach */}
                  {selectedProject.approach?.strategy && (
                    <div className="mb-10 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                      <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Our Approach</h4>
                      <p className="text-neutral-300 leading-relaxed">{selectedProject.approach.strategy}</p>
                      {selectedProject.approach.key_decisions && selectedProject.approach.key_decisions.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-white/10">
                          <h5 className="text-sm text-neutral-500 mb-3">Key Decisions</h5>
                          <ul className="space-y-2">
                            {selectedProject.approach.key_decisions.map((d, i) => (
                              <li key={i} className="text-neutral-400 text-sm flex items-start gap-2">
                                <span className="text-white/40 mt-1">•</span>
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Outcome */}
                  {(selectedProject.outcome?.results || selectedProject.outcome?.metrics) && (
                    <div className="mb-10 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                      <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">The Outcome</h4>
                      {selectedProject.outcome.metrics && selectedProject.outcome.metrics.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                          {selectedProject.outcome.metrics.map((m, i) => (
                            <div key={i}>
                              <div className="text-2xl md:text-3xl font-bold text-white">{m.value}</div>
                              <div className="text-sm text-neutral-500 mt-1">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      {selectedProject.outcome.results && selectedProject.outcome.results.length > 0 && (
                        <ul className="space-y-2">
                          {selectedProject.outcome.results.map((r, i) => (
                            <li key={i} className="text-neutral-400 text-sm flex items-start gap-2">
                              <span className="text-green-400 mt-1">✓</span>
                              {r}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {selectedProject.cta?.href && selectedProject.cta.href !== '#' && (
                      <a
                        href={selectedProject.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition"
                      >
                        {selectedProject.cta.label || 'Visit site'}
                        <ExternalLink size={16} />
                      </a>
                    )}
                    <a
                      href="#booking"
                      onClick={() => {
                        track('cta_click', { area: 'case_study', project: selectedProject.slug })
                        setSelectedProject(null)
                      }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 hover:bg-white/5 transition"
                    >
                      Start a similar project
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
