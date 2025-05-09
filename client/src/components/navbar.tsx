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
import { ChevronDown, User, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoading, logoutMutation } = useAuth();
  const [location, navigate] = useLocation();

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
    { id: "rhythm-roulette", label: "Rhythm Roulette™" },
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
            
            {/* User Account Section */}
            {isLoading ? (
              <div className="w-8 h-8 animate-pulse rounded-full bg-[#2A2A4A]"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-auto rounded-full">
                    <Avatar className="w-8 h-8 border-2 border-[#2979FF]">
                      <AvatarImage src={user.profileImage || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-[#8E24AA] to-[#00BCD4] text-white">
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#121212]/95 backdrop-blur-md border-[#2A2A4A] text-white">
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium">{user.fullName || user.username}</p>
                    {user.email && <p className="text-xs text-muted-foreground truncate">{user.email}</p>}
                  </div>
                  <DropdownMenuSeparator className="bg-[#2A2A4A]" />
                  
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-[#2979FF]/10 hover:text-[#2979FF] gap-2"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator className="bg-[#2A2A4A]" />
                  
                  <DropdownMenuItem 
                    className="cursor-pointer hover:bg-red-500/10 hover:text-red-500 gap-2 focus:bg-red-500/10 focus:text-red-500"
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                className="bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] text-white hover:opacity-90"
                size="sm"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            )}
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
                    onClick={(e) => {
                      fetch('/api/investor-brief-accessed', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                      }).catch(err => console.log('Failed to record access:', err));
                    }}
                  >
                    Download Investor Brief <i className="fas fa-file-alt ml-1 text-xs"></i>
                  </a>
                </div>
              </div>
              
              {/* Auth section in mobile */}
              <div className="border-t border-[#2A2A4A] mt-4 pt-4 px-4">
                {isLoading ? (
                  <div className="flex justify-center">
                    <div className="w-6 h-6 rounded-full border-2 border-[#2979FF] border-t-transparent animate-spin"></div>
                  </div>
                ) : user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-10 h-10 border-2 border-[#2979FF]">
                        <AvatarImage src={user.profileImage || ""} />
                        <AvatarFallback className="bg-gradient-to-br from-[#8E24AA] to-[#00BCD4] text-white">
                          {user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{user.fullName || user.username}</p>
                        {user.email && <p className="text-xs text-gray-400">{user.email}</p>}
                      </div>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button
                        className="flex-1 bg-[#1A1A2E] hover:bg-[#2A2A4A]"
                        size="sm"
                        onClick={() => {
                          navigate("/profile");
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                      <Button
                        className="flex-1 bg-red-900/20 text-red-400 hover:bg-red-900/30"
                        size="sm"
                        onClick={() => logoutMutation.mutate()}
                        disabled={logoutMutation.isPending}
                      >
                        {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button 
                    className="w-full bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] text-white hover:opacity-90"
                    onClick={() => {
                      navigate("/auth");
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In / Register
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
