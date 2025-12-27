'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Compass, Palette, Cpu, ArrowRight, Sparkles, Megaphone } from 'lucide-react'
import { useRef } from 'react'

const services = [
  {
    icon: Compass,
    title: 'Strategy & Clarity',
    description:
      'We map how your business actually works today—systems, data, customer journeys—so we can design solutions that plug into reality, not theory.',
    details: [
      'Discovery sessions on goals, constraints, and workflows',
      'Mapping where data lives and how it moves',
      'Picking the right mix of web, AI, and automation',
    ],
  },
  {
    icon: Palette,
    title: 'Web & Product Experience',
    description:
      'Custom websites and interfaces that feel considered, fast, and easy to use—built to showcase your brand and make complex systems feel simple.',
    details: [
      'Brand-aligned web & product UI',
      'Responsive builds with clean, maintainable code',
      'CMS setups your team can actually use',
    ],
  },
  {
    icon: Cpu,
    title: 'AI & Data Systems',
    description:
      'AI and analytics that run on your data—chatbots, dashboards, and automations that remove manual work and support better decisions.',
    details: [
      'Private chatbots on your documents and knowledge',
      'Data pipelines, warehouses, and BI dashboards',
      'Predictive models and automations embedded into your tools',
    ],
  },
  {
    icon: Megaphone,
    title: 'Branding & Publicity',
    description:
      'Through a studio partnership with Maraschino Publicity, your brand, story, and campaigns can be developed alongside the systems that power them.',
    details: [
      'Brand strategy, messaging, and visual identity',
      'Launch and publicity campaigns aligned with your product',
      'Press, creator, and community moments that feed your funnel',
    ],
  },
]

// Diagonal scrolling text component
function DiagonalScrollText() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -400])
  const x2 = useTransform(scrollYProgress, [0, 1], [-200, 200])
  const x3 = useTransform(scrollYProgress, [0, 1], [100, -300])

  const lines = ['NAV', 'DIGITAL', 'STUDIO']

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
    >
      <div className="absolute inset-0 -rotate-12 scale-100 flex flex-col justify-center gap-16 opacity-[0.6]">
        <motion.div style={{ x: x1 }} className="flex gap-16 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-[45px] md:text-[45px] font-black tracking-tighter text-white opacity-65"
            >
              {lines.map((line, j) => (
                <span key={j}>{line} • </span>
              ))}
            </span>
          ))}
        </motion.div>
        <motion.div style={{ x: x2 }} className="flex gap-16 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-[100px] md:text-[100px] font-black tracking-tighter text-white opacity-85"
            >
              {[...lines].reverse().map((line, j) => (
                <span key={j}>{line} • </span>
              ))}
            </span>
          ))}
        </motion.div>
        <motion.div style={{ x: x3 }} className="flex gap-16 whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-[120px] md:text-[180px] font-black tracking-tighter text-white"
            >
              {lines.map((line, j) => (
                <span key={j}>{line} • </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-black overflow-hidden"
    >
      {/* Background text */}
      <DiagonalScrollText />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none z-[1]" />

      {/* Main content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <motion.div
              className="h-px bg-white/40"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-sm tracking-[0.2em] uppercase text-neutral-400">
              Services
            </span>
            <Sparkles size={14} className="text-neutral-500" />
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="relative inline-block">Web, AI,</span>{' '}
              systems that
              <br />
              <span className="text-neutral-600">work together</span>{' '}
              <span className="relative">
                <span className="relative z-10">for you.</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/5 blur-xl -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                />
              </span>
            </h2>
          </motion.div>

          {/* Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 relative"
          >
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-white via-white/50 to-white/40 rounded-full" />
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed pl-6 max-w-2xl">
              Whether you need a website, an internal AI assistant, or a full
              data platform, everything is designed as one connected system—not
              a pile of separate tools.
              <span className="block mt-4 text-neutral-500 text-base italic">
                Branding and publicity are handled in partnership with
                Maraschino Publicity, so the story you tell in public matches
                the systems that sit behind it.
              </span>
            </p>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
              style={{ perspective: '1000px' }}
            >
              <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-black/70 backdrop-blur-sm">
                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/10 rounded-tr-xl group-hover:border-white/30 transition-colors" />
                </motion.div>

                {/* Floating number */}
                <span className="absolute top-6 right-6 text-6xl font-black text-white/[0.03] group-hover:text-white/[0.08] transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Icon with glow */}
                <div className="relative mb-8">
                  <motion.div
                    className="relative z-10 p-4 rounded-2xl bg-white/5 w-fit border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300"
                    whileHover={{
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 },
                    }}
                  >
                    <s.icon size={28} className="text-white" />
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
                  {s.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed mb-8 group-hover:text-neutral-300 transition-colors">
                  {s.description}
                </p>

                {/* Details */}
                <ul className="space-y-3">
                  {s.details.map((detail, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 + j * 0.05 }}
                      className="text-sm text-neutral-500 flex items-center gap-3 group-hover:text-neutral-400 transition-colors"
                    >
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-white/50 transition-colors"
                        whileHover={{ scale: 1.5 }}
                      />
                      {detail}
                    </motion.li>
                  ))}
                </ul>

                {/* Bottom gradient line */}
                <motion.div
                  className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-3xl blur-xl" />
          <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
              <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05),transparent_50%)]" />
            </div>

            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div>
                <motion.h3
                  className="text-2xl md:text-3xl font-bold mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Bring your next system to life.
                </motion.h3>
                <motion.p
                  className="text-neutral-400 text-lg max-w-md"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  A short call to look at your current setup and explore whether a
                  new site, AI assistant, data platform, or brand/publicity push
                  will move the needle most.
                </motion.p>
              </div>
              <motion.a
                href="#booking"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Start a conversation</span>
                <ArrowRight
                  size={20}
                  className="relative z-10 group-hover:translate-x-1 transition-transform"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neutral-200 to-white"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
