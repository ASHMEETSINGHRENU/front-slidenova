// client/src/components/HowItWorks.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
    const [hoveredStep, setHoveredStep] = useState(null);
    
    const steps = [
        {
            number: "01",
            title: "Submit Requirement",
            description: "Share your topic, content, and deadline with us. Tell us about your vision and requirements.",
            icon: "fas fa-file-alt",
            iconBg: "from-blue-500 to-cyan-500",
            details: ["Share your topic", "Provide content", "Set deadline"],
            timeEstimate: "10-15 mins"
        },
        {
            number: "02",
            title: "We Design",
            description: "Our expert team creates a professional, well-structured presentation tailored to your needs.",
            icon: "fas fa-paint-brush",
            iconBg: "from-indigo-500 to-purple-500",
            details: ["Custom design", "Expert review", "Quality check"],
            timeEstimate: "24-48 hours"
        },
        {
            number: "03",
            title: "Get Delivery",
            description: "Receive your polished PPT on time, ready to present with confidence and impact.",
            icon: "fas fa-download",
            iconBg: "from-purple-500 to-pink-500",
            details: ["Final delivery", "Revision support", "Presentation tips"],
            timeEstimate: "Instant"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const stepVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.9
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const lineVariants = {
        hidden: { width: 0 },
        visible: { 
            width: "100%",
            transition: { duration: 1, delay: 0.5 }
        }
    };

    return (
        <section id="how-it-works" className="py-24 bg-gradient-to-br from-gray-50 via-white to-indigo-50/20 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="text-center mb-16"
                >
                    <motion.div 
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-block px-4 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-4"
                    >
                        <span className="text-indigo-600 font-semibold text-sm">⚡ Simple Process</span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        How It{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Works
                        </span>
                    </h2>
                    
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mb-4"></div>
                    
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Three simple steps to get your professional presentation
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Animated Connecting Line */}
                    <motion.div 
                        variants={lineVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="hidden lg:block absolute top-1/3 left-0 w-full h-0.5 bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200 -z-0"
                    ></motion.div>

                    {/* Animated Dots on Line */}
                    <div className="hidden lg:block absolute top-1/3 left-1/4 w-3 h-3 bg-indigo-500 rounded-full -z-0 animate-pulse"></div>
                    <div className="hidden lg:block absolute top-1/3 left-2/4 w-3 h-3 bg-purple-500 rounded-full -z-0 animate-pulse delay-300"></div>
                    <div className="hidden lg:block absolute top-1/3 left-3/4 w-3 h-3 bg-pink-500 rounded-full -z-0 animate-pulse delay-600"></div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                variants={stepVariants}
                                whileHover={{ 
                                    y: -15,
                                    transition: { type: "spring", stiffness: 300 }
                                }}
                                onHoverStart={() => setHoveredStep(idx)}
                                onHoverEnd={() => setHoveredStep(null)}
                                className="relative group"
                            >
                                {/* Glow Effect */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${step.iconBg} rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500`}></div>
                                
                                {/* Card Content */}
                                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                                    
                                    {/* Step Number Badge */}
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: idx * 0.2, type: "spring" }}
                                        className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center shadow-md">
                                            <span className={`text-lg font-bold bg-gradient-to-r ${step.iconBg} bg-clip-text text-transparent`}>
                                                {step.number}
                                            </span>
                                        </div>
                                    </motion.div>

                                    {/* Icon Container */}
                                    <motion.div 
                                        whileHover={{ rotate: 360, scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className={`w-24 h-24 bg-gradient-to-r ${step.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative overflow-hidden group-hover:shadow-xl transition-all`}
                                    >
                                        <div className="absolute inset-0 bg-white/20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                                        <i className={`${step.icon} text-white text-4xl relative z-10`}></i>
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                                        {step.title}
                                    </h3>
                                    
                                    {/* Description */}
                                    <p className="text-gray-600 text-center text-sm leading-relaxed mb-5">
                                        {step.description}
                                    </p>

                                    {/* Details List */}
                                    <div className="space-y-2 mb-5">
                                        {step.details.map((detail, i) => (
                                            <motion.div 
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="flex items-center justify-center gap-2 text-sm text-gray-600"
                                            >
                                                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.iconBg}`}></div>
                                                <span>{detail}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Time Estimate */}
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <div className="flex items-center justify-center gap-2">
                                            <i className="fas fa-clock text-indigo-500 text-sm"></i>
                                            <p className="text-xs text-gray-500">
                                                Estimated time: <span className="font-semibold text-gray-700">{step.timeEstimate}</span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Animated Border on Hover */}
                                    <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-${step.iconBg.split('-')[1]}-200 transition-all duration-300 pointer-events-none`}></div>
                                </div>

                                {/* Floating Particles on Hover */}
                                {hoveredStep === idx && (
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ 
                                                    opacity: [0, 1, 0],
                                                    scale: [0, 1, 0],
                                                    y: [0, -60],
                                                    x: [0, (i - 3.5) * 25]
                                                }}
                                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                                                className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${step.iconBg}`}
                                                style={{
                                                    bottom: '30%',
                                                    left: `${20 + i * 8}%`
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Progress Indicator */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-16"
                >
                    <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-check-circle text-green-600"></i>
                                </div>
                                <div>
                                    <p className="text-gray-800 font-semibold">100% Satisfaction</p>
                                    <p className="text-gray-500 text-sm">Guaranteed quality</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-clock text-blue-600"></i>
                                </div>
                                <div>
                                    <p className="text-gray-800 font-semibold">On-Time Delivery</p>
                                    <p className="text-gray-500 text-sm">Always meet deadlines</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                    <i className="fas fa-headset text-purple-600"></i>
                                </div>
                                <div>
                                    <p className="text-gray-800 font-semibold">24/7 Support</p>
                                    <p className="text-gray-500 text-sm">Dedicated assistance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom CTA */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="text-center mt-12"
                >
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
                        <span className="px-6 py-2 text-gray-600">Ready to get started?</span>
                        <motion.a 
                            href="#order-form"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
                        >
                            Start Your Project <i className="fas fa-arrow-right ml-2"></i>
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }
                .delay-700 {
                    animation-delay: 0.7s;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.2); }
                }
                .animate-pulse-custom {
                    animation: pulse 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default HowItWorks;