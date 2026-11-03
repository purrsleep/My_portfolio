import { Link } from '@inertiajs/react';
import FormField, { inputClass } from './FormField';

// Shared by Create and Edit. `form` is the object returned by Inertia's useForm().
export default function ProjectForm({ form, onSubmit, submitLabel, currentImageUrl }) {
  const { data, setData, errors, processing } = form;
  const bind = (name) => ({
    id: name,
    name,
    value: data[name] ?? '',
    onChange: (e) => setData(name, e.target.value),
    className: inputClass(errors[name]),
    'aria-invalid': !!errors[name],
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6 max-w-2xl">
      {Object.keys(errors).length > 0 && (
        <div role="alert" className="rounded-lg border border-red-500 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
          <p className="font-medium">Please fix the following:</p>
          <ul className="list-disc pl-5 mt-1">
            {Object.values(errors).map((msg, i) => <li key={i}>{msg}</li>)}
          </ul>
        </div>
      )}

      <FormField id="title" label="Title" error={errors.title}>
        <input type="text" {...bind('title')} />
      </FormField>

      <FormField id="category" label="Category" error={errors.category}>
        <select {...bind('category')} className={`${inputClass(errors.category)} dark:bg-night`}>
          <option value="web">Website</option>
          <option value="mobile">Mobile app</option>
        </select>
      </FormField>

      <FormField id="description" label="Description" error={errors.description} hint="20 to 500 characters.">
        <textarea rows="4" {...bind('description')} />
      </FormField>

      <FormField id="tech_stack" label="Tech stack" error={errors.tech_stack} hint="Separate with commas, e.g. HTML, CSS, JavaScript.">
        <input type="text" {...bind('tech_stack')} />
      </FormField>

      <div className="grid sm:grid-cols-2 gap-6">
        <FormField id="project_url" label="Project URL (optional)" error={errors.project_url}>
          <input type="text" inputMode="url" placeholder="https://" {...bind('project_url')} />
        </FormField>
        <FormField id="repository_url" label="Repository URL (optional)" error={errors.repository_url}>
          <input type="text" inputMode="url" placeholder="https://github.com/" {...bind('repository_url')} />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <FormField id="date_completed" label="Date completed" error={errors.date_completed}>
          <input type="date" {...bind('date_completed')} />
        </FormField>
        <FormField id="display_order" label="Display order" error={errors.display_order} hint="Lower numbers appear first.">
          <input type="number" min="0" max="999" {...bind('display_order')} />
        </FormField>
      </div>
      <FormField id="role" label="My role" error={errors.role} hint="2 to 50 characters.">
        <input type="text" {...bind('role')} />
      </FormField>

      <FormField id="image" label="Screenshot (optional)" error={errors.image} hint="JPG, PNG or WEBP, up to 2 MB.">
        {currentImageUrl && !data.image && (
          <img src={currentImageUrl} alt="Current screenshot" className="mb-3 h-28 rounded-lg object-cover" />
        )}
        <input id="image" name="image" type="file" accept="image/png,image/jpeg,image/webp"
          onChange={(e) => setData('image', e.target.files[0] ?? null)}
          className="block w-full text-sm" />
        {form.progress && <progress value={form.progress.percentage} max="100" className="mt-2 w-full" />}
      </FormField>

      <div className="flex gap-3">
        <button type="submit" disabled={processing}
          className="rounded-full bg-cobalt text-white dark:bg-sky dark:text-night px-6 py-3 font-medium hover:opacity-90 disabled:opacity-50">
          {processing ? 'Saving…' : submitLabel}
        </button>
        <Link href="/admin/projects" className="rounded-full border border-ink/30 dark:border-chalk/30 px-6 py-3 font-medium">Cancel</Link>
      </div>
    </form>
  );
}
