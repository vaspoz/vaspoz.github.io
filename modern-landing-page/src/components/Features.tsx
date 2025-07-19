import React from 'react';
import { motion } from 'framer-motion';
import { 
  LightBulbIcon, 
  ChartBarIcon, 
  CodeBracketIcon, 
  GlobeAltIcon,
  ShieldCheckIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: CodeBracketIcon,
    title: "Useless Fact of the Day",
    description: "Start your morning with a fun, random fact that will make you the most interesting person at the coffee machine.",
    gradient: "from-yellow-400 to-orange-500"
  },
  {
    icon: ChartBarIcon,
    title: "Breaking Tech News",
    description: "Curated tech news from AI breakthroughs to security alerts, keeping you informed on what actually matters.",
    gradient: "from-blue-400 to-purple-500"
  },
  {
    icon: LightBulbIcon,
    title: "Must-Read Articles",
    description: "Handpicked in-depth articles and guides from Laravel tutorials to debugging mindsets that level up your skills.",
    gradient: "from-green-400 to-teal-500"
  },
  {
    icon: GlobeAltIcon,
    title: "Trending Repositories",
    description: "Discover the hottest GitHub repos before they go viral—from pixel fonts to AI bot platforms.",
    gradient: "from-pink-400 to-rose-500"
  },
  {
    icon: ShieldCheckIcon,
    title: "Good First GitHub Issue",
    description: "Perfect beginner-friendly open source contributions to help you start or grow your GitHub profile.",
    gradient: "from-indigo-400 to-purple-500"
  },
  {
    icon: ClockIcon,
    title: "Random Delight",
    description: "A surprise image, meme, or visual treat to brighten your day. Because tech doesn't have to be all serious.",
    gradient: "from-cyan-400 to-blue-500"
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-poppins font-semibold text-xl text-white mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
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
              <div className="text-3xl md:text-4xl font-bold text-cafe-400 mb-2">3,247+</div>
              <div className="text-gray-400">Active Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">89%</div>
              <div className="text-gray-400">Open Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">5min</div>
              <div className="text-gray-400">Read Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">156</div>
              <div className="text-gray-400">Issues Sent</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
