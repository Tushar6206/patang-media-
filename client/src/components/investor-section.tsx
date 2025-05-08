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
            Galactic <span className="text-gradient">Expansion Initiative</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Join the vanguard of visionaries co-creating the multi-trillion dollar AI entertainment paradigm that will redefine humanity's relationship with media
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
              Patang Omniverse is architecting the next evolution of human entertainment by harnessing quantum AI technologies to create immersive, transcendent, and infinitely scalable experiences. Our vision is to become the dominant force in digital consciousness entertainment, rivaling and eventually surpassing traditional media empires like Disney and Sony.
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
        
        {/* Investment Opportunity */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-orbitron font-bold mb-4">
              <span className="text-[#2979FF]">$30M</span> Strategic Investment Round
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg">
              Accelerating the next phase of our cosmic expansion with targeted capital allocation for maximum growth and market dominance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Capital Allocation Cards */}
            <motion.div
              className="bg-[#1E1E1E] rounded-xl p-6 border border-[#2979FF]/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#2979FF]/20 rounded-full w-12 h-12 flex items-center justify-center text-[#2979FF]">
                  <i className="fas fa-rocket text-xl"></i>
                </div>
                <h4 className="text-xl font-orbitron font-bold">Operations & Scale</h4>
              </div>
              <p className="text-gray-300 mb-4">
                $10.5M (35%) allocated to scaling our global operations infrastructure and cloud computing resources to handle exponential growth.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-[#2979FF]"></i>
                  <span>Enterprise-grade cloud infrastructure</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-[#2979FF]"></i>
                  <span>Automated content pipeline scaling</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-[#2979FF]"></i>
                  <span>Global server deployment</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              className="bg-[#1E1E1E] rounded-xl p-6 border border-[#2979FF]/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#FF2E63]/20 rounded-full w-12 h-12 flex items-center justify-center text-[#FF2E63]">
                  <i className="fas fa-brain text-xl"></i>
                </div>
                <h4 className="text-xl font-orbitron font-bold">Proprietary LLMs</h4>
              </div>
              <p className="text-gray-300 mb-4">
                $9M (30%) dedicated to developing our proprietary large language models and creative AI systems for a competitive technological advantage.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-[#FF2E63]"></i>
                  <span>Patent-protected AI algorithms</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-[#FF2E63]"></i>
                  <span>Next-gen neural voice synthesis</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-[#FF2E63]"></i>
                  <span>Custom multimodal models</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              className="bg-[#1E1E1E] rounded-xl p-6 border border-[#2979FF]/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#08FDD8]/20 rounded-full w-12 h-12 flex items-center justify-center text-[#08FDD8]">
                  <i className="fas fa-users text-xl"></i>
                </div>
                <h4 className="text-xl font-orbitron font-bold">Talent & Growth</h4>
              </div>
              <p className="text-gray-300 mb-4">
                $10.5M (35%) for attracting world-class talent and establishing global sales teams to expand our market presence.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-[#08FDD8]"></i>
                  <span>Top-tier ML/AI researcher acquisition</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-[#08FDD8]"></i>
                  <span>Global sales teams across 5 continents</span>
                </li>
                <li className="flex items-center gap-2">
                  <i className="fas fa-check text-[#08FDD8]"></i>
                  <span>Strategic partnership development</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Investment Growth Projections */}
        <motion.div
          className="mb-16 bg-[#1E1E1E] rounded-2xl p-8 border border-[#2979FF]/20 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-orbitron font-bold mb-2">Capital Efficiency & Growth Projections</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our investment strategy is designed to deliver exponential returns through strategic market positioning and proprietary technology development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Y1: Market Penetration</span>
                  <span className="text-[#2979FF] font-medium">$42M valuation</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-[#2979FF] h-2 rounded-full" style={{ width: "20%" }}></div>
                </div>
                <p className="text-sm text-gray-400">Global AI agent rollout and initial enterprise clients</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Y2: Rapid Expansion</span>
                  <span className="text-[#FF2E63] font-medium">$175M valuation</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-[#FF2E63] h-2 rounded-full" style={{ width: "40%" }}></div>
                </div>
                <p className="text-sm text-gray-400">Proprietary LLM launch and licensing program implementation</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Y3: Category Dominance</span>
                  <span className="text-[#08FDD8] font-medium">$620M valuation</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-[#08FDD8] h-2 rounded-full" style={{ width: "68%" }}></div>
                </div>
                <p className="text-sm text-gray-400">Major entertainment conglomerate partnerships and acquisitions</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-300">Y5: Industry Transformation</span>
                  <span className="text-[#FFC700] font-medium">$2.8B valuation</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-[#FFC700] h-2 rounded-full" style={{ width: "95%" }}></div>
                </div>
                <p className="text-sm text-gray-400">Position as primary competitor to traditional entertainment giants</p>
              </div>
            </div>
            
            <div className="bg-[#0A0A14] p-6 rounded-xl">
              <h4 className="text-lg font-orbitron font-bold mb-4">Investment Highlights</h4>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#2979FF]/20 rounded-full flex items-center justify-center text-[#2979FF]">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Projected ROI</h5>
                    <p className="text-gray-400">93x return potential within 5-year horizon</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FF2E63]/20 rounded-full flex items-center justify-center text-[#FF2E63]">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">IP Portfolio</h5>
                    <p className="text-gray-400">15 patents pending, 8 proprietary algorithms secured</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#08FDD8]/20 rounded-full flex items-center justify-center text-[#08FDD8]">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Strategic Partnerships</h5>
                    <p className="text-gray-400">Pre-arranged collaborations with 3 Fortune 100 companies</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FFC700]/20 rounded-full flex items-center justify-center text-[#FFC700]">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <div>
                    <h5 className="font-medium text-white">Expert Team</h5>
                    <p className="text-gray-400">Leadership with exits at major tech & entertainment companies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Investor CTA */}
        <motion.div 
          className="bg-[#1E1E1E] rounded-2xl p-8 border border-[#2979FF]/20 shadow-lg text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl font-orbitron font-bold mb-4">Co-Create the Disney of the Digital Consciousness Era</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            We are now accepting a limited number of visionary capital partners to join our interstellar journey toward becoming the world's dominant AI entertainment conglomerate, with projections to eclipse traditional media empires within the decade.
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
