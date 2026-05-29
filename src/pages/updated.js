import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from '../components/Navbar';

export default function Update() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        photo: null
    });

    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Load user data
    useEffect(() => {
        const loadUser = async () => {
            try {
                // Load from localStorage
                const localUser = JSON.parse(localStorage.getItem("user"));
                if (localUser) {
                    setForm({
                        username: localUser.username || "",
                        email: localUser.email || "",
                        password: "",
                        photo: null
                    });
                    if (localUser.photo) {
                        setPreview(`http://localhost:5000/uploads/${localUser.photo}`);
                    }
                }

                // Sync with backend
                const res = await axios.get("http://localhost:5000/api/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                setForm({
                    username: res.data.username || "",
                    email: res.data.email || "",
                    password: "",
                    photo: null
                });

                if (res.data.photo) {
                    setPreview(`http://localhost:5000/uploads/${res.data.photo}`);
                }

            } catch (err) {
                console.error("Profile Error:", err);
                setError("Failed to load profile data");
            }
        };

        loadUser();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "photo") {
            const file = e.target.files[0];
            if (file) {
                setForm({ ...form, photo: file });
                setPreview(URL.createObjectURL(file));
            }
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async () => {
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const data = new FormData();
            data.append("username", form.username);
            data.append("email", form.email);
            if (form.password) data.append("password", form.password);
            if (form.photo) data.append("photo", form.photo);

            const res = await axios.put(
                "http://localhost:5000/api/update",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setSuccess("Profile updated successfully!");
            localStorage.setItem("user", JSON.stringify(res.data));
            setTimeout(() => setSuccess(""), 3000);

        } catch (err) {
            console.error("Update Error:", err);
            setError(err.response?.data || "Update failed");
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
            y: [-10, 10, -10],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div 
            ref={sectionRef}
            className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #0a0a0a 0%, #0f0f1a 50%, #1a0b2e 100%)"
            }}
        >
            <Navbar/>

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
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: Math.random() * 0.5,
                        }}
                        animate={{
                            y: [null, -100],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
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
                        <i className="fas fa-user-edit text-4xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent"></i>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold mb-2">
                        Update{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Profile
                        </span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full mb-3" />
                    <p className="text-gray-400 text-sm">Manage your account information</p>
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
                                    <i className="fas fa-id-card text-white text-sm"></i>
                                </div>
                                <h3 className="text-white font-semibold">Profile Information</h3>
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

                            {/* Success Message */}
                            <AnimatePresence>
                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        className="mb-5 p-3 rounded-xl bg-green-500/10 border border-green-500/20 backdrop-blur-sm"
                                    >
                                        <div className="flex items-center gap-2">
                                            <i className="fas fa-check-circle text-green-400 text-sm"></i>
                                            <p className="text-green-400 text-sm flex-1">{success}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Profile Image */}
                            <motion.div variants={itemVariants} className="flex justify-center mb-8">
                                <div className="relative group/image">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-0.5 shadow-2xl">
                                        {preview ? (
                                            <motion.img
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                                src={preview}
                                                alt="Profile Preview"
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                                <i className="fas fa-user-circle text-5xl text-gray-600"></i>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <motion.label
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute -bottom-2 -right-2 w-9 h-9 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <i className="fas fa-camera text-white text-xs"></i>
                                        <input
                                            type="file"
                                            name="photo"
                                            onChange={handleChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </motion.label>
                                </div>
                            </motion.div>

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
                                            value={form.username}
                                            onChange={handleChange}
                                            placeholder="Enter username"
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
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="Enter email"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                        />
                                    </div>
                                </motion.div>

                                {/* Password Field */}
                                <motion.div variants={itemVariants}>
                                    <label className="block text-gray-300 text-sm font-medium mb-2">
                                        <i className="fas fa-lock mr-2 text-indigo-400"></i>
                                        New Password (Optional)
                                    </label>
                                    <div className="relative">
                                        <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"></i>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            onChange={handleChange}
                                            placeholder="Leave blank to keep current"
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

                                {/* Submit Button */}
                                <motion.div variants={itemVariants} className="pt-4">
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
                                                    Updating Profile...
                                                </>
                                            ) : (
                                                <>
                                                    <i className="fas fa-save"></i>
                                                    Update Profile
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



            </motion.div>
        </div>
    );
}