import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Loader2, Music, Paintbrush, Mic, Send, Bot } from 'lucide-react';

interface AIAgentsSectionProps {
  onNavigate: (sectionId: string) => void;
}

interface AgentCardProps {
  image: string;
  name: string;
  version: string;
  badge: {
    text: string;
    color: string;
  };
  description: string;
  features: {
    icon: string;
    text: string;
  }[];
  stats: {
    label: string;
    value: string;
    color: string;
    percentage: number;
  };
  action: {
    text: string;
    link: string;
    color: string;
  };
}

export default function AIAgentsSection({ onNavigate }: AIAgentsSectionProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeAgent, setActiveAgent] = useState<'stacy' | 'kairo' | 'viya' | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agentResponse, setAgentResponse] = useState('');
  
  // Stacy music prompt state
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [instruments, setInstruments] = useState('');
  
  // Kairo avatar concept state
  const [description, setDescription] = useState('');
  const [style, setStyle] = useState('');
  
  // Viya voice prompt state
  const [character, setCharacter] = useState('');
  const [emotion, setEmotion] = useState('');
  const [context, setContext] = useState('');

  // Agent card for showcasing in the initial view
  const agentCards: AgentCardProps[] = [
    {
      image: '/assets/images/agents/stacy.svg',
      name: 'Stacy™',
      version: 'v3.0',
      badge: {
        text: 'Music Production',
        color: 'bg-pink-500',
      },
      description: 'Cutting-edge music composition and audio production specialist that helps create professional-grade instrumentals and beats.',
      features: [
        { icon: 'feature-icon-1', text: 'Beat generation' },
        { icon: 'feature-icon-2', text: 'Arrangement analysis' },
        { icon: 'feature-icon-3', text: 'Song structure advice' },
      ],
      stats: {
        label: 'Industry match',
        value: '96%',
        color: 'bg-pink-500',
        percentage: 96,
      },
      action: {
        text: 'Create with Stacy',
        link: '#',
        color: 'bg-pink-500 hover:bg-pink-600',
      },
    },
    {
      image: '/assets/images/agents/kairo.svg',
      name: 'Kairo™',
      version: 'v2.5',
      badge: {
        text: 'Visual Design',
        color: 'bg-blue-500',
      },
      description: 'Advanced visual design specialist that helps create stunning avatars, artwork, and visual assets for your projects.',
      features: [
        { icon: 'feature-icon-1', text: 'Avatar concepts' },
        { icon: 'feature-icon-2', text: 'Visual composition' },
        { icon: 'feature-icon-3', text: 'Design feedback' },
      ],
      stats: {
        label: 'Creativity index',
        value: '92%',
        color: 'bg-blue-500',
        percentage: 92,
      },
      action: {
        text: 'Design with Kairo',
        link: '#',
        color: 'bg-blue-500 hover:bg-blue-600',
      },
    },
    {
      image: '/assets/images/agents/viya.svg',
      name: 'Viya™',
      version: 'v2.8',
      badge: {
        text: 'Voice & Audio',
        color: 'bg-purple-500',
      },
      description: 'Specialized voice and audio engineering AI that helps create professional vocal performances and sound design.',
      features: [
        { icon: 'feature-icon-1', text: 'Voice prompting' },
        { icon: 'feature-icon-2', text: 'Character voices' },
        { icon: 'feature-icon-3', text: 'Audio feedback' },
      ],
      stats: {
        label: 'Realism score',
        value: '94%',
        color: 'bg-purple-500',
        percentage: 94,
      },
      action: {
        text: 'Voice with Viya',
        link: '#',
        color: 'bg-purple-500 hover:bg-purple-600',
      },
    },
  ];

  // Default image URLs if the agent doesn't have a specific image
  const defaultAgentImages = {
    stacy: '/assets/images/agents/stacy.svg',
    kairo: '/assets/images/agents/kairo.svg',
    viya: '/assets/images/agents/viya.svg',
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || !activeAgent) return;
    
    setIsLoading(true);
    setAgentResponse('');
    
    try {
      const res = await apiRequest('POST', `/api/agents/${activeAgent}/chat`, { 
        message: chatInput 
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to get response from agent');
      }
      
      const data = await res.json();
      setAgentResponse(data.response);
      setChatInput('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to communicate with the agent',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMusicPrompt = async () => {
    if (!genre || !mood || !instruments) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields: genre, mood, and instruments',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    setAgentResponse('');
    
    try {
      const res = await apiRequest('POST', '/api/agents/stacy/music-prompt', { 
        genre, 
        mood, 
        instruments 
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to generate music prompt');
      }
      
      const data = await res.json();
      setAgentResponse(data.response);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate music prompt',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAvatarConcept = async () => {
    if (!description || !style) {
      toast({
        title: 'Missing information',
        description: 'Please fill in both the description and style fields',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    setAgentResponse('');
    
    try {
      const res = await apiRequest('POST', '/api/agents/kairo/avatar-concept', { 
        description, 
        style 
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to generate avatar concept');
      }
      
      const data = await res.json();
      setAgentResponse(data.response);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate avatar concept',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVoicePrompt = async () => {
    if (!character || !emotion || !context) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all fields: character, emotion, and context',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    setAgentResponse('');
    
    try {
      const res = await apiRequest('POST', '/api/agents/viya/voice-prompt', { 
        character, 
        emotion, 
        context 
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to generate voice prompt');
      }
      
      const data = await res.json();
      setAgentResponse(data.response);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate voice prompt',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderAgentInterface = () => {
    if (!activeAgent) return null;
    
    const agentColors: Record<string, string> = {
      stacy: 'text-pink-500 border-pink-500',
      kairo: 'text-blue-500 border-blue-500',
      viya: 'text-purple-500 border-purple-500',
    };
    
    const AgentIcon = () => {
      switch (activeAgent) {
        case 'stacy': return <Music className="h-6 w-6 text-pink-500" />;
        case 'kairo': return <Paintbrush className="h-6 w-6 text-blue-500" />;
        case 'viya': return <Mic className="h-6 w-6 text-purple-500" />;
        default: return <Bot className="h-6 w-6" />;
      }
    };
    
    return (
      <div className="bg-card p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b">
          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
            <AgentIcon />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${agentColors[activeAgent]}`}>
              {activeAgent === 'stacy' ? 'Stacy™' : activeAgent === 'kairo' ? 'Kairo™' : 'Viya™'}
            </h3>
            <p className="text-muted-foreground">
              {activeAgent === 'stacy' 
                ? 'Music Production Specialist' 
                : activeAgent === 'kairo' 
                  ? 'Visual Design Specialist' 
                  : 'Voice & Audio Specialist'}
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="ml-auto"
            onClick={() => setActiveAgent(null)}
          >
            Back to Agents
          </Button>
        </div>
        
        <Tabs defaultValue="specialized">
          <TabsList className="mb-4">
            <TabsTrigger value="specialized">Specialized Tools</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specialized">
            {activeAgent === 'stacy' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="genre">Music Genre</Label>
                    <Input 
                      id="genre" 
                      placeholder="e.g., Lo-fi, Hip Hop, EDM" 
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mood">Mood/Emotion</Label>
                    <Input 
                      id="mood" 
                      placeholder="e.g., Melancholic, Energetic, Relaxed" 
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="instruments">Key Instruments</Label>
                  <Input 
                    id="instruments" 
                    placeholder="e.g., Piano, 808 Bass, Synth Pads" 
                    value={instruments}
                    onChange={(e) => setInstruments(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full bg-pink-500 hover:bg-pink-600"
                  onClick={handleGenerateMusicPrompt}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Music Prompt
                </Button>
              </div>
            )}
            
            {activeAgent === 'kairo' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Avatar Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe the character/avatar you want to create in detail..."
                    className="resize-none h-24"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="style">Visual Style</Label>
                  <Input 
                    id="style" 
                    placeholder="e.g., Cyberpunk, Fantasy, Realistic, Anime" 
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={handleGenerateAvatarConcept}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Avatar Concept
                </Button>
              </div>
            )}
            
            {activeAgent === 'viya' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="character">Character Type</Label>
                    <Input 
                      id="character" 
                      placeholder="e.g., Narrator, Villain, Child, Robot" 
                      value={character}
                      onChange={(e) => setCharacter(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="emotion">Emotional State</Label>
                    <Input 
                      id="emotion" 
                      placeholder="e.g., Excited, Sorrowful, Confident" 
                      value={emotion}
                      onChange={(e) => setEmotion(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="context">Scene Context</Label>
                  <Textarea 
                    id="context" 
                    placeholder="Describe the scene or situation where this voice will be used..."
                    className="resize-none h-24"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full bg-purple-500 hover:bg-purple-600"
                  onClick={handleGenerateVoicePrompt}
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Voice Prompt
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="chat">
            <div className="flex space-x-2">
              <Textarea 
                placeholder={`Ask ${activeAgent === 'stacy' ? 'Stacy' : activeAgent === 'kairo' ? 'Kairo' : 'Viya'} anything...`}
                className="resize-none h-12"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendChat();
                  }
                }}
              />
              <Button 
                size="icon"
                onClick={handleSendChat}
                disabled={isLoading}
                className={
                  activeAgent === 'stacy' 
                    ? 'bg-pink-500 hover:bg-pink-600' 
                    : activeAgent === 'kairo' 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-purple-500 hover:bg-purple-600'
                }
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        
        {agentResponse && (
          <div className="mt-6 p-4 rounded-lg bg-background border">
            <h4 className="font-medium mb-2">Response:</h4>
            <p className="whitespace-pre-wrap">{agentResponse}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="ai-agents" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Meet Your Creative AI Companions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our team of specialized AI agents works alongside you, enhancing your creative process with expert assistance in music, visual design, and voice production.
          </p>
        </div>
        
        {!user && (
          <div className="max-w-lg mx-auto mb-10 p-4 bg-muted/50 rounded-lg text-center">
            <p className="text-muted-foreground mb-3">
              Create an account or log in to interact with our AI agents
            </p>
            <Button onClick={() => onNavigate('/auth')}>
              Sign In to Access AI Features
            </Button>
          </div>
        )}
        
        {activeAgent ? (
          renderAgentInterface()
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentCards.map((agent, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-[16/9] relative overflow-hidden bg-muted">
                  <img 
                    src={agent.image} 
                    alt={agent.name} 
                    className="object-cover w-full h-full"
                  />
                  <Badge className={`absolute top-4 right-4 ${agent.badge.color}`}>
                    {agent.badge.text}
                  </Badge>
                </div>
                
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{agent.name}</CardTitle>
                    <span className="text-muted-foreground text-sm">{agent.version}</span>
                  </div>
                  <CardDescription>{agent.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{agent.stats.label}</span>
                      <span className="text-sm font-medium">{agent.stats.value}</span>
                    </div>
                    <Progress 
                      value={agent.stats.percentage} 
                      className={agent.stats.color} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {agent.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-foreground mr-2"></span>
                        {feature.text}
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className={`w-full ${agent.action.color}`}
                    disabled={!user}
                    onClick={() => {
                      if (agent.name.toLowerCase().includes('stacy')) {
                        setActiveAgent('stacy');
                      } else if (agent.name.toLowerCase().includes('kairo')) {
                        setActiveAgent('kairo');
                      } else if (agent.name.toLowerCase().includes('viya')) {
                        setActiveAgent('viya');
                      }
                    }}
                  >
                    {agent.action.text}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}