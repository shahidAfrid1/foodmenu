const User = require("../models/user");
const MenuItems = require("../models/menuItems");

const getAllDetailsOfUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findById(userId).select("name qrcode");
  const items = await MenuItems.find({ createdBy: user.id }).sort("createdAt");

  res
    .status(200)
    .json({ user: { name: user.name, qrcode: user.qrcode, data: items } });
};

module.exports = getAllDetailsOfUser;
