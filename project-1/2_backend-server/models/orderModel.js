const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dimenssions: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
