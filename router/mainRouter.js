const { Router } = require("express");

const { createTodo, getTodos, getTodoById, updateTodoById, deleteTodoById } = require("../controllers/todoController");

const router = Router();

router.post("/v1/data", createTodo);
router.get("/v1/data", getTodos);
router.get("/v1/data/:id", getTodoById);
router.put("/v1/data/:id", updateTodoById);
router.delete("/v1/data/:id", deleteTodoById);

module.exports = {
  mainRouter: router,
};
