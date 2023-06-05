const express = require("express");
const router = express.Router();

const { register, login, getUser } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user/me").post(getUser);

module.exports = router;
