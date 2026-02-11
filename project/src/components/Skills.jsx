import { motion } from 'framer-motion';

import { skillCategories } from '../data/skills';

const Skills = () => {


  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex flex-col items-center justify-center mb-16">
            <div 
              className="glass-card px-8 py-3 rounded-full mb-4 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                  Skills & Technologies
                </span>
              </h2>
            </div>
            <p
              className="text-center text-slate-600 text-lg font-medium"
            >
              My technical expertise across different domains
            </p>
          </div>

          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{category.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(6, 182, 212, 0.2)' }}
                      className="px-3 py-2 bg-white/40 text-slate-900 rounded-lg text-sm border border-accent/10 hover:border-accent hover:text-accent transition-all cursor-default shadow-sm"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
