const passport = require('passport');
const local = require('./local');

module.exports = () => {
  passport.serializeUser((user, done) => {
    
  });

  passport.deserializeUser(() => {

  });

  local(); 
}