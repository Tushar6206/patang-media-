import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FeaturedAnthemsSection: React.FC = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  
  const anthems = [
    {
      id: "mystery-woman",
      title: "Mystery Woman",
      client: "Match.com UK + EU Campaign",
      videoId: "dQw4w9WgXcQ", // Placeholder video ID - replace with actual video ID
      description: "Patang Media proudly produced and released Mystery Woman, the flagship anthem for Match.com's branding campaigns across the UK and parts of Europe. This soulful and cinematic track became part of Match.com's wider marketing strategy — blending storytelling and romantic realism with Match's core brand values.",
      impact: "Mystery Woman highlights Patang's ability to merge music, narrative, and brand identity — and was crafted for use across digital ads, curated playlists, and social rollouts.",
      clientInfo: "Match.com",
      platforms: ["Digital Ads", "Curated Playlists", "Social Media", "Brand Campaigns"],
      thumbnail: "https://i.imgur.com/zXmQRVD.jpg",
      logoUrl: "https://i.imgur.com/aVmOuQH.png",
      accent: "#E44A45"
    },
    {
      id: "hostel-hearts",
      title: "Hostel Hearts & Insta Parts",
      client: "Generator Hostel Paris",
      videoId: "dQw4w9WgXcQ", // Placeholder video ID - replace with actual video ID
      description: "Our second major release, Hostel Hearts & Insta Parts, was created for Generator Hostel Paris to elevate their marketing and in-hostel lounge experience. The video follows a dreamy, romanticized view of youth hostel life — where unexpected moments, digital self-reflection, and Parisian energy collide.",
      impact: "With cinematic visuals and a vibey, beat-driven sound, the anthem plays across Generator's in-hostel lounges and is integrated into their digital campaigns.",
      clientInfo: "Generator Hostel – Paris",
      platforms: ["Lounge Playlist", "Marketing Soundtrack", "Digital Branding"],
      thumbnail: "https://i.imgur.com/5hYHYlX.jpg",
      logoUrl: "https://i.imgur.com/BPCRrlF.png",
      accent: "#5073B8"
    }
  ];
  
  return (
    <section id="featured-anthems" className="py-20 bg-gradient-to-b from-[#121212] to-[#0A0A14] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1A1A1A] to-transparent"></div>
      <div className="shape-blob bg-[#E44A45]/10 w-96 h-96 -right-48 top-20 blur-2xl"></div>
      <div className="shape-blob bg-[#5073B8]/10 w-80 h-80 -left-40 bottom-20 blur-2xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <Badge className="mb-4 bg-[#E44A45]/20 text-[#E44A45] hover:bg-[#E44A45]/30 backdrop-blur-sm">MUSIC COLLABORATIONS</Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">Featured <span className="text-gradient">Anthems</span></h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Explore our flagship music collaborations and marketing partnerships that showcase our ability to create impactful musical experiences for global brands.
          </p>
        </motion.div>
        
        <Tabs defaultValue={anthems[0].id} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-[#1A1A2E]">
              {anthems.map((anthem) => (
                <TabsTrigger 
                  key={anthem.id} 
                  value={anthem.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#2979FF]/20 data-[state=active]:to-transparent"
                >
                  {anthem.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {anthems.map((anthem) => (
            <TabsContent key={anthem.id} value={anthem.id} className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#2979FF]/10 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Video Section */}
                    <div className="relative">
                      <div className="aspect-video bg-black">
                        {activeVideoId === anthem.id ? (
                          <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${anthem.videoId}?autoplay=1&rel=0`} 
                            title={`${anthem.title} video`}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <div 
                            className="w-full h-full bg-cover bg-center cursor-pointer flex items-center justify-center relative"
                            style={{ backgroundImage: `url(${anthem.thumbnail})` }}
                            onClick={() => setActiveVideoId(anthem.id)}
                          >
                            <div className="absolute inset-0 bg-black/30"></div>
                            <div className="w-20 h-20 rounded-full bg-[#E44A45]/90 flex items-center justify-center z-10">
                              <i className="fas fa-play text-white text-2xl pl-1"></i>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full overflow-hidden flex items-center justify-center p-1">
                                  <img 
                                    src={anthem.logoUrl}
                                    alt={`${anthem.clientInfo} logo`}
                                    className="w-full h-full object-contain"
                                  />
                                </div>
                                <div className="text-left">
                                  <h4 className="text-white font-medium text-sm">{anthem.clientInfo}</h4>
                                  <p className="text-gray-300 text-xs">Official Brand Anthem</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8 bg-gradient-to-r from-[#1A1A2E] to-[#12121E]">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-orbitron font-bold text-white mb-1">{anthem.title}</h3>
                          <p className="text-[#E44A45]">{anthem.client}</p>
                        </div>
                        <div className="w-12 h-12 bg-white rounded-full overflow-hidden flex items-center justify-center p-1.5">
                          <img 
                            src={anthem.logoUrl}
                            alt={`${anthem.clientInfo} logo`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <p className="text-gray-300">{anthem.description}</p>
                        <p className="text-gray-300">{anthem.impact}</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-lg font-bold mb-2 text-white">Client</h4>
                        <p className="text-gray-300">{anthem.clientInfo}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-bold mb-2 text-white">Used In</h4>
                        <div className="flex flex-wrap gap-2">
                          {anthem.platforms.map((platform, index) => (
                            <Badge 
                              key={index} 
                              className="bg-[#2979FF]/10 hover:bg-[#2979FF]/20 text-[#2979FF]"
                            >
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-8">
                        <Button 
                          onClick={() => window.open(`https://www.youtube.com/watch?v=${anthem.videoId}`, '_blank')}
                          className="w-full bg-gradient-to-r from-[#E44A45] to-[#FF2E63] hover:opacity-90"
                        >
                          Watch Full Video <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        
        {/* Press Coverage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-orbitron font-bold mb-6 text-center">Media <span className="text-gradient">Coverage</span></h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { 
                name: "Media Post", 
                logo: "https://i.imgur.com/PlZS5tM.png",
                quote: "Patang's sonic branding transforms how brands connect with audiences"
              },
              { 
                name: "Music Business Weekly", 
                logo: "https://i.imgur.com/nHWFLtt.png",
                quote: "Setting new standards in brand-integrated music production"
              },
              { 
                name: "AdWeek", 
                logo: "https://i.imgur.com/4LFJcQT.png",
                quote: "Innovative approach to music-driven marketing campaigns"
              },
              { 
                name: "Variety", 
                logo: "https://i.imgur.com/DKtVcdt.png",
                quote: "Creates anthems that double as marketing assets and streaming hits"
              }
            ].map((media, index) => (
              <div 
                key={index} 
                className="bg-[#1A1A2E] border border-[#2979FF]/10 rounded-lg p-4 hover:border-[#2979FF]/30 transition-all"
              >
                <div className="h-12 flex items-center justify-center mb-4">
                  <img 
                    src={media.logo} 
                    alt={`${media.name} logo`} 
                    className="h-full object-contain" 
                  />
                </div>
                <p className="text-gray-300 text-sm text-center italic">"{media.quote}"</p>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-[#1A1A2E]/80 border border-[#2979FF]/10 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-orbitron font-bold mb-4">Create Your Brand's Anthem</h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Ready to give your brand a sonic identity that resonates with your audience? Let's collaborate on creating an anthem that captures your brand's essence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-[#E44A45] hover:bg-[#E44A45]/90"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Project <i className="fas fa-arrow-right ml-2"></i>
            </Button>
            <Button 
              variant="outline"
              className="border-[#2979FF]/40 text-[#2979FF] hover:bg-[#2979FF]/10"
              onClick={() => window.open('https://calendly.com/patangmedia/30min', '_blank')}
            >
              Schedule a Call <i className="fas fa-calendar ml-2"></i>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedAnthemsSection;