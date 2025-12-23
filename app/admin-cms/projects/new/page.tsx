'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

type ProjCategory = 'web' | 'ai' | 'hybrid'

export default function NewProjectPage() {
  const router = useRouter()
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
    order: 0,

    // NEW
    category: 'web' as ProjCategory,
    headlineResult: '',
    aiFeatures: '',
    dataSources: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : type === 'number'
          ? parseInt(value) || 0
          : value,
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
        scope: formData.scope
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        stack: formData.stack
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        summary: formData.summary,
        problem: {
          context: formData.problemContext,
          constraints: formData.problemConstraints
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
        },
        approach: {
          strategy: formData.approachStrategy,
          key_decisions: formData.approachDecisions
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
        },
        outcome: {
          results: formData.outcomeResults
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
          metrics: formData.outcomeMetrics
            .split('\n')
            .map((line) => {
              const [label, value] = line.split(':').map((s) => s.trim())
              return label && value ? { label, value } : null
            })
            .filter(Boolean),
        },
        media: formData.mediaUrl
          ? [{ type: 'image', src: formData.mediaUrl, alt: formData.title }]
          : [],
        cta: { label: formData.ctaLabel, href: formData.ctaHref },
        featured: formData.featured,
        order: formData.order,

        // NEW
        category: formData.category,
        headline_result: formData.headlineResult || undefined,
        ai_features: formData.aiFeatures
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        data_sources: formData.dataSources
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
      }

      const res = await fetch('/cms-api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/admin-cms/projects')
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to create project')
      }
    } catch (e) {
      alert('Failed to create project')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin-cms/projects"
          className="p-2 rounded-lg hover:bg-white/10 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">New Project</h1>
          <p className="text-neutral-400 mt-1">Add a new case study</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Title + slug */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">
              Title *
            </label>
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
            <label className="block text-sm text-neutral-400 mb-2">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="my-project-name"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Category + client/year/role */}
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-3 rounded-lg bg-white/5 border border-white/10 text-sm focus:border-white/30 focus:outline-none"
            >
              <option value="web">Website &amp; Brand</option>
              <option value="ai">AI &amp; Data System</option>
              <option value="hybrid">Hybrid: Web + AI</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-2">
              Client
            </label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-2">
              Year *
            </label>
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
            <label className="block text-sm text-neutral-400 mb-2">
              Role *
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Design • Build • Strategy"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Headline result */}
        <div>
          <label className="block text-sm text-neutral-400 mb-2">
            Headline result (optional)
          </label>
          <input
            type="text"
            name="headlineResult"
            value={formData.headlineResult}
            onChange={handleChange}
            placeholder="e.g. Reporting time cut by 80%"
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
          />
        </div>

        {/* Scope / stack */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-2">
              Scope (comma separated)
            </label>
            <input
              type="text"
              name="scope"
              value={formData.scope}
              onChange={handleChange}
              placeholder="Brand Identity, Website Design, Strategy"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-2">
              Tech Stack (comma separated)
            </label>
            <input
              type="text"
              name="stack"
              value={formData.stack}
              onChange={handleChange}
              placeholder="Next.js, Tailwind, Python"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm text-neutral-400 mb-2">
            Summary
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
          />
        </div>

        {/* AI & Data section */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="font-medium mb-4">AI &amp; Data (optional)</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-neutral-400 mb-2">
                AI Features (one per line)
              </label>
              <textarea
                name="aiFeatures"
                value={formData.aiFeatures}
                onChange={handleChange}
                rows={3}
                placeholder={`RAG chatbot on internal docs\nForecasting model for traffic\nAutomated reporting`}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-neutral-400 mb-2">
                Data Sources (one per line)
              </label>
              <textarea
                name="dataSources"
                value={formData.dataSources}
                onChange={handleChange}
                rows={3}
                placeholder={`Internal CRM\nProperty portfolio database\nWeather API`}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Problem */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="font-medium mb-4">Problem</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Context
              </label>
              <textarea
                name="problemContext"
                value={formData.problemContext}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Constraints (one per line)
              </label>
              <textarea
                name="problemConstraints"
                value={formData.problemConstraints}
                onChange={handleChange}
                rows={3}
                placeholder="Tight timeline\nLimited budget\nLegacy system constraints"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Approach */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="font-medium mb-4">Approach</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Strategy
              </label>
              <textarea
                name="approachStrategy"
                value={formData.approachStrategy}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Key Decisions (one per line)
              </label>
              <textarea
                name="approachDecisions"
                value={formData.approachDecisions}
                onChange={handleChange}
                rows={3}
                placeholder="Prioritized mobile-first design\nChose headless CMS\nImplemented progressive enhancement"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Outcome */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="font-medium mb-4">Outcome</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Results (one per line)
              </label>
              <textarea
                name="outcomeResults"
                value={formData.outcomeResults}
                onChange={handleChange}
                rows={3}
                placeholder="Increased conversion rate\nReduced reporting time\nImproved decision speed"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Metrics (format: Label: Value, one per line)
              </label>
              <textarea
                name="outcomeMetrics"
                value={formData.outcomeMetrics}
                onChange={handleChange}
                rows={3}
                placeholder="Conversion: +45%\nReporting time: -80%\nForecast error: -25%"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Media & CTA */}
        <div className="border-t border-white/10 pt-6">
          <h3 className="font-medium mb-4">Media &amp; CTA</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-400 mb-2">
                Cover Image URL
              </label>
              <input
                type="text"
                name="mediaUrl"
                value={formData.mediaUrl}
                onChange={handleChange}
                placeholder="/images/project-cover.jpg"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">
                  CTA Label
                </label>
                <input
                  type="text"
                  name="ctaLabel"
                  value={formData.ctaLabel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">
                  CTA Link
                </label>
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

        {/* Featured + order */}
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

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            <Save size={18} />
            {saving ? 'Creating...' : 'Create Project'}
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
