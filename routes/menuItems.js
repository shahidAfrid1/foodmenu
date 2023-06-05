const express = require("express");
const router = express.Router();

const {
  getAllMenuItems,
  createMenuItem,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuItems");
const singleUpload = require("../middleware/multer");

router.route("/").post(singleUpload, createMenuItem).get(getAllMenuItems);
router
  .route("/:id")
  .get(getMenuItem)
  .patch(singleUpload, updateMenuItem)
  .delete(deleteMenuItem);

module.exports = router;
