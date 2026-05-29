import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Portfolio from '../components/Portfolio';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';
import Form from '../components/Form';

export default function Home() {
    const [scrolled, setScrolled] = useState(false);
    const [user, setUser] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        // Navbar scroll effect
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        // Get logged-in user
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Logout Function
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/home";
    };

    // Handle Guest Click with Premium Modal
    const handleGuestClick = (e) => {
        const token = localStorage.getItem("token");
        
        // Check if the clicked element is an interactive element that shouldn't trigger the guest check
        const isInteractive = e.target.closest('a, button, [role="button"], input, textarea, select');
        if (isInteractive) return;

        // If user NOT logged in
        if (!token) {
            setShowAuthModal(true);
        }
    };

    // Close modal
    const closeModal = () => {
        setShowAuthModal(false);
    };

    // Redirect to login
    const redirectToLogin = () => {
        window.location.href = "http://localhost:3000/";
    };

    // Redirect to register
    const redirectToRegister = () => {
        window.location.href = "http://localhost:3000/register";
    };

    // Page transition variants
    const pageVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.5 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    return (
        <>
            <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30"
                onClick={handleGuestClick}
            >
                {/* Premium Background Effects */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700" />
                    
                    {/* Animated Grid */}
                    <div 
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                                             linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px',
                        }}
                    />
                </div>

                {/* Navbar */}
                <Navbar
                    scrolled={scrolled}
                    logout={logout}
                    user={user}
                />

                {/* Hero Section */}
                <Hero />

                {/* Services Section */}
                <Services />

                {/* How It Works */}
                <HowItWorks />

                {/* Portfolio */}
                <Portfolio />

                {/* Pricing */}
                <Pricing />

                {/* Contact Form */}
                <Form />

                {/* Footer */}
                <Footer />
            </motion.div>

            {/* Premium Authentication Modal */}
            <AnimatePresence>
                {showAuthModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-md w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Card */}
                            <div className="relative glass-card p-8 rounded-2xl shadow-2xl">
                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                                >
                                    <i className="fas fa-times text-xl"></i>
                                </button>

                                {/* Icon */}
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                    <i className="fas fa-star text-white text-3xl"></i>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-center text-white mb-2">
                                    Welcome to SLIDENOVA
                                </h3>
                                
                                <p className="text-gray-300 text-center mb-6">
                                    Please login or register to access our premium services
                                </p>

                                {/* Benefits List */}
                                <div className="space-y-3 mb-8">
                                    {[
                                        { icon: "fas fa-file-alt", text: "Track your orders" },
                                        { icon: "fas fa-history", text: "View order history" },
                                        { icon: "fas fa-clock", text: "Priority support" },
                                        { icon: "fas fa-gem", text: "Exclusive discounts" }
                                    ].map((benefit, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-center gap-3 text-gray-300"
                                        >
                                            <i className={`${benefit.icon} text-indigo-400 w-5`}></i>
                                            <span className="text-sm">{benefit.text}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={redirectToLogin}
                                        className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <i className="fas fa-sign-in-alt mr-2"></i>
                                        Login to Your Account
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={redirectToRegister}
                                        className="w-full py-3 rounded-full glass text-white font-semibold transition-all duration-300 border border-white/10 hover:bg-white/10"
                                    >
                                        <i className="fas fa-user-plus mr-2"></i>
                                        Create New Account
                                    </motion.button>
                                </div>

                                {/* Or Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/10"></div>
                                    </div>
                                    <div className="relative flex justify-center text-xs">
                                        <span className="px-2 bg-transparent text-gray-400">Continue as Guest</span>
                                    </div>
                                </div>

                                {/* Guest Option */}
                                <p className="text-center text-gray-400 text-sm">
                                    You can still browse our portfolio and services
                                </p>
                            </div>

                            {/* Glow Effect Behind Modal */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-3xl blur-2xl -z-10" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}