'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react'

const principles = [
  { 
    num: '01',
    title: 'Clarity + Personality', 
    description: 'Clear thinking and deliberate execution while enabling and enhancing your unique style and voice.' 
  },
  { 
    num: '02',
    title: 'Outcomes over claims', 
    description: 'We focus on tangible results — not decks, buzzwords, or inflated promises. Proof in the work.' 
  },
  { 
    num: '03',
    title: 'Function and flourish', 
    description: 'Designs that support usability, performance, and longevity while keeping the beauty intact.' 
  },
  { 
    num: '04',
    title: 'Decisive, not overcomplicated', 
    description: 'We make informed decisions early and iterate with purpose. No unnecessary complexity.' 
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  
  // Parallax for hero text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])
  
  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  
  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  // Hide scroll indicator after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setShowScrollIndicator(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen bg-[#FFFFFF] text-black overflow-hidden"
    >
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="relative mx-auto max-w-[1600px]">
        <div className="grid lg:grid-cols-[1fr,480px] min-h-screen">
          
          {/* Left Column - Hero Content (60%) */}
          <div className="py-20 md:py-32 px-6 md:px-12 lg:px-20">
            {/* Eyebrow */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-neutral-500 font-medium">
                Philosophy
              </span>
            </motion.div>

            {/* Hero Statement */}
            <motion.div 
              ref={heroRef}
              style={{ y: heroY }}
              className="mb-16 md:mb-24"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-black leading-[0.9] tracking-[-0.03em]"
              >
                <span className="block">BUILT WITH</span>
                <span className="block">INTENT.</span>
                <motion.span 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="block text-transparent"
                  style={{
                    WebkitTextStroke: '2px #000',
                  }}
                >
                  NOT NOISE.
                </motion.span>
              </motion.h2>
            </motion.div>

            {/* Body Copy */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-[600px] space-y-6"
            >
              <p className="text-base md:text-lg leading-[1.7] text-[#404040]">
                Nav Digital Studio exists to build digital systems and websites that make businesses easier to run. 
                Not trend-driven sites. Not bloated builds. Just clear, durable solutions designed around how you already work.
              </p>
              <p className="text-base md:text-lg leading-[1.7] text-[#404040]">
                We partner with founders and businesses who want to create demand, trust and legitimacy. 
                We create something that your users will remember, and reduce friction so users enjoy doing so.
              </p>
              <p className="text-base md:text-lg leading-[1.7] text-[#404040]">
                Every project starts by understanding constraints, context, and goals. 
                From there, we make deliberate decisions, build only what's needed, and focus on outcomes that actually matter.
              </p>
            </motion.div>

            {/* Scroll indicator - only shows on mobile/tablet */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: showScrollIndicator ? 1 : 0 }}
              className="lg:hidden mt-16 flex items-center gap-3 text-neutral-400"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown size={16} />
              </motion.div>
              <span className="text-xs tracking-widest uppercase">Scroll to explore</span>
            </motion.div>
          </div>

          {/* Right Column - Principles Carousel (40%) */}
          <div className="relative lg:sticky lg:top-0 lg:h-screen flex items-center py-12 lg:py-0">
            {/* Background accent */}
            <div className="absolute inset-0 bg-gradient-to-l from-neutral-50 to-transparent" />
            
            <div className="relative w-full px-6 lg:px-8">
              {/* Section label */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex items-center justify-between"
              >
                <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-neutral-400 font-medium">
                  Operating Principles
                </span>
                
                {/* Navigation arrows */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={scrollPrev}
                    className="group w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300"
                    aria-label="Previous"
                  >
                    <ChevronLeft size={18} className="text-black/50 group-hover:text-white transition-colors" />
                  </button>
                  <button 
                    onClick={scrollNext}
                    className="group w-10 h-10 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300"
                    aria-label="Next"
                  >
                    <ChevronRight size={18} className="text-black/50 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </motion.div>

              {/* Carousel */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-4">
                  {principles.map((principle, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="min-w-[280px] md:min-w-[320px] lg:min-w-[360px]"
                    >
                      <motion.div 
                        className="relative bg-white p-8 rounded-2xl cursor-grab active:cursor-grabbing"
                        style={{
                          boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
                        }}
                        whileHover={{ 
                          y: -4, 
                          scale: 1.02,
                          boxShadow: '0 12px 40px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.05)',
                        }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        {/* Accent line */}
                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                        
                        {/* Number badge */}
                        <div className="mb-6 flex items-center justify-between">
                          <span className="text-[11px] font-medium tracking-[0.2em] text-neutral-300">
                            {principle.num}
                          </span>
                          <div className="w-8 h-px bg-black/10" />
                        </div>
                        
                        {/* Content */}
                        <h4 className="text-lg font-semibold mb-3 text-black">
                          {principle.title}
                        </h4>
                        <p className="text-[15px] leading-relaxed text-[#666666]">
                          {principle.description}
                        </p>
                        
                        {/* Bottom corner accent */}
                        <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-black/5 rounded-br-lg" />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-8">
                {principles.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`transition-all duration-300 rounded-full ${
                      i === selectedIndex 
                        ? 'w-6 h-1.5 bg-black' 
                        : 'w-1.5 h-1.5 bg-black/20 hover:bg-black/40'
                    }`}
                    aria-label={`Go to principle ${i + 1}`}
                  />
                ))}
              </div>

              {/* Auto-playing indicator */}
              <div className="flex items-center justify-center gap-2 mt-6">
                <div className="w-1.5 h-1.5 rounded-full bg-black/30 animate-pulse" />
                <span className="text-[10px] tracking-widest uppercase text-neutral-400">Auto-playing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - desktop only */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollIndicator ? 1 : 0 }}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-3 text-neutral-400"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowDown size={16} />
        </motion.div>
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to explore</span>
      </motion.div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
    </section>
  )
}
