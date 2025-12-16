'use client'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

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
  return (
    <section id="pricing" className="py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-px w-12 bg-white/30" />
            <span className="text-sm tracking-widest uppercase text-neutral-500">Investment</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Clear pricing.
            <span className="text-neutral-500"> No surprises.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-neutral-400"
          >
            We scope carefully upfront so you know exactly what you're getting. 
            Every engagement includes strategy, design, and development—no hidden costs.
          </motion.p>
        </div>

        {/* Pricing grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                tier.popular 
                  ? 'bg-white text-black border-white' 
                  : 'bg-white/[0.02] border-white/10 hover:border-white/20'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-8 px-3 py-1 text-xs font-medium bg-black text-white rounded-full">
                  Most popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                <div className="text-3xl font-bold">{tier.range}</div>
                <div className={`text-sm mt-1 ${tier.popular ? 'text-neutral-600' : 'text-neutral-500'}`}>
                  {tier.timeline} typical timeline
                </div>
              </div>
              
              <p className={`mb-8 ${tier.popular ? 'text-neutral-600' : 'text-neutral-400'}`}>
                {tier.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check size={18} className={`mt-0.5 flex-shrink-0 ${tier.popular ? 'text-black' : 'text-green-400'}`} />
                    <span className={`text-sm ${tier.popular ? 'text-neutral-700' : 'text-neutral-300'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              
              <a 
                href="#booking"
                className={`group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition ${
                  tier.popular 
                    ? 'bg-black text-white hover:bg-neutral-800' 
                    : 'border border-white/20 hover:bg-white/5'
                }`}
              >
                Start with {tier.name.toLowerCase()}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center text-neutral-500 text-sm"
        >
          All prices in NZD. Final quote based on specific requirements. 
          50% deposit to begin, 50% on delivery.
        </motion.p>
      </div>
    </section>
  )
}
