'use client'
import { motion } from 'framer-motion'
import { Compass, Palette, Cpu, ArrowRight } from 'lucide-react'

const services = [
  { 
    icon: Compass,
    title: 'Strategy & UX', 
    description: 'Discovery, information architecture, user flows, content systems. We map the path before we build.',
    details: ['User research', 'Competitive analysis', 'Site mapping', 'Content strategy']
  },
  { 
    icon: Palette,
    title: 'Design & Build', 
    description: 'High-taste UI, purposeful motion, responsive implementation. Systems that feel crafted, not templated.',
    details: ['Visual design', 'Interaction design', 'Frontend development', 'CMS integration']
  },
  { 
    icon: Cpu,
    title: 'Systems & Data', 
    description: 'Integrations, automation, analytics. Technical depth that scales with your growth.',
    details: ['API integrations', 'Automation workflows', 'Analytics setup', 'Performance optimization']
  }
]

export function Services() {
  return (
    <section className="py-24 md:py-32 border-t border-white/10 bg-black">
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
            <span className="text-sm tracking-widest uppercase text-neutral-500">Services</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight"
          >
            Full-stack capability.
            <span className="text-neutral-500"> Focused execution.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg text-neutral-400"
          >
            Every project starts with strategy and ends with measurable outcomes. 
            No handoffs, no silos—one team from concept to launch.
          </motion.p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
            >
              <div className="mb-6 p-3 rounded-xl bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
                <s.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-neutral-400 leading-relaxed mb-6">{s.description}</p>
              <ul className="space-y-2">
                {s.details.map((detail, j) => (
                  <li key={j} className="text-sm text-neutral-500 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-neutral-600" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Process CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 p-8 rounded-2xl bg-white/[0.02] border border-white/10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Ready to start?</h3>
              <p className="text-neutral-400">Book a discovery call to discuss your project scope and timeline.</p>
            </div>
            <a 
              href="#booking"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition whitespace-nowrap"
            >
              Book discovery call
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
