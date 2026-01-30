import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white/40 backdrop-blur-xl py-8 border-t border-white/60 relative z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-900 text-center md:text-left">
            <p className="flex items-center gap-2 justify-center md:justify-start">
              <FaHeart className="text-red-500" /> Built with passion by Manish Sukheja
            </p>
          </div>

          <div className="flex items-center gap-6">
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
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
