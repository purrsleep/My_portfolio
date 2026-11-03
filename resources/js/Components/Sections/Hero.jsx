import { useEffect, useState } from 'react';

const words = ['fast', 'responsive', 'accessible', 'clean'];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="max-w-5xl mx-auto px-5 pt-20 pb-24 md:pt-32 md:pb-36">
      <p className="text-lg md:text-xl text-ink/70 dark:text-chalk/70">Hi, I'm Lalaine Eugenio</p>
      <h1 className="font-display font-extrabold tracking-tighter leading-[0.95] text-5xl sm:text-7xl md:text-8xl mt-3">
        <span className="text-cobalt dark:text-sky">{words[index]}</span> websites<br />
        people can actually use.
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/80 dark:text-chalk/80">
        Front-end web developer in training. I turn ideas into clear, responsive pages using HTML, Tailwind CSS and JavaScript.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a href="#projects" className="rounded-full bg-cobalt text-white dark:bg-sky dark:text-night px-6 py-3 font-medium hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cobalt">See my projects</a>
        <a href="#contact" className="rounded-full border border-ink/30 dark:border-chalk/30 px-6 py-3 font-medium hover:bg-ink/5 dark:hover:bg-chalk/10">Send a message</a>
      </div>
    </section>
  );
}
