'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState, useRef } from 'react'
import { track } from '@/lib/analytics'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check } from 'lucide-react'

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
  { value: 'NZD 3k–6k', label: 'Starter', price: '3k–6k' },
  { value: 'NZD 7k–15k', label: 'Growth', price: '7k–15k' },
  { value: 'NZD 16k+', label: 'Bespoke', price: '16k+' },
  { value: 'Not sure', label: 'Flexible', price: 'TBD' },
]

const timelineOptions = [
  { value: 'ASAP', label: 'Immediate', desc: 'Within 2 weeks' },
  { value: '1 month', label: '1 Month', desc: 'Standard delivery' },
  { value: '2-3 months', label: '2-3 Months', desc: 'Extended timeline' },
  { value: 'Flexible', label: 'Flexible', desc: 'No rush' },
]

const steps = [
  { id: 1, title: 'Project Scope', desc: 'Investment & timeline' },
  { id: 2, title: 'Contact', desc: 'Your details' },
  { id: 3, title: 'Vision', desc: 'Project goals' },
]

function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}


export function Booking() {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors }, trigger } = useForm<Lead>()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'err'>('idle')
  const [message, setMessage] = useState<string>('')
  const [currentStep, setCurrentStep] = useState(1)
  const formRef = useRef<HTMLFormElement>(null)
  
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

  const nextStep = async () => {
    let fieldsToValidate: (keyof Lead)[] = []
    if (currentStep === 1) fieldsToValidate = ['budget', 'timeline']
    if (currentStep === 2) fieldsToValidate = ['name', 'email']
    if (currentStep === 3) fieldsToValidate = ['goals']
    
    const isValid = await trigger(fieldsToValidate)
    if (isValid && currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1)
  }

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? 100 : -100, opacity: 0 })
  }

  return (
    <section id="booking" className="relative min-h-screen bg-black py-20 md:py-32 overflow-hidden">
      <GridPattern />
      {/* Ambient gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative mx-auto max-w-5xl px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">Start Your Project</p>
          <h2 className="text-5xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Let's create something
            <br />
            <span className="text-white/40">extraordinary.</span>
          </h2>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'ok' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-lg mx-auto text-center py-20"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-10"
              >
                <Check size={40} strokeWidth={1} className="text-white" />
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-4">Brief received.</h3>
              <p className="text-white/50 text-lg mb-10 leading-relaxed">{message}</p>
              <button 
                onClick={() => { setStatus('idle'); setCurrentStep(1) }}
                className="text-sm text-white/40 hover:text-white transition-colors duration-300"
              >
                Submit another brief →
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              {/* Progress indicator */}
              <div className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  {steps.map((step, i) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div 
                          className={`
                            w-10 h-10 rounded-full border flex items-center justify-center text-sm font-medium transition-all duration-500
                            ${currentStep >= step.id 
                              ? 'border-white bg-white text-black' 
                              : 'border-white/20 text-white/40'
                            }
                          `}
                        >
                          {currentStep > step.id ? <Check size={16} /> : step.id}
                        </div>
                        <p className={`mt-3 text-xs tracking-wide transition-colors duration-300 hidden sm:block ${
                          currentStep >= step.id ? 'text-white' : 'text-white/30'
                        }`}>
                          {step.title}
                        </p>
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-16 sm:w-24 md:w-32 h-px mx-4 relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/10" />
                          <motion.div 
                            className="absolute inset-0 bg-white origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: currentStep > step.id ? 1 : 0 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                {/* Honeypot */}
                <input 
                  aria-hidden="true" 
                  tabIndex={-1} 
                  autoComplete="off" 
                  className="hidden" 
                  {...register('confirmEmail')} 
                />

                <AnimatePresence mode="wait" custom={currentStep}>
                  {/* Step 1: Budget & Timeline */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      custom={1}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-14"
                    >
                      {/* Budget */}
                      <div>
                        <label className="block text-sm text-white/50 mb-6 tracking-wide">Investment Range</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {budgetRanges.map((range) => (
                            <button
                              key={range.value}
                              type="button"
                              onClick={() => setValue('budget', range.value)}
                              className={`
                                group relative p-6 rounded-2xl border text-left transition-all duration-500
                                ${selectedBudget === range.value 
                                  ? 'bg-white border-white' 
                                  : 'bg-transparent border-white/10 hover:border-white/30'
                                }
                              `}
                            >
                              <span className={`block text-2xl font-light mb-2 transition-colors duration-300 ${
                                selectedBudget === range.value ? 'text-black' : 'text-white'
                              }`}>
                                {range.price}
                              </span>
                              <span className={`block text-xs tracking-wide uppercase transition-colors duration-300 ${
                                selectedBudget === range.value ? 'text-black/60' : 'text-white/40'
                              }`}>
                                {range.label}
                              </span>
                              {selectedBudget === range.value && (
                                <motion.div
                                  layoutId="budget-check"
                                  className="absolute top-4 right-4 w-5 h-5 rounded-full bg-black flex items-center justify-center"
                                >
                                  <Check size={12} className="text-white" />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" {...register('budget', { required: true })} />
                        {errors.budget && (
                          <p className="text-white/60 text-sm mt-4">Please select an investment range</p>
                        )}
                      </div>

                      {/* Timeline */}
                      <div>
                        <label className="block text-sm text-white/50 mb-6 tracking-wide">Timeline</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {timelineOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => setValue('timeline', opt.value)}
                              className={`
                                group relative p-6 rounded-2xl border text-left transition-all duration-500
                                ${selectedTimeline === opt.value 
                                  ? 'bg-white border-white' 
                                  : 'bg-transparent border-white/10 hover:border-white/30'
                                }
                              `}
                            >
                              <span className={`block text-lg font-light mb-1 transition-colors duration-300 ${
                                selectedTimeline === opt.value ? 'text-black' : 'text-white'
                              }`}>
                                {opt.label}
                              </span>
                              <span className={`block text-xs transition-colors duration-300 ${
                                selectedTimeline === opt.value ? 'text-black/50' : 'text-white/30'
                              }`}>
                                {opt.desc}
                              </span>
                              {selectedTimeline === opt.value && (
                                <motion.div
                                  layoutId="timeline-check"
                                  className="absolute top-4 right-4 w-5 h-5 rounded-full bg-black flex items-center justify-center"
                                >
                                  <Check size={12} className="text-white" />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" {...register('timeline', { required: true })} />
                        {errors.timeline && (
                          <p className="text-white/60 text-sm mt-4">Please select a timeline</p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Contact Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      custom={2}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-10"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Name */}
                        <div className="group">
                          <label className="block text-sm text-white/50 mb-3 tracking-wide">Name</label>
                          <input 
                            placeholder="Your full name"
                            {...register('name', { required: true })} 
                            className={`
                              w-full px-0 py-4 bg-transparent border-0 border-b-2 text-xl font-light
                              placeholder:text-white/20 focus:outline-none transition-all duration-300
                              ${errors.name ? 'border-white/60' : 'border-white/10 focus:border-white/50'}
                            `}
                            data-testid="booking-name"
                          />
                          {errors.name && (
                            <p className="text-white/50 text-sm mt-2">Please enter your name</p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="group">
                          <label className="block text-sm text-white/50 mb-3 tracking-wide">Email</label>
                          <input 
                            type="email"
                            placeholder="you@company.com"
                            {...register('email', { required: true })} 
                            className={`
                              w-full px-0 py-4 bg-transparent border-0 border-b-2 text-xl font-light
                              placeholder:text-white/20 focus:outline-none transition-all duration-300
                              ${errors.email ? 'border-white/60' : 'border-white/10 focus:border-white/50'}
                            `}
                            data-testid="booking-email"
                          />
                          {errors.email && (
                            <p className="text-white/50 text-sm mt-2">Please enter a valid email</p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Company */}
                        <div className="group">
                          <label className="block text-sm text-white/50 mb-3 tracking-wide">
                            Company <span className="text-white/20">— optional</span>
                          </label>
                          <input 
                            placeholder="Your company"
                            {...register('company')} 
                            className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/10 text-xl font-light placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
                          />
                        </div>

                        {/* Website */}
                        <div className="group">
                          <label className="block text-sm text-white/50 mb-3 tracking-wide">
                            Current Website <span className="text-white/20">— optional</span>
                          </label>
                          <input 
                            placeholder="https://..."
                            {...register('website')} 
                            className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/10 text-xl font-light placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Project Vision */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      custom={3}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="space-y-10"
                    >
                      {/* Goals */}
                      <div>
                        <label className="block text-sm text-white/50 mb-3 tracking-wide">What are you looking to build?</label>
                        <textarea 
                          placeholder="Describe your project vision, goals, and what success looks like..."
                          {...register('goals', { required: true })} 
                          rows={5}
                          className={`
                            w-full px-0 py-4 bg-transparent border-0 border-b-2 text-lg font-light resize-none
                            placeholder:text-white/20 focus:outline-none transition-all duration-300
                            ${errors.goals ? 'border-white/60' : 'border-white/10 focus:border-white/50'}
                          `}
                          data-testid="booking-goals"
                        />
                        {errors.goals && (
                          <p className="text-white/50 text-sm mt-2">Please describe your project</p>
                        )}
                      </div>

                      {/* Challenges */}
                      <div>
                        <label className="block text-sm text-white/50 mb-3 tracking-wide">
                          Current Challenges <span className="text-white/20">— optional</span>
                        </label>
                        <textarea 
                          placeholder="What's not working with your current setup?"
                          {...register('issues')} 
                          rows={3}
                          className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/10 text-lg font-light resize-none placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
                        />
                      </div>

                      {/* Inspiration */}
                      <div>
                        <label className="block text-sm text-white/50 mb-3 tracking-wide">
                          Inspiration <span className="text-white/20">— optional</span>
                        </label>
                        <textarea 
                          placeholder="Links to sites or products you admire..."
                          {...register('inspiration')} 
                          rows={2}
                          className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/10 text-lg font-light resize-none placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Error message */}
                {status === 'err' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white/70 text-sm mt-8"
                  >
                    {message}
                  </motion.p>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-16 pt-8 border-t border-white/10">
                  <button
                    type="button"
                    onClick={prevStep}
                    className={`
                      group flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors duration-300
                      ${currentStep === 1 ? 'invisible' : ''}
                    `}
                  >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    Back
                  </button>

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-300"
                    >
                      Continue
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  ) : (
                    <motion.button 
                      type="submit"
                      disabled={status === 'submitting'}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative flex items-center gap-3 px-10 py-4 rounded-full bg-white text-black text-sm font-medium overflow-hidden disabled:opacity-50 transition-all duration-300"
                      data-testid="booking-submit"
                    >
                      <span className="relative z-10">
                        {status === 'submitting' ? 'Sending...' : 'Submit Brief'}
                      </span>
                      {status !== 'submitting' && (
                        <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                      )}
                    </motion.button>
                  )}
                </div>
              </form>

              {/* Trust strip */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-20 pt-10 border-t border-white/5"
              >
                <div className="flex flex-wrap justify-center gap-10 md:gap-16">
                  {[
                    { value: '24h', label: 'Response' },
                    { value: '40+', label: 'Projects' },
                    { value: '100%', label: 'Ownership' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-light text-white/70 mb-1">{stat.value}</div>
                      <div className="text-xs tracking-wide uppercase text-white/30">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}