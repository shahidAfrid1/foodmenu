const mongoose = require("mongoose");

const menuSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 30,
    },
    price: {
      type: Number,
      min: 1,
      required: [true, "Please provide price"],
    },
    description: {
      type: String,
      required: [true, "Please provide desciption"],
      minlength: 5,
      maxlength: 250,
    },
    image: {
      type: String,
      required: true,
    },
    isavailable: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide User"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItems", menuSchema);
