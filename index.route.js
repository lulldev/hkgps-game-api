const express = require('express');
const createGameRoute = require('./server/game/create-game.route');
const registerVistimRoute = require('./server/game/register-vistim.route');
const startGameRoute = require('./server/game/start-game.route');
const stopGameRoute = require('./server/game/stop-game.route');

const router = express.Router(); // eslint-disable-line new-cap
router.use('/create-game', createGameRoute);
router.use('/register-vistim', registerVistimRoute);
router.use('/start-game', startGameRoute);
router.use('/stop-game', stopGameRoute);

module.exports = router;
