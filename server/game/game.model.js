const mongoose = require('mongoose');
// const Promise = require('bluebird');
// const httpStatus = require('http-status');
// const APIError = require('../helpers/APIError');

const GameSchema = new mongoose.Schema({
  disclosure_position_timeout: {
    type: Number,
    required: true
  },
  victim_count: {
    type: Number,
    required: true
  },
  predator_id: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['stop', 'active', 'end'],
    defaultValue: 'stop'
  }
});

/**
 * @typedef Game
 */
module.exports = mongoose.model('Game', GameSchema);
