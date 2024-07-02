import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
});

con.connect(function (err) {
  if (err) {
    console.error("Connection error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

export default con;