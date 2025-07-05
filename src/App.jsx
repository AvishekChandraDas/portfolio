import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Analytics from "./components/Analytics";

// SEO Component for dynamic meta tags
const SEOHead = () => {
  useEffect(() => {
    // Dynamic title updates based on scroll position
    const updateTitle = () => {
      const scrollY = window.scrollY;
      const sections = [
        { offset: 0, title: "Avishek Chandra Das - Computer Science & Quantum Computing Expert" },
        { offset: 800, title: "About Avishek - CS Student & Developer" },
        { offset: 1600, title: "Experience - Avishek's Professional Journey" },
        { offset: 2400, title: "Tech Stack - Avishek's Technical Skills" },
        { offset: 3200, title: "Projects - Avishek's Portfolio Work" },
        { offset: 4000, title: "Contact Avishek - Let's Connect" }
      ];
      
      const currentSection = sections.reverse().find(section => scrollY >= section.offset);
      if (currentSection) {
        document.title = currentSection.title;
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(updateTitle);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <SEOHead />
      <Analytics />
      <div className="relative z-0 bg-primary">
        {/* Schema.org structured data for better SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Avishek Chandra Das Portfolio",
            "url": "https://avishekchandradas.me",
            "author": {
              "@type": "Person",
              "name": "Avishek Chandra Das",
              "jobTitle": "Computer Science Student & Software Developer",
              "description": "Quantum Computing and AI/ML enthusiast with expertise in full-stack development"
            },
            "description": "Portfolio website showcasing projects and expertise in Computer Science, Quantum Computing, AI/ML, and Full-Stack Development",
            "keywords": "Avishek Chandra Das, Computer Science, Quantum Computing, AI, Machine Learning, Portfolio",
            "inLanguage": "en-US"
          })}
        </script>
        
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center"> 
          <Navbar />
          <main>
            <Hero />
          </main>
        </div>

        <section id="about" aria-label="About Avishek">
          <About />
        </section>
        
        <section id="experience" aria-label="Professional Experience">
          <Experience />
        </section>
        
        <section id="tech" aria-label="Technical Skills">
          <Tech />
        </section>
        
        <section id="works" aria-label="Portfolio Projects">
          <Works />
        </section>
        
        <section id="feedbacks" aria-label="Client Testimonials">
          <Feedbacks />
        </section>
        
        <div className="relative z-0">
          <section id="contact" aria-label="Contact Information">
            <Contact />
          </section>
          <StarsCanvas />
        </div>

        <footer className="bg-black-100 text-white text-center py-10">
         <p className="inline-flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
           &copy; 2025 – Designed and developed by{" "}
           <a
             href="https://www.linkedin.com/in/avishekchandradas"
             target="_blank"
             rel="noreferrer"
             className="inline-flex items-center gap-1 hover:underline"
           >
           Avishek Chandra Das
           <motion.svg
            whileHover={{ scale: 1.2}}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="#0A66C2"
            viewBox="0 0 24 24"
           >
           <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.7v2.1h.1c.5-1 1.7-2.1 3.6-2.1 3.9 0 4.6 2.6 4.6 6v9h-4V15c0-2.4-.1-5.5-3.3-5.5-3.3 0-3.8 2.5-3.8 5.3V24h-4V8z"/>
           </motion.svg>
           </a>

              {/* GitHub */}
             <a
              href="https://github.com/avishekchandradas"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1"
             >
        <motion.svg
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#ffffff"
          viewBox="0 0 24 24"
        >
          <path d="M12 .5C5.7.5.6 5.6.6 12c0 5.1 3.3 9.3 7.9 10.8.6.1.8-.3.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.6-1.5-1.5-1.9-1.5-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.4 2 1.4 1.2 2 3.2 1.5 3.9 1.2.1-.9.5-1.5.9-1.9-2.6-.3-5.4-1.3-5.4-5.9 0-1.3.5-2.4 1.3-3.3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.4 1.3.9-.2 1.9-.3 2.8-.3s1.9.1 2.8.3c2.3-1.6 3.4-1.3 3.4-1.3.6 1.6.2 2.8.1 3.1.8.9 1.3 2 1.3 3.3 0 4.6-2.8 5.6-5.5 5.9.5.4 1 .9 1 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.7 7.9-10.8C23.4 5.6 18.3.5 12 .5z"/>
        </motion.svg>
          </a>
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App
