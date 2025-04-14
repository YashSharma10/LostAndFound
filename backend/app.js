import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectMongo from "connect-mongo";
import FoundItemsRoutes from "./routes/foundItem.js";
import LostItemsRoutes from "./routes/lostItem.js";
import User from "./models/User.js";
import { Strategy as OAuth2Strategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();
console.log("Environment variables loaded.");

const app = express();
const PORT = process.env.PORT || 6005;
console.log(`Server will run on port: ${PORT}`);

// Use environment variables for sensitive information
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/";
console.log("Google OAuth credentials and MongoDB URL configured.");

// Create MongoStore instance
const MongoStore = connectMongo.create({
  mongoUrl: mongoUrl,
});
console.log("MongoStore instance created.");

app.use(
  cors({
    origin:"http://localhost:5173",
    credentials: true,
  })
);
console.log("CORS configured.");

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
console.log("Body parsers and static file serving configured.");

app.post("/user/profile", (req, res) => {
  console.log("User Google data received:", req.body);
  res.sendStatus(200);
});

// Setup session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretekey",
    resave: false,
    saveUninitialized: true,
    store: MongoStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  })
);
console.log("Session middleware configured.");

// Setup passport
app.use(passport.initialize());
app.use(passport.session());
console.log("Passport initialized.");

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: `${process.env.FRONTEND_URL}/auth/google/callback`,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("OAuth2Strategy: Profile received:", profile);
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
          console.log("New user created and saved:", user);
        } else {
          console.log("Existing user found:", user);
        }

        return done(null, user);
      } catch (error) {
        console.error("Error in OAuth2Strategy:", error);
        return done(error, null);
      }
    }
  )
);
console.log("OAuth2Strategy configured.");

passport.serializeUser((user, done) => {
  console.log("Serializing user:", user._id);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log("Deserializing user:", user);
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error, null);
  }
});

// Initial Google OAuth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
console.log("Google OAuth login route configured.");

// Google OAuth callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL || "http://localhost:5173",
    failureRedirect: "/login",
  })
);
console.log("Google OAuth callback route configured.");

// Login success
app.get("/login/success", (req, res) => {
  console.log("User logged in:", req.user);
  if (req.isAuthenticated()) {
    res.status(200).json({ message: "User logged in", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});
console.log("Login success route configured.");

// Logout
app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.error("Logout error:", err);
      return next(err);
    }
    res.redirect(process.env.FRONTEND_URL || "http://localhost:5173/");
  });
});
console.log("Logout route configured.");

// Check authentication status
app.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});
console.log("Authentication status route configured.");

// Use routes
app.use("/api/reports/lost", LostItemsRoutes);
app.use("/api/reports/found", FoundItemsRoutes);
console.log("Lost and Found item routes configured.");

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error encountered:", err.stack);
  res.status(500).send('Something broke!');
});
console.log("Error handling middleware configured.");

export { app };
