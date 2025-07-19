import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, EnvelopeIcon, TrashIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      icon: DocumentTextIcon,
      title: "Information we collect",
      content: "When you sign up for our newsletter, we collect your email address. We may also collect other information that you voluntarily provide to us, such as your last name, location, or interests."
    },
    {
      icon: EnvelopeIcon,
      title: "How we use your information", 
      content: "We use your information to send you our newsletter, which may include news, updates, promotions, or other information related to our products and services. We may also use your information to improve our newsletter and to customize its content to better meet your interests."
    },
    {
      icon: ShieldCheckIcon,
      title: "Disclosure of your information",
      content: "We do not sell, trade, or rent your personal information to third parties. We may disclose your information to our service providers who assist us in sending our newsletter and maintaining our website. We may also disclose your information if required by law or to protect our legal rights."
    },
    {
      icon: LockClosedIcon,
      title: "Security of your information",
      content: "We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, we cannot guarantee that your information will be completely secure."
    },
    {
      icon: TrashIcon,
      title: "Retention of your information",
      content: "We will retain your personal information for as long as necessary to fulfill the purposes for which it was collected or as required by law. If you wish to unsubscribe from our newsletter or have your personal information deleted from our records, please contact me at basil@0xcafe.news."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-800"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="text-2xl">☕</div>
            <span className="font-poppins font-bold text-xl">0xCAFE</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Page Title */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-cafe-400/20 to-purple-500/20 backdrop-blur-sm border border-cafe-400/30 rounded-full px-6 py-3 mb-8"
            >
              <ShieldCheckIcon className="w-6 h-6 text-cafe-400" />
              <span className="text-cafe-300 font-semibold">Privacy First</span>
            </motion.div>
            
            <h1 className="font-poppins font-bold text-5xl md:text-6xl mb-6">
              Privacy <span className="bg-gradient-to-r from-cafe-400 to-purple-400 bg-clip-text text-transparent">Policy</span>
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
              This Privacy Policy describes how we collect, use, and disclose personal information that we collect from individuals who sign up for our newsletter. By signing up for our newsletter, you consent to the collection, use, and disclosure of your personal information in accordance with this policy.
            </p>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cafe-400 to-purple-400 rounded-xl flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-poppins font-semibold text-2xl text-white mb-4">
                      {section.title}
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Additional Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center flex-shrink-0">
                  <DocumentTextIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-poppins font-semibold text-2xl text-white mb-4">
                    Changes to our privacy policy
                  </h2>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    We reserve the right to modify this Privacy Policy at any time. We will post the updated Privacy Policy on our website and notify you of any significant changes.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-16 bg-gradient-to-r from-cafe-400/10 to-purple-400/10 border border-cafe-400/30 rounded-3xl p-8 text-center"
          >
            <EnvelopeIcon className="w-16 h-16 text-cafe-400 mx-auto mb-6" />
            <h2 className="font-poppins font-semibold text-2xl text-white mb-4">
              Questions or Concerns?
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              If you have any questions or concerns about our Privacy Policy, please don't hesitate to reach out.
            </p>
            <a
              href="mailto:basil@0xcafe.news"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cafe-400 to-cafe-500 hover:from-cafe-500 hover:to-cafe-600 text-black font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <EnvelopeIcon className="w-5 h-5" />
              basil@0xcafe.news
            </a>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-16"
          >
            <Link
              to="/"
              className="text-gray-400 hover:text-cafe-400 transition-colors duration-300 flex items-center gap-2 mx-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
