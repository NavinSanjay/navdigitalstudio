'use client'
import { motion } from 'framer-motion'
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const tiers = [
  {
    name: 'Starter',
    range: 'NZD 1.5k–4k',
    description:
      'For focused marketing pages and small sites that need to look sharp and convert.',
    timeline: '1.5–3 weeks',
    badge: 'Best for simple sites',
    features: [
      'Single-page or small 2–3 page site',
      'Custom design and build (no templates)',
      'Responsive across mobile, tablet, and desktop',
      'Light motion & interactions',
      'Basic analytics setup',
    ],
  },
  {
    name: 'Growth',
    range: 'NZD 4k–10k',
    description:
      'For growing businesses that need a multi-section site, deeper integrations, and room to evolve.',
    timeline: '3–5 weeks',
    popular: true,
    badge: 'Most chosen',
    features: [
      'Multi-section marketing or product site',
      'Custom components and layouts',
      'Third-party integrations (booking, CRM, payments, etc.)',
      'Richer motion and interaction design',
      'CMS setup your team can update',
      'Analytics & conversion tracking',
      'Room for light AI features (e.g. simple site chatbot) when scope fits',
    ],
  },
  {
    name: 'Bespoke',
    range: 'NZD 10k–25k+',
    description:
      'For complex web + system work: internal tools, dashboards, and AI-powered workflows.',
    timeline: '4–10+ weeks',
    badge: 'Best for AI & data pilots',
    features: [
      'Custom web app or complex site architecture',
      'Data modelling and system design',
      'Internal dashboards or admin tools',
      'AI features (chatbots, recommendations, automations)',
      'Ongoing collaboration with your team',
      'Option for retained support',
    ],
  },
]

export function Pricing() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(
      () => setActiveIndex((prev) => (prev + 1) % tiers.length),
      5000
    )
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

  // 3D style only used on md+ screens
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex
    const normalizedDiff = ((diff + tiers.length + 1) % tiers.length) - 1 // -1,0,1

    const rotateY = normalizedDiff * 35
    const translateZ = normalizedDiff === 0 ? 0 : -140
    const translateX = normalizedDiff * 240
    const scale = normalizedDiff === 0 ? 1 : 0.9
    const opacity = normalizedDiff === 0 ? 1 : 0.45
    const zIndex = normalizedDiff === 0 ? 10 : 5

    return { rotateY, translateZ, translateX, scale, opacity, zIndex }
  }

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_70%)]" />
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 border border-white/[0.03] rounded-full" />
        <div className="absolute inset-8 border border-white/[0.02] rounded-full" />
        <div className="absolute inset-16 border border-white/[0.02] rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-12 bg-white/20" />
            <span className="text-sm tracking-[0.2em] uppercase text-neutral-500">
              Investment
            </span>
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
            Every project includes strategy, design, and build. Web, data, and
            AI work use the same ladder—AI‑heavy projects tend to sit at the
            upper end of Growth or within Bespoke.
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="flex flex-col items-center">
          {/* Mobile: simple centered card, no 3D */}
          <div className="w-full max-w-md md:hidden">
            {tiers.map((tier, i) =>
              i === activeIndex ? (
                <div key={tier.name} className="w-full">
                  <div className="relative p-8 rounded-3xl border bg-white text-black shadow-2xl shadow-white/20">
                    {tier.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-medium bg-black text-white rounded-full whitespace-nowrap">
                        {tier.badge}
                      </div>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-medium mb-2">{tier.name}</h3>
                      <div className="text-4xl font-bold">{tier.range}</div>
                      <div className="text-sm mt-2 text-neutral-600">
                        Typically {tier.timeline}
                      </div>
                    </div>
                    <p className="text-sm text-center mb-6 text-neutral-600">
                      {tier.description}
                    </p>
                    <div className="h-px w-full mb-6 bg-black/10" />
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm text-neutral-700"
                        >
                          <Check
                            size={16}
                            className="mt-0.5 flex-shrink-0 text-black"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#booking"
                      className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-black text-white font-medium transition-all duration-300 hover:bg-neutral-800"
                    >
                      Get started
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </a>
                  </div>
                </div>
              ) : null
            )}
          </div>

          {/* Desktop: 3D layout */}
          <div
            className="hidden md:flex relative h-[620px] items-center justify-center w-full"
            style={{ perspective: '1200px' }}
          >
            <div
              className="relative w-full max-w-[420px] h-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
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
                      x: style.translateX - 210,
                      z: style.translateZ,
                      scale: style.scale,
                      opacity: style.opacity,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 100,
                      damping: 20,
                      mass: 1,
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
                        ${
                          isActive
                            ? tier.popular
                              ? 'bg-white text-black border-white shadow-2xl shadow-white/20'
                              : 'bg-white/10 border-white/30 shadow-2xl shadow-black/50'
                            : 'bg-white/[0.03] border-white/10'
                        }
                      `}
                    >
                      {(tier.badge || tier.popular) && isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-medium bg-black text-white rounded-full whitespace-nowrap"
                        >
                          {tier.badge || 'Most chosen'}
                        </motion.div>
                      )}

                      <div className="text-center mb-6">
                        <h3
                          className={`text-lg font-medium mb-2 ${
                            isActive && tier.popular
                              ? 'text-black'
                              : isActive
                              ? 'text-white'
                              : 'text-neutral-400'
                          }`}
                        >
                          {tier.name}
                        </h3>
                        <div
                          className={`text-4xl md:text-5xl font-bold ${
                            isActive && tier.popular
                              ? 'text-black'
                              : isActive
                              ? 'text-white'
                              : 'text-neutral-500'
                          }`}
                        >
                          {tier.range}
                        </div>
                        <div
                          className={`text-sm mt-2 ${
                            isActive && tier.popular
                              ? 'text-neutral-600'
                              : isActive
                              ? 'text-neutral-400'
                              : 'text-neutral-600'
                          }`}
                        >
                          Typically {tier.timeline}
                        </div>
                      </div>

                      <p
                        className={`text-sm text-center mb-6 ${
                          isActive && tier.popular
                            ? 'text-neutral-600'
                            : isActive
                            ? 'text-neutral-300'
                            : 'text-neutral-500'
                        }`}
                      >
                        {tier.description}
                      </p>

                      <div
                        className={`h-px w-full mb-6 ${
                          isActive && tier.popular
                            ? 'bg-black/10'
                            : 'bg-white/10'
                        }`}
                      />

                      <ul className="space-y-3 mb-8">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check
                              size={16}
                              className={`mt-0.5 flex-shrink-0 ${
                                isActive && tier.popular
                                  ? 'text-black'
                                  : isActive
                                  ? 'text-white/70'
                                  : 'text-neutral-600'
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                isActive && tier.popular
                                  ? 'text-neutral-700'
                                  : isActive
                                  ? 'text-neutral-300'
                                  : 'text-neutral-500'
                              }`}
                            >
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <a
                        href="#booking"
                        className={`
                          group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300
                          ${
                            isActive && tier.popular
                              ? 'bg-black text-white hover:bg-neutral-800'
                              : isActive
                              ? 'bg-white text-black hover:bg-neutral-200'
                              : 'border border-white/20 text-neutral-400 hover:bg-white/5'
                          }
                        `}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Get started
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </a>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Navigation (always below cards so nothing overlaps) */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={rotateLeft}
              className="group w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bgwhite hover:bg-white hover:border-white transition-all duration-300"
              aria-label="Previous tier"
            >
              <ChevronLeft
                size={20}
                className="text-white/70 group-hover:text-black transition-colors"
              />
            </button>
            <div className="flex items-center gap-3">
              {tiers.map((tier, i) => (
                <button
                  key={tier.name}
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
              <ChevronRight
                size={20}
                className="text-white/70 group-hover:text-black transition-colors"
              />
            </button>
          </div>

          {/* AI & data notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 max-w-3xl text-sm text-neutral-300 border border-white/10 rounded-2xl p-6 bg-white/[0.03]"
          >
            <p className="font-medium text-white mb-2">
              Where AI & data typically land
            </p>
            <p className="text-neutral-400 mb-4">
              Light AI additions (for example, a simple chatbot on top of a
              marketing site) can sometimes fit into the upper end of the Growth
              range. Focused AI/data pilots—such as an internal Q&amp;A assistant
              or a dashboard on top of existing data—are usually scoped within
              the Bespoke range.
            </p>
            <p className="text-neutral-500">
              If you are unsure where your project sits, use the booking form to
              share a quick outline and the next step will be a short call to
              calibrate fit and budget.
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center text-neutral-600 text-sm"
        >
          All prices in NZD and indicative. Final quote depends on scope,
          complexity, and integrations. 50% deposit to begin.
        </motion.p>
      </div>
    </section>
  )
}
