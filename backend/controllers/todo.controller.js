import todoModel from '../models/todo.model.js';

export const getAlltodo = async (req,res) => {
    try {
        const todos = await todoModel.find({}).lean();
        res.status(200).json({ todos });
    } catch (error) {
        console.log(`Error in getAllTodo controller: ${error}`);
        res.status(500).json(`Server error: ${error}`);
    }
}
export const addTodo = async (req,res) => {
    try {
        const { task } = req.body;
        if (!task){
            return res.status(400).json({message: "task cannot be empty!"});
        }
        const todo = await todoModel.create({
            task
        });
        res.status(201).json(todo);
    } catch (error) {
        console.log(`Error in addTodo controller: ${error}`);
        res.status(500).json(`Server error: ${error}`);
    }
}
export const deleteTodo = async (req,res) => {
    try {
        const todoId = req.params.id;
        if(!todoId){
            return res.status(400).json({message: "todo ID cannot be empty!"});
        }
        await todoModel.findByIdAndDelete(todoId);
        res.json({message: "todo deleted successfully"});
    } catch (error) {
        console.log(`Error in deleteTodo controller: ${error}`);
        res.status(500).json(`Server error: ${error}`);
    }
}
export const checkedTodo = async (req,res) => {
    try {
        const todoId = req.params.id;
        if(!todoId){
            return res.status(400).json({message: "todo ID cannot be empty!"});
        }
        const { done } = req.body;

        const updatedDone = await todoModel.findByIdAndUpdate(todoId,{ done: done }, {new: true});
        res.status(200).json({message: "Checked successfully",checkedTodo: updatedDone});
    } catch (error) {
        console.log(`Error in checkedTodo controller: ${error}`);
        res.status(500).json(`Server error: ${error}`);
    }

}
export const updateTodo = async (req,res) => {
    try {
        const todoId = req.params.id;
        if(!todoId){
            res.status(400).json({message: "todo ID not found"});
        }
        const { task } = req.body;
        const updatedTask = await todoModel.findByIdAndUpdate(todoId,{task: task},{new: true});
        res.status(200).json({message: "Updated successfully",newTodo: updatedTask});

    } catch (error) {
        console.log(`Error in checkedTodo controller: ${error}`);
        res.status(500).json(`Server error: ${error}`);
    }
}