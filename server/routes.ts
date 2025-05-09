import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, newsletterSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);

  return httpServer;
}
