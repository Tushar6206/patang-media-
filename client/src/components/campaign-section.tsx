import React from "react";
import { motion } from "framer-motion";

interface CampaignSectionProps {
  onNavigate: (sectionId: string) => void;
}

const CampaignSection: React.FC<CampaignSectionProps> = ({ onNavigate }) => {
  return (
    <section id="campaigns" className="py-20 relative overflow-hidden">
      <div className="shape-blob bg-[#2979FF]/10 w-80 h-80 top-20 left-10 animate-float" style={{ animationDelay: "1.5s" }}></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            Campaign <span className="text-gradient">Engine</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Our AI-driven campaign management system delivers end-to-end marketing solutions
          </p>
        </motion.div>
        
        {/* Case Study: Stacy™ x WellOh! */}
        <motion.div 
          className="bg-[#1E1E1E] rounded-2xl overflow-hidden border border-[#2979FF]/20 shadow-xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-4 py-1 bg-[#08FDD8]/20 text-[#08FDD8] rounded-full font-orbitron text-sm">
                CASE STUDY
              </div>
              <h3 className="text-2xl font-orbitron font-bold">Stacy™ x WellOh!</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-gray-300">
                  Our flagship AI supermodel Stacy™ partnered with wellness brand WellOh! to create an authentic, engaging Instagram campaign that drove a 278% increase in engagement and 156% boost in conversions.
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  {/* Stat 1 */}
                  <motion.div 
                    className="bg-[#121212]/50 p-4 rounded-lg"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(41, 121, 255, 0.2)" }}
                  >
                    <p className="text-4xl font-orbitron text-[#2979FF] font-bold">278%</p>
                    <p className="text-gray-400">Engagement Increase</p>
                  </motion.div>
                  
                  {/* Stat 2 */}
                  <motion.div 
                    className="bg-[#121212]/50 p-4 rounded-lg"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(8, 253, 216, 0.2)" }}
                  >
                    <p className="text-4xl font-orbitron text-[#08FDD8] font-bold">156%</p>
                    <p className="text-gray-400">Conversion Boost</p>
                  </motion.div>
                  
                  {/* Stat 3 */}
                  <motion.div 
                    className="bg-[#121212]/50 p-4 rounded-lg"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(255, 46, 99, 0.2)" }}
                  >
                    <p className="text-4xl font-orbitron text-[#FF2E63] font-bold">42</p>
                    <p className="text-gray-400">Content Pieces</p>
                  </motion.div>
                  
                  {/* Stat 4 */}
                  <motion.div 
                    className="bg-[#121212]/50 p-4 rounded-lg"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)" }}
                  >
                    <p className="text-4xl font-orbitron text-white font-bold">3.2M</p>
                    <p className="text-gray-400">Total Impressions</p>
                  </motion.div>
                </div>
                
                <div className="pt-4">
                  <a href="#" className="inline-flex items-center gap-2 text-[#2979FF] hover:underline">
                    <span>Read Full Case Study</span>
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
              
              <div>
                {/* Digital media concept showing metrics and social media posts */}
                <motion.img 
                  src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800" 
                  alt="WellOh campaign dashboard showing metrics and social media performance" 
                  className="rounded-xl border border-[#2979FF]/20 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {/* Campaign image 1 */}
                  <motion.div 
                    className="rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1584093091778-e7f4e76e8063?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                      alt="Stacy model with WellOh product - yoga pose" 
                      className="w-full h-auto aspect-square object-cover" 
                    />
                  </motion.div>
                  
                  {/* Campaign image 2 */}
                  <motion.div 
                    className="rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1626285861696-9f0bf5a49c6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                      alt="Stacy model with WellOh product - healthy smoothie" 
                      className="w-full h-auto aspect-square object-cover" 
                    />
                  </motion.div>
                  
                  {/* Campaign image 3 */}
                  <motion.div 
                    className="rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" 
                      alt="Stacy model with WellOh product - meditation scene" 
                      className="w-full h-auto aspect-square object-cover" 
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Campaign Process */}
        <div className="mb-16">
          <motion.h3 
            className="text-2xl font-orbitron font-bold mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our Campaign Process
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-[#1E1E1E] rounded-xl p-6 h-full border border-[#2979FF]/20">
                <div className="w-12 h-12 bg-[#2979FF]/20 rounded-full flex items-center justify-center text-[#2979FF] mb-4">
                  <span className="font-orbitron font-bold">1</span>
                </div>
                
                <h4 className="text-xl font-orbitron font-bold mb-3">Brand Analysis</h4>
                <p className="text-gray-300">Our AI analyzes your brand identity, target audience, and goals to develop the perfect campaign strategy.</p>
              </div>
              
              <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <i className="fas fa-chevron-right text-[#2979FF]"></i>
              </div>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-[#1E1E1E] rounded-xl p-6 h-full border border-[#2979FF]/20">
                <div className="w-12 h-12 bg-[#2979FF]/20 rounded-full flex items-center justify-center text-[#2979FF] mb-4">
                  <span className="font-orbitron font-bold">2</span>
                </div>
                
                <h4 className="text-xl font-orbitron font-bold mb-3">AI Agent Selection</h4>
                <p className="text-gray-300">We match your brand with the ideal AI supermodel based on personality fit and target demographic alignment.</p>
              </div>
              
              <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <i className="fas fa-chevron-right text-[#2979FF]"></i>
              </div>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-[#1E1E1E] rounded-xl p-6 h-full border border-[#2979FF]/20">
                <div className="w-12 h-12 bg-[#2979FF]/20 rounded-full flex items-center justify-center text-[#2979FF] mb-4">
                  <span className="font-orbitron font-bold">3</span>
                </div>
                
                <h4 className="text-xl font-orbitron font-bold mb-3">Content Generation</h4>
                <p className="text-gray-300">Our AI produces multiple content variations optimized for your specific channels and audience segments.</p>
              </div>
              
              <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                <i className="fas fa-chevron-right text-[#2979FF]"></i>
              </div>
            </motion.div>
            
            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="bg-[#1E1E1E] rounded-xl p-6 h-full border border-[#2979FF]/20">
                <div className="w-12 h-12 bg-[#2979FF]/20 rounded-full flex items-center justify-center text-[#2979FF] mb-4">
                  <span className="font-orbitron font-bold">4</span>
                </div>
                
                <h4 className="text-xl font-orbitron font-bold mb-3">Analytics & Optimization</h4>
                <p className="text-gray-300">Real-time performance tracking and automated content optimization drive maximum ROI throughout the campaign.</p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Campaign CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-orbitron font-bold mb-4">Ready to Launch Your Campaign?</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Submit your brief and let our AI supermodels transform your brand's digital presence
          </p>
          <motion.a 
            href="#contact"
            className="inline-block px-8 py-4 bg-[#2979FF] hover:bg-[#2979FF]/90 text-white font-orbitron rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#2979FF]/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("contact");
            }}
          >
            Submit Your Campaign Brief
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CampaignSection;
