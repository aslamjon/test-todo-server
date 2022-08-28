const fs = require("fs");
const filePath = "./data/data.json";

const createTodo = (req, res) => {
  const { firstName, lastName, age } = req.body;
  if (!firstName || !lastName) return res.status(400).send({ message: "firstName and lastName are required" });
  else {
    let result = fs.readFileSync(filePath);
    result = JSON.parse(result);
    result.push({
      id: result[result.length - 1].id + 1,
      firstName,
      lastName,
      age,
    });
    fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
    res.send({ data: result, message: "data has been added" });
  }
};

const getTodos = (req, res) => {
  let result = fs.readFileSync(filePath);
  res.send(result);
};

const getTodoById = (req, res) => {
  const { id } = req.params;
  let result = fs.readFileSync(filePath);
  result = JSON.parse(result);
  result = result.find((item) => item.id == id);
  if (result === -1 || !result) return res.status(404).send({ message: "not found" });
  res.send(result);
};

const updateTodoById = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  if (!firstName || !lastName) return res.status(400).send({ message: "firstName and lastName are required" });
  else {
    let result = fs.readFileSync(filePath);
    result = JSON.parse(result);
    let resultIndex = result.findIndex((item) => item.id == id);
    if (resultIndex === -1 || !result[resultIndex]) return res.status(404).send({ message: "not found" });
    else {
      result[resultIndex] = {
        id: result[resultIndex].id,
        firstName: firstName || result[resultIndex].firstName,
        lastName: lastName || result[resultIndex].lastName,
        age: age || result[resultIndex].age,
      };
      fs.writeFileSync(filePath, JSON.stringify(result, null, 2));
      res.send({ data: result, message: "updated" });
    }
  }
};

const deleteTodoById = (req, res) => {
  const { id } = req.params;
  let result = fs.readFileSync(filePath);
  result = JSON.parse(result);
  let resultFilter = result.filter((item) => item.id != id);
  if (resultFilter.length === result.length) return res.status(404).send({ message: "not found" });
  else {
    fs.writeFileSync(filePath, JSON.stringify(resultFilter, null, 2));
    res.send({ data: resultFilter, message: "deleted" });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodoById,
  deleteTodoById,
};
