import React from "react";
import { motion } from "framer-motion";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  return (
    <footer className="bg-[#121212] border-t border-[#2979FF]/20 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-gradient-custom flex items-center justify-center">
                <span className="font-orbitron font-bold text-white text-xl">P</span>
              </div>
              <span className="font-orbitron font-bold text-xl text-white">
                PATANG <span className="text-[#2979FF]">MEDIA</span>
              </span>
            </div>
            
            <p className="text-gray-400 mb-4">Future of Media, Designed by Superintelligence.</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">
                <i className="fab fa-youtube text-xl"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#home" 
                  className="text-gray-400 hover:text-[#2979FF] transition-colors"
                  onClick={(e) => handleLinkClick(e, "home")}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#agents" 
                  className="text-gray-400 hover:text-[#2979FF] transition-colors"
                  onClick={(e) => handleLinkClick(e, "agents")}
                >
                  AI Agents
                </a>
              </li>
              <li>
                <a 
                  href="#music" 
                  className="text-gray-400 hover:text-[#2979FF] transition-colors"
                  onClick={(e) => handleLinkClick(e, "music")}
                >
                  Music Lab
                </a>
              </li>
              <li>
                <a 
                  href="#campaigns" 
                  className="text-gray-400 hover:text-[#2979FF] transition-colors"
                  onClick={(e) => handleLinkClick(e, "campaigns")}
                >
                  Campaigns
                </a>
              </li>
              <li>
                <a 
                  href="#investors" 
                  className="text-gray-400 hover:text-[#2979FF] transition-colors"
                  onClick={(e) => handleLinkClick(e, "investors")}
                >
                  Investors
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-gray-400 hover:text-[#2979FF] transition-colors"
                  onClick={(e) => handleLinkClick(e, "contact")}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">AI-Generated Content</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">Music Production</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">Brand Campaigns</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">IP Development</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">AI Model Training</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">Virtual Events</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-orbitron font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">IP Rights</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">Licensing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-[#2979FF] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <motion.div 
          className="pt-8 mt-8 border-t border-gray-800 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-500">
            © {new Date().getFullYear()} Patang Media, Inc. All rights reserved. All trademarks, AI supermodels, and creative assets mentioned are the property of Patang Media.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
