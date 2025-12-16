'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Project {
  _id: string
  slug: string
  title: string
  client: string
  year: number
  role: string
  scope: string[]
  stack: string[]
  summary: string
  problem: { context: string; constraints: string[] }
  approach: { strategy: string; key_decisions: string[] }
  outcome: { results: string[]; metrics: { label: string; value: string }[] }
  media: { type: string; src: string; alt: string }[]
  cta: { label: string; href: string }
  featured: boolean
  order: number
}

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    client: '',
    year: new Date().getFullYear(),
    role: '',
    scope: '',
    stack: '',
    summary: '',
    problemContext: '',
    problemConstraints: '',
    approachStrategy: '',
    approachDecisions: '',
    outcomeResults: '',
    outcomeMetrics: '',
    mediaUrl: '',
    ctaLabel: 'View site',
    ctaHref: '#',
    featured: false,
    order: 0
  })

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`)
      if (res.ok) {
        const project: Project = await res.json()
        setFormData({
          slug: project.slug || '',
          title: project.title || '',
          client: project.client || '',
          year: project.year || new Date().getFullYear(),
          role: project.role || '',
          scope: project.scope?.join(', ') || '',
          stack: project.stack?.join(', ') || '',
          summary: project.summary || '',
          problemContext: project.problem?.context || '',
          problemConstraints: project.problem?.constraints?.join('\n') || '',
          approachStrategy: project.approach?.strategy || '',
          approachDecisions: project.approach?.key_decisions?.join('\n') || '',
          outcomeResults: project.outcome?.results?.join('\n') || '',
          outcomeMetrics: project.outcome?.metrics?.map(m => `${m.label}: ${m.value}`).join('\n') || '',
          mediaUrl: project.media?.[0]?.src || '',
          ctaLabel: project.cta?.label || 'View site',
          ctaHref: project.cta?.href || '#',
          featured: project.featured || false,
          order: project.order || 0
        })
      }
    } catch (e) {
      console.error('Failed to fetch project:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const payload = {
        slug: formData.slug,
        title: formData.title,
        client: formData.client,
        year: formData.year,
        role: formData.role,
        scope: formData.scope.split(',').map(s => s.trim()).filter(Boolean),
        stack: formData.stack.split(',').map(s => s.trim()).filter(Boolean),
        summary: formData.summary,
        problem: {
          context: formData.problemContext,
          constraints: formData.problemConstraints.split('\n').map(s => s.trim()).filter(Boolean)
        },
        approach: {
          strategy: formData.approachStrategy,
          key_decisions: formData.approachDecisions.split('\n').map(s => s.trim()).filter(Boolean)
        },
        outcome: {
          results: formData.outcomeResults.split('\n').map(s => s.trim()).filter(Boolean),
          metrics: formData.outcomeMetrics.split('\n').map(line => {
            const [label, value] = line.split(':').map(s => s.trim())
            return label && value ? { label, value } : null
          }).filter(Boolean)
        },
        media: formData.mediaUrl ? [{ type: 'image', src: formData.mediaUrl, alt: formData.title }] : [],
        cta: { label: formData.ctaLabel, href: formData.ctaHref },
        featured: formData.featured,
        order: formData.order
      }

      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        router.push('/admin-cms/projects')
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to update project')
      }
    } catch (e) {
      alert('Failed to update project')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete this project? This cannot be undone.')) return
    try {
      await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
      router.push('/admin-cms/projects')
    } catch (e) {
      alert('Failed to delete project')
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading project...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin-cms/projects" className="p-2 rounded-lg hover:bg-white/10 transition">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold">Edit Project</h1>
            <p className="text-neutral-400 mt-1">{formData.title}</p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Slug *</label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Client</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Year *</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Role *</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              required
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Scope (comma separated)</label>
            <input
              type="text"
              name="scope"
              value={formData.scope}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-2">Tech Stack (comma separated)</label>
            <input
              type="text"
              name="stack"
              value={formData.stack}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-neutral-400 mb-2">Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
          />
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="font-medium mb-4">Problem</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Context</label>
              <textarea
                name="problemContext"
                value={formData.problemContext}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Constraints (one per line)</label>
              <textarea
                name="problemConstraints"
                value={formData.problemConstraints}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="font-medium mb-4">Approach</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Strategy</label>
              <textarea
                name="approachStrategy"
                value={formData.approachStrategy}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Key Decisions (one per line)</label>
              <textarea
                name="approachDecisions"
                value={formData.approachDecisions}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="font-medium mb-4">Outcome</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Results (one per line)</label>
              <textarea
                name="outcomeResults"
                value={formData.outcomeResults}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Metrics (format: Label: Value, one per line)</label>
              <textarea
                name="outcomeMetrics"
                value={formData.outcomeMetrics}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <h3 className="font-medium mb-4">Media & CTA</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">Cover Image URL</label>
              <input
                type="text"
                name="mediaUrl"
                value={formData.mediaUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">CTA Label</label>
                <input
                  type="text"
                  name="ctaLabel"
                  value={formData.ctaLabel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">CTA Link</label>
                <input
                  type="text"
                  name="ctaHref"
                  value={formData.ctaHref}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 rounded border-white/20 bg-white/5"
            />
            <span>Featured project</span>
          </label>
          <div>
            <label className="text-sm text-neutral-400 mr-2">Order:</label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-20 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <Link
            href="/admin-cms/projects"
            className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
