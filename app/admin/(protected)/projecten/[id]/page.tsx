import { notFound } from 'next/navigation'
import ProjectForm from '@/components/admin/ProjectForm'
import { getProjectById } from '@/lib/queries/projects'

interface Props {
  params: Promise<{ id: string }>
}

export default async function BewerkenProjectPage({ params }: Props) {
  const { id } = await params
  const project = await getProjectById(id)

  if (!project) notFound()

  return <ProjectForm project={project} mode="edit" />
}
