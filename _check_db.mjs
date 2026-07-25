import mysql from "mysql2/promise";
try {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "pedilo_ya_db",
    connectTimeout: 5000,
  });
  const [rows] = await conn.query("DESCRIBE stores");
  console.log(JSON.stringify(rows, null, 2));
  await conn.end();
} catch (e) {
  console.error("ERR:", e.message);
}
