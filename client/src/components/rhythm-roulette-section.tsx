import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Music, Loader2, PlayCircle, PlusCircle, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface RhythmRouletteSectionProps {
  onNavigate: (sectionId: string) => void;
}

interface ListeningHistoryEntry {
  id: number;
  trackTitle: string;
  artist?: string;
  genre?: string;
  mood?: string;
  timestamp: string;
}

interface RhythmRouletteComposition {
  id: number;
  userId: number;
  title: string;
  description: string;
  elements: string;
  tempo?: string;
  mood?: string;
  narrative?: string;
  uniqueTwist?: string;
  generatedAt: string;
}

export default function RhythmRouletteSection({ onNavigate }: RhythmRouletteSectionProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [trackInput, setTrackInput] = useState('');
  const [artistInput, setArtistInput] = useState('');
  const [genreInput, setGenreInput] = useState('');
  const [moodInput, setMoodInput] = useState('');
  const [selectedComposition, setSelectedComposition] = useState<RhythmRouletteComposition | null>(null);
  const [showCompositionDialog, setShowCompositionDialog] = useState(false);
  const [generationsRemaining, setGenerationsRemaining] = useState<number | null>(null);

  // Fetch user's listening history
  const {
    data: listeningHistory = [],
    isLoading: isLoadingHistory,
    refetch: refetchHistory,
  } = useQuery<ListeningHistoryEntry[]>({
    queryKey: ['/api/listening-history'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/listening-history');
      const data = await response.json();
      return data.data || [];
    },
    enabled: !!user,
  });

  // Fetch user's Rhythm Roulette compositions
  const {
    data: compositions = [],
    isLoading: isLoadingCompositions,
    refetch: refetchCompositions,
  } = useQuery<RhythmRouletteComposition[]>({
    queryKey: ['/api/rhythm-roulette'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/rhythm-roulette');
      const data = await response.json();
      return data.data || [];
    },
    enabled: !!user,
    onSuccess: () => {
      // Fetch the generation count after loading compositions
      fetchGenerationCount();
    }
  });
  
  // Fetch user's generation count
  const fetchGenerationCount = async () => {
    if (!user) return;
    
    try {
      const response = await apiRequest('GET', '/api/rhythm-roulette/generation-count');
      const data = await response.json();
      
      if (data.success) {
        setGenerationsRemaining(Math.max(0, 2 - data.count));  // Max 2 generations
      }
    } catch (error) {
      console.error("Error fetching generation count:", error);
    }
  };

  // Mutation to add a track to listening history
  const addTrackMutation = useMutation({
    mutationFn: async (data: {
      trackTitle: string;
      artist?: string;
      genre?: string;
      mood?: string;
    }) => {
      const response = await apiRequest('POST', '/api/listening-history', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Track added',
        description: 'Your listening history has been updated',
      });
      setTrackInput('');
      setArtistInput('');
      setGenreInput('');
      setMoodInput('');
      refetchHistory();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error adding track',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Mutation to generate a new Rhythm Roulette composition
  const generateCompositionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('POST', '/api/rhythm-roulette');
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: 'Composition Generated',
        description: `"${data.data.title}" has been created`,
      });
      
      // Update the remaining generations count
      if (data.remainingGenerations !== undefined) {
        setGenerationsRemaining(data.remainingGenerations);
      }
      
      refetchCompositions();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error generating composition',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Mutation to delete a Rhythm Roulette composition
  const deleteCompositionMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest('DELETE', `/api/rhythm-roulette/${id}`);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: 'Composition deleted',
        description: 'The composition has been removed',
      });
      if (selectedComposition) {
        setSelectedComposition(null);
        setShowCompositionDialog(false);
      }
      refetchCompositions();
    },
    onError: (error: Error) => {
      toast({
        title: 'Error deleting composition',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const handleAddTrack = () => {
    if (!trackInput.trim()) {
      toast({
        title: 'Track title required',
        description: 'Please enter a track title',
        variant: 'destructive',
      });
      return;
    }

    addTrackMutation.mutate({
      trackTitle: trackInput,
      artist: artistInput || undefined,
      genre: genreInput || undefined,
      mood: moodInput || undefined,
    });
  };

  const handleGenerateComposition = () => {
    if (listeningHistory.length === 0) {
      toast({
        title: 'Listening history required',
        description: 'Please add some tracks to your listening history first',
        variant: 'destructive',
      });
      return;
    }

    generateCompositionMutation.mutate();
  };

  const handleViewComposition = (composition: RhythmRouletteComposition) => {
    setSelectedComposition(composition);
    setShowCompositionDialog(true);
  };

  const handleDeleteComposition = (id: number) => {
    deleteCompositionMutation.mutate(id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <section id="rhythm-roulette" className="py-14 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <Music className="h-8 w-8 text-purple-500 mr-2" />
            Rhythm Roulette™
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Generate surprising mini-compositions based on your listening history. 
            Our AI surprises you with unexpected elements and creative twists.
          </p>
        </div>

        {user ? (
          <Tabs defaultValue="add-history" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="add-history">Add Listening History</TabsTrigger>
              <TabsTrigger value="history">Your History</TabsTrigger>
              <TabsTrigger value="compositions">Your Compositions</TabsTrigger>
            </TabsList>

            <TabsContent value="add-history" className="space-y-4">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle>Add to Your Listening History</CardTitle>
                  <CardDescription>
                    Tell us what you're listening to, so we can create personalized compositions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="track" className="block text-sm font-medium text-gray-400 mb-1">
                      Track Title*
                    </label>
                    <Input
                      id="track"
                      value={trackInput}
                      onChange={(e) => setTrackInput(e.target.value)}
                      placeholder="Enter track title"
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div>
                    <label htmlFor="artist" className="block text-sm font-medium text-gray-400 mb-1">
                      Artist
                    </label>
                    <Input
                      id="artist"
                      value={artistInput}
                      onChange={(e) => setArtistInput(e.target.value)}
                      placeholder="Enter artist name"
                      className="bg-slate-800 border-slate-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="genre" className="block text-sm font-medium text-gray-400 mb-1">
                        Genre
                      </label>
                      <Input
                        id="genre"
                        value={genreInput}
                        onChange={(e) => setGenreInput(e.target.value)}
                        placeholder="Enter genre"
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                    <div>
                      <label htmlFor="mood" className="block text-sm font-medium text-gray-400 mb-1">
                        Mood
                      </label>
                      <Input
                        id="mood"
                        value={moodInput}
                        onChange={(e) => setMoodInput(e.target.value)}
                        placeholder="Enter mood"
                        className="bg-slate-800 border-slate-700"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleAddTrack} 
                    disabled={addTrackMutation.isPending || !trackInput.trim()}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {addTrackMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add to History
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle>Your Listening History</CardTitle>
                  <CardDescription>
                    The tracks you've listened to will influence your AI compositions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingHistory ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                    </div>
                  ) : listeningHistory.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Your listening history is empty</p>
                      <p className="text-sm">Add some tracks to get started</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[300px]">
                      <div className="space-y-4">
                        {listeningHistory.map((entry) => (
                          <div key={entry.id} className="p-3 bg-slate-800 rounded-md">
                            <div className="font-medium">{entry.trackTitle}</div>
                            {entry.artist && <div className="text-sm text-gray-400">by {entry.artist}</div>}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {entry.genre && (
                                <Badge variant="outline" className="bg-slate-700">
                                  {entry.genre}
                                </Badge>
                              )}
                              {entry.mood && (
                                <Badge variant="outline" className="bg-slate-700">
                                  {entry.mood}
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              {formatDate(entry.timestamp)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleGenerateComposition}
                    disabled={
                      generateCompositionMutation.isPending || 
                      listeningHistory.length === 0
                    }
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {generateCompositionMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Music className="mr-2 h-4 w-4" />
                        Generate Composition
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="compositions">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle>Your Rhythm Roulette Compositions</CardTitle>
                  <CardDescription>
                    AI-generated mini-compositions based on your unique listening profile
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoadingCompositions ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                    </div>
                  ) : compositions.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <Music className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>You haven't generated any compositions yet</p>
                      <p className="text-sm">Add some tracks to your history and hit generate</p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px]">
                      <div className="grid grid-cols-1 gap-4">
                        {compositions.map((composition) => (
                          <Card 
                            key={composition.id} 
                            className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer"
                            onClick={() => handleViewComposition(composition)}
                          >
                            <CardHeader className="p-4">
                              <CardTitle className="text-lg">{composition.title}</CardTitle>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {composition.mood && (
                                  <Badge className="bg-purple-900 hover:bg-purple-800">
                                    {composition.mood}
                                  </Badge>
                                )}
                                {composition.tempo && (
                                  <Badge variant="outline">
                                    {composition.tempo}
                                  </Badge>
                                )}
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <p className="text-sm text-gray-400 line-clamp-3">
                                {composition.narrative || composition.description.substring(0, 120) + '...'}
                              </p>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex justify-between">
                              <div className="text-xs text-gray-500">
                                {formatDate(composition.generatedAt)}
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                className="text-red-400 hover:text-red-300 hover:bg-red-950 p-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteComposition(composition.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleGenerateComposition}
                    disabled={
                      generateCompositionMutation.isPending || 
                      listeningHistory.length === 0
                    }
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {generateCompositionMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Generate New Composition
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="max-w-md mx-auto text-center p-8 bg-slate-900 rounded-lg">
            <Music className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Sign In to Use Rhythm Roulette</h3>
            <p className="text-gray-400 mb-4">
              Create an account or sign in to track your listening history and generate
              AI-powered music compositions.
            </p>
            <Button 
              onClick={() => onNavigate('auth')} 
              className="bg-purple-600 hover:bg-purple-700"
            >
              Sign In / Register
            </Button>
          </div>
        )}

        {/* Composition Detail Dialog */}
        <Dialog open={showCompositionDialog} onOpenChange={setShowCompositionDialog}>
          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedComposition?.title}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                Generated on {selectedComposition && formatDate(selectedComposition.generatedAt)}
              </DialogDescription>
            </DialogHeader>

            {selectedComposition && (
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {selectedComposition.elements && (
                    <div>
                      <h4 className="text-sm text-purple-400 mb-1">Elements</h4>
                      <p className="text-white">{selectedComposition.elements}</p>
                    </div>
                  )}
                  
                  {selectedComposition.tempo && (
                    <div>
                      <h4 className="text-sm text-purple-400 mb-1">Tempo</h4>
                      <p className="text-white">{selectedComposition.tempo}</p>
                    </div>
                  )}
                  
                  {selectedComposition.mood && (
                    <div>
                      <h4 className="text-sm text-purple-400 mb-1">Mood</h4>
                      <p className="text-white">{selectedComposition.mood}</p>
                    </div>
                  )}
                  
                  {selectedComposition.uniqueTwist && (
                    <div>
                      <h4 className="text-sm text-purple-400 mb-1">Unique Twist</h4>
                      <p className="text-white">{selectedComposition.uniqueTwist}</p>
                    </div>
                  )}
                </div>
                
                {selectedComposition.narrative && (
                  <div>
                    <h4 className="text-sm text-purple-400 mb-1">Narrative</h4>
                    <p className="text-white">{selectedComposition.narrative}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm text-purple-400 mb-1">Full Description</h4>
                  <ScrollArea className="h-[200px] rounded-md border border-slate-700 p-4">
                    <div className="whitespace-pre-line text-white">
                      {selectedComposition.description}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}

            <DialogFooter className="flex justify-between gap-2">
              <Button
                variant="destructive"
                onClick={() => selectedComposition && handleDeleteComposition(selectedComposition.id)}
                disabled={deleteCompositionMutation.isPending}
              >
                {deleteCompositionMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </>
                )}
              </Button>
              
              <Button 
                onClick={() => setShowCompositionDialog(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}