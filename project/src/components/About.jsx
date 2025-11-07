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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 bg-secondary">
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
              About Me
            </span>
          </motion.h2>

          <motion.div variants={itemVariants} className="max-w-4xl mx-auto space-y-6 mb-12 text-textColor/80 text-lg">
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
                className="bg-primary p-6 rounded-xl text-center border border-accent/20 hover:border-accent/50 transition-all"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-textColor/70 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-textColor mb-8 text-center">Education</h3>
            <div className="w-full max-w-7xl mx-auto flex flex-row gap-6 flex-wrap justify-center">

              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-primary p-6 rounded-xl border-l-4 border-accent hover:shadow-xl transition-all min-w-[500px] max-w-xl"
                >
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div>
                      <h4 className="text-xl font-semibold text-textColor mb-2">{edu.degree}</h4>
                      <p className="text-textColor/70">{edu.institution}</p>
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
