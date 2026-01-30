import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { label: 'Years Experience', value: '3' },
    { label: 'Projects Completed', value: '10+' },
    { label: 'DSA Problems Solved', value: '150+' },
    { label: 'Code Issues Resolved', value: '300+' }
  ];

  const education = [
    {
      degree: 'Master of Computer Applications',
      date: 'July 2024',
      institution: "Vivekanand Education Society's Institute of Technology, Mumbai",
    },
    {
      degree: 'Bachelor of Science (Computer Science)',
      date: 'October 2020',
      institution: "Vivekanand Education Society's College of Arts, Science & Commerce, Mumbai",
    },
  ];

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2, // Faster staggering on mobile
      },
    },
  };

  const itemVariants = {
    hidden: isMobile ? { opacity: 0 } : { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: isMobile ? 0.4 : 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <div className="flex flex-col items-center justify-center mb-16">
            <motion.div 
              variants={itemVariants}
              className="glass-card px-8 py-3 rounded-full mb-4 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                  About Me
                </span>
              </h2>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="glass-card p-8 rounded-2xl max-w-4xl mx-auto space-y-6 mb-12 text-slate-600 text-lg shadow-lg">
            <p>
              I'm a passionate Full Stack Developer with approximately 3 years of professional experience.
              I specialize in building robust, scalable web applications and have a strong background in
              Java, Spring Boot, React.js, and modern web technologies. I'm dedicated to writing clean, maintainable code and delivering production-ready solutions.
            </p>
            <p>
              My expertise spans across Frontend (React, JavaScript), Backend (Java, Spring Boot) and Mobile Development
              (Android). I'm a quick learner with a strong problem-solving mindset and
              a passion for continuous improvement.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="glass-card p-6 rounded-xl text-center transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-slate-600 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">Education</h3>
            <div className="w-full max-w-3xl mx-auto flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:justify-center">
  {education.map((edu, index) => (
    <motion.div
      key={index}
      variants={itemVariants}
      className="glass-card p-6 rounded-xl border-l-[6px] border-l-accent transition-all w-full sm:min-w-[350px] sm:max-w-xs hover:shadow-lg"
    >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <h4 className="text-xl font-semibold text-slate-900 mb-2">{edu.degree}</h4>
                      <p className="text-slate-600">{edu.institution}</p>
                    </div>
                    <div className="px-4 py-2 bg-accent/10 rounded-lg text-accent font-semibold">
                      {edu.date}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
