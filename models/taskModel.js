const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim:"true",
    maxlength: [50, 'name can not be more than 50 characters']

  }, 
  completed: {
    type: Boolean,
    default: false
  }
})


// mongoose looks for the plural       lowercased of this model name i.e tasks
module.exports = mongoose.model('Task', TaskSchema)