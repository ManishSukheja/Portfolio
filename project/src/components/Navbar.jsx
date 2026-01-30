import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import mainLogo from '../resources/main_logo_w.png';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    
    { name: 'About', to: 'about' },
    { name: 'Experience', to: 'experience' },
    { name: 'Projects', to: 'projects' },
    { name: 'Skills', to: 'skills' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/40 backdrop-blur-md shadow-lg border-b border-white/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3" style={{ minWidth: '170px' }}>
            <AnimatePresence>
              {scrolled ? (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to="home" smooth duration={500} className="cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-accentLight flex items-center justify-center text-white font-bold">
                        <img src={mainLogo} alt="Main Logo" className="w-full h-full object-contain rounded-full" />
                      </div>
                      <span className="text-slate-900 font-semibold text-lg hidden sm:block">
                        Manish Sukheja
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ) : (
                <div style={{ width: '180px', height: '40px' }} />
              )}
            </AnimatePresence>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={500}
                spy
                offset={-70}
                className="text-slate-900 hover:text-accent cursor-pointer transition-colors relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/ManishSukheja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 hover:text-accent transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/manish-sukheja"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 hover:text-accent transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
            {/* <a
              href="mailto:mani.s.sukheja@gmail.com"
              className="text-textColor hover:text-accent transition-colors"
            >
              <FaEnvelope size={20} />
            </a> */}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-900 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/30 backdrop-blur-xl border-t border-white/20"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  smooth
                  duration={500}
                  spy
                  offset={-70}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 text-slate-900 hover:text-accent hover:bg-white/20 rounded-lg cursor-pointer transition-all"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-center space-x-6 pt-4">
                <a
                  href="https://github.com/ManishSukheja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-900 hover:text-accent transition-colors"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/manish-sukheja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-900 hover:text-accent transition-colors"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="mailto:mani.s.sukheja@gmail.com"
                  className="text-slate-900 hover:text-accent transition-colors"
                >
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
