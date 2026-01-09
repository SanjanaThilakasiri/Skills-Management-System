const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sms_db"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed ");
  } else {
    console.log("Database connected successfully ");
  }
});

module.exports = db;
