const express = require('express');
const todoController  = require('../controllers/todocontroller');
const route = express.Router();

route.get( '/' , todoController.getAllTodos);
route.post('/' , todoController.postTodos);
route.put('/:id' , todoController.updateTodos);
route.delete('/:id',todoController.deleteTodos);

module.exports = route