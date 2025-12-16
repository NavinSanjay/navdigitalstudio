'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FolderOpen, MessageSquareQuote, HelpCircle, LogOut, Menu, X } from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [username, setUsername] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/cms-api/session')
      if (res.ok) {
        const data = await res.json()
        setAuthenticated(true)
        setUsername(data.username)
      } else {
        setAuthenticated(false)
      }
    } catch {
      setAuthenticated(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/cms-api/logout', { method: 'POST' })
    setAuthenticated(false)
    router.push('/admin-cms')
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    return <>{children}</>
  }

  const navItems = [
    { href: '/admin-cms' as const, label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin-cms/projects' as const, label: 'Projects', icon: FolderOpen },
    { href: '/admin-cms/testimonials' as const, label: 'Testimonials', icon: MessageSquareQuote },
    { href: '/admin-cms/faqs' as const, label: 'FAQs', icon: HelpCircle },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <span className="font-semibold">Nav CMS</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-white/10 z-40 transition-transform lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/10">
          <h1 className="text-lg font-semibold">Nav Digital Studio</h1>
          <p className="text-sm text-neutral-400 mt-1">Content Manager</p>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}          
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-neutral-400">Logged in as</span>
            <span className="text-sm font-medium">{username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 transition text-sm"
          >
            <LogOut size={16} />
            Sign out
          </button>
          <Link
            href="/"
            className="mt-2 w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm text-neutral-400 hover:text-white transition"
          >
            View site →
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
