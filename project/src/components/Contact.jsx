import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
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
    <section id="contact" className="py-20 bg-secondary">
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
              Get In Touch
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-center text-textColor/70 mb-12 text-lg"
          >
            Let's connect and discuss our next project
          </motion.p>

          <div className="grid lg:grid-cols-1 gap-12">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-textColor mb-6">Contact Information</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {contactMethods.map((method, idx) => (
                  <motion.a
                    key={idx}
                    href={method.link}
                    target={method.external ? '_blank' : undefined}
                    rel={method.external ? 'noopener noreferrer' : undefined}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-4 p-4 bg-primary rounded-xl border border-accent/20 hover:border-accent/50 transition-all group"
                  >
                    <div className="text-accent mt-1 group-hover:text-accentLight transition-colors">
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-textColor/60 text-sm mb-1">{method.label}</div>
                      <div className="text-textColor group-hover:text-accent transition-colors break-all">
                        {method.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary rounded-xl border border-accent/20">
                <div className="flex items-center gap-4">
                  <h4 className="text-xl font-semibold text-textColor mb-0">Current Status:</h4>
                  <div className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-lg border border-green-400/30">
                    Open to Work
                  </div>
                </div>
                <p className="mt-3 text-textColor/80">
                  Available for full-time remote and on-site opportunities.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
