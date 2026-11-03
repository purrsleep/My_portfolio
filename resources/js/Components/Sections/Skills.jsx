import SectionTitle from '../SectionTitle';
import Card from '../Card';
import { skillGroups } from '../../data/portfolio';

const filled = 'bg-cobalt text-white dark:bg-sky dark:text-night';
const outline = 'border border-ink/30 dark:border-chalk/30';

export default function Skills() {
  return (
    <section id="skills" className="border-t border-ink/10 dark:border-chalk/10">
      <div className="max-w-5xl mx-auto px-5 py-20">
        <SectionTitle>Skills</SectionTitle>
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <Card key={group.title} className="p-6">
              <h3 className="font-display font-bold text-xl">{group.title}</h3>
              <p className="mt-1 text-sm text-ink/70 dark:text-chalk/70">{group.note}</p>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm">
                {group.items.map((item) => (
                  <li key={item} className={`rounded-full px-3 py-1 ${group.filled ? filled : outline}`}>{item}</li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
