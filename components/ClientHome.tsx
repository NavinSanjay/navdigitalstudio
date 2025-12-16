'use client'

import { useEffect, useState } from 'react'
import Start from '@/components/Start'
import { Hero } from '@/components/Hero'
import { ProofStrip } from '@/components/ProofStrip'
import { ProjectsRail } from '@/components/ProjectsRail'
import { Services } from '@/components/Services'
import { Pricing } from '@/components/Pricing'
import { About } from '@/components/About'
import { Booking } from '@/components/Booking'
import { FAQ } from '@/components/FAQ'
import { Footer } from '@/components/Footer'
import projects from '@/content/projects.json'
import testimonials from '@/content/testimonials.json'

export default function ClientHome() {
  const [introDone, setIntroDone] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const el = document.documentElement
    if (!introDone) el.style.overflow = 'hidden'
    else el.style.overflow = ''
    return () => { el.style.overflow = '' }
  }, [introDone])

  useEffect(() => {
    if (introDone && !scrolled) {
      const sec = document.getElementById('hero')
      if (sec) {
        setScrolled(true)
        sec.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [introDone, scrolled])

  return (
    <main className="min-h-screen bg-black text-white">
      {!introDone && <Start onComplete={() => setIntroDone(true)} />}

      <Hero />
      <ProofStrip items={testimonials as any} />
      <ProjectsRail items={projects as any} />
      <Services />
      <Pricing />
      <About />
      <Booking />
      <FAQ />
      <Footer />
    </main>
  )
}
