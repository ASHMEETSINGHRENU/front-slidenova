import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence, useInView } from "framer-motion";

export default function Register() {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Password strength checker
    useEffect(() => {
        let strength = 0;
        if (data.password.length >= 6) strength++;
        if (data.password.match(/[a-z]/) && data.password.match(/[A-Z]/)) strength++;
        if (data.password.match(/\d/)) strength++;
        if (data.password.match(/[^a-zA-Z\d]/)) strength++;
        setPasswordStrength(strength);
    }, [data.password]);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async () => {
        setError("");
        
        if (!data.username || !data.email || !data.password) {
            return setError("All fields are required");
        }

        if (data.password.length < 6) {
            return setError("Password must be at least 6 characters");
        }

        try {
            setLoading(true);
            await axios.post("https://backend-slidenova.onrender.com/api/register", data);
            
            // Show success message before redirect
            setError("");
            setTimeout(() => {
                window.location.href = "/";
            }, 1500);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Registration failed. Try again.");
        } finally {
            setLoading(false);
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

    const getStrengthColor = () => {
        if (passwordStrength === 0) return "bg-gray-600";
        if (passwordStrength === 1) return "bg-red-500";
        if (passwordStrength === 2) return "bg-orange-500";
        if (passwordStrength === 3) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthText = () => {
        if (passwordStrength === 0) return "No password";
        if (passwordStrength === 1) return "Weak";
        if (passwordStrength === 2) return "Fair";
        if (passwordStrength === 3) return "Good";
        return "Strong";
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
                {[...Array(40)].map((_, i) => (
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
                        Create{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Account
                        </span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-3" />
                    <p className="text-gray-400 text-sm">Join SlideNova today</p>
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
                                    <i className="fas fa-user-plus text-white text-sm"></i>
                                </div>
                                <h3 className="text-white font-semibold">Registration Form</h3>
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
                                            <i className="fas fa-check-circle text-green-400 text-sm"></i>
                                            <p className="text-green-400 text-sm">Registration successful! Redirecting to login...</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Form Fields */}
                            <div className="space-y-4">
                                {/* Username Field */}
                                <motion.div variants={itemVariants}>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        <i className="fas fa-user mr-2 text-indigo-400"></i>
                                        Username
                                    </label>
                                    <div className="relative">
                                        <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"></i>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Choose a username"
                                            value={data.username}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                        />
                                    </div>
                                </motion.div>

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
                                            placeholder="Create a password"
                                            value={data.password}
                                            onChange={handleChange}
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
                                    
                                    {/* Password Strength Indicator */}
                                    {data.password.length > 0 && (
                                        <div className="mt-2">
                                            <div className="flex gap-1 mb-1">
                                                {[1, 2, 3, 4].map((level) => (
                                                    <div
                                                        key={level}
                                                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                                            passwordStrength >= level
                                                                ? getStrengthColor()
                                                                : "bg-white/10"
                                                        }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className={`text-xs ${getStrengthColor().replace("bg-", "text-")}`}>
                                                Password strength: {getStrengthText()}
                                            </p>
                                        </div>
                                    )}
                                </motion.div>

                                {/* Terms and Conditions */}
                                <motion.div variants={itemVariants} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="w-4 h-4 rounded border-white/20 bg-white/5 checked:bg-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="terms" className="text-gray-400 text-xs">
                                        I agree to the{" "}
                                        <a href="" className="text-indigo-400 hover:text-indigo-300">
                                            Terms of Service
                                        </a>{" "}
                                        and{" "}
                                        <a href="" className="text-indigo-400 hover:text-indigo-300">
                                            Privacy Policy
                                        </a>
                                    </label>
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
                                                    Creating Account...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-user-plus"></i>
                                                    Register Now
                                                </>
                                            )}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 group-hover/btn:translate-x-full transition-transform duration-700" />
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Footer Links */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8 text-center"
                >
                    <p className="text-gray-400 text-sm">
                        Already have an account?{" "}
                        <a 
                            href="/" 
                            className="text-indigo-400 font-semibold hover:text-indigo-300 transition-all duration-300 inline-flex items-center gap-1 group"
                        >
                            Sign In
                            <i className="fas fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
                        </a>
                    </p>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8 flex justify-center gap-4 flex-wrap"
                >
                    {[
                        { icon: "fas fa-shield-alt", text: "Secure Account" },
                        { icon: "fas fa-rocket", text: "Fast Delivery" },
                        { icon: "fas fa-headset", text: "24/7 Support" }
                    ].map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-gray-500 text-xs">
                            <i className={`${feature.icon} text-indigo-400 text-xs`}></i>
                            <span>{feature.text}</span>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}