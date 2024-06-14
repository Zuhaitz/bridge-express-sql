const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/CategoryController");

router.get("/table", CategoryController.table);

router.get("/", CategoryController.get);
router.get("/id/:id", CategoryController.getById);

router.post("/", CategoryController.create);
router.put("/id/:id", CategoryController.update);

module.exports = router;
