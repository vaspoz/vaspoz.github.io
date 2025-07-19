import React from 'react';
import { motion } from 'framer-motion';
import { 
  LightBulbIcon, 
  ChartBarIcon, 
  CodeBracketIcon, 
  BugAntIcon,
  SparklesIcon,
  PhotoIcon 
} from '@heroicons/react/24/solid';

const features = [
  {
    icon: ChartBarIcon,
    title: "Tech News",
    description: "Curated tech news from AI breakthroughs to security alerts, keeping you informed on what actually matters.",
    color: "text-cafe-400"
  },
  {
    icon: LightBulbIcon,
    title: "Must-Read Articles",
    description: "Handpicked in-depth articles and guides from Laravel tutorials to debugging mindsets that level up your skills.",
    color: "text-purple-400"
  },
  {
    icon: CodeBracketIcon,
    title: "Trending Repos",
    description: "Discover the hottest GitHub repos before they go viral—from pixel fonts to AI bot platforms.",
    color: "text-green-400"
  },
  {
    icon: BugAntIcon,
    title: "Good First Issue",
    description: "Perfect beginner-friendly open source contributions to help you start or grow your GitHub profile.",
    color: "text-yellow-400"
  },
  {
    icon: SparklesIcon,
    title: "Useless Fact of the Day",
    description: "Start your morning with a fun, random fact that will make you the most interesting person at the coffee machine.",
    color: "text-indigo-400"
  },
  {
    icon: PhotoIcon,
    title: "Random Fun Image",
    description: "A surprise image, meme, or visual treat to brighten your day. Because tech doesn't have to be all serious.",
    color: "text-pink-400"
  }
];

const Features: React.FC = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cafe-400 opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500 opacity-5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
            Why <span className="bg-gradient-to-r from-cafe-400 to-purple-400 bg-clip-text text-transparent">0xCAFE</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We don't just collect news – we craft insights that help you make better decisions, 
            stay competitive, and grow your career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-colors duration-300 group cursor-pointer"
            >
              <div className="mb-6">
                <feature.icon className={`w-12 h-12 ${feature.color}`} />
              </div>
              
              <h3 className="font-poppins font-semibold text-xl text-white mb-4 group-hover:text-gray-100 transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-cafe-400 mb-2">1,247+</div>
              <div className="text-gray-400">Active Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">5 days</div>
              <div className="text-gray-400">Per Week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">~10min</div>
              <div className="text-gray-400">Read Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">600+</div>
              <div className="text-gray-400">Issues Sent</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
