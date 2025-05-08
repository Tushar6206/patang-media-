import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface TwinSyncSectionProps {
  onNavigate: (sectionId: string) => void;
}

const TwinSyncSection: React.FC<TwinSyncSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("create");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [hasAvatar, setHasAvatar] = useState(false);
  const { toast } = useToast();
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Simulate upload and processing
      setTimeout(() => {
        setIsUploading(false);
        setHasAvatar(true);
        toast({
          title: "Photos uploaded",
          description: "Your photos have been processed successfully.",
        });
      }, 2000);
    }
  };
  
  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Avatar Created",
        description: "Your digital twin is ready to perform!",
      });
    }, 3000);
  };
  
  // Preset dance styles
  const danceStyles = [
    { id: "hiphop", name: "Hip Hop", icon: "🕺" },
    { id: "kpop", name: "K-Pop", icon: "💫" },
    { id: "contemporary", name: "Contemporary", icon: "✨" },
    { id: "robotic", name: "Robotic", icon: "🤖" },
    { id: "ballet", name: "Ballet", icon: "🩰" },
    { id: "latin", name: "Latin", icon: "💃" },
  ];
  
  // Languages for singing
  const languages = [
    { id: "english", name: "English" },
    { id: "spanish", name: "Spanish" },
    { id: "korean", name: "Korean" },
    { id: "japanese", name: "Japanese" },
    { id: "hindi", name: "Hindi" },
    { id: "french", name: "French" },
  ];
  
  return (
    <section id="twinsync" className="py-20 bg-gradient-to-b from-[#0E0E1A] to-[#121212] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A0A14] to-transparent"></div>
      <div className="shape-blob bg-[#FF5722]/10 w-96 h-96 -left-48 top-20 blur-2xl"></div>
      <div className="shape-blob bg-[#4CAF50]/10 w-80 h-80 -right-40 bottom-20 blur-2xl"></div>
      
      {/* Digital avatar silhouette */}
      <div className="absolute left-0 top-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute left-0 top-0 w-full h-full bg-[url('https://i.imgur.com/ZSn1oBk.png')] bg-no-repeat bg-right-top bg-contain"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <Badge className="mb-4 bg-[#FF5722]/20 text-[#FF5722] hover:bg-[#FF5722]/30 backdrop-blur-sm">VIRTUAL PERFORMER</Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-gradient-orange">TwinSync™</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Create your photorealistic digital twin that can dance, sing, and perform in any language or style.
            Perfect for content creators looking to scale their production capabilities.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="create" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8 bg-[#1A1A2E]">
              <TabsTrigger value="create" className="font-sora">Create Avatar</TabsTrigger>
              <TabsTrigger value="perform" className="font-sora">Performance Studio</TabsTrigger>
              <TabsTrigger value="multi" className="font-sora">Multilingual</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#FF5722]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Create Your Digital Twin</CardTitle>
                  <CardDescription>
                    Upload photos of yourself to generate a photorealistic digital avatar
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-sora font-medium text-white">Upload Your Photos</h3>
                      <div className="border-2 border-dashed border-[#FF5722]/30 rounded-lg p-8 text-center bg-[#0A0A14]/50 hover:bg-[#0A0A14] transition-colors cursor-pointer">
                        <input 
                          type="file" 
                          accept="image/*" 
                          id="photo-upload" 
                          className="hidden" 
                          multiple
                          onChange={handleFileUpload}
                        />
                        <label htmlFor="photo-upload" className="cursor-pointer">
                          <div className="text-6xl mb-4 text-[#FF5722]/70 mx-auto w-16">
                            <i className="fas fa-user-circle"></i>
                          </div>
                          <p className="text-gray-300">
                            {isUploading 
                              ? "Processing photos..." 
                              : hasAvatar 
                                ? "Photos processed successfully" 
                                : "Upload 3-5 photos of your face"
                            }
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            {isUploading 
                              ? <i className="fas fa-spinner fa-spin"></i>
                              : hasAvatar 
                                ? <i className="fas fa-check-circle text-green-500"></i>
                                : "Different angles recommended (JPG, PNG)"
                            }
                          </p>
                        </label>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Your photos are processed securely and are never shared with third parties.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-sora font-medium text-white">Avatar Customization</h3>
                      <div className="bg-[#0A0A14] p-6 rounded-lg space-y-4">
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Body Type</label>
                          <Select defaultValue="athletic">
                            <SelectTrigger className="border-[#FF5722]/30">
                              <SelectValue placeholder="Select body type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="slim">Slim</SelectItem>
                              <SelectItem value="athletic">Athletic</SelectItem>
                              <SelectItem value="muscular">Muscular</SelectItem>
                              <SelectItem value="plus">Plus Size</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Height</label>
                          <Slider
                            defaultValue={[170]}
                            min={150}
                            max={200}
                            step={1}
                            className="mb-1"
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>150cm</span>
                            <span>170cm</span>
                            <span>200cm</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col space-y-1">
                            <Label htmlFor="stylized-mode">Stylized Mode</Label>
                            <span className="text-xs text-gray-500">
                              Slightly enhanced avatar appearance
                            </span>
                          </div>
                          <Switch id="stylized-mode" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {hasAvatar && (
                    <div className="bg-[#0A0A14] p-6 rounded-lg">
                      <h3 className="text-lg font-sora font-medium text-white mb-4">Avatar Preview</h3>
                      <div className="aspect-video bg-[#1A1A2E] rounded-lg overflow-hidden flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5722]/20 to-[#4CAF50]/20"></div>
                        <div className="text-center">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#FF5722] to-[#4CAF50] flex items-center justify-center">
                            <i className="fas fa-user text-white text-2xl"></i>
                          </div>
                          <p className="text-white font-medium">Your Digital Twin</p>
                          <p className="text-sm text-gray-400">Ready for performances</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" className="border-gray-600 text-gray-400">
                    Start Over
                  </Button>
                  <Button 
                    onClick={handleGenerate}
                    disabled={!hasAvatar || isGenerating}
                    className={`bg-gradient-to-r from-[#FF5722] to-[#4CAF50] hover:opacity-90 ${
                      isGenerating ? "animate-pulse" : ""
                    }`}
                  >
                    {isGenerating ? "Generating Avatar..." : "Generate Avatar"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="perform" className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#FF5722]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Performance Studio</CardTitle>
                  <CardDescription>
                    Make your avatar dance to any music with choreographed performances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-sora font-medium text-white">Select Music</h3>
                        <div className="bg-[#0A0A14] p-4 rounded-lg">
                          <Select>
                            <SelectTrigger className="border-[#FF5722]/30 mb-4">
                              <SelectValue placeholder="Choose music track" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="trending1">Trending Hit 1</SelectItem>
                              <SelectItem value="trending2">Trending Hit 2</SelectItem>
                              <SelectItem value="patang1">Patang Originals 1</SelectItem>
                              <SelectItem value="custom">Upload Custom Track</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <div className="h-16 bg-[#1A1A2E] rounded-md overflow-hidden flex items-center">
                            <div className="w-full h-8 flex items-center justify-center">
                              <div className="w-11/12 flex items-end space-x-0.5">
                                {/* Audio waveform */}
                                {Array.from({ length: 80 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className="w-full bg-gradient-to-t from-[#FF5722] to-[#4CAF50]"
                                    style={{ 
                                      height: `${Math.sin(i * 0.2) * 15 + 2}px`,
                                      opacity: 0.7,
                                      borderRadius: '1px'
                                    }}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-sora font-medium text-white">Choose Dance Style</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {danceStyles.map((style) => (
                            <div 
                              key={style.id}
                              className="p-3 rounded-lg cursor-pointer transition-all bg-[#0A0A14] hover:bg-[#1D1D30] text-center"
                            >
                              <div className="text-2xl mb-2">{style.icon}</div>
                              <p className="text-sm font-medium">{style.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#0A0A14] p-6 rounded-lg">
                      <h3 className="text-lg font-sora font-medium text-white mb-4">Performance Preview</h3>
                      <div className="aspect-video bg-[#1A1A2E] rounded-lg overflow-hidden flex items-center justify-center relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#FF5722]/20 to-[#4CAF50]/20"></div>
                        <div className="w-16 h-16 rounded-full bg-[#0A0A14]/80 border-4 border-[#FF5722]/30 flex items-center justify-center">
                          <i className="fas fa-play text-[#FF5722]"></i>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Performance Energy</label>
                          <Slider
                            defaultValue={[80]}
                            max={100}
                            step={1}
                            className="mb-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Movement Style</label>
                          <Select defaultValue="dynamic">
                            <SelectTrigger className="border-[#FF5722]/30">
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fluid">Fluid</SelectItem>
                              <SelectItem value="dynamic">Dynamic</SelectItem>
                              <SelectItem value="sharp">Sharp</SelectItem>
                              <SelectItem value="expressive">Expressive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Camera Movement</label>
                          <Select defaultValue="dynamic">
                            <SelectTrigger className="border-[#FF5722]/30">
                              <SelectValue placeholder="Select movement" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="static">Static</SelectItem>
                              <SelectItem value="dynamic">Dynamic</SelectItem>
                              <SelectItem value="cinematic">Cinematic</SelectItem>
                              <SelectItem value="orbit">Orbit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button className="bg-gradient-to-r from-[#FF5722] to-[#4CAF50] hover:opacity-90">
                    Generate Dance Performance
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="multi" className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#FF5722]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Multilingual Performer</CardTitle>
                  <CardDescription>
                    Make your avatar sing in any language with perfect pronunciation and emotion
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-sora font-medium text-white">Choose Language</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {languages.map((lang) => (
                            <div 
                              key={lang.id}
                              className="p-3 rounded-lg cursor-pointer transition-all bg-[#0A0A14] hover:bg-[#1D1D30] text-center"
                            >
                              <p className="font-medium">{lang.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-sora font-medium text-white">Input Lyrics or Song</h3>
                        <div className="bg-[#0A0A14] p-4 rounded-lg">
                          <Input 
                            placeholder="Enter lyrics or song name..."
                            className="bg-[#1A1A2E] border-[#FF5722]/30 mb-2"
                          />
                          
                          <div className="flex items-center space-x-4 mb-2">
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="inputLyrics" name="inputType" className="accent-[#FF5722]" checked />
                              <label htmlFor="inputLyrics" className="text-sm text-gray-300">Custom Lyrics</label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="radio" id="inputSong" name="inputType" className="accent-[#FF5722]" />
                              <label htmlFor="inputSong" className="text-sm text-gray-300">Existing Song</label>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col space-y-1">
                              <Label htmlFor="auto-translate">Auto Translate</Label>
                              <span className="text-xs text-gray-500">
                                Translate lyrics automatically
                              </span>
                            </div>
                            <Switch id="auto-translate" />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-[#0A0A14] p-6 rounded-lg space-y-4">
                      <h3 className="text-lg font-sora font-medium text-white mb-4">Vocal Style & Emotion</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Vocal Style</label>
                          <Select defaultValue="pop">
                            <SelectTrigger className="border-[#FF5722]/30">
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pop">Pop</SelectItem>
                              <SelectItem value="rnb">R&B</SelectItem>
                              <SelectItem value="rock">Rock</SelectItem>
                              <SelectItem value="folk">Folk</SelectItem>
                              <SelectItem value="operatic">Operatic</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Emotional Intensity</label>
                          <Slider
                            defaultValue={[70]}
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-3">
                          <label className="text-sm text-gray-400 mb-2 block">Background Music</label>
                          <Select defaultValue="instrumental">
                            <SelectTrigger className="border-[#FF5722]/30">
                              <SelectValue placeholder="Select background" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None (A Cappella)</SelectItem>
                              <SelectItem value="minimal">Minimal</SelectItem>
                              <SelectItem value="instrumental">Instrumental</SelectItem>
                              <SelectItem value="full">Full Production</SelectItem>
                              <SelectItem value="custom">Custom (Upload)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button className="bg-gradient-to-r from-[#FF5722] to-[#4CAF50] hover:opacity-90">
                    Generate Multilingual Performance
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="text-center mt-16">
          <Button 
            className="bg-transparent border border-[#FF5722]/50 text-[#FF5722] hover:bg-[#FF5722]/10"
            onClick={() => onNavigate("investors")}
          >
            View Investor Relations <i className="fas fa-arrow-right ml-2"></i>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TwinSyncSection;