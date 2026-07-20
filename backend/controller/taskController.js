import taskModel from '../models/taskModel.js'

export const getTask = async(req, res)=>{
    try {
        const tasks = await taskModel.find().sort({ createdAt: -1 })
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const createTask = async(req, res)=>{
    const {taskName,  taskDetail} = req.body;

    if(!taskName){
        return res.status(400).json({ message: "taskName is required" })
    }
    try {
        const tasks = await taskModel.create({taskName,  taskDetail})
        res.status(201).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateTask = async(req, res)=>{
    const { taskID } = req.params;
    const { taskName, taskDetail, completed } = req.body;

    try {
        const task = await taskModel.findByIdAndUpdate(
            taskID,
            { taskName, taskDetail, completed },
            { new: true, runValidators: true }
        )

        if(!task){
            return res.status(404).json({ message: "Task not found" })
        }

        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteTask = async(req, res)=>{
    const { taskID } = req.params;

    try {
        const task = await taskModel.findByIdAndDelete(taskID)

        if(!task){
            return res.status(404).json({ message: "Task not found" })
        }

        res.status(200).json({
            message: "Task deleted successfully",
            task
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}