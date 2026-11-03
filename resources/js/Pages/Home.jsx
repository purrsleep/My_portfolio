import { Head } from '@inertiajs/react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import FlashMessage from '../Components/FlashMessage';
import Hero from '../Components/Sections/Hero';
import About from '../Components/Sections/About';
import Skills from '../Components/Sections/Skills';
import Projects from '../Components/Sections/Projects';
import Education from '../Components/Sections/Education';
import Contact from '../Components/Sections/Contact';

export default function Home({ projects, canManage }) {
  return (
    <>
      <Head />
      <Navbar />
      <FlashMessage floating />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects projects={projects} canManage={canManage} />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
