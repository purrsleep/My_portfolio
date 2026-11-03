import { Head, Link, router } from '@inertiajs/react';
import ThemeToggle from '../Components/ThemeToggle';
import FlashMessage from '../Components/FlashMessage';

export default function AdminLayout({ title, children }) {
  return (
    <>
      <Head title={title} />
      <header className="border-b border-ink/10 dark:border-chalk/10">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/admin/projects" className="font-display font-extrabold text-xl tracking-tight">Manage projects</Link>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/" className="underline underline-offset-4">View portfolio</Link>
            <button type="button" onClick={() => router.post('/logout')} className="underline underline-offset-4">Log out</button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-5 py-10">
        <FlashMessage />
        {children}
      </main>
    </>
  );
}
