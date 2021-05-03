require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const Article = require("./src/models/article");
const articleRouter = require("./src/routes/articles");
const User = require("./src/models/user");
const { auth } = require("./src/middlewares/auth");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("connect-flash");

// Init App
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

// express Session Middleware
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

//express Message Middleware
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Express Validator Middleware

app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      let namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.lenght) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/main", auth, async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("pages/main", { articles: articles });
});

app.use("/articles", articleRouter);

app.get("/blog", auth, async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("pages/articles", { articles: articles });
});

app.get("/register", function (req, res) {
  res.render("users/index");
});
app.get("/login", function (req, res) {
  res.render("users/login");
});

// uue kasutaja lisamine (sign-up route)
app.post("/register", function (req, res) {
  const newuser = new User(req.body);

  if (newuser.password != newuser.password2) {
    req.flash("error", "Salasõnad ei klapi");
    return res.redirect("register");
  }

  User.findOne({ email: newuser.email }, function (err, user) {
    if (user) {
      req.flash("error", "e-post on juba kasutusel");
      return res.redirect("register");
    }
    newuser.save((err, doc) => {
      if (err) {
        req.flash("error", "registreerimine ebaõnnestus");
        return res.redirect("register");
      }
      req.flash("success", "Registreerimine õnnestus");
      res.redirect("/login");
    });
  });
});

// kasutaja sisselogimine
app.post("/login", function (req, res) {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (user) {
      req.flash("error", "Sa oled juba sisse logitud");
      return res.redirect("/blog");
    } else {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) {
          req.flash("error", "E-posti aadressi ei leia");
          return res.redirect("/login");
        }

        user.comparepassword(req.body.password, (err, isMatch) => {
          if (!isMatch) {
            req.flash("error", "Vale salasõna");
            return res.redirect("login");
          }

          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

            res.cookie("auth", user.token);

            return res.redirect("/main");
          });
        });
      });
    }
  });
});

// sisselogitud kasutaja saamine
app.get("/profile", auth, function (req, res) {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + " " + req.user.lastname,
  });
});

//kasutaja väljalogimine
app.get("/logout", auth, function (req, res) {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.render("pages/index");
    res.render("pages/index");
  });
});

//  port
app.listen(5000);
