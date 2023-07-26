const mongoose = require('mongoose');
const taskschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
       
    },
    Description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default:Date.now
    },
    updateAt: {
        type: Date,
        default:Date.now
    }
    

})
const Task = mongoose.model('Task', taskschema)
module.exports=Task