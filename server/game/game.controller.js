const Game = require('./game.model');

function createGame(req, res, next) {
  const game = new Game({
    disclosure_position_timeout: req.query.disclosure_position_timeout,
    victim_count: req.query.victim_count,
    predator_id: req.query.predator_id,
    status: 'stop'
  });
  game.save().then(savedUser => res.json(savedUser)).catch(e => next(e));
}

function registerVistim(req, res) {
  const { game_id, vistim_id } = req.query;
  Game.findByIdAndUpdate(game_id, { $push: { activeVistims: vistim_id } }, (err, game) => {
    if (err) {
      return res.json({ response: 'err' });
    }
    return res.json({ response: 'ok' });
  });
}

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

function sendPositionsAndFetch(req, res) {
  const {
    game_id,
    player_id,
    longitude,
    latitude
  } = req.query;
  Game.findByIdAndUpdate(game_id,
    { $push: { playerCoordinates: { player_id, longitude, latitude } } }, (err, game) => {
      if (err) {
        return res.json({ response: 'err' });
      }
      return res.json({
        game_id: game._id,
        predator_id: game.predator_id,
        player_coordinates: game.playerCoordinates
      });
    });
}

function catchVistim(req, res) {
  const { game_id, vistim_id } = req.query;
  Game.findByIdAndUpdate(game_id, { $pull: { activeVistims: vistim_id } }, (err, game) => {
    if (err || (game && game.activeVistims.indexOf(vistim_id) === -1)) {
      return res.json({ response: 'err' });
    }
    return res.json({ response: 'ok' });
  });
}

module.exports = {
  createGame,
  registerVistim,
  startGame,
  stopGame,
  sendPositionsAndFetch,
  catchVistim
};
