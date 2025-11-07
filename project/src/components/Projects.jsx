import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { projects } from '../data/projects';

const Projects = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Web Application':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      case 'Mobile Application':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'E-Commerce':
        return 'bg-purple-500/20 text-purple-400 border-purple-400/30';
      default:
        return 'bg-accent/20 text-accent border-accent/30';
    }
  };

  return (
    <section id="projects" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-4"
          >
            <span className="bg-gradient-to-r from-accent to-accentLight bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-textColor/70 mb-12 text-lg"
          >
            A showcase of my recent work and achievements
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-secondary rounded-xl overflow-hidden border border-accent/20 hover:border-accent/50 hover:shadow-2xl transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-textColor mb-2">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                          {project.type}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(
                            project.category
                          )}`}
                        >
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-textColor/80 mb-4">{project.description}</p>

                  <button
                    onClick={() => toggleExpand(project.id)}
                    className="flex items-center gap-2 text-accent hover:text-accentLight transition-colors mb-4"
                  >
                    <span className="font-semibold">
                      {expandedId === project.id ? 'Hide Details' : 'View Details'}
                    </span>
                    {expandedId === project.id ? <FaChevronUp /> : <FaChevronDown />}
                  </button>

                  <AnimatePresence>
                    {expandedId === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden space-y-4 mb-4"
                      >
                        <div>
                          <h4 className="text-lg font-semibold text-accent mb-2">
                            Achievements
                          </h4>
                          <ul className="space-y-2">
                            {project.achievements.map((achievement, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-2 text-textColor/80"
                              >
                                <span className="text-accent mt-1">▹</span>
                                <span>{achievement}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-accent mb-2">Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.features.map((feature, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-primary text-accentLight border border-accent/30 rounded-full text-sm"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary text-textColor/70 rounded-lg text-sm border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-accent border border-accent rounded-lg hover:bg-accent hover:text-white transition-all"
                    >
                      <FaGithub /> GitHub
                    </a>
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent to-accentLight text-white rounded-lg hover:scale-105 transition-transform"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
