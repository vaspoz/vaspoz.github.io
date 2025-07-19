import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  name: string;
  content: string;
  subscribeDate: string;
  avatar: string;
  role?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Gustavo Goulart",
    content: "Thanks for bring back the issue every weekday! I used to read while enjoying my morning coffee so happy that I can do it again! Very nice job, I'm a fan!",
    subscribeDate: "Sep 16, 2024",
    avatar: "/testimonials/gustavogoulart.jpg",
    role: "Software Engineer"
  },
  {
    name: "Mitesh Patel", 
    content: "Hey Basil, I just wanted to say how much I enjoy the 0xCAFE newsletter! Your witty commentary and insightful updates always make a good start to the day. The mix of tech news, quirky stories, puzzles and code repos keeps things fresh and engaging.",
    subscribeDate: "May 24, 2024",
    avatar: "/testimonials/miteshpatel.png",
    role: "Tech Lead"
  },
  {
    name: "Mauro Baso",
    content: "What I can say is that 0xCAFE newsletter is now part of my morning routine and the basis of my daily inspirational voyage. Too often we are diving so deep we forget to take a breath and look around, to remember to enjoy the journey as we head towards our destination. This is your work to me: a look at the world from the window and an inestimable tool for lateral thinking. Thank you for your commitment, never enough appreciated.",
    subscribeDate: "Jan 29, 2024", 
    avatar: "/testimonials/maurobaso.png",
    role: "Senior Developer"
  },
  {
    name: "Andy Alexis",
    content: "I like all of the general interest tech articles you share; I am retired from programming so the repositories are no longer of interest to me, but I remember being excited about reading about them when I was a programmer. This is a high quality newsletter and I look forward to reading it every day.",
    subscribeDate: "Jun 16, 2024",
    avatar: "/testimonials/andyalexis.jpg",
    role: "Retired Programmer"
  },
  {
    name: "Michael Thomas Ross",
    content: "Love your work, favourite newsletter of 40.",
    subscribeDate: "Jun 17, 2024",
    avatar: "/testimonials/michaelthomasross.jpg",
    role: "Developer"
  },
  {
    name: "Sarah Chen",
    content: "Finally, a tech newsletter that doesn't waste my time. Every issue has something valuable I can actually use. The curation is top-notch!",
    subscribeDate: "Mar 12, 2024",
    avatar: "SC",
    role: "Senior Developer at Stripe"
  }
];

const Testimonials: React.FC = () => {
  // Split testimonials into columns for masonry layout
  const testimonialColumns = [[], [], []] as Testimonial[][];
  testimonials.forEach((testimonial, i) => {
    testimonialColumns[i % 3].push(testimonial);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-cafe-400 opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-purple-500 opacity-5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
            Loved by <span className="bg-gradient-to-r from-cafe-400 to-purple-400 bg-clip-text text-transparent">Engineers</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Join thousands of developers who start their weekdays with 0xCAFE. 
            Here's what they're saying about their regular dose of tech insights.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonialColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="space-y-6">
              {column.map((testimonial, index) => (
                <motion.div
                  key={`${columnIndex}-${index}`}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 group"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    {testimonial.avatar.startsWith('/') ? (
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-cafe-400/30 group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-cafe-400 to-purple-400 rounded-full flex items-center justify-center font-bold text-black text-sm group-hover:scale-110 transition-transform duration-300">
                        {testimonial.avatar}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                      <div className="text-xs text-cafe-400">💌 Joined {testimonial.subscribeDate}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to join them?
            </h3>
            <p className="text-gray-300 mb-6">
              Start your mornings with the tech insights that matter. 
              Join 3,247+ developers who never miss an issue.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cafe-400 to-cafe-500 hover:from-cafe-500 hover:to-cafe-600 text-black font-semibold px-8 py-4 rounded-2xl transition-all duration-300"
              onClick={() => {
                const heroSection = document.querySelector('section');
                if (heroSection) {
                  heroSection.scrollIntoView({ behavior: 'smooth' });
                  // Focus the email input after scrolling
                  setTimeout(() => {
                    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
                    if (emailInput) {
                      emailInput.focus();
                    }
                  }, 800); // Wait for smooth scroll to complete
                }
              }}
            >
              Subscribe Now - It's Free
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
