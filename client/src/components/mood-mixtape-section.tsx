import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Music, Brain, Heart, Zap, Play, Pause, SkipForward, 
  RefreshCw, Sparkles, TrendingUp, Volume2, Headphones,
  Activity, Timer, Target
} from "lucide-react";

interface MoodMixtapeSectionProps {
  onNavigate: (sectionId: string) => void;
}

interface Track {
  title: string;
  artist: string;
  genre: string;
  energy: number;
  mood_match: number;
}

interface MoodMixtape {
  id: number;
  title: string;
  mood: string;
  emotionalIntensity: number;
  tracks: Track[];
  adaptationHistory: string[];
  isActive: boolean;
  lastAdaptedAt: string;
  createdAt: string;
}

interface MoodDetection {
  mood: string;
  confidence: number;
  intensity: number;
  sessionId: number;
}

const moodColors = {
  happy: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  sad: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  energetic: "bg-red-500/20 text-red-400 border-red-500/30",
  calm: "bg-green-500/20 text-green-400 border-green-500/30",
  anxious: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  confident: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  excited: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  melancholic: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
  romantic: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  focused: "bg-teal-500/20 text-teal-400 border-teal-500/30",
  nostalgic: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  rebellious: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  peaceful: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
};

const moodIcons = {
  happy: "😊", sad: "😢", energetic: "⚡", calm: "🧘", anxious: "😰",
  confident: "💪", excited: "🎉", melancholic: "🌧️", romantic: "💕",
  focused: "🎯", nostalgic: "📸", rebellious: "🔥", peaceful: "☮️"
};

export default function MoodMixtapeSection({ onNavigate }: MoodMixtapeSectionProps) {
  const [moodText, setMoodText] = useState("");
  const [currentMood, setCurrentMood] = useState<MoodDetection | null>(null);
  const [activeMixtape, setActiveMixtape] = useState<MoodMixtape | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [adaptationMode, setAdaptationMode] = useState(false);
  const { toast } = useToast();

  // Fetch user's mixtapes
  const { data: mixtapesData } = useQuery({
    queryKey: ["/api/mixtapes"],
    enabled: false // Only fetch when user is authenticated
  });

  // Mood detection mutation
  const detectMoodMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await apiRequest("POST", "/api/mood/detect", { text });
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setCurrentMood({
          mood: data.mood,
          confidence: data.confidence,
          intensity: data.intensity,
          sessionId: data.sessionId
        });
        toast({
          title: "Mood Detected!",
          description: `Feeling ${data.mood} with ${data.confidence}% confidence`,
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Detection Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mixtape generation mutation
  const generateMixtapeMutation = useMutation({
    mutationFn: async ({ mood, intensity, preferences }: { mood: string, intensity: number, preferences?: string }) => {
      const res = await apiRequest("POST", "/api/mixtape/generate", { mood, intensity, preferences });
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setActiveMixtape({
          ...data.mixtape,
          tracks: data.tracks
        });
        toast({
          title: "Mixtape Created!",
          description: `"${data.mixtape.title}" is ready to play`,
        });
        queryClient.invalidateQueries({ queryKey: ["/api/mixtapes"] });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Mixtape adaptation mutation
  const adaptMixtapeMutation = useMutation({
    mutationFn: async ({ id, newMood, intensity }: { id: number, newMood: string, intensity: number }) => {
      const res = await apiRequest("POST", `/api/mixtape/${id}/adapt`, { newMood, intensity });
      return await res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        setActiveMixtape({
          ...data.mixtape,
          tracks: data.tracks
        });
        toast({
          title: "Mixtape Adapted!",
          description: data.transitionStrategy,
        });
        setAdaptationMode(false);
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Adaptation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleMoodDetection = async () => {
    if (!moodText.trim()) {
      toast({
        title: "Please enter some text",
        description: "Tell us how you're feeling to detect your mood",
        variant: "destructive",
      });
      return;
    }
    
    detectMoodMutation.mutate(moodText);
  };

  const handleGenerateMixtape = () => {
    if (!currentMood) return;
    
    generateMixtapeMutation.mutate({
      mood: currentMood.mood,
      intensity: currentMood.intensity,
      preferences: "High-quality tracks that match the emotional state"
    });
  };

  const handleAdaptMixtape = () => {
    if (!activeMixtape || !currentMood) return;
    
    adaptMixtapeMutation.mutate({
      id: activeMixtape.id,
      newMood: currentMood.mood,
      intensity: currentMood.intensity
    });
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (activeMixtape && currentTrackIndex < activeMixtape.tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  };

  // Auto-adaptation timer (simulate real-time mood changes)
  useEffect(() => {
    if (activeMixtape && currentMood) {
      const interval = setInterval(() => {
        // Simulate mood intensity fluctuation (±1)
        const fluctuation = Math.random() > 0.5 ? 1 : -1;
        const newIntensity = Math.max(1, Math.min(10, currentMood.intensity + fluctuation));
        
        if (newIntensity !== currentMood.intensity) {
          setCurrentMood({
            ...currentMood,
            intensity: newIntensity
          });
        }
      }, 30000); // Check every 30 seconds

      return () => clearInterval(interval);
    }
  }, [activeMixtape, currentMood]);

  return (
    <section id="mood-mixtape" className="min-h-screen py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A148C]/20 via-black to-[#2979FF]/20" />
      <div className="shape-blob bg-[#FF6B6B]/20 w-80 h-80 top-10 right-10 animate-float" />
      <div className="shape-blob bg-[#4ECDC4]/20 w-96 h-96 bottom-10 left-10 animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#FF6B6B]/20 text-[#FF6B6B] border-[#FF6B6B]/30">
            <Brain className="mr-2 h-4 w-4" />
            AI Mood Intelligence
          </Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            One-Click <span className="text-gradient">Mood Mixtape</span> Generator
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            AI that reads your emotions and creates the perfect soundtrack. Real-time adaptation to your changing mood.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mood Detection Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-card border-[#FF6B6B]/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#FF6B6B]">
                  <Heart className="h-5 w-5" />
                  Mood Detection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Tell me how you're feeling right now... (e.g., 'I'm feeling energetic and ready to take on the world!' or 'Having a peaceful evening, just want to relax')"
                  value={moodText}
                  onChange={(e) => setMoodText(e.target.value)}
                  className="min-h-[120px] bg-black/50 border-gray-700 text-white"
                />
                
                <Button 
                  onClick={handleMoodDetection}
                  disabled={detectMoodMutation.isPending || !moodText.trim()}
                  className="w-full bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-white"
                >
                  {detectMoodMutation.isPending ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Mood...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Detect My Mood
                    </>
                  )}
                </Button>

                {/* Mood Detection Results */}
                <AnimatePresence>
                  {currentMood && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="space-y-4 p-4 rounded-lg bg-black/30 border border-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <Badge className={moodColors[currentMood.mood as keyof typeof moodColors] || "bg-gray-500/20 text-gray-400"}>
                          {moodIcons[currentMood.mood as keyof typeof moodIcons]} {currentMood.mood}
                        </Badge>
                        <span className="text-sm text-gray-400">{currentMood.confidence}% confident</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Emotional Intensity</span>
                          <span className="text-[#4ECDC4]">{currentMood.intensity}/10</span>
                        </div>
                        <Progress value={currentMood.intensity * 10} className="h-2" />
                      </div>

                      <Button 
                        onClick={handleGenerateMixtape}
                        disabled={generateMixtapeMutation.isPending}
                        className="w-full bg-[#4ECDC4] hover:bg-[#4ECDC4]/80 text-black"
                      >
                        {generateMixtapeMutation.isPending ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Creating Mixtape...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Generate Mixtape
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mixtape Player */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="glass-card border-[#4ECDC4]/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#4ECDC4]">
                  <Music className="h-5 w-5" />
                  {activeMixtape ? "Your Mood Mixtape" : "Awaiting Generation"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeMixtape ? (
                  <div className="space-y-4">
                    <div className="text-center p-4 rounded-lg bg-black/30 border border-gray-700">
                      <h3 className="text-lg font-semibold text-white mb-2">{activeMixtape.title}</h3>
                      <Badge className={moodColors[activeMixtape.mood as keyof typeof moodColors]}>
                        {moodIcons[activeMixtape.mood as keyof typeof moodIcons]} {activeMixtape.mood}
                      </Badge>
                    </div>

                    {/* Current Track */}
                    {activeMixtape.tracks[currentTrackIndex] && (
                      <div className="p-4 rounded-lg bg-gradient-to-r from-[#2979FF]/20 to-[#4ECDC4]/20 border border-[#4ECDC4]/30">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-white">{activeMixtape.tracks[currentTrackIndex].title}</p>
                            <p className="text-sm text-gray-400">{activeMixtape.tracks[currentTrackIndex].artist}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-400">Energy: {activeMixtape.tracks[currentTrackIndex].energy}/10</p>
                            <p className="text-xs text-gray-400">Match: {activeMixtape.tracks[currentTrackIndex].mood_match}/10</p>
                          </div>
                        </div>
                        
                        {/* Playback Controls */}
                        <div className="flex items-center justify-center gap-4 mt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={togglePlayback}
                            className="bg-[#2979FF]/20 border-[#2979FF]/30 text-[#2979FF]"
                          >
                            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={nextTrack}
                            className="bg-[#2979FF]/20 border-[#2979FF]/30 text-[#2979FF]"
                          >
                            <SkipForward className="h-4 w-4" />
                          </Button>
                          <span className="text-sm text-gray-400">
                            {currentTrackIndex + 1} / {activeMixtape.tracks.length}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Adaptation Controls */}
                    {currentMood && activeMixtape.mood !== currentMood.mood && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-orange-400" />
                          <span className="text-sm text-orange-400">Mood Change Detected</span>
                        </div>
                        <p className="text-sm text-gray-300 mb-3">
                          Your mood has shifted from {activeMixtape.mood} to {currentMood.mood}. Adapt your mixtape?
                        </p>
                        <Button
                          onClick={handleAdaptMixtape}
                          disabled={adaptMixtapeMutation.isPending}
                          size="sm"
                          className="w-full bg-orange-500 hover:bg-orange-500/80 text-white"
                        >
                          {adaptMixtapeMutation.isPending ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Adapting...
                            </>
                          ) : (
                            <>
                              <Target className="mr-2 h-4 w-4" />
                              Adapt to New Mood
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}

                    {/* Track List */}
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {activeMixtape.tracks.map((track, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg border transition-all cursor-pointer ${
                            index === currentTrackIndex 
                              ? "bg-[#2979FF]/20 border-[#2979FF]/50" 
                              : "bg-black/20 border-gray-700 hover:bg-black/30"
                          }`}
                          onClick={() => setCurrentTrackIndex(index)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-white">{track.title}</p>
                              <p className="text-xs text-gray-400">{track.artist} • {track.genre}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {index === currentTrackIndex && isPlaying && (
                                <Volume2 className="h-4 w-4 text-[#2979FF] animate-pulse" />
                              )}
                              <div className="text-xs text-gray-400">
                                {track.energy}/10
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Headphones className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">No mixtape generated yet</p>
                    <p className="text-sm text-gray-500">Detect your mood first to create a personalized mixtape</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <Card className="glass-card border-[#FF6B6B]/30">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 text-[#FF6B6B] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Real-Time Detection</h3>
              <p className="text-sm text-gray-400">
                Advanced AI analyzes your text to understand emotional nuances and intensity
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-[#4ECDC4]/30">
            <CardContent className="p-6 text-center">
              <Timer className="h-8 w-8 text-[#4ECDC4] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Live Adaptation</h3>
              <p className="text-sm text-gray-400">
                Mixtape evolves with your mood changes for the perfect musical journey
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-[#2979FF]/30">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-[#2979FF] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">One-Click Magic</h3>
              <p className="text-sm text-gray-400">
                From emotion to music in seconds - no complex setup required
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}