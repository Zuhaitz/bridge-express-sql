const db = require("../config/database");

const CategoryController = {
  table(req, res) {
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
  },

  get(req, res) {
    const sql = `select name from category`;

    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err.code);
      res.send(result);
    });
  },

  getById(req, res) {
    const id = req.params.id;
    const sql = `select name from category where id=${id}`;

    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err.code);
      res.send(result);
    });
  },

  create(req, res) {
    if (!req.body.name) return res.status(400).send();

    const category = { name: req.body.name };
    const sql = `insert into category set ?`;

    db.query(sql, category, (err, result) => {
      if (err) return res.status(400).send(err.code);

      console.log(result);
      res.status(201).send("Category added...");
    });
  },

  update(req, res) {
    const id = req.params.id;

    const { name } = req.body;
    if (!name) return res.status(400).send();

    const category = { name };
    const sql = `update category set ? where id=${id}`;

    db.query(sql, category, (err, result) => {
      if (err) return res.status(400).send(err.code);
      console.log(result);
      result.affectedRows === 0
        ? res.status(400).send("Category Id does not exist!")
        : res.status(200).send("Category modified...");
    });
  },
};

module.exports = CategoryController;
