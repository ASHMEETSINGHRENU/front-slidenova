// client/src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => setSubscribed(false), 3000);
            setEmail("");
        }
    };

    const footerLinks = {
        quickLinks: [
            { name: "Services", href: "#services", icon: "fas fa-cog" },
            { name: "Portfolio", href: "#portfolio", icon: "fas fa-images" },
            { name: "Pricing", href: "#pricing", icon: "fas fa-tag" },
            { name: "How It Works", href: "#how-it-works", icon: "fas fa-chart-line" },
            { name: "Contact", href: "#contact", icon: "fas fa-envelope" }
        ],
        legal: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Refund Policy", href: "#" },
            { name: "Cookie Policy", href: "#" }
        ],
        social: [
            { name: "Twitter", icon: "fab fa-twitter", color: "hover:bg-twitter", link: "#" },
            { name: "LinkedIn", icon: "fab fa-linkedin-in", color: "hover:bg-linkedin", link: "#" },
            { name: "Instagram", icon: "fab fa-instagram", color: "hover:bg-instagram", link: "#" },
            { name: "Facebook", icon: "fab fa-facebook-f", color: "hover:bg-facebook", link: "#" },
            { name: "YouTube", icon: "fab fa-youtube", color: "hover:bg-youtube", link: "#" }
        ]
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-16 pb-8 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/5 rounded-full filter blur-3xl animate-pulse delay-700"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    
                    {/* Brand Section with Animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2"
                        >
                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                <i className="fas fa-star-of-life text-white text-lg"></i>
                            </div>
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                SlideNova
                            </h3>
                        </motion.div>
                        
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Professional presentation design platform helping students, startups, and businesses create stunning PowerPoint presentations that leave a lasting impression.
                        </p>
                        
                        {/* Trust Badges */}
                        <div className="flex gap-3 pt-2">
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <i className="fas fa-star text-yellow-500 text-xs"></i>
                                <span>4.9/5 Rating</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <i className="fas fa-users text-indigo-400 text-xs"></i>
                                <span>500+ Clients</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <i className="fas fa-clock text-green-400 text-xs"></i>
                                <span>24/7 Support</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="font-semibold text-lg mb-5 relative inline-block">
                            Quick Links
                            <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link, idx) => (
                                <motion.li 
                                    key={idx}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a 
                                        href={link.href} 
                                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <i className={`${link.icon} text-indigo-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity`}></i>
                                        <span>{link.name}</span>
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Legal Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="font-semibold text-lg mb-5 relative inline-block">
                            Legal
                            <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link, idx) => (
                                <motion.li 
                                    key={idx}
                                    whileHover={{ x: 5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <a 
                                        href={link.href} 
                                        className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2"
                                    >
                                        <i className="fas fa-chevron-right text-indigo-400 text-xs"></i>
                                        <span>{link.name}</span>
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h4 className="font-semibold text-lg mb-5 relative inline-block">
                            Stay Updated
                            <div className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                        </h4>
                        <p className="text-gray-400 text-sm mb-4">
                            Subscribe to get special offers and design tips!
                        </p>
                        
                        <form onSubmit={handleSubscribe} className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                required
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                            >
                                Subscribe
                            </motion.button>
                        </form>
                        
                        <AnimatePresence>
                            {subscribed && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mt-2 text-green-400 text-sm flex items-center gap-1"
                                >
                                    <i className="fas fa-check-circle"></i>
                                    <span>Subscribed successfully!</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Contact & Social Row */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="border-t border-white/10 pt-8 mb-8"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                    <i className="fas fa-envelope text-indigo-400"></i>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Email Us</p>
                                    <a href="mailto:hello@slidenova.com" className="text-white hover:text-indigo-400 transition">
                                        hello@slidenova.com
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                    <i className="fab fa-whatsapp text-green-400"></i>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">WhatsApp</p>
                                    <a href="https://wa.me/919876543210" className="text-white hover:text-green-400 transition">
                                        +91 98765 43210
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                    <i className="fas fa-clock text-indigo-400"></i>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Response Time</p>
                                    <p className="text-white">Within 2 hours</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {footerLinks.social.map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href={social.link}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 group`}
                                >
                                    <i className={`${social.icon} text-gray-400 group-hover:text-white transition-colors`}></i>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Copyright Section */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="border-t border-white/10 pt-8 text-center"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} SlideNova. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <a href="" className="text-gray-400 hover:text-white text-xs transition">Privacy Policy</a>
                            <a href="" className="text-gray-400 hover:text-white text-xs transition">Terms of Service</a>
                            <a href="" className="text-gray-400 hover:text-white text-xs transition">Sitemap</a>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <span>Made with</span>
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                className="text-red-500"
                            >
                                ❤️
                            </motion.span>
                            <span>by Ashmeet Singh Renu</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll to Top Button */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        whileHover={{ scale: 1.1, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                    >
                        <i className="fas fa-arrow-up text-white group-hover:animate-bounce"></i>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Add custom styles */}
            <style jsx>{`
                .bg-twitter:hover { background: #1DA1F2; }
                .bg-linkedin:hover { background: #0077B5; }
                .bg-instagram:hover { background: #E4405F; }
                .bg-facebook:hover { background: #1877F2; }
                .bg-youtube:hover { background: #FF0000; }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.6; }
                }
                .animate-pulse {
                    animation: pulse 3s ease-in-out infinite;
                }
                .delay-1000 {
                    animation-delay: 1s;
                }
                .delay-700 {
                    animation-delay: 0.7s;
                }
            `}</style>
        </footer>
    );
};

export default Footer;