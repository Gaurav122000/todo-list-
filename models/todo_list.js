//todo list schema
const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    desc:{
        type: String    
    },
    category:{
        type: String
    },
    dueDate:{
        type: String
    }
})

const TodoLists = mongoose.model('TodoLists',todoSchema);
module.exports = TodoLists;