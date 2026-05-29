import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence, useInView } from "framer-motion";

export default function Login() {
    const [data, setData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Load saved email if remember me was checked
    useEffect(() => {
        const savedEmail = localStorage.getItem("rememberedEmail");
        if (savedEmail) {
            setData(prev => ({ ...prev, email: savedEmail }));
            setRememberMe(true);
        }
    }, []);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async () => {
        setError("");

        if (!data.email || !data.password) {
            return setError("All fields are required");
        }

        try {
            setLoading(true);
            const res = await axios.post("https://backend-slidenova.onrender.com/api/login", data);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            
            // Save email if remember me is checked
            if (rememberMe) {
                localStorage.setItem("rememberedEmail", data.email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }
            
            // Show success animation before redirect
            setTimeout(() => {
                window.location.href = "/home";
            }, 1000);
        } catch (err) {
            console.error(err);
            setError(err.response?.data || "Login failed. Try again.");
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 30 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 25,
                duration: 0.6,
            },
        },
    };

    const floatVariants = {
        initial: { y: 0 },
        animate: {
            y: [-15, 15, -15],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    const iconVariants = {
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10,
            },
        },
        tap: { scale: 0.95 },
    };

    return (
        <div 
            ref={sectionRef}
            className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #0a0a0a 0%, #0f0f1a 50%, #1a0b2e 100%)"
            }}
        >
            {/* Animated Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Floating Gradient Orbs */}
                <motion.div
                    variants={floatVariants}
                    initial="initial"
                    animate="animate"
                    className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
                />
                <motion.div
                    variants={floatVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 2 }}
                    className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
                />
                <motion.div
                    variants={floatVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 4 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-3xl"
                />
                <motion.div
                    variants={floatVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: 1 }}
                    className="absolute top-40 right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
                />
                
                {/* Animated Grid Pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                    }}
                />
                
                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-5" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                }} />
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: Math.random() * 0.5,
                        }}
                        animate={{
                            y: [null, -150],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 8,
                            ease: "linear",
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            {/* Main Container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="w-full max-w-md relative z-10"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                        className="inline-block p-4 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl mb-5 backdrop-blur-sm border border-white/10"
                    >
                        <i className="fas fa-star-of-life text-4xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"></i>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold mb-2">
                        Welcome{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Back
                        </span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-3" />
                    <p className="text-gray-400 text-sm">Sign in to your SlideNova account</p>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    variants={cardVariants}
                    className="relative group"
                >
                    {/* Animated Glow Border */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500" />
                    
                    {/* Card Content */}
                    <div className="relative glass-card rounded-2xl overflow-hidden">
                        {/* Card Header */}
                        <div className="relative bg-gradient-to-r from-indigo-600/20 to-purple-600/20 px-6 py-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
                                    <i className="fas fa-sign-in-alt text-white text-sm"></i>
                                </div>
                                <h3 className="text-white font-semibold">Login to Account</h3>
                            </div>
                            
                            {/* Decorative Line */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                        </div>

                        {/* Card Body */}
                        <div className="p-6">
                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-exclamation-circle text-red-400 text-sm"></i>
                                            <p className="text-red-400 text-sm flex-1">{error}</p>
                                            <button 
                                                onClick={() => setError("")} 
                                                className="text-red-400 hover:text-red-300 transition"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Success Message while redirecting */}
                            <AnimatePresence>
                                {loading && !error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        className="mb-5 p-3 rounded-xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-spinner fa-spin text-green-400 text-sm"></i>
                                            <p className="text-green-400 text-sm">Login successful! Redirecting...</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Form Fields */}
                            <div className="space-y-4">
                                {/* Email Field */}
                                <motion.div variants={itemVariants}>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        <i className="fas fa-envelope mr-2 text-indigo-400"></i>
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"></i>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={data.email}
                                            onChange={handleChange}
                                            onKeyPress={handleKeyPress}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                        />
                                    </div>
                                </motion.div>

                                {/* Password Field */}
                                <motion.div variants={itemVariants}>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        <i className="fas fa-lock mr-2 text-indigo-400"></i>
                                        Password
                                    </label>
                                    <div className="relative">
                                        <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"></i>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Enter your password"
                                            value={data.password}
                                            onChange={handleChange}
                                            onKeyPress={handleKeyPress}
                                            className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-400 transition"
                                        >
                                            <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </button>
                                    </div>
                                </motion.div>

                                {/* Remember Me & Forgot Password */}
                                <motion.div variants={itemVariants} className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-gray-400 text-sm">Remember me</span>
                                    </label>
                                    <a 
                                        href="" 
                                        className="text-indigo-400 hover:text-indigo-300 text-sm transition-all duration-300 hover:underline"
                                    >
                                        Forgot password?
                                    </a>
                                </motion.div>

                                {/* Submit Button */}
                                <motion.div variants={itemVariants} className="pt-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold overflow-hidden group/btn shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {loading ? (
                                                <>
                                                    <i className="fas fa-spinner fa-spin"></i>
                                                    Logging in...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-sign-in-alt"></i>
                                                    Login
                                                </>
                                            )}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 group-hover/btn:translate-x-full transition-transform duration-700" />
                                    </motion.button>
                                </motion.div>
                            </div>

                            {/* Demo Credentials Info */}
                            <motion.div 
                                variants={itemVariants}
                                className="mt-6 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10"
                            >
                                <p className="text-gray-500 text-xs text-center">
                                    <i className="fas fa-info-circle text-indigo-400 mr-1"></i>
                                    Demo credentials available upon request
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Links */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8 text-center"
                >
                    <p className="text-gray-400 text-sm">
                        Don't have an account?{" "}
                        <a 
                            href="/register" 
                            className="text-indigo-400 font-semibold hover:text-indigo-300 transition-all duration-300 inline-flex items-center gap-1 group"
                        >
                            Create Account
                            <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                        </a>
                    </p>
                </motion.div>

                {/* Social Login Options */}
                <motion.div
                    variants={itemVariants}
                    className="mt-6"
                >
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-4 bg-transparent text-gray-500">Or continue with</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-3">
                        {[
                            { icon: "fab fa-google", color: "hover:bg-red-500/10 hover:border-red-500/20", text: "Google" },
                            { icon: "fab fa-github", color: "hover:bg-gray-500/10 hover:border-gray-500/20", text: "GitHub" },
                            { icon: "fab fa-linkedin-in", color: "hover:bg-blue-500/10 hover:border-blue-500/20", text: "LinkedIn" }
                        ].map((social, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex-1 py-2 rounded-xl glass border border-white/10 text-gray-400 ${social.color} transition-all duration-300`}
                            >
                                <i className={`${social.icon} text-lg`}></i>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8 flex justify-center gap-4 flex-wrap"
                >
                    {[
                        { icon: "fas fa-shield-alt", text: "Secure Login" },
                        { icon: "fas fa-bolt", text: "Fast Access" },
                        { icon: "fas fa-headset", text: "24/7 Support" }
                    ].map((feature, idx) => (
                        <motion.div 
                            key={idx} 
                                            whileHover={{ y: -2 }}
                            className="flex items-center gap-1 text-gray-500 text-xs"
                        >
                            <i className={`${feature.icon} text-indigo-400 text-xs`}></i>
                            <span>{feature.text}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}