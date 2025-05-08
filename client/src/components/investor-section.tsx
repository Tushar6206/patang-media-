import React from "react";
import { motion } from "framer-motion";

interface InvestorSectionProps {
  onNavigate: (sectionId: string) => void;
}

const InvestorSection: React.FC<InvestorSectionProps> = ({ onNavigate }) => {
  return (
    <section id="investors" className="py-20 bg-gradient-dark relative overflow-hidden">
      <div className="shape-blob bg-[#4A148C]/20 w-96 h-96 bottom-0 left-20 animate-float" style={{ animationDelay: "0.5s" }}></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            Investor <span className="text-gradient">Relations</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Join us in shaping the future of media and entertainment through AI innovation
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <motion.h3 
              className="text-2xl font-orbitron font-bold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Company Vision
            </motion.h3>
            <motion.p 
              className="text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Patang Media is transforming the entertainment and media landscape by leveraging advanced AI technologies to create authentic, engaging, and scalable content. Our vision is to become the definitive AI-powered media company of the future.
            </motion.p>
            
            <div className="space-y-6 pt-4">
              {/* Vision Point 1 */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#2979FF]/20 rounded-lg flex items-center justify-center text-[#2979FF]">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-orbitron text-white mb-2">Market Opportunity</h4>
                  <p className="text-gray-300">With Gen Z consuming 90%+ of their content from short-form platforms, we're positioning our AI supermodels as the next generation of virtual celebrities and brand ambassadors.</p>
                </div>
              </motion.div>
              
              {/* Vision Point 2 */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#FF2E63]/20 rounded-lg flex items-center justify-center text-[#FF2E63]">
                  <i className="fas fa-chart-line text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-orbitron text-white mb-2">Growth Strategy</h4>
                  <p className="text-gray-300">Our multi-phase expansion includes model licensing, SaaS tool development, and building an ecosystem of AI-generated IP across music, video, and interactive media.</p>
                </div>
              </motion.div>
              
              {/* Vision Point 3 */}
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-[#08FDD8]/20 rounded-lg flex items-center justify-center text-[#08FDD8]">
                  <i className="fas fa-shield-alt text-xl"></i>
                </div>
                <div>
                  <h4 className="text-lg font-orbitron text-white mb-2">IP Portfolio</h4>
                  <p className="text-gray-300">We've developed a strong intellectual property foundation with trademarked AI models, proprietary datasets, and a growing catalog of AI-generated creative assets.</p>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div>
            {/* Futuristic technology concept image */}
            <motion.img 
              src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800" 
              alt="Futuristic digital technology concept representing AI innovation" 
              className="rounded-xl shadow-lg shadow-[#2979FF]/20 w-full h-auto"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              whileHover={{ scale: 1.02 }}
            />
            
            <motion.div 
              className="mt-8 bg-[#1E1E1E] p-6 rounded-xl border border-[#2979FF]/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h4 className="text-lg font-orbitron font-bold mb-4">Key Metrics</h4>
              
              <div className="space-y-4">
                {/* Metric 1 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Monthly AI Content Generation</span>
                    <span className="text-[#2979FF] font-medium">1,200+ assets</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-[#2979FF] h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                
                {/* Metric 2 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Brand Campaigns ROI</span>
                    <span className="text-[#FF2E63] font-medium">317% average</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-[#FF2E63] h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                </div>
                
                {/* Metric 3 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Music Streaming Growth</span>
                    <span className="text-[#08FDD8] font-medium">+156% YoY</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-[#08FDD8] h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Investor CTA */}
        <motion.div 
          className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#2979FF]/20 shadow-lg text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-orbitron font-bold mb-4">Partner With the Next Pixar of AI</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            We are now inviting strategic investors and innovation-forward media partners to fund our expansion, model licensing, and SaaS tool development.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href="#contact"
              className="px-8 py-4 bg-[#2979FF] hover:bg-[#2979FF]/90 text-white font-orbitron rounded-md transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact");
              }}
            >
              Investment Inquiries
            </motion.a>
            <motion.a 
              href="#"
              className="px-8 py-4 bg-transparent border border-[#2979FF] text-[#2979FF] hover:bg-[#2979FF]/10 font-orbitron rounded-md transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download Investor Brief
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestorSection;
