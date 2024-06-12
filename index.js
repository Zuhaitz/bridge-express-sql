const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

const PORT = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect();

// Exercise 1
app.get("/createTableCategory", (req, res) => {
  const sql = `create table category(
    id int AUTO_INCREMENT, 
    name VARCHAR(255), 
    PRIMARY KEY(id)
  );`;

  db.query(sql, (err, result) => {
    if (err) return res.status(400).send(err.code);

    console.log(result);
    res.send("Category table created...");
  });
});

app.get("/createTableProduct", (req, res) => {
  const sql = `create table product(
    id int AUTO_INCREMENT,
    name VARCHAR(255),
    description VARCHAR(255),
    category_id int,
    PRIMARY KEY(id),
    FOREIGN KEY (category_id) REFERENCES category(id)
  )`;

  db.query(sql, (err, result) => {
    if (err) return res.status(400).send(err.code);

    console.log(result);
    res.send("Product table created...");
  });
});

// Exercise 2
app.post("/addCategory", (req, res) => {
  if (!req.body.name) return res.status(400).send();

  const category = { name: req.body.name };
  const sql = `insert into category set ?`;

  db.query(sql, category, (err, result) => {
    if (err) return res.status(400).send(err.code);

    console.log(result);
    res.status(201).send("Category added...");
  });
});

app.post("/addProduct", (req, res) => {
  const { name, description, category_id } = req.body;
  if (!name || !description || !category_id) return res.status(400).send();

  const product = { name, description, category_id };
  const sql = `insert into product set ?`;

  db.query(sql, product, (err, result) => {
    if (err) return res.status(400).send(err.code);
    console.log(result);
    res.status(201).send("Product added...");
  });
});

// PORT
app.listen(PORT, () => console.log("Listening to PORT " + PORT));
