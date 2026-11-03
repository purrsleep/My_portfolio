import { useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import ProjectForm from '../../Components/ProjectForm';

export default function Edit({ project }) {
  const form = useForm({
    _method: 'put', // file uploads need POST; Laravel treats this as PUT
    title: project.title,
    category: project.category,
    description: project.description,
    tech_stack: project.tech_stack,
    project_url: project.project_url ?? '',
    repository_url: project.repository_url ?? '',
    image: null,
    date_completed: project.date_completed,
    display_order: project.display_order,
    display_order: project.display_order, role: project.role
  });

  const submit = (e) => {
    e.preventDefault();
    form.post(`/admin/projects/${project.id}`, { preserveScroll: true });
  };

  return (
    <AdminLayout title={`Edit ${project.title}`}>
      <h1 className="font-display font-bold text-3xl mb-8">Edit project</h1>
      <ProjectForm form={form} onSubmit={submit} submitLabel="Save changes" currentImageUrl={project.image_url} />
    </AdminLayout>
  );
}
