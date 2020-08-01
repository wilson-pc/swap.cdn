
var express = require("express");
var app = express();
var cors = require('cors')
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(
  cors({
    origin: ["http://localhost:8080", "http://localhost:8081"],
    credentials: true,
  })
);
app.use("/api/", require("./routes/api.route"));
app.get("/", (req, res) => {
  res.send({ msg: "hello" });
})



module.exports = app;