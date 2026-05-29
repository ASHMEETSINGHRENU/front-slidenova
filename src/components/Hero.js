import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const Hero = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, setDimensions]); // ✅ Fixed: Added setDimensions to dependencies

  // Glowing orbs with fixed positions
  const orbs = [
    { size: 400, color: 'rgba(99, 102, 241, 0.15)', top: '-20%', left: '-10%', delay: 0, duration: 20 },
    { size: 350, color: 'rgba(168, 85, 247, 0.12)', top: '50%', right: '-15%', delay: 5, duration: 25 },
    { size: 300, color: 'rgba(236, 72, 153, 0.1)', bottom: '-10%', left: '20%', delay: 10, duration: 22 },
    { size: 250, color: 'rgba(59, 130, 246, 0.08)', top: '30%', left: '30%', delay: 15, duration: 28 },
    { size: 200, color: 'rgba(139, 92, 246, 0.12)', bottom: '40%', right: '25%', delay: 20, duration: 18 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 25,
        duration: 0.8,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.1,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0f0f1a 50%, #1a0b2e 100%)' }}
    >
      {/* Animated Spotlight Effect - Fixed */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${springX}px ${springY}px, rgba(99, 102, 241, 0.2) 0%, rgba(99, 102, 241, 0.05) 30%, rgba(0, 0, 0, 0) 70%)`,
        }}
      />

      {/* Static Background Gradient Mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <svg className="absolute inset-0 w-full h-full">
            <defs>
              <radialGradient id="grad1" cx="20%" cy="30%" r="50%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="grad2" cx="80%" cy="70%" r="50%">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ec4899" stopOpacity="0.15"/>
                <stop offset="100%" stopColor="#ec4899" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad1)"/>
            <rect width="100%" height="100%" fill="url(#grad2)"/>
            <rect width="100%" height="100%" fill="url(#grad3)"/>
          </svg>
        </div>
      </div>

      {/* Floating Glowing Orbs - Fixed Positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: orb.size,
              height: orb.size,
              background: `radial-gradient(circle, ${orb.color} 0%, rgba(0, 0, 0, 0) 70%)`,
              top: orb.top,
              left: orb.left,
              right: orb.right,
              bottom: orb.bottom,
            }}
            animate={{
              x: ['-5%', '5%', '-3%', '3%', '-5%'],
              y: ['-3%', '5%', '-5%', '3%', '-3%'],
              rotate: [0, 5, -5, 3, 0],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: orb.delay,
            }}
          />
        ))}
      </div>

      {/* Animated Grid Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear',
        }}
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 relative z-10 py-32"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            variants={badgeVariants}
            className="inline-block mb-8"
          >
            <div className="px-5 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 inline-flex items-center gap-2 shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-sm text-gray-200 font-medium">Available for work</span>
              <span className="text-xs text-gray-400">✨ Premium Quality</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]"
          >
            <span className="text-white">Professional</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PowerPoint
            </span>
            <br />
            <span className="text-white">Presentations</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            We help students, startups, and businesses create clean, modern, 
            and high-quality presentations—saving your time and improving your results.
          </motion.p>

          {/* Features */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-8 mb-12"
          >
            {[
              { icon: 'fas fa-clock', text: 'Fast delivery', color: 'text-blue-400' },
              { icon: 'fas fa-palette', text: 'Custom design', color: 'text-purple-400' },
              { icon: 'fas fa-tag', text: 'Affordable pricing', color: 'text-emerald-400' },
              { icon: 'fas fa-star', text: 'Premium quality', color: 'text-amber-400' },
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <i className={`${feature.icon} ${feature.color} text-sm`}></i>
                <span className="text-gray-300 text-sm font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Fixed anchor tags with proper href */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-5"
          >
            <motion.a
              href="#order-form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold text-lg overflow-hidden group shadow-2xl inline-flex items-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                Order Now 
                <motion.i 
                  className="fas fa-arrow-right"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
            </motion.a>

            <motion.a
              href="#portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative px-10 py-4 rounded-full border-2 border-white/20 text-white font-semibold text-lg hover:border-indigo-500/50 transition-all duration-300 flex items-center gap-2 group bg-white/5 backdrop-blur-sm"
            >
              View Portfolio
              <i className="fas fa-eye group-hover:translate-x-1 transition-transform duration-300"></i>
            </motion.a>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            variants={itemVariants}
            className="mt-20 pt-10 border-t border-white/10"
          >
            <div className="flex flex-wrap justify-center gap-12">
              {[
                { number: '500+', label: 'Projects Completed', icon: 'fas fa-check-circle' },
                { number: '200+', label: 'Happy Clients', icon: 'fas fa-users' },
                { number: '4.9', label: 'Client Rating', icon: 'fas fa-star' },
                { number: '24h', label: 'Fast Delivery', icon: 'fas fa-clock' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <i className={`${stat.icon} text-indigo-400 text-sm`}></i>
                    <span className="text-2xl font-bold text-white">{stat.number}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-7 h-12 rounded-full border-2 border-white/20 flex justify-center bg-white/5 backdrop-blur-sm">
              <motion.div 
                className="w-1.5 h-3 bg-gradient-to-t from-indigo-400 to-purple-400 rounded-full mt-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;