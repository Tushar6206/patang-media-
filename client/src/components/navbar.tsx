import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Listen for scroll events to add background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const mainNavItems = [
    { id: "home", label: "Home" },
    { id: "agents", label: "AI Agents" },
  ];
  
  const featureNavItems = [
    { id: "vocalverse", label: "VocalVerse™" },
    { id: "beatdrop", label: "BeatDrop™" },
    { id: "twinsync", label: "TwinSync™" },
  ];
  
  const additionalNavItems = [
    { id: "music", label: "Music Lab" },
    { id: "featured-anthems", label: "Featured Anthems" },
    { id: "genre-recommender", label: "Genre Recommender" },
    { id: "campaigns", label: "Campaigns" },
    { id: "investors", label: "Investors" },
    { id: "contact", label: "Contact" },
  ];
  
  const investorDeckItems = [
    { id: "deck-overview", label: "Overview & Vision" },
    { id: "deck-financials", label: "Financials" },
    { id: "deck-roadmap", label: "Product Roadmap" },
    { id: "deck-team", label: "Team & Advisors" },
  ];

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      "fixed w-full z-50 border-b transition-all duration-300",
      isScrolled 
        ? "bg-[#121212]/80 backdrop-blur-md border-[#2979FF]/20" 
        : "bg-transparent border-transparent"
    )}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => handleNavClick("home")}
          >
            <div className="h-10 w-10 rounded-full bg-gradient-custom flex items-center justify-center animate-pulse-slow">
              <span className="font-orbitron font-bold text-white text-xl">P</span>
            </div>
            <span className="font-orbitron font-bold text-xl text-white">
              PATANG <span className="text-[#2979FF]">OMNIVERSE</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Main nav items */}
            {mainNavItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className="nav-link font-sora text-white hover:text-[#2979FF] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
            
            {/* Features Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="nav-link font-sora text-white hover:text-[#2979FF] p-0 h-auto">
                  <span>AI Features</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#121212]/95 backdrop-blur-md border-[#2979FF]/20 text-white">
                {featureNavItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.id}
                    className="cursor-pointer hover:bg-[#2979FF]/10 hover:text-[#2979FF]"
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Additional nav items */}
            {additionalNavItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className="nav-link font-sora text-white hover:text-[#2979FF] transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
            
            {/* Investor Deck Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="bg-[#2979FF]/10 border-[#2979FF]/40 text-[#2979FF] hover:bg-[#2979FF]/20 hover:text-white px-4 py-1 h-auto"
                >
                  <span>Investor Deck</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#121212]/95 backdrop-blur-md border-[#2979FF]/20 text-white">
                {investorDeckItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.id}
                    className="cursor-pointer hover:bg-[#2979FF]/10 hover:text-[#2979FF]"
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator className="bg-[#2979FF]/20" />
                <DropdownMenuItem 
                  className="cursor-pointer hover:bg-[#2979FF]/10 hover:text-[#2979FF]"
                  onClick={() => window.location.href = '/investor-deck'}
                >
                  <span className="flex items-center">
                    View Full Deck <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {mainNavItems.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  className="font-sora text-white hover:text-[#2979FF] px-4 py-2 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Feature sections in mobile */}
              <div className="px-4 py-2">
                <p className="font-sora text-[#2979FF] mb-2">AI Features</p>
                <div className="pl-2 border-l-2 border-[#2979FF]/30 flex flex-col space-y-2">
                  {featureNavItems.map((item) => (
                    <a 
                      key={item.id}
                      href={`#${item.id}`}
                      className="font-sora text-white hover:text-[#2979FF] py-1 text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
              
              {additionalNavItems.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  className="font-sora text-white hover:text-[#2979FF] px-4 py-2 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.id);
                  }}
                >
                  {item.label}
                </a>
              ))}
              
              {/* Investor Deck in mobile */}
              <div className="px-4 py-2">
                <p className="font-sora text-[#2979FF] mb-2">Investor Deck</p>
                <div className="pl-2 border-l-2 border-[#2979FF]/30 flex flex-col space-y-2">
                  {investorDeckItems.map((item) => (
                    <a 
                      key={item.id}
                      href={`#${item.id}`}
                      className="font-sora text-white hover:text-[#2979FF] py-1 text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a 
                    href="/patang-omniverse-investor-brief.html" 
                    target="_blank" 
                    className="font-sora text-white hover:text-[#2979FF] py-1 text-sm"
                  >
                    Download Investor Brief <i className="fas fa-file-alt ml-1 text-xs"></i>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
