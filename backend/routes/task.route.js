import express from 'express';
import { getAlltodo,addTodo,deleteTodo,checkedTodo,updateTodo } from '../controllers/todo.controller.js'

const router = express.Router();

router.get('/get-all-tasks',getAlltodo);
router.post('/add',addTodo);
router.delete('/delete/:id',deleteTodo);
router.put('/update-done/:id',checkedTodo);
router.put('/update-todo/:id',updateTodo);
export default router;
