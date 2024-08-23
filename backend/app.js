import express from "express";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import connectMongo from "connect-mongo";
import FoundItemsRoutes from "./routes/foundItem.js";
import LostItemsRoutes from "./routes/lostItem.js";
import User from "./models/User.js";
import { Strategy as OAuth2Strategy } from "passport-google-oauth20";

const app = express();
const PORT = 6005;

const clientid =
  "1054288691399-pjasu3r6f77sugpr1ff1n70gg4tpd5hh.apps.googleusercontent.com";
const clientsecret = "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";

// Create MongoStore instance
const MongoStore = connectMongo.create({
  mongoUrl:
    "mongodb+srv://yash22csu295:12345@lostandfound.wgyek.mongodb.net/?retryWrites=true&w=majority&appName=LostAndFound",
  collectionName: "sessions",
});

app.use(
  cors({
    origin: "https://lostandfound-1.onrender.com",
    credentials: true,
  })
);

const globalURL = "https://lostandfound-1.onrender.com";

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Setup session middleware
app.use(
  session({
    secret: "secretekey",
    resave: false,
    saveUninitialized: true,
    store: MongoStore,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      secure: false,
      httpOnly: true,
    },
  })
);

// Setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: "1054288691399-pjasu3r6f77sugpr1ff1n70gg4tpd5hh.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://lostandfound-40ek.onrender.com/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = new User({
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Initial Google OAuth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "https://lostandfound-1.onrender.com",
    failureRedirect: "https://lostandfound-1.onrender.com/login",
  })
);

app.get("/login/success", async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: "user Login", user: req.user });
  } else {
    res.status(400).json({ message: "Not Authorized" });
  }
});

app.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(`${globalURL}`);
  });
});
app.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
});

// Use routes
app.use("/api/reports/lost", LostItemsRoutes);
app.use("/api/reports/found", FoundItemsRoutes);

export { app };
