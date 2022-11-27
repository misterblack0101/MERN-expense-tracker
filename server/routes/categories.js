const { Router } = require("express");
const router = Router();
const CategoryController = require("../controllers/categoryController.js");

router.delete("/:id", CategoryController.remove);

module.exports = router;
