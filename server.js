const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./models/database'); // Import your Sequelize instance
const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

const app = express();

// Configure express-session for session management
app.use(
  session({
    secret: 'your-secret-key', // Replace with a strong, random secret
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
      tableName: 'user_sessions', // Customize the table name if needed
      expiration: 24 * 60 * 60 * 1000, // Session expiration time (in milliseconds)
    }),
    cookie: { secure: false }, // Set secure: true if using HTTPS
  })
);

// Synchronize the database and create tables
sequelize.sync({ force: true }).then(() => {
  console.log('Database and tables have been created.');

  // Start your Express server after database synchronization
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});

