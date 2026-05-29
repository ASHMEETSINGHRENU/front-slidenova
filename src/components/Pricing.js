import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Pricing = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  const plans = [
    {
      name: "Basic",
      description: "Simple presentations for students",
      price: "₹300 – ₹800",
      features: ["Up to 10 slides", "Basic animations", "Standard templates", "48-hour delivery"],
      gradient: "from-blue-500 to-cyan-500",
      icon: "fas fa-star",
      bgGlow: "from-blue-500/20 to-cyan-500/20",
      popular: false
    },
    {
      name: "Standard",
      description: "Business & professional PPTs",
      price: "₹1000 – ₹3000",
      features: ["Up to 20 slides", "Custom graphics", "Premium templates", "24-hour delivery", "2 revisions"],
      gradient: "from-indigo-500 to-purple-500",
      icon: "fas fa-gem",
      bgGlow: "from-indigo-500/20 to-purple-500/20",
      popular: true,
      highlight: true
    },
    {
      name: "Premium",
      description: "Pitch decks & advanced designs",
      price: "₹3000+",
      features: ["Unlimited slides", "Full custom design", "Infographics & charts", "12-hour delivery", "Unlimited revisions"],
      gradient: "from-purple-500 to-pink-500",
      icon: "fas fa-crown",
      bgGlow: "from-purple-500/20 to-pink-500/20",
      popular: false
    }
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: (i) => ({
      opacity: 0,
      y: 50,
      scale: 0.95,
    }),
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    }),
    hover: {
      y: -15,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.4,
      },
    }),
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.2,
      },
    },
  };

  return (
    <section 
      ref={sectionRef}
      id="pricing" 
      className="relative py-24 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent pointer-events-none" />
      
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <div className="inline-block px-5 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-5 shadow-lg">
            <span className="text-sm text-indigo-400 font-medium">💰 Pricing Plans</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Quick{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Pricing Idea
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-5" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Final pricing depends on slides, complexity, and deadline
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              whileHover="hover"
              className={`relative group ${plan.popular ? 'md:scale-105 z-10' : ''}`}
            >
              {/* Animated Glow Border - Only for popular plan */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500"
                />
              )}
              
              {/* Card Content */}
              <motion.div 
                className={`relative rounded-2xl overflow-hidden ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm border border-white/20 shadow-2xl' 
                    : 'glass-card'
                }`}
              >
                {/* Card Inner Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    variants={badgeVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20"
                  >
                    <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                      <i className="fas fa-fire text-xs"></i>
                      MOST POPULAR
                    </div>
                  </motion.div>
                )}
                
                <div className="p-8">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative overflow-hidden group`}
                  >
                    <div className="absolute inset-0 bg-white/20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
                    <i className={`${plan.icon} text-white text-2xl relative z-10`}></i>
                  </motion.div>
                  
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  
                  {/* Price */}
                  <motion.div 
                    className={`text-3xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent mb-6`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {plan.price}
                  </motion.div>
                  
                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        custom={i}
                        variants={featureVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="flex items-center gap-2 text-gray-300 text-sm group/item"
                        whileHover={{ x: 5 }}
                      >
                        <motion.i 
                          className={`fas fa-check-circle text-xs bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                          transition={{ duration: 0.3 }}
                        ></motion.i>
                        <span>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <motion.a
                    href="#order-form"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block text-center py-3.5 rounded-full font-semibold transition-all duration-300 relative overflow-hidden group ${
                      plan.popular
                        ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-500/25'
                        : 'glass text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Get Quote
                      <motion.i 
                        className="fas fa-arrow-right text-sm"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </span>
                    {plan.popular && (
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-white/10">
            <i className="fas fa-tag text-indigo-400 text-sm"></i>
            <span className="text-gray-300 text-sm">Need custom pricing? </span>
            <motion.a
              href="#contact"
              whileHover={{ x: 5 }}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold inline-flex items-center gap-1"
            >
              Contact us <i className="fas fa-arrow-right text-xs"></i>
            </motion.a>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: "fas fa-clock", text: "Fast Turnaround" },
            { icon: "fas fa-lock", text: "Secure Payment" },
            { icon: "fas fa-headset", text: "24/7 Support" },
            { icon: "fas fa-sync-alt", text: "Free Revisions" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 text-gray-400 text-sm"
            >
              <i className={`${item.icon} text-indigo-400`}></i>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;