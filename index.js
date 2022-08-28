// Requiring module
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());

const { mainRouter } = require("./router/mainRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true })); // if json come backend then it convert to obj in req.body

app.use(express.static("routes"));

app.use("/api/todo", mainRouter);

app.use("/", (req, res) => {
  res.send("Hello World");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error("API Not Found. Please check it and try again.");
  err.status = 404;
  next(err);
});

// Error handle
app.use((err, req, res, next) => {
  console.log("[Global error middleware]", err.message);
  res.status(500).send({
    message: err.message,
  });
  next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`); /*connectDb();*/
});
