import React from "react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-24">
      {/* Background Blobs */}
      <div className="shape-blob bg-[#4A148C]/30 w-96 h-96 -top-20 -left-20 animate-float"></div>
      <div className="shape-blob bg-[#2979FF]/20 w-80 h-80 top-1/3 right-10 animate-float" style={{ animationDelay: "1s" }}></div>
      
      <div className="container mx-auto px-4 md:px-6 py-16 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <p className="text-[#08FDD8] font-orbitron tracking-wider mb-3">PATANG MEDIA</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold leading-tight">
                Welcome to the <span className="text-gradient">Future of Media</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl">
                Powered by proprietary AI supermodels like Stacy™, we create music, stories, and campaigns that transcend human imagination.
              </p>
              <p className="mt-4 text-lg text-gray-400 font-light italic">
                Based in Alhambra, Los Angeles
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <motion.a 
                href="#contact"
                className="px-8 py-3 bg-[#2979FF] hover:bg-[#2979FF]/80 text-white font-orbitron rounded-md transition-all duration-300 transform hover:scale-105 animate-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("contact");
                }}
              >
                Book a Demo
              </motion.a>
              <motion.a 
                href="#agents"
                className="px-8 py-3 bg-transparent border border-[#2979FF] text-[#2979FF] hover:bg-[#2979FF]/10 font-orbitron rounded-md transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate("agents");
                }}
              >
                Explore Our AI Agents
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* AI-generated face with glowing blue accents */}
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[#2979FF]/20 avatar-container">
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800" 
                alt="AI-generated art representing superintelligence" 
                className="w-full object-cover h-auto transform hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#121212] to-transparent">
                <p className="font-orbitron text-sm">
                  <span className="text-[#2979FF]">Stacy™</span> - Our flagship AI supermodel
                </p>
              </div>
            </div>
            
            {/* Floating stats */}
            <motion.div 
              className="absolute -right-10 top-10 bg-[#1E1E1E]/80 backdrop-blur-md p-4 rounded-lg border border-[#2979FF]/30 shadow-lg shadow-[#2979FF]/20 hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="font-orbitron text-sm text-[#2979FF]">AI Generation</p>
              <p className="text-white">99.7% accuracy</p>
            </motion.div>
            
            <motion.div 
              className="absolute -left-10 bottom-20 bg-[#1E1E1E]/80 backdrop-blur-md p-4 rounded-lg border border-[#2979FF]/30 shadow-lg shadow-[#2979FF]/20 hidden md:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <p className="font-orbitron text-sm text-[#08FDD8]">Real-time</p>
              <p className="text-white">Content synthesis</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
