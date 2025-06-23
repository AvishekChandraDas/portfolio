import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({ testimonial, name, designation, company, image }) => (
  <div className="bg-black-200 p-12 rounded-3xl w-full max-w-[1000px]">
    <p className="text-white font-black text-[60px]">"</p>
    <div className="mt-2">
      <p className="text-white tracking-wider text-[22px] leading-[32px]">{testimonial}</p>
      <div className="mt-10 flex justify-between items-center gap-2">
        <div className="flex-1 flex flex-col">
          <p className="text-white font-medium text-[20px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          <p className="mt-2 text-secondary text-[16px]">
            {designation} at {company}
          </p>
        </div>
        <img
          src={image}
          alt={`feedback-by-${name}`}
          className="w-14 h-14 rounded-full object-cover"
        />
      </div>
    </div>
  </div>
);

const Feedbacks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  // Auto-slide timer with pause functionality
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  const slideVariants = {
    enterRight: {
      x: 1000,
      opacity: 0
    },
    enterLeft: {
      x: -1000,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1
    },
    exitLeft: {
      x: -1000,
      opacity: 0
    },
    exitRight: {
      x: 1000,
      opacity: 0
    }
  };

  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      <div 
        className={`${styles.paddingX} mt-20 pb-14 flex justify-center items-center min-h-[500px] overflow-hidden relative group`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Navigation Buttons */}
        <motion.button 
          onClick={handlePrev}
          className="absolute left-4 z-10 text-white/60 hover:text-white transition-all duration-300 
          bg-gradient-to-r from-tertiary to-black-200 p-5 rounded-full backdrop-blur-sm 
          border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 
          hover:border-white/30 hover:shadow-white/10"
          whileHover={{ 
            scale: 1.15,
            x: 5,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ 
            scale: 0.9,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          aria-label="Previous testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <motion.button 
          onClick={handleNext}
          className="absolute right-4 z-10 text-white/60 hover:text-white transition-all duration-300 
          bg-gradient-to-l from-tertiary to-black-200 p-5 rounded-full backdrop-blur-sm 
          border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 
          hover:border-white/30 hover:shadow-white/10"
          whileHover={{ 
            scale: 1.15,
            x: -5,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ 
            scale: 0.9,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          aria-label="Next testimonial"
        >
          <svg xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={slideVariants}
            initial={direction === "right" ? "enterRight" : "enterLeft"}
            animate="center"
            exit={direction === "right" ? "exitLeft" : "exitRight"}
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <FeedbackCard {...testimonials[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-3 pb-10">
        {testimonials.map((_, index) => (
          <div
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? "right" : "left");
              setCurrentIndex(index);
            }}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentIndex ? "bg-white w-6" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "feedbacks");