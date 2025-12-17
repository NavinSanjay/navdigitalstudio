import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { allow } from '@/lib/ratelimit'
import { Resend } from 'resend'

const Schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  website: z.string().optional(),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  goals: z.string().min(1),
  issues: z.string().optional(),
  inspiration: z.string().optional(),
  confirmEmail: z.string().optional()
})

const resend = new Resend(process.env.RESEND_API_KEY || '')

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'local'
  if (!allow(ip, 5, 60000)) {
    return NextResponse.json({ error: 'Rate limit' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const parsed = Schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const data = parsed.data

  if (data.confirmEmail && data.confirmEmail.trim().length > 0) {
    return NextResponse.json({ ok: true })
  }

  const to = process.env.EMAIL_TO || 'bynavdigitalstudio@gmail.com'
  const from = process.env.EMAIL_FROM || 'bynavdigitalstudio@gmail.com'
  const subject = `New lead — ${data.name}`
  const text = `Lead
Name: ${data.name}
Email: ${data.email}
Company: ${data.company || ''}
Website: ${data.website || ''}
Budget: ${data.budget}
Timeline: ${data.timeline}
Goals: ${data.goals}
Issues: ${data.issues || ''}
Inspiration: ${data.inspiration || ''}`

  try {
    if (process.env.RESEND_API_KEY) {
      const result = await resend.emails.send({
        to,
        from,
        subject,
        text,
        replyTo: data.email // <- correct key
      })
      console.log('[lead email sent]', result)
    } else {
      console.log('[lead email simulated]', { to, from, subject, text })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Email error', e)
    return NextResponse.json(
      { error: 'Email failed, please try again later.' },
      { status: 500 }
    )
  }
}
