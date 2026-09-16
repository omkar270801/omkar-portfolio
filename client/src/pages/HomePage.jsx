import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-8">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
