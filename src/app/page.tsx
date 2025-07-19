'use client'

import { useEffect, useState } from 'react'
import Hero from '@/sections/Hero'
import Hero2 from '@/sections/Hero2'
import Projects from '@/sections/Projects'
import Navbar from '../components/Navbar'

export default function HomePage() {
  const [heroDone, setHeroDone] = useState(false)
  const [scrollTriggered, setScrollTriggered] = useState(false)
  const [showHero2, setShowHero2] = useState(false)

  useEffect(() => {
    if (heroDone && !scrollTriggered) {
      const section = document.getElementById('projects')
      if (section) {
        setScrollTriggered(true)

        // Scroll first
        section.scrollIntoView({ behavior: 'smooth' })

        // Then reveal Hero2 after scroll settles
        setTimeout(() => {
          setShowHero2(true)
        }, 1200)
      }
    }
  }, [heroDone, scrollTriggered])

  return (
    <main className="flex flex-col-reverse h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <Navbar />

      {!heroDone && (
        <section id="hero" className="h-screen w-full overflow-hidden">
          <Hero onComplete={() => setHeroDone(true)} />
        </section>
      )}

      {heroDone && (
        <section id="projects" className="h-screen snap-start">
          <Projects />
        </section>
      )}

      {showHero2 && (
        <section id="hero2" className="h-screen snap-start">
          <Hero2 />
        </section>
      )}
    </main>
  )
}
