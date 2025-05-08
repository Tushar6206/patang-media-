import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  newsletterSignups, type NewsletterSignup, type InsertNewsletterSignup
} from "@shared/schema";

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

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contacts: Map<number, ContactSubmission>;
  private newsletters: Map<number, NewsletterSignup>;
  
  private userCurrentId: number;
  private contactCurrentId: number;
  private newsletterCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contacts = new Map();
    this.newsletters = new Map();
    
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.newsletterCurrentId = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact form operations
  async storeContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.contactCurrentId++;
    const timestamp = new Date();
    const contactSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      createdAt: timestamp 
    };
    
    this.contacts.set(id, contactSubmission);
    return contactSubmission;
  }
  
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contacts.values());
  }
  
  // Newsletter operations
  async storeNewsletterSignup(signup: InsertNewsletterSignup): Promise<NewsletterSignup> {
    // Check if email already exists
    const existingSignup = await this.getNewsletterSignupByEmail(signup.email);
    
    if (existingSignup) {
      return existingSignup;
    }
    
    const id = this.newsletterCurrentId++;
    const timestamp = new Date();
    const newsletterSignup: NewsletterSignup = { 
      ...signup, 
      id, 
      createdAt: timestamp 
    };
    
    this.newsletters.set(id, newsletterSignup);
    return newsletterSignup;
  }
  
  async getNewsletterSignups(): Promise<NewsletterSignup[]> {
    return Array.from(this.newsletters.values());
  }
  
  async getNewsletterSignupByEmail(email: string): Promise<NewsletterSignup | undefined> {
    return Array.from(this.newsletters.values()).find(
      (signup) => signup.email.toLowerCase() === email.toLowerCase()
    );
  }
}

// Create and export the storage instance
export const storage = new MemStorage();
