import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import FAQ from '@/lib/models/FAQ'
import { getSession } from '@/lib/auth'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const { id } = await params
    const data = await req.json()
    const faq = await FAQ.findByIdAndUpdate(id, data, { new: true })
    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }
    return NextResponse.json(faq)
  } catch (error) {
    console.error('FAQ update error:', error)
    return NextResponse.json({ error: 'Failed to update FAQ' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const { id } = await params
    const faq = await FAQ.findByIdAndDelete(id)
    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('FAQ delete error:', error)
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 })
  }
}
