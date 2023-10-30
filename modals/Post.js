const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance
const User = require('./User');

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Post.belongsTo(User); // A Post belongs to a User
User.hasMany(Post); // A User has many Posts

module.exports = Post;
