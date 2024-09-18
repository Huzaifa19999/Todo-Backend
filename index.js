const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require('dotenv').config();

const app = express(); 
const todorouter = require("./routes/todoroute");

app.use(cors());
app.use(express.json());

app.use("/todos", todorouter);

app.get('/', (req, res) => {
    res.send('Welcome to TodoApp');
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`DB connected & Server running on port ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error("DB connection failed", err);
});
