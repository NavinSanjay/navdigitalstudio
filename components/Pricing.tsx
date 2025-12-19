'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const tiers = [
  { 
    name: 'Starter', 
    range: 'NZD 3k–6k',
    description: 'For single-page sites and landing pages that need to convert.',
    timeline: '2–3 weeks',
    features: [
      'One-page or landing page',
      'Responsive design',
      'Light motion & interactions',
      'Basic analytics setup',
      'CMS integration optional'
    ]
  },
  { 
    name: 'Growth', 
    range: 'NZD 7k–15k',
    description: 'For multi-section sites with custom functionality and integrations.',
    timeline: '3–5 weeks',
    popular: true,
    features: [
      'Multi-section website',
      'Custom components',
      'Third-party integrations',
      'Advanced motion design',
      'Full CMS setup',
      'Analytics & conversion tracking'
    ]
  },
  { 
    name: 'Bespoke', 
    range: 'NZD 16k+',
    description: 'For complex systems requiring deep technical work and longer timelines.',
    timeline: '6–10+ weeks',
    features: [
      'Systems architecture',
      'Custom data solutions',
      'AI/ML integrations',
      'Advanced automation',
      'Ongoing collaboration',
      'Priority support'
    ]
  }
]

export function Pricing() {
  const [activeIndex, setActiveIndex] = useState(1) // Start with Growth (middle)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  // Auto-rotate
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tiers.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const rotateLeft = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev - 1 + tiers.length) % tiers.length)
  }

  const rotateRight = () => {
    setIsAutoPlaying(false)
    setActiveIndex((prev) => (prev + 1) % tiers.length)
  }

  // Calculate 3D positions for each card
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex
    const normalizedDiff = ((diff + tiers.length + 1) % tiers.length) - 1 // -1, 0, 1
    
    const rotateY = normalizedDiff * 45
    const translateZ = normalizedDiff === 0 ? 0 : -200
    const translateX = normalizedDiff * 320
    const scale = normalizedDiff === 0 ? 1 : 0.85
    const opacity = normalizedDiff === 0 ? 1 : 0.5
    const zIndex = normalizedDiff === 0 ? 10 : 5
    
    return {
      rotateY,
      translateZ,
      translateX,
      scale,
      opacity,
      zIndex,
    }
  }

  return (
    <section id="pricing" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      
      {/* Circular guide lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 border border-white/[0.03] rounded-full" />
        <div className="absolute inset-8 border border-white/[0.02] rounded-full" />
        <div className="absolute inset-16 border border-white/[0.02] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-12 bg-white/20" />
            <span className="text-sm tracking-[0.2em] uppercase text-neutral-500">Investment</span>
            <div className="h-px w-12 bg-white/20" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Clear pricing.
            <span className="text-neutral-600"> No surprises.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-neutral-400 max-w-xl mx-auto"
          >
            Every engagement includes strategy, design, and development—no hidden costs.
          </motion.p>
        </div>

        {/* 3D Carousel */}
        <div 
          className="relative h-[580px] md:h-[620px] flex items-center justify-center"
          style={{ perspective: '1200px' }}
        >
          {/* Cards */}
          <div className="relative w-full max-w-[380px] h-full" style={{ transformStyle: 'preserve-3d' }}>
            {tiers.map((tier, i) => {
              const style = getCardStyle(i)
              const isActive = i === activeIndex
              
              return (
                <motion.div
                  key={tier.name}
                  className="absolute top-0 left-1/2 w-full cursor-pointer"
                  initial={false}
                  animate={{
                    rotateY: style.rotateY,
                    x: style.translateX - 190, // Center offset
                    z: style.translateZ,
                    scale: style.scale,
                    opacity: style.opacity,
                  }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 100, 
                    damping: 20,
                    mass: 1
                  }}
                  style={{ 
                    zIndex: style.zIndex,
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => {
                    setIsAutoPlaying(false)
                    setActiveIndex(i)
                  }}
                >
                  <div 
                    className={`
                      relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-500
                      ${isActive 
                        ? tier.popular 
                          ? 'bg-white text-black border-white shadow-2xl shadow-white/20' 
                          : 'bg-white/10 border-white/30 shadow-2xl shadow-black/50'
                        : 'bg-white/[0.03] border-white/10'
                      }
                    `}
                    style={{
                      boxShadow: isActive 
                        ? tier.popular 
                          ? '0 25px 80px -20px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.2)' 
                          : '0 25px 80px -20px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : 'none',
                    }}
                  >
                    {/* Popular badge */}
                    {tier.popular && isActive && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-medium bg-black text-white rounded-full whitespace-nowrap"
                      >
                        Most popular
                      </motion.div>
                    )}
                    
                    {/* Tier name */}
                    <div className="text-center mb-6">
                      <h3 className={`text-lg font-medium mb-2 ${isActive && tier.popular ? 'text-black' : isActive ? 'text-white' : 'text-neutral-400'}`}>
                        {tier.name}
                      </h3>
                      <div className={`text-4xl md:text-5xl font-bold ${isActive && tier.popular ? 'text-black' : isActive ? 'text-white' : 'text-neutral-500'}`}>
                        {tier.range}
                      </div>
                      <div className={`text-sm mt-2 ${isActive && tier.popular ? 'text-neutral-600' : isActive ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        {tier.timeline}
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className={`text-sm text-center mb-6 ${isActive && tier.popular ? 'text-neutral-600' : isActive ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      {tier.description}
                    </p>
                    
                    {/* Divider */}
                    <div className={`h-px w-full mb-6 ${isActive && tier.popular ? 'bg-black/10' : 'bg-white/10'}`} />
                    
                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <Check 
                            size={16} 
                            className={`mt-0.5 flex-shrink-0 ${
                              isActive && tier.popular ? 'text-black' : isActive ? 'text-white/70' : 'text-neutral-600'
                            }`} 
                          />
                          <span className={`text-sm ${
                            isActive && tier.popular ? 'text-neutral-700' : isActive ? 'text-neutral-300' : 'text-neutral-500'
                          }`}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA Button */}
                    <a 
                      href="#booking"
                      className={`
                        group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
                        ${isActive && tier.popular 
                          ? 'bg-black text-white hover:bg-neutral-800' 
                          : isActive 
                            ? 'bg-white text-black hover:bg-neutral-200'
                            : 'border border-white/20 text-neutral-400 hover:bg-white/5'
                        }
                      `}
                      onClick={(e) => e.stopPropagation()}
                    >
                      Get started
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button 
            onClick={rotateLeft}
            className="group w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300"
            aria-label="Previous tier"
          >
            <ChevronLeft size={20} className="text-white/70 group-hover:text-black transition-colors" />
          </button>
          
          {/* Dots indicator */}
          <div className="flex items-center gap-3">
            {tiers.map((tier, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAutoPlaying(false)
                  setActiveIndex(i)
                }}
                className={`transition-all duration-300 ${
                  i === activeIndex 
                    ? 'w-8 h-2 rounded-full bg-white' 
                    : 'w-2 h-2 rounded-full bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to ${tier.name}`}
              />
            ))}
          </div>
          
          <button 
            onClick={rotateRight}
            className="group w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300"
            aria-label="Next tier"
          >
            <ChevronRight size={20} className="text-white/70 group-hover:text-black transition-colors" />
          </button>
        </div>

        {/* Bottom note */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center text-neutral-600 text-sm"
        >
          All prices in NZD. Final quote based on specific requirements. 50% deposit to begin.
        </motion.p>
      </div>
    </section>
  )
}
