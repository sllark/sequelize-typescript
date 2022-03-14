import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import models from "../models";

const { User } = models;

const getUser = async (req, res, next) => {
  const user = await User.findOne({
    where: { id: req.user.id },
    attributes: ["first_name", "last_name", "email", "id"],
  });

  res.status(200).json({
    message: "success",
    user,
  });
};

const addUser = async (req, res, next) => {
  const { email, first_name, last_name, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    first_name,
    last_name,
    email,
    password: hashedPassword,
  });

  const payload = {
    id: user.id,
    name: `${user.first_name} ${user.last_name}`,
  };

  jwt.sign(payload, "SECRET_KEY", (error, token) => {
    if (error) {
      return next(new Error(error.message));
    }

    res.status(200).json({
      message: "success",
      token: token,
      userId: user.id,
    });
  });
};

const updateUser = async (req, res, next) => {
  const { first_name, last_name } = req.body;

  console.log("bere");
  const user = await User.findOne({
    where: { id: req.user.id },
  });

  user.first_name = first_name || user.first_name;
  user.last_name = last_name || user.last_name;

  await user.save();

  res.status(200).json({
    message: "success",
  });
};

const deleteUser = async (req, res, next) => {
  await User.destroy({
    id: req.user.id,
  });

  res.status(200).json({
    message: "success",
  });
};

export { getUser, addUser, updateUser, deleteUser };
