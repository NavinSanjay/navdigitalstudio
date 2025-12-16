import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Project from '@/lib/models/Project'
import Testimonial from '@/lib/models/Testimonial'
import FAQ from '@/lib/models/FAQ'
import { getSession } from '@/lib/auth'

const initialProjects = [
  {
    slug: 'the-paddle-collective',
    title: 'The Paddle Collective',
    client: 'The Paddle Collective',
    year: 2025,
    role: 'Brand • Web • Product',
    scope: ['Brand Identity', 'Website Design', 'Product Strategy'],
    stack: ['Next.js', 'Tailwind', 'PWA', 'Stripe'],
    summary: 'Premium indoor pickleball brand seeking cohesive digital presence that signals exclusivity and drives membership.',
    problem: {
      context: 'The Paddle Collective needed to establish itself as the premium indoor pickleball destination. The existing digital presence failed to convey the country-club-meets-industrial aesthetic that defined their physical space.',
      constraints: ['Tight launch timeline before membership drive', 'Complex booking system integration required', 'Brand positioning must justify premium pricing']
    },
    approach: {
      strategy: 'Built a system that communicates exclusivity through restraint. Clean typography, generous whitespace, and purposeful motion create an experience that feels curated rather than marketed.',
      key_decisions: ['On-site booking concept integrated directly', 'Video-first hero to showcase space quality', 'Membership tier system with clear value signals']
    },
    outcome: {
      results: ['Investor-ready digital presence', 'Strong early membership traction', 'Cohesive brand system across touchpoints'],
      metrics: [{ label: 'Time to launch', value: '4 weeks' }, { label: 'Membership inquiries', value: '+340%' }]
    },
    media: [{ type: 'image', src: '/images/tpc-cover.jpg', alt: 'The Paddle Collective', caption: 'Homepage hero' }],
    cta: { label: 'Visit site', href: '#' },
    featured: true,
    order: 1
  },
  {
    slug: 'magnolia-and-soul',
    title: 'Magnolia & Soul',
    client: 'Magnolia & Soul',
    year: 2024,
    role: 'Design • Build • E-commerce',
    scope: ['E-commerce Design', 'Brand Refinement', 'Conversion Optimization'],
    stack: ['Next.js', 'Tailwind', 'Stripe', 'Sanity'],
    summary: 'Tea brand needed a high-taste storefront that converts browsers into buyers through ritual and narrative.',
    problem: {
      context: 'Magnolia & Soul had exceptional product but a digital experience that undersold it. The existing site felt generic, failing to communicate the craft and ritual that defined the brand.',
      constraints: ['Maintain existing brand colors', 'Mobile-first audience', 'Complex product variants']
    },
    approach: {
      strategy: 'One-page ritual flow that guides visitors through the brand story before presenting products. Every interaction reinforces the idea of tea as ceremony, not commodity.',
      key_decisions: ['Scroll-driven narrative before commerce', 'Elegant motion on product reveals', 'Simplified checkout with guided cart']
    },
    outcome: {
      results: ['Increased time on page', 'Higher conversion rate', 'Streamlined product narrative'],
      metrics: [{ label: 'Time on site', value: '+65%' }, { label: 'Conversion', value: '+28%' }]
    },
    media: [{ type: 'image', src: '/images/magnolia-cover.jpg', alt: 'Magnolia & Soul', caption: 'Product showcase' }],
    cta: { label: 'Visit site', href: '#' },
    featured: true,
    order: 2
  },
  {
    slug: 'poket-pro',
    title: 'Poket Pro',
    client: 'Poket Pro',
    year: 2024,
    role: 'Prototype • UX • Computer Vision',
    scope: ['Product Design', 'Technical Prototype', 'User Research'],
    stack: ['Next.js', 'Python', 'OpenCV', 'TensorFlow'],
    summary: 'Golfers needed simple, immediate swing feedback without expensive equipment or coaching.',
    problem: {
      context: 'Amateur golfers struggle to improve without real-time feedback. Existing solutions require expensive hardware or ongoing coaching relationships that most casual players cannot access.',
      constraints: ['Must work with standard smartphone cameras', 'Analysis needs to be instant', 'Interface for non-technical users']
    },
    approach: {
      strategy: 'Camera-first interface that captures and analyzes swings using lightweight computer vision. Focus on actionable feedback rather than overwhelming data.',
      key_decisions: ['Prioritize speed over depth of analysis', 'Simple overlay showing key positions', 'Progress tracking without complexity']
    },
    outcome: {
      results: ['Clear path to MVP', 'Validated user flows', 'Technical feasibility proven'],
      metrics: [{ label: 'User tests', value: '24' }, { label: 'Analysis time', value: '<2s' }]
    },
    media: [{ type: 'image', src: '/images/poket-cover.jpg', alt: 'Poket Pro', caption: 'Analysis interface' }],
    cta: { label: 'View prototype', href: '#' },
    featured: true,
    order: 3
  },
  {
    slug: 'maraschino-publicity',
    title: 'Maraschino Publicity',
    client: 'Maraschino Publicity',
    year: 2024,
    role: 'Brand • Web • Strategy',
    scope: ['Brand Identity', 'Website Design', 'Content Strategy'],
    stack: ['Next.js', 'Tailwind', 'Motion'],
    summary: 'Boutique PR firm needed a digital presence that matched their high-profile client roster.',
    problem: {
      context: 'Maraschino Publicity works with notable clients but their website failed to reflect their caliber. The existing presence was dated and did not communicate the sophistication their work demands.',
      constraints: ['Client confidentiality limits case study depth', 'Must appeal to both talent and brands', 'Professional but not corporate']
    },
    approach: {
      strategy: 'Built an editorial-style site that lets the work speak through implication rather than explicit case studies. Sophisticated typography and restrained motion create authority.',
      key_decisions: ['Logo wall over detailed case studies', 'Contact-first navigation', 'Quarterly content updates built-in']
    },
    outcome: {
      results: ['Elevated brand perception', 'Increased inbound inquiries', 'Streamlined client qualification'],
      metrics: [{ label: 'Inbound leads', value: '+85%' }, { label: 'Time to qualify', value: '-40%' }]
    },
    media: [{ type: 'image', src: '/images/abstract.jpg', alt: 'Maraschino Publicity', caption: 'Brand identity' }],
    cta: { label: 'Visit site', href: '#' },
    featured: true,
    order: 4
  }
]

const initialTestimonials = [
  {
    quote: 'The craft and clarity were next-level. They understood our vision immediately and executed with precision.',
    name: 'Sarah Chen',
    role: 'Founder',
    company: 'The Paddle Collective',
    projectSlug: 'the-paddle-collective',
    featured: true,
    order: 1
  },
  {
    quote: 'They shipped fast and smart—transformed our online presence in weeks, not months.',
    name: 'Marcus Reid',
    role: 'Director',
    company: 'Magnolia & Soul',
    projectSlug: 'magnolia-and-soul',
    featured: true,
    order: 2
  },
  {
    quote: 'High-taste, no fluff. The technical depth matched the design quality. Rare combination.',
    name: 'Elena Voss',
    role: 'COO',
    company: 'Poket Pro',
    projectSlug: 'poket-pro',
    featured: true,
    order: 3
  }
]

const initialFAQs = [
  {
    question: 'What is your typical timeline?',
    answer: '2-6 weeks for most builds. Larger systems with complex integrations run 6-10+ weeks. We scope carefully upfront so timelines are predictable.',
    category: 'Process',
    order: 1
  },
  {
    question: 'How do we start?',
    answer: 'Book a discovery call or submit the brief form. We will review within 24 hours, then shape scope, timeline, and budget together before any commitment.',
    category: 'Process',
    order: 2
  },
  {
    question: 'Who owns the code?',
    answer: 'You own the code and all assets upon final payment. We retain a small portfolio credit link. Full source code handover included.',
    category: 'Legal',
    order: 3
  },
  {
    question: 'Do you offer maintenance?',
    answer: 'Yes. Retainer packages available for ongoing updates, hosting management, and technical support. Discussed after initial build.',
    category: 'Services',
    order: 4
  },
  {
    question: 'What if we need changes after launch?',
    answer: 'Post-launch revisions are scoped separately. Minor tweaks often included in buffer time. Larger changes quoted fairly based on scope.',
    category: 'Process',
    order: 5
  }
]

export async function POST() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()

    // Clear existing data
    await Project.deleteMany({})
    await Testimonial.deleteMany({})
    await FAQ.deleteMany({})

    // Insert seed data
    await Project.insertMany(initialProjects)
    await Testimonial.insertMany(initialTestimonials)
    await FAQ.insertMany(initialFAQs)

    return NextResponse.json({ 
      success: true, 
      counts: {
        projects: initialProjects.length,
        testimonials: initialTestimonials.length,
        faqs: initialFAQs.length
      }
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 })
  }
}
