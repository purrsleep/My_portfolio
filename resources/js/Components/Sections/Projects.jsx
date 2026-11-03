import { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import SectionTitle from '../SectionTitle';
import ProjectCard from '../ProjectCard';
import ConfirmModal from '../ConfirmModal';

const filters = [['all', 'All'], ['web', 'Websites'], ['mobile', 'Mobile Apps']];
const active = 'bg-ink text-chalk dark:bg-chalk dark:text-ink';

export default function Projects({ projects, canManage }) {
  const [filter, setFilter] = useState('all');
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const shown = projects.filter((p) => filter === 'all' || p.category === filter);

  const confirmDelete = () => {
    if (deleting) return;
    setDeleting(true);
    router.delete(`/admin/projects/${toDelete.id}`, {
      preserveScroll: true,
      onFinish: () => { setDeleting(false); setToDelete(null); },
    });
  };

  return (
    <section id="projects" className="border-t border-ink/10 dark:border-chalk/10">
      <div className="max-w-5xl mx-auto px-5 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle>Projects</SectionTitle>
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
            <div className="flex gap-2" role="group" aria-label="Filter projects">
              {filters.map(([value, label]) => (
                <button key={value} type="button" aria-pressed={filter === value} onClick={() => setFilter(value)}
                  className={`rounded-full px-4 py-2 border border-ink/20 dark:border-chalk/20 ${filter === value ? active : ''}`}>
                  {label}
                </button>
              ))}
            </div>
            {canManage && (
              <>
                <Link href="/admin/projects/create"
                  className="rounded-full bg-cobalt text-white dark:bg-sky dark:text-night px-4 py-2 hover:opacity-90">
                  Add project
                </Link>
                <Link href="/admin/projects" className="underline underline-offset-4 px-2 py-2">Manage all</Link>
              </>
            )}
          </div>
        </div>

        {shown.length === 0 ? (
          <p className="mt-10 text-ink/70 dark:text-chalk/70">
            No projects here yet.{canManage && ' Use “Add project” to create one.'}
          </p>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 gap-6">
            {shown.map((p) => (
              <ProjectCard key={p.id} project={p} canManage={canManage} onDelete={setToDelete} />
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        open={!!toDelete}
        title="Delete this project?"
        message={toDelete ? `“${toDelete.title}” will be removed from your portfolio. This cannot be undone.` : ''}
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </section>
  );
}
