const db = require("../config/database");

const ProductController = {
  get(req, res) {
    const sql = `select name, description from product`;

    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err.code);
      res.send(result);
    });
  },

  getWithCategory(req, res) {
    const sql = `
      select product.name, product.description, category.name as category 
      from product inner join category 
      on product.category_id = category.id`;

    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err.code);
      res.send(result);
    });
  },

  getById(req, res) {
    const id = req.params.id;
    const sql = `select name, description from product where id=${id}`;

    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err.code);
      res.send(result);
    });
  },

  getByName(req, res) {
    const name = req.params.name;
    const sql = `select name, description from product where name='${name}'`;

    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err.code);
      res.send(result);
    });
  },

  getDesc(req, res) {
    const sql = `select name, description from product order by name desc`;

    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err.code);
      res.send(result);
    });
  },

  create(req, res) {
    const { name, description, category_id } = req.body;
    if (!name || !description || !category_id) return res.status(400).send();

    const product = { name, description, category_id };
    const sql = `insert into product set ?`;

    db.query(sql, product, (err, result) => {
      if (err) return res.status(400).send(err.code);
      console.log(result);
      res.status(201).send("Product added...");
    });
  },

  update(req, res) {
    const id = req.params.id;

    const { name, description, category_id } = req.body;
    if (!name && !description && !category_id) return res.status(400).send();

    const product = Object.assign(
      {},
      name && { name },
      description && { description },
      category_id && { category_id }
    );

    const sql = `update product set ? where id=${id}`;

    db.query(sql, product, (err, result) => {
      if (err) return res.status(400).send(err.code);
      console.log(result);
      result.affectedRows === 0
        ? res.status(400).send("Product Id does not exist!")
        : res.status(200).send("Product modified...");
    });
  },

  delete(req, res) {
    const id = req.params.id;
    const sql = `delete from product where id=${id}`;

    db.query(sql, (err, result) => {
      if (err) return res.status(400).send(err.code);
      console.log(result);
      result.affectedRows === 0
        ? res.status(400).send("Product Id does not exist!")
        : res.status(200).send("Product deleted...");
    });
  },
};

module.exports = ProductController;
