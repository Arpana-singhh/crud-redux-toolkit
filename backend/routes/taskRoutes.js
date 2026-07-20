import express from 'express';
import { createTask, getTask, updateTask, deleteTask } from '../controller/taskController.js';


const router = express.Router();

router.get("/task", getTask);
router.post("/task", createTask);
router.put("/task/:taskID", updateTask);
router.delete("/task/:taskID", deleteTask);

export default router;