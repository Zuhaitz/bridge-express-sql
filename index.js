const db = require("./config/database");

const express = require("express");
const app = express();

app.use(express.json());
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));

const PORT = 3000;

// Create Database
app.get("/database", (req, res) => {
  const sql = "create database " + process.env.DB_NAME;

  db.query(sql, (err, result) => {
    if (err) res.status(400).send(err);
    res.send("Database created...");
  });
});

// PORT
app.listen(PORT, () => console.log("Listening to PORT " + PORT));
