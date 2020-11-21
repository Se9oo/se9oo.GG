const passport = require('passport');
const local = require('./local');
const pool = require('../config/pool');
const { selectUser } = require('../routes/query/query');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user[0].user_email);
  });

  passport.deserializeUser(async (email, done) => {
    try {
      const user = await pool.query(selectUser, [email]);
      done(null, user);
    } catch (err) {
      console.error(error);
      done(error);
    }
  });

  local(); 
}