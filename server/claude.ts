import Anthropic from '@anthropic-ai/sdk';
import { Request, Response } from 'express';
import { storage } from './storage';

// Initialize Anthropic client
// the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Base AI agent class for common functionality
class AIAgent {
  agentName: string;
  role: string;
  model: string = 'claude-3-7-sonnet-20250219';
  
  constructor(agentName: string, role: string) {
    this.agentName = agentName;
    this.role = role;
  }
  
  // Basic message generation with the agent's personality
  async generateResponse(prompt: string): Promise<string> {
    try {
      const systemPrompt = `You are ${this.agentName}, ${this.role} for Patang Omniverse, 
      an AI-first media production house with cosmic-scale ambitions. Respond in a helpful, 
      creative way that matches your specialized role, while maintaining your unique personality.`;
      
      const response = await anthropic.messages.create({
        model: this.model,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }],
      });
      
      const content = response.content[0];
      if (content.type === 'text') {
        return content.text;
      } else {
        return "Response doesn't contain text content";
      }
    } catch (error: any) {
      console.error(`Error with ${this.agentName} agent:`, error);
      throw new Error(`Sorry, ${this.agentName} is currently unavailable. Please try again later.`);
    }
  }
  
  // Analyze an image (for agents that support vision capabilities)
  async analyzeImage(base64Image: string, prompt: string): Promise<string> {
    try {
      const systemPrompt = `You are ${this.agentName}, ${this.role} for Patang Omniverse. 
      Analyze the provided image according to your expertise and respond to the user's prompt.`;
      
      const response = await anthropic.messages.create({
        model: this.model,
        max_tokens: 1024,
        system: systemPrompt,
        messages: [{
          role: 'user', 
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/jpeg",
                data: base64Image
              }
            }
          ]
        }],
      });
      
      const content = response.content[0];
      if (content.type === 'text') {
        return content.text;
      } else {
        return "Response doesn't contain text content";
      }
    } catch (error: any) {
      console.error(`Error with ${this.agentName} image analysis:`, error);
      throw new Error(`Sorry, ${this.agentName} couldn't analyze this image. Please try again later.`);
    }
  }
}

// Specific agent implementations with their unique personalities and specialties

// Stacy - Music Production Specialist
export class StacyAgent extends AIAgent {
  constructor() {
    super('Stacy™', 'Music Production Specialist');
  }
  
  async generateMusicPrompt(genre: string, mood: string, instruments: string): Promise<string> {
    const prompt = `Create a detailed music generation prompt for a ${genre} track with a ${mood} mood, 
    featuring ${instruments}. Include specific musical elements, structure suggestions, and creative direction.`;
    
    return this.generateResponse(prompt);
  }
  
  async analyzeMusicSample(description: string): Promise<string> {
    const prompt = `Analyze this music description and provide professional feedback: ${description}
    Include comments on composition, arrangement, mixing potential, and suggest improvements or directions.`;
    
    return this.generateResponse(prompt);
  }
  
  async generateRhythmRoulette(listeningHistory: string[]): Promise<string> {
    const historyContext = listeningHistory.length > 0 
      ? `Based on the user's listening history that includes: ${listeningHistory.join(', ')}`
      : `Without any specific listening history`;
    
    const prompt = `${historyContext}, create a surprise mini-composition concept called "Rhythm Roulette".
    
    This should be a playful, unexpected musical idea that takes inspiration from their taste but introduces surprising elements.
    
    Include in your response:
    1. A catchy title for this mini-composition
    2. Key musical elements and instruments
    3. Tempo and rhythmic patterns
    4. Overall mood and vibe
    5. A brief 2-3 sentence narrative about what this composition evokes
    6. One unexpected twist or element that makes this composition unique
    
    Format this as a creative, professionally-worded concept that would inspire a music producer.`;
    
    return this.generateResponse(prompt);
  }
}

// Kairo - Visual Design and Avatar Specialist
export class KairoAgent extends AIAgent {
  constructor() {
    super('Kairo™', 'Visual Design and Avatar Specialist');
  }
  
  async generateAvatarConcept(description: string, style: string): Promise<string> {
    const prompt = `Create a detailed avatar generation concept based on this description: ${description}
    Style reference: ${style}. Include details about facial features, expressions, lighting, background elements, and mood.`;
    
    return this.generateResponse(prompt);
  }
  
  async reviewVisualDesign(base64Image: string): Promise<string> {
    const prompt = 'Analyze this visual design and provide professional feedback on composition, color theory, visual balance, and overall effectiveness. Suggest specific improvements.';
    
    return this.analyzeImage(base64Image, prompt);
  }
}

// Viya - Voice and Audio Specialist
export class ViyaAgent extends AIAgent {
  constructor() {
    super('Viya™', 'Voice and Audio Specialist');
  }
  
  async generateVoicePrompt(character: string, emotion: string, context: string): Promise<string> {
    const prompt = `Create a detailed voice generation prompt for a ${character} character with ${emotion} emotion in this context: ${context}
    Include vocal characteristics, speech patterns, pacing, and specific line delivery suggestions.`;
    
    return this.generateResponse(prompt);
  }
  
  async analyzeSoundDesign(description: string): Promise<string> {
    const prompt = `Analyze this sound design description and provide professional feedback: ${description}
    Include comments on audio elements, mixing, spatial placement, emotional impact, and suggest improvements.`;
    
    return this.generateResponse(prompt);
  }
}

// Initialize agents
export class MoodDetectorAgent extends AIAgent {
  constructor() {
    super("Mood Detector", "Advanced emotional intelligence specialist");
  }

  async detectMoodFromText(text: string): Promise<{ mood: string, confidence: number, intensity: number }> {
    const prompt = `
    Analyze the emotional state and mood from this text. Be highly accurate and consider subtle emotional cues.
    
    Text: "${text}"
    
    Return ONLY a JSON object with these exact keys:
    {
      "mood": "one of: happy, sad, energetic, calm, anxious, confident, excited, melancholic, romantic, focused, nostalgic, rebellious, peaceful",
      "confidence": integer from 1-100 representing confidence in detection,
      "intensity": integer from 1-10 representing emotional intensity
    }
    `;

    try {
      const response = await this.generateResponse(prompt);
      const result = JSON.parse(response);
      
      return {
        mood: result.mood,
        confidence: Math.max(1, Math.min(100, result.confidence)),
        intensity: Math.max(1, Math.min(10, result.intensity))
      };
    } catch (error: any) {
      throw new Error("Failed to detect mood: " + error.message);
    }
  }

  async generateMixtapeFromMood(mood: string, intensity: number, userPreferences?: string): Promise<{
    title: string,
    tracks: Array<{
      title: string,
      artist: string,
      genre: string,
      energy: number,
      mood_match: number
    }>,
    reasoning: string
  }> {
    const prompt = `
    Create a personalized music mixtape for someone feeling "${mood}" with intensity ${intensity}/10.
    ${userPreferences ? `User preferences: ${userPreferences}` : ''}
    
    Generate 8-12 tracks that would perfectly match and enhance this emotional state.
    Consider musical elements like tempo, key, instrumentation, and lyrical themes.
    
    Return ONLY a JSON object with:
    {
      "title": "creative mixtape name",
      "tracks": [
        {
          "title": "song title",
          "artist": "artist name", 
          "genre": "music genre",
          "energy": integer 1-10,
          "mood_match": integer 1-10
        }
      ],
      "reasoning": "brief explanation of curation strategy"
    }
    `;

    try {
      const response = await this.generateResponse(prompt);
      return JSON.parse(response);
    } catch (error: any) {
      throw new Error("Failed to generate mixtape: " + error.message);
    }
  }

  async adaptMixtapeToNewMood(currentTracks: any[], oldMood: string, newMood: string, intensity: number): Promise<{
    adaptedTracks: any[],
    transitionStrategy: string
  }> {
    const prompt = `
    The user's mood has changed from "${oldMood}" to "${newMood}" (intensity: ${intensity}/10).
    
    Current mixtape tracks: ${JSON.stringify(currentTracks)}
    
    Intelligently adapt the mixtape by:
    1. Keeping 3-5 tracks that still work
    2. Replacing others with mood-appropriate alternatives
    3. Reordering for smooth emotional transitions
    
    Return ONLY a JSON object with:
    {
      "adaptedTracks": [same format as input tracks],
      "transitionStrategy": "explanation of adaptation approach"
    }
    `;

    try {
      const response = await this.generateResponse(prompt);
      return JSON.parse(response);
    } catch (error: any) {
      throw new Error("Failed to adapt mixtape: " + error.message);
    }
  }
}

export const stacyAgent = new StacyAgent();
export const kairoAgent = new KairoAgent();
export const viyaAgent = new ViyaAgent();
export const moodDetectorAgent = new MoodDetectorAgent();

// Express API route handlers for the agents
export function registerAgentRoutes(app: any) {
  // Middleware to check for valid API key
  const checkAuth = (req: Request, res: Response, next: Function) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required to access AI agents'
      });
    }
    next();
  };

  // Stacy routes
  app.post('/api/agents/stacy/music-prompt', checkAuth, async (req: Request, res: Response) => {
    try {
      const { genre, mood, instruments } = req.body;
      if (!genre || !mood || !instruments) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: genre, mood, and instruments are required'
        });
      }
      
      const response = await stacyAgent.generateMusicPrompt(genre, mood, instruments);
      res.json({ success: true, response });
    } catch (error: any) {
      console.error('Error in Stacy music prompt endpoint:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to generate music prompt'
      });
    }
  });
  
  app.post('/api/agents/stacy/analyze-music', checkAuth, async (req: Request, res: Response) => {
    try {
      const { description } = req.body;
      if (!description) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameter: description'
        });
      }
      
      const response = await stacyAgent.analyzeMusicSample(description);
      res.json({ success: true, response });
    } catch (error: any) {
      console.error('Error in Stacy music analysis endpoint:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to analyze music sample'
      });
    }
  });
  
  // Rhythm Roulette - Generate surprise mini-compositions
  app.post('/api/agents/stacy/rhythm-roulette', checkAuth, async (req: Request, res: Response) => {
    try {
      const { listeningHistory = [] } = req.body;
      
      const response = await stacyAgent.generateRhythmRoulette(listeningHistory);
      res.json({ success: true, response });
    } catch (error: any) {
      console.error('Error in Rhythm Roulette endpoint:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to generate Rhythm Roulette composition'
      });
    }
  });
  
  // Kairo routes
  app.post('/api/agents/kairo/avatar-concept', checkAuth, async (req: Request, res: Response) => {
    try {
      const { description, style } = req.body;
      if (!description || !style) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: description and style'
        });
      }
      
      const response = await kairoAgent.generateAvatarConcept(description, style);
      res.json({ success: true, response });
    } catch (error: any) {
      console.error('Error in Kairo avatar concept endpoint:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to generate avatar concept'
      });
    }
  });
  
  app.post('/api/agents/kairo/review-design', checkAuth, async (req: Request, res: Response) => {
    try {
      const { image } = req.body;
      if (!image) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameter: image (base64 encoded)'
        });
      }
      
      const response = await kairoAgent.reviewVisualDesign(image);
      res.json({ success: true, response });
    } catch (error: any) {
      console.error('Error in Kairo design review endpoint:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to review visual design'
      });
    }
  });
  
  // Viya routes
  app.post('/api/agents/viya/voice-prompt', checkAuth, async (req: Request, res: Response) => {
    try {
      const { character, emotion, context } = req.body;
      if (!character || !emotion || !context) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: character, emotion, and context'
        });
      }
      
      const response = await viyaAgent.generateVoicePrompt(character, emotion, context);
      res.json({ success: true, response });
    } catch (error: any) {
      console.error('Error in Viya voice prompt endpoint:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to generate voice prompt'
      });
    }
  });
  
  app.post('/api/agents/viya/analyze-sound', checkAuth, async (req: Request, res: Response) => {
    try {
      const { description } = req.body;
      if (!description) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameter: description'
        });
      }
      
      const response = await viyaAgent.analyzeSoundDesign(description);
      res.json({ success: true, response });
    } catch (error: any) {
      console.error('Error in Viya sound analysis endpoint:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to analyze sound design'
      });
    }
  });
  
  // General chat route for any agent
  app.post('/api/agents/:agentName/chat', checkAuth, async (req: Request, res: Response) => {
    try {
      const { agentName } = req.params;
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameter: message'
        });
      }
      
      let agent;
      switch (agentName.toLowerCase()) {
        case 'stacy':
          agent = stacyAgent;
          break;
        case 'kairo':
          agent = kairoAgent;
          break;
        case 'viya':
          agent = viyaAgent;
          break;
        default:
          return res.status(404).json({
            success: false,
            message: `Agent ${agentName} not found`
          });
      }
      
      const response = await agent.generateResponse(message);
      res.json({ success: true, response });
    } catch (error: any) {
      console.error(`Error in agent chat endpoint:`, error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to process chat message'
      });
    }
  });

  // Mood Detection and Mixtape Generation Routes
  app.post('/api/mood/detect', checkAuth, async (req: Request, res: Response) => {
    try {
      const { text, method = 'text_analysis' } = req.body;
      const userId = req.user!.id;

      if (!text) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameter: text'
        });
      }

      const detection = await moodDetectorAgent.detectMoodFromText(text);
      
      // Store the mood detection session
      const session = await storage.createMoodDetectionSession({
        userId,
        detectedMood: detection.mood,
        confidence: detection.confidence,
        detectionMethod: method,
        inputData: text,
      });

      res.json({
        success: true,
        ...detection,
        sessionId: session.id
      });
    } catch (error: any) {
      console.error('Mood detection error:', error);
      res.status(500).json({ 
        success: false,
        message: error.message || 'Failed to detect mood' 
      });
    }
  });

  app.post('/api/mixtape/generate', checkAuth, async (req: Request, res: Response) => {
    try {
      const { mood, intensity, preferences } = req.body;
      const userId = req.user!.id;

      if (!mood || !intensity) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: mood and intensity'
        });
      }

      const mixtapeData = await moodDetectorAgent.generateMixtapeFromMood(mood, intensity, preferences);
      
      // Create the mixtape in the database
      const mixtape = await storage.createMoodMixtape({
        userId,
        title: mixtapeData.title,
        mood,
        emotionalIntensity: intensity,
        tracks: mixtapeData.tracks.map((track: any) => JSON.stringify(track)),
        adaptationHistory: [`Created with ${mood} mood (intensity: ${intensity})`],
        isActive: true,
      });

      res.json({
        success: true,
        mixtape,
        tracks: mixtapeData.tracks,
        reasoning: mixtapeData.reasoning
      });
    } catch (error: any) {
      console.error('Mixtape generation error:', error);
      res.status(500).json({ 
        success: false,
        message: error.message || 'Failed to generate mixtape' 
      });
    }
  });

  app.post('/api/mixtape/:id/adapt', checkAuth, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { newMood, intensity } = req.body;
      const userId = req.user!.id;

      if (!newMood || !intensity) {
        return res.status(400).json({
          success: false,
          message: 'Missing required parameters: newMood and intensity'
        });
      }

      const mixtape = await storage.getMoodMixtape(parseInt(id));
      if (!mixtape || mixtape.userId !== userId) {
        return res.status(404).json({ 
          success: false,
          message: 'Mixtape not found' 
        });
      }

      const currentTracks = mixtape.tracks.map(track => JSON.parse(track));
      const adaptation = await moodDetectorAgent.adaptMixtapeToNewMood(
        currentTracks, 
        mixtape.mood, 
        newMood, 
        intensity
      );

      // Update the mixtape
      const updatedMixtape = await storage.updateMoodMixtape(parseInt(id), {
        mood: newMood,
        emotionalIntensity: intensity,
        tracks: adaptation.adaptedTracks.map((track: any) => JSON.stringify(track)),
        adaptationHistory: [
          ...mixtape.adaptationHistory,
          `Adapted from ${mixtape.mood} to ${newMood} (intensity: ${intensity})`
        ],
        lastAdaptedAt: new Date(),
      });

      res.json({
        success: true,
        mixtape: updatedMixtape,
        tracks: adaptation.adaptedTracks,
        transitionStrategy: adaptation.transitionStrategy
      });
    } catch (error: any) {
      console.error('Mixtape adaptation error:', error);
      res.status(500).json({ 
        success: false,
        message: error.message || 'Failed to adapt mixtape' 
      });
    }
  });

  app.get('/api/mixtapes', checkAuth, async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const mixtapes = await storage.getUserMoodMixtapes(userId);
      
      res.json({
        success: true,
        mixtapes: mixtapes.map((mixtape: any) => ({
          ...mixtape,
          tracks: mixtape.tracks.map((track: any) => JSON.parse(track))
        }))
      });
    } catch (error: any) {
      console.error('Get mixtapes error:', error);
      res.status(500).json({ 
        success: false,
        message: error.message || 'Failed to fetch mixtapes' 
      });
    }
  });
}