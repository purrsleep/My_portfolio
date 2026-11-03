export default function ConfirmModal({ open, title, message, confirmLabel = 'Delete', onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-night/60 px-5" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
      <div className="w-full max-w-md rounded-2xl bg-chalk dark:bg-night border border-ink/20 dark:border-chalk/20 p-6">
        <h2 id="confirm-title" className="font-display font-bold text-xl">{title}</h2>
        <p className="mt-2 text-ink/80 dark:text-chalk/80">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-full border border-ink/30 dark:border-chalk/30 px-5 py-2 font-medium">Cancel</button>
          <button type="button" onClick={onConfirm} className="rounded-full bg-red-600 text-white px-5 py-2 font-medium hover:opacity-90">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
