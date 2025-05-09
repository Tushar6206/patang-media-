import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, newsletterSchema } from "@shared/schema";
import { ZodError } from "zod";
import { setupAuth } from "./auth";
import { registerAgentRoutes, stacyAgent } from "./claude";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
  // Register AI agent routes
  registerAgentRoutes(app);
  
  // Using HTML file for investor brief instead of PDF
  console.log('Using static HTML file for investor brief');
  
  // API endpoint for investor brief access analytics
  app.post('/api/investor-brief-accessed', (req, res) => {
    console.log('Investor brief accessed:', new Date().toISOString());
    res.status(200).json({ 
      success: true, 
      message: 'Access recorded'
    });
  });
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate form data
      const validatedData = contactSchema.parse(req.body);
      
      // Store contact submission
      const contact = await storage.storeContactSubmission(validatedData);
      
      // Return success with the stored contact
      res.status(201).json({ 
        success: true, 
        message: "Contact form submitted successfully",
        data: contact
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // Newsletter signup endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      // Validate newsletter data
      const validatedData = newsletterSchema.parse(req.body);
      
      // Store newsletter subscription
      const newsletter = await storage.storeNewsletterSignup(validatedData);
      
      // Return success with the stored newsletter signup
      res.status(201).json({ 
        success: true, 
        message: "Newsletter subscription successful",
        data: newsletter
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        console.error("Newsletter signup error:", error);
        res.status(500).json({ 
          success: false, 
          message: "An error occurred while processing your request" 
        });
      }
    }
  });

  // API endpoints for user beats
  app.post("/api/beats", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      const beatData = {
        ...req.body,
        userId,
      };
      
      const beat = await storage.createUserBeat(beatData);
      res.status(201).json({ 
        success: true, 
        message: "Beat created successfully",
        data: beat
      });
    } catch (error) {
      console.error("Create beat error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while creating the beat" 
      });
    }
  });
  
  app.get("/api/beats", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      const beats = await storage.getUserBeats(userId);
      
      res.status(200).json({ 
        success: true, 
        data: beats
      });
    } catch (error) {
      console.error("Get beats error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while retrieving beats" 
      });
    }
  });
  
  // API endpoints for user avatars
  app.post("/api/avatars", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      const avatarData = {
        ...req.body,
        userId,
      };
      
      const avatar = await storage.createUserAvatar(avatarData);
      res.status(201).json({ 
        success: true, 
        message: "Avatar created successfully",
        data: avatar
      });
    } catch (error) {
      console.error("Create avatar error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while creating the avatar" 
      });
    }
  });
  
  app.get("/api/avatars", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      const avatars = await storage.getUserAvatars(userId);
      
      res.status(200).json({ 
        success: true, 
        data: avatars
      });
    } catch (error) {
      console.error("Get avatars error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while retrieving avatars" 
      });
    }
  });
  
  // API endpoints for user voice samples
  app.post("/api/voice-samples", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      const sampleData = {
        ...req.body,
        userId,
      };
      
      const sample = await storage.createUserVoiceSample(sampleData);
      res.status(201).json({ 
        success: true, 
        message: "Voice sample created successfully",
        data: sample
      });
    } catch (error) {
      console.error("Create voice sample error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while creating the voice sample" 
      });
    }
  });
  
  app.get("/api/voice-samples", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      const samples = await storage.getUserVoiceSamples(userId);
      
      res.status(200).json({ 
        success: true, 
        data: samples
      });
    } catch (error) {
      console.error("Get voice samples error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while retrieving voice samples" 
      });
    }
  });
  
  // Update user profile endpoint
  app.put("/api/profile", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      const profileData = req.body;
      
      // Update user profile
      const updatedUser = await storage.updateUser(userId, profileData);
      
      // Return updated user info (except password)
      const { password, ...userInfo } = updatedUser;
      res.status(200).json({ 
        success: true, 
        message: "Profile updated successfully",
        user: userInfo
      });
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while updating your profile" 
      });
    }
  });
  
  // Listening History API endpoints
  app.post("/api/listening-history", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      const historyEntry = {
        ...req.body,
        userId,
      };
      
      const entry = await storage.addListeningHistoryEntry(historyEntry);
      res.status(201).json({ 
        success: true, 
        message: "Listening history entry added",
        data: entry
      });
    } catch (error) {
      console.error("Add listening history error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while adding listening history" 
      });
    }
  });
  
  app.get("/api/listening-history", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      
      const history = await storage.getUserListeningHistory(userId, limit);
      res.status(200).json({ 
        success: true, 
        data: history
      });
    } catch (error) {
      console.error("Get listening history error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while retrieving listening history" 
      });
    }
  });
  
  // Rhythm Roulette API endpoints
  app.post("/api/rhythm-roulette", async (req, res) => {
    try {
      // Check authentication
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      
      // Check if user has reached their generation limit
      const generationCount = await storage.getRhythmRouletteGenerationCount(userId);
      const MAX_GENERATIONS = 2;  // Limit to 2 generations per user
      
      if (generationCount >= MAX_GENERATIONS) {
        return res.status(403).json({
          success: false,
          message: "You have reached your limit of 2 Rhythm Roulette compositions. Please delete an existing composition to generate a new one.",
          remainingGenerations: 0,
          totalGenerations: generationCount
        });
      }
      
      // Get user's listening history to use for generating the composition
      const listeningHistory = await storage.getUserListeningHistory(userId, 5);
      
      if (listeningHistory.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Please add at least one track to your listening history before generating a composition"
        });
      }
      
      // Extract track titles and artists for the AI prompt
      const historyContext = listeningHistory.map(entry => 
        `${entry.trackTitle}${entry.artist ? ` by ${entry.artist}` : ''}`
      );
      
      // Generate composition using Stacy agent
      const generatedResponse = await stacyAgent.generateRhythmRoulette(historyContext);
      
      // Parse the response to extract the components
      // This is a simplistic approach - in a real app, we might have the AI format its response as JSON
      const lines = generatedResponse.split('\n').filter(line => line.trim());
      
      const title = lines.find(line => line.includes('Title:') || line.match(/^[^:]+$/))?.replace('Title:', '').trim() || 'Unnamed Composition';
      const elements = lines.find(line => line.includes('Elements:') || line.includes('Instruments:'))?.replace(/Elements:|Instruments:/, '').trim() || '';
      const tempo = lines.find(line => line.includes('Tempo:') || line.includes('BPM:'))?.replace(/Tempo:|BPM:/, '').trim() || '';
      const mood = lines.find(line => line.includes('Mood:') || line.includes('Vibe:'))?.replace(/Mood:|Vibe:/, '').trim() || '';
      const narrative = lines.find(line => line.includes('Narrative:'))?.replace('Narrative:', '').trim() || '';
      const uniqueTwist = lines.find(line => line.includes('Twist:') || line.includes('Unique Element:'))?.replace(/Twist:|Unique Element:/, '').trim() || '';
      
      // Create a composition record in the database
      const composition = await storage.createRhythmRouletteComposition({
        userId,
        title,
        description: generatedResponse,
        elements,
        tempo,
        mood,
        narrative,
        uniqueTwist
      });
      
      // Increment user's generation count
      const newCount = await storage.incrementRhythmRouletteGenerationCount(userId);
      const remainingGenerations = Math.max(0, MAX_GENERATIONS - newCount);
      
      res.status(201).json({ 
        success: true, 
        message: "Rhythm Roulette composition generated",
        data: composition,
        remainingGenerations: remainingGenerations,
        totalGenerations: newCount
      });
    } catch (error) {
      console.error("Generate Rhythm Roulette error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while generating Rhythm Roulette composition" 
      });
    }
  });
  
  app.get("/api/rhythm-roulette", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      const compositions = await storage.getUserRhythmRouletteCompositions(userId);
      
      res.status(200).json({ 
        success: true, 
        data: compositions
      });
    } catch (error) {
      console.error("Get Rhythm Roulette compositions error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while retrieving Rhythm Roulette compositions" 
      });
    }
  });
  
  app.get("/api/rhythm-roulette/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const compositionId = parseInt(req.params.id);
      const composition = await storage.getRhythmRouletteComposition(compositionId);
      
      if (!composition) {
        return res.status(404).json({ 
          success: false, 
          message: "Composition not found" 
        });
      }
      
      // Check if the composition belongs to the user
      if (composition.userId !== req.user.id) {
        return res.status(403).json({ 
          success: false, 
          message: "You don't have permission to access this composition" 
        });
      }
      
      res.status(200).json({ 
        success: true, 
        data: composition
      });
    } catch (error) {
      console.error("Get Rhythm Roulette composition error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while retrieving the Rhythm Roulette composition" 
      });
    }
  });
  
  app.delete("/api/rhythm-roulette/:id", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const compositionId = parseInt(req.params.id);
      const composition = await storage.getRhythmRouletteComposition(compositionId);
      
      if (!composition) {
        return res.status(404).json({ 
          success: false, 
          message: "Composition not found" 
        });
      }
      
      // Check if the composition belongs to the user
      if (composition.userId !== req.user.id) {
        return res.status(403).json({ 
          success: false, 
          message: "You don't have permission to delete this composition" 
        });
      }
      
      await storage.deleteRhythmRouletteComposition(compositionId);
      
      res.status(200).json({ 
        success: true, 
        message: "Rhythm Roulette composition deleted"
      });
    } catch (error) {
      console.error("Delete Rhythm Roulette composition error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while deleting the Rhythm Roulette composition" 
      });
    }
  });
  
  // Endpoint to get user's generation count - must be before /:id route
  app.get("/api/rhythm-roulette/count", async (req, res) => {
    try {
      if (!req.isAuthenticated()) {
        return res.status(401).json({ 
          success: false, 
          message: "Authentication required" 
        });
      }
      
      const userId = req.user.id;
      const count = await storage.getRhythmRouletteGenerationCount(userId);
      const MAX_GENERATIONS = 2;
      
      res.status(200).json({ 
        success: true, 
        count,
        remainingGenerations: Math.max(0, MAX_GENERATIONS - count),
        maxGenerations: MAX_GENERATIONS
      });
    } catch (error) {
      console.error("Get generation count error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while retrieving generation count" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
