const Task = require('../models/taskModel')

const asyncWrapper = require('../middleware/async')

const {createCustomError} = require('../errors/customError')

// Fetch all Tasks / Get All Tasks 
const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({tasks})
});


// Create Tasks
const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
  
})

// Get Single Task
const getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskID} = req.params;
    const task = await Task.findOne({ _id: taskID})

    // testing for when there's no matching ID in the database
    if (!task) {

      return next(createCustomError(`No task with id: ${taskID}`, 404))

    } else {
      
      res.status(200).json({task})
    }
  
})

// Delete Task
const deleteTask = asyncWrapper(async (req, res) => {
  
  // METHOD 2
  
    const {id: taskID} = req.params;
    const task = await Task.findOneAndDelete({_id: taskID})
    
    if (!task) {
      return next(createCustomError(`No task with id: ${taskID}`, 404))
    }
    else{
      res.status(200).json({task})
    }
    
  // try {
  //   const {id: taskID} = req.params;
  //   const fetchedTask = await Task.findOne({ _id: taskID})

  //   if (!fetchedTask) {

  //     return res.status(404).json({msg: `${taskID} does not exist in Collections`})

  //   } else {
  //     const task = await Task.findOneAndDelete(fetchedTask)
  //     // const remTasks = await Task.find({})
  //     res.status(200).json({task})
  //   }

  // } catch (error) {
  //   res.status(500).json({msg: error})
  // }
})

// Update Task 
const updateTask = asyncWrapper(async (req, res) => {
 
    const {id: taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {new: true, runValidators: true})
    
    if (!task) {

      return next(createCustomError(`No task with id: ${taskID}`, 404))

    } else {
      
      res.status(200).json({ task })
    }

})


// const editTask = async (req, res) => {
//   try {
//     const {id: taskID} = req.params;
//     const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {new: true, runValidators: true, overwrite: true})
    
//     if (!task) {

//       return res.status(404).json({msg: `No task with id: ${taskID}`})

//     } else {
      
//       res.status(200).json({ task })
//     }

//   } catch (error) {
//     res.status(500).json({msg: error})
//   }
// }


module.exports = {
  getAllTasks, 
  createTask, 
  getTask, 
  updateTask, 
  deleteTask
};
