import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface GenreRecommenderSectionProps {
  onNavigate: (sectionId: string) => void;
}

// Define genre types with their properties
const genreTypes = [
  {
    id: "electronic",
    name: "Electronic",
    description: "Digital sounds, synthesizers and drum machines",
    icon: "fas fa-laptop-code",
    color: "#00C8FF",
    gradient: "from-[#00C8FF] to-[#00A2FF]",
    sampleArtists: ["Daft Punk", "Disclosure", "Flume"],
    subgenres: ["House", "Techno", "Dubstep", "Ambient", "Drum & Bass"]
  },
  {
    id: "hiphop",
    name: "Hip Hop",
    description: "Rhythmic vocals, beats and urban stories",
    icon: "fas fa-microphone",
    color: "#FF6B00",
    gradient: "from-[#FF6B00] to-[#FF3C00]",
    sampleArtists: ["Kendrick Lamar", "J. Cole", "Tyler, The Creator"],
    subgenres: ["Trap", "Boom Bap", "Lo-Fi", "Conscious", "Drill"]
  },
  {
    id: "pop",
    name: "Pop",
    description: "Catchy melodies and contemporary production",
    icon: "fas fa-music",
    color: "#FF00A2",
    gradient: "from-[#FF00A2] to-[#FF0068]",
    sampleArtists: ["Dua Lipa", "The Weeknd", "Billie Eilish"],
    subgenres: ["Dance Pop", "Indie Pop", "Synth Pop", "Electropop", "K-Pop"]
  },
  {
    id: "rock",
    name: "Rock",
    description: "Guitar-driven energy and live instrumentation",
    icon: "fas fa-guitar",
    color: "#D90000",
    gradient: "from-[#D90000] to-[#AF0000]",
    sampleArtists: ["Arctic Monkeys", "Tame Impala", "The Strokes"],
    subgenres: ["Indie Rock", "Alternative", "Post-Rock", "Psychedelic", "Punk"]
  },
  {
    id: "rnb",
    name: "R&B",
    description: "Soulful vocals and contemporary rhythms",
    icon: "fas fa-compact-disc",
    color: "#9B00E8",
    gradient: "from-[#9B00E8] to-[#7B00E8]",
    sampleArtists: ["SZA", "Daniel Caesar", "H.E.R."],
    subgenres: ["Neo Soul", "Alternative R&B", "Trap Soul", "Contemporary R&B"]
  },
  {
    id: "jazz",
    name: "Jazz",
    description: "Improvisation and complex harmonies",
    icon: "fas fa-saxophone",
    color: "#FFC700",
    gradient: "from-[#FFC700] to-[#FFA700]",
    sampleArtists: ["Kamasi Washington", "Robert Glasper", "Nubya Garcia"],
    subgenres: ["Nu Jazz", "Jazz Fusion", "Modal Jazz", "Spiritual Jazz", "Bebop"]
  }
];

// Define mood types
const moodTypes = [
  { id: "energetic", name: "Energetic", icon: "fas fa-bolt" },
  { id: "chill", name: "Chill", icon: "fas fa-water" },
  { id: "melancholic", name: "Melancholic", icon: "fas fa-cloud-rain" },
  { id: "happy", name: "Happy", icon: "fas fa-smile" },
  { id: "focus", name: "Focus", icon: "fas fa-bullseye" },
  { id: "romantic", name: "Romantic", icon: "fas fa-heart" }
];

// Function to determine recommended genres based on input parameters
const getRecommendedGenres = (
  mood: string,
  tempo: number,
  complexity: number,
  experimental: boolean
) => {
  // This is a simple rule-based recommendation system
  // In a real application, this would be replaced with an API call to a ML model
  
  // Start with all genres
  let filteredGenres = [...genreTypes];
  
  // Filter by mood
  if (mood === "energetic") {
    filteredGenres = filteredGenres.filter(g => 
      g.id === "electronic" || g.id === "rock" || g.id === "hiphop"
    );
  } else if (mood === "chill") {
    filteredGenres = filteredGenres.filter(g => 
      g.id === "rnb" || g.id === "pop" || g.id === "electronic"
    );
  } else if (mood === "melancholic") {
    filteredGenres = filteredGenres.filter(g => 
      g.id === "rnb" || g.id === "jazz" || g.id === "rock"
    );
  } else if (mood === "happy") {
    filteredGenres = filteredGenres.filter(g => 
      g.id === "pop" || g.id === "electronic" || g.id === "hiphop"
    );
  } else if (mood === "focus") {
    filteredGenres = filteredGenres.filter(g => 
      g.id === "electronic" || g.id === "jazz" || g.id === "rock"
    );
  } else if (mood === "romantic") {
    filteredGenres = filteredGenres.filter(g => 
      g.id === "rnb" || g.id === "jazz" || g.id === "pop"
    );
  }
  
  // If experimental is true, adjust based on complexity
  if (experimental && complexity > 70) {
    // Prioritize more complex genres
    if (!filteredGenres.some(g => g.id === "jazz")) {
      const jazz = genreTypes.find(g => g.id === "jazz");
      if (jazz) filteredGenres.push(jazz);
    }
  }
  
  // If we have too many genres, limit based on tempo preference
  if (filteredGenres.length > 3) {
    if (tempo > 70) {
      // Higher tempo preference - prioritize more energetic genres
      filteredGenres = filteredGenres.filter(g => 
        g.id === "electronic" || g.id === "rock" || g.id === "hiphop" || g.id === "pop"
      );
    } else {
      // Lower tempo preference - prioritize more laid-back genres
      filteredGenres = filteredGenres.filter(g => 
        g.id === "rnb" || g.id === "jazz" || g.id === "pop" || g.id === "electronic"
      );
    }
  }
  
  // Ensure we have at least 2 recommendations
  if (filteredGenres.length < 2) {
    const missing = genreTypes.filter(g => !filteredGenres.some(fg => fg.id === g.id));
    if (missing.length > 0) {
      // Add random genres from missing if we don't have enough
      const randomIndices = Array.from({ length: Math.min(2, missing.length) }, () => 
        Math.floor(Math.random() * missing.length)
      );
      
      randomIndices.forEach(index => {
        if (!filteredGenres.some(g => g.id === missing[index].id)) {
          filteredGenres.push(missing[index]);
        }
      });
    }
  }
  
  // Limit to 3 max
  return filteredGenres.slice(0, 3);
};

// Form interface
interface RecommenderFormData {
  mood: string;
  tempo: number[];
  complexity: number[];
  experimental: boolean;
  favoriteArtists: string;
}

const GenreRecommenderSection: React.FC<GenreRecommenderSectionProps> = ({ onNavigate }) => {
  const [currentTab, setCurrentTab] = useState<string>("recommender");
  const [formData, setFormData] = useState<RecommenderFormData>({
    mood: "energetic",
    tempo: [50],
    complexity: [50],
    experimental: false,
    favoriteArtists: ""
  });
  
  const [results, setResults] = useState<typeof genreTypes | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would be an API call to a model
      // For this prototype, we'll use our rule-based function
      setTimeout(() => {
        const recommendedGenres = getRecommendedGenres(
          formData.mood,
          formData.tempo[0],
          formData.complexity[0],
          formData.experimental
        );
        
        setResults(recommendedGenres);
        setIsGenerating(false);
        
        toast({
          title: "Recommendations Ready!",
          description: "We've analyzed your preferences and found some perfect genres for you.",
        });
      }, 1500);
      
      // This would be the actual API implementation:
      /*
      const response = await apiRequest("POST", "/api/recommend-genres", {
        mood: formData.mood,
        tempo: formData.tempo[0],
        complexity: formData.complexity[0],
        experimental: formData.experimental,
        favoriteArtists: formData.favoriteArtists
      });
      
      setResults(response.recommendations);
      setIsGenerating(false);
      */
    } catch (error) {
      console.error("Error generating recommendations:", error);
      setIsGenerating(false);
      
      toast({
        title: "Something went wrong",
        description: "We couldn't generate your recommendations. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleInputChange = (
    name: keyof RecommenderFormData,
    value: string | number[] | boolean
  ) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <section id="genre-recommender" className="py-20 bg-gradient-to-b from-[#0A0A14] to-[#121212] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#121212] to-transparent"></div>
      <div className="shape-blob bg-[#00C8FF]/10 w-96 h-96 -left-48 top-20 blur-2xl"></div>
      <div className="shape-blob bg-[#FF00A2]/10 w-80 h-80 -right-40 bottom-20 blur-2xl"></div>
      
      {/* Musical note animations */}
      <div className="absolute top-20 right-10 opacity-20 hidden lg:block">
        <motion.div
          animate={{ 
            y: [-20, -120],
            x: [0, 50],
            opacity: [0, 0.7, 0],
            rotate: [0, 20]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut"
          }}
          className="text-5xl text-[#00C8FF]"
        >
          <i className="fas fa-music"></i>
        </motion.div>
      </div>
      
      <div className="absolute bottom-40 left-10 opacity-20 hidden lg:block">
        <motion.div
          animate={{ 
            y: [0, -100],
            x: [0, 30],
            opacity: [0, 0.7, 0],
            rotate: [0, -10]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            delay: 2,
            ease: "easeInOut"
          }}
          className="text-4xl text-[#FF00A2]"
        >
          <i className="fas fa-music"></i>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <Badge className="mb-4 bg-[#00C8FF]/20 text-[#00C8FF] hover:bg-[#00C8FF]/30 backdrop-blur-sm">POWERED BY AI</Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Genre <span className="text-gradient-blue">Recommender</span>
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Discover your perfect music genre match with our AI-powered recommender. Tell us your preferences,
            and we'll suggest genres tailored to your unique taste.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="recommender" className="w-full" onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-3 mb-8 bg-[#1A1A2E]">
              <TabsTrigger value="recommender" className="font-sora">Recommender</TabsTrigger>
              <TabsTrigger value="explore" className="font-sora">Explore Genres</TabsTrigger>
              <TabsTrigger value="about" className="font-sora">About AI Music</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recommender" className="mt-4">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Input form */}
                <Card className="bg-[#1A1A2E]/80 border-[#00C8FF]/20 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-orbitron">Your Preferences</CardTitle>
                    <CardDescription>
                      Tell us what you're looking for, and we'll match you with your ideal genres.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      {/* Mood Selection */}
                      <div className="space-y-3">
                        <Label>Current Mood</Label>
                        <div className="grid grid-cols-3 gap-2">
                          {moodTypes.map(mood => (
                            <div
                              key={mood.id}
                              className={`p-3 rounded-lg cursor-pointer transition-all text-center ${
                                formData.mood === mood.id
                                  ? "bg-[#00C8FF]/20 border border-[#00C8FF]"
                                  : "bg-[#0A0A14] hover:bg-[#1D1D30] border border-transparent"
                              }`}
                              onClick={() => handleInputChange("mood", mood.id)}
                            >
                              <i className={`${mood.icon} text-xl mb-2 ${formData.mood === mood.id ? "text-[#00C8FF]" : "text-gray-400"}`}></i>
                              <p className={`text-sm font-medium ${formData.mood === mood.id ? "text-white" : "text-gray-400"}`}>
                                {mood.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Tempo Slider */}
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <Label>Tempo Preference</Label>
                          <span className="text-xs text-gray-400">{formData.tempo[0]}%</span>
                        </div>
                        <Slider
                          value={formData.tempo}
                          onValueChange={(value) => handleInputChange("tempo", value)}
                          max={100}
                          step={1}
                          className="mb-1"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Slower</span>
                          <span>Faster</span>
                        </div>
                      </div>
                      
                      {/* Complexity Slider */}
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <Label>Complexity Preference</Label>
                          <span className="text-xs text-gray-400">{formData.complexity[0]}%</span>
                        </div>
                        <Slider
                          value={formData.complexity}
                          onValueChange={(value) => handleInputChange("complexity", value)}
                          max={100}
                          step={1}
                          className="mb-1"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Simple</span>
                          <span>Complex</span>
                        </div>
                      </div>
                      
                      {/* Experimental Toggle */}
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Open to Experimental</Label>
                          <p className="text-xs text-gray-400">
                            Include more adventurous sounds
                          </p>
                        </div>
                        <Switch
                          checked={formData.experimental}
                          onCheckedChange={(value) => handleInputChange("experimental", value)}
                        />
                      </div>
                      
                      {/* Favorite Artists */}
                      <div className="space-y-3">
                        <Label>Your Favorite Artists (Optional)</Label>
                        <Input
                          placeholder="e.g., The Weeknd, Dua Lipa, Kendrick Lamar"
                          value={formData.favoriteArtists}
                          onChange={(e) => handleInputChange("favoriteArtists", e.target.value)}
                          className="bg-[#0A0A14] border-[#00C8FF]/30"
                        />
                        <p className="text-xs text-gray-400">Separate multiple artists with commas</p>
                      </div>
                      
                      <Button 
                        type="submit"
                        className={`w-full bg-gradient-to-r from-[#00C8FF] to-[#00A2FF] hover:opacity-90 ${
                          isGenerating ? "animate-pulse" : ""
                        }`}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                            Analyzing...
                          </>
                        ) : "Get Recommendations"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
                
                {/* Results Area */}
                <div className="lg:col-span-3 space-y-6">
                  {isGenerating ? (
                    <Card className="bg-[#1A1A2E]/80 border-[#00C8FF]/20 h-full flex items-center justify-center p-12">
                      <div className="text-center">
                        <div className="mb-6 relative">
                          <div className="w-24 h-24 rounded-full bg-[#00C8FF]/10 flex items-center justify-center mx-auto animate-pulse">
                            <i className="fas fa-brain text-[#00C8FF] text-4xl"></i>
                          </div>
                          <div className="w-full max-w-xs mx-auto mt-6">
                            <div className="h-2 bg-[#00C8FF]/20 rounded-full mb-2 overflow-hidden">
                              <motion.div 
                                className="h-full bg-[#00C8FF] rounded-full" 
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5 }}
                              />
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-orbitron mb-2">Analyzing Your Preferences</h3>
                        <p className="text-gray-400">
                          Our AI is working to find your perfect genre matches...
                        </p>
                      </div>
                    </Card>
                  ) : results ? (
                    <Card className="bg-[#1A1A2E]/80 border-[#00C8FF]/20">
                      <CardHeader>
                        <CardTitle className="text-2xl font-orbitron">Your Personalized Recommendations</CardTitle>
                        <CardDescription>
                          Based on your preferences, here are the genres we think you'll love.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {results.map((genre) => (
                            <div 
                              key={genre.id}
                              className={`p-4 rounded-lg border transition-all cursor-pointer ${
                                selectedGenreId === genre.id
                                ? `bg-[#0A0A14] border-${genre.id === 'electronic' ? '[#00C8FF]' : genre.id === 'pop' ? '[#FF00A2]' : genre.id === 'hiphop' ? '[#FF6B00]' : genre.id === 'rock' ? '[#D90000]' : genre.id === 'rnb' ? '[#9B00E8]' : '[#FFC700]'}`
                                : 'bg-[#0A0A14]/50 border-[#1A1A2E] hover:border-gray-700'
                              }`}
                              onClick={() => setSelectedGenreId(selectedGenreId === genre.id ? null : genre.id)}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                                  genre.id === 'electronic' ? 'from-[#00C8FF] to-[#00A2FF]' :
                                  genre.id === 'pop' ? 'from-[#FF00A2] to-[#FF0068]' :
                                  genre.id === 'hiphop' ? 'from-[#FF6B00] to-[#FF3C00]' :
                                  genre.id === 'rock' ? 'from-[#D90000] to-[#AF0000]' :
                                  genre.id === 'rnb' ? 'from-[#9B00E8] to-[#7B00E8]' :
                                  'from-[#FFC700] to-[#FFA700]'
                                } flex items-center justify-center`}>
                                  <i className={`${genre.icon} text-white text-lg`}></i>
                                </div>
                                <div className="flex-1">
                                  <h3 className="text-lg font-medium">{genre.name}</h3>
                                  <p className="text-sm text-gray-400">{genre.description}</p>
                                </div>
                                <div>
                                  <i className={`fas fa-chevron-${selectedGenreId === genre.id ? 'up' : 'down'} text-gray-400`}></i>
                                </div>
                              </div>
                              
                              {selectedGenreId === genre.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-4 pt-4 border-t border-gray-800"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="text-white font-medium mb-2">Popular Subgenres</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {genre.subgenres.map((subgenre, index) => (
                                          <Badge 
                                            key={index}
                                            className={`
                                              bg-${genre.id === 'electronic' ? '[#00C8FF]' : 
                                                genre.id === 'pop' ? '[#FF00A2]' : 
                                                genre.id === 'hiphop' ? '[#FF6B00]' : 
                                                genre.id === 'rock' ? '[#D90000]' : 
                                                genre.id === 'rnb' ? '[#9B00E8]' : 
                                                '[#FFC700]'
                                              }/10 hover:bg-${
                                                genre.id === 'electronic' ? '[#00C8FF]' : 
                                                genre.id === 'pop' ? '[#FF00A2]' : 
                                                genre.id === 'hiphop' ? '[#FF6B00]' : 
                                                genre.id === 'rock' ? '[#D90000]' : 
                                                genre.id === 'rnb' ? '[#9B00E8]' : 
                                                '[#FFC700]'
                                              }/20
                                              text-${
                                                genre.id === 'electronic' ? '[#00C8FF]' : 
                                                genre.id === 'pop' ? '[#FF00A2]' : 
                                                genre.id === 'hiphop' ? '[#FF6B00]' : 
                                                genre.id === 'rock' ? '[#D90000]' : 
                                                genre.id === 'rnb' ? '[#9B00E8]' : 
                                                '[#FFC700]'
                                              }
                                            `}
                                          >
                                            {subgenre}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="text-white font-medium mb-2">Artists to Check Out</h4>
                                      <ul className="text-gray-400 text-sm space-y-1">
                                        {genre.sampleArtists.map((artist, index) => (
                                          <li key={index}>• {artist}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-4 flex justify-end">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className={`border-${
                                        genre.id === 'electronic' ? '[#00C8FF]' : 
                                        genre.id === 'pop' ? '[#FF00A2]' : 
                                        genre.id === 'hiphop' ? '[#FF6B00]' : 
                                        genre.id === 'rock' ? '[#D90000]' : 
                                        genre.id === 'rnb' ? '[#9B00E8]' : 
                                        '[#FFC700]'
                                      } text-${
                                        genre.id === 'electronic' ? '[#00C8FF]' : 
                                        genre.id === 'pop' ? '[#FF00A2]' : 
                                        genre.id === 'hiphop' ? '[#FF6B00]' : 
                                        genre.id === 'rock' ? '[#D90000]' : 
                                        genre.id === 'rnb' ? '[#9B00E8]' : 
                                        '[#FFC700]'
                                      }`}
                                      onClick={() => window.open(`https://open.spotify.com/search/${encodeURIComponent(genre.name)}`, '_blank')}
                                    >
                                      <i className="fab fa-spotify mr-2"></i> Listen on Spotify
                                    </Button>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col md:flex-row gap-4 justify-between border-t border-[#1A1A2E] pt-6">
                        <div className="text-sm text-gray-400">
                          Not quite right? Adjust your preferences and try again.
                        </div>
                        <Button 
                          variant="outline"
                          onClick={() => setResults(null)}
                          className="border-[#00C8FF]/50 text-[#00C8FF] hover:bg-[#00C8FF]/10"
                        >
                          <i className="fas fa-redo mr-2"></i> Start Over
                        </Button>
                      </CardFooter>
                    </Card>
                  ) : (
                    <Card className="bg-[#1A1A2E]/80 border-[#00C8FF]/20 h-full p-12">
                      <div className="text-center flex flex-col items-center justify-center h-full">
                        <div className="mb-6">
                          <div className="w-24 h-24 rounded-full bg-[#00C8FF]/10 flex items-center justify-center mx-auto">
                            <i className="fas fa-headphones-alt text-[#00C8FF] text-4xl"></i>
                          </div>
                        </div>
                        <h3 className="text-xl font-orbitron mb-2">Ready to Find Your Sound?</h3>
                        <p className="text-gray-400 max-w-lg mb-6">
                          Tell us about your preferences, and our AI will suggest genres that match your unique taste. From electronic beats to soulful melodies, we'll help you discover your perfect musical match.
                        </p>
                        <Button 
                          className="bg-gradient-to-r from-[#00C8FF] to-[#00A2FF] hover:opacity-90"
                          onClick={() => document.querySelector('form button[type="submit"]')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                          Fill Your Preferences
                        </Button>
                      </div>
                    </Card>
                  )}
                  
                  {/* Quick Playlists */}
                  {(selectedGenreId || results) && (
                    <Card className="bg-[#1A1A2E]/80 border-[#00C8FF]/20">
                      <CardHeader>
                        <CardTitle className="text-xl font-orbitron">Ready-Made Playlists</CardTitle>
                        <CardDescription>
                          Start exploring your recommended genres with these curated playlists.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {[
                            { 
                              title: "Electronic Essentials", 
                              image: "https://i.imgur.com/BYrVJna.jpg",
                              source: "Spotify"
                            },
                            { 
                              title: "Hip Hop Evolution", 
                              image: "https://i.imgur.com/MFaK6xX.jpg",
                              source: "Apple Music"
                            },
                            { 
                              title: "R&B Feels", 
                              image: "https://i.imgur.com/XnY9Mvx.jpg",
                              source: "Spotify"
                            },
                            { 
                              title: "Pop Universe", 
                              image: "https://i.imgur.com/8NQg207.jpg",
                              source: "YouTube Music"
                            }
                          ].map((playlist, index) => (
                            <div key={index} className="group relative cursor-pointer">
                              <div className="aspect-square rounded-lg overflow-hidden relative bg-[#0A0A14]">
                                <img 
                                  src={playlist.image} 
                                  alt={playlist.title} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                  <Button size="sm" className="bg-white text-black hover:bg-white/90">
                                    <i className="fas fa-play mr-1"></i> Play
                                  </Button>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                  <p className="text-white text-sm font-medium mb-1">{playlist.title}</p>
                                  <p className="text-gray-300 text-xs flex items-center">
                                    <i className={`fab fa-${playlist.source.toLowerCase().replace(' ', '-')} mr-1`}></i> 
                                    {playlist.source}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="explore" className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#00C8FF]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Genre Explorer</CardTitle>
                  <CardDescription>
                    Discover the rich diversity of music genres and find your next obsession.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {genreTypes.map((genre) => (
                      <motion.div
                        key={genre.id}
                        whileHover={{ y: -5 }}
                        className="bg-[#0A0A14] rounded-lg overflow-hidden border border-[#1A1A2E] hover:border-[#00C8FF]/30 transition-all"
                      >
                        <div className={`h-3 bg-gradient-to-r ${genre.gradient}`}></div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${genre.gradient} flex items-center justify-center`}>
                              <i className={`${genre.icon} text-white text-lg`}></i>
                            </div>
                            <div>
                              <h3 className="text-xl font-medium text-white">{genre.name}</h3>
                              <p className="text-sm text-gray-400">{genre.description}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-white text-sm font-medium mb-2">Popular Subgenres</h4>
                              <div className="flex flex-wrap gap-2">
                                {genre.subgenres.slice(0, 3).map((subgenre, index) => (
                                  <Badge 
                                    key={index}
                                    className={`
                                      bg-[${genre.color}]/10 hover:bg-[${genre.color}]/20
                                      text-[${genre.color}]
                                    `}
                                  >
                                    {subgenre}
                                  </Badge>
                                ))}
                                {genre.subgenres.length > 3 && (
                                  <Badge 
                                    className="bg-[#1A1A2E] hover:bg-[#1A1A2E]/80 text-gray-400"
                                  >
                                    +{genre.subgenres.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-white text-sm font-medium mb-2">Key Artists</h4>
                              <p className="text-gray-400 text-sm">
                                {genre.sampleArtists.join(', ')}
                              </p>
                            </div>
                            
                            <Button 
                              className={`w-full bg-[${genre.color}]/10 hover:bg-[${genre.color}]/20 text-[${genre.color}] border border-[${genre.color}]/30`}
                              variant="outline"
                              onClick={() => {
                                setCurrentTab("recommender");
                                setFormData({
                                  ...formData,
                                  mood: genre.id === "electronic" || genre.id === "hiphop" ? "energetic" :
                                        genre.id === "pop" ? "happy" :
                                        genre.id === "rock" ? "energetic" :
                                        genre.id === "rnb" ? "chill" : "focus"
                                });
                                setTimeout(() => {
                                  document.querySelector('form button[type="submit"]')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                              }}
                            >
                              Get Recommendations <i className="fas fa-chevron-right ml-2"></i>
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="about" className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#00C8FF]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">How Our AI Recommender Works</CardTitle>
                  <CardDescription>
                    Understand the technology behind our music recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#0A0A14] p-6 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-[#00C8FF]/20 flex items-center justify-center mb-4">
                        <i className="fas fa-brain text-[#00C8FF] text-xl"></i>
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">Neural Networks</h3>
                      <p className="text-gray-300">
                        Our recommendation engine uses advanced neural networks to analyze patterns across multiple dimensions - from rhythm and melody to instrumentation and cultural context. By understanding these complex relationships, we can make surprisingly accurate predictions about what genres will resonate with you.
                      </p>
                    </div>
                    
                    <div className="bg-[#0A0A14] p-6 rounded-lg">
                      <div className="w-12 h-12 rounded-full bg-[#FF00A2]/20 flex items-center justify-center mb-4">
                        <i className="fas fa-database text-[#FF00A2] text-xl"></i>
                      </div>
                      <h3 className="text-xl font-medium text-white mb-2">Vast Music Knowledge</h3>
                      <p className="text-gray-300">
                        Our system has been trained on millions of songs across all genres, eras, and cultural contexts. It understands the subtle differences between subgenres and can identify the unique elements that make each genre special. This depth of knowledge helps us match you with precisely the right musical styles.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-[#0A0A14] p-6 rounded-lg">
                    <h3 className="text-xl font-medium text-white mb-4">How We Make Recommendations</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#00C8FF]/80 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Preference Analysis</h4>
                          <p className="text-gray-400">
                            We analyze your mood, tempo preferences, and complexity desires to understand what sound you're looking for right now.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#00C8FF]/60 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Artist Matching</h4>
                          <p className="text-gray-400">
                            When you specify favorite artists, we identify the common characteristics and genres these artists work in, then find similar musical styles.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#00C8FF]/40 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Personalized Recommendations</h4>
                          <p className="text-gray-400">
                            We calculate which genres most closely match all your criteria and rank them based on compatibility score.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#00C8FF]/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">4</span>
                        </div>
                        <div>
                          <h4 className="text-white font-medium">Continuous Learning</h4>
                          <p className="text-gray-400">
                            Our system continuously improves as it learns from user feedback, staying current with evolving musical trends and genres.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center bg-gradient-to-r from-[#00C8FF]/20 to-[#FF00A2]/20 p-8 rounded-lg border border-[#00C8FF]/10">
                    <h3 className="text-2xl font-orbitron mb-4">Ready to discover your perfect genres?</h3>
                    <p className="text-gray-300 mb-6">
                      Let our AI find the music styles that match your unique tastes and preferences.
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-[#00C8FF] to-[#FF00A2] hover:opacity-90 text-white"
                      onClick={() => {
                        setCurrentTab("recommender");
                        setTimeout(() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }, 100);
                      }}
                    >
                      Try the Recommender <i className="fas fa-arrow-right ml-2"></i>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default GenreRecommenderSection;