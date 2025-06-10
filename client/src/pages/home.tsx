import React, { useEffect } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AIAgentsSection from "@/components/ai-agents-section";
import MusicLabSection from "@/components/music-lab-section";
import CampaignSection from "@/components/campaign-section";
import InvestorSection from "@/components/investor-section";
import ContactSection from "@/components/contact-section";
import VocalVerseSection from "@/components/vocal-verse-section";
import BeatDropSection from "@/components/beat-drop-section";
import TwinSyncSection from "@/components/twin-sync-section";
import RhythmRouletteSection from "@/components/rhythm-roulette-section";
import FeaturedAnthemsSection from "@/components/featured-anthems-section";
import GenreRecommenderSection from "@/components/genre-recommender-section";
import MoodMixtapeSection from "@/components/mood-mixtape-section";
import SunoInspiredSection from "@/components/suno-inspired-section";
import EmotionalMusicPalette from "@/components/emotional-music-palette";
import CareersSection from "@/components/careers-section";
import Footer from "@/components/footer";
import { scrollToSection } from "@/lib/utils";

const Home: React.FC = () => {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check for hash in URL to scroll to section on load
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 100);
    }
  }, []);

  // Handle internal navigation
  const handleNavigation = (sectionId: string) => {
    setLocation(`/#${sectionId}`, { replace: true });
    scrollToSection(sectionId);
  };

  return (
    <div className="bg-[#121212] text-white min-h-screen overflow-x-hidden">
      <Navbar onNavigate={handleNavigation} />
      <main>
        <HeroSection onNavigate={handleNavigation} />
        <AIAgentsSection onNavigate={handleNavigation} />
        <SunoInspiredSection onNavigate={handleNavigation} />
        <EmotionalMusicPalette onNavigate={handleNavigation} />
        <MoodMixtapeSection onNavigate={handleNavigation} />
        <VocalVerseSection onNavigate={handleNavigation} />
        <BeatDropSection onNavigate={handleNavigation} />
        <TwinSyncSection onNavigate={handleNavigation} />
        <RhythmRouletteSection onNavigate={handleNavigation} />
        <MusicLabSection />
        <FeaturedAnthemsSection />
        <GenreRecommenderSection onNavigate={handleNavigation} />
        <CampaignSection onNavigate={handleNavigation} />
        <CareersSection onNavigate={handleNavigation} />
        <InvestorSection onNavigate={handleNavigation} />
        <ContactSection />
      </main>
      <Footer onNavigate={handleNavigation} />
    </div>
  );
};

export default Home;
