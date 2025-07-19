import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EyeIcon, HeartIcon, ShareIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const sampleIssues = [
  {
    id: 1,
    title: "AI Revolution: GPT-5 Rumors and What They Mean",
    date: "Dec 15, 2024",
    preview: "OpenAI hints at major breakthrough in reasoning capabilities. Plus: new JavaScript framework takes the world by storm, and why GitHub Copilot just got 10x better...",
    topics: ["AI", "JavaScript", "GitHub", "OpenAI"],
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&auto=format"
  },
  {
    id: 2,
    title: "The Cloud Wars: AWS vs Azure vs Google in 2024",
    date: "Dec 8, 2024",
    preview: "Comprehensive analysis of the big three cloud providers. Which one should you choose for your next project? We break down pricing, performance, and developer experience...",
    topics: ["Cloud", "AWS", "Azure", "Google Cloud"],
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&auto=format"
  },
  {
    id: 3,
    title: "Rust in Production: Success Stories from Tech Giants",
    date: "Dec 1, 2024",
    preview: "How Discord, Dropbox, and Meta are leveraging Rust for performance-critical applications. Plus: the hottest developer tools of the month and startup funding roundup...",
    topics: ["Rust", "Performance", "Meta", "Discord"],
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&auto=format"
  }
];

const NewsletterPreview: React.FC = () => {
  const [currentIssue, setCurrentIssue] = useState(0);

  const nextIssue = () => {
    setCurrentIssue((prev) => (prev + 1) % sampleIssues.length);
  };

  const prevIssue = () => {
    setCurrentIssue((prev) => (prev - 1 + sampleIssues.length) % sampleIssues.length);
  };

  const issue = sampleIssues[currentIssue];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-cafe-400 opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-purple-500 opacity-5 rounded-full filter blur-3xl"></div>
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
            Recent <span className="bg-gradient-to-r from-cafe-400 to-purple-400 bg-clip-text text-transparent">Issues</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Get a taste of what you'll receive every week. High-quality, actionable insights 
            delivered straight to your inbox.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Issue navigation */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevIssue}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              Previous
            </button>

            <div className="flex gap-2">
              {sampleIssues.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIssue(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIssue 
                      ? 'bg-cafe-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextIssue}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              Next
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Newsletter preview card */}
          <motion.div
            key={currentIssue}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-3xl overflow-hidden hover:border-gray-700 transition-all duration-300"
          >
            <div className="md:flex">
              {/* Issue image */}
              <div className="md:w-2/5">
                <img
                  src={issue.image}
                  alt={issue.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>

              {/* Issue content */}
              <div className="md:w-3/5 p-8">
                {/* Issue header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <CalendarDaysIcon className="w-4 h-4" />
                    {issue.date}
                  </div>
                  <div className="text-sm text-cafe-400 font-medium">
                    {issue.readTime}
                  </div>
                </div>

                {/* Issue title */}
                <h3 className="font-poppins font-bold text-2xl md:text-3xl text-white mb-4 leading-tight">
                  {issue.title}
                </h3>

                {/* Issue preview */}
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {issue.preview}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {issue.topics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-cafe-400/20 to-purple-400/20 text-cafe-300 text-sm rounded-full border border-cafe-400/30"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-cafe-400 transition-colors duration-300">
                      <EyeIcon className="w-5 h-5" />
                      <span className="text-sm">1,247 views</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors duration-300">
                      <HeartIcon className="w-5 h-5" />
                      <span className="text-sm">89</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors duration-300">
                      <ShareIcon className="w-5 h-5" />
                      <span className="text-sm">23</span>
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-cafe-400 to-cafe-500 hover:from-cafe-500 hover:to-cafe-600 text-black font-semibold px-6 py-2 rounded-xl transition-all duration-300"
                  >
                    Read Full Issue
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 mb-6">
              Want to receive issues like this every week?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300"
            >
              Subscribe Now - It's Free
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterPreview;
