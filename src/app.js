const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/bw", require("./BW/routes"));
app.use("/d2", require("./D2/routes"));
app.use("/cnt", require("./CTN/routes"));
app.use("/db", require("./DB/routes"));

app.get("/", (req, res) => {
  res.send("Welcome to the Unified Project");
});

app.use(errorHandler);

module.exports = app;
