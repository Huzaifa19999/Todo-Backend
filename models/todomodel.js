const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: Date,
    },
  },
  { timestamps: true } 
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
