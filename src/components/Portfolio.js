import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ppt1 from '../images/ppt_1.png';
import ppt2 from '../images/ppt_2.png';
import ppt3 from '../images/ppt_3.png';
import ppt4 from '../images/ppt_4.png';
import ppt5 from '../images/ppt_5.png';
import ppt6 from '../images/ppt_6.png';
import ppt7 from '../images/ppt_7.png';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('samples');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  // Removed unused hoveredCard state
  const sectionRef = useRef(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalOpen]);

  const samples = [
    { 
      title: "Student Academic Project", 
      category: "Academic", 
      image: ppt1, 
      description: "Clean and structured presentation for university seminar",
      gradient: "from-blue-500 to-cyan-500"
    },
    { 
      title: "Business Strategy Report", 
      category: "Corporate", 
      image: ppt2, 
      description: "Professional slides for board meeting presentation",
      gradient: "from-indigo-500 to-purple-500"
    },
    { 
      title: "Startup Investor Pitch", 
      category: "Pitch Deck", 
      image: ppt3, 
      description: "Story-driven pitch deck that secured funding",
      gradient: "from-purple-500 to-pink-500"
    },
    { 
      title: "Marketing Campaign", 
      category: "Business", 
      image: ppt4, 
      description: "Visual presentation for product launch",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const beforeAfter = [
    { 
      before: ppt5, 
      after: ppt6, 
      beforeTitle: "Old/Basic Design", 
      afterTitle: "Our Redesign", 
      description: "Transformed basic slides into professional presentation" 
    },
    { 
      before: ppt7, 
      after: ppt3, 
      beforeTitle: "Outdated Layout", 
      afterTitle: "Modern Design", 
      description: "Complete makeover with better visual hierarchy" 
    }
  ];

  const openModal = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  // Animation variants - Removed unused sectionVariants
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }),
    hover: {
      y: -10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: { scale: 1, background: "linear-gradient(135deg, #6366f1, #a855f7)" },
    hover: { scale: 1.05 }
  };

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="relative py-24 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-block px-5 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-5 shadow-lg">
            <span className="text-sm text-indigo-400 font-medium">🎨 Our Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            See Our{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-5" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We focus on clean design, readability, and visual storytelling
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center gap-4 mb-12"
        >
          {[
            { id: 'samples', label: 'Sample Slides', icon: 'fas fa-images' },
            { id: 'beforeafter', label: 'Before vs After', icon: 'fas fa-exchange-alt' }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variants={tabVariants}
              initial="inactive"
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              animate={activeTab === tab.id ? "active" : "inactive"}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'bg-white/5 backdrop-blur-sm text-gray-300 hover:text-white border border-white/10'
              }`}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content with AnimatePresence for smooth tab transitions */}
        <AnimatePresence mode="wait">
          {activeTab === 'samples' && (
            <motion.div
              key="samples"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {samples.map((sample, idx) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onClick={() => openModal(sample.image)}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-white/5 backdrop-blur-sm overflow-hidden rounded-xl transition-all duration-300 border border-white/10">
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-52">
                      <motion.img
                        src={sample.image}
                        alt={sample.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      />
                      {/* Overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-white text-sm font-medium flex items-center gap-2">
                            <i className="fas fa-search-plus"></i>
                            Click to enlarge
                          </p>
                        </div>
                      </motion.div>
                      
                      {/* Category Badge */}
                      <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r ${sample.gradient} text-white shadow-lg`}>
                        {sample.category}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                        {sample.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {sample.description}
                      </p>
                      
                      {/* View Details Link */}
                      <motion.div 
                        className="mt-3 flex items-center gap-1 text-indigo-400 text-sm font-medium"
                        initial={{ x: -5, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        <span>View details</span>
                        <i className="fas fa-arrow-right text-xs"></i>
                      </motion.div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <motion.div 
                      className={`absolute inset-0 rounded-xl bg-gradient-to-r ${sample.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === 'beforeafter' && (
            <motion.div
              key="beforeafter"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-8"
            >
              {beforeAfter.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/10"
                >
                  {/* Header */}
                  <div className="p-5 bg-gradient-to-r from-indigo-950/50 to-purple-950/50 border-b border-white/10">
                    <h3 className="text-center text-white font-semibold text-lg">
                      {item.description}
                    </h3>
                  </div>
                  
                  {/* Comparison Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Before Section */}
                    <motion.div 
                      className="relative overflow-hidden group cursor-pointer"
                      onClick={() => openModal(item.before)}
                      whileHover="hover"
                    >
                      <div className="p-3 bg-gradient-to-r from-red-500/10 to-red-600/5 text-red-400 font-semibold text-center border-b border-red-500/20">
                        <i className="fas fa-frown mr-2"></i>
                        {item.beforeTitle}
                      </div>
                      <div className="relative overflow-hidden h-64">
                        <motion.img 
                          src={item.before} 
                          alt="Before" 
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <i className="fas fa-search-plus text-white text-2xl"></i>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          BEFORE
                        </span>
                      </div>
                    </motion.div>
                    
                    {/* After Section */}
                    <motion.div 
                      className="relative overflow-hidden group cursor-pointer"
                      onClick={() => openModal(item.after)}
                      whileHover="hover"
                    >
                      <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-600/5 text-green-400 font-semibold text-center border-b border-green-500/20">
                        <i className="fas fa-smile mr-2"></i>
                        {item.afterTitle}
                      </div>
                      <div className="relative overflow-hidden h-64">
                        <motion.img 
                          src={item.after} 
                          alt="After" 
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.4 }}
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <i className="fas fa-search-plus text-white text-2xl"></i>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          AFTER
                        </span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Stats Section */}
                  <motion.div 
                    className="p-5 bg-black/40 grid grid-cols-3 gap-4 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {[
                      { icon: "fas fa-chart-line", text: "+80% Visual Impact", color: "text-blue-400" },
                      { icon: "fas fa-clock", text: "50% Less Time", color: "text-green-400" },
                      { icon: "fas fa-thumbs-up", text: "95% Satisfaction", color: "text-purple-400" }
                    ].map((stat, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <i className={`${stat.icon} ${stat.color} text-2xl mb-2 block`}></i>
                        <p className="text-sm text-gray-300 font-medium">{stat.text}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA - Fixed anchor tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.button
            onClick={() => {
              const orderForm = document.getElementById('order-form');
              if (orderForm) {
                orderForm.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white/5 backdrop-blur-sm text-white font-semibold hover:bg-white/10 transition-all duration-300 border border-white/10"
          >
            Ready to create your stunning presentation?
            <i className="fas fa-arrow-right"></i>
          </motion.button>
        </motion.div>
      </div>

      {/* Image Modal - Premium Version */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={closeModal}
                className="absolute -top-14 right-0 text-white text-3xl hover:text-gray-300 transition-colors z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className="fas fa-times-circle"></i>
              </motion.button>
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="w-full h-auto max-h-[85vh] object-contain bg-black/50"
                />
                
                {/* Image Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white text-sm text-center">
                    <i className="fas fa-info-circle mr-2"></i>
                    Click outside the image or press ESC to close
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;