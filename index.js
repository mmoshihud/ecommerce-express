const express = require("express");
const app = express();
require("dotenv").config();

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM city", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
