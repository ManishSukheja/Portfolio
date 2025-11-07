import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub } from 'react-icons/fa';
import mainLogo from "../resources/main_logo_w.png";


const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Full Stack Developer';
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayText('');
        setIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
  }, [index]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-primary pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-accent text-lg mb-2"
            >
              Welcome to my portfolio
            </motion.p> */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-textColor mb-4"
            >
              Hi, I'm <br/><span className="bg-gradient-to-r from-accent to-accentLight bg-clip-text text-transparent">Manish Sukheja</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-accent mb-6 h-10"
            >
              {displayText}
              <span className="animate-pulse">|</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-textColor/80 text-lg mb-8 leading-relaxed"
            >
              Passionate Full Stack Developer with 3 years of professional experience.
              I specialize in building scalable web applications using React.js, Java,
              Spring Boot, and modern technologies. <br/>
              Actively expanding my skill set to include Ai leveraging the latest advancements to create smarter, more impactful solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link to="projects" smooth duration={500}>
                <button className="px-6 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-all">
                  View My Work
                </button>
              </Link>
              <a
                href="https://github.com/ManishSukheja"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-6 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-all flex items-center gap-2">
                  <FaGithub /> GitHub
                </button>
              </a>
              <Link to="contact" smooth duration={500}>
                <button className="px-6 py-3 border-2 border-accent text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-all">
                  Get In Touch
                </button>
              </Link>
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-3 text-textColor/70">
                <FaEnvelope className="text-accent" />
                <a href="mailto:mani.s.sukheja@gmail.com" className="hover:text-accent transition-colors">
                  mani.s.sukheja@gmail.com
                </a>
              </div>
              {/* <div className="flex items-center gap-3 text-textColor/70">
                <FaPhone className="text-accent" />
                <a href="tel:+919096020809" className="hover:text-accent transition-colors">
                  +91-9096020809
                </a>
              </div> */}
              <div className="flex items-center gap-3 text-textColor/70">
                <FaMapMarkerAlt className="text-accent" />
                <span>Mumbai, India</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-r from-accent to-accentLight flex items-center justify-center text-white text-6xl md:text-8xl font-bold shadow-2xl">
                <img src={mainLogo} alt="Main Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accentLight opacity-50 blur-3xl -z-10"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
