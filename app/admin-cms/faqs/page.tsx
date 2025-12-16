'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react'

interface FAQ {
  _id: string
  question: string
  answer: string
  category: string
  order: number
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<FAQ | null>(null)
  const [isNew, setIsNew] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/admin/faqs')
      const data = await res.json()
      setFaqs(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error('Failed to fetch FAQs:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!editing) return
    setSaving(true)

    try {
      const url = isNew ? '/api/admin/faqs' : `/api/admin/faqs/${editing._id}`
      const method = isNew ? 'POST' : 'PUT'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editing)
      })

      if (res.ok) {
        fetchFaqs()
        setEditing(null)
        setIsNew(false)
      } else {
        alert('Failed to save FAQ')
      }
    } catch (e) {
      alert('Failed to save FAQ')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ?')) return
    try {
      await fetch(`/api/admin/faqs/${id}`, { method: 'DELETE' })
      setFaqs(faqs.filter(f => f._id !== id))
    } catch (e) {
      alert('Failed to delete FAQ')
    }
  }

  const startNew = () => {
    setEditing({
      _id: '',
      question: '',
      answer: '',
      category: '',
      order: faqs.length
    })
    setIsNew(true)
  }

  if (loading) {
    return <div className="animate-pulse">Loading FAQs...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">FAQs</h1>
          <p className="text-neutral-400 mt-1">Manage frequently asked questions</p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-medium hover:opacity-90 transition"
        >
          <Plus size={18} />
          New FAQ
        </button>
      </div>

      {faqs.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <p>No FAQs yet.</p>
          <p className="mt-2">Click "Seed Data" on the dashboard or create a new FAQ.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="text-neutral-400 text-sm mt-2 line-clamp-2">{faq.answer}</p>
                  {faq.category && (
                    <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-white/10">{faq.category}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setEditing(faq); setIsNew(false) }}
                    className="p-2 rounded-lg hover:bg-white/10 transition"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(faq._id)}
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
          <div className="bg-neutral-900 rounded-2xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h3 className="font-semibold">{isNew ? 'New FAQ' : 'Edit FAQ'}</h3>
              <button onClick={() => { setEditing(null); setIsNew(false) }} className="p-2 hover:bg-white/10 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Question *</label>
                <input
                  type="text"
                  value={editing.question}
                  onChange={(e) => setEditing({ ...editing, question: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Answer *</label>
                <textarea
                  value={editing.answer}
                  onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Category</label>
                  <input
                    type="text"
                    value={editing.category}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                    placeholder="Process, Legal, Services..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Order</label>
                  <input
                    type="number"
                    value={editing.order}
                    onChange={(e) => setEditing({ ...editing, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none"
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
