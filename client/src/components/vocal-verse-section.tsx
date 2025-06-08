import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { professionalAudio, VoiceCloneData } from "@/lib/professionalAudio";

interface VocalVerseSectionProps {
  onNavigate: (sectionId: string) => void;
}

const VocalVerseSection: React.FC<VocalVerseSectionProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState("clone");
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedVoiceStyle, setSelectedVoiceStyle] = useState<string>("pop");
  const [emotionSlider, setEmotionSlider] = useState([50]);
  const [pitchSlider, setPitchSlider] = useState([50]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedVoiceClones, setGeneratedVoiceClones] = useState<VoiceCloneData[]>([]);
  const [voiceText, setVoiceText] = useState("Hello, this is my AI voice clone created with Patang technology!");
  
  const { toast } = useToast();
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded and is ready for processing.`,
      });
    }
  };
  
  const handleStartRecording = () => {
    setIsRecording(true);
    
    // Simulate recording completion after 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      setHasRecorded(true);
      toast({
        title: "Recording complete",
        description: "Your voice sample has been recorded successfully.",
      });
    }, 3000);
  };
  
  const handleGenerate = async () => {
    if (!hasRecorded && !uploadedFile) {
      toast({
        title: "Voice Sample Required",
        description: "Please record or upload a voice sample first.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const characteristics = {
        pitch: pitchSlider[0] / 50, // Convert 0-100 to 0-2
        tone: selectedVoiceStyle,
        accent: "neutral",
        emotion: emotionSlider[0] > 70 ? "happy" : 
                emotionSlider[0] > 30 ? "neutral" : "calm"
      };

      const voiceClone = await professionalAudio.generateVoiceClone(
        voiceText,
        characteristics,
        15 // 15-second sample
      );

      setGeneratedVoiceClones(prev => [voiceClone, ...prev]);
      setIsGenerating(false);
      setIsGenerated(true);
      
      toast({
        title: "Professional Voice Clone Generated",
        description: `${voiceClone.name} is ready with full-quality audio export.`,
      });
    } catch (error: any) {
      setIsGenerating(false);
      toast({
        title: "Generation Failed",
        description: "Unable to generate voice clone. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadVoice = async (voiceClone: VoiceCloneData) => {
    try {
      await professionalAudio.downloadAudio(voiceClone, 'wav');
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: "Unable to download the voice clone. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleShareVoice = async (voiceClone: VoiceCloneData) => {
    try {
      await professionalAudio.shareViaWhatsApp(voiceClone);
    } catch (error: any) {
      toast({
        title: "Share Failed",
        description: "Unable to share via WhatsApp. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const voiceStyles = [
    { id: "pop", name: "Pop", color: "bg-pink-500" },
    { id: "rnb", name: "R&B", color: "bg-purple-500" },
    { id: "rock", name: "Rock", color: "bg-red-500" },
    { id: "classical", name: "Classical", color: "bg-blue-500" },
    { id: "jazz", name: "Jazz", color: "bg-amber-500" },
    { id: "edm", name: "EDM", color: "bg-green-500" },
  ];
  
  return (
    <section id="vocalverse" className="py-20 bg-gradient-to-b from-[#0E0E1A] to-[#121212] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A0A14] to-transparent"></div>
      <div className="shape-blob bg-[#2979FF]/10 w-96 h-96 -right-48 top-20 blur-2xl"></div>
      <div className="shape-blob bg-[#FF1493]/10 w-80 h-80 -left-40 bottom-20 blur-2xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <Badge className="mb-4 bg-[#2979FF]/20 text-[#2979FF] hover:bg-[#2979FF]/30 backdrop-blur-sm">NEW TECHNOLOGY</Badge>
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 text-gradient-blue">VocalVerse™</h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Transform your voice into a professional-grade singing instrument. Clone your voice, apply styles, 
            and create AI-powered music like never before.
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="clone" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8 bg-[#1A1A2E]">
              <TabsTrigger value="clone" className="font-sora">Voice Cloning</TabsTrigger>
              <TabsTrigger value="style" className="font-sora">Style Transfer</TabsTrigger>
              <TabsTrigger value="duet" className="font-sora">AI Duets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="clone" className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#2979FF]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Clone Your Voice</CardTitle>
                  <CardDescription>
                    Upload a 30-second sample of your voice or record directly to create your vocal clone.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-sora font-medium text-white">Upload Voice Sample</h3>
                      <div className="border-2 border-dashed border-[#2979FF]/30 rounded-lg p-8 text-center bg-[#0A0A14]/50 hover:bg-[#0A0A14] transition-colors cursor-pointer">
                        <input 
                          type="file" 
                          accept="audio/*" 
                          id="voice-upload" 
                          className="hidden" 
                          onChange={handleFileUpload}
                        />
                        <label htmlFor="voice-upload" className="cursor-pointer">
                          <div className="text-6xl mb-4 text-[#2979FF]/70 mx-auto w-16">
                            <i className="fas fa-cloud-upload-alt"></i>
                          </div>
                          <p className="text-gray-300">Drag & drop or click to upload</p>
                          <p className="text-sm text-gray-500 mt-2">MP3, WAV, M4A (Max 5MB)</p>
                        </label>
                        {uploadedFile && (
                          <div className="mt-4 text-[#2979FF]">
                            File uploaded: {uploadedFile.name}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-sora font-medium text-white">Record Voice Sample</h3>
                      <div className="border-2 border-[#2979FF]/30 rounded-lg p-8 text-center bg-[#0A0A14]/50 flex flex-col items-center justify-center min-h-[200px]">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                          isRecording 
                            ? "bg-red-500 animate-pulse" 
                            : hasRecorded 
                              ? "bg-green-500" 
                              : "bg-[#2979FF]/80"
                        }`}>
                          <i className={`fas ${
                            isRecording 
                              ? "fa-stop" 
                              : hasRecorded 
                                ? "fa-check" 
                                : "fa-microphone"
                          } text-3xl text-white`}></i>
                        </div>
                        
                        <Button 
                          variant="outline" 
                          onClick={handleStartRecording}
                          disabled={isRecording || hasRecorded}
                          className="bg-transparent border-[#2979FF] text-[#2979FF] hover:bg-[#2979FF]/10"
                        >
                          {isRecording ? "Recording..." : hasRecorded ? "Recorded" : "Start Recording"}
                        </Button>
                        
                        {hasRecorded && (
                          <p className="text-green-400 mt-2 text-sm">
                            30-second sample recorded successfully
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-sora font-medium text-white mb-4">Voice Customization</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Emotion Intensity</label>
                        <Slider
                          value={emotionSlider}
                          onValueChange={setEmotionSlider}
                          max={100}
                          step={1}
                          className="mb-6"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Pitch Adjustment</label>
                        <Slider
                          value={pitchSlider}
                          onValueChange={setPitchSlider}
                          max={100}
                          step={1}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="border-gray-600 text-gray-400">
                    Reset
                  </Button>
                  <Button 
                    onClick={handleGenerate}
                    disabled={(!uploadedFile && !hasRecorded) || isGenerating}
                    className={`bg-gradient-to-r from-[#2979FF] to-[#00BCD4] hover:opacity-90 ${
                      isGenerating ? "animate-pulse" : ""
                    }`}
                  >
                    {isGenerating ? "Generating..." : isGenerated ? "Regenerate Voice" : "Generate Voice Clone"}
                  </Button>
                </CardFooter>
              </Card>
              
              {isGenerated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mt-8"
                >
                  <Card className="bg-[#1A1A2E]/80 border-[#2979FF]/20">
                    <CardHeader>
                      <CardTitle className="text-xl font-orbitron">Your AI Voice Clone</CardTitle>
                      <CardDescription>
                        Listen to your generated voice and download or use it in other Patang Omniverse tools
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center bg-[#0A0A14] rounded-lg p-6">
                        <div className="w-full max-w-md">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="text-white font-medium">Your Voice Clone</h4>
                              <p className="text-sm text-gray-400">Generated on {new Date().toLocaleDateString()}</p>
                            </div>
                            <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">
                              Premium Quality
                            </Badge>
                          </div>
                          
                          <div className="relative h-16 bg-[#1D1D30] rounded-md overflow-hidden mb-4">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-full h-8 flex items-center">
                                {/* Audio waveform simulation */}
                                {Array.from({ length: 40 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className="w-1.5 mx-0.5 bg-[#2979FF]/80"
                                    style={{ 
                                      height: `${Math.sin(i * 0.5) * 15 + 20}px`,
                                      opacity: i > 30 ? 0.4 : 1
                                    }}
                                  ></div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            {generatedVoiceClones.length > 0 ? (
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs gap-1 border-[#2979FF]/50 text-[#2979FF] hover:bg-[#2979FF]/10"
                                  onClick={() => handleDownloadVoice(generatedVoiceClones[0])}
                                >
                                  <i className="fas fa-download"></i> MP3
                                </Button>
                                <Button 
                                  size="sm" 
                                  className="text-xs gap-1 bg-green-600 hover:bg-green-700"
                                  onClick={() => handleShareVoice(generatedVoiceClones[0])}
                                >
                                  <i className="fab fa-whatsapp"></i> Share
                                </Button>
                              </div>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs gap-1 opacity-50 cursor-not-allowed"
                                disabled
                              >
                                <i className="fas fa-download"></i> Generate First
                              </Button>
                            )}
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full">
                                <i className="fas fa-step-backward text-xs"></i>
                              </Button>
                              <Button size="sm" className="h-8 w-8 p-0 rounded-full bg-[#2979FF]">
                                <i className="fas fa-play text-xs"></i>
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 rounded-full">
                                <i className="fas fa-step-forward text-xs"></i>
                              </Button>
                            </div>
                            <Button variant="outline" size="sm" className="text-xs gap-1">
                              <i className="fas fa-share-alt"></i> Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>
            
            <TabsContent value="style" className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#2979FF]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">Style Transfer</CardTitle>
                  <CardDescription>
                    Transform your voice with different singing styles and genres
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-sora font-medium text-white mb-4">Choose Voice Style</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {voiceStyles.map((style) => (
                          <div 
                            key={style.id}
                            onClick={() => setSelectedVoiceStyle(style.id)}
                            className={`p-4 rounded-lg cursor-pointer transition-all ${
                              selectedVoiceStyle === style.id 
                                ? "bg-[#2A2A3C] border-2 border-[#2979FF]" 
                                : "bg-[#0A0A14] hover:bg-[#1D1D30]"
                            }`}
                          >
                            <div className={`w-12 h-12 rounded-full ${style.color} flex items-center justify-center mb-2 mx-auto`}>
                              <i className="fas fa-music text-white"></i>
                            </div>
                            <p className="text-center font-medium">{style.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-sora font-medium text-white mb-4">Input Text to Sing</h3>
                      <div className="space-y-2">
                        <Input 
                          placeholder="Enter lyrics for your AI voice to sing..."
                          className="bg-[#0A0A14] border-[#2979FF]/30"
                        />
                        <p className="text-sm text-gray-400">
                          Your AI voice will sing these lyrics in the selected style
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button className="bg-gradient-to-r from-[#2979FF] to-[#00BCD4] hover:opacity-90">
                    Create Styled Performance
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="duet" className="mt-4">
              <Card className="bg-[#1A1A2E]/80 border-[#2979FF]/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-orbitron">AI Duets</CardTitle>
                  <CardDescription>
                    Collaborate with Patang's AI supermodels in stunning duet performances
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          name: "Stacy™",
                          image: "https://i.imgur.com/tIUd3TI.png",
                          style: "Pop-R&B fusion with ethereal tones",
                          color: "from-pink-500 to-purple-600"
                        },
                        {
                          name: "Kairo™",
                          image: "https://i.imgur.com/n8nLRwc.png",
                          style: "Deep electronic with soulful undertones",
                          color: "from-blue-600 to-cyan-500"
                        },
                        {
                          name: "Viya™", 
                          image: "https://i.imgur.com/6cDKQ3F.png",
                          style: "Melodic pop with hypnotic harmonies",
                          color: "from-amber-500 to-red-500"
                        }
                      ].map((model) => (
                        <div key={model.name} className="rounded-lg overflow-hidden bg-[#0A0A14] border border-[#2979FF]/20 hover:border-[#2979FF]/50 transition-all">
                          <div className="aspect-square relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-tr ${model.color} opacity-20`}></div>
                            <img 
                              src={model.image || "https://placehold.co/400x400/1a1a2e/2979FF"}
                              alt={model.name} 
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                              <h4 className="text-xl font-orbitron text-white">{model.name}</h4>
                              <p className="text-sm text-gray-300">{model.style}</p>
                            </div>
                          </div>
                          <div className="p-4">
                            <Button variant="outline" size="sm" className="w-full border-[#2979FF]/50 text-[#2979FF]">
                              Select for Duet
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-sora font-medium text-white mb-4">Duet Configuration</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#0A0A14] p-6 rounded-lg">
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Harmony Level</label>
                          <Slider
                            defaultValue={[70]}
                            max={100}
                            step={1}
                            className="mb-6"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-400 mb-2 block">Lead/Support Balance</label>
                          <Slider
                            defaultValue={[50]}
                            max={100}
                            step={1}
                            className="mb-6"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="text-sm text-gray-400 mb-2 block">Song Selection</label>
                          <Input 
                            placeholder="Select a song or upload your own track..."
                            className="bg-[#1A1A2E] border-[#2979FF]/30"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button className="bg-gradient-to-r from-[#2979FF] to-[#00BCD4] hover:opacity-90">
                    Create AI Duet Performance
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="text-center mt-16">
          <Button 
            className="bg-transparent border border-[#2979FF]/50 text-[#2979FF] hover:bg-[#2979FF]/10"
            onClick={() => onNavigate("beatdrop")}
          >
            Explore BeatDrop™ <i className="fas fa-arrow-right ml-2"></i>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VocalVerseSection;