import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { sunoAudioEngine, MusicGenerationData } from "@/lib/sunoAudioEngine";
import AuthGateModal from "@/components/auth-gate-modal";

interface EmotionalMusicPaletteProps {
  onNavigate: (sectionId: string) => void;
}

interface EmotionalColor {
  id: string;
  name: string;
  color: string;
  emotion: string;
  description: string;
  musicAttributes: {
    tempo: number;
    key: string;
    intensity: number;
    instruments: string[];
  };
}

interface PaletteSelection {
  primary: EmotionalColor | null;
  secondary: EmotionalColor | null;
  accent: EmotionalColor | null;
}

const EmotionalMusicPalette: React.FC<EmotionalMusicPaletteProps> = ({ onNavigate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColors, setSelectedColors] = useState<PaletteSelection>({
    primary: null,
    secondary: null,
    accent: null
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTracks, setGeneratedTracks] = useState<MusicGenerationData[]>([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [generationCount, setGenerationCount] = useState(0);
  const [intensity, setIntensity] = useState([70]);
  const [complexity, setComplexity] = useState([60]);
  
  const { toast } = useToast();
  const { user } = useAuth();

  const FREE_GENERATION_LIMIT = 3;

  const emotionalColors: EmotionalColor[] = [
    {
      id: "passionate-red",
      name: "Passionate Red",
      color: "#FF1744",
      emotion: "Passion",
      description: "Intense, fiery, and dramatic",
      musicAttributes: {
        tempo: 140,
        key: "E minor",
        intensity: 90,
        instruments: ["electric guitar", "drums", "strings"]
      }
    },
    {
      id: "energetic-orange",
      name: "Energetic Orange",
      color: "#FF9500",
      emotion: "Energy",
      description: "Vibrant, uplifting, and dynamic",
      musicAttributes: {
        tempo: 128,
        key: "C major",
        intensity: 85,
        instruments: ["synthesizer", "bass", "percussion"]
      }
    },
    {
      id: "joyful-yellow",
      name: "Joyful Yellow",
      color: "#FFD600",
      emotion: "Joy",
      description: "Bright, cheerful, and optimistic",
      musicAttributes: {
        tempo: 120,
        key: "G major",
        intensity: 80,
        instruments: ["piano", "ukulele", "bells"]
      }
    },
    {
      id: "hopeful-green",
      name: "Hopeful Green",
      color: "#4CAF50",
      emotion: "Hope",
      description: "Fresh, natural, and growing",
      musicAttributes: {
        tempo: 100,
        key: "D major",
        intensity: 60,
        instruments: ["acoustic guitar", "flute", "harp"]
      }
    },
    {
      id: "serene-blue",
      name: "Serene Blue",
      color: "#2196F3",
      emotion: "Serenity",
      description: "Calm, peaceful, and flowing",
      musicAttributes: {
        tempo: 80,
        key: "A minor",
        intensity: 40,
        instruments: ["piano", "strings", "ambient pads"]
      }
    },
    {
      id: "mystical-indigo",
      name: "Mystical Indigo",
      color: "#3F51B5",
      emotion: "Mystery",
      description: "Deep, contemplative, and ethereal",
      musicAttributes: {
        tempo: 90,
        key: "F# minor",
        intensity: 55,
        instruments: ["synthesizer", "choir", "celesta"]
      }
    },
    {
      id: "creative-purple",
      name: "Creative Purple",
      color: "#9C27B0",
      emotion: "Creativity",
      description: "Imaginative, artistic, and unique",
      musicAttributes: {
        tempo: 110,
        key: "B minor",
        intensity: 70,
        instruments: ["electric piano", "saxophone", "drums"]
      }
    },
    {
      id: "romantic-pink",
      name: "Romantic Pink",
      color: "#E91E63",
      emotion: "Romance",
      description: "Tender, loving, and intimate",
      musicAttributes: {
        tempo: 75,
        key: "Bb major",
        intensity: 50,
        instruments: ["violin", "piano", "soft vocals"]
      }
    },
    {
      id: "melancholic-grey",
      name: "Melancholic Grey",
      color: "#607D8B",
      emotion: "Melancholy",
      description: "Reflective, nostalgic, and bittersweet",
      musicAttributes: {
        tempo: 70,
        key: "D minor",
        intensity: 45,
        instruments: ["cello", "piano", "rain sounds"]
      }
    },
    {
      id: "powerful-black",
      name: "Powerful Black",
      color: "#212121",
      emotion: "Power",
      description: "Strong, bold, and commanding",
      musicAttributes: {
        tempo: 130,
        key: "E minor",
        intensity: 95,
        instruments: ["electric guitar", "bass", "heavy drums"]
      }
    },
    {
      id: "pure-white",
      name: "Pure White",
      color: "#FFFFFF",
      emotion: "Purity",
      description: "Clean, minimal, and innocent",
      musicAttributes: {
        tempo: 60,
        key: "C major",
        intensity: 30,
        instruments: ["solo piano", "soft strings", "wind chimes"]
      }
    },
    {
      id: "warm-gold",
      name: "Warm Gold",
      color: "#FFD700",
      emotion: "Warmth",
      description: "Luxurious, confident, and radiant",
      musicAttributes: {
        tempo: 95,
        key: "F major",
        intensity: 75,
        instruments: ["brass", "jazz piano", "smooth bass"]
      }
    }
  ];

  useEffect(() => {
    if (!user && generationCount >= FREE_GENERATION_LIMIT) {
      setShowAuthModal(true);
    }
  }, [user, generationCount]);

  useEffect(() => {
    drawPalette();
  }, [selectedColors]);

  const drawPalette = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw color wheel background
    drawColorWheel(ctx, canvas.width / 2, canvas.height / 2, 150);

    // Draw selected colors overlay
    if (selectedColors.primary || selectedColors.secondary || selectedColors.accent) {
      drawSelectedColorsOverlay(ctx, canvas.width, canvas.height);
    }
  };

  const drawColorWheel = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
    const segments = emotionalColors.length;
    const angleStep = (2 * Math.PI) / segments;

    emotionalColors.forEach((color, index) => {
      const startAngle = index * angleStep - Math.PI / 2;
      const endAngle = (index + 1) * angleStep - Math.PI / 2;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color.color;
      ctx.fill();

      // Add subtle border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Add center text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('MOOD', centerX, centerY - 5);
    ctx.fillText('PALETTE', centerX, centerY + 10);
  };

  const drawSelectedColorsOverlay = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (!selectedColors.primary) return;

    // Create gradient based on selected colors
    const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, 200);
    
    if (selectedColors.primary) {
      gradient.addColorStop(0, `${selectedColors.primary.color}40`);
    }
    if (selectedColors.secondary) {
      gradient.addColorStop(0.5, `${selectedColors.secondary.color}30`);
    }
    if (selectedColors.accent) {
      gradient.addColorStop(1, `${selectedColors.accent.color}20`);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  };

  const handleColorSelect = (color: EmotionalColor, slot: 'primary' | 'secondary' | 'accent') => {
    setSelectedColors(prev => ({
      ...prev,
      [slot]: color
    }));
  };

  const generateMusicFromPalette = async () => {
    if (!user && generationCount >= FREE_GENERATION_LIMIT) {
      setShowAuthModal(true);
      return;
    }

    if (!selectedColors.primary) {
      toast({
        title: "Select Primary Color",
        description: "Please select at least a primary emotional color to generate music.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const primaryEmotion = selectedColors.primary;
      const secondaryEmotion = selectedColors.secondary;
      
      // Generate prompt based on color palette
      const prompt = generatePromptFromPalette();
      
      // Calculate music parameters from palette
      const musicParams = calculateMusicParameters();

      const musicData = await sunoAudioEngine.generateAdvancedMusic({
        prompt,
        genre: musicParams.genre,
        mood: primaryEmotion.emotion.toLowerCase(),
        title: `${primaryEmotion.name} Symphony`,
        artist: "Emotional Palette AI",
        duration: 120,
        style: "palette-inspired",
        includeVocals: false,
        instrumentalLayers: complexity[0] / 10
      });

      setGeneratedTracks(prev => [musicData, ...prev]);
      setGenerationCount(prev => prev + 1);
      setIsGenerating(false);
      
      toast({
        title: "Emotional Music Generated",
        description: `"${musicData.title}" created from your color palette!`,
      });
    } catch (error: any) {
      setIsGenerating(false);
      toast({
        title: "Generation Failed",
        description: "Unable to generate music from palette. Please try again.",
        variant: "destructive",
      });
    }
  };

  const generatePromptFromPalette = (): string => {
    const primary = selectedColors.primary!;
    const secondary = selectedColors.secondary;
    const accent = selectedColors.accent;

    let prompt = `Create an instrumental piece that embodies ${primary.emotion.toLowerCase()} with ${primary.description}`;
    
    if (secondary) {
      prompt += `, blending with ${secondary.emotion.toLowerCase()} elements that are ${secondary.description}`;
    }
    
    if (accent) {
      prompt += `, and subtle touches of ${accent.emotion.toLowerCase()} for ${accent.description} moments`;
    }

    prompt += `. Use ${primary.musicAttributes.instruments.join(', ')} as primary instruments`;
    prompt += ` in ${primary.musicAttributes.key} with a tempo around ${primary.musicAttributes.tempo} BPM`;

    return prompt;
  };

  const calculateMusicParameters = () => {
    const primary = selectedColors.primary!;
    const avgTempo = primary.musicAttributes.tempo;
    const avgIntensity = (primary.musicAttributes.intensity * intensity[0]) / 100;

    // Determine genre based on tempo and intensity
    let genre = "ambient";
    if (avgTempo > 120 && avgIntensity > 70) genre = "electronic";
    else if (avgTempo > 100 && avgIntensity > 60) genre = "pop";
    else if (avgTempo < 80) genre = "classical";
    else if (avgIntensity < 50) genre = "jazz";

    return { genre, tempo: avgTempo, intensity: avgIntensity };
  };

  const handleDownloadTrack = async (track: MusicGenerationData) => {
    try {
      await sunoAudioEngine.downloadAudio(track, 'wav');
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
      await sunoAudioEngine.shareViaWhatsApp(track);
    } catch (error: any) {
      toast({
        title: "Share Failed",
        description: "Unable to share via WhatsApp.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="emotional-palette" className="py-20 bg-gradient-to-b from-[#0E0E1A] to-[#121212] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A0A14] to-transparent"></div>
      <div className="shape-blob bg-[#FF1744]/10 w-96 h-96 -right-48 top-20 blur-2xl"></div>
      <div className="shape-blob bg-[#2196F3]/10 w-80 h-80 -left-40 bottom-20 blur-2xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <Badge className="mb-4 bg-[#FF1744]/20 text-[#FF1744] hover:bg-[#FF1744]/30 backdrop-blur-sm">
            EMOTIONAL AI
          </Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-gradient-rainbow">
            Emotional Music Palette
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Transform colors and emotions into music. Select colors that represent your feelings 
            and watch as AI creates a musical composition that captures your emotional spectrum.
          </p>
          
          {!user && (
            <div className="mt-6 p-4 bg-[#1A1A2E]/50 rounded-lg border border-[#FF1744]/30">
              <p className="text-sm text-gray-400">
                Free users: {generationCount}/{FREE_GENERATION_LIMIT} palette generations used
              </p>
            </div>
          )}
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Color Palette Selector */}
          <Card className="bg-[#1A1A2E]/90 border-[#FF1744]/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron text-white">
                Emotional Color Wheel
              </CardTitle>
              <CardDescription className="text-gray-400">
                Click colors to build your emotional palette
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Interactive Color Wheel Canvas */}
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={320}
                  className="border border-[#FF1744]/20 rounded-full cursor-pointer"
                  onClick={(e) => {
                    const rect = canvasRef.current?.getBoundingClientRect();
                    if (!rect) return;
                    
                    const x = e.clientX - rect.left - 160;
                    const y = e.clientY - rect.top - 160;
                    const angle = Math.atan2(y, x) + Math.PI / 2;
                    const normalizedAngle = angle < 0 ? angle + 2 * Math.PI : angle;
                    const colorIndex = Math.floor((normalizedAngle / (2 * Math.PI)) * emotionalColors.length);
                    
                    if (Math.sqrt(x * x + y * y) <= 150 && Math.sqrt(x * x + y * y) >= 40) {
                      const selectedColor = emotionalColors[colorIndex];
                      if (!selectedColors.primary) {
                        handleColorSelect(selectedColor, 'primary');
                      } else if (!selectedColors.secondary) {
                        handleColorSelect(selectedColor, 'secondary');
                      } else {
                        handleColorSelect(selectedColor, 'accent');
                      }
                    }
                  }}
                />
              </div>

              {/* Selected Colors Display */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Selected Palette</h3>
                <div className="grid grid-cols-3 gap-4">
                  {(['primary', 'secondary', 'accent'] as const).map((slot) => (
                    <div key={slot} className="text-center">
                      <div 
                        className="w-full h-16 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center mb-2 cursor-pointer"
                        style={{ 
                          backgroundColor: selectedColors[slot]?.color || 'transparent',
                          borderColor: selectedColors[slot] ? selectedColors[slot]!.color : '#666'
                        }}
                        onClick={() => setSelectedColors(prev => ({ ...prev, [slot]: null }))}
                      >
                        {!selectedColors[slot] && (
                          <span className="text-gray-500 text-sm capitalize">{slot}</span>
                        )}
                      </div>
                      {selectedColors[slot] && (
                        <div>
                          <p className="text-white text-sm font-medium">{selectedColors[slot]!.emotion}</p>
                          <p className="text-gray-400 text-xs">{selectedColors[slot]!.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Music Parameters */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Emotional Intensity</label>
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-xs text-gray-500">Current: {intensity[0]}%</p>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Musical Complexity</label>
                  <Slider
                    value={complexity}
                    onValueChange={setComplexity}
                    max={100}
                    step={1}
                    className="mb-2"
                  />
                  <p className="text-xs text-gray-500">Layers: {Math.ceil(complexity[0] / 10)}</p>
                </div>
              </div>

              <Button 
                onClick={generateMusicFromPalette}
                disabled={isGenerating || !selectedColors.primary || (!user && generationCount >= FREE_GENERATION_LIMIT)}
                className="w-full bg-gradient-to-r from-[#FF1744] to-[#E91E63] hover:opacity-90"
              >
                {isGenerating ? (
                  <>
                    <i className="fas fa-palette mr-2 animate-spin"></i>
                    Generating Emotional Music... ({Math.floor(Math.random() * 45) + 30}s)
                  </>
                ) : (
                  <>
                    <i className="fas fa-palette mr-2"></i>
                    Generate Music from Palette
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Music Library */}
          <Card className="bg-[#1A1A2E]/90 border-[#2196F3]/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron text-white">
                Emotional Compositions
              </CardTitle>
              <CardDescription className="text-gray-400">
                Music generated from your color palettes ({generatedTracks.length})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {generatedTracks.length === 0 ? (
                  <div className="text-center py-8">
                    <i className="fas fa-music text-4xl text-gray-600 mb-4"></i>
                    <p className="text-gray-400">No emotional compositions yet</p>
                    <p className="text-gray-500 text-sm">Create your first palette to generate music</p>
                  </div>
                ) : (
                  generatedTracks.map((track, index) => (
                    <Card key={index} className="bg-[#0A0A14]/50 border-[#2196F3]/20">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-white font-semibold">{track.title}</h4>
                            <p className="text-gray-400 text-sm">{track.artist}</p>
                          </div>
                          <Badge className="bg-[#2196F3]/20 text-[#2196F3]">
                            {track.duration}s
                          </Badge>
                        </div>
                        
                        <div className="relative h-12 bg-[#1D1D30] rounded-md overflow-hidden mb-3">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-6 flex items-center">
                              {Array.from({ length: 40 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className="w-1 mx-0.5 bg-gradient-to-t from-[#FF1744] to-[#2196F3]"
                                  style={{ 
                                    height: `${Math.sin(i * 0.4) * 10 + 15}px`,
                                    opacity: i > 30 ? 0.4 : 1
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownloadTrack(track)}
                            className="flex-1 border-[#FF1744]/50 text-[#FF1744] hover:bg-[#FF1744]/10"
                          >
                            <i className="fas fa-download mr-2"></i>WAV
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleShareTrack(track)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <i className="fab fa-whatsapp mr-2"></i>Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Color Reference Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-[#1A1A2E]/90 border-[#9C27B0]/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-orbitron text-white text-center">
                Emotional Color Reference
              </CardTitle>
              <CardDescription className="text-center text-gray-400">
                Understanding the emotional spectrum of colors in music
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {emotionalColors.map((color) => (
                  <div 
                    key={color.id}
                    className="text-center cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => handleColorSelect(color, 'primary')}
                  >
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white/20"
                      style={{ backgroundColor: color.color }}
                    ></div>
                    <h4 className="text-white text-sm font-medium">{color.emotion}</h4>
                    <p className="text-gray-500 text-xs">{color.musicAttributes.key}</p>
                    <p className="text-gray-500 text-xs">{color.musicAttributes.tempo} BPM</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Authentication Gate Modal */}
      <AuthGateModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        featureName="Emotional Music Palette"
        usedCount={generationCount}
        maxCount={FREE_GENERATION_LIMIT}
      />
    </section>
  );
};

export default EmotionalMusicPalette;