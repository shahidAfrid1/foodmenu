const MenuItems = require("../models/menuItems");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");
const getDataUri = require("../utils/dataUri");
const cloudinary = require("cloudinary");

const getAllMenuItems = async (req, res) => {
  const items = await MenuItems.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ items, count: items.length });
};

const createMenuItem = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const file = req.file;
  const fileUri = getDataUri(file);
  const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);

  const item = await MenuItems.create({
    ...req.body,
    image: myCloud.secure_url,
  });
  res.status(StatusCodes.CREATED).json({ item });
};

const getMenuItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: itemId },
  } = req;
  const item = await MenuItems.findOne({
    _id: itemId,
    createdBy: userId,
  });

  if (!item) {
    throw new NotFoundError(`No item with id ${itemId}`);
  }
  res.status(StatusCodes.OK).json({ item });
};

const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  let values = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    isavailable: req.body.isavailable,
  };

  if (req.file) {
    const file = req.file;
    const fileUri = getDataUri(file);
    const myCloud = await cloudinary.v2.uploader.upload(fileUri.content);
    values = { ...values, image: myCloud.secure_url };
  }

  const item = await MenuItems.findByIdAndUpdate({ _id: id }, values, {
    new: true,
  });

  if (!item) {
    throw new NotFoundError(`No item with id ${itemId}`);
  }
  res.status(StatusCodes.OK).json({ item });
};

const deleteMenuItem = async (req, res) => {
  const {
    user: { userId },
    params: { id: itemId },
  } = req;

  const item = await MenuItems.findByIdAndRemove({
    _id: itemId,
    createdBy: userId,
  });

  if (!item) {
    throw new NotFoundError(`No item with id ${itemId}`);
  }
  res.status(StatusCodes.OK).send("Menu item is deleted");
};

module.exports = {
  getAllMenuItems,
  createMenuItem,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
