import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import 'react-vertical-timeline-component/style.min.css';

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {

  const renderPoint = (point, index) => {
    // Check if the point contains a URL
    const isURL = point.startsWith("http") || point.includes("doi.org");
    
    // If it's a URL, render it as a link
    if (isURL) {
      return (
        <li key={`experience-point-${index}`} className="text-white-100 text-[14px] pl-1 tracking-wider">
          <a href={point} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
            {point}
          </a>
        </li>
      );
    };

    // Otherwise render it as plain text
    return (
      <li key={`experience-point-${index}`} className="text-white-100 text-[14px] pl-1 tracking-wider">
        {point}
      </li>
    );
  };

  return (
    <VerticalTimelineElement
      contentStyle={{ background: '#10222e', color: '#fff' }}
      contentArrowStyle={{ borderRight: '7px solid  #232631'}}
      date={experience.date}
      iconStyle={{ background: experience.iconBg}}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img 
            src={experience.icon} 
            alt={experience.company_name} 
            className="w-[100%] h-[100%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>{experience.company_name}</p>
        <p className="text-secondary text-[18px]">{experience.location}</p>
        <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => renderPoint(point, index))}
        </ul>

      </div>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
     <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I've done so far</p>
        <h2 className={styles.sectionHeadText}>Education & Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>

      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");