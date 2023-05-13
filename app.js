const express = require("express")
const app = express()
const tasksRoutes = require("./routes/tasksRoutes")
const connectDB = require("./db/connect")
const notFound = require("./middleware/notFound")
const errorHandlerMiddleware = require("./middleware/errorHandler")

// dotenv config
require("dotenv").config()

// middleware
app.use(express.json())
app.use(express.static("./public"))

// routes
app.use("/api/v1/tasks", tasksRoutes)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

// Database connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log("DB connection successful")
    app.listen(port, () => {
      console.log(`Server is now listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
