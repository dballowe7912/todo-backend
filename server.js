import express from "express";
import bodyParser from "body-parser";
const app = express()
const PORT = 5555

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"))

//  the task array with initial placeholders for added task
const task = ['buy socks', 'practice nodejs']

//  the completed task array with initial placeholders for removed task
var complete = ["finish jquery"];


//  post route for adding new task
app.post('/addtask', (req, res) => {
  let newTask = req.body.newTask
//  add the new task from the post route into the array
  task.push(newTask)
//  after adding to the array go back to the root route
  res.redirect("/")
})

app.post('/removetask', (req, res) => {
    var completeTask = req.body.check

//  check for the "typeof" the different completed task, then add into the complete task
    if (typeof completeTask === "string") {
        complete.push(completeTask)
//  check if the completed task already exist in the task when checked, then remove using the array splice method
        task.splice(task.indexOf(completeTask), 1)
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
        complete.push(completeTask[i])
        task.splice(task.indexOf(completeTask[i]), 1)
        }
    }
    res.redirect("/")
})

//  render the ejs and display added task, task(index.ejs) = task(array)
app.get('/', (req, res) => {
    res.render('index', 
    { task: task, complete: false }
    )
})




app.listen(
    PORT, 
    console.log(`Server is running on port ${PORT}`)
)