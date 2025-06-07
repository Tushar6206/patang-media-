import { 
  users, type User, type InsertUser,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  newsletterSignups, type NewsletterSignup, type InsertNewsletterSignup,
  userBeats, type UserBeat, type InsertUserBeat,
  userAvatars, type UserAvatar, type InsertUserAvatar,
  userVoiceSamples, type UserVoiceSample, type InsertUserVoiceSample,
  listeningHistory, type ListeningHistory, type InsertListeningHistory,
  rhythmRouletteCompositions, type RhythmRouletteComposition, type InsertRhythmRoulette,
  moodMixtapes, type MoodMixtape, type InsertMoodMixtape,
  moodDetectionSessions, type MoodDetectionSession, type InsertMoodDetection
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";

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
  
  // Listening history for Rhythm Roulette
  addListeningHistoryEntry(entry: InsertListeningHistory): Promise<ListeningHistory>;
  getUserListeningHistory(userId: number, limit?: number): Promise<ListeningHistory[]>;
  
  // Rhythm Roulette compositions
  createRhythmRouletteComposition(composition: InsertRhythmRoulette): Promise<RhythmRouletteComposition>;
  getUserRhythmRouletteCompositions(userId: number): Promise<RhythmRouletteComposition[]>;
  getRhythmRouletteComposition(id: number): Promise<RhythmRouletteComposition | undefined>;
  deleteRhythmRouletteComposition(id: number): Promise<void>;
  
  // Rhythm Roulette generation tracking
  incrementRhythmRouletteGenerationCount(userId: number): Promise<number>;
  getRhythmRouletteGenerationCount(userId: number): Promise<number>;
  
  // Mood Mixtapes
  createMoodMixtape(mixtape: InsertMoodMixtape): Promise<MoodMixtape>;
  getUserMoodMixtapes(userId: number): Promise<MoodMixtape[]>;
  getMoodMixtape(id: number): Promise<MoodMixtape | undefined>;
  updateMoodMixtape(id: number, data: Partial<Omit<MoodMixtape, 'id' | 'userId' | 'createdAt'>>): Promise<MoodMixtape>;
  deleteMoodMixtape(id: number): Promise<void>;
  getActiveMoodMixtape(userId: number): Promise<MoodMixtape | undefined>;
  
  // Mood Detection Sessions
  createMoodDetectionSession(session: InsertMoodDetection): Promise<MoodDetectionSession>;
  getUserMoodDetectionHistory(userId: number, limit?: number): Promise<MoodDetectionSession[]>;
  getRecentMoodDetection(userId: number): Promise<MoodDetectionSession | undefined>;
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
  
  async incrementRhythmRouletteGenerationCount(userId: number): Promise<number> {
    const [updatedUser] = await db
      .update(users)
      .set({
        rhythmRouletteGenerationsCount: sql`COALESCE(${users.rhythmRouletteGenerationsCount}, 0) + 1`,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();
    
    // The column has a default value of 0, but we need to handle potential null values
    // that might occur with older users or if database schema evolves
    return typeof updatedUser.rhythmRouletteGenerationsCount === 'number' 
      ? updatedUser.rhythmRouletteGenerationsCount 
      : 1; // Default to 1 if we've just incremented from null
  }
  
  async getRhythmRouletteGenerationCount(userId: number): Promise<number> {
    const [user] = await db
      .select({ generationsCount: users.rhythmRouletteGenerationsCount })
      .from(users)
      .where(eq(users.id, userId));
    
    // Return 0 as default if no user found or count is null/undefined
    return (user && typeof user.generationsCount === 'number') ? user.generationsCount : 0;
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
  
  // Listening history operations
  async addListeningHistoryEntry(entry: InsertListeningHistory): Promise<ListeningHistory> {
    const [newEntry] = await db
      .insert(listeningHistory)
      .values(entry)
      .returning();
    
    return newEntry;
  }
  
  async getUserListeningHistory(userId: number, limit: number = 10): Promise<ListeningHistory[]> {
    return db
      .select()
      .from(listeningHistory)
      .where(eq(listeningHistory.userId, userId))
      .orderBy(desc(listeningHistory.timestamp))
      .limit(limit);
  }
  
  // Rhythm Roulette compositions operations
  async createRhythmRouletteComposition(composition: InsertRhythmRoulette): Promise<RhythmRouletteComposition> {
    const [newComposition] = await db
      .insert(rhythmRouletteCompositions)
      .values(composition)
      .returning();
    
    return newComposition;
  }
  
  async getUserRhythmRouletteCompositions(userId: number): Promise<RhythmRouletteComposition[]> {
    return db
      .select()
      .from(rhythmRouletteCompositions)
      .where(eq(rhythmRouletteCompositions.userId, userId))
      .orderBy(desc(rhythmRouletteCompositions.generatedAt));
  }
  
  async getRhythmRouletteComposition(id: number): Promise<RhythmRouletteComposition | undefined> {
    const [composition] = await db
      .select()
      .from(rhythmRouletteCompositions)
      .where(eq(rhythmRouletteCompositions.id, id));
    
    return composition || undefined;
  }
  
  async deleteRhythmRouletteComposition(id: number): Promise<void> {
    await db
      .delete(rhythmRouletteCompositions)
      .where(eq(rhythmRouletteCompositions.id, id));
  }

  // Mood Mixtapes operations
  async createMoodMixtape(mixtape: InsertMoodMixtape): Promise<MoodMixtape> {
    const [newMixtape] = await db
      .insert(moodMixtapes)
      .values(mixtape)
      .returning();
    
    return newMixtape;
  }
  
  async getUserMoodMixtapes(userId: number): Promise<MoodMixtape[]> {
    return db
      .select()
      .from(moodMixtapes)
      .where(eq(moodMixtapes.userId, userId))
      .orderBy(desc(moodMixtapes.createdAt));
  }
  
  async getMoodMixtape(id: number): Promise<MoodMixtape | undefined> {
    const [mixtape] = await db
      .select()
      .from(moodMixtapes)
      .where(eq(moodMixtapes.id, id));
    
    return mixtape || undefined;
  }
  
  async updateMoodMixtape(id: number, data: Partial<Omit<MoodMixtape, 'id' | 'userId' | 'createdAt'>>): Promise<MoodMixtape> {
    const [updatedMixtape] = await db
      .update(moodMixtapes)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(moodMixtapes.id, id))
      .returning();
    
    return updatedMixtape;
  }
  
  async deleteMoodMixtape(id: number): Promise<void> {
    await db
      .delete(moodMixtapes)
      .where(eq(moodMixtapes.id, id));
  }
  
  async getActiveMoodMixtape(userId: number): Promise<MoodMixtape | undefined> {
    const [activeMixtape] = await db
      .select()
      .from(moodMixtapes)
      .where(and(eq(moodMixtapes.userId, userId), eq(moodMixtapes.isActive, true)))
      .orderBy(desc(moodMixtapes.lastAdaptedAt))
      .limit(1);
    
    return activeMixtape || undefined;
  }
  
  // Mood Detection Sessions operations
  async createMoodDetectionSession(session: InsertMoodDetection): Promise<MoodDetectionSession> {
    const [newSession] = await db
      .insert(moodDetectionSessions)
      .values(session)
      .returning();
    
    return newSession;
  }
  
  async getUserMoodDetectionHistory(userId: number, limit: number = 10): Promise<MoodDetectionSession[]> {
    return db
      .select()
      .from(moodDetectionSessions)
      .where(eq(moodDetectionSessions.userId, userId))
      .orderBy(desc(moodDetectionSessions.createdAt))
      .limit(limit);
  }
  
  async getRecentMoodDetection(userId: number): Promise<MoodDetectionSession | undefined> {
    const [recentDetection] = await db
      .select()
      .from(moodDetectionSessions)
      .where(eq(moodDetectionSessions.userId, userId))
      .orderBy(desc(moodDetectionSessions.createdAt))
      .limit(1);
    
    return recentDetection || undefined;
  }
}

// Create and export the storage instance
export const storage = new DatabaseStorage();
