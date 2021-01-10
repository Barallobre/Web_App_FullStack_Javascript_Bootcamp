'use strict';

const database = require('../infrastructure/database');

async function createUser(email,password,admin){
  const pool = await database.getPool();
  const insertQuery = 'INSERT INTO users (email,password,admin) VALUES (?, ?, ?)';
  const [created] = await pool.query(insertQuery, [email,password,admin]);

  return created.insertId;
}
async function getUserByEmail(email){
  const pool = await database.getPool(); 
  const query = 'SELECT * FROM users WHERE email = ?';
  const [users] = await pool.query(query, email);

  return users[0];
}

async function getUserById(id){
  const pool = await database.getPool(); 
  const query = 'SELECT * FROM users WHERE id = ?';
  const [users] = await pool.query(query, id);

  return users[0];
}

async function updateUser(email,bio,newPassword,nombre,apellidos,picture,id){
  const pool = await database.getPool();  
  if(email !=="" && email !== null && email !== undefined){
    const updateQuery = 'UPDATE users SET email = ? WHERE id= ?';
    await pool.query(updateQuery, [email,id]);
  }
  if(newPassword !== "" && newPassword !== null && newPassword !== undefined){
    const updateQuery = 'UPDATE users SET password = ? WHERE id = ?';
    await pool.query(updateQuery, [newPassword,id]);
  }
  if(bio !== "" && bio !== null && bio !== undefined){
    const updateQuery = 'UPDATE users SET bio = ? WHERE id = ?';
    await pool.query(updateQuery, [bio,id]);
  }
  if(nombre !== "" && nombre !== null && nombre !== undefined){
    const updateQuery = 'UPDATE users SET name = ? WHERE id = ?';
    await pool.query(updateQuery, [nombre,id]);
  }
  if(apellidos !== "" && apellidos !== null && apellidos !== undefined){
    const updateQuery = 'UPDATE users SET lastName = ? WHERE id = ?';
    await pool.query(updateQuery, [apellidos,id]);
  }
  if(picture !== "" && picture !== null && picture !== undefined){
    const updateQuery = 'UPDATE users SET picture = ? WHERE id = ?';
    await pool.query(updateQuery, [picture,id]);
  }
  return true;
}



module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser
}