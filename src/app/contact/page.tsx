'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[var(--color-neutral-bg)] py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-[var(--color-text-main)] mb-4">Get in Touch</h1>
          <p className="text-lg text-[var(--color-text-light)] max-w-2xl mx-auto">
            Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[var(--color-text-main)] mb-8 font-heading">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-full text-[var(--color-primary)]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Email Us</p>
                    <a href="mailto:support@vromonai.com" className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors">
                      support@vromonai.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-full text-[var(--color-primary)]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Call Us</p>
                    <a href="tel:+1234567890" className="text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-full text-[var(--color-primary)]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-1">Office Location</p>
                    <p className="text-[var(--color-text-light)]">
                      123 Innovation Drive<br />
                      Tech City, TC 10110<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-[var(--color-text-main)] mb-6 font-heading">Send us a message</h3>
              
              {isSuccess && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Thank you for reaching out! Your message has been successfully sent. We'll get back to you shortly.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"
                    placeholder="Please describe your inquiry in detail..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--color-primary)] hover:bg-blue-700 text-white font-medium py-3.5 px-6 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
