import express from "express";

import userRoutes from "./routes/user";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.use("/user", userRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;

  if (error.errors) {
    res.status(status).json({
      message: message,
      error: error.errors,
    });
  } else {
    res.status(status).json({
      message: message,
    });
  }

  res.status(500);
});

app.listen(3000);
