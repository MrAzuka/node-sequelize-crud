const { createTodo, getOneTodo, getAllTodo, updateTodo, deleteTodo } = require("../controllers/todoControllers/todo")
const { authUser } = require("../middlewares/authMiddleware")


exports.todoRoutes = (router) => {
    router.post("/todo/add", authUser, createTodo);
    router.get("/todo/single/:id", authUser, getOneTodo);
    router.get("/todo/all", authUser, getAllTodo);
    router.put("/todo/update/:id", authUser, updateTodo);
    router.delete("/todo/remove/:id", authUser, deleteTodo);
}