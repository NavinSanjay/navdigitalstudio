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
    return () => {
      el.style.overflow = ''
    }
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

        // Normalize to arrays
        const projectsData = Array.isArray(projJson?.data) 
          ? projJson.data 
          : Array.isArray(projJson) 
            ? projJson 
            : []
        
        const testimonialsData = Array.isArray(testiJson?.data) 
          ? testiJson.data 
          : Array.isArray(testiJson) 
            ? testiJson 
            : []

        setProjects(projectsData)
        setTestimonials(testimonialsData)
      } catch (e) {
        console.error('[ClientHome] content fetch failed', e)
        setProjects([])
        setTestimonials([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])
  console.log('Debug:', { loading, projectsCount: projects.length, testimonialsCount: testimonials.length })

  return (
    <main className="min-h-screen bg-black text-white">
      {!introDone && <Start onComplete={() => setIntroDone(true)} />}

      <Hero introDone={introDone} />

      {/* Render each independently - don't block one if the other fails */}
      {!loading && testimonials.length > 0 && (
        <ProofStrip items={testimonials} />
      )}
      
      {!loading && projects.length > 0 && (
        <ProjectsRail items={projects} />
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
