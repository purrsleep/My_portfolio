import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { navLinks } from '../data/portfolio';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-chalk/90 dark:bg-night/90 backdrop-blur border-b border-ink/10 dark:border-chalk/10">
      <nav className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between" aria-label="Main">
        <a href="#home" className="font-display font-extrabold text-xl tracking-tight">LALAINE EUGENIO</a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map(([label, href]) => (
            <li key={href}><a className="hover:text-cobalt dark:hover:text-sky" href={href}>{label}</a></li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button type="button" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="md:hidden h-10 w-10 grid place-items-center rounded-full border border-ink/20 dark:border-chalk/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cobalt dark:focus-visible:ring-sky">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </nav>

      <ul id="mobile-menu" className={`${open ? '' : 'hidden'} md:hidden px-5 pb-4 space-y-1 text-base font-medium`}>
        {navLinks.map(([label, href]) => (
          <li key={href}><a className="block py-2" href={href} onClick={() => setOpen(false)}>{label}</a></li>
        ))}
      </ul>
    </header>
  );
}
