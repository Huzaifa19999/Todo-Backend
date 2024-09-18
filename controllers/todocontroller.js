const todoModel = require('../models/todomodel');

const todoController = {

    getAllTodos: async (req, res) => {
        try {
            const todos = await todoModel.find();
            res.json(todos);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching todos', error });
        }
    },

    postTodos: async (req, res) => {
        try {
            const newTodo = new todoModel(req.body);
            await newTodo.save();
            res.json(newTodo);
        } catch (error) {
            res.status(500).json({ message: 'Error saving todo', error });
        }
    },

    updateTodos: async (req, res) => {
        try {
            const updatedTodo = await todoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedTodo);
        } catch (error) {
            res.status(500).json({ message: 'Error updating todo', error });
        }
    },

    deleteTodos: async (req, res) => {
        try {
            await todoModel.findByIdAndDelete(req.params.id);
            res.json({ message: 'Todo deleted' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting todo', error });
        }
    }
};

module.exports = todoController;
