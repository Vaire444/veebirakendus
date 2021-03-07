var mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const salt = 10; // salt on kasutusel hashimisel

const userSchema = mongoose.Schema({
  accessType: {
    type: String,
    enum: ["ADMIN", "NOT_ADMIN"],
    default: "NOT_ADMIN",
    required: true,
  },
  firstname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: validator.isEmail,
    unique: 1,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  password2: {
    type: String,
    required: true,
    minlength: 8,
  },
  token: {
    type: String,
  },
});

// Eelfunktsioonid, mis käivitatakse siis, kui funktsioon on kutsutud

// Seda funktsiooni kasutatakse kasutaja parooli räsimiseks(hash), kui me kasutaja oma andmebaasi salvestame, kutsub see funktsioon välja ennast ise ja hash-ib meie parooli
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        user.password2 = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// kasutaja parooli võrdlemiseks, kas salasõna on õige või mitte (dekodeerime meie salvestatud parooli)

userSchema.methods.comparepassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(next);
    cb(null, isMatch);
  });
};

// tokeni genereerimine, kui kasutaja logib sisse

userSchema.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), "secret");

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

// järgmine meetod on kindla tokeni leidmiseks (leia tokeni järgi)/ seda meetodit kasutatakse, et teada saada, kas kasutaja on sisse loginud või mitte
userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token, "secret", function (err, decode) {
    user.findOne({ _id: decode, token: token }, function (err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

// järgmine meetod kustutab tokeni
userSchema.methods.deleteToken = function (token, cb) {
  var user = this;

  user.updateOne({ $unset: { token: 1 } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

module.exports = mongoose.model("User", userSchema);
