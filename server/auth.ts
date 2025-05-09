import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

// Extend Express User interface to include our User type
declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const PostgresSessionStore = connectPg(session);
const scryptAsync = promisify(scrypt);

// Functions to handle password hashing and verification
async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // Generate a random session secret if one isn't provided
  const sessionSecret = process.env.SESSION_SECRET || randomBytes(32).toString("hex");
  
  const sessionSettings: session.SessionOptions = {
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true,
      tableName: 'user_sessions'
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax"
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure Passport to use local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !(await comparePasswords(password, user.password))) {
          return done(null, false, { message: "Invalid username or password" });
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }),
  );

  // Serialize and deserialize user for session management
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  // Registration endpoint
  app.post("/api/register", async (req, res, next) => {
    try {
      const { username, password, email } = req.body;
      
      // Validate input
      if (!username || !password) {
        return res.status(400).json({ 
          success: false, 
          message: "Username and password are required",
          errors: {
            ...(username ? {} : { username: "Username is required" }),
            ...(password ? {} : { password: "Password is required" })
          }
        });
      }
      
      // Validate username format
      if (!/^[a-zA-Z0-9_-]{3,50}$/.test(username)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid username format",
          errors: {
            username: "Username must be 3-50 characters and can only contain letters, numbers, underscores and hyphens"
          }
        });
      }
      
      // Validate password strength
      if (password.length < 8) {
        return res.status(400).json({ 
          success: false, 
          message: "Password is too short",
          errors: {
            password: "Password must be at least 8 characters long"
          }
        });
      }
      
      if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password)) {
        return res.status(400).json({ 
          success: false, 
          message: "Password is too weak",
          errors: {
            password: "Password must contain at least one uppercase letter, one lowercase letter, and one number"
          }
        });
      }
      
      // Validate email if provided
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid email format",
          errors: {
            email: "Please enter a valid email address"
          }
        });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Username already exists",
          errors: {
            username: "This username is already taken. Please choose another one."
          }
        });
      }

      // Create the user with hashed password
      const user = await storage.createUser({
        username,
        password: await hashPassword(password),
        ...(email ? { email } : {})
      });
      
      // Log the user in automatically
      req.login(user, (err) => {
        if (err) return next(err);
        // Return user info (except password)
        const { password, ...userInfo } = user;
        res.status(201).json({
          success: true,
          message: "Registration successful",
          user: userInfo
        });
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred during registration. Please try again later."
      });
    }
  });

  // Login endpoint
  app.post("/api/login", (req, res, next) => {
    // Validate request data first
    const { username, password, rememberMe } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing credentials",
        errors: {
          ...(username ? {} : { username: "Username is required" }),
          ...(password ? {} : { password: "Password is required" })
        }
      });
    }
    
    passport.authenticate("local", (err: any, user: Express.User | false, info: { message: string } | undefined) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({
          success: false,
          message: "An error occurred during login. Please try again later."
        });
      }
      
      if (!user) {
        // Increment failed login attempts (could add rate limiting here)
        return res.status(401).json({ 
          success: false, 
          message: info?.message || "Invalid username or password",
          errors: {
            auth: "The username or password you entered is incorrect"
          }
        });
      }
      
      // Set session cookie options based on rememberMe
      if (rememberMe) {
        // If remember me is checked, set cookie expiration to 30 days
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
      } else {
        // Otherwise session expires when browser closes (default)
        req.session.cookie.expires = undefined;
      }
      
      req.login(user, (err: any) => {
        if (err) {
          console.error("Session error:", err);
          return res.status(500).json({
            success: false,
            message: "An error occurred while creating your session. Please try again."
          });
        }
        
        // Return user info (except password)
        const { password, ...userInfo } = user as Express.User;
        res.status(200).json({
          success: true,
          message: "Login successful",
          user: userInfo,
          sessionExpiry: rememberMe ? '30 days' : 'browser session',
        });
      });
    })(req, res, next);
  });

  // Logout endpoint
  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.status(200).json({ 
        success: true, 
        message: "Logout successful" 
      });
    });
  });

  // Get current user endpoint
  app.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ 
        success: false, 
        message: "Not authenticated" 
      });
    }
    
    // Return user info (except password)
    const { password, ...userInfo } = req.user as SelectUser;
    res.status(200).json({
      success: true,
      user: userInfo
    });
  });
}