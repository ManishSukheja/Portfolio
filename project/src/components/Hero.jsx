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
    <section id="home" className="min-h-screen relative flex items-center justify-center pt-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        
        {/* Text Content */}
        <div className="order-2 md:order-1 text-center md:text-left">
          <div className="glass-card p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl backdrop-blur-md border border-white/40 bg-white/30 relative overflow-hidden group hover:border-accent/30 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 drop-shadow-sm">
              Hi, I'm <br/><span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">Manish Sukheja</span>
            </h1>
            <div className="text-2xl md:text-3xl text-slate-800 font-semibold mb-6 h-10 flex items-center justify-center md:justify-start gap-2">
              {displayText}
              <span className="w-1 h-8 bg-slate-900 animate-pulse block"></span>
            </div>
            <p className="text-slate-700 text-lg mb-8 leading-relaxed font-medium">
              I build exceptional digital experiences that live on the internet. 
              Focused on creating accessible, pixel-perfect, and performant web applications.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                to="projects"
                smooth
                duration={500}
                className="px-8 py-3 bg-accent text-white rounded-lg font-semibold shadow-lg shadow-accent/25 hover:bg-accentLight hover:shadow-accent/40 hover:-translate-y-1 transition-all cursor-pointer"
              >
                View My Work
              </Link>
              <a
                href="https://github.com/ManishSukheja"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 glass-card text-accent rounded-lg font-semibold hover:bg-accent hover:text-white transition-all flex items-center gap-2 group"
              >
                <FaGithub className="text-xl group-hover:scale-110 transition-transform" />
                GitHub
              </a>
              <Link
                to="contact"
                smooth
                duration={500}
                className="px-8 py-3 glass-card text-slate-700 rounded-lg font-semibold hover:bg-white hover:text-accent transition-all cursor-pointer"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
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
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
