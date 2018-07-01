const express = require('express');
const createGameRoute = require('./server/game/routes/create-game.route');
const registerVistimRoute = require('./server/game/routes/register-vistim.route');
const startGameRoute = require('./server/game/routes/start-game.route');
const stopGameRoute = require('./server/game/routes/stop-game.route');
const sendPositions = require('./server/game/routes/send-positions.route');
const getGame = require('./server/game/routes/get-game.route');
const catchVistim = require('./server/game/routes/catch-vistim.route');

const router = express.Router(); // eslint-disable-line new-cap
router.use('/create-game', createGameRoute);
router.use('/register-vistim', registerVistimRoute);
router.use('/start-game', startGameRoute);
router.use('/stop-game', stopGameRoute);
router.use('/send-positions', sendPositions);
router.use('/get-game', getGame);
router.use('/catch-vistim', catchVistim);

module.exports = router;
