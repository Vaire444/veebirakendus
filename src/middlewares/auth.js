// siin kontrollime, kas kasutaja on sisse loginud või mitte
// eraldame tokeni cookie-st, kutsume välja funk. findByToken failist /models/user.js ja kontrollime kasutaja sisselogimisolekut

const User = require("./../models/user");

let auth = (req, res, next) => {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.render("pages/index");

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
