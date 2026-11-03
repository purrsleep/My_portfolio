import SectionTitle from '../SectionTitle';
import Timeline from '../Timeline';
import { education, experience } from '../../data/portfolio';

export default function Education() {
  return (
    <section id="education" className="border-t border-ink/10 dark:border-chalk/10">
      <div className="max-w-5xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-14">
        <div>
          <SectionTitle>Education</SectionTitle>
          <Timeline items={education} />
        </div>
        <div>
          <SectionTitle>Experience and certificates</SectionTitle>
          <Timeline items={experience} />
        </div>
      </div>
    </section>
  );
}
