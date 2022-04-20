const express = require('express');
const router = express.Router();
const {
  getAllTasks, 
  createTask, 
  getTask, 
  updateTask, 
  deleteTask
} = require('../controllers/tasksController')

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
// router.put('/:id', editTask)

module.exports = router;
