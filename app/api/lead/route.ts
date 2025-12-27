// app/api/lead/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { allow } from '@/lib/ratelimit'
import { Resend } from 'resend'

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  website: z.string().optional(),
  projectType: z.string().min(1),          // NEW
  brandingPr: z.string().min(1),           // NEW: e.g. "Yes", "No", "Not sure"
  budget: z.string().min(1),
  timeline: z.string().min(1),
  goals: z.string().min(1),
  issues: z.string().optional(),
  inspiration: z.string().optional(),
  confirmEmail: z.string().optional(),
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'local'
  if (!allow(ip, 5, 60_000)) {
    return NextResponse.json({ error: 'Rate limit' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const parsed = Schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const data = parsed.data

  // Honeypot – if filled, silently succeed
  if (data.confirmEmail && data.confirmEmail.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const toStudio = process.env.EMAIL_TO || 'bynavdigitalstudio@gmail.com'
  const fromStudio =
    process.env.EMAIL_FROM || 'Nav Digital Studio <hello@navdigital.studio>'

  if (!resendApiKey) {
    console.log('[lead email simulated]', {
      to: toStudio,
      from: fromStudio,
      name: data.name,
      email: data.email,
      projectType: data.projectType,
      brandingPr: data.brandingPr,
    })
    return NextResponse.json({ ok: true })
  }

  const resend = new Resend(resendApiKey)

  const studioSubject = `New lead — ${data.name}`

  const studioText = `Lead
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || ''}
Website: ${data.website || ''}

Project type: ${data.projectType}
Branding & publicity: ${data.brandingPr}

Budget: ${data.budget}
Timeline: ${data.timeline}

Goals:
${data.goals}

Issues:
${data.issues || ''}

Inspiration:
${data.inspiration || ''}`

  const userSubject = 'We’ve received your project brief'
  const userHtml = `
    <p>Hi ${data.name},</p>
    <p>Thanks for sharing your project brief with <strong>Nav Digital Studio</strong> — it’s now safely in the queue.</p>
    <p>We’ll review the details (including your project type and whether you’re interested in branding & publicity support) and get back to you within 1–2 business days with next steps and a proposed time to chat.</p>
    <p>If you need to add anything in the meantime, just reply to this email and it will be included in the review.</p>
    <p>Talk soon,<br/>Navin<br/>Nav Digital Studio</p>
  `

  try {
    // 1) Email to studio
    await resend.emails.send({
      to: toStudio,
      from: fromStudio,
      subject: studioSubject,
      text: studioText,
      replyTo: data.email,
    })

    // 2) Confirmation email to user
    await resend.emails.send({
      to: data.email,
      from: fromStudio,
      subject: userSubject,
      html: userHtml,
      replyTo: toStudio,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Email error (lead + confirmation)', e)
    return NextResponse.json(
      { error: 'Email failed, please try again later.' },
      { status: 500 }
    )
  }
}
