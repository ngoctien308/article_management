import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

export default mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// GET
// const [data, fields] = await db.query('SELECT * FROM users');

// INSERT
// const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
// const [result] = await db.query(sql, [name, email, password]);
// console.log('Insert thành công, ID mới là:', result.insertId);

// UPDATE
// const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
// const [result] = await db.query(sql, [name, email, id]);
// console.log('Số dòng bị ảnh hưởng:', result.affectedRows);
