import TestimonialForm from '@/components/admin/TestimonialForm'
import { getAllProjectsAdmin } from '@/lib/queries/projects'

export default async function NieuweTestimonialPage() {
  const projects = await getAllProjectsAdmin()
  const projectOptions = projects.map((p) => ({ id: p.id, title: p.title }))
  return <TestimonialForm mode="create" projects={projectOptions} />
}
