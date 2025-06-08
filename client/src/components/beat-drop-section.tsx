import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { audioPlayer, generatedBeats } from "@/lib/audio";
import { professionalAudio, AudioTrackData } from "@/lib/professionalAudio";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BeatDropSectionProps {
  onNavigate: (sectionId: string) => void;
}

const BeatDropSection: React.FC<BeatDropSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("beats");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBeatId, setGeneratedBeatId] = useState<number | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [description, setDescription] = useState("");
  const [promptTemplate, setPromptTemplate] = useState("");
  const [generatedTracks, setGeneratedTracks] = useState<AudioTrackData[]>([]);
  const [sliders, setSliders] = useState({
    tempo: [120],
    energy: [70],
    complexity: [50],
    variation: [30]
  });
  
  const { toast } = useToast();
  const promptTemplates = [
    "An energetic EDM track with heavy bass drops and futuristic synths",
    "A chill lo-fi hip hop beat with jazzy piano samples and vinyl crackles",
    "A melodic house track with uplifting chords and memorable hooks",
    "A dark trap beat with haunting melodies and hard-hitting 808s",
    "A synthwave track with retro arpeggios and dreamy pads"
  ];
  
  const handlePlayBeat = (id: number) => {
    audioPlayer.play(id, 'beat');
  };
  
  const handleDownloadBeat = async (trackData?: AudioTrackData, legacyId?: number) => {
    try {
      if (trackData) {
        await professionalAudio.downloadAudio(trackData, 'wav');
      } else if (legacyId) {
        const beat = generatedBeats.find(b => b.id === legacyId);
        if (beat) {
          // Create download link for legacy beats
          const a = document.createElement('a');
          a.href = beat.audioUrl;
          a.download = `${beat.name.toLowerCase().replace(/\s+/g, '-')}.mp3`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          
          toast({
            title: "Download Started",
            description: `${beat.name} is downloading to your device.`,
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: "Unable to download the beat. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShareBeat = async (trackData: AudioTrackData) => {
    try {
      await professionalAudio.shareViaWhatsApp(trackData);
    } catch (error: any) {
      toast({
        title: "Share Failed",
        description: "Unable to share via WhatsApp. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleGenerate = async () => {
    if (!description && !promptTemplate) {
      toast({
        title: "Input Required",
        description: "Please enter a description or select a template for your beat.",
        variant: "destructive"
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Determine genre from description
      const genre = description.toLowerCase().includes('trap') ? 'trap' : 
                   description.toLowerCase().includes('house') ? 'house' : 
                   description.toLowerCase().includes('drill') ? 'trap' : 'house';
      
      const bpm = sliders.tempo[0];
      const duration = 30; // 30-second preview
      const complexity = sliders.complexity[0] > 70 ? 'professional' : 
                        sliders.complexity[0] > 40 ? 'advanced' : 'basic';

      const generatedTrack = await professionalAudio.generateProfessionalBeat(
        genre,
        bpm,
        duration,
        complexity as 'basic' | 'advanced' | 'professional'
      );

      setGeneratedTracks(prev => [generatedTrack, ...prev]);
      setGeneratedBeatId(parseInt(generatedTrack.id.split('_')[1]));
      setIsGenerating(false);
      
      toast({
        title: "Professional Beat Generated",
        description: `${generatedTrack.name} is ready with full-quality audio export.`,
      });
    } catch (error: any) {
      setIsGenerating(false);
      toast({
        title: "Generation Failed",
        description: "Unable to generate beat. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const genres = [
    { id: "trap", name: "Trap", color: "bg-purple-500" },
    { id: "house", name: "House", color: "bg-blue-500" },
    { id: "drill", name: "Drill", color: "bg-red-500" },
    { id: "afrobeats", name: "Afrobeats", color: "bg-amber-500" },
    { id: "lofi", name: "Lo-Fi", color: "bg-green-500" },
    { id: "pop", name: "Pop", color: "bg-pink-500" },
  ];
  
  return (
    <section id="beatdrop" className="py-20 bg-gradient-to-b from-[#121212] to-[#0E0E1A] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#121212] to-transparent"></div>
      <div className="shape-blob bg-[#8E24AA]/10 w-96 h-96 -left-48 top-20 blur-2xl"></div>
      <div className="shape-blob bg-[#00BCD4]/10 w-80 h-80 -right-40 bottom-20 blur-2xl"></div>
      
      {/* Animated speaker visual element */}
      <div className="absolute left-8 top-1/4 hidden xl:block">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            y: [0, -5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
          }}
          className="w-32 h-32 border-4 border-[#8E24AA]/30 rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              delay: 0.2
            }}
            className="w-20 h-20 border-2 border-[#00BCD4]/50 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1,
                delay: 0.4
              }}
              className="w-10 h-10 bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated speaker visual element (right side) */}
      <div className="absolute right-8 bottom-1/4 hidden xl:block">
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            y: [0, -5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.8,
            delay: 0.5
          }}
          className="w-32 h-32 border-4 border-[#00BCD4]/30 rounded-full flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.3,
              delay: 0.7
            }}
            className="w-20 h-20 border-2 border-[#8E24AA]/50 rounded-full flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 0.8,
                delay: 0.9
              }}
              className="w-10 h-10 bg-gradient-to-r from-[#00BCD4] to-[#8E24AA] rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <Badge className="mb-4 bg-[#8E24AA]/20 text-[#8E24AA] hover:bg-[#8E24AA]/30 backdrop-blur-sm">VIRAL CONTENT CREATION</Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-gradient-purple">BeatDrop™</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Create custom beats, produce viral-worthy music, and generate share-ready music videos with AI-powered simplicity.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="beats" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8 bg-[#1A1A2E]">
              <TabsTrigger value="beats" className="font-sora">Beat Creator</TabsTrigger>
              <TabsTrigger value="mix" className="font-sora">Voice Mixer</TabsTrigger>
              <TabsTrigger value="video" className="font-sora">Video Generator</TabsTrigger>
            </TabsList>
            
            <TabsContent value="beats" className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#8E24AA]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">AI Beat Creator</CardTitle>
                  <CardDescription>
                    Generate custom beats with simple controls, no music production skills needed
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-sora font-medium text-white mb-4">Select Genre</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                        {genres.map((genre) => (
                          <div 
                            key={genre.id}
                            className="p-3 rounded-lg cursor-pointer transition-all bg-[#0A0A14] hover:bg-[#1D1D30] text-center"
                          >
                            <div className={`w-10 h-10 rounded-full ${genre.color} flex items-center justify-center mb-2 mx-auto`}>
                              <i className="fas fa-music text-white text-sm"></i>
                            </div>
                            <p className="text-sm font-medium">{genre.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Tempo (BPM)</label>
                        <Slider
                          value={sliders.tempo}
                          onValueChange={(v) => setSliders({...sliders, tempo: v})}
                          min={60}
                          max={180}
                          step={1}
                          className="mb-1"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Slow</span>
                          <span>{sliders.tempo[0]} BPM</span>
                          <span>Fast</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Energy</label>
                        <Slider
                          value={sliders.energy}
                          onValueChange={(v) => setSliders({...sliders, energy: v})}
                          max={100}
                          step={1}
                          className="mb-1"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Chill</span>
                          <span>{sliders.energy[0]}%</span>
                          <span>Intense</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Complexity</label>
                        <Slider
                          value={sliders.complexity}
                          onValueChange={(v) => setSliders({...sliders, complexity: v})}
                          max={100}
                          step={1}
                          className="mb-1"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Simple</span>
                          <span>{sliders.complexity[0]}%</span>
                          <span>Complex</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-sora font-medium text-white mb-2">Instructions (Optional)</h3>
                      <Input 
                        placeholder="E.g., 'Similar to Drake's latest album' or 'Heavy 808s with melodic elements'"
                        className="bg-[#0A0A14] border-[#8E24AA]/30"
                      />
                    </div>
                    
                    {/* Generated beats library */}
                    {(generatedBeatId || true) && (
                      <div className="mt-8">
                        <h3 className="text-lg font-sora font-medium text-white mb-4">Your Generated Beats</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {generatedBeats.map((beat) => (
                            <div 
                              key={beat.id} 
                              className={`bg-[#0A0A14] rounded-lg overflow-hidden border ${
                                beat.id === generatedBeatId ? 'border-[#8E24AA]' : 'border-[#1A1A2E]'
                              } hover:border-[#8E24AA]/70 transition-all`}
                            >
                              <div className="flex h-24 md:h-32">
                                <div className="w-24 md:w-32 flex-shrink-0 relative overflow-hidden">
                                  <img 
                                    src={beat.coverImage} 
                                    alt={beat.name} 
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent"></div>
                                  <button 
                                    className={`absolute inset-0 flex items-center justify-center ${
                                      audioPlayer.isPlaying(beat.id, 'beat') ? 'bg-black/40' : 'bg-black/20 opacity-0 hover:opacity-100'
                                    } transition-opacity`}
                                    onClick={() => handlePlayBeat(beat.id)}
                                  >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      audioPlayer.isPlaying(beat.id, 'beat') ? 'bg-[#8E24AA]' : 'bg-white'
                                    }`}>
                                      <i className={`fas ${audioPlayer.isPlaying(beat.id, 'beat') ? 'fa-pause' : 'fa-play'} ${
                                        audioPlayer.isPlaying(beat.id, 'beat') ? 'text-white' : 'text-[#0A0A14]'
                                      }`}></i>
                                    </div>
                                  </button>
                                </div>
                                <div className="flex-1 p-3 flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-white font-medium">{beat.name}</h4>
                                      <Badge className={`${
                                        beat.quality === 'ultra' 
                                          ? 'bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] text-white' 
                                          : beat.quality === 'premium' 
                                            ? 'bg-[#8E24AA]/20 text-[#8E24AA]' 
                                            : 'bg-gray-700/50 text-gray-300'
                                      }`}>
                                        {beat.quality.charAt(0).toUpperCase() + beat.quality.slice(1)}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-400 mt-1 space-x-2">
                                      <span>{beat.genre}</span>
                                      <span>•</span>
                                      <span>{beat.bpm}</span>
                                      <span>•</span>
                                      <span>{beat.duration}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between mt-2">
                                    <div className="text-xs text-gray-500">
                                      Generated {beat.dateGenerated}
                                    </div>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button 
                                            variant="ghost" 
                                            size="sm"
                                            className="h-8 w-8 p-0 rounded-full hover:bg-[#8E24AA]/10 hover:text-[#8E24AA]"
                                            onClick={() => handleDownloadBeat(undefined, beat.id)}
                                          >
                                            <i className="fas fa-download"></i>
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          <p>Download Beat</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-[#0A0A14] rounded-lg p-6">
                      <h3 className="text-lg font-sora font-medium text-white mb-4">Beat Visualization</h3>
                      <div className="h-24 flex items-center justify-center">
                        {!isGenerating ? (
                          <div className="w-full flex items-end justify-between space-x-1">
                            {/* Beat visualization bars */}
                            {Array.from({ length: 40 }).map((_, i) => (
                              <motion.div 
                                key={i} 
                                className="w-full bg-gradient-to-t from-[#8E24AA] to-[#00BCD4]"
                                style={{ 
                                  height: '4px',
                                  borderRadius: '1px',
                                }}
                                animate={{ 
                                  height: `${Math.random() * 60 + 4}px`
                                }}
                                transition={{ 
                                  repeat: Infinity,
                                  duration: 0.8,
                                  delay: i * 0.02
                                }}
                              ></motion.div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center text-gray-400">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.2, 1],
                              }}
                              transition={{ 
                                repeat: Infinity, 
                                duration: 1.5,
                              }}
                            >
                              <i className="fas fa-circle-notch fa-spin text-4xl text-[#8E24AA]"></i>
                            </motion.div>
                            <p className="mt-2">Generating your beat...</p>
                          </div>
                        )}
                      </div>
                      
                      {!isGenerating && generatedTracks.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-semibold text-white mb-2">Your Generated Beat</h4>
                          <div className="bg-gradient-to-r from-[#8E24AA]/20 to-[#00BCD4]/20 p-3 rounded-lg border border-[#8E24AA]/30">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-medium text-white">{generatedTracks[0].name}</p>
                                <p className="text-xs text-gray-400">{generatedTracks[0].genre} • {generatedTracks[0].bpm} BPM</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="h-8 px-3 text-xs border-[#8E24AA]/50 text-[#8E24AA] hover:bg-[#8E24AA]/10"
                                  onClick={() => handleDownloadBeat(generatedTracks[0])}
                                >
                                  <i className="fas fa-download mr-1"></i>
                                  MP3
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="h-8 px-3 text-xs bg-green-600 hover:bg-green-700"
                                  onClick={() => handleShareBeat(generatedTracks[0])}
                                >
                                  <i className="fab fa-whatsapp mr-1"></i>
                                  Share
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                  <Button variant="outline" className="border-gray-600 text-gray-400">
                    Reset
                  </Button>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      className="bg-[#0A0A14] border-[#8E24AA]/50 text-[#8E24AA] hover:bg-[#8E24AA]/10"
                      onClick={() => setShowGenerator(true)}
                    >
                      <i className="fas fa-bolt mr-2"></i> Quick Create
                    </Button>
                    
                    <Button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className={`bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] hover:opacity-90 ${
                        isGenerating ? "animate-pulse" : ""
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <span className="mr-2">Generating</span>
                          <span className="flex gap-1">
                            <span className="animate-bounce">.</span>
                            <span className="animate-bounce animation-delay-200">.</span>
                            <span className="animate-bounce animation-delay-400">.</span>
                          </span>
                        </>
                      ) : (
                        "Generate Beat"
                      )}
                    </Button>
                  </div>
                </CardFooter>
                
                {/* AI Beat Generator Dialog (similar to Suno.AI) */}
                {showGenerator && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[#0A0A14] rounded-lg border border-[#8E24AA]/30 max-w-3xl w-full max-h-[90vh] overflow-auto"
                    >
                      <div className="p-6 border-b border-[#8E24AA]/20">
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-orbitron text-white">BeatDrop™ AI Generator</h3>
                          <Button 
                            variant="ghost" 
                            className="h-8 w-8 p-0 rounded-full" 
                            onClick={() => setShowGenerator(false)}
                          >
                            <i className="fas fa-times"></i>
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-6">
                        <div>
                          <h4 className="text-lg font-medium mb-2">Create with AI</h4>
                          <p className="text-sm text-gray-400 mb-4">
                            Describe the beat you want to create or select a template
                          </p>
                          
                          <div className="space-y-4">
                            <div className="relative">
                              <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your beat (e.g., 'An energetic trap beat with 808s and melodic elements')"
                                className="w-full h-32 bg-[#1A1A2E] rounded-lg border border-[#8E24AA]/20 p-4 focus:outline-none focus:ring-2 focus:ring-[#8E24AA]/50"
                              />
                              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                                {description.length}/300
                              </div>
                            </div>
                            
                            <div>
                              <h5 className="text-sm font-medium text-gray-300 mb-2">Or select a template:</h5>
                              <div className="grid grid-cols-1 gap-2">
                                {promptTemplates.map((template, index) => (
                                  <div 
                                    key={index}
                                    onClick={() => setDescription(template)}
                                    className={`p-3 rounded-lg border text-sm cursor-pointer transition-all ${
                                      description === template 
                                        ? "bg-[#8E24AA]/20 border-[#8E24AA]" 
                                        : "bg-[#1A1A2E] border-[#1A1A2E] hover:bg-[#1A1A2E]/80"
                                    }`}
                                  >
                                    {template}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Tempo</h4>
                            <Slider
                              value={sliders.tempo}
                              onValueChange={(v) => setSliders({...sliders, tempo: v})}
                              min={60}
                              max={180}
                              step={1}
                            />
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                              <span>60 BPM</span>
                              <span className="text-white">{sliders.tempo[0]} BPM</span>
                              <span>180 BPM</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Variation</h4>
                            <Slider
                              value={sliders.variation}
                              onValueChange={(v) => setSliders({...sliders, variation: v})}
                              max={100}
                              step={1}
                            />
                            <div className="flex justify-between mt-1 text-xs text-gray-500">
                              <span>Conservative</span>
                              <span className="text-white">{sliders.variation[0]}%</span>
                              <span>Experimental</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 border-t border-[#8E24AA]/20 flex justify-end">
                        <div className="flex space-x-4">
                          <Button 
                            variant="outline" 
                            className="border-gray-600 text-gray-300"
                            onClick={() => setShowGenerator(false)}
                          >
                            Cancel
                          </Button>
                          <Button 
                            className="bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] hover:opacity-90"
                            disabled={isGenerating || (!description && !promptTemplate)}
                            onClick={() => {
                              handleGenerate();
                              setShowGenerator(false);
                            }}
                          >
                            {isGenerating ? 'Processing...' : 'Create Beat'}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </Card>
            </TabsContent>
            
            <TabsContent value="mix" className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#8E24AA]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Voice Mixer</CardTitle>
                  <CardDescription>
                    Mix your voice with AI-generated beats for professional-sounding tracks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-sora font-medium text-white">Your Voice Input</h3>
                        <div className="border-2 border-dashed border-[#8E24AA]/30 rounded-lg p-8 text-center bg-[#0A0A14]/50 hover:bg-[#0A0A14] transition-colors cursor-pointer">
                          <input 
                            type="file" 
                            accept="audio/*" 
                            id="voice-upload-mix" 
                            className="hidden"
                          />
                          <label htmlFor="voice-upload-mix" className="cursor-pointer">
                            <div className="text-5xl mb-4 text-[#8E24AA]/70 mx-auto w-14">
                              <i className="fas fa-microphone"></i>
                            </div>
                            <p className="text-gray-300">Upload voice recording or click to record</p>
                            <p className="text-sm text-gray-500 mt-2">MP3, WAV, M4A (Max 5MB)</p>
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-sora font-medium text-white">Beat Selection</h3>
                        <div className="bg-[#0A0A14] p-4 rounded-lg">
                          <Select>
                            <SelectTrigger className="border-[#8E24AA]/30">
                              <SelectValue placeholder="Choose a beat" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="trap1">Trap Heatwave</SelectItem>
                              <SelectItem value="pop1">Pop Sensation</SelectItem>
                              <SelectItem value="drill1">Drill Power</SelectItem>
                              <SelectItem value="afro1">Afrobeats Rhythm</SelectItem>
                              <SelectItem value="custom">Your Generated Beat</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <div className="h-24 mt-4 overflow-hidden rounded-md bg-[#121212] flex items-center justify-center">
                            <div className="w-full flex items-end justify-between space-x-0.5 px-2">
                              {/* Beat visualization bars */}
                              {Array.from({ length: 60 }).map((_, i) => (
                                <motion.div 
                                  key={i} 
                                  className="w-full bg-gradient-to-t from-[#8E24AA] to-[#00BCD4]"
                                  style={{ 
                                    height: '2px',
                                    opacity: 0.7
                                  }}
                                  animate={{ 
                                    height: `${Math.sin(i * 0.2) * 25 + 5}px`,
                                    opacity: i > 40 ? 0.3 : 0.7
                                  }}
                                  transition={{ 
                                    repeat: Infinity,
                                    duration: 1,
                                    delay: i * 0.01
                                  }}
                                ></motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-sora font-medium text-white mb-4">Mix Settings</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0A0A14] p-6 rounded-lg">
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Voice Volume</label>
                          <Slider
                            defaultValue={[70]}
                            max={100}
                            step={1}
                            className="mb-1"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Quiet</span>
                            <span>Loud</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Beat Volume</label>
                          <Slider
                            defaultValue={[60]}
                            max={100}
                            step={1}
                            className="mb-1"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Background</span>
                            <span>Dominant</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Voice Effects</label>
                          <Select>
                            <SelectTrigger className="border-[#8E24AA]/30">
                              <SelectValue placeholder="Choose an effect" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="autotune">Autotune</SelectItem>
                              <SelectItem value="reverb">Reverb</SelectItem>
                              <SelectItem value="echo">Echo</SelectItem>
                              <SelectItem value="distortion">Distortion</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Effect Intensity</label>
                          <Slider
                            defaultValue={[50]}
                            max={100}
                            step={1}
                            className="mb-1"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Subtle</span>
                            <span>Intense</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button className="bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] hover:opacity-90">
                    Mix Voice & Beat
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="video" className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#8E24AA]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Music Video Generator</CardTitle>
                  <CardDescription>
                    Turn your track into a viral-worthy music video with AI-generated visuals
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-[#0A0A14] p-6 rounded-lg">
                        <h3 className="text-lg font-sora font-medium text-white mb-4">Audio Track</h3>
                        <p className="text-sm text-gray-400 mb-4">
                          Select a track you've created or upload your own
                        </p>
                        
                        <Select>
                          <SelectTrigger className="border-[#8E24AA]/30 mb-4">
                            <SelectValue placeholder="Select your track" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mixed1">My Mixed Track 1</SelectItem>
                            <SelectItem value="beat1">My Generated Beat 1</SelectItem>
                            <SelectItem value="upload">Upload New Track</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <div className="h-16 bg-[#1A1A2E] rounded-md overflow-hidden flex items-center">
                          <div className="w-full h-8 flex items-center justify-center">
                            <div className="w-11/12 flex items-end space-x-0.5">
                              {/* Audio waveform */}
                              {Array.from({ length: 100 }).map((_, i) => (
                                <motion.div 
                                  key={i} 
                                  className="w-full bg-gradient-to-t from-[#8E24AA] to-[#00BCD4]"
                                  style={{ 
                                    height: `${Math.sin(i * 0.2) * 12 + 3}px`,
                                    opacity: 0.7,
                                    borderRadius: '1px'
                                  }}
                                ></motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-[#0A0A14] p-6 rounded-lg space-y-4">
                        <h3 className="text-lg font-sora font-medium text-white mb-4">Visual Style</h3>
                        
                        <div className="space-y-2">
                          <label className="text-sm text-gray-400 block">Style Description</label>
                          <Input 
                            placeholder="E.g., 'Cyberpunk city with neon lights' or 'Abstract 3D animation'"
                            className="bg-[#1A1A2E] border-[#8E24AA]/30"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                          {[
                            "Cyberpunk", "Neon", "Futuristic", "Abstract", "3D", "Anime"
                          ].map((tag) => (
                            <Badge key={tag} className="bg-[#8E24AA]/10 text-[#8E24AA] border border-[#8E24AA]/30 hover:bg-[#8E24AA]/20 cursor-pointer">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="pt-2">
                          <label className="text-sm text-gray-400 mb-2 block">Animation Speed</label>
                          <Slider
                            defaultValue={[50]}
                            max={100}
                            step={1}
                            className="mb-1"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Slow</span>
                            <span>Fast</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#0A0A14] p-6 rounded-lg">
                      <h3 className="text-lg font-sora font-medium text-white mb-4">Format & Sharing</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Video Format</label>
                          <Select defaultValue="portrait">
                            <SelectTrigger className="border-[#8E24AA]/30">
                              <SelectValue placeholder="Select format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="portrait">Portrait (9:16) - TikTok, Reels</SelectItem>
                              <SelectItem value="square">Square (1:1) - Instagram</SelectItem>
                              <SelectItem value="landscape">Landscape (16:9) - YouTube</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Duration</label>
                          <Select defaultValue="30">
                            <SelectTrigger className="border-[#8E24AA]/30">
                              <SelectValue placeholder="Select duration" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 seconds</SelectItem>
                              <SelectItem value="30">30 seconds</SelectItem>
                              <SelectItem value="60">60 seconds</SelectItem>
                              <SelectItem value="full">Full track length</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Add Captions</label>
                          <Select defaultValue="auto">
                            <SelectTrigger className="border-[#8E24AA]/30">
                              <SelectValue placeholder="Caption options" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No captions</SelectItem>
                              <SelectItem value="auto">Auto-generate from lyrics</SelectItem>
                              <SelectItem value="custom">Custom captions</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button className="bg-gradient-to-r from-[#8E24AA] to-[#00BCD4] hover:opacity-90">
                    Generate Music Video
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="text-center mt-16">
          <Button 
            className="bg-transparent border border-[#8E24AA]/50 text-[#8E24AA] hover:bg-[#8E24AA]/10"
            onClick={() => onNavigate("twinsync")}
          >
            Explore TwinSync™ <i className="fas fa-arrow-right ml-2"></i>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BeatDropSection;