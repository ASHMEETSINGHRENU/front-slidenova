// client/src/components/Form.jsx
import React, { useState, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function Form() {
    const [form, setForm] = useState({
        email: "",
        pptTopic: "",
        pptDescription: "",
        pptType: [],
        purpose: [],
        slides: "",
        hasContent: "",
        deadline: "",
        urgency: "",
        budget: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});
    
    // Reference to form container to prevent page scroll
    const formContainerRef = useRef(null);
    const stepContentRef = useRef(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const handleCheckbox = (e, field) => {
        const value = e.target.value;
        setForm((prev) => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter((item) => item !== value)
                : [...prev[field], value]
        }));
    };

    const validateStep = () => {
        const newErrors = {};
        
        if (currentStep === 1) {
            if (!form.email) newErrors.email = "Email is required";
            else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
            if (!form.pptTopic) newErrors.pptTopic = "PPT Topic is required";
            if (!form.pptDescription) newErrors.pptDescription = "Description is required";
        } else if (currentStep === 2) {
            if (form.pptType.length === 0) newErrors.pptType = "Select at least one PPT type";
            if (form.purpose.length === 0) newErrors.purpose = "Select at least one purpose";
        } else if (currentStep === 3) {
            if (!form.slides) newErrors.slides = "Number of slides is required";
            if (!form.hasContent) newErrors.hasContent = "Please select if content is ready";
            if (!form.deadline) newErrors.deadline = "Deadline is required";
            if (!form.urgency) newErrors.urgency = "Please select urgency level";
            if (!form.budget) newErrors.budget = "Please select budget range";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const nextStep = () => {
        if (validateStep()) {
            setCurrentStep(currentStep + 1);
            // Smooth scroll to top of form container only, not whole page
            if (formContainerRef.current) {
                const yOffset = -20;
                const y = formContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
        // Smooth scroll to top of form container only
        if (formContainerRef.current) {
            const yOffset = -20;
            const y = formContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const handleSubmit = async () => {
        if (!validateStep()) return;
        
        setLoading(true);
        try {
            await axios.post("http://localhost:5000/api/form", form);
            setSuccess(true);
            
            // Show alert message
            alert("✅ Thank you for your request!\n\nWe have received your presentation requirements. Our team will contact you within 2 hours with a custom quote and timeline.\n\n📧 A confirmation email has been sent to your inbox.\n\nThank you for choosing SlideNova!");
            
            setTimeout(() => {
                setSuccess(false);
                // Reset form
                setForm({
                    email: "",
                    pptTopic: "",
                    pptDescription: "",
                    pptType: [],
                    purpose: [],
                    slides: "",
                    hasContent: "",
                    deadline: "",
                    urgency: "",
                    budget: ""
                });
                setCurrentStep(1);
                
                // Scroll back to form
                if (formContainerRef.current) {
                    const y = formContainerRef.current.getBoundingClientRect().top + window.pageYOffset - 50;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 3000);
        } catch (err) {
            console.error(err);
            alert("❌ Submission Failed!\n\nSomething went wrong. Please try again or contact us directly at hello@slidenova.com");
        } finally {
            setLoading(false);
        }
    };

    const pptTypes = ["Student Presentation", "Business Presentation", "Pitch Deck", "Redesign PPT"];
    const purposes = ["Academic", "Client Meeting", "Investor Pitch", "Internal Use"];
    const urgencyOptions = ["Normal (2–3 days)", "Urgent (24 hours)", "Express (Same day)"];
    const budgetOptions = ["₹500 – ₹1000", "₹1000 – ₹3000", "₹3000+"];

    return (
        <section id="order-form" className="py-20 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Request Your <span className="text-indigo-600">Professional PPT</span>
                    </h2>
                    <p className="text-gray-600 mt-2">Fill out the form and we'll get back to you within 2 hours</p>
                </motion.div>

                {/* Success Message */}
                <AnimatePresence>
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-2xl mx-auto mb-6 p-4 bg-green-100 border border-green-400 rounded-xl text-green-700 text-center"
                        >
                            <i className="fas fa-check-circle mr-2"></i>
                            Form Submitted Successfully! We'll contact you soon.
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Form Card */}
                <motion.div 
                    ref={formContainerRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/50"
                >
                    {/* Progress Bar */}
                    <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600">
                        <div className="flex justify-between mb-2">
                            <span className="text-white text-sm">Step {currentStep} of 3</span>
                            <span className="text-white text-sm">{Math.round((currentStep / 3) * 100)}% Complete</span>
                        </div>
                        <div className="w-full bg-white/30 rounded-full h-2">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / 3) * 100}%` }}
                                className="bg-white h-2 rounded-full"
                            />
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="p-6 md:p-8">
                        <div ref={stepContentRef}>
                            <AnimatePresence mode="wait">
                                {/* Step 1: Basic Information */}
                                {currentStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-5"
                                    >
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">📋 Basic Information</h3>
                                        
                                        {/* Email */}
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                <i className="fas fa-envelope mr-2 text-indigo-600"></i>
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="you@example.com"
                                                value={form.email}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                                                    errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-indigo-500'
                                                }`}
                                            />
                                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </div>

                                        {/* PPT Topic */}
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                <i className="fas fa-heading mr-2 text-indigo-600"></i>
                                                PPT Topic *
                                            </label>
                                            <input
                                                name="pptTopic"
                                                placeholder="e.g., Digital Marketing Strategy 2024"
                                                value={form.pptTopic}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                                                    errors.pptTopic ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.pptTopic && <p className="text-red-500 text-sm mt-1">{errors.pptTopic}</p>}
                                        </div>

                                        {/* PPT Description */}
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                <i className="fas fa-align-left mr-2 text-indigo-600"></i>
                                                Project Description *
                                            </label>
                                            <textarea
                                                name="pptDescription"
                                                placeholder="Describe your presentation needs, target audience, and any specific requirements..."
                                                value={form.pptDescription}
                                                onChange={handleChange}
                                                rows="5"
                                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                                                    errors.pptDescription ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.pptDescription && <p className="text-red-500 text-sm mt-1">{errors.pptDescription}</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Type & Purpose */}
                                {currentStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-5"
                                    >
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">🎯 Project Details</h3>
                                        
                                        {/* PPT Type */}
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                <i className="fas fa-file-powerpoint mr-2 text-indigo-600"></i>
                                                Type of PPT *
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {pptTypes.map((item) => (
                                                    <label key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value={item}
                                                            checked={form.pptType.includes(item)}
                                                            onChange={(e) => handleCheckbox(e, "pptType")}
                                                            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                                        />
                                                        <span className="text-gray-700">{item}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.pptType && <p className="text-red-500 text-sm mt-1">{errors.pptType}</p>}
                                        </div>

                                        {/* Purpose */}
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                <i className="fas fa-bullseye mr-2 text-indigo-600"></i>
                                                Purpose *
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {purposes.map((item) => (
                                                    <label key={item} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition cursor-pointer">
                                                        <input
                                                            type="checkbox"
                                                            value={item}
                                                            checked={form.purpose.includes(item)}
                                                            onChange={(e) => handleCheckbox(e, "purpose")}
                                                            className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
                                                        />
                                                        <span className="text-gray-700">{item}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Requirements & Budget */}
                                {currentStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-5"
                                    >
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">⚙️ Requirements & Budget</h3>
                                        
                                        {/* Number of Slides */}
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                <i className="fas fa-copy mr-2 text-indigo-600"></i>
                                                Number of Slides *
                                            </label>
                                            <input
                                                type="number"
                                                name="slides"
                                                placeholder="e.g., 15"
                                                value={form.slides}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                    errors.slides ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.slides && <p className="text-red-500 text-sm mt-1">{errors.slides}</p>}
                                        </div>

                                        {/* Content Ready */}
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                <i className="fas fa-file-alt mr-2 text-indigo-600"></i>
                                                Content Ready? *
                                            </label>
                                            <div className="flex gap-4">
                                                {["Yes", "No"].map((option) => (
                                                    <label key={option} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-indigo-50 transition">
                                                        <input
                                                            type="radio"
                                                            name="hasContent"
                                                            value={option}
                                                            checked={form.hasContent === option}
                                                            onChange={handleChange}
                                                            className="w-5 h-5 text-indigo-600"
                                                        />
                                                        <span className="text-gray-700">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.hasContent && <p className="text-red-500 text-sm mt-1">{errors.hasContent}</p>}
                                        </div>

                                        {/* Deadline */}
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                <i className="fas fa-calendar-alt mr-2 text-indigo-600"></i>
                                                Deadline *
                                            </label>
                                            <input
                                                type="datetime-local"
                                                name="deadline"
                                                value={form.deadline}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                                    errors.deadline ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                                }`}
                                            />
                                            {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
                                        </div>

                                        {/* Urgency */}
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                <i className="fas fa-tachometer-alt mr-2 text-indigo-600"></i>
                                                Urgency Level *
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                {urgencyOptions.map((option) => (
                                                    <label key={option} className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition ${
                                                        form.urgency === option 
                                                            ? 'bg-indigo-600 text-white' 
                                                            : 'bg-gray-50 hover:bg-indigo-100 text-gray-700'
                                                    }`}>
                                                        <input
                                                            type="radio"
                                                            name="urgency"
                                                            value={option}
                                                            checked={form.urgency === option}
                                                            onChange={handleChange}
                                                            className="hidden"
                                                        />
                                                        <i className={`fas fa-clock ${form.urgency === option ? 'text-white' : 'text-indigo-600'}`}></i>
                                                        <span className="text-sm">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.urgency && <p className="text-red-500 text-sm mt-1">{errors.urgency}</p>}
                                        </div>

                                        {/* Budget */}
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">
                                                <i className="fas fa-rupee-sign mr-2 text-indigo-600"></i>
                                                Budget Range *
                                            </label>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                {budgetOptions.map((option) => (
                                                    <label key={option} className={`flex items-center justify-center gap-2 p-3 rounded-lg cursor-pointer transition ${
                                                        form.budget === option 
                                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                                                            : 'bg-gray-50 hover:bg-indigo-100 text-gray-700'
                                                    }`}>
                                                        <input
                                                            type="radio"
                                                            name="budget"
                                                            value={option}
                                                            checked={form.budget === option}
                                                            onChange={handleChange}
                                                            className="hidden"
                                                        />
                                                        <span className="font-semibold">{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
                            {currentStep > 1 && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={prevStep}
                                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
                                >
                                    <i className="fas fa-arrow-left mr-2"></i> Back
                                </motion.button>
                            )}
                            
                            {currentStep < 3 ? (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={nextStep}
                                    className="ml-auto px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
                                >
                                    Continue <i className="fas fa-arrow-right ml-2"></i>
                                </motion.button>
                            ) : (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="ml-auto px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50"
                                >
                                    {loading ? (
                                        <><i className="fas fa-spinner fa-spin mr-2"></i> Submitting...</>
                                    ) : (
                                        <><i className="fas fa-paper-plane mr-2"></i> Submit Request</>
                                    )}
                                </motion.button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="max-w-3xl mx-auto mt-8 flex flex-wrap justify-center gap-6 text-center"
                >
                    <div className="flex items-center gap-2 text-gray-600">
                        <i className="fas fa-lock text-indigo-600"></i>
                        <span className="text-sm">Your information is secure</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <i className="fas fa-clock text-indigo-600"></i>
                        <span className="text-sm">Response within 2 hours</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <i className="fas fa-star text-indigo-600"></i>
                        <span className="text-sm">100% Satisfaction Guarantee</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}