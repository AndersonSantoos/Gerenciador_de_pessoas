const mysql = require("mysql2");

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "12345",
    database: "cadastros",
};

const db = mysql.createConnection(dbConfig).promise();


module.exports = db;