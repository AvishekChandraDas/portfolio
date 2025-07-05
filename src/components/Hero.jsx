import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';

import { styles } from '../styles';

// Lazy load the quantum computing canvas for better performance
const QuantumComputingCanvas = lazy(() => import('./canvas/QuantumComputing'));

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto' aria-label="Hero Section - Avishek Chandra Das Introduction">
      {/* Schema.org structured data for the hero section */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Avishek Chandra Das",
          "jobTitle": "Computer Science Student & Software Developer",
          "description": "Computer Science & Engineering student at Metropolitan University, specializing in Quantum Computing and AI/ML",
          "url": "https://avishekchandradas.me",
          "image": "https://avishekchandradas.me/assets/logo-DtOzpCOJ.png",
          "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "Metropolitan University"
          },
          "knowsAbout": ["Quantum Computing", "AI/ML", "Full Stack Development"],
          "sameAs": [
            "https://github.com/AvishekChandraDas",
            "https://linkedin.com/in/avishekchandradas"
          ]
        })}
      </script>
      
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5' aria-hidden="true">
          <div className='w-5 h-5 rounded-full bg-[#5fcecc]' />
          <div className='w-1 sm:h-80 h-40 blue-gradient' />
        </div>

        <header>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#5fcecc]'>Avishek</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Computer Science & Engineering @ Metropolitan University
            <br className='sm:block hidden' /> 
            Quantum Computing & AI/ML Enthusiast  
          </p>
        </header>
      </div>

      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#5fcecc] mx-auto mb-4"></div>
            <p className="text-sm opacity-70">Loading 3D Visualization...</p>
          </div>
        </div>
      }>
        <QuantumComputingCanvas />
      </Suspense>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center item-center'>
        <a href="#about" aria-label="Scroll to About section">
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div 
              animate={{y: [0, 24, 0]}} 
              transition={{
                duration:1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className='w-3 h-3 bg-secondary rounded-full mb-1'
              aria-hidden="true"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero