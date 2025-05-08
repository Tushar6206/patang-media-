import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ContactFormData, 
  NewsletterData, 
  validateContactForm, 
  validateNewsletter 
} from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    interest: "",
    message: ""
  });
  
  const [newsletter, setNewsletter] = useState<NewsletterData>({
    email: ""
  });
  
  const [formErrors, setFormErrors] = useState<Partial<ContactFormData>>({});
  const [newsletterError, setNewsletterError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ContactFormData];
        return newErrors;
      });
    }
  };

  // Handle newsletter input change
  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletter({ email: e.target.value });
    setNewsletterError("");
  };

  // Handle contact form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        company: "",
        interest: "",
        message: ""
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle newsletter signup
  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateNewsletter(newsletter);
    if (!validation.valid) {
      setNewsletterError(validation.error || "Invalid email");
      return;
    }
    
    setIsNewsletterSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/newsletter", newsletter);
      
      toast({
        title: "Subscription successful!",
        description: "You're now subscribed to our newsletter.",
        variant: "default",
      });
      
      // Reset form
      setNewsletter({ email: "" });
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            Contact & <span className="text-gradient">Social</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Connect with us to explore how AI can transform your media and marketing strategy
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#2979FF]/20 shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-2xl font-orbitron font-bold mb-6">Get In Touch</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2 font-sora">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#121212] border ${formErrors.name ? 'border-red-500' : 'border-[#2979FF]/30'} rounded-lg focus:outline-none focus:border-[#2979FF] text-white`} 
                    placeholder="John Doe" 
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-red-500 text-sm">{formErrors.name}</p>
                  )}
                </div>
                
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2 font-sora">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#121212] border ${formErrors.email ? 'border-red-500' : 'border-[#2979FF]/30'} rounded-lg focus:outline-none focus:border-[#2979FF] text-white`} 
                    placeholder="john@example.com" 
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-red-500 text-sm">{formErrors.email}</p>
                  )}
                </div>
                
                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-gray-300 mb-2 font-sora">Company</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#121212] border border-[#2979FF]/30 rounded-lg focus:outline-none focus:border-[#2979FF] text-white" 
                    placeholder="Your Company" 
                  />
                </div>
                
                {/* Interest */}
                <div>
                  <label htmlFor="interest" className="block text-gray-300 mb-2 font-sora">I'm interested in</label>
                  <select 
                    id="interest" 
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-[#121212] border ${formErrors.interest ? 'border-red-500' : 'border-[#2979FF]/30'} rounded-lg focus:outline-none focus:border-[#2979FF] text-white`}
                  >
                    <option value="">Select an option</option>
                    <option value="campaign">Brand Campaign</option>
                    <option value="music">Music Production</option>
                    <option value="agent">AI Agent Licensing</option>
                    <option value="investment">Investment Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                  {formErrors.interest && (
                    <p className="mt-1 text-red-500 text-sm">{formErrors.interest}</p>
                  )}
                </div>
                
                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2 font-sora">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4} 
                    className={`w-full px-4 py-3 bg-[#121212] border ${formErrors.message ? 'border-red-500' : 'border-[#2979FF]/30'} rounded-lg focus:outline-none focus:border-[#2979FF] text-white`} 
                    placeholder="Tell us about your project or inquiry"
                  ></textarea>
                  {formErrors.message && (
                    <p className="mt-1 text-red-500 text-sm">{formErrors.message}</p>
                  )}
                </div>
              </div>
              
              <motion.button 
                type="submit" 
                className="w-full px-6 py-4 bg-[#2979FF] hover:bg-[#2979FF]/90 text-white font-orbitron rounded-md transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div 
              className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#2979FF]/20 shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3 className="text-2xl font-orbitron font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {/* Location */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2979FF]/20 rounded-lg flex items-center justify-center text-[#2979FF]">
                    <i className="fas fa-map-marker-alt text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg text-white mb-1">Location</h4>
                    <p className="text-gray-300">Alhambra, Los Angeles, CA</p>
                  </div>
                </div>
                
                {/* Email */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2979FF]/20 rounded-lg flex items-center justify-center text-[#2979FF]">
                    <i className="fas fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg text-white mb-1">Email</h4>
                    <p className="text-gray-300">info@patswapnfc.com</p>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#2979FF]/20 rounded-lg flex items-center justify-center text-[#2979FF]">
                    <i className="fas fa-phone-alt text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg text-white mb-1">Phone</h4>
                    <p className="text-gray-300">+65 (830) 707-47</p>
                  </div>
                </div>
              </div>
              
              {/* Google Map */}
              <div className="mt-6 rounded-lg overflow-hidden h-64 border border-[#2979FF]/30">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52896.95032407906!2d-118.16270486071777!3d34.07276159639566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c5825ba25b67%3A0xce7f0daa8a79a8ad!2sAlhambra%2C%20CA!5e0!3m2!1sen!2sus!4v1667356092844!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Patang Media Location"
                ></iframe>
              </div>
            </motion.div>
            
            {/* Social Media */}
            <motion.div 
              className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#2979FF]/20 shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h3 className="text-2xl font-orbitron font-bold mb-6">Follow Our AI Supermodels</h3>
              
              <div className="space-y-6">
                {/* Stacy */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1642060570098-7e72a3dcbefe?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                      alt="Stacy AI profile" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg text-white flex items-center">
                      Stacy™ <span className="ml-2 text-xs bg-[#2979FF] text-white px-2 py-1 rounded">VERIFIED</span>
                    </h4>
                    <p className="text-gray-400">@stacy.wellbeing</p>
                  </div>
                  <div className="flex gap-2">
                    <a href="#" className="text-white hover:text-[#2979FF] transition-colors">
                      <i className="fab fa-instagram text-xl"></i>
                    </a>
                    <a href="#" className="text-white hover:text-[#2979FF] transition-colors">
                      <i className="fab fa-tiktok text-xl"></i>
                    </a>
                  </div>
                </div>
                
                {/* Kairo */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="https://pixabay.com/get/gb3118a3e0073d1d9ae1762966cbdf7bdbaee93c69755d34caab029a84a86c64777fe6a8f7b6063422108da71f4f7f3f753a352420f25e572931635336f001f20_1280.jpg" 
                      alt="Kairo AI profile" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg text-white flex items-center">
                      Kairo™ <span className="ml-2 text-xs bg-[#FF2E63] text-white px-2 py-1 rounded">VERIFIED</span>
                    </h4>
                    <p className="text-gray-400">@kairo.music</p>
                  </div>
                  <div className="flex gap-2">
                    <a href="#" className="text-white hover:text-[#FF2E63] transition-colors">
                      <i className="fab fa-spotify text-xl"></i>
                    </a>
                    <a href="#" className="text-white hover:text-[#FF2E63] transition-colors">
                      <i className="fab fa-soundcloud text-xl"></i>
                    </a>
                  </div>
                </div>
                
                {/* Viya */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1646617747609-45b466ace9a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                      alt="Viya AI profile" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg text-white flex items-center">
                      Viya™ <span className="ml-2 text-xs bg-[#08FDD8] text-[#121212] px-2 py-1 rounded">VERIFIED</span>
                    </h4>
                    <p className="text-gray-400">@viya.creates</p>
                  </div>
                  <div className="flex gap-2">
                    <a href="#" className="text-white hover:text-[#08FDD8] transition-colors">
                      <i className="fab fa-behance text-xl"></i>
                    </a>
                    <a href="#" className="text-white hover:text-[#08FDD8] transition-colors">
                      <i className="fab fa-pinterest text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Newsletter */}
            <motion.div 
              className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#2979FF]/20 shadow-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h3 className="text-xl font-orbitron font-bold mb-4">Join Our Newsletter</h3>
              <p className="text-gray-300 mb-4">Stay updated on the latest in AI media innovation</p>
              
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleNewsletterSignup}>
                <div className="flex-1">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={newsletter.email}
                    onChange={handleNewsletterChange}
                    className={`w-full px-4 py-3 bg-[#121212] border ${newsletterError ? 'border-red-500' : 'border-[#2979FF]/30'} rounded-lg focus:outline-none focus:border-[#2979FF] text-white`} 
                  />
                  {newsletterError && (
                    <p className="mt-1 text-red-500 text-sm">{newsletterError}</p>
                  )}
                </div>
                <motion.button 
                  type="submit" 
                  className="px-6 py-3 bg-[#2979FF] hover:bg-[#2979FF]/90 text-white font-orbitron rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  whileHover={{ scale: isNewsletterSubmitting ? 1 : 1.05 }}
                  whileTap={{ scale: isNewsletterSubmitting ? 1 : 0.95 }}
                  disabled={isNewsletterSubmitting}
                >
                  {isNewsletterSubmitting ? "Subscribing..." : "Subscribe"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
