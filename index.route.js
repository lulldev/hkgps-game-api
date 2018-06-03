const express = require('express');
const createGameRoute = require('./server/game/create-game.route');

const router = express.Router(); // eslint-disable-line new-cap
router.use('/create-game', createGameRoute);

module.exports = router;
