const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});

const HealthModel = mongoose.model('healthdata', healthDataSchema); // Fixed model name

module.exports = HealthModel;