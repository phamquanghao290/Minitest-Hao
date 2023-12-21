const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todos",
});

function getTodos() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM list", (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            resolve(results);
        });
    });
}

function addTodos(nameTodo) {
    console.log(nameTodo)
    return new Promise((resolve, reject) => {
        var sql = `INSERT INTO list (nameTodo, status) VALUES ('${nameTodo}', 'unfinished')`;
        connection.query(sql, function (err, result) {
            if (err) {
                return console.log(err);
            };
            console.log("Them thanh cong");
        });
    });
}

function deleteTodos(id) {
    return new Promise((resolve, reject) => {
        var sql = `DELETE FROM list WHERE id = ${id}`;
        connection.query(sql, function (err, results) {
            if (err) throw err;
            console.log("Xoa thanh cong");
        });
    });
}

function editTodos(id, nameTodo, status) {
    return new Promise((resolve, reject) => {
        var sql = `UPDATE list SET nameTodo = '${nameTodo}', WHERE id = ${id}`;
        connection.query(sql, function (err, results) {
            if (err) throw err;
            console.log("Sua thanh cong");
        });
        if (status === "completed") {
            var sql = `UPDATE list SET status = 'unfinished' WHERE id = ${id}`;
            connection.query(sql, function (err, results) {
                if (err) throw err;
                console.log("Sua thanh cong");
            });
        } else {
            var sql = `UPDATE list SET status = 'completed' WHERE id = ${id}`;
            connection.query(sql, function (err, results) {
                if (err) throw err;
                console.log("Sua thanh cong");
            });
        }
    })
}

module.exports = { getTodos, addTodos, deleteTodos, editTodos };
