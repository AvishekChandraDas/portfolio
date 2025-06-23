import React, { useState } from "react";
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { github, link } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const ProjectCard = ({ index, name, description, tags, image, source_code_link, github_link }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div variants={fadeIn("up", "spring", index*0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full shadow-card'
      >
        <div className='relative w-full h-[230px]'>
          {/* Loading/Error State */}
          {!imageLoaded && !imageError && (
            <div className="w-full h-full bg-tertiary rounded-2xl flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
          
          {imageError && (
            <div className="w-full h-full bg-tertiary rounded-2xl flex items-center justify-center">
              <p className="text-secondary text-sm">Image failed to load</p>
            </div>
          )}
          
          <img 
            src={image} 
            alt={name} 
            className={`w-full h-full object-cover rounded-2xl transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            style={{ display: imageError ? 'none' : 'block' }}
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            {/* Live Demo Link */}
            <div onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer mr-2 hover:scale-110 transition-transform duration-200"
              title="View Live Demo"
            >
              <img src={link} alt="live demo" className="w-1/2 h-1/2 object-contain" />
            </div>
            
            {/* GitHub Repository Link */}
            {github_link && (
              <div onClick={() => window.open(github_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:scale-110 transition-transform duration-200"
                title="View Source Code"
              >
                <img src={github} alt="github repository" className="w-1/2 h-1/2 object-contain" />
              </div>
            )}
          </div>
        </div>

        <div className='mt-5'>
          <h3 className="text-white font-bold text-[24px] mb-2 line-clamp-2" title={name}>
            {name}
          </h3>
          <p className="text-secondary text-[14px] leading-relaxed line-clamp-3" title={description}>
            {description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <p key={tag.name} className={`text-[14px] ${tag.color}`} >
              #{tag.name}
            </p>
          ))}

        </div>

      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique technologies for filter buttons
  const allTechnologies = [...new Set(projects.flatMap(project => 
    project.tags.map(tag => tag.name)
  ))];

  // Filter projects based on selected filter and search term
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || 
      project.tags.some(tag => tag.name.toLowerCase() === filter.toLowerCase());
    
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  return (
    <>
     <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My Work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className='w-full flex flex-col gap-6'>
        <motion.p variants={fadeIn("", "", 0.1, 1)} className='text-secondary text-[17px] max-w-3xl leading-[30px]'>
          Here are some of the projects I have worked on.
        </motion.p>
        
        {/* Search Bar */}
        <motion.div variants={fadeIn("", "", 0.2, 1)} className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-tertiary text-white rounded-lg border border-secondary/20 focus:border-secondary focus:outline-none transition-colors duration-200"
          />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div variants={fadeIn("", "", 0.3, 1)} className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              filter === 'all' 
                ? 'bg-secondary text-primary' 
                : 'bg-tertiary text-secondary hover:bg-secondary/20'
            }`}
          >
            All Projects ({projects.length})
          </button>
          {allTechnologies.map(tech => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === tech 
                  ? 'bg-secondary text-primary' 
                  : 'bg-tertiary text-secondary hover:bg-secondary/20'
              }`}
            >
              {tech}
            </button>
          ))}
        </motion.div>
      </div>

      <div className='mt-12 flex flex-wrap gap-7 justify-center'>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))
        ) : (
          <motion.div 
            variants={fadeIn("up", "spring", 0.1, 0.75)}
            className="text-center py-12"
          >
            <p className="text-secondary text-lg">No projects found matching your criteria.</p>
            <p className="text-secondary/60 text-sm mt-2">Try adjusting your search or filter.</p>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "project");