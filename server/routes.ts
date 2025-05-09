import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, newsletterSchema } from "@shared/schema";
import { ZodError } from "zod";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication
  setupAuth(app);
  
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

  const httpServer = createServer(app);

  return httpServer;
}
