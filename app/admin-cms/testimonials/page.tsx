'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'

interface Testimonial {
  _id: string
  quote: string
  name: string
  role: string
  company: string
  projectSlug: string
  featured: boolean
  order: number
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/cms-api/testimonials')
      const data = await res.json()
      setTestimonials(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error('Failed to fetch testimonials:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)

    try {
      const url = isNew ? '/cms-api/testimonials' : `/cms-api/testimonials/${editing._id}`
      const method = isNew ? 'POST' : 'PUT'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      })

      if (res.ok) {
        fetchTestimonials()
        setEditing(null)
        setIsNew(false)
      } else {
        alert('Failed to save testimonial')
      }
    } catch (e) {
      alert('Failed to save testimonial')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return
    try {
      await fetch(`/cms-api/testimonials/${id}`, { method: 'DELETE' })
      setTestimonials(testimonials.filter(t => t._id !== id))
    } catch (e) {
      alert('Failed to delete testimonial')
    }
  }

  const startNew = () => {
    setEditing({
      _id: '',
      quote: '',
      name: '',
      role: '',
      company: '',
      projectSlug: '',
      featured: false,
      order: testimonials.length
    })
    setIsNew(true)
  }

  if (loading) {
    return <div className="animate-pulse">Loading testimonials...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Testimonials</h1>
          <p className="text-neutral-400 mt-1">Manage client testimonials and social proof</p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-medium hover:opacity-90 transition"
        >
          <Plus size={18} />
          New Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <p>No testimonials yet.</p>
          <p className="mt-2">Click "Seed Data" on the dashboard or create a new testimonial.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-neutral-300 italic">"{testimonial.quote}"</p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span className="font-medium">{testimonial.name}</span>
                    {testimonial.role && <span className="text-neutral-400">{testimonial.role}</span>}
                    {testimonial.company && <span className="text-neutral-400">@ {testimonial.company}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {testimonial.featured && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-white/10">Featured</span>
                  )}
                  <button
                    onClick={() => { setEditing(testimonial); setIsNew(false) }}
                    className="p-2 rounded-lg hover:bg-white/10 transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-semibold">{isNew ? 'New Testimonial' : 'Edit Testimonial'}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false) }} className="p-2 hover:bg-white/10 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Quote *</label>
                <textarea
                  value={editing.quote}
                  onChange={(e) => setEditing({ ...editing, quote: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Name *</label>
                  <input
                    type="text"
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Role</label>
                  <input
                    type="text"
                    value={editing.role}
                    onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Company</label>
                  <input
                    type="text"
                    value={editing.company}
                    onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Project Slug</label>
                  <input
                    type="text"
                    value={editing.projectSlug}
                    onChange={(e) => setEditing({ ...editing, projectSlug: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editing.featured}
                    onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                    className="w-5 h-5 rounded border-white/20 bg-white/5"
                  />
                  <span>Featured</span>
                </label>
                <div>
                  <label className="text-sm text-neutral-400 mr-2">Order:</label>
                  <input
                    type="number"
                    value={editing.order}
                    onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })}
                    className="w-20 px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-4 border-t border-white/10">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-white text-black font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                <Save size={18} />
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => { setEditing(null); setIsNew(false) }}
                className="px-4 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
