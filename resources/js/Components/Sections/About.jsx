import SectionTitle from '../SectionTitle';
import { goals } from '../../data/portfolio';

export default function About() {
  return (
    <section id="about" className="border-t border-ink/10 dark:border-chalk/10">
      <div className="max-w-5xl mx-auto px-5 py-20 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <SectionTitle>About me</SectionTitle>
          <img src="/images/IMAGES.png" alt="Portrait of Lalaine Eugenio" className="mt-8 h-64 w-64 rounded-full object-cover" />
        </div>
        <div className="md:col-span-3 space-y-5 text-lg leading-relaxed">
          <p>Hi! I'm a third-year Information Technology student at Urdaneta City University. I am passionate about learning new technologies and developing my skills in web development, UI/UX design, and software development.</p>
          <p>As an IT student, I enjoy exploring new ideas, solving problems, and creating projects that can help people in their daily lives. I am continuously learning and improving my technical skills as I prepare for my future career in the IT industry.</p>
          <h3 className="font-display font-bold text-xl pt-4">My goals</h3>
          <ul className="list-disc pl-6 space-y-2">
            {goals.map((g) => <li key={g}>{g}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
