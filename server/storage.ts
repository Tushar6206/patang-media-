import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  newsletterSignups, type NewsletterSignup, type InsertNewsletterSignup,
  userBeats, type UserBeat, type InsertUserBeat,
  userAvatars, type UserAvatar, type InsertUserAvatar,
  userVoiceSamples, type UserVoiceSample, type InsertUserVoiceSample
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<Omit<User, 'id' | 'password'>>): Promise<User>;
  
  // Contact form storage
  storeContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Newsletter signup storage
  storeNewsletterSignup(signup: InsertNewsletterSignup): Promise<NewsletterSignup>;
  getNewsletterSignups(): Promise<NewsletterSignup[]>;
  getNewsletterSignupByEmail(email: string): Promise<NewsletterSignup | undefined>;
  
  // User beats storage
  createUserBeat(beat: InsertUserBeat): Promise<UserBeat>;
  getUserBeats(userId: number): Promise<UserBeat[]>;
  getUserBeat(id: number): Promise<UserBeat | undefined>;
  updateUserBeat(id: number, data: Partial<Omit<UserBeat, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<UserBeat>;
  deleteUserBeat(id: number): Promise<void>;
  
  // User avatars storage
  createUserAvatar(avatar: InsertUserAvatar): Promise<UserAvatar>;
  getUserAvatars(userId: number): Promise<UserAvatar[]>;
  getUserAvatar(id: number): Promise<UserAvatar | undefined>;
  updateUserAvatar(id: number, data: Partial<Omit<UserAvatar, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<UserAvatar>;
  deleteUserAvatar(id: number): Promise<void>;
  
  // User voice samples storage
  createUserVoiceSample(sample: InsertUserVoiceSample): Promise<UserVoiceSample>;
  getUserVoiceSamples(userId: number): Promise<UserVoiceSample[]>;
  getUserVoiceSample(id: number): Promise<UserVoiceSample | undefined>;
  updateUserVoiceSample(id: number, data: Partial<Omit<UserVoiceSample, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<UserVoiceSample>;
  deleteUserVoiceSample(id: number): Promise<void>;
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

  // User profile updates
  async updateUser(id: number, userData: Partial<Omit<User, 'id' | 'password'>>): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({
        ...userData,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();
    
    return updatedUser;
  }

  // User beats operations
  async createUserBeat(beat: InsertUserBeat): Promise<UserBeat> {
    const [newBeat] = await db
      .insert(userBeats)
      .values(beat)
      .returning();
    
    return newBeat;
  }

  async getUserBeats(userId: number): Promise<UserBeat[]> {
    return db
      .select()
      .from(userBeats)
      .where(eq(userBeats.userId, userId))
      .orderBy(desc(userBeats.createdAt));
  }

  async getUserBeat(id: number): Promise<UserBeat | undefined> {
    const [beat] = await db
      .select()
      .from(userBeats)
      .where(eq(userBeats.id, id));
    
    return beat || undefined;
  }

  async updateUserBeat(
    id: number, 
    data: Partial<Omit<UserBeat, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
  ): Promise<UserBeat> {
    const [updatedBeat] = await db
      .update(userBeats)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(userBeats.id, id))
      .returning();
    
    return updatedBeat;
  }

  async deleteUserBeat(id: number): Promise<void> {
    await db
      .delete(userBeats)
      .where(eq(userBeats.id, id));
  }

  // User avatars operations
  async createUserAvatar(avatar: InsertUserAvatar): Promise<UserAvatar> {
    const [newAvatar] = await db
      .insert(userAvatars)
      .values(avatar)
      .returning();
    
    return newAvatar;
  }

  async getUserAvatars(userId: number): Promise<UserAvatar[]> {
    return db
      .select()
      .from(userAvatars)
      .where(eq(userAvatars.userId, userId))
      .orderBy(desc(userAvatars.createdAt));
  }

  async getUserAvatar(id: number): Promise<UserAvatar | undefined> {
    const [avatar] = await db
      .select()
      .from(userAvatars)
      .where(eq(userAvatars.id, id));
    
    return avatar || undefined;
  }

  async updateUserAvatar(
    id: number, 
    data: Partial<Omit<UserAvatar, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
  ): Promise<UserAvatar> {
    const [updatedAvatar] = await db
      .update(userAvatars)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(userAvatars.id, id))
      .returning();
    
    return updatedAvatar;
  }

  async deleteUserAvatar(id: number): Promise<void> {
    await db
      .delete(userAvatars)
      .where(eq(userAvatars.id, id));
  }

  // User voice samples operations
  async createUserVoiceSample(sample: InsertUserVoiceSample): Promise<UserVoiceSample> {
    const [newSample] = await db
      .insert(userVoiceSamples)
      .values(sample)
      .returning();
    
    return newSample;
  }

  async getUserVoiceSamples(userId: number): Promise<UserVoiceSample[]> {
    return db
      .select()
      .from(userVoiceSamples)
      .where(eq(userVoiceSamples.userId, userId))
      .orderBy(desc(userVoiceSamples.createdAt));
  }

  async getUserVoiceSample(id: number): Promise<UserVoiceSample | undefined> {
    const [sample] = await db
      .select()
      .from(userVoiceSamples)
      .where(eq(userVoiceSamples.id, id));
    
    return sample || undefined;
  }

  async updateUserVoiceSample(
    id: number, 
    data: Partial<Omit<UserVoiceSample, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
  ): Promise<UserVoiceSample> {
    const [updatedSample] = await db
      .update(userVoiceSamples)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(userVoiceSamples.id, id))
      .returning();
    
    return updatedSample;
  }

  async deleteUserVoiceSample(id: number): Promise<void> {
    await db
      .delete(userVoiceSamples)
      .where(eq(userVoiceSamples.id, id));
  }
}

// Create and export the storage instance
export const storage = new DatabaseStorage();
