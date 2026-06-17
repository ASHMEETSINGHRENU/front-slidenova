import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ scrolled, logout, user: propUser }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const menuRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // Memoize navLinks to prevent re-renders
    const navLinks = useMemo(() => [
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Analysis', href: '/analysis' }
    ], []);

    // Check login status with useMemo
    const isLoggedIn = useMemo(() => !!localStorage.getItem("token"), []);

    // Optimized user data fetching
    useEffect(() => {
        const loadUserData = () => {
            try {
                const userData = localStorage.getItem("user");
                if (userData) {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                    if (parsedUser.photo) {
                        setProfileImage(`https://backend-slidenova.onrender.com/uploads/${parsedUser.photo}`);
                    }
                } else if (propUser) {
                    setUser(propUser);
                    if (propUser.photo) {
                        setProfileImage(`https://backend-slidenova.onrender.com/uploads/${propUser.photo}`);
                    }
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };

        loadUserData();
    }, [propUser]);

    // Optimized click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
            // Close mobile menu when clicking outside
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        // Prevent scroll when mobile menu is open
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    // Optimized logout handler
    const handleLogout = useCallback(async () => {
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
        
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Call logout prop if provided
        if (logout) {
            await logout();
        }
        
        // Smooth navigation with slight delay for animation
        setTimeout(() => {
            window.location.href = "/";
        }, 300);
    }, [logout]);

    // Optimized navigation handler
    const handleProtectedNavigation = useCallback((e, path) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (!isLoggedIn) {
            window.location.href = "/";
            return;
        }
        
        // Smooth navigation
        if (path.startsWith('#')) {
            const element = document.querySelector(path);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return;
            }
        }
        
        window.location.href = path;
    }, [isLoggedIn]);

    // Get initial for avatar
    const getInitial = useCallback(() => {
        if (user?.username) {
            return user.username.charAt(0).toUpperCase();
        }
        return 'U';
    }, [user]);

    // Memoize user menu items to prevent unnecessary re-renders
    const userMenuItems = useMemo(() => [
        { icon: 'fa-user-circle', label: 'My Profile', href: '/profile' },
        { icon: 'fa-edit', label: 'Edit Profile', href: '/update' },
        { icon: 'fa-chart-line', label: 'Analytics Dashboard', href: '/analysis' },
        { icon: 'fa-shopping-bag', label: 'My Orders', href: '/my-orders' },
    ], []);

    // Mobile menu items
    const mobileMenuItems = useMemo(() => [
        ...navLinks,
        ...userMenuItems,
    ], [navLinks, userMenuItems]);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                    scrolled
                        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
                        : 'bg-white/80 backdrop-blur-sm shadow-sm'
                }`}
            >
                <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">
                    {/* Logo - Optimized */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-800 cursor-pointer group"
                        onClick={() => window.location.href = '/home'}
                    >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition">
                            <i className="fas fa-star-of-life text-white text-sm md:text-base"></i>
                        </div>
                        <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            SlideNova
                        </span>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navLinks.map((link, idx) => (
                            <motion.a
                                key={idx}
                                href={link.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-gray-600 hover:text-indigo-600 transition relative group font-medium"
                                onClick={(e) => {
                                    if (link.href.startsWith('#')) {
                                        e.preventDefault();
                                        const element = document.querySelector(link.href);
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }
                                }}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                            </motion.a>
                        ))}

                        {user ? (
                            // Logged In User - Optimized
                            <div className="relative" ref={menuRef}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200 shadow-sm transition-all duration-300"
                                >
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt={user.username}
                                            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-400"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-indigo-300">
                                            {getInitial()}
                                        </div>
                                    )}
                                    <span className="text-gray-700 font-medium text-sm hidden lg:inline">
                                        {user.username?.length > 10
                                            ? user.username.substring(0, 10) + '...'
                                            : user.username}
                                    </span>
                                    <i className={`fas fa-chevron-down text-gray-500 text-xs transition-transform duration-300 ${
                                        userMenuOpen ? 'rotate-180' : ''
                                    }`}></i>
                                </motion.button>

                                <AnimatePresence mode="wait">
                                    {userMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
                                        >
                                            {/* User Header */}
                                            <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    {profileImage ? (
                                                        <img
                                                            src={profileImage}
                                                            alt={user.username}
                                                            className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-500"
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                                                            {getInitial()}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-gray-800 font-bold text-lg">
                                                            {user.username}
                                                        </p>
                                                        <p className="text-gray-500 text-sm truncate max-w-[150px]">
                                                            {user.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                {userMenuItems.map((item, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={item.href}
                                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors group"
                                                        onClick={() => setUserMenuOpen(false)}
                                                    >
                                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition">
                                                            <i className={`fas ${item.icon} text-indigo-600`}></i>
                                                        </div>
                                                        <span>{item.label}</span>
                                                    </a>
                                                ))}

                                                <div className="border-t border-gray-100 my-2"></div>

                                                {/* Logout Button - Prominent & Smooth */}
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors group w-full"
                                                >
                                                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition">
                                                        <i className="fas fa-sign-out-alt text-red-600"></i>
                                                    </div>
                                                    <span className="font-medium">Logout</span>
                                                    <motion.span
                                                        initial={{ x: 0 }}
                                                        whileHover={{ x: 5 }}
                                                        className="ml-auto text-red-400"
                                                    >
                                                        <i className="fas fa-arrow-right"></i>
                                                    </motion.span>
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            // Guest User
                            <div className="flex items-center gap-3">
                                <motion.a
                                    href="/"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="text-gray-600 hover:text-indigo-600 transition font-medium px-3 py-2"
                                >
                                    Login
                                </motion.a>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={(e) => handleProtectedNavigation(e, "/order")}
                                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                                >
                                    Order Now
                                    <i className="fas fa-arrow-right ml-2 text-sm"></i>
                                </motion.button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-2xl text-gray-700 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
                        aria-label="Toggle mobile menu"
                    >
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Menu - Optimized with better animations */}
            <AnimatePresence mode="wait">
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        <motion.div
                            ref={mobileMenuRef}
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                            transition={{ 
                                type: 'spring', 
                                damping: 25, 
                                stiffness: 200,
                                duration: 0.3
                            }}
                            className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white z-50 p-6 shadow-2xl overflow-y-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xl hover:bg-gray-200 transition"
                            >
                                &times;
                            </button>

                            {/* User Section */}
                            {user && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl mt-8"
                                >
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt={user.username}
                                            className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-400"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold">
                                            {getInitial()}
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-gray-800 font-bold text-lg truncate">
                                            {user.username}
                                        </p>
                                        <p className="text-gray-500 text-sm truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Mobile Links */}
                            <div className="flex flex-col gap-1">
                                {navLinks.map((link, idx) => (
                                    <motion.a
                                        key={idx}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-gray-700 hover:text-indigo-600 transition py-3 px-4 rounded-xl hover:bg-gray-50 text-lg font-medium"
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}

                                {user && (
                                    <>
                                        <div className="border-t border-gray-100 my-2"></div>
                                        
                                        {userMenuItems.map((item, idx) => (
                                            <motion.a
                                                key={idx}
                                                initial={{ opacity: 0, x: 50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: (navLinks.length + idx) * 0.05 }}
                                                href={item.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="text-gray-700 hover:text-indigo-600 transition py-3 px-4 rounded-xl hover:bg-gray-50"
                                            >
                                                <i className={`fas ${item.icon} mr-3 w-6`}></i>
                                                {item.label}
                                            </motion.a>
                                        ))}

                                        {/* Mobile Logout Button - Prominent */}
                                        <motion.button
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (navLinks.length + userMenuItems.length) * 0.05 }}
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                // Small delay for smooth close animation
                                                setTimeout(() => handleLogout(), 300);
                                            }}
                                            className="flex items-center justify-between text-red-600 hover:bg-red-50 transition py-3 px-4 rounded-xl mt-2 group"
                                        >
                                            <span>
                                                <i className="fas fa-sign-out-alt mr-3 w-6"></i>
                                                Logout
                                            </span>
                                            <motion.span
                                                initial={{ x: 0 }}
                                                whileHover={{ x: 5 }}
                                                className="text-red-400"
                                            >
                                                <i className="fas fa-arrow-right"></i>
                                            </motion.span>
                                        </motion.button>
                                    </>
                                )}

                                {!user && (
                                    <>
                                        <motion.a
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: navLinks.length * 0.05 }}
                                            href="/"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-gray-700 hover:text-indigo-600 transition py-3 px-4 rounded-xl hover:bg-gray-50"
                                        >
                                            Login
                                        </motion.a>
                                        <motion.button
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (navLinks.length + 1) * 0.05 }}
                                            onClick={(e) => {
                                                setMobileMenuOpen(false);
                                                handleProtectedNavigation(e, "/order");
                                            }}
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl text-center font-semibold mt-2 hover:shadow-lg transition"
                                        >
                                            Order Now
                                            <i className="fas fa-arrow-right ml-2"></i>
                                        </motion.button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;