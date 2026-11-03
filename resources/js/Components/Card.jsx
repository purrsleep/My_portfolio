export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-2xl border border-ink/15 dark:border-chalk/15 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
