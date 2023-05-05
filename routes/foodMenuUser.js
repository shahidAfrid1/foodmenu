const express = require("express");
const getAllDetailsOfUser = require("../controllers/foodMenuUser");
const router = express.Router();

router.route("/:id").get(getAllDetailsOfUser);

module.exports = router;
