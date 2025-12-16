'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FolderOpen, MessageSquareQuote, HelpCircle, Database } from 'lucide-react'

export default function AdminCMSPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ projects: 0, testimonials: 0, faqs: 0 })
  const [seeding, setSeeding] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (authenticated) {
      fetchStats()
    }
  }, [authenticated])

  const checkAuth = async () => {
    try {
      const res = await fetch('/cms-api/session')
      if (res.ok) {
        setAuthenticated(true)
      } else {
        setAuthenticated(false)
      }
    } catch {
      setAuthenticated(false)
    }
  }

  const fetchStats = async () => {
    try {
      const [projects, testimonials, faqs] = await Promise.all([
        fetch('/cms-api/projects').then(r => r.json()),
        fetch('/cms-api/testimonials').then(r => r.json()),
        fetch('/cms-api/faqs').then(r => r.json())
      ])
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
        faqs: Array.isArray(faqs) ? faqs.length : 0
      })
    } catch (e) {
      console.error('Failed to fetch stats:', e)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/cms-api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (res.ok) {
        setAuthenticated(true)
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || 'Login failed')
      }
    } catch {
      setError('Connection error')
    } finally {
      setLoading(false)
    }
  }

  const handleSeed = async () => {
    if (!confirm('This will replace all existing content with seed data. Continue?')) return
    setSeeding(true)
    try {
      const res = await fetch('/cms-api/seed', { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        alert(`Seeded: ${data.counts.projects} projects, ${data.counts.testimonials} testimonials, ${data.counts.faqs} FAQs`)
        fetchStats()
      } else {
        alert('Seed failed')
      }
    } catch {
      alert('Seed error')
    } finally {
      setSeeding(false)
    }
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold">Nav Digital Studio</h1>
            <p className="text-neutral-400 mt-2">Admin CMS</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition"
                placeholder="Enter username"
                required
                data-testid="admin-username"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition"
                placeholder="Enter password"
                required
                data-testid="admin-password"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm" data-testid="login-error">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-white text-black font-medium hover:opacity-90 transition disabled:opacity-50"
              data-testid="admin-login-btn"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-neutral-400 mt-1">Manage your site content</p>
        </div>
        <button
          onClick={handleSeed}
          disabled={seeding}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 transition text-sm disabled:opacity-50"
          data-testid="seed-btn"
        >
          <Database size={16} />
          {seeding ? 'Seeding...' : 'Seed Data'}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <a href="/admin-cms/projects" className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/5">
              <FolderOpen size={24} />
            </div>
            <div>
              <h3 className="font-semibold group-hover:text-white transition">Projects</h3>
              <p className="text-3xl font-bold mt-1">{stats.projects}</p>
            </div>
          </div>
        </a>

        <a href="/admin-cms/testimonials" className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/5">
              <MessageSquareQuote size={24} />
            </div>
            <div>
              <h3 className="font-semibold group-hover:text-white transition">Testimonials</h3>
              <p className="text-3xl font-bold mt-1">{stats.testimonials}</p>
            </div>
          </div>
        </a>

        <a href="/admin-cms/faqs" className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-white/5">
              <HelpCircle size={24} />
            </div>
            <div>
              <h3 className="font-semibold group-hover:text-white transition">FAQs</h3>
              <p className="text-3xl font-bold mt-1">{stats.faqs}</p>
            </div>
          </div>
        </a>
      </div>

      <div className="mt-10 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <h3 className="font-semibold mb-4">Quick Start</h3>
        <ul className="space-y-3 text-neutral-300 text-sm">
          <li>• Click <strong>"Seed Data"</strong> above to populate the database with sample content</li>
          <li>• Edit projects to update case studies shown on the main site</li>
          <li>• Manage testimonials to update the social proof section</li>
          <li>• Update FAQs to answer common visitor questions</li>
          <li>• All changes reflect immediately on the live site</li>
        </ul>
      </div>
    </div>
  )
}
