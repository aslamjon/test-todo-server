// Requiring module
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const fs = require("fs");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true })); // if json come backend then it convert to obj in req.body

app.use(express.static("routes"));

app.post("/data", (req, res) => {
  const { firstName, lastName, age } = req.body;
  if (!firstName || !lastName) return res.status(400).send({ message: "firstName and lastName are required" });
  else {
    let result = fs.readFileSync("./data/data.json");
    result = JSON.parse(result);
    result.push({
      id: result[result.length - 1].id + 1,
      firstName,
      lastName,
      age,
    });
    fs.writeFileSync("./data/data.json", JSON.stringify(result, null, 2));
    res.send({ data: result, message: "data has been added" });
  }
});

app.get("/data", (req, res) => {
  let result = fs.readFileSync("./data/data.json");
  res.send(result);
});

app.get("/data/:id", (req, res) => {
  const { id } = req.params;
  let result = fs.readFileSync("./data/data.json");
  result = JSON.parse(result);
  result = result.find((item) => item.id == id);
  if (result === -1 || !result) return res.status(404).send({ message: "not found" });
  res.send(result);
});

app.put("/data/:id", (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  if (!firstName || !lastName) return res.status(400).send({ message: "firstName and lastName are required" });
  else {
    let result = fs.readFileSync("./data/data.json");
    result = JSON.parse(result);
    let resultIndex = result.findIndex((item) => item.id == id);
    if (resultIndex === -1 || !result[resultIndex]) return res.status(404).send({ message: "not found" });
    else {
      result[resultIndex] = {
        firstName: firstName || result[resultIndex].firstName,
        lastName: lastName || result[resultIndex].lastName,
        age: age || result[resultIndex].age,
      };
      fs.writeFileSync("./data/data.json", JSON.stringify(result, null, 2));
      res.send({ data: result, message: "updated" });
    }
  }
});

app.delete("/data/:id", (req, res) => {
  const { id } = req.params;
  let result = fs.readFileSync("./data/data.json");
  result = JSON.parse(result);
  let resultFilter = result.filter((item) => item.id != id);
  if (resultFilter.length === result.length) return res.status(404).send({ message: "not found" });
  else {
    fs.writeFileSync("./data/data.json", JSON.stringify(resultFilter, null, 2));
    res.send({ data: resultFilter, message: "deleted" });
  }
});

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
