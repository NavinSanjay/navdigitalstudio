import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROJECTS_PATH = path.join(process.cwd(), 'content/projects')

export function getProjectSlugs() {
  return fs.readdirSync(PROJECTS_PATH).filter((file) => file.endsWith('.mdx'))
}

export function getProjectBySlug(slug: string) {
  const fullPath = path.join(PROJECTS_PATH, `${slug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    metadata: data,
    content,
  }
}
