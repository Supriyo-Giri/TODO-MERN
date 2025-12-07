import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        default: false,
    }
},{
    timestamps:true
});

const todoModel = mongoose.model('Todo',todoSchema);

export default todoModel;