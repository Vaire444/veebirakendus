require("dotenv").config();
const express = require("express");
const Article = require("./src/models/article");
const articleRouter = require("./src/routes/articles");
const methodOverride = require("method-override");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const User = require("./src/models/user");
const { auth } = require("./src/middlewares/auth");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(methodOverride("_method"));

app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/main", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("pages/main", { articles: articles });
});

app.use("/articles", articleRouter);

app.get("/blog", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("pages/articles", { articles: articles });
});

app.get("/profile", function (req, res) {
  res.render("pages/profile");
});
app.get("/register", function (req, res) {
  res.render("users/index");
});
app.get("/login", function (req, res) {
  res.render("users/login");
});

app.get("/start", function (req, res) {
  res.status(200).send(`Welcome to login , sign-up api`);
});

// uue kasutaja lisamine (sign-up route)
app.post("/register", function (req, res) {
  const newuser = new User(req.body);

  if (newuser.password != newuser.password2)
    return res.status(400).json({ message: "Salasõnad ei klapi" });

  User.findOne({ email: newuser.email }, function (err, user) {
    if (user)
      return res
        .status(400)
        .json({ auth: false, message: "e-post on juba kasutusel" });

    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      }
      res.status(200).json({
        succes: true,
        user: doc,
      });
    });
  });
});

// kasutaja sisselogimine
app.post("/login", function (req, res) {
  let token = req.cookies.auth;
  User.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (user)
      return res.status(400).json({
        error: true,
        message: "Sa oled juba sisse logitud",
      });
    else {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (!user)
          return res.json({
            isAuth: false,
            message: " Autentimine ebaõnnestus, e-posti aadressi ei leia",
          });

        user.comparepassword(req.body.password, (err, isMatch) => {
          if (!isMatch)
            return res.json({
              isAuth: false,
              message: "Vale salasõna",
            });

          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res.redirect("/main");
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
