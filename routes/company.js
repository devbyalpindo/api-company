const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateToken");
const company = require("../controller/company/index");

router.get("/", validateToken, company.getsCompany);
router.get("/:id", validateToken, company.getCompany);
router.post("/", validateToken, company.addCompany);
router.delete("/:id", validateToken, company.deleteCompany);
router.put("/:id", validateToken, company.updateCompany);

module.exports = router;
