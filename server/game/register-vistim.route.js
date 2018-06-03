const express = require('express');
// const validate = require('express-validation');
// const paramValidation = require('../../config/param-validation');
const gameCtrl = require('./game.controller');
const router = express.Router();

router.route('/')
  .get(gameCtrl.registerVistim);

module.exports = router;
