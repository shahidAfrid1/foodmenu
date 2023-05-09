require("dotenv").config();
require("express-async-errors");

// extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary").v2;

//connectBD
const connectBD = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

//routers
const authRouter = require("./routes/auth");
const menuRouter = require("./routes/menuItems");
const foodMenuUserRouter = require("./routes/foodMenuUser");

//error handlers
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

//extra packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//routes
app.get("/", (req, res) => [res.send("Food Menu")]);
app.use("/api/v1/user", foodMenuUserRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/menuItems", authenticateUser, menuRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async (req, res) => {
  try {
    await connectBD(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running at port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
