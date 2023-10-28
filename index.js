import express from "express";
import multer from "multer";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreaterValidation,
} from "./validation.js";
import cors from "cors";
import { chekAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:Kolomietc15@cluster887.eenew1b.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.post(
  "/auth/login",
  loginValidation,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", chekAuth, UserController.getMe);

app.post("/upload", chekAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/tags", PostController.getLastTags);
app.get("/posts", PostController.getAll);
app.get("/posts/tags", PostController.getLastTags);

app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  chekAuth,
  postCreaterValidation,
  handleValidationErrors,
  PostController.creat
);
app. delete("/posts/:id", chekAuth, PostController.remove);
app.patch(
  "/posts/:id",
  chekAuth,
  postCreaterValidation,
  handleValidationErrors,
  PostController.update
);

app.listen(8887, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server Ok");
});
