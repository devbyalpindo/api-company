const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateToken");
const product = require("../controller/product/index");

router.get("/", validateToken, product.getsProduct);
router.get("/:id", validateToken, product.getProduct);
router.post("/", validateToken, product.addProduct);
router.put("/:id", validateToken, product.updateProduct);
router.delete("/:id", validateToken, product.deleteProduct);

module.exports = router;
