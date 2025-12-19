'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState } from 'react'
import { track } from '@/lib/analytics'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, ArrowRight, Sparkles } from 'lucide-react'

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
  { value: 'NZD 3k–6k', label: 'Starter', sublabel: '3k–6k' },
  { value: 'NZD 7k–15k', label: 'Growth', sublabel: '7k–15k' },
  { value: 'NZD 16k+', label: 'Bespoke', sublabel: '16k+' },
  { value: 'Not sure', label: 'Not sure yet', sublabel: '—' },
]

const timelineOptions = [
  { value: 'ASAP', label: 'ASAP' },
  { value: '1 month', label: '1 month' },
  { value: '2-3 months', label: '2-3 months' },
  { value: 'Flexible', label: 'Flexible' },
]

export function Booking() {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<Lead>()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'err'>('idle')
  const [message, setMessage] = useState<string>('')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  const selectedBudget = watch('budget')
  const selectedTimeline = watch('timeline')

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
        setMessage('We\'ll review your brief and respond within 24 hours.')
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
    <section id="booking" className="relative py-24 md:py-32 bg-black overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.02),transparent_50%)]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles size={14} className="text-white/50" />
            <span className="text-xs tracking-[0.2em] uppercase text-white/50">Start a project</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Let's build
            <span className="block text-white/30">something great.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 text-lg max-w-md mx-auto"
          >
            Tell us about your project. We respond to every brief within 24 hours.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'ok' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8"
              >
                <CheckCircle size={40} className="text-white" />
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Brief received</h3>
              <p className="text-neutral-400 text-lg mb-8">{message}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-sm text-neutral-500 hover:text-white transition underline underline-offset-4"
              >
                Submit another brief
              </button>
            </motion.div>
          ) : (
            <motion.form 
              key="form"
              onSubmit={handleSubmit(onSubmit)} 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Budget Selection - Visual Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                <label className="block text-sm text-neutral-500 mb-4 tracking-wide">Investment range</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {budgetRanges.map((range, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setValue('budget', range.value)}
                      className={`
                        relative p-5 rounded-2xl border text-left transition-all duration-300
                        ${selectedBudget === range.value 
                          ? 'bg-white text-black border-white' 
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                        }
                      `}
                    >
                      <span className={`block text-xs mb-2 ${selectedBudget === range.value ? 'text-black/50' : 'text-white/40'}`}>
                        NZD
                      </span>
                      <span className={`block text-lg font-semibold ${selectedBudget === range.value ? 'text-black' : 'text-white'}`}>
                        {range.sublabel}
                      </span>
                      <span className={`block text-sm mt-1 ${selectedBudget === range.value ? 'text-black/60' : 'text-white/50'}`}>
                        {range.label}
                      </span>
                      {selectedBudget === range.value && (
                        <motion.div 
                          layoutId="budgetIndicator"
                          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-black"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <input type="hidden" {...register('budget', { required: true })} />
                {errors.budget && <p className="text-red-400/80 text-sm mt-2">Please select a budget range</p>}
              </motion.div>

              {/* Timeline Selection */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-12"
              >
                <label className="block text-sm text-neutral-500 mb-4 tracking-wide">Timeline</label>
                <div className="flex flex-wrap gap-3">
                  {timelineOptions.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setValue('timeline', opt.value)}
                      className={`
                        px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300
                        ${selectedTimeline === opt.value 
                          ? 'bg-white text-black border-white' 
                          : 'bg-transparent border-white/20 text-white/70 hover:border-white/40 hover:text-white'
                        }
                      `}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <input type="hidden" {...register('timeline', { required: true })} />
                {errors.timeline && <p className="text-red-400/80 text-sm mt-2">Please select a timeline</p>}
              </motion.div>

              {/* Contact Details */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid md:grid-cols-2 gap-6 mb-8"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Name</label>
                    <input 
                      placeholder="Your name" 
                      {...register('name', { required: true })} 
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`
                        w-full px-0 py-3 bg-transparent border-0 border-b text-lg transition-all
                        placeholder:text-white/20 focus:outline-none
                        ${errors.name ? 'border-red-400/50' : focusedField === 'name' ? 'border-white' : 'border-white/20'}
                      `}
                      data-testid="booking-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Email</label>
                    <input 
                      type="email"
                      placeholder="you@company.com" 
                      {...register('email', { required: true })} 
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`
                        w-full px-0 py-3 bg-transparent border-0 border-b text-lg transition-all
                        placeholder:text-white/20 focus:outline-none
                        ${errors.email ? 'border-red-400/50' : focusedField === 'email' ? 'border-white' : 'border-white/20'}
                      `}
                      data-testid="booking-email"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Company <span className="text-white/30">(optional)</span></label>
                    <input 
                      placeholder="Company name" 
                      {...register('company')} 
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className={`
                        w-full px-0 py-3 bg-transparent border-0 border-b text-lg transition-all
                        placeholder:text-white/20 focus:outline-none
                        ${focusedField === 'company' ? 'border-white' : 'border-white/20'}
                      `}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-500 mb-2">Current website <span className="text-white/30">(optional)</span></label>
                    <input 
                      placeholder="https://..." 
                      {...register('website')} 
                      onFocus={() => setFocusedField('website')}
                      onBlur={() => setFocusedField(null)}
                      className={`
                        w-full px-0 py-3 bg-transparent border-0 border-b text-lg transition-all
                        placeholder:text-white/20 focus:outline-none
                        ${focusedField === 'website' ? 'border-white' : 'border-white/20'}
                      `}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Project Details */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-8 mb-12"
              >
                <div>
                  <label className="block text-sm text-neutral-500 mb-2">What are you looking to build?</label>
                  <textarea 
                    placeholder="Tell us about your project goals and what success looks like..." 
                    {...register('goals', { required: true })} 
                    rows={4}
                    onFocus={() => setFocusedField('goals')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full px-0 py-3 bg-transparent border-0 border-b text-lg transition-all resize-none
                      placeholder:text-white/20 focus:outline-none
                      ${errors.goals ? 'border-red-400/50' : focusedField === 'goals' ? 'border-white' : 'border-white/20'}
                    `}
                    data-testid="booking-goals"
                  />
                  {errors.goals && <p className="text-red-400/80 text-sm mt-2">Please tell us about your project</p>}
                </div>

                <div>
                  <label className="block text-sm text-neutral-500 mb-2">Current challenges <span className="text-white/30">(optional)</span></label>
                  <textarea 
                    placeholder="What's not working with your current setup?" 
                    {...register('issues')} 
                    rows={2}
                    onFocus={() => setFocusedField('issues')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full px-0 py-3 bg-transparent border-0 border-b text-lg transition-all resize-none
                      placeholder:text-white/20 focus:outline-none
                      ${focusedField === 'issues' ? 'border-white' : 'border-white/20'}
                    `}
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-500 mb-2">Inspiration <span className="text-white/30">(optional)</span></label>
                  <textarea 
                    placeholder="Links to sites or products you admire..." 
                    {...register('inspiration')} 
                    rows={2}
                    onFocus={() => setFocusedField('inspiration')}
                    onBlur={() => setFocusedField(null)}
                    className={`
                      w-full px-0 py-3 bg-transparent border-0 border-b text-lg transition-all resize-none
                      placeholder:text-white/20 focus:outline-none
                      ${focusedField === 'inspiration' ? 'border-white' : 'border-white/20'}
                    `}
                  />
                </div>
              </motion.div>

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
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mb-6"
                >
                  {message}
                </motion.p>
              )}

              {/* Submit */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <p className="text-sm text-neutral-600 max-w-xs">
                  We review every submission personally and respond within 24 hours.
                </p>
                <motion.button 
                  type="submit"
                  disabled={status === 'submitting'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium overflow-hidden disabled:opacity-50"
                  data-testid="booking-submit"
                >
                  <span className="relative z-10">
                    {status === 'submitting' ? 'Sending...' : 'Submit brief'}
                  </span>
                  {status !== 'submitting' && (
                    <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                  )}
                  <motion.div 
                    className="absolute inset-0 bg-neutral-200"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Trust indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 pt-12 border-t border-white/10"
        >
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            {[
              { value: '24h', label: 'Response time' },
              { value: '40+', label: 'Projects delivered' },
              { value: '100%', label: 'Code ownership' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-white/80">{stat.value}</div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
