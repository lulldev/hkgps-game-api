const mongoose = require('mongoose');

const PlayerCoordinateSchema = new mongoose.Schema({
  player_id: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
});

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
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['stop', 'active', 'end'],
    defaultValue: 'stop'
  },
  activeVistims: {
    type: [String],
    required: false
  },
  playerCoordinates: {
    type: [PlayerCoordinateSchema],
    required: false
  }
});

/**
 * @typedef Game
 */
module.exports = mongoose.model('Game', GameSchema);
