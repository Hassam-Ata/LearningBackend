require("dotenv").config();
const express = require("express");
const path = require("node:path");
const app = express();
const router = require("./routes/router");
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
