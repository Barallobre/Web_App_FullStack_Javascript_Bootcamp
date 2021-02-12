"use strict";

const database = require("../infrastructure/database");

async function createUser(email, password, admin) {
  const pool = await database.getPool();
  const insertQuery =
    "INSERT INTO Usuario (Email,Password,Administrador) VALUES (?, ?, ?)";
  const [created] = await pool.query(insertQuery, [email, password, admin]);
  return created.insertId;
}
async function getUserByEmail(email) {
  const pool = await database.getPool();
  const query = "SELECT * FROM Usuario WHERE Email = ?";
  const [users] = await pool.query(query, email);
  return users[0];
}
async function getUserById(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM Usuario WHERE IdUsuario = ?";
  const [users] = await pool.query(query, id);
  return users[0];
}
async function getUserInfo(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM Usuario WHERE IdUsuario = ?";
  const [users] = await pool.query(query, id);
  return users[0];
}
async function updateUser(
  email,
  bio,
  newPassword,
  nombre,
  apellidos,
  picture,
  id
) {
  console.log(newPassword);
  const pool = await database.getPool();
  if (email !== " " && email !== null && email !== undefined) {
    const updateQuery = "UPDATE Usuario SET Email = ? WHERE IdUsuario= ?";
    await pool.query(updateQuery, [email, id]);
  }
  if (
    newPassword !== " " &&
    newPassword !== null &&
    newPassword !== undefined
  ) {
    const updateQuery = "UPDATE Usuario SET Password = ? WHERE IdUsuario = ?";
    await pool.query(updateQuery, [newPassword, id]);
  }
  if (bio !== " " && bio !== null && bio !== undefined) {
    const updateQuery = "UPDATE Usuario SET Bio = ? WHERE IdUsuario = ?";
    await pool.query(updateQuery, [bio, id]);
  }
  if (nombre !== " " && nombre !== null && nombre !== undefined) {
    const updateQuery = "UPDATE Usuario SET Nombre = ? WHERE IdUsuario = ?";
    await pool.query(updateQuery, [nombre, id]);
  }
  if (apellidos !== " " && apellidos !== null && apellidos !== undefined) {
    const updateQuery = "UPDATE Usuario SET Apellidos = ? WHERE IdUsuario = ?";
    await pool.query(updateQuery, [apellidos, id]);
  }
  if (picture !== " " && picture !== null && picture !== undefined) {
    const updateQuery = "UPDATE Usuario SET Foto = ? WHERE IdUsuario = ?";
    await pool.query(updateQuery, [picture, id]);
  }
  return true;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateUser,
  getUserInfo,
};
