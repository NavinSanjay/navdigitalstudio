'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const principles = [
  { 
    num: '01',
    title: 'Clarity meets character', 
    description: 'Sharp execution that amplifies what makes you different. Your voice, elevated.' 
  },
  { 
    num: '02',
    title: 'Results you can measure', 
    description: 'Tangible outcomes over promises. The work speaks — conversions, engagement, growth.' 
  },
  { 
    num: '03',
    title: 'Beauty that performs', 
    description: 'Craft and conversion aren\'t opposites. We build sites that look premium and work harder.' 
  },
  { 
    num: '04',
    title: 'Decisions, not delays', 
    description: 'Opinionated choices made early. We move fast because we\'ve done this before.' 
  },
]

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  
  // Parallax for hero text
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const textX = useTransform(scrollYProgress, [0, 1], [0, 30])
  
  // Carousel setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', containScroll: false },
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

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative bg-[#FAFAFA] text-black overflow-hidden"
    >
      {/* Subtle texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Section */}
      <div className="relative pt-20 md:pt-32 lg:pt-40 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          
          {/* Eyebrow - offset position */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12 md:ml-[10%]"
          >
            <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-medium">
              Philosophy
            </span>
          </motion.div>

          {/* Hero Statement - Dynamic Layout */}
          <motion.div 
            style={{ y: heroY }}
            className="relative"
          >
            {/* Line 1 - Left aligned, large */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden"
            >
              <motion.h2 
                style={{ x: textX }}
                className="text-[13vw] md:text-[11vw] lg:text-[9vw] font-black leading-[0.85] tracking-[-0.04em]"
              >
                BUILT
              </motion.h2>
            </motion.div>
            
            {/* Line 2 - Indented right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="overflow-hidden md:ml-[15%] lg:ml-[20%] -mt-2 md:-mt-4"
            >
              <h2 className="text-[13vw] md:text-[11vw] lg:text-[9vw] font-black leading-[0.85] tracking-[-0.04em]">
                WITH <span className="italic font-light tracking-normal">intent</span>
              </h2>
            </motion.div>
            
            {/* Line 3 - Outlined, offset */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="overflow-hidden md:ml-[5%] mt-2 md:mt-4"
            >
              <h2 
                className="text-[11vw] md:text-[9vw] lg:text-[7vw] font-black leading-[0.85] tracking-[-0.02em] text-transparent"
                style={{ WebkitTextStroke: '1.5px rgba(0,0,0,0.25)' }}
              >
                NOT NOISE.
              </h2>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Content Grid - Asymmetric */}
      <div className="relative pb-20 md:pb-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Left spacer on large screens */}
            <div className="hidden lg:block lg:col-span-1" />
            
            {/* Body Copy */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="space-y-6 md:space-y-8">
                <p className="text-lg md:text-xl leading-[1.7] text-neutral-600">
                  We build digital systems that make businesses 
                  <span className="text-black font-medium"> easier to run</span> and 
                  <span className="text-black font-medium"> easier to trust</span>.
                </p>
                <p className="text-base md:text-lg leading-[1.8] text-neutral-500">
                  No trend-chasing. No bloat. Just clear, considered solutions designed around how you already work — then elevated.
                </p>
                <p className="text-base md:text-lg leading-[1.8] text-neutral-500">
                  Every project begins with constraints and context. From there: deliberate decisions, only what's needed, outcomes that matter.
                </p>
              </div>
              
              {/* Decorative element */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-12 h-px w-24 bg-black/20 origin-left"
              />
            </motion.div>
            
            {/* Right spacer */}
            <div className="hidden lg:block lg:col-span-1" />
            
            {/* Stats/Quick facts - fills remaining space */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4"
            >
              <div className="grid grid-cols-2 gap-8 md:gap-12">
                {[
                  { value: '40+', label: 'Projects delivered' },
                  { value: '2–6', label: 'Weeks typical' },
                  { value: '100%', label: 'Code ownership' },
                  { value: '24h', label: 'Response time' },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  >
                    <div className="text-3xl md:text-4xl font-bold tracking-tight">{stat.value}</div>
                    <div className="text-sm text-neutral-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Operating Principles - Full Width Carousel */}
      <div className="relative py-16 md:py-24 bg-white">
        {/* Section header */}
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 mb-10 md:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[10px] md:text-[11px] tracking-[0.3em] uppercase text-neutral-400 font-medium block mb-3">
                How we work
              </span>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Operating principles
              </h3>
            </motion.div>
            
            {/* Navigation */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <button 
                onClick={scrollPrev}
                className="group w-11 h-11 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300"
                aria-label="Previous"
              >
                <ChevronLeft size={18} className="text-black/40 group-hover:text-white transition-colors" />
              </button>
              <button 
                onClick={scrollNext}
                className="group w-11 h-11 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300"
                aria-label="Next"
              >
                <ChevronRight size={18} className="text-black/40 group-hover:text-white transition-colors" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Carousel - Full width with padding */}
        <div className="relative">
          <div className="overflow-visible px-6 md:px-12 lg:px-[calc((100vw-1400px)/2+48px)]" ref={emblaRef}>
            <div className="flex gap-5 md:gap-6">
              {principles.map((principle, i) => {
                const isActive = i === selectedIndex
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex-shrink-0 w-[300px] sm:w-[340px] md:w-[380px]"
                  >
                    <motion.div 
                      className={`
                        relative h-full p-7 md:p-8 rounded-2xl cursor-grab active:cursor-grabbing transition-all duration-500
                        ${isActive 
                          ? 'bg-black text-white shadow-2xl shadow-black/20' 
                          : 'bg-neutral-50 text-black border border-black/5 hover:border-black/10'
                        }
                      `}
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Number */}
                      <div className={`mb-8 flex items-center gap-4 ${isActive ? 'text-white/30' : 'text-black/20'}`}>
                        <span className="text-[11px] font-semibold tracking-[0.2em]">
                          {principle.num}
                        </span>
                        <div className={`flex-1 h-px ${isActive ? 'bg-white/20' : 'bg-black/10'}`} />
                      </div>
                      
                      {/* Content */}
                      <h4 className={`text-xl md:text-2xl font-semibold mb-4 leading-tight ${isActive ? 'text-white' : 'text-black'}`}>
                        {principle.title}
                      </h4>
                      <p className={`text-[15px] md:text-base leading-relaxed ${isActive ? 'text-white/70' : 'text-neutral-500'}`}>
                        {principle.description}
                      </p>
                      
                      {/* Corner accent */}
                      <div className={`absolute bottom-5 right-5 w-8 h-8 border-r border-b rounded-br-lg ${isActive ? 'border-white/20' : 'border-black/10'}`} />
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mt-10 md:mt-12">
          {principles.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === selectedIndex 
                  ? 'w-8 h-2 bg-black' 
                  : 'w-2 h-2 bg-black/15 hover:bg-black/30'
              }`}
              aria-label={`Go to principle ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent" />
    </section>
  )
}
