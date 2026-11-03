import { Link } from '@inertiajs/react';
import Card from './Card';

export default function ProjectCard({ project, canManage = false, onDelete }) {
  return (
    <Card className="flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-cobalt to-ink">
        {project.image_url && (
          <img src={project.image_url} alt={`Screenshot of ${project.title}`}
            className="absolute inset-0 w-full h-full object-contain" />
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-xl">{project.title}</h3>
        <p className="mt-3 text-ink/75 dark:text-chalk/75 leading-relaxed">{project.description}</p>
        <p className="mt-4 text-sm font-medium">{project.tech_stack}</p>

        <div className="mt-auto pt-5 flex flex-wrap items-center gap-5">
          {project.project_url && (
            <a href={project.project_url} target="_blank" rel="noopener noreferrer"
              className="font-medium text-cobalt dark:text-sky underline underline-offset-4">View project</a>
          )}
          {project.repository_url && (
            <a href={project.repository_url} target="_blank" rel="noopener noreferrer"
              className="font-medium text-cobalt dark:text-sky underline underline-offset-4">Source code</a>
          )}

          {canManage && (
            <span className="ml-auto flex gap-2 text-sm font-medium">
              <Link href={`/admin/projects/${project.id}/edit`}
                className="rounded-full border border-ink/30 dark:border-chalk/30 px-4 py-1.5 hover:bg-ink/5 dark:hover:bg-chalk/10">
                Edit
              </Link>
              <button type="button" onClick={() => onDelete(project)}
                className="rounded-full border border-red-500 text-red-600 dark:text-red-400 px-4 py-1.5 hover:bg-red-500/10">
                Delete
              </button>
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
