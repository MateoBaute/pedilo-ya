import mysql from "mysql2/promise";
const conn = await mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "pedilo_ya_db",
  connectTimeout: 5000,
});
await conn.query(
  "ALTER TABLE stores ADD COLUMN email VARCHAR(150) DEFAULT NULL, ADD COLUMN password_hash VARCHAR(255) DEFAULT NULL"
);
await conn.query("ALTER TABLE stores ADD UNIQUE KEY email (email)");
const [rows] = await conn.query("DESCRIBE stores");
console.log(JSON.stringify(rows, null, 2));
await conn.end();
