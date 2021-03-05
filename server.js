require("dotenv").config(); //new
const express = require("express");
const Article = require("./models/article");
const articleRouter = require("./routes/articles");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("pages/index", { articles: articles });
});

app.use("/articles", articleRouter);

app.get("/blog", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("pages/articles", { articles: articles });
});

app.get("/about", function (req, res) {
  res.render("pages/about");
});

app.listen(5000);
