'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { track } from '@/lib/analytics'
import { motion } from 'framer-motion'
import { Send, Calendar, ArrowRight, CheckCircle } from 'lucide-react'

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

const budgetRanges = [
  'NZD 3k–6k (Starter)',
  'NZD 7k–15k (Growth)',
  'NZD 16k+ (Bespoke)',
  'Not sure yet'
]

const timelineOptions = [
  'ASAP (within 2 weeks)',
  '1 month',
  '2-3 months',
  'Flexible / planning ahead'
]

export function Booking() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Lead>()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'err'>('idle')
  const [message, setMessage] = useState<string>('')

  const onSubmit = async (data: Lead) => {
    setStatus('submitting')
    track('lead_form_submitted')
    
    try {
      const res = await fetch('/api/lead', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(data) 
      })
      
      if (res.ok) {
        setStatus('ok')
        setMessage('Thanks — we will review your brief within 24 hours and be in touch.')
        reset()
        track('lead_form_success')
      } else {
        setStatus('err')
        const j = await res.json().catch(() => ({}))
        setMessage(j?.error || 'Something went wrong. Please try again.')
        track('lead_form_error')
      }
    } catch {
      setStatus('err')
      setMessage('Connection error. Please try again.')
    }
  }

  return (
    <section id="booking" className="py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Info */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-px w-12 bg-white/30" />
              <span className="text-sm tracking-widest uppercase text-neutral-500">Start a project</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-8"
            >
              Ready to build?
              <span className="text-neutral-500"> Let's talk.</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-6 text-neutral-400"
            >
              <p>
                Fill out the brief form to tell us about your project. 
                We review every submission personally and respond within 24 hours.
              </p>
              <p>
                For complex projects or urgent timelines, book a discovery call 
                and we'll shape the scope together.
              </p>
            </motion.div>

            {/* What happens next */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 p-6 rounded-2xl bg-white/[0.02] border border-white/10"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Calendar size={18} />
                What happens next
              </h3>
              <ol className="space-y-4">
                {[
                  'We review your brief (within 24h)',
                  'Quick call to clarify scope & fit',
                  'Proposal with timeline & investment',
                  'Kick off with 50% deposit'
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>

          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {status === 'ok' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-white/[0.02] border border-white/10">
                <CheckCircle size={48} className="text-green-400 mb-6" />
                <h3 className="text-2xl font-semibold mb-4">Brief received</h3>
                <p className="text-neutral-400 mb-8">{message}</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="text-sm text-neutral-500 hover:text-white transition"
                >
                  Submit another brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Contact info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Name *</label>
                    <input 
                      placeholder="Your name" 
                      {...register('name', { required: true })} 
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border transition focus:outline-none focus:border-white/40 ${
                        errors.name ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      data-testid="booking-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Email *</label>
                    <input 
                      type="email"
                      placeholder="you@company.com" 
                      {...register('email', { required: true })} 
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border transition focus:outline-none focus:border-white/40 ${
                        errors.email ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      data-testid="booking-email"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Company / Organization</label>
                    <input 
                      placeholder="Company name" 
                      {...register('company')} 
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 transition focus:outline-none focus:border-white/40"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Current website</label>
                    <input 
                      placeholder="https://..." 
                      {...register('website')} 
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 transition focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Budget range *</label>
                    <select 
                      {...register('budget', { required: true })} 
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border transition focus:outline-none focus:border-white/40 ${
                        errors.budget ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      data-testid="booking-budget"
                    >
                      <option value="">Select budget</option>
                      {budgetRanges.map((range, i) => (
                        <option key={i} value={range}>{range}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-400 mb-2">Timeline *</label>
                    <select 
                      {...register('timeline', { required: true })} 
                      className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border transition focus:outline-none focus:border-white/40 ${
                        errors.timeline ? 'border-red-500/50' : 'border-white/10'
                      }`}
                      data-testid="booking-timeline"
                    >
                      <option value="">Select timeline</option>
                      {timelineOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Project goals *</label>
                  <textarea 
                    placeholder="What are you trying to achieve? What does success look like?" 
                    {...register('goals', { required: true })} 
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl bg-white/[0.02] border transition focus:outline-none focus:border-white/40 ${
                      errors.goals ? 'border-red-500/50' : 'border-white/10'
                    }`}
                    data-testid="booking-goals"
                  />
                </div>

                {/* Issues */}
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Current challenges (optional)</label>
                  <textarea 
                    placeholder="What's not working with your current site/system?" 
                    {...register('issues')} 
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 transition focus:outline-none focus:border-white/40"
                  />
                </div>

                {/* Inspiration */}
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Inspiration links (optional)</label>
                  <textarea 
                    placeholder="Sites or products you admire..." 
                    {...register('inspiration')} 
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 transition focus:outline-none focus:border-white/40"
                  />
                </div>

                {/* Honeypot */}
                <input 
                  aria-hidden="true" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  className="hidden" 
                  placeholder="Confirm Email" 
                  {...register('confirmEmail')} 
                />

                {/* Error message */}
                {status === 'err' && (
                  <p className="text-red-400 text-sm">{message}</p>
                )}

                {/* Submit */}
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition disabled:opacity-50"
                  data-testid="booking-submit"
                >
                  {status === 'submitting' ? (
                    'Sending...'
                  ) : (
                    <>
                      Submit brief
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
