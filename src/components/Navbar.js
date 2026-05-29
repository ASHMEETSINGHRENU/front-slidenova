
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ scrolled, logout, user: propUser }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const menuRef = useRef(null);

    const navLinks = [
        { name: 'Services', href: '#services' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Pricing', href: '#pricing' },
         { name: 'Analysis', href: '/analysis' } 
    ];

    // Check login status
    const isLoggedIn = !!localStorage.getItem("token");

    useEffect(() => {

        // Get user data from localStorage
        const userData = localStorage.getItem("user");

        if (userData) {
            const parsedUser = JSON.parse(userData);

            setUser(parsedUser);

            // Set profile image if exists
            if (parsedUser.photo) {
                setProfileImage(`http://localhost:5000/uploads/${parsedUser.photo}`);
            }
        } else if (propUser) {

            setUser(propUser);

            if (propUser.photo) {
                setProfileImage(`http://localhost:5000/uploads/${propUser.photo}`);
            }
        }

        // Click outside handler for user menu
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);

    }, [propUser]);

    const handleLogout = () => {
        setUserMenuOpen(false);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";
    };

    // Redirect protected actions
    const handleProtectedNavigation = (e, path) => {
        e.preventDefault();

        if (!isLoggedIn) {
            window.location.href = "/";
            return;
        }

        window.location.href = path;
    };

    // Get initial for avatar if no photo
    const getInitial = () => {
        if (user?.username) {
            return user.username.charAt(0).toUpperCase();
        }

        return 'U';
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100'
                        : 'bg-white/80 backdrop-blur-sm shadow-sm'
                    }`}
            >
                <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center">

                    {/* Logo */}
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
                            >
                                {link.name}

                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
                            </motion.a>
                        ))}

                        {user ? (

                            // Logged In User
                            <div className="relative" ref={menuRef}>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-200 shadow-sm transition-all duration-300"
                                >

                                    {/* Profile Image */}
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt={user.username}
                                            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-400"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-indigo-300">
                                            {getInitial()}
                                        </div>
                                    )}

                                    <span className="text-gray-700 font-medium text-sm">
                                        {user.username?.length > 10
                                            ? user.username.substring(0, 10) + '...'
                                            : user.username}
                                    </span>

                                    <i className={`fas fa-chevron-down text-gray-500 text-xs transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''
                                        }`}></i>
                                </motion.button>

                                <AnimatePresence>
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

                                                        <p className="text-gray-500 text-sm">
                                                            {user.email}
                                                        </p>
                                                    </div>

                                                </div>

                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">

                                                <a
                                                    href="/profile"
                                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors group"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition">
                                                        <i className="fas fa-user-circle text-indigo-600"></i>
                                                    </div>

                                                    <span>My Profile</span>
                                                </a>

                                                <a
                                                    href="/update"
                                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors group"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition">
                                                        <i className="fas fa-edit text-indigo-600"></i>
                                                    </div>

                                                    <span>Edit Profile</span>
                                                </a>
                                                <a
    href="/analysis"
    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors group"
    onClick={() => setUserMenuOpen(false)}
>
    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition">
        <i className="fas fa-chart-line text-indigo-600"></i>
    </div>
    <span>Analytics Dashboard</span>
</a>

                                                <a
                                                    href="/dashboard"
                                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors group"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition">
                                                        <i className="fas fa-chart-line text-indigo-600"></i>
                                                    </div>

                                                    <span>Dashboard</span>
                                                </a>

                                                <a
                                                    href="/my-orders"
                                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 transition-colors group"
                                                    onClick={() => setUserMenuOpen(false)}
                                                >
                                                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-100 transition">
                                                        <i className="fas fa-shopping-bag text-indigo-600"></i>
                                                    </div>

                                                    <span>My Orders</span>
                                                </a>

                                                <div className="border-t border-gray-100 my-2"></div>

                                                <button
                                                    onClick={handleLogout}
                                                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors group w-full"
                                                >
                                                    <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition">
                                                        <i className="fas fa-sign-out-alt text-red-600"></i>
                                                    </div>

                                                    <span>Logout</span>
                                                </button>

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
                        className="md:hidden text-2xl text-gray-700 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                    >
                        <i className="fas fa-bars"></i>
                    </motion.button>

                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>

                {mobileMenuOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 w-4/5 max-w-sm h-full bg-white/98 backdrop-blur-xl z-50 p-6 shadow-2xl"
                    >

                        {/* Close */}
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xl"
                        >
                            &times;
                        </button>

                        {/* User */}
                        {user && (
                            <div className="flex items-center gap-3 mb-8 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl mt-8">

                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt={user.username}
                                        className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-400"
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

                                    <p className="text-gray-500 text-sm">
                                        {user.email}
                                    </p>
                                </div>

                            </div>
                        )}

                        {/* Links */}
                        <div className="flex flex-col gap-4">

                            {navLinks.map((link, idx) => (
                                <motion.a
                                    key={idx}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-gray-700 hover:text-indigo-600 transition py-3 px-4 rounded-xl hover:bg-gray-50 text-lg font-medium"
                                >
                                    {link.name}
                                </motion.a>
                            ))}

                            <div className="border-t border-gray-100 my-2"></div>

                            {user ? (
                                <>
                                    <a
                                        href="/profile"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-gray-700 hover:text-indigo-600 transition py-3 px-4 rounded-xl hover:bg-gray-50"
                                    >
                                        <i className="fas fa-user-circle mr-3 w-6"></i>
                                        My Profile
                                    </a>

                                    <a
                                        href="/update"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-gray-700 hover:text-indigo-600 transition py-3 px-4 rounded-xl hover:bg-gray-50"
                                    >
                                        <i className="fas fa-edit mr-3 w-6"></i>
                                        Edit Profile
                                    </a>
                                    <a
    href="/analysis"
    onClick={() => setMobileMenuOpen(false)}
    className="text-gray-700 hover:text-indigo-600 transition py-3 px-4 rounded-xl hover:bg-gray-50"
>
    <i className="fas fa-chart-line mr-3 w-6"></i>
    Analytics Dashboard
</a>

                                    <a
                                        href="/my-orders"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-gray-700 hover:text-indigo-600 transition py-3 px-4 rounded-xl hover:bg-gray-50"
                                    >
                                        <i className="fas fa-shopping-bag mr-3 w-6"></i>
                                        My Orders
                                    </a>

                                    <button
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            handleLogout();
                                        }}
                                        className="text-red-600 hover:bg-red-50 transition py-3 px-4 rounded-xl text-left mt-2"
                                    >
                                        <i className="fas fa-sign-out-alt mr-3 w-6"></i>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <a
                                        href="/"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-gray-700 hover:text-indigo-600 transition py-3 px-4 rounded-xl hover:bg-gray-50"
                                    >
                                        Login
                                    </a>

                                    <button
                                        onClick={(e) => {
                                            setMobileMenuOpen(false);
                                            handleProtectedNavigation(e, "/order");
                                        }}
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-xl text-center font-semibold mt-2"
                                    >
                                        Order Now
                                        <i className="fas fa-arrow-right ml-2"></i>
                                    </button>
                                </>
                            )}

                        </div>

                    </motion.div>
                )}

            </AnimatePresence>
        </>
    );
};

export default Navbar;
