const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dimensions: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
