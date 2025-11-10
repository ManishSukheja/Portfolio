import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaChevronDown, FaChevronUp, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
import { experiences } from '../data/experiences';

const Experience = () => {
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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" className="py-20 bg-primary">
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
              Experience
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-textColor/70 mb-12 text-lg"
          >
            My professional journey and contributions
          </motion.p>

          <div className="max-w-4xl mx-auto space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="bg-secondary rounded-xl overflow-hidden border border-accent/20 hover:border-accent/50 transition-all"
              >
                <button
                  onClick={() => toggleExpand(exp.id)}
                  className="w-full p-6 text-left hover:bg-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-textColor">
                          {exp.position}
                        </h3>
                        <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-semibold">
                          {exp.company}
                        </span>
                      </div>
                      <p className="text-textColor/80 mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-textColor/60">
                        <div className="flex items-center gap-2">
                          <FaCalendar className="text-accent" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-accent" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-accent">
                      {expandedId === exp.id ? (
                        <FaChevronUp size={24} />
                      ) : (
                        <FaChevronDown size={24} />
                      )}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedId === exp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold text-accent mb-3">
                            Professional Highlights
                          </h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, idx) => (
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
                          <h4 className="text-lg font-semibold text-accent mb-3">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="px-3 py-1 bg-primary text-accent border border-accent/30 rounded-full text-sm"
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
