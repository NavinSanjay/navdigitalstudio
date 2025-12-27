'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const tiers = [
  {
    name: 'Starter Site',
    range: 'NZD 1.5k–4k',
    description:
      'For focused marketing pages and small sites that need to look sharp, feel credible, and convert.',
    timeline: '1.5–3 weeks',
    badge: 'Best for simple sites',
    popular: false,
    features: [
      'Single-page or small 2–3 page marketing site',
      'Custom design and build (no off-the-shelf templates)',
      'Responsive across mobile, tablet, and desktop',
      'Light motion & interactions',
      'Basic analytics setup',
    ],
  },
  {
    name: 'Growth Site',
    range: 'NZD 4k–10k',
    description:
      'For growing businesses that need a deeper site, integrations, and room to evolve into AI and data over time.',
    timeline: '3–5 weeks',
    badge: 'Most chosen',
    popular: true,
    features: [
      'Multi-section marketing or product site',
      'Custom components and layouts',
      'Third-party integrations (booking, CRM, payments, etc.)',
      'Richer motion and interaction design',
      'CMS setup your team can actually update',
      'Analytics & conversion tracking',
      'Room for light AI features (e.g. simple site chatbot) when scope fits',
    ],
  },
  {
    name: 'Systems & AI',
    range: 'NZD 10k–25k+',
    description:
      'For complex web + system work: internal tools, dashboards, and AI-powered workflows designed around your data.',
    timeline: '4–10+ weeks',
    badge: 'Best for AI & data pilots',
    popular: false,
    features: [
      'Custom web app or complex site architecture',
      'Data modelling and system design',
      'Internal dashboards or admin tools',
      'AI features (chatbots, recommendations, automations)',
      'Integration with existing tools and data sources',
      'Option for retained support after launch',
    ],
  },
  {
    name: 'Brand, Site & Launch',
    range: 'NZD 18k–40k+',
    description:
      'For new companies and rebrands that want the whole thing handled: brand, website, and launch publicity in one plan.',
    timeline: '6–12+ weeks',
    badge: 'With Maraschino Publicity',
    popular: false,
    features: [
      'Brand strategy, messaging, and visual identity (with Maraschino Publicity)',
      'Marketing or product site designed to express the new brand',
      'Launch and publicity plan with key moments and channels',
      'Site, tracking, and basic funnels set up for launch',
      'Option to add PR outreach, creator, or media activations',
      'Single point of contact across brand, web, and systems',
    ],
  },
  {
    name: 'Custom Scope',
    range: 'Can work with any budget',
    description:
      'For mixed scopes or constraints that do not quite fit the tiers above. The work is shaped to your priorities and budget.',
    timeline: 'Varies by scope',
    badge: 'Let’s calibrate',
    popular: false,
    features: [
      'Suited to unusual timelines or hybrid projects',
      'Can combine strategy, web, AI, data, and/or brand & publicity',
      'Clear written proposal with phased options',
      'Designed around your budget and risk tolerance',
      'Good when you want to start narrow and expand over time',
    ],
  },
]

const CARD_WIDTH = 420 // must match w-[420px]

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

  // 3D layout for desktop – symmetric left/right
  const getCardStyle = (index: number) => {
    const diff = index - activeIndex
    const normalizedDiff = ((diff + tiers.length + 1) % tiers.length) - 1 // -1, 0, 1

    const rotateY = normalizedDiff * 30
    const translateZ = normalizedDiff === 0 ? 0 : -120
    const translateX = normalizedDiff * CARD_WIDTH // equal spacing
    const scale = normalizedDiff === 0 ? 1 : 0.9
    const opacity = normalizedDiff === 0 ? 1 : 0.4
    const zIndex = normalizedDiff === 0 ? 10 : 5

    return { rotateY, translateZ, translateX, scale, opacity, zIndex }
  }

  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Soft background */}
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
            className="text-3xl md:text-5xl font-bold tracking-tight text-white"
          >
            Clear pricing.
            <span className="text-neutral-500"> No surprises.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-neutral-400 max-w-xl mx-auto text-sm md:text-base"
          >
            Web, data, AI, and brand/publicity work all use the same ladder so
            you can see where a project roughly lands.
          </motion.p>
        </div>

        {/* Carousel wrapper */}
        <div className="flex flex-col items-center">
          {/* Mobile: single centered card */}
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

          {/* Desktop: 3D carousel */}
          <div
            className="hidden md:flex relative h-[620px] items-center justify-center w-full"
            style={{ perspective: '1200px', overflow: 'visible' }}
          >
            <div
              className="relative h-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {tiers.map((tier, i) => {
                const style = getCardStyle(i)
                const isActive = i === activeIndex

                return (
                  <motion.div
                    key={tier.name}
                    className="absolute top-0 left-1/2 w-[420px]"
                    initial={false}
                    animate={{
                      rotateY: style.rotateY,
                      x: style.translateX - CARD_WIDTH / 2, // centre active card
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
                      className={`relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-500 ${
                        isActive
                          ? tier.popular
                            ? 'bg-white text-black border-white shadow-2xl shadow-white/20'
                            : 'bg-white/10 text-white border-white/30 shadow-2xl shadow-black/50'
                          : 'bg-white/[0.03] text-neutral-400 border-white/10'
                      }`}
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
                              ? 'text-neutral-300'
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
                        className={`group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                          isActive && tier.popular
                            ? 'bg-black text-white hover:bg-neutral-800'
                            : isActive
                            ? 'bg-white text-black hover:bg-neutral-200'
                            : 'border border-white/20 text-neutral-300 hover:bg-white/5'
                        }`}
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

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={rotateLeft}
              className="group w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:border-white transition-all duration-300"
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

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 max-w-3xl text-sm text-neutral-300 border border-white/10 rounded-2xl p-6 bg-white/[0.03]"
          >
            <p className="font-medium text-white mb-2">
              Where AI, systems, and launch work typically land
            </p>
            <p className="text-neutral-400 mb-4">
              Light AI additions can sometimes fit into the upper end of Growth
              Site. Focused AI/data pilots or internal tools usually sit in
              Systems &amp; AI, while full brand, site, and launch engagements
              live in Brand, Site &amp; Launch.
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
          className="mt-12 text-center text-neutral-600 text-xs md:text-sm"
        >
          All prices in NZD and indicative. Final quote depends on scope,
          complexity, and integrations. A 50% deposit is required to begin.
        </motion.p>
      </div>
    </section>
  )
}
