import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import ConfirmModal from '../../Components/ConfirmModal';

export default function Index({ projects, filters }) {
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [search, setSearch] = useState(filters.search ?? '');

  const runSearch = (e) => {
    e.preventDefault();
    router.get('/admin/projects', { search }, { preserveState: true, replace: true });
  };

  const confirmDelete = () => {
    if (deleting) return;
    setDeleting(true);
    router.delete(`/admin/projects/${toDelete.id}`, {
      preserveScroll: true,
      onFinish: () => { setDeleting(false); setToDelete(null); },
    });
  };

  return (
    <AdminLayout title="Projects">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display font-bold text-3xl">Projects</h1>
        <Link href="/admin/projects/create" className="rounded-full bg-cobalt text-white dark:bg-sky dark:text-night px-5 py-2 font-medium">Add project</Link>
      </div>

      <form onSubmit={runSearch} className="mt-6 flex gap-2" role="search">
        <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title"
          aria-label="Search projects by title"
          className="rounded-lg border border-ink/30 dark:border-chalk/30 bg-transparent px-4 py-2 w-full max-w-xs" />
        <button type="submit" className="rounded-full border border-ink/30 dark:border-chalk/30 px-4 py-2 font-medium">Search</button>
      </form>

      {projects.data.length === 0 ? (
        <p className="mt-10 text-ink/70 dark:text-chalk/70">No projects found. Use “Add project” to create one.</p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-sm text-ink/70 dark:text-chalk/70 border-b border-ink/15 dark:border-chalk/15">
              <tr>
                <th className="py-3 pr-4">Order</th>
                <th className="py-3 pr-4">Title</th>
                <th className="py-3 pr-4">Category</th>
                <th className="py-3 pr-4">Completed</th>
                <th className="py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.data.map((p) => (
                <tr key={p.id} className="border-b border-ink/10 dark:border-chalk/10">
                  <td className="py-3 pr-4">{p.display_order}</td>
                  <td className="py-3 pr-4 font-medium">{p.title}</td>
                  <td className="py-3 pr-4">{p.category === 'web' ? 'Website' : 'Mobile app'}</td>
                  <td className="py-3 pr-4">{p.date_completed}</td>
                  <td className="py-3 text-right space-x-4 whitespace-nowrap">
                    <Link href={`/admin/projects/${p.id}/edit`} className="underline underline-offset-4 text-cobalt dark:text-sky">Edit</Link>
                    <button type="button" onClick={() => setToDelete(p)} className="underline underline-offset-4 text-red-600 dark:text-red-400">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {projects.last_page > 1 && (
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Pagination">
          {projects.links.map((l, i) =>
            l.url ? (
              <Link key={i} href={l.url} preserveScroll
                className={`rounded-full border px-3 py-1 text-sm ${l.active ? 'bg-ink text-chalk dark:bg-chalk dark:text-ink' : 'border-ink/20 dark:border-chalk/20'}`}
                dangerouslySetInnerHTML={{ __html: l.label }} />
            ) : (
              <span key={i} className="px-3 py-1 text-sm opacity-40" dangerouslySetInnerHTML={{ __html: l.label }} />
            )
          )}
        </nav>
      )}

      <ConfirmModal
        open={!!toDelete}
        title="Delete this project?"
        message={toDelete ? `“${toDelete.title}” will be removed from your portfolio. This cannot be undone.` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </AdminLayout>
  );
}
