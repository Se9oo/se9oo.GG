const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const pool = require('../config/pool');
const { selectUser } = require('../routes/query/query');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    const connection = await pool.getConnection();

    try {
      let [user] = await connection.query(selectUser, [email]);

      // 사용자 존재여부 체크
      if (user.length == 0) {
        return done(null, false, { reason: '존재하지 않는 사용자입니다.' });
      }

      const result = await bcrypt.compare(password, user[0].user_password);

      if (result) {
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 틀렸습니다. '});
    } catch (err) {
      console.error(err);
      return done(true, false, { reason: ''})
    }
  }))
};