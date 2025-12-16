import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import FAQ from '@/lib/models/FAQ'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    await connectDB()
    const faqs = await FAQ.find({}).sort({ order: 1, createdAt: -1 })
    return NextResponse.json(faqs)
  } catch (error) {
    console.error('FAQs fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const data = await req.json()
    const faq = await FAQ.create(data)
    return NextResponse.json(faq, { status: 201 })
  } catch (error) {
    console.error('FAQ create error:', error)
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 })
  }
}
