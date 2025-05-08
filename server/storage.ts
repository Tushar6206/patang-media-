import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  newsletterSignups, type NewsletterSignup, type InsertNewsletterSignup
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form storage
  storeContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Newsletter signup storage
  storeNewsletterSignup(signup: InsertNewsletterSignup): Promise<NewsletterSignup>;
  getNewsletterSignups(): Promise<NewsletterSignup[]>;
  getNewsletterSignupByEmail(email: string): Promise<NewsletterSignup | undefined>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Contact form operations
  async storeContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [contactSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    
    return contactSubmission;
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions);
  }
  
  // Newsletter operations
  async storeNewsletterSignup(signup: InsertNewsletterSignup): Promise<NewsletterSignup> {
    // Check if email already exists
    const existingSignup = await this.getNewsletterSignupByEmail(signup.email);
    
    if (existingSignup) {
      return existingSignup;
    }
    
    const [newsletterSignup] = await db
      .insert(newsletterSignups)
      .values(signup)
      .returning();
    
    return newsletterSignup;
  }
  
  async getNewsletterSignups(): Promise<NewsletterSignup[]> {
    return db.select().from(newsletterSignups);
  }
  
  async getNewsletterSignupByEmail(email: string): Promise<NewsletterSignup | undefined> {
    const [signup] = await db
      .select()
      .from(newsletterSignups)
      .where(eq(newsletterSignups.email, email.toLowerCase()));
    
    return signup || undefined;
  }
}

// Create and export the storage instance
export const storage = new DatabaseStorage();
