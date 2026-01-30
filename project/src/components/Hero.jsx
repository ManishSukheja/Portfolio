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
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-2xl relative z-10 backdrop-blur-xl bg-white/40 border border-white/60 shadow-xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 drop-shadow-sm"
            >
              Hi, I'm <br/><span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">Manish Sukheja</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-slate-800 font-semibold mb-6 h-10 flex items-center gap-2"
            >
              {displayText}
              <span className="w-1 h-8 bg-slate-900 animate-pulse block"></span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-700 text-lg mb-8 leading-relaxed font-medium"
            >
              A Passionate Developer with 3 years of professional experience.
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
                <button className="px-6 py-3 bg-accent text-white rounded-lg font-bold hover:bg-accentLight shadow-lg hover:shadow-cyan-400/30 transition-all transform hover:-translate-y-1">
                  View My Work
                </button>
              </Link>
              <a
                href="https://github.com/ManishSukheja"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="px-6 py-3 glass-card text-slate-900 border border-slate-300 rounded-lg font-bold hover:bg-white/50 hover:text-accent transition-all flex items-center gap-2 shadow-md hover:shadow-lg">
                  <FaGithub size={20} /> GitHub
                </button>
              </a>
              <Link to="contact" smooth duration={500}>
                <button className="px-6 py-3 border-2 border-accent text-accent rounded-lg font-bold hover:bg-accent/10 transition-all">
                  Get In Touch
                </button>
              </Link>
              
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 text-slate-700 font-medium group cursor-pointer">
                <div className="p-2 bg-white/50 rounded-full text-accent group-hover:scale-110 transition-transform">
                  <FaEnvelope />
                </div>
                <a href="mailto:mani.s.sukheja@gmail.com" className="hover:text-accent transition-colors">
                  mani.s.sukheja@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-slate-700 font-medium">
                <div className="p-2 bg-white/50 rounded-full text-accent">
                   <FaMapMarkerAlt />
                </div>
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
              <motion.div 
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-cyan-400 via-blue-400 to-teal-300 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-[0_8px_32px_0_rgba(6,182,212,0.3)] relative overflow-hidden group"
              >
                {/* Internal shine/reflection for liquid effect */}
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:left-full transition-all duration-1000 rotate-45"></div>
                
                <img src={mainLogo} alt="Main Logo" className="w-[80%] h-[80%] object-contain relative z-10 drop-shadow-md" />
              </motion.div>
              <motion.div 
                animate={{
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "30% 60% 70% 40% / 50% 60% 30% 60%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-cyan-500/30 blur-3xl -z-10"
              ></motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
