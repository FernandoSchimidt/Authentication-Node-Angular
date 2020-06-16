var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();
var api = require("./routes/api");
var auth = require("./routes/auth");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/auth_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api", api);
app.use("/auth", auth);

app.use("/", (req, res) => {
  res.json({ message: "Main" });
});

//APi

app.use(function (req, res, next) {
  res.status(404).send("Not found");
});

app.listen(3000);
