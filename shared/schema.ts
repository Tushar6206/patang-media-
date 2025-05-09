import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  fullName: text("full_name"),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  rhythmRouletteGenerationsCount: integer("rhythm_roulette_generations_count").default(0),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  profileImage: true,
});

export const userProfileSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  fullName: z.string().optional(),
  profileImage: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form schema
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  interest: text("interest").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  interest: z.string().min(1, "Please select an interest"),
  message: z.string().min(1, "Message is required"),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  company: true,
  interest: true,
  message: true,
});

export type InsertContactSubmission = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Newsletter signup schema
export const newsletterSignups = pgTable("newsletter_signups", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSchema = z.object({
  email: z.string().email("Valid email is required"),
});

export const insertNewsletterSchema = createInsertSchema(newsletterSignups).pick({
  email: true,
});

export type InsertNewsletterSignup = z.infer<typeof insertNewsletterSchema>;
export type NewsletterSignup = typeof newsletterSignups.$inferSelect;

// User-generated beats schema
export const userBeats = pgTable("user_beats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  genre: text("genre").notNull(),
  bpm: text("bpm").notNull(),
  audioUrl: text("audio_url").notNull(),
  coverImage: text("cover_image"),
  duration: text("duration"),
  description: text("description"),
  isPublic: boolean("is_public").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserBeatSchema = createInsertSchema(userBeats).pick({
  userId: true,
  name: true,
  genre: true,
  bpm: true,
  audioUrl: true, 
  coverImage: true,
  duration: true,
  description: true,
  isPublic: true,
});

export type InsertUserBeat = z.infer<typeof insertUserBeatSchema>;
export type UserBeat = typeof userBeats.$inferSelect;

// User-generated avatar schema
export const userAvatars = pgTable("user_avatars", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  type: text("type").notNull(),
  style: text("style").notNull(),
  previewUrl: text("preview_url").notNull(),
  previewImage: text("preview_image"),
  features: text("features").array(),
  isPublic: boolean("is_public").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserAvatarSchema = createInsertSchema(userAvatars).pick({
  userId: true,
  name: true,
  type: true,
  style: true,
  previewUrl: true,
  previewImage: true,
  features: true,
  isPublic: true,
});

export type InsertUserAvatar = z.infer<typeof insertUserAvatarSchema>;
export type UserAvatar = typeof userAvatars.$inferSelect;

// User-generated voice samples schema
export const userVoiceSamples = pgTable("user_voice_samples", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  sampleUrl: text("sample_url").notNull(),
  coverImage: text("cover_image"),
  duration: text("duration"),
  style: text("style"),
  features: text("features").array(),
  isPublic: boolean("is_public").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserVoiceSampleSchema = createInsertSchema(userVoiceSamples).pick({
  userId: true,
  name: true,
  sampleUrl: true,
  coverImage: true,
  duration: true,
  style: true,
  features: true,
  isPublic: true,
});

export type InsertUserVoiceSample = z.infer<typeof insertUserVoiceSampleSchema>;
export type UserVoiceSample = typeof userVoiceSamples.$inferSelect;

// Listening history for Rhythm Roulette feature
export const listeningHistory = pgTable("listening_history", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  trackTitle: text("track_title").notNull(), 
  artist: text("artist"),
  genre: text("genre"),
  mood: text("mood"),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const insertListeningHistorySchema = createInsertSchema(listeningHistory).pick({
  userId: true,
  trackTitle: true,
  artist: true,
  genre: true,
  mood: true,
});

export type InsertListeningHistory = z.infer<typeof insertListeningHistorySchema>;
export type ListeningHistory = typeof listeningHistory.$inferSelect;

// Rhythm Roulette compositions
export const rhythmRouletteCompositions = pgTable("rhythm_roulette_compositions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  elements: text("elements").notNull(),
  tempo: text("tempo"),
  mood: text("mood"),
  narrative: text("narrative"),
  uniqueTwist: text("unique_twist"),
  generatedAt: timestamp("generated_at").defaultNow(),
});

export const insertRhythmRouletteSchema = createInsertSchema(rhythmRouletteCompositions).pick({
  userId: true,
  title: true,
  description: true,
  elements: true,
  tempo: true,
  mood: true,
  narrative: true,
  uniqueTwist: true,
});

export type InsertRhythmRoulette = z.infer<typeof insertRhythmRouletteSchema>;
export type RhythmRouletteComposition = typeof rhythmRouletteCompositions.$inferSelect;
