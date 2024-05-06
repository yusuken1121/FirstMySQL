import mysql from "mysql2"
import dotenv from 'dotenv';
dotenv.config();



const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  }).promise()


  async function getNotes(){
    const [rows] = await pool.query("SELECT * FROM notes");
    return rows;
  }

  async function getNote(id){
    const [rows] = await pool.query(`
        SELECT *
        FROM notes
        WHERE id = ?
    `, [id])
    return rows[0]
  }


  const note = await getNote(3);
  console.log(note);

async function createNote(title, contents){
    const [result] = await pool.query(`
        INSERT INTO notes (title, contents)
        VALUES (?, ?)
    `, [title, contents]);
    return result;
}

console.log(await createNote("My third note", "this is a test"));
