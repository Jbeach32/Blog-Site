const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your Sequelize instance
const User = require('./User');
const Post = require('./Post');

const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Comment.belongsTo(User); // A Comment belongs to a User
User.hasMany(Comment); // A User has many Comments
Comment.belongsTo(Post); // A Comment belongs to a Post
Post.hasMany(Comment); // A Post has many Comments

module.exports = Comment;
