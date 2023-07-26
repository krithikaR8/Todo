const Task = require('../models/taskmodel');
const getAllTasks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const tasks = await Task.find().skip(skip).limit(limit);
        const totalTasks = await Task.countDocuments();
        res.status(200).json({
          success: true,
          tasks,
          currentPage: page,
          totalPages: Math.ceil(totalTasks / limit),
        });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching tasks.',message:error.message });
    }
};
const createtask = async (req, res) => {
    const task = new Task({
        title: req.body.title,
        Description: req.body.Description,
    })
    try {
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const updatetask = async (req, res) => {
    const id = req.params.id;
    try {
        await Task.findByIdAndUpdate(
           id, {
                title: req.body.title,
                Description: req.body.Description,
                completed:req.body.completed
            }
        )
        res.status(201).json({
            success: true,
            message:"updated sucessfully!"
        })
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
}
const deletetask = async (req, res) => {
    const id = req.params.id;
    try {
        await Task.findByIdAndDelete(id);
        res.status(201).json({
            success: true,
            message: "deleted sucessfully!"
        })
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }
}
 
const searchtask = async (req, res) => {
    try {
        const searchtask = await Task.find(req.query);
        res.status(201).json({
            success: true,
            searchtask
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message:err.message
        })
    }
}
module.exports = {
    getAllTasks,createtask,updatetask,deletetask,searchtask
   
  };