import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import { contactSchema, newsletterSchema } from "@shared/schema";
import { ZodError } from "zod";
import generateInvestorBriefPDF from "./generate-pdf";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate PDF on server start
  const pdfPath = path.join(process.cwd(), 'client', 'public', 'patang-omniverse-investor-brief.pdf');
  
  // Check if PDF exists, if not generate it
  if (!fs.existsSync(pdfPath)) {
    console.log('Investor brief PDF not found, generating...');
    try {
      await generateInvestorBriefPDF();
      console.log('Investor brief PDF generated successfully');
    } catch (error) {
      console.error('Failed to generate investor brief PDF:', error);
    }
  } else {
    console.log('Investor brief PDF already exists');
  }
  
  // API endpoint to regenerate the PDF
  app.post('/api/regenerate-pdf', async (req, res) => {
    try {
      const success = await generateInvestorBriefPDF();
      if (success) {
        res.status(200).json({ 
          success: true, 
          message: 'Investor brief PDF regenerated successfully',
          downloadUrl: '/patang-omniverse-investor-brief.pdf'
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Failed to regenerate investor brief PDF'
        });
      }
    } catch (error) {
      console.error('Error regenerating PDF:', error);
      res.status(500).json({ 
        success: false, 
        message: 'An error occurred while regenerating the PDF'
      });
    }
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
