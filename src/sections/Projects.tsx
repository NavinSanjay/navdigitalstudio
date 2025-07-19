'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const projects = [
  { title: 'Project 1', href: '/projects/1', x: -200, y: -100 },
  { title: 'Project 2', href: '/projects/2', x: 100, y: -150 },
  { title: 'Project 3', href: '/projects/3', x: -100, y: 150 },
  { title: 'Project 4', href: '/projects/4', x: 200, y: 100 },
]

export default function Projects() {
  return (
    <section className="relative z-10 h-screen w-full bg-black text-white overflow-hidden flex items-center justify-center">
      {projects.map((project, index) => (
        <Link key={index} href={project.href}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
            animate={{ opacity: 1, scale: 1, x: project.x, y: project.y }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6, ease: 'easeOut' }}
            className="absolute w-52 h-32 bg-white text-black flex items-center justify-center rounded-lg shadow-lg cursor-pointer"
          >
            {project.title}
          </motion.div>
        </Link>
      ))}
    </section>
  )
}
