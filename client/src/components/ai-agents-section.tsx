import React from "react";
import { motion } from "framer-motion";

interface AIAgentsSectionProps {
  onNavigate: (sectionId: string) => void;
}

// Agent card component
interface AgentCardProps {
  image: string;
  name: string;
  version: string;
  badge: {
    text: string;
    color: string;
  };
  description: string;
  features: {
    icon: string;
    text: string;
  }[];
  stats: {
    label: string;
    value: string;
    color: string;
    percentage: number;
  };
  action: {
    text: string;
    link: string;
    color: string;
  };
}

const AgentCard: React.FC<AgentCardProps> = ({ 
  image, name, version, badge, description, features, stats, action 
}) => {
  return (
    <motion.div 
      className="card-hover bg-[#1E1E1E] rounded-xl overflow-hidden border border-[#2979FF]/20 shadow-lg"
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(41, 121, 255, 0.3)" }}
    >
      <div className="relative h-72">
        <img src={image} alt={`${name} AI Supermodel`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
        <div className={`absolute top-4 right-4 bg-${badge.color}/90 text-white px-3 py-1 rounded-full font-orbitron text-xs`}>
          {badge.text}
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-orbitron font-bold text-white flex items-center">
            {name} <span className="ml-2 text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{version}</span>
          </h3>
          <span className="text-[#08FDD8]"><i className="fas fa-certificate"></i></span>
        </div>
        
        <div className="space-y-2">
          <p className="text-gray-300">{description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            {features.map((feature, index) => (
              <span key={index} className="flex items-center">
                <i className={`${feature.icon} mr-1`}></i> {feature.text}
              </span>
            ))}
          </div>
        </div>
        
        <div className="pt-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-400">{stats.label}</span>
            <span className={`ml-auto text-${stats.color} font-medium`}>{stats.value}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className={`bg-${stats.color} h-2 rounded-full`} style={{ width: `${stats.percentage}%` }}></div>
          </div>
        </div>
        
        <motion.a 
          href={action.link}
          className={`block mt-6 text-center py-3 border border-${action.color} text-${action.color} rounded-lg hover:bg-${action.color} hover:text-white transition-colors duration-300`}
          whileHover={{ backgroundColor: action.color, color: action.color === "[#08FDD8]" ? "#121212" : "#ffffff" }}
        >
          {action.text}
        </motion.a>
      </div>
    </motion.div>
  );
};

const AIAgentsSection: React.FC<AIAgentsSectionProps> = ({ onNavigate }) => {
  // Agent data
  const agents = [
    {
      image: "https://pixabay.com/get/gc2a12307691c908024bbcc45ba417e62783941b79cfabb90e708f5650772eeaef889d2137f30c2aae81e129b2f578aa607399414e9d4e9eee9496ba02fb13516_1280.jpg",
      name: "Stacy™",
      version: "v3.5",
      badge: {
        text: "FLAGSHIP",
        color: "[#2979FF]"
      },
      description: "Lifestyle & wellness influencer running the WellOh! Instagram campaign",
      features: [
        { icon: "fas fa-language", text: "8 languages" },
        { icon: "fas fa-video", text: "4K video" }
      ],
      stats: {
        label: "Current engagement",
        value: "98.3%",
        color: "[#2979FF]",
        percentage: 98
      },
      action: {
        text: "View Campaigns",
        link: "#campaigns",
        color: "[#2979FF]"
      }
    },
    {
      image: "https://pixabay.com/get/g47c339e80809ae6c4612f7a719750bb88d4e01c7991465d9d94ffc0d97d69fe02942a12f96c215cf983c2964f3a4e2d8059fd9ac5d5ff241f9df25f6263f386f_1280.jpg",
      name: "Kairo™",
      version: "v2.1",
      badge: {
        text: "MUSIC",
        color: "[#FF2E63]"
      },
      description: "Electronic music producer specializing in AI-generated trance and experimental beats",
      features: [
        { icon: "fas fa-music", text: "34 tracks" },
        { icon: "fas fa-headphones", text: "Live sets" }
      ],
      stats: {
        label: "Streaming popularity",
        value: "86.4%",
        color: "[#FF2E63]",
        percentage: 86
      },
      action: {
        text: "Listen to Tracks",
        link: "#music",
        color: "[#FF2E63]"
      }
    },
    {
      image: "https://images.unsplash.com/photo-1646617747609-45b466ace9a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
      name: "Viya™",
      version: "v1.8",
      badge: {
        text: "CREATIVE",
        color: "[#08FDD8]"
      },
      description: "Creative director specializing in visual storytelling and brand strategy",
      features: [
        { icon: "fas fa-palette", text: "12 campaigns" },
        { icon: "fas fa-image", text: "Art direction" }
      ],
      stats: {
        label: "Brand alignment",
        value: "92.7%",
        color: "[#08FDD8]",
        percentage: 93
      },
      action: {
        text: "View Portfolio",
        link: "#campaigns",
        color: "[#08FDD8]"
      }
    }
  ];

  return (
    <section id="agents" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-6">
            Our <span className="text-gradient">AI Supermodels</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-300">
            Meet our proprietary AI agents with unique personalities, capabilities, and brand partnerships
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AgentCard {...agent} />
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-gray-400 mb-6">
            Our AI supermodels can be licensed for your brand campaigns and creative projects
          </p>
          <motion.a 
            href="#contact"
            className="inline-block px-8 py-3 bg-transparent border border-[#2979FF] text-[#2979FF] hover:bg-[#2979FF]/10 font-orbitron rounded-md transition-all duration-300"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(41, 121, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              onNavigate("contact");
            }}
          >
            Inquire About Licensing
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AIAgentsSection;
