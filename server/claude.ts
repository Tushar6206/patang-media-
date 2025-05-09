import Anthropic from '@anthropic-ai/sdk';
import { Request, Response } from 'express';

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
      
      return response.content[0].text;
    } catch (error) {
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
      
      return response.content[0].text;
    } catch (error) {
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
export const stacyAgent = new StacyAgent();
export const kairoAgent = new KairoAgent();
export const viyaAgent = new ViyaAgent();

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
    } catch (error) {
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
    } catch (error) {
      console.error('Error in Stacy music analysis endpoint:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to analyze music sample'
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      console.error(`Error in agent chat endpoint:`, error);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to process chat message'
      });
    }
  });
}