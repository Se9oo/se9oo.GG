const passport = require('passport');
const local = require('./local');
const pool = require('../config/pool');
const { selectUser, selectFullUserInfo } = require('../routes/query/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user[0].email);
  });

  passport.deserializeUser(async (email, done) => {
    const connection = await pool.getConnection();
    try {
      //const [user] = await pool.query(selectUser, [email]);
      const [user] = await connection.query(selectFullUserInfo, [email]);
      done(null, user);
    } catch (err) {
      console.error(error);
      done(error);
    } finally {
      if (connection !== null) {
        connection.release();
      }
    }
  });

  local();
};
