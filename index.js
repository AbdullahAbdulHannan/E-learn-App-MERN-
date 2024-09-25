const express=require('express');
const cors=require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/database.js');
const userRoutes=require('./routes/user.js')
const adminRoutes=require('./routes/admin.js')
const courseRoutes=require('./routes/courses.js')
dotenv.config();
const app=express()
app.use(express.json())
app.use(cors())

app.use('/api',userRoutes)
app.use('/api',courseRoutes)
app.use('/api',adminRoutes)
const PORT=process.env.PORT || 4000;
app.get('/',(req,res)=>{
  res.send('Server Get');
  
})
app.use("/uploads",express.static("uploads"))
app.listen(PORT,()=>{
  console.log('Running on .....'+PORT);
  connectDB()
})
// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const passport = require('passport');
// const session = require('express-session');
// const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
// const connectDB = require('./db/database.js');
// const userRoutes = require('./routes/user.js');
// const adminRoutes = require('./routes/admin.js');
// const courseRoutes = require('./routes/courses.js');

// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cors());

// // Passport configuration
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_SECRET_KEY,
//       callbackURL: 'http://localhost:5000/auth/google/callback',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // In a real application, you might want to check if the user already exists in your database
//       // and create a new user if they don't. Here, we'll just return the profile for demonstration.
//       console.log('Google profile:', profile);

//       // Here you would pass the user data to `done` function
//       done(null, profile);
//     }
//   )
// );

// // Serialize and deserialize user (for session management)
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

// // Initialize session and passport middleware
// app.use(
//   session({
//     secret: process.env.GOOGLE_SECRET_KEY,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// // Routes
// app.use('/api', userRoutes);
// app.use('/api', courseRoutes);
// app.use('/api', adminRoutes);

// const PORT = process.env.PORT || 4000;
// app.get('/', (req, res) => {
//   res.send('Server Get');
// });

// // Google OAuth routes
// app.get(
//   '/auth/google',
//   passport.authenticate('google', {
//     scope: ['profile', 'email'], // Requesting profile and email scopes
//   })
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, redirect to your frontend
//     res.redirect('http://localhost:3000/');
//   }
// );



// // Logout route
// app.get('/logout', (req, res) => {
//   req.logout(err => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });

// app.use('/uploads', express.static('uploads'));

// app.listen(PORT, () => {
//   console.log('Running on .....' + PORT);
//   connectDB();
// });
