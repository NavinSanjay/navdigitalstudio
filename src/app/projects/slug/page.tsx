import { getProjectBySlug, getProjectSlugs } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Image from 'next/image'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs().map((file) => ({
    slug: file.replace(/\.mdx$/, ''),
  }))
  return slugs
}

export default async function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)

  if (!project) return notFound()

  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto py-12">
      <h1>{project.metadata.title}</h1>
      <p>{project.metadata.excerpt}</p>
      <Image
        src={project.metadata.coverImage}
        alt={project.metadata.title}
        width={1200}
        height={600}
        className="rounded-xl"
      />
      <MDXRemote source={project.content} />
    </article>
  )
}
