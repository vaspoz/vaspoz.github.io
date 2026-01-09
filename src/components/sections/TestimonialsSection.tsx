'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TerminalWindow, Comment, String } from '@/components/terminal';
import { testimonials } from '@/lib/content';

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-terminal-bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">
            <Comment>{'/**'}</Comment>
          </h2>
          <p className="text-2xl text-terminal-text">
            Loved by <span className="text-brand">1,247+</span> engineers
          </p>
          <p className="text-terminal-text-muted mt-2">
            <Comment>{' * What our readers say'}</Comment>
          </p>
          <p className="text-3xl font-bold mt-2">
            <Comment>{' */'}</Comment>
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Testimonial {
  image: string;
  name: string;
  content: string;
  subscribeDate: string;
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TerminalWindow
        title={`review-${index + 1}.log`}
        className="h-full"
        animate={false}
      >
        <div className="space-y-4">
          {/* Author info */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-terminal-border">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-semibold text-terminal-text">{testimonial.name}</div>
              <div className="text-syntax-comment text-sm">
                // subscribed: <String>{testimonial.subscribeDate}</String>
              </div>
            </div>
          </div>

          {/* Content as multiline comment */}
          <div className="text-terminal-text-muted">
            <span className="text-syntax-comment">{'/*'}</span>
            <p className="pl-3 py-2 italic">{`"${testimonial.content}"`}</p>
            <span className="text-syntax-comment">{'*/'}</span>
          </div>
        </div>
      </TerminalWindow>
    </motion.div>
  );
}
