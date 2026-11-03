import { useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import ProjectForm from '../../Components/ProjectForm';

export default function Create() {
  const form = useForm({
    title: '', category: 'web', description: '', tech_stack: '',
    project_url: '', repository_url: '', image: null,
    date_completed: '', display_order: 0,
  });

  const submit = (e) => {
    e.preventDefault();
    form.post('/admin/projects', { preserveScroll: true });
  };

  return (
    <AdminLayout title="New project">
      <h1 className="font-display font-bold text-3xl mb-8">New project</h1>
      <ProjectForm form={form} onSubmit={submit} submitLabel="Create project" />
    </AdminLayout>
  );
}
