const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
});

const Comment = require('../models/comment');

module.exports = Review;
