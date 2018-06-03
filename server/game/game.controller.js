const Game = require('./game.model');

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
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
 * Load user and append to req.
 */
// function load(req, res, next, id) {
//   // User.get(id)
//   //   .then((user) => {
//   //     req.user = user; // eslint-disable-line no-param-reassign
//   //     return next();
//   //   })
//   //   .catch(e => next(e));
// }

/**
 * Get user
 * @returns {User}
 */
// function get(req, res) {
//   return res.json(req.user);
// }


/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
// function update(req, res, next) {
//   const user = req.user;
//   user.username = req.body.username;
//   user.mobileNumber = req.body.mobileNumber;
//
//   user.save()
//     .then(savedUser => res.json(savedUser))
//     .catch(e => next(e));
// }

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
// function list(req, res, next) {
//   return { test: 'configure' };
//   const { limit = 50, skip = 0 } = req.query;
//   User.list({ limit, skip })
//     .then(users => res.json(users))
//     .catch(e => next(e));
// }

/**
 * Delete user.
 * @returns {User}
 */
// function remove(req, res, next) {
//   const user = req.user;
//   user.remove()
//     .then(deletedUser => res.json(deletedUser))
//     .catch(e => next(e));
// }

module.exports = { createGame };
