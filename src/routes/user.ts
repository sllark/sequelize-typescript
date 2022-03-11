import models from "../models";
import express from "express";
import asyncHandler from "express-async-handler";
import { body } from "express-validator";

import * as controllers from "../controllers/user";
import isAuth from "../middlewares/isAuth";

const { User } = models;

console.log(User);

const router = express.Router();

router.get("/", isAuth, asyncHandler(controllers.getUser));

router.post(
  "/",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom(async (email) => {
        const user = await User.findOne({
          where: { email },
          attributes: ["id"],
        });
        if (user) return Promise.reject("User already exist");
        else return true;
      }),
    body("first_name").notEmpty().withMessage("First Name not Found!"),
    body("last_name").notEmpty().withMessage("Last Name not Found!"),
    body("password").notEmpty().withMessage("Password not Found!"),
  ],
  asyncHandler(controllers.addUser)
);

router.put("/", asyncHandler(controllers.updateUser));

router.delete("/", asyncHandler(controllers.deleteUser));

export default router;
