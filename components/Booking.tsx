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
  projectType: z.string().min(1),
  brandingPr: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  goals: z.string().min(1),
  issues: z.string().optional(),
  inspiration: z.string().optional(),
  confirmEmail: z.string().optional(),
})
type Lead = z.infer<typeof LeadSchema>

const budgetRanges = [
  { value: 'NZD 1.5k–4k', label: 'Starter Site', price: '1.5k–4k' },
  { value: 'NZD 4k–10k', label: 'Growth Site', price: '4k–10k' },
  { value: 'NZD 10k–25k+', label: 'Systems & AI', price: '10k–25k+' },
  { value: 'NZD 18k–40k+', label: 'Brand, Site & Launch', price: '18k–40k+' },
]

const timelineOptions = [
  { value: 'ASAP', label: 'Immediate', desc: 'Kick off within 2 weeks' },
  { value: '1 month', label: '1 Month', desc: 'Standard delivery' },
  { value: '2-3 months', label: '2–3 Months', desc: 'More complex scope' },
  { value: 'Flexible', label: 'Flexible', desc: 'No fixed deadline' },
]

const projectTypeOptions = [
  {
    value: 'Website / marketing site',
    label: 'Website / marketing site',
    desc: 'New site or rebuild focused on marketing and conversion',
  },
  {
    value: 'Systems & AI / internal tools',
    label: 'Systems & AI / internal tools',
    desc: 'Dashboards, assistants, or workflow tools on your data',
  },
  {
    value: 'Brand, Site & Launch',
    label: 'Brand, Site & Launch',
    desc: 'Full brand, site, and launch with Maraschino Publicity',
  },
  {
    value: 'Not sure yet',
    label: 'Not sure yet',
    desc: 'Need help working out the right shape',
  },
]

const brandingPrOptions = [
  {
    value: 'Yes',
    label: 'Yes',
    desc: 'We want brand and/or publicity support as part of this',
  },
  {
    value: 'No',
    label: 'No',
    desc: 'Digital only is fine for now',
  },
  {
    value: 'Not sure',
    label: 'Not sure',
    desc: 'Open to it if it makes sense',
  },
]

const steps = [
  { id: 1, title: 'Project Scope', desc: 'Type, investment, timeline' },
  { id: 2, title: 'Contact', desc: 'Your details' },
  { id: 3, title: 'Vision', desc: 'Project goals' },
]

function GridPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

export function Booking() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<Lead>()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'err'>(
    'idle'
  )
  const [message, setMessage] = useState<string>('')
  const [currentStep, setCurrentStep] = useState(1)
  const formRef = useRef<HTMLFormElement>(null)

  const selectedBudget = watch('budget')
  const selectedTimeline = watch('timeline')
  const selectedProjectType = watch('projectType')
  const selectedBrandingPr = watch('brandingPr')

  const onSubmit = async (data: Lead) => {
    setStatus('submitting')
    track('lead_form_submitted')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setStatus('ok')
        setMessage(
          "Thanks for the brief. You'll get a response within 24 hours with next steps and a rough fit check."
        )
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
    if (currentStep === 1)
      fieldsToValidate = ['projectType', 'brandingPr', 'budget', 'timeline']
    if (currentStep === 2) fieldsToValidate = ['name', 'email']
    if (currentStep === 3) fieldsToValidate = ['goals']

    const isValid = await trigger(fieldsToValidate)
    if (isValid && currentStep < 3) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <section
      id="booking"
      className="relative min-h-screen bg-black py-20 md:py-32 overflow-hidden"
    >
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
          <p className="text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
            Start Your Project
          </p>
          <h2 className="text-5xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Tell me about your
            <br />
            <span className="text-white/40">
              site, system, or launch.
            </span>
          </h2>
          <p className="text-sm text-white/40 max-w-xl mx-auto">
            Web, data, AI, and brand/publicity all run through the same brief. A
            short outline is enough to work out if it’s a good fit and where it
            sits in the pricing ranges.
          </p>
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
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-24 h-24 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-10"
              >
                <Check size={40} strokeWidth={1} className="text-white" />
              </motion.div>
              <h3 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
                Brief received.
              </h3>
              <p className="text-white/50 text-lg mb-10 leading-relaxed">
                {message}
              </p>
              <button
                onClick={() => {
                  setStatus('idle')
                  setCurrentStep(1)
                }}
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
                            ${
                              currentStep >= step.id
                                ? 'border-white bg-white text-black'
                                : 'border-white/20 text-white/40'
                            }
                          `}
                        >
                          {currentStep > step.id ? (
                            <Check size={16} />
                          ) : (
                            step.id
                          )}
                        </div>
                        <p
                          className={`mt-3 text-xs tracking-wide transition-colors duration-300 hidden sm:block ${
                            currentStep >= step.id
                              ? 'text-white'
                              : 'text-white/30'
                          }`}
                        >
                          {step.title}
                        </p>
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-16 sm:w-24 md:w-32 h-px mx-4 relative overflow-hidden">
                          <div className="absolute inset-0 bg-white/10" />
                          <motion.div
                            className="absolute inset-0 bg-white origin-left"
                            initial={{ scaleX: 0 }}
                            animate={{
                              scaleX: currentStep > step.id ? 1 : 0,
                            }}
                            transition={{
                              duration: 0.5,
                              ease: [0.16, 1, 0.3, 1],
                            }}
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
                  {/* Step 1: Project type, branding/PR, budget, timeline */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      custom={1}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="space-y-14"
                    >
                      {/* Project type */}
                      <div>
                        <label className="block text-sm text-white/50 mb-6 tracking-wide">
                          What kind of project is this?
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {projectTypeOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                setValue('projectType', opt.value, {
                                  shouldValidate: true,
                                })
                              }
                              className={`
                                group relative p-6 rounded-2xl border text-left transition-all duration-500
                                ${
                                  selectedProjectType === opt.value
                                    ? 'bg-white border-white'
                                    : 'bg-transparent border-white/10 hover:border-white/30'
                                }
                              `}
                            >
                              <span
                                className={`block text-base font-medium mb-1 transition-colors duration-300 ${
                                  selectedProjectType === opt.value
                                    ? 'text-black'
                                    : 'text-white'
                                }`}
                              >
                                {opt.label}
                              </span>
                              <span
                                className={`block text-xs transition-colors duration-300 ${
                                  selectedProjectType === opt.value
                                    ? 'text-black/60'
                                    : 'text-white/40'
                                }`}
                              >
                                {opt.desc}
                              </span>
                              {selectedProjectType === opt.value && (
                                <motion.div
                                  layoutId="projectType-check"
                                  className="absolute top-4 right-4 w-5 h-5 rounded-full bg-black flex items-center justify-center"
                                >
                                  <Check
                                    size={12}
                                    className="text-white"
                                  />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                        <input
                          type="hidden"
                          {...register('projectType', { required: true })}
                        />
                        {errors.projectType && (
                          <p className="text-white/60 text-sm mt-4">
                            Please choose a project type
                          </p>
                        )}
                      </div>

                      {/* Branding & PR */}
                      <div>
                        <label className="block text-sm text-white/50 mb-6 tracking-wide">
                          Do you want branding & publicity involved?
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {brandingPrOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                setValue('brandingPr', opt.value, {
                                  shouldValidate: true,
                                })
                              }
                              className={`
                                group relative p-6 rounded-2xl border text-left transition-all duration-500
                                ${
                                  selectedBrandingPr === opt.value
                                    ? 'bg-white border-white'
                                    : 'bg-transparent border-white/10 hover:border-white/30'
                                }
                              `}
                            >
                              <span
                                className={`block text-base font-medium mb-1 transition-colors duration-300 ${
                                  selectedBrandingPr === opt.value
                                    ? 'text-black'
                                    : 'text-white'
                                }`}
                              >
                                {opt.label}
                              </span>
                              <span
                                className={`block text-xs transition-colors duration-300 ${
                                  selectedBrandingPr === opt.value
                                    ? 'text-black/60'
                                    : 'text-white/40'
                                }`}
                              >
                                {opt.desc}
                              </span>
                              {selectedBrandingPr === opt.value && (
                                <motion.div
                                  layoutId="brandingPr-check"
                                  className="absolute top-4 right-4 w-5 h-5 rounded-full bg-black flex items-center justify-center"
                                >
                                  <Check
                                    size={12}
                                    className="text-white"
                                  />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                        <input
                          type="hidden"
                          {...register('brandingPr', { required: true })}
                        />
                        {errors.brandingPr && (
                          <p className="text-white/60 text-sm mt-4">
                            Please let me know if branding & publicity is in or out
                          </p>
                        )}
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-sm text-white/50 mb-6 tracking-wide">
                          Investment range
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {budgetRanges.map((range) => (
                            <button
                              key={range.value}
                              type="button"
                              onClick={() =>
                                setValue('budget', range.value, {
                                  shouldValidate: true,
                                })
                              }
                              className={`
                                group relative p-6 rounded-2xl border text-left transition-all duration-500
                                ${
                                  selectedBudget === range.value
                                    ? 'bg-white border-white'
                                    : 'bg-transparent border-white/10 hover:border-white/30'
                                }
                              `}
                            >
                              <span
                                className={`block text-2xl font-light mb-2 transition-colors duration-300 ${
                                  selectedBudget === range.value
                                    ? 'text-black'
                                    : 'text-white'
                                }`}
                              >
                                {range.price}
                              </span>
                              <span
                                className={`block text-xs tracking-wide uppercase transition-colors duration-300 ${
                                  selectedBudget === range.value
                                    ? 'text-black/60'
                                    : 'text-white/40'
                                }`}
                              >
                                {range.label}
                              </span>
                              {selectedBudget === range.value && (
                                <motion.div
                                  layoutId="budget-check"
                                  className="absolute top-4 right-4 w-5 h-5 rounded-full bg-black flex items-center justify-center"
                                >
                                  <Check
                                    size={12}
                                    className="text-white"
                                  />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                        <input
                          type="hidden"
                          {...register('budget', { required: true })}
                        />
                        {errors.budget && (
                          <p className="text-white/60 text-sm mt-4">
                            Please select an investment range
                          </p>
                        )}
                      </div>

                      {/* Timeline */}
                      <div>
                        <label className="block text-sm text-white/50 mb-6 tracking-wide">
                          Timeline
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {timelineOptions.map((opt) => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() =>
                                setValue('timeline', opt.value, {
                                  shouldValidate: true,
                                })
                              }
                              className={`
                                group relative p-6 rounded-2xl border text-left transition-all duration-500
                                ${
                                  selectedTimeline === opt.value
                                    ? 'bg-white border-white'
                                    : 'bg-transparent border-white/10 hover:border-white/30'
                                }
                              `}
                            >
                              <span
                                className={`block text-lg font-light mb-1 transition-colors duration-300 ${
                                  selectedTimeline === opt.value
                                    ? 'text-black'
                                    : 'text-white'
                                }`}
                              >
                                {opt.label}
                              </span>
                              <span
                                className={`block text-xs transition-colors duration-300 ${
                                  selectedTimeline === opt.value
                                    ? 'text-black/50'
                                    : 'text-white/30'
                                }`}
                              >
                                {opt.desc}
                              </span>
                              {selectedTimeline === opt.value && (
                                <motion.div
                                  layoutId="timeline-check"
                                  className="absolute top-4 right-4 w-5 h-5 rounded-full bg-black flex items-center justify-center"
                                >
                                  <Check
                                    size={12}
                                    className="text-white"
                                  />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                        <input
                          type="hidden"
                          {...register('timeline', { required: true })}
                        />
                        {errors.timeline && (
                          <p className="text-white/60 text-sm mt-4">
                            Please select a timeline
                          </p>
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
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="space-y-10"
                    >
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Name */}
                        <div className="group">
                          <label className="block text-sm text-white/50 mb-3 tracking-wide">
                            Name
                          </label>
                          <input
                            placeholder="Your full name"
                            {...register('name', { required: true })}
                            className={`
                              w-full px-0 py-4 bg-transparent border-0 border-b-2 text-xl font-light
                              placeholder:text-white/20 focus:outline-none transition-all duration-300
                              ${
                                errors.name
                                  ? 'border-white/60'
                                  : 'border-white/10 focus:border-white/50'
                              }
                            `}
                            data-testid="booking-name"
                          />
                          {errors.name && (
                            <p className="text-white/50 text-sm mt-2">
                              Please enter your name
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="group">
                          <label className="block text-sm text-white/50 mb-3 tracking-wide">
                            Email
                          </label>
                          <input
                            type="email"
                            placeholder="you@company.com"
                            {...register('email', { required: true })}
                            className={`
                              w-full px-0 py-4 bg-transparent border-0 border-b-2 text-xl font-light
                              placeholder:text-white/20 focus:outline-none transition-all duration-300
                              ${
                                errors.email
                                  ? 'border-white/60'
                                  : 'border-white/10 focus:border-white/50'
                              }
                            `}
                            data-testid="booking-email"
                          />
                          {errors.email && (
                            <p className="text-white/50 text-sm mt-2">
                              Please enter a valid email
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Company */}
                        <div className="group">
                          <label className="block text-sm text-white/50 mb-3 tracking-wide">
                            Company{' '}
                            <span className="text-white/20">— optional</span>
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
                            Current website{' '}
                            <span className="text-white/20">— optional</span>
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
                      transition={{
                        duration: 0.4,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="space-y-10"
                    >
                      {/* Goals */}
                      <div>
                        <label className="block text-sm text-white/50 mb-3 tracking-wide">
                          What are you looking to build?
                        </label>
                        <textarea
                          placeholder="For example: a new marketing site, an internal dashboard on existing data, an AI assistant for your team, or a full brand + launch package..."
                          {...register('goals', { required: true })}
                          rows={5}
                          className={`
                            w-full px-0 py-4 bg-transparent border-0 border-b-2 text-lg font-light resize-none
                            placeholder:text-white/20 focus:outline-none transition-all duration-300
                            ${
                              errors.goals
                                ? 'border-white/60'
                                : 'border-white/10 focus:border-white/50'
                            }
                          `}
                          data-testid="booking-goals"
                        />
                        {errors.goals && (
                          <p className="text-white/50 text-sm mt-2">
                            Please describe your project
                          </p>
                        )}
                      </div>

                      {/* Challenges */}
                      <div>
                        <label className="block text-sm text-white/50 mb-3 tracking-wide">
                          Current challenges{' '}
                          <span className="text-white/20">— optional</span>
                        </label>
                        <textarea
                          placeholder="What’s not working with your current site, tools, reporting, or brand presence?"
                          {...register('issues')}
                          rows={3}
                          className="w-full px-0 py-4 bg-transparent border-0 border-b-2 border-white/10 text-lg font-light resize-none placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-all duration-300"
                        />
                      </div>

                      {/* Inspiration */}
                      <div>
                        <label className="block text-sm text-white/50 mb-3 tracking-wide">
                          Inspiration{' '}
                          <span className="text-white/20">— optional</span>
                        </label>
                        <textarea
                          placeholder="Links to sites, dashboards, products, or launches you admire..."
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
                    <ArrowLeft
                      size={16}
                      className="group-hover:-translate-x-1 transition-transform duration-300"
                    />
                    Back
                  </button>

                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-300"
                    >
                      Continue
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      />
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
                        {status === 'submitting' ? 'Sending...' : 'Submit brief'}
                      </span>
                      {status !== 'submitting' && (
                        <ArrowRight
                          size={16}
                          className="relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                        />
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
                    { value: '3–5', label: 'Recent web builds' },
                    { value: '100%', label: 'Code & IP ownership' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-light text-white/70 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs tracking-wide uppercase text-white/30">
                        {stat.label}
                      </div>
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
