const Game = require('./game.model');

/**
 * Create new game
 * @property {string} req.body.disclosure_position_timeout
 * @property {string} req.body.victim_count
 * @property {string} req.body.predator_id
 * @returns {Game}
 */
function createGame(req, res, next) {
  // console.log(req.query);
  const game = new Game({
    disclosure_position_timeout: req.query.disclosure_position_timeout,
    victim_count: req.query.victim_count,
    predator_id: req.query.predator_id,
    status: 'stop'
  });
  game.save().then(savedUser => res.json(savedUser)).catch(e => next(e));
}

/**
 * todo Register vistim
 * @returns {Game}
 */
function registerVistim(req, res) {
  const { game_id, vistim_id } = req.query;
  Game.findByIdAndUpdate(game_id, { $push: { vistims: vistim_id } }, (err, game) => {
    if (err) {
      return res.json({ response: 'err' });
    }
    return res.json({ response: 'ok' });
  });
}

/**
 * todo Register vistim
 * @returns {Game}
 */
function startGame(req, res) {
  const { game_id } = req.query;
  Game.findByIdAndUpdate(game_id, { status: 'active' }, (err, game) => {
    if (err) {
      return res.json({ response: 'err' });
    }
    return res.json({ status: 'active' });
  });
}

function stopGame(req, res) {
  const { game_id } = req.query;
  Game.findByIdAndUpdate(game_id, { status: 'stop' }, (err, game) => {
    if (err) {
      return res.json({ response: 'err' });
    }
    return res.json({ status: 'stop' });
  });
}

module.exports = {
  createGame,
  registerVistim,
  startGame,
  stopGame
};
