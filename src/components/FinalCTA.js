import React from 'react';
import { motion } from 'framer-motion';

const FinalCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-600/30 via-transparent to-transparent" />
      
      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, -100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="glass-card p-12 md:p-16 text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm mb-6"
          >
            <span className="text-sm text-indigo-300">Ready to impress? ✨</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Need a Professional PPT Without the Stress?
          </h2>
          
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let us handle the design while you focus on your presentation.
          </p>
          
          <motion.a
            href="#order"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg overflow-hidden group shadow-2xl"
          >
            <span className="relative z-10">Order Your PPT Now</span>
            <i className="fas fa-arrow-right relative z-10 group-hover:translate-x-1 transition-transform"></i>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;