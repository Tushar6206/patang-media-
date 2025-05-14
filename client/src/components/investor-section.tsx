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
              src="/assets/images/backgrounds/investor-tech.svg" 
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
        
        {/* Investment Timeline */}
        <motion.div
          className="mb-16 bg-[#1E1E1E] rounded-2xl p-8 border border-[#2979FF]/20 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-orbitron font-bold mb-2">Strategic Deployment Timeline</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our capital deployment strategy follows a precise timeline to maximize impact and accelerate growth trajectories.
            </p>
          </div>
          
          <div className="relative py-6">
            {/* Timeline Bar */}
            <div className="absolute top-0 bottom-0 left-[50%] w-1 bg-gradient-to-b from-[#2979FF] via-[#FF2E63] to-[#08FDD8]"></div>
            
            {/* Q1: Initial Deployment */}
            <div className="grid grid-cols-1 md:grid-cols-5 mb-12 relative">
              <div className="md:col-span-2 text-right pr-8 md:pr-12 pb-8 md:pb-0">
                <h4 className="text-lg font-medium text-white mb-2">Q1: Initial Deployment <span className="text-[#2979FF]">$7.5M</span></h4>
                <p className="text-gray-400 text-sm">
                  Immediate infrastructure scaling, key talent acquisition, and proprietary LLM research initiation.
                </p>
                <div className="mt-3 flex flex-wrap justify-end gap-2">
                  <span className="inline-block px-2 py-1 text-xs rounded-md bg-[#2979FF]/10 text-[#2979FF]">Cloud Infrastructure</span>
                  <span className="inline-block px-2 py-1 text-xs rounded-md bg-[#FF2E63]/10 text-[#FF2E63]">Senior AI Hires</span>
                </div>
              </div>
              
              <div className="absolute left-[50%] top-0 w-4 h-4 rounded-full bg-[#2979FF] transform -translate-x-1/2"></div>
              
              <div className="md:col-span-2 pl-8 md:pl-12 md:col-start-4">
                <div className="bg-[#0A0A14] p-4 rounded-lg border border-[#2979FF]/20">
                  <div className="font-medium text-white mb-2">Key Milestones</div>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-[#2979FF] mt-1"></i>
                      <span>Launch global cloud infrastructure on 3 continents</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-[#2979FF] mt-1"></i>
                      <span>Hire 5 ML/AI researchers from leading tech companies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-[#2979FF] mt-1"></i>
                      <span>Establish initial proprietary LLM research lab</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Q2-Q3: Scaling Phase */}
            <div className="grid grid-cols-1 md:grid-cols-5 mb-12 relative">
              <div className="md:col-span-2 text-right pr-8 md:pr-12 pb-8 md:pb-0 order-1 md:order-1">
                <div className="bg-[#0A0A14] p-4 rounded-lg border border-[#FF2E63]/20">
                  <div className="font-medium text-white mb-2">Key Milestones</div>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li className="flex items-start gap-2 justify-end">
                      <span>Finalize IP protection for core AI technologies</span>
                      <i className="fas fa-check-circle text-[#FF2E63] mt-1"></i>
                    </li>
                    <li className="flex items-start gap-2 justify-end">
                      <span>Expand sales teams in North America, Europe, and Asia</span>
                      <i className="fas fa-check-circle text-[#FF2E63] mt-1"></i>
                    </li>
                    <li className="flex items-start gap-2 justify-end">
                      <span>Launch beta version of proprietary content generation platform</span>
                      <i className="fas fa-check-circle text-[#FF2E63] mt-1"></i>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="absolute left-[50%] top-0 w-4 h-4 rounded-full bg-[#FF2E63] transform -translate-x-1/2"></div>
              
              <div className="md:col-span-2 pl-8 md:pl-12 md:col-start-4 order-0 md:order-2">
                <h4 className="text-lg font-medium text-white mb-2">Q2-Q3: Scaling Phase <span className="text-[#FF2E63]">$12M</span></h4>
                <p className="text-gray-400 text-sm">
                  Aggressive expansion of technical capabilities, global sales team build-out, and strategic partnership development.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-block px-2 py-1 text-xs rounded-md bg-[#FF2E63]/10 text-[#FF2E63]">IP Development</span>
                  <span className="inline-block px-2 py-1 text-xs rounded-md bg-[#FF2E63]/10 text-[#FF2E63]">Global Sales</span>
                </div>
              </div>
            </div>
            
            {/* Q4-Y2: Market Dominance */}
            <div className="grid grid-cols-1 md:grid-cols-5 relative">
              <div className="md:col-span-2 text-right pr-8 md:pr-12 pb-8 md:pb-0">
                <h4 className="text-lg font-medium text-white mb-2">Q4-Y2: Market Dominance <span className="text-[#08FDD8]">$10.5M</span></h4>
                <p className="text-gray-400 text-sm">
                  Launch of flagship AI technologies, international expansion, and strategic acquisitions to consolidate market position.
                </p>
                <div className="mt-3 flex flex-wrap justify-end gap-2">
                  <span className="inline-block px-2 py-1 text-xs rounded-md bg-[#08FDD8]/10 text-[#08FDD8]">Full LLM Launch</span>
                  <span className="inline-block px-2 py-1 text-xs rounded-md bg-[#08FDD8]/10 text-[#08FDD8]">Strategic Acquisitions</span>
                </div>
              </div>
              
              <div className="absolute left-[50%] top-0 w-4 h-4 rounded-full bg-[#08FDD8] transform -translate-x-1/2"></div>
              
              <div className="md:col-span-2 pl-8 md:pl-12 md:col-start-4">
                <div className="bg-[#0A0A14] p-4 rounded-lg border border-[#08FDD8]/20">
                  <div className="font-medium text-white mb-2">Key Milestones</div>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-[#08FDD8] mt-1"></i>
                      <span>Full commercial launch of proprietary LLM platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-[#08FDD8] mt-1"></i>
                      <span>Strategic acquisition of 2-3 complementary AI startups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-[#08FDD8] mt-1"></i>
                      <span>Major partnerships with entertainment conglomerates</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Competitive Analysis and Market Position */}
        <motion.div
          className="mb-16 bg-[#1E1E1E] rounded-2xl p-8 border border-[#2979FF]/20 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-orbitron font-bold mb-2">Competitive Landscape Analysis</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Patang Omniverse's multi-dimensional advantage in the rapidly evolving AI entertainment space.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0A0A14] p-6 rounded-xl border border-[#2979FF]/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-orbitron font-medium">Traditional Media</h4>
                <span className="bg-[#2979FF]/10 text-[#2979FF] text-xs px-2 py-1 rounded-full">Legacy Players</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-[#FF2E63] mt-1"></i>
                  <span className="text-gray-300 text-sm">High production costs and lengthy timelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-[#FF2E63] mt-1"></i>
                  <span className="text-gray-300 text-sm">Limited AI integration and technical expertise</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-[#FF2E63] mt-1"></i>
                  <span className="text-gray-300 text-sm">Slow adaptation to changing consumer preferences</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-[#08FDD8] mt-1"></i>
                  <span className="text-gray-300 text-sm">Strong existing distribution networks</span>
                </li>
              </ul>
              
              <p className="text-xs text-gray-400">
                <span className="font-medium text-white">Key Players:</span> Disney, Warner Bros, Universal, Sony
              </p>
            </div>
            
            <div className="bg-[#0A0A14] p-6 rounded-xl border border-[#FF2E63]/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-orbitron font-medium">AI Startups</h4>
                <span className="bg-[#FF2E63]/10 text-[#FF2E63] text-xs px-2 py-1 rounded-full">Emerging Innovation</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-[#08FDD8] mt-1"></i>
                  <span className="text-gray-300 text-sm">Technical innovation in specific AI domains</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-[#FF2E63] mt-1"></i>
                  <span className="text-gray-300 text-sm">Limited entertainment industry experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-[#FF2E63] mt-1"></i>
                  <span className="text-gray-300 text-sm">Narrow focus on single technology/product</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-times text-[#FF2E63] mt-1"></i>
                  <span className="text-gray-300 text-sm">Struggling to achieve mainstream adoption</span>
                </li>
              </ul>
              
              <p className="text-xs text-gray-400">
                <span className="font-medium text-white">Key Players:</span> RunwayML, Synthesia, Descript, Replica
              </p>
            </div>
            
            <div className="bg-[#0A0A14] p-6 rounded-xl border border-[#08FDD8]/20">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-orbitron font-medium">Patang Omniverse</h4>
                <span className="bg-[#08FDD8]/10 text-[#08FDD8] text-xs px-2 py-1 rounded-full">Category Leader</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-[#08FDD8] mt-1"></i>
                  <span className="text-gray-300 text-sm">Comprehensive suite of AI entertainment solutions</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-[#08FDD8] mt-1"></i>
                  <span className="text-gray-300 text-sm">Proprietary LLM specifically trained for creative content</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-[#08FDD8] mt-1"></i>
                  <span className="text-gray-300 text-sm">Industry expertise + cutting-edge technology</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fas fa-check text-[#08FDD8] mt-1"></i>
                  <span className="text-gray-300 text-sm">Proven commercial partnerships with global brands</span>
                </li>
              </ul>
              
              <p className="text-xs text-gray-400">
                <span className="font-medium text-[#08FDD8]">Competitive Edge:</span> Only full-stack AI entertainment platform with proven enterprise adoption
              </p>
            </div>
          </div>
          
          <div className="bg-[#0A0A14] p-6 rounded-xl">
            <h4 className="text-lg font-orbitron font-bold mb-4">Strategic Market Position</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-white mb-3">Entertainment Industry Disruption</h5>
                <p className="text-sm text-gray-300 mb-4">
                  Patang Omniverse is positioned at the intersection of AI technology and entertainment, enabling a 10x 
                  reduction in content production costs while dramatically increasing creative output quality and quantity.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#2979FF]/10 text-[#2979FF] text-xs px-2 py-1 rounded-full">10x Cost Reduction</span>
                  <span className="bg-[#2979FF]/10 text-[#2979FF] text-xs px-2 py-1 rounded-full">100x Production Speed</span>
                  <span className="bg-[#2979FF]/10 text-[#2979FF] text-xs px-2 py-1 rounded-full">Infinite Personalization</span>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-white mb-3">Exclusive Strategic Advantage</h5>
                <p className="text-sm text-gray-300 mb-4">
                  Our proprietary dataset of over 8 million labeled creative assets provides an insurmountable competitive 
                  moat that competitors cannot easily replicate, ensuring long-term market leadership.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-[#FF2E63]/10 text-[#FF2E63] text-xs px-2 py-1 rounded-full">Proprietary Datasets</span>
                  <span className="bg-[#FF2E63]/10 text-[#FF2E63] text-xs px-2 py-1 rounded-full">Patent-Protected</span>
                  <span className="bg-[#FF2E63]/10 text-[#FF2E63] text-xs px-2 py-1 rounded-full">5+ Year Lead</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Risk Mitigation */}
        <motion.div
          className="mb-16 bg-[#1E1E1E] rounded-2xl p-8 border border-[#2979FF]/20 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-orbitron font-bold mb-2">Risk Mitigation Strategy</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We've implemented comprehensive measures to address potential challenges and ensure continued growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0A0A14] p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#2979FF]/20 flex items-center justify-center text-[#2979FF]">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h4 className="text-lg font-medium">Technological Risks</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-medium mb-1">AI Regulation Changes</h5>
                  <p className="text-sm text-gray-400">
                    Diversified technology stack across multiple jurisdictions and active involvement in policy development through our AI Ethics Board.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-white font-medium mb-1">Competitive Technology Developments</h5>
                  <p className="text-sm text-gray-400">
                    Continuous R&D investment (25% of revenue) and strategic acquisition pipeline of emerging technologies.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0A0A14] p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FF2E63]/20 flex items-center justify-center text-[#FF2E63]">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h4 className="text-lg font-medium">Market Risks</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-medium mb-1">Changing Consumer Behavior</h5>
                  <p className="text-sm text-gray-400">
                    AI-powered trend analysis system updating our models weekly, allowing rapid adaptation to shifting preferences.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-white font-medium mb-1">Market Saturation</h5>
                  <p className="text-sm text-gray-400">
                    Diverse revenue streams across B2B, B2C, and licensing models, with no single channel exceeding 30% of total revenue.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0A0A14] p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#08FDD8]/20 flex items-center justify-center text-[#08FDD8]">
                  <i className="fas fa-users"></i>
                </div>
                <h4 className="text-lg font-medium">Operational Risks</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-medium mb-1">Talent Acquisition & Retention</h5>
                  <p className="text-sm text-gray-400">
                    Industry-leading compensation packages with equity incentives and distributed team structure across global talent hubs.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-white font-medium mb-1">Scaling Challenges</h5>
                  <p className="text-sm text-gray-400">
                    Modular technology architecture and strategic partnerships with cloud providers for seamless scaling.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0A0A14] p-6 rounded-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FFC700]/20 flex items-center justify-center text-[#FFC700]">
                  <i className="fas fa-gavel"></i>
                </div>
                <h4 className="text-lg font-medium">Legal & Regulatory Risks</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-white font-medium mb-1">Copyright & IP Issues</h5>
                  <p className="text-sm text-gray-400">
                    Proprietary content filtering technology and robust licensing agreements with major rights holders.
                  </p>
                </div>
                
                <div>
                  <h5 className="text-white font-medium mb-1">Privacy Regulations</h5>
                  <p className="text-sm text-gray-400">
                    Regional data processing architecture compliant with GDPR, CCPA, and emerging privacy frameworks.
                  </p>
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
              href="/patang-omniverse-investor-brief.html"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                fetch('/api/investor-brief-accessed', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' }
                }).catch(err => console.log('Failed to record access:', err));
              }}
              className="px-8 py-4 bg-transparent border border-[#2979FF] text-[#2979FF] hover:bg-[#2979FF]/10 font-orbitron rounded-md transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className="fas fa-file-alt mr-2"></i> Download Investor Brief
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InvestorSection;
