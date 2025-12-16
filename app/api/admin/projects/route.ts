import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Project from '@/lib/models/Project'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    await connectDB()
    const projects = await Project.find({}).sort({ order: 1, createdAt: -1 })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Projects fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
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
    const project = await Project.create(data)
    return NextResponse.json(project, { status: 201 })
  } catch (error: any) {
    console.error('Project create error:', error)
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Project with this slug already exists' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}
