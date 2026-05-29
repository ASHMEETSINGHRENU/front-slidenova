import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SectionDivider = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="relative py-8">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute left-1/2 transform -translate-x-1/2 -top-4"
      >
        <div className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-indigo-500" />
        </div>
      </motion.div>
    </div>
  );
};

export default SectionDivider;