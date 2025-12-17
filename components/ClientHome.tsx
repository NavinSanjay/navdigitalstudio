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

// Remove these, they don't exist:
// import type { Proj } from '@/types/projects'
// import type { Testimonial } from '@/types/cms'

// Inline lightweight types based on your components
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
  media: any
  cta?: { label?: string; href?: string }
}

type Testimonial = {
  quote: string
  name: string
  role?: string
  company?: string
}

export default function ClientHome() {
  const [introDone, setIntroDone] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const [projects, setProjects] = useState<Proj[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    const load = async () => {
      try {
        const [projRes, testiRes] = await Promise.all([
          fetch('/cms-api/projects'),
          fetch('/cms-api/testimonials'),
        ])

        const projJson = await projRes.json()
        const testiJson = await testiRes.json()

        setProjects(projJson.data ?? projJson ?? [])
        setTestimonials(testiJson.data ?? testiJson ?? [])
      } catch (e) {
        console.error('[ClientHome] content fetch failed', e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      {!introDone && <Start onComplete={() => setIntroDone(true)} />}

      <Hero />
      {!loading && (
        <>
          <ProofStrip items={testimonials as any} />
          <ProjectsRail items={projects as any} />
        </>
      )}
      <Services />
      <Pricing />
      <About />
      <Booking />
      <FAQ />
      <Footer />
    </main>
  )
}
