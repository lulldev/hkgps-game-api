const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const gameCtrl = require('./game.controller');
const router = express.Router();

router.route('/')
  .get(gameCtrl.startGame);

module.exports = router;
