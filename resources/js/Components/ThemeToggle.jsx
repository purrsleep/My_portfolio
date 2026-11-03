export default function ThemeToggle() {
  const toggle = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
  };

  return (
    <button type="button" onClick={toggle} aria-label="Toggle dark mode"
      className="h-10 w-10 grid place-items-center rounded-full border border-ink/20 dark:border-chalk/20 hover:bg-ink/5 dark:hover:bg-chalk/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt dark:focus-visible:ring-sky">
      <svg className="h-5 w-5 dark:hidden" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      <svg className="h-5 w-5 hidden dark:block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" />
        <path strokeLinecap="round" d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
      </svg>
    </button>
  );
}
