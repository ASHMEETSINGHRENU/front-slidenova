import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: "fas fa-graduation-cap",
      title: "Student PPT",
      subtitle: "Academic Excellence",
      description: "College presentations, seminars, and project PPTs with clear structure and clean design.",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Structured layouts", "Academic formatting", "Citation ready"],
      price: "Starting ₹300"
    },
    {
      icon: "fas fa-building",
      title: "Business PPT",
      subtitle: "Corporate Professional",
      description: "Professional slides for meetings, reports, and client presentations that impress stakeholders.",
      gradient: "from-indigo-500 to-purple-500",
      features: ["Brand guidelines", "Data visualization", "Executive summary"],
      price: "Starting ₹1000"
    },
    {
      icon: "fas fa-rocket",
      title: "Pitch Deck",
      subtitle: "Investor Ready",
      description: "Startup investor presentations with strong storytelling and visual impact that converts.",
      gradient: "from-purple-500 to-pink-500",
      features: ["Storytelling flow", "Market analysis", "Financial charts"],
      price: "Starting ₹3000"
    },
    {
      icon: "fas fa-sync-alt",
      title: "PPT Redesign",
      subtitle: "Modern Makeover",
      description: "Convert your old or basic slides into modern, professional presentations that stand out.",
      gradient: "from-green-500 to-emerald-500",
      features: ["Modern templates", "Visual enhancement", "Brand refresh"],
      price: "Starting ₹500"
    }
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="services" className="relative py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full glass border border-white/10 mb-4">
            <span className="text-sm text-indigo-400">✨ Our Expertise</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What We{' '}
            <span className="gradient-text">Provide</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional presentation solutions tailored to your specific needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`} />
              
              {/* Card */}
              <div className="relative glass-card p-6 h-full flex flex-col">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 bg-gradient-to-r ${service.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <i className={`${service.icon} text-white text-2xl`}></i>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                <p className={`text-sm font-semibold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent mb-3`}>
                  {service.subtitle}
                </p>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p className={`text-xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.price}
                      </p>
                    </div>
                    <motion.a
                      href="#order"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg bg-gradient-to-r ${service.gradient} text-white text-sm font-semibold hover:shadow-lg transition-all`}
                    >
                      Order Now
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;