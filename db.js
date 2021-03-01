const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.Promise = global.Promise;
module.exports = {
  Articles: require("./models/article"),
  //   Products: require("./models/products.model"),
  //   Orders: require("./models/orders.model"),
  //   Bonus: require("./models/bonus.model"),
};
