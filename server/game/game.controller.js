const Game = require('./game.model');

function createGame(req, res, next) {
  const game = new Game({
    disclosure_position_timeout: req.query.disclosure_position_timeout,
    victim_count: req.query.victim_count,
    predator_id: req.query.predator_id,
    speedLimit: req.query.speed_limit,
    startPosition: { longitude: req.query.start_longitude, latitude: req.query.start_latitude },
    status: 'stop'
  });
  game.save().then(savedUser => res.json(savedUser)).catch(e => next(e));
}

function registerVistim(req, res) {
  const { game_id, vistim_id } = req.query;
  Game.findByIdAndUpdate(game_id, { $push: { activeVistims: vistim_id } }, (err) => {
    if (err) {
      return res.json({ response: 'err' });
    }
    return res.json({ response: 'ok' });
  });
}

function startGame(req, res) {
  const { game_id } = req.query;
  Game.findByIdAndUpdate(game_id, { status: 'active' }, (err) => {
    if (err) {
      return res.json({ response: 'err' });
    }
    return res.json({ status: 'active' });
  });
}

function stopGame(req, res) {
  const { game_id } = req.query;
  Game.findByIdAndUpdate(game_id, { status: 'stop' }, (err) => {
    if (err) {
      return res.json({ response: 'err' });
    }
    return res.json({ status: 'stop' });
  });
}

function sendPositions(req, res, next) {
  const {
    game_id,
    player_id,
    longitude,
    latitude
  } = req.query;
  Game.update({ _id: game_id, 'playerCoordinates.player_id': player_id },
    { $set: {
      'playerCoordinates.$.longitude': longitude,
      'playerCoordinates.$.latitude': latitude, },
    },
    (err, result) => {
      if (err) {
        return res.json({ response: 'err' });
      }
      if (result.nModified === 0) {
        Game.findByIdAndUpdate(game_id,
          { $push: { playerCoordinates: { player_id, longitude, latitude } } }, (err) => {
            if (err) {
              return res.json({ response: 'err' });
            }
          });
      }
      return res.json({ response: 'ok' });
    });
}

function getGame(req, res, next) {
  return Game.findById(req.query.game_id)
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
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
  sendPositions,
  getGame,
  catchVistim
};
