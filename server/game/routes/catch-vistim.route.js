const express = require('express');
const gameCtrl = require('../game.controller');
const router = express.Router();

router.route('/')
  .get(gameCtrl.catchVistim);

module.exports = router;
