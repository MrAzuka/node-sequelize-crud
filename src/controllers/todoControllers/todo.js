const Todo = require("../../models/todoModel");


exports.createTodo = async (req, res) => {
    try {
        const { title, description } = req.body
        const { username } = req.user
        let todo = { title: title, description: description, created_by: username }

        const createTodo = await new Todo(todo)
        await createTodo.save()
        return res.status(201).json({ message: "todo created" });
    } catch (error) {
        return res.status(400).json({ message: "error creating todo" });
    }
}

exports.getOneTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { username } = req.user
        const getTodo = await Todo.findOne({ where: { id: id, created_by: username } })
        if (!getTodo) {
            return res.status(404).json({ message: "todo not found" });
        }
        return res.status(200).json({ message: getTodo });
    } catch (error) {
        return res.status(400).json({ message: "error finding todo" });
    }
}

exports.getAllTodo = async (req, res) => {
    try {
        const { username } = req.user
        const getTodos = await Todo.findAll({ where: { created_by: username } })
        if (getTodos.length === 0) {
            return res.status(200).json({ message: "no todo created" });
        }
        return res.status(200).json({ message: getTodos });
    } catch (error) {
        return res.status(400).json({ message: "error finding todo" });
    }
}

exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { username } = req.user
        const data = req.body
        const getTodo = await Todo.findOne({ where: { id: id, created_by: username } })
        if (!getTodo) {
            return res.status(404).json({ message: "todo not found" });
        }

        const updateTodo = await Todo.update({ title: data.title, description: data.description }, { where: { id: id, created_by: username } })
        const getUpdatedTodo = await Todo.findOne({ where: { id: id, created_by: username } })
        return res.status(200).json({ message: getUpdatedTodo });
    } catch (error) {

        return res.status(400).json({ message: "error updating todo" });
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params
        const { username } = req.user
        const getTodo = await Todo.findOne({ where: { id: id, created_by: username } })
        if (!getTodo) {
            return res.status(404).json({ message: "todo not found" });
        }

        const deleteTodo = await Todo.destroy({ where: { id: id, created_by: username } })
        return res.status(200).json({ message: "delete success" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "error deleting todo" });
    }
}