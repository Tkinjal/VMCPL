'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  CheckCircle2
} from 'lucide-react';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'info@vyomake.com' },
  { icon: Phone, label: 'Phone', value: '+91 7906697847' },
  { icon: MapPin, label: 'Location', value: 'Bareilly, Uttar Pradesh, India' },
];

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://formsubmit.co/ajax/info@vyomake.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile || 'Not Provided',
          company: formData.company || 'Not Provided',
          message: formData.message,
          _subject: `New Lead: ${formData.name}`,
          _template: "table" // Good default template for FormSubmit
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full glass text-sm text-purple-300 mb-4"
          >
            Get In Touch
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold font-outfit text-white mb-4">
            Start Your <span className="text-gradient">Project</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Have a vision? Let's engineer it into reality. Reach out and let's discuss
            how we can transform your ideas into intelligent systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-white/50 text-sm">{item.label}</div>
                      <div className="text-white">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-white/70" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quote */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass rounded-xl p-6"
            >
              <p className="text-white/70 italic mb-4">
                "VYOMAKE transformed our manufacturing process. The ROI was evident within the first quarter."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
                <div>
                  <div className="text-white font-medium">Sarah Chen</div>
                  <div className="text-white/50 text-sm">CTO, TechCorp Industries</div>
                </div>
              </div>
            </motion.div> */}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-50" />

              <div className="relative glass-strong rounded-2xl p-8 border border-white/10">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-green-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-white/60">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name field */}
                      <div className="relative">
                        <label className="block text-white/70 text-sm mb-2">Name</label>
                        <motion.div
                          animate={{
                            boxShadow: focusedField === 'name'
                              ? '0 0 20px rgba(126, 67, 255, 0.3)'
                              : 'none'
                          }}
                          className="rounded-lg"
                        >
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('name')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
                            placeholder="John Doe"
                          />
                        </motion.div>
                      </div>

                      {/* Email field */}
                      <div className="relative">
                        <label className="block text-white/70 text-sm mb-2">Email</label>
                        <motion.div
                          animate={{
                            boxShadow: focusedField === 'email'
                              ? '0 0 20px rgba(126, 67, 255, 0.3)'
                              : 'none'
                          }}
                          className="rounded-lg"
                        >
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
                            placeholder="john@company.com"
                          />
                        </motion.div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Mobile field */}
                      <div className="relative">
                        <label className="block text-white/70 text-sm mb-2">Mobile No (Optional)</label>
                        <motion.div
                          animate={{
                            boxShadow: focusedField === 'mobile'
                              ? '0 0 20px rgba(126, 67, 255, 0.3)'
                              : 'none'
                          }}
                          className="rounded-lg"
                        >
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('mobile')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
                            placeholder="+1 (555) 123-4567"
                          />
                        </motion.div>
                      </div>

                      {/* Company field */}
                      <div className="relative">
                        <label className="block text-white/70 text-sm mb-2">Company (Optional)</label>
                        <motion.div
                          animate={{
                            boxShadow: focusedField === 'company'
                              ? '0 0 20px rgba(126, 67, 255, 0.3)'
                              : 'none'
                          }}
                          className="rounded-lg"
                        >
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
                            placeholder="Your Company"
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Message field */}
                    <div className="relative">
                      <label className="block text-white/70 text-sm mb-2">Message</label>
                      <motion.div
                        animate={{
                          boxShadow: focusedField === 'message'
                            ? '0 0 20px rgba(126, 67, 255, 0.3)'
                            : 'none'
                        }}
                        className="rounded-lg"
                      >
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={5}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-colors resize-none"
                          placeholder="Tell us about your project..."
                        />
                      </motion.div>
                    </div>

                    {/* Submit button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:shadow-glow transition-shadow disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div >
    </section >
  );
}

export default Contact;
