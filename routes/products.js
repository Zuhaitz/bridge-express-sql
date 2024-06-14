const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/ProductController");

router.get("/", ProductController.get);
router.get("/category", ProductController.getWithCategory);
router.get("/id/:id", ProductController.getById);
router.get("/name/:name", ProductController.getByName);
router.get("/desc", ProductController.getDesc);

router.post("/", ProductController.create);
router.put("/id/:id", ProductController.update);
router.delete("/id/:id", ProductController.delete);

module.exports = router;
