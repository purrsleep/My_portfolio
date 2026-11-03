import { Link, router, usePage } from '@inertiajs/react';

export default function Footer() {
  const { auth } = usePage().props;

  return (
    <footer className="border-t border-ink/10 dark:border-chalk/10">
      <div className="max-w-5xl mx-auto px-5 py-8 flex flex-wrap items-center justify-between gap-3 text-sm text-ink/70 dark:text-chalk/70">
        <p>&copy; {new Date().getFullYear()} LALAINE EUGENIO</p>
        <div className="flex gap-5">
          {auth?.user ? (
            <button type="button" onClick={() => router.post('/logout')} className="underline underline-offset-4">Log out</button>
          ) : (
            <Link href="/login" className="underline underline-offset-4">Admin login</Link>
          )}
          <a href="#home" className="underline underline-offset-4">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
