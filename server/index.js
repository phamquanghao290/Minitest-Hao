const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const dataTodo = require('./mysql')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// tạo router
app.get('/api/todos', async(req,res) => {
    let result = await dataTodo.getTodos()
    res.send(result)
})

app.post('/api/todos', async(req,res) => {
    const {nameTodo} = req.body
    dataTodo.addTodos(nameTodo)
    let result = await dataTodo.getTodos()
    res.send(result)
})

app.put('/api/todos/:id', async(req,res) => {
    const { id } = req.params
    const { nameTodo, status } = req.body
    dataTodo.editTodos(id, nameTodo, status)
    let result = await dataTodo.getTodos()
    res.send(result)
})

app.delete('/api/todos/:id', async(req,res) => {
    const { id } = req.params
    dataTodo.deleteTodos(id)
    let result = await dataTodo.getTodos()
    res.send(result)
})

// thêm todo
// app.post('/api/todos', (req, res) => {
//     dataTodo.addTodo(req.body)
//     res.status(201).json({
//         message: "Them thanh cong",
//         todo: req.body
//     })
// })

// sửa todo
// app.put('/api/todos/:id', (req, res) => {
//     const index = data.todos.findIndex(item => item.id === parseInt(req.params.id))
//     data.todos[index] = req.body
//     fs.writeFileSync('db.json', JSON.stringify(data))
//     res.status(200).json({
//         message: "Sửa thanh cong",
//         todo: data.todos
//     })
// })

// xóa todo
// app.delete('/api/todos/:id', (req, res) => {
//     data.todos = data.todos.filter(item => item.id !== parseInt(req.params.id))
//     fs.writeFileSync('db.json', JSON.stringify(data))
//     res.status(200).json({
//         message: "Xóa thanh cong",
//         todo: data.todos
//     })
// })

//xóa hết
// app.delete("/api/todos/", (req, res) => {
//     data.todos = [];
//     fs.writeFileSync("db.json", JSON.stringify(data));
//     res.status(201).json(data.todos);
// });

//complete
// app.patch("/api/todos/:id", (req, res) => {
//     const { id } = req.params;
//     const index = data.todos.findIndex((item) => item.id == id);
//     data.todos[index].completed = !data.todos[index].completed;
//     fs.writeFileSync("db.json", JSON.stringify(data));
//     res.status(201).json(data.todoList);
// })

app.listen(port, () => {
    console.log(`Lương tháng này của em là ${port} đồng`)
})