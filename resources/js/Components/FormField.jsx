// Label + input slot + error message shown right beside the field.
export default function FormField({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium mb-1">{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-sm text-ink/60 dark:text-chalk/60">{hint}</p>}
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p>}
    </div>
  );
}

export const inputClass = (error) =>
  `w-full rounded-lg border bg-transparent px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cobalt dark:focus:ring-sky ${
    error ? 'border-red-500' : 'border-ink/30 dark:border-chalk/30'
  }`;
