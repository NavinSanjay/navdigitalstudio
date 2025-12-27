// app/api/book/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { allow } from '@/lib/ratelimit'

const Schema = z.object({
  day: z.string().min(3),
  time: z.string().min(3),
  projectType: z.string().optional(),   // optional in booking
  brandingPr: z.string().optional(),    // optional in booking
})

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || 'local'
  if (!allow(ip, 10, 60_000)) {
    return NextResponse.json({ error: 'Rate limit' }, { status: 429 })
  }

  const body = await req.json().catch(() => null)
  const parsed = Schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const { day, time, projectType, brandingPr } = parsed.data

  const resendApiKey = process.env.RESEND_API_KEY
  const to = process.env.EMAIL_TO || 'bynavdigitalstudio@gmail.com'
  const from =
    process.env.EMAIL_FROM || 'Nav Digital Studio <hello@navdigital.studio>'

  const subject = `Booking request: ${day} at ${time}`

  const textLines = [
    `A visitor picked a time: ${day} at ${time} (timezone Pacific/Auckland).`,
    '',
    projectType ? `Project type: ${projectType}` : '',
    brandingPr ? `Branding & publicity: ${brandingPr}` : '',
    '',
    'Please reply to confirm and send a calendar invite.',
  ].filter(Boolean)

  const text = textLines.join('\n')

  if (!resendApiKey) {
    console.log('[booking email simulated]', { to, from, subject, text })
    return NextResponse.json({ ok: true })
  }

  const resend = new Resend(resendApiKey)

  try {
    await resend.emails.send({ to, from, subject, text })
  } catch (e) {
    console.error('Email error (booking)', e)
    // still return ok so the user doesn’t see an error screen
  }

  return NextResponse.json({ ok: true })
}
