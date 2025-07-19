import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, SparklesIcon, UserGroupIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cafe-400 opacity-20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 opacity-10 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cafe-400 to-purple-500 opacity-5 rounded-full filter blur-3xl animate-bounce-slow"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Brand Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-cafe-400/20 to-purple-500/20 backdrop-blur-sm border border-cafe-400/30 rounded-full px-6 py-2 mb-8"
          >
            <div className="text-2xl">☕</div>
            <span className="font-poppins font-semibold text-cafe-300">0xCAFE</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-poppins font-bold text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight"
          >
            The{' '}
            <span className="bg-gradient-to-r from-cafe-400 via-purple-400 to-cafe-300 bg-clip-text text-transparent">
              Future
            </span>{' '}
            of Tech
            <br />
            <span className="text-gray-300 text-4xl md:text-5xl lg:text-6xl">
              Delivered Weekdays
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Join <span className="text-cafe-400 font-semibold">3,247+ developers</span> who start their weekdays with 
            breaking tech news, trending GitHub repos, fun facts, and everything you need to stay ahead.
          </motion.p>

          {/* Social Proof Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-8 mb-12"
          >
            <div className="flex items-center gap-2 text-gray-400">
              <UserGroupIcon className="w-6 h-6 text-cafe-400" />
              <span>3,247+ Readers</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <SparklesIcon className="w-6 h-6 text-purple-400" />
              <span>Weekday Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <RocketLaunchIcon className="w-6 h-6 text-green-400" />
              <span>Zero Spam</span>
            </div>
          </motion.div>

          {/* Newsletter Signup Form */}
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="max-w-lg mx-auto"
            >
              <form onSubmit={handleSubmit} className="relative">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-black/50 backdrop-blur-sm border-2 border-gray-800 focus:border-cafe-400 rounded-2xl px-6 py-4 text-lg transition-all duration-300 focus:outline-none focus:ring-0 placeholder-gray-500"
                    required
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || !email}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-2 bg-gradient-to-r from-cafe-400 to-cafe-500 hover:from-cafe-500 hover:to-cafe-600 text-black font-semibold px-8 py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Subscribe
                        <ChevronRightIcon className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
              
              <p className="text-sm text-gray-500 mt-4">
                No spam, unsubscribe at any time. Read our{' '}
                <Link to="/privacy" className="text-cafe-400 hover:underline">privacy policy</Link>.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-lg mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl p-8"
            >
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Welcome aboard!</h3>
              <p className="text-gray-300">
                Check your inbox for a welcome email. Your first issue arrives this week!
              </p>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
