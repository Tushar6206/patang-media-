import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { professionalAudio, MusicGenerationData } from "@/lib/professionalAudio";
import AuthGateModal from "@/components/auth-gate-modal";

interface SunoInspiredSectionProps {
  onNavigate: (sectionId: string) => void;
}

const SunoInspiredSection: React.FC<SunoInspiredSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("create");
  const [prompt, setPrompt] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("pop");
  const [selectedMood, setSelectedMood] = useState("upbeat");
  const [songTitle, setSongTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [duration, setDuration] = useState("120");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTracks, setGeneratedTracks] = useState<MusicGenerationData[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  
  const { toast } = useToast();
  const { user } = useAuth();

  // Free tier limit
  const FREE_GENERATION_LIMIT = 3;

  useEffect(() => {
    if (!user && generationCount >= FREE_GENERATION_LIMIT) {
      setShowAuthModal(true);
    }
  }, [user, generationCount]);

  const handleGenerate = async () => {
    if (!user && generationCount >= FREE_GENERATION_LIMIT) {
      setShowAuthModal(true);
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please describe the music you want to create.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const musicData = await professionalAudio.generateAdvancedMusic({
        prompt,
        genre: selectedGenre,
        mood: selectedMood,
        title: songTitle || "Untitled Track",
        artist: artistName || "AI Artist",
        duration: parseInt(duration),
        style: "suno-inspired",
        includeVocals: true,
        instrumentalLayers: 8
      });

      setGeneratedTracks(prev => [musicData, ...prev]);
      setGenerationCount(prev => prev + 1);
      setIsGenerating(false);
      
      toast({
        title: "🎵 Track Generated Successfully",
        description: `"${musicData.title}" by ${musicData.artist} is ready to play!`,
      });

      // Clear form
      setPrompt("");
      setSongTitle("");
      setArtistName("");
    } catch (error: any) {
      setIsGenerating(false);
      toast({
        title: "Generation Failed",
        description: "Unable to generate music. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadTrack = async (track: MusicGenerationData) => {
    try {
      await professionalAudio.downloadAudio(track, 'mp3');
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: "Unable to download the track.",
        variant: "destructive",
      });
    }
  };

  const handleShareTrack = async (track: MusicGenerationData) => {
    try {
      await professionalAudio.shareViaWhatsApp(track);
    } catch (error: any) {
      toast({
        title: "Share Failed",
        description: "Unable to share via WhatsApp.",
        variant: "destructive",
      });
    }
  };

  const genres = [
    { id: "pop", name: "Pop", color: "bg-pink-500" },
    { id: "rock", name: "Rock", color: "bg-red-500" },
    { id: "electronic", name: "Electronic", color: "bg-blue-500" },
    { id: "hip-hop", name: "Hip Hop", color: "bg-purple-500" },
    { id: "jazz", name: "Jazz", color: "bg-amber-500" },
    { id: "classical", name: "Classical", color: "bg-indigo-500" },
    { id: "country", name: "Country", color: "bg-orange-500" },
    { id: "reggae", name: "Reggae", color: "bg-green-500" },
  ];

  const moods = [
    { id: "upbeat", name: "Upbeat & Energetic" },
    { id: "chill", name: "Chill & Relaxed" },
    { id: "melancholic", name: "Melancholic" },
    { id: "aggressive", name: "Aggressive" },
    { id: "romantic", name: "Romantic" },
    { id: "mysterious", name: "Mysterious" },
    { id: "euphoric", name: "Euphoric" },
    { id: "nostalgic", name: "Nostalgic" },
  ];



  return (
    <section id="suno-ai" className="py-20 bg-gradient-to-b from-[#0E0E1A] to-[#121212] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A0A14] to-transparent"></div>
      <div className="shape-blob bg-[#8E24AA]/10 w-96 h-96 -right-48 top-20 blur-2xl"></div>
      <div className="shape-blob bg-[#00BCD4]/10 w-80 h-80 -left-40 bottom-20 blur-2xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <Badge className="mb-4 bg-[#8E24AA]/20 text-[#8E24AA] hover:bg-[#8E24AA]/30 backdrop-blur-sm">
            SUNO AI INSPIRED
          </Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-gradient-purple">
            AI Music Studio
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Create complete songs with lyrics, vocals, and instrumentals using advanced AI. 
            Describe your vision and watch it come to life.
          </p>
          
          {!user && (
            <div className="mt-6 p-4 bg-[#1A1A2E]/50 rounded-lg border border-[#2979FF]/30">
              <p className="text-sm text-gray-400">
                Free users: {generationCount}/{FREE_GENERATION_LIMIT} generations used
              </p>
            </div>
          )}
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-[#1A1A2E]/50 backdrop-blur-sm">
              <TabsTrigger value="create" className="data-[state=active]:bg-[#8E24AA]/20">
                Create Song
              </TabsTrigger>
              <TabsTrigger value="library" className="data-[state=active]:bg-[#8E24AA]/20">
                My Library ({generatedTracks.length})
              </TabsTrigger>
              <TabsTrigger value="explore" className="data-[state=active]:bg-[#8E24AA]/20">
                Explore Styles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="mt-8">
              <Card className="bg-[#1A1A2E]/90 border-[#8E24AA]/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron text-white">
                    Describe Your Song
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Use natural language to describe the music you want to create
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Song Title (Optional)</label>
                        <Input
                          value={songTitle}
                          onChange={(e) => setSongTitle(e.target.value)}
                          placeholder="Enter song title..."
                          className="bg-[#0A0A14] border-[#8E24AA]/30"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Artist Name (Optional)</label>
                        <Input
                          value={artistName}
                          onChange={(e) => setArtistName(e.target.value)}
                          placeholder="Enter artist name..."
                          className="bg-[#0A0A14] border-[#8E24AA]/30"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Duration (seconds)</label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger className="bg-[#0A0A14] border-[#8E24AA]/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="60">1 minute</SelectItem>
                            <SelectItem value="120">2 minutes</SelectItem>
                            <SelectItem value="180">3 minutes</SelectItem>
                            <SelectItem value="240">4 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Genre</label>
                        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                          <SelectTrigger className="bg-[#0A0A14] border-[#8E24AA]/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {genres.map((genre) => (
                              <SelectItem key={genre.id} value={genre.id}>
                                {genre.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Mood</label>
                        <Select value={selectedMood} onValueChange={setSelectedMood}>
                          <SelectTrigger className="bg-[#0A0A14] border-[#8E24AA]/30">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {moods.map((mood) => (
                              <SelectItem key={mood.id} value={mood.id}>
                                {mood.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">
                      Song Description / Lyrics Prompt
                    </label>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your song... e.g., 'A upbeat pop song about summer love with catchy chorus and electronic beats' or 'Write lyrics about overcoming challenges with an inspirational rock melody'"
                      className="bg-[#0A0A14] border-[#8E24AA]/30 min-h-[120px]"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleGenerate}
                    disabled={isGenerating || (!user && generationCount >= FREE_GENERATION_LIMIT)}
                    className="w-full bg-gradient-to-r from-[#8E24AA] to-[#FF1493] hover:opacity-90"
                  >
                    {isGenerating ? (
                      <>
                        <i className="fas fa-magic mr-2 animate-spin"></i>
                        Generating Song... ({Math.floor(Math.random() * 60) + 30}s)
                      </>
                    ) : (
                      <>
                        <i className="fas fa-magic mr-2"></i>
                        Generate Complete Song
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="library" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedTracks.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <i className="fas fa-music text-4xl text-gray-600 mb-4"></i>
                    <p className="text-gray-400">No songs generated yet. Create your first masterpiece!</p>
                  </div>
                ) : (
                  generatedTracks.map((track, index) => (
                    <Card key={index} className="bg-[#1A1A2E]/90 border-[#8E24AA]/30 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg text-white truncate">{track.title}</CardTitle>
                        <CardDescription className="text-gray-400">
                          {track.artist} • {track.genre}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="relative h-16 bg-[#0A0A14] rounded-md overflow-hidden mb-4">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-8 flex items-center">
                              {Array.from({ length: 50 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className="w-1 mx-0.5 bg-[#8E24AA]/60"
                                  style={{ 
                                    height: `${Math.sin(i * 0.3) * 12 + 16}px`,
                                    opacity: i > 40 ? 0.4 : 1
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-[#8E24AA]/20 text-[#8E24AA]">
                            {track.duration}s
                          </Badge>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full">
                              <i className="fas fa-play text-xs"></i>
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full">
                              <i className="fas fa-pause text-xs"></i>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDownloadTrack(track)}
                          className="flex-1 border-[#8E24AA]/50 text-[#8E24AA] hover:bg-[#8E24AA]/10"
                        >
                          <i className="fas fa-download mr-2"></i>MP3
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleShareTrack(track)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <i className="fab fa-whatsapp mr-2"></i>Share
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="explore" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {genres.map((genre) => (
                  <Card key={genre.id} className="bg-[#1A1A2E]/90 border-[#8E24AA]/30 backdrop-blur-sm cursor-pointer hover:border-[#8E24AA]/60 transition-colors">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${genre.color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
                        <i className="fas fa-music text-2xl text-white"></i>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{genre.name}</h3>
                      <p className="text-sm text-gray-400">
                        Explore {genre.name.toLowerCase()} music generation
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Authentication Gate Modal */}
      <AuthGateModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        featureName="AI Music Studio"
        usedCount={generationCount}
        maxCount={FREE_GENERATION_LIMIT}
      />
    </section>
  );
};

export default SunoInspiredSection;