const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Lấy data từ db.json
const rawData = fs.readFileSync("db.json")
const data = JSON.parse(rawData)

// tạo router
app.get('/api/todos', (req,res) => {
    res.status(200).json(data.todos)
})

// thêm todo
app.post('/api/todos', (req, res) => {
    data.todos.push(req.body)
    fs.writeFileSync('db.json', JSON.stringify(data))
    res.status(201).json({
        message: "Thêm thành công",
        todo: data.todos
    })
})

// sửa todo
app.put('/api/todos/:id', (req, res) => {
    const index = data.todos.findIndex(item => item.id === parseInt(req.params.id))
    data.todos[index] = req.body
    fs.writeFileSync('db.json', JSON.stringify(data))
    res.status(200).json({
        message: "Sửa thanh cong",
        todo: data.todos
    })
})

// xóa todo
app.delete('/api/todos/:id', (req, res) => {
    data.todos = data.todos.filter(item => item.id !== parseInt(req.params.id))
    fs.writeFileSync('db.json', JSON.stringify(data))
    res.status(200).json({
        message: "Xóa thanh cong",
        todo: data.todos
    })
})

//xóa hết
app.delete("/api/todos/", (req, res) => {
    data.todos = [];
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.status(201).json(data.todos);
});

//complete
app.patch("/api/todos/:id", (req, res) => {
    const { id } = req.params;
    const index = data.todos.findIndex((item) => item.id == id);
    data.todos[index].completed = !data.todos[index].completed;
    fs.writeFileSync("db.json", JSON.stringify(data));
    res.status(201).json(data.todoList);
})

app.listen(port, () => {
    console.log(`Lương tháng này của em là ${port} đồng`)
})