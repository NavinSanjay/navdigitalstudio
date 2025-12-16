'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Eye, GripVertical } from 'lucide-react'
import Link from 'next/link'

interface Project {
  _id: string
  slug: string
  title: string
  client: string
  year: number
  role: string
  featured: boolean
  order: number
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/admin/projects')
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error('Failed to fetch projects:', e)
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Delete this project? This cannot be undone.')) return
    try {
      await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
      setProjects(projects.filter(p => p._id !== id))
    } catch (e) {
      alert('Failed to delete project')
    }
  }

  if (loading) {
    return <div className="animate-pulse">Loading projects...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Projects</h1>
          <p className="text-neutral-400 mt-1">Manage your portfolio case studies</p>
        </div>
        <Link
          href="/admin-cms/projects/new"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-black font-medium hover:opacity-90 transition"
          data-testid="new-project-btn"
        >
          <Plus size={18} />
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16 text-neutral-400">
          <p>No projects yet.</p>
          <p className="mt-2">Click "Seed Data" on the dashboard or create a new project.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition"
            >
              <div className="text-neutral-500 cursor-move">
                <GripVertical size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-medium truncate">{project.title}</h3>
                  {project.featured && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-white/10">Featured</span>
                  )}
                </div>
                <p className="text-sm text-neutral-400 mt-1">
                  {project.year} • {project.role}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/#case-${project.slug}`}
                  target="_blank"
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                  title="View on site"
                >
                  <Eye size={18} />
                </Link>
                <Link
                  href={`/admin-cms/projects/${project._id}`}
                  className="p-2 rounded-lg hover:bg-white/10 transition"
                  title="Edit"
                >
                  <Pencil size={18} />
                </Link>
                <button
                  onClick={() => deleteProject(project._id)}
                  className="p-2 rounded-lg hover:bg-red-500/20 text-red-400 transition"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
