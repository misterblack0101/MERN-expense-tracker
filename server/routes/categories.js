const { Router } = require("express");
const router = Router();
const CategoryController = require("../controllers/categoryController.js");

router.delete("/:id", CategoryController.remove);
router.post("/", CategoryController.create);
router.put("/:id", CategoryController.update);

module.exports = router;
