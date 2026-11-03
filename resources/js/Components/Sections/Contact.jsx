import SectionTitle from '../SectionTitle';
import ContactForm from '../ContactForm';
import { contact } from '../../data/portfolio';

const link = 'underline underline-offset-4 hover:text-cobalt dark:hover:text-sky';

export default function Contact() {
  return (
    <section id="contact" className="border-t border-ink/10 dark:border-chalk/10">
      <div className="max-w-5xl mx-auto px-5 py-20 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <SectionTitle>Contact</SectionTitle>
          <p className="mt-4 text-lg text-ink/80 dark:text-chalk/80">Have a project or an opportunity in mind? Send me a message and I'll reply as soon as I can.</p>
          <ul className="mt-8 space-y-3 font-medium">
            <li><a className={link} href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><a className={link} href={contact.github} target="_blank" rel="noopener noreferrer">GitHub: purrsleep</a></li>
            <li><a className={link} href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn: Eugenio Lalaine</a></li>
          </ul>
        </div>
        <div className="md:col-span-3"><ContactForm /></div>
      </div>
    </section>
  );
}
