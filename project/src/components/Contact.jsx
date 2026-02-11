import { useState } from 'react';
import { motion } from 'framer-motion';

import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };



  const contactMethods = [
    {
      icon: <FaEnvelope size={24} />,
      label: 'Email',
      value: 'mani.s.sukheja@gmail.com',
      link: 'mailto:mani.s.sukheja@gmail.com',
    },
    
    {
      icon: <FaGithub size={24} />,
      label: 'GitHub',
      value: 'github.com/ManishSukheja',
      link: 'https://github.com/ManishSukheja',
      external: true,
    },
    {
      icon: <FaLinkedin size={24} />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/manish-sukheja',
      link: 'https://linkedin.com/in/manish-sukheja',
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex flex-col items-center justify-center mb-16">
            <div 
              className="glass-card px-8 py-3 rounded-full mb-4 bg-white/40 backdrop-blur-md border border-white/50 shadow-sm"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                  Get In Touch
                </span>
              </h2>
            </div>
            <p
              className="text-center text-slate-600 text-lg font-medium"
            >
              Let's connect and discuss our next project
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {contactMethods.map((method, idx) => (
                  <motion.a
                    key={idx}
                    href={method.link}
                    target={method.external ? '_blank' : undefined}
                    rel={method.external ? 'noopener noreferrer' : undefined}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 p-4 glass-card rounded-xl transition-all duration-300 hover:scale-[1.02] group"
                  >
                    <div className="text-accent mt-1 group-hover:text-accentLight transition-colors">
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-slate-600 text-sm mb-1">{method.label}</div>
                      <div className="text-slate-900 group-hover:text-accent transition-colors break-all">
                        {method.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 p-6 glass-card rounded-xl">
                <div className="flex items-center gap-4">
                  <h4 className="text-xl font-semibold text-slate-900 mb-0">Current Status:</h4>
                  <div className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-400/30">
                    Open to Work
                  </div>
                </div>
                <p className="mt-3 text-slate-600">
                  Available for full-time, remote and on-site opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
