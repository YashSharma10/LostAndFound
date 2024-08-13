import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-google-oauth2';
import connectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import User from './models/User.js';

const app = express();
const PORT = 6005;

const clientid = '707051850826-eq1uv5b9nqosab9bgbqum5sfr30oaucj.apps.googleusercontent.com';
const clientsecret = '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';

// Create MongoStore instance
const MongoStore = connectMongo.create({
  mongoUrl: 'mongodb+srv://yash22csu295:12345@lostandfound.wgyek.mongodb.net/?retryWrites=true&w=majority&appName=LostAndFound', // Update with your MongoDB URI
  collectionName: 'sessions',
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));

// Setup session middleware with expiration and max age
app.use(
  session({
    secret: 'secretekey',
    resave: false,
    saveUninitialized: true,
    store: MongoStore, // Use MongoStore instance here
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Helps mitigate XSS attacks
    },
  })
);

// Setup passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientid,
      clientSecret: clientsecret,
      callbackURL: '/auth/google/callback',
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        console.log(user);

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
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:5173',
    failureRedirect: 'http://localhost:5173/login',
  })
);

app.get('/login/success', async (req, res) => {
  if (req.user) {
    res.status(200).json({ message: 'user Login', user: req.user });
  } else {
    res.status(400).json({ message: 'Not Authorized' });
  }
});

app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('http://localhost:5173');
  });
});

export { app };
