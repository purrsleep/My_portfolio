export default function Timeline({ items }) {
  return (
    <ol className="mt-10 border-l-2 border-ink/20 dark:border-chalk/20 ml-1.5 pl-8 space-y-8">
      {items.map((item) => (
        <li key={item.title} className="relative">
          <span className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full bg-cobalt dark:bg-sky"></span>
          <p className="text-sm text-ink/70 dark:text-chalk/70">{item.date}</p>
          <h4 className="font-display font-bold text-lg">{item.title}</h4>
          <p className="text-ink/80 dark:text-chalk/80">{item.text}</p>
        </li>
      ))}
    </ol>
  );
}
