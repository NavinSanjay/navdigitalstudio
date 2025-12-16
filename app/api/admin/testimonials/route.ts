import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Testimonial from '@/lib/models/Testimonial'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    await connectDB()
    const testimonials = await Testimonial.find({}).sort({ order: 1, createdAt: -1 })
    return NextResponse.json(testimonials)
  } catch (error) {
    console.error('Testimonials fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 })
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
    const testimonial = await Testimonial.create(data)
    return NextResponse.json(testimonial, { status: 201 })
  } catch (error) {
    console.error('Testimonial create error:', error)
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 })
  }
}
