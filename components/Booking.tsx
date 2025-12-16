'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { track } from '@/lib/analytics'

const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  website: z.string().optional(),
  budget: z.string(),
  timeline: z.string(),
  goals: z.string(),
  issues: z.string().optional(),
  inspiration: z.string().optional(),
  confirmEmail: z.string().optional()
})
type Lead = z.infer<typeof LeadSchema>

export function Booking() {
  const { register, handleSubmit, reset } = useForm<Lead>()
  const [status, setStatus] = useState<'idle'|'ok'|'err'>('idle')
  const [message, setMessage] = useState<string>('')

  const onSubmit = async (data: Lead) => {
    track('lead_form_submitted')
    const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (res.ok) {
      setStatus('ok'); setMessage('Thanks — we will review within 24h. You can also pick a time below.'); reset()
      document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      setStatus('err'); const j = await res.json().catch(() => ({})); setMessage(j?.error || 'Something went wrong.')
    }
  }

  return (
    <section id="booking" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Booking & lead capture</h2>
        <p className="mt-2 text-neutral-300">Tell us a little about your project.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid md:grid-cols-2 gap-4">
          <input placeholder="Name *" {...register('name')} className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10" />
          <input placeholder="Email *" {...register('email')} className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10" />
          <input placeholder="Company" {...register('company')} className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10" />
          <input placeholder="Website" {...register('website')} className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10" />
          <input placeholder="Budget range *" {...register('budget')} className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10" />
          <input placeholder="Timeline *" {...register('timeline')} className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10" />
          <textarea placeholder="Goals *" {...register('goals')} className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10 md:col-span-2" rows={3} />
          <textarea placeholder="Current issues" {...register('issues')} className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10 md:col-span-2" rows={3} />
          <textarea placeholder="Inspiration links" {...register('inspiration')} className="px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10 md:col-span-2" rows={2} />
          <input aria-hidden="true" tabIndex={-1} autoComplete="off" className="hidden" placeholder="Confirm Email" {...register('confirmEmail')} />
          <div className="md:col-span-2 flex gap-3">
            <button onClick={() => track('booking_started')} className="px-6 py-3 rounded-xl bg-white text-black font-medium hover:opacity-90 transition" type="submit">
              Submit brief
            </button>
            <a href="#schedule" className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition">Pick a time</a>
          </div>
        </form>
        {status !== 'idle' && (<p className={`mt-4 text-sm ${status === 'ok' ? 'text-green-400' : 'text-red-400'}`}>{message}</p>)}
        <div id="schedule" className="mt-14"><Schedule /></div>
      </div>
    </section>
  )
}

function Schedule() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string>('')
  const book = async (day: string, time: string) => {
    setLoading(true)
  }
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
      <h3 className="font-semibold">Pick a slot</h3>
      <div className="mt-4 text-sm text-neutral-400">Slots are example only. Configure in content/booking.json or extend.</div>
      <div className="mt-6 grid md:grid-cols-5 gap-4">
        {['Mon','Tue','Wed','Thu','Fri'].map((d) => (
          <div key={d} className="p-4 rounded-xl border border-white/10">
            <div className="text-sm text-neutral-400">{d}</div>
            <div className="mt-2 flex flex-col gap-2">
              {['10:00','14:00','19:00'].map((t) => (
                <button key={t} disabled={loading} onClick={async () => {
                  setLoading(true)
                  const res = await fetch('/api/book', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ day: d, time: t }) })
                  setLoading(false)
                  if (res.ok) setMsg('Booked! Check your email for confirmation.')
                  else {
                    const j = await res.json().catch(() => ({}))
                    setMsg(j?.error || 'Unable to book. Try another slot.')
                  }
                }} className="px-3 py-2 rounded-lg bg-white text-black hover:opacity-90">{t}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {msg && <p className="mt-4 text-sm text-green-400">{msg}</p>}
    </div>
  )
}
