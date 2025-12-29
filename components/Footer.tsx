'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-16 border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-4 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Nav Digital Studio</h3>
            <p className="text-neutral-400 max-w-sm mb-6">
              Precision-built digital systems for founders who build to win. 
              Strategy, design, and engineering under one roof.
            </p>
            <a 
              href="#booking"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition"
            >
              Start a project
              <ArrowUpRight size={16} />
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Navigate</h4>
            <ul className="space-y-3">
              {[
                { href: '#projects', label: 'Work' },
                { href: '#pricing', label: 'Pricing' },
                { href: '#about', label: 'About' },
                { href: '#faq', label: 'FAQ' },
                { href: '#booking', label: 'Contact' },
              ].map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-neutral-500 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:bynavdigitalstudio@gmail.com"
                  className="text-neutral-400 hover:text-white transition"
                >
                  bynavdigitalstudio@gmail.com
                </a>
              </li>
              <li className="text-neutral-400">
                Auckland, New Zealand
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-sm text-neutral-500">
            © {currentYear} Nav Digital Studio. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
