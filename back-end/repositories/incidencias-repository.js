'use strict';
const database = require('../infrastructure/database');


async function createIncidencia(idTipoIncidencia, idEspacio, descripcion, fechaAlta){
    const pool = await database.getPool();
    const insertQuery = 'INSERT INTO Incidencia (idTipoIncidencia, idEspacio, Descripcion, FechaAlta) VALUES (?, ?, ?, ?)';
    const [created] = await pool.query(insertQuery, [
        idTipoIncidencia, idEspacio, descripcion, fechaAlta
    ]);
    return created.insertId;
  }
async function getTipoIncidenciaById(id){
    const pool = await database.getPool(); 
    const query = 'SELECT * FROM TipoIncidencia WHERE IdTipoIncidencia = ?';
    const [tipoIncidencia] = await pool.query(query, id);
    return tipoIncidencia[0];
  }
async function getIncidenciaById(id){
    const pool = await database.getPool(); 
    const query = 'SELECT * FROM Incidencia WHERE IdIncidencia = ?';
    const [tipoIncidencia] = await pool.query(query, id);
    return tipoIncidencia[0];
  }
async function deleteIncidencia(id){
    const pool = await database.getPool(); 
    const query = 'DELETE FROM Incidencia WHERE IdIncidencia = ?';
    const [Incidencia] = await pool.query(query, id);
    return Incidencia[0];
  }
async function getIncidencias(id){
    const pool = await database.getPool(); 
    const query = 'SELECT Incidencia.IdIncidencia, TipoIncidencia.NombreTipo, DATE_FORMAT(Incidencia.FechaAlta, "%d/%m/%Y") as "Fecha Alta", Incidencia.Descripcion from Incidencia join TipoIncidencia on Incidencia.idTipoIncidencia = TipoIncidencia.IdTipoIncidencia WHERE idEspacio = ? ';
    const [incidencia] = await pool.query(query,id);
    return incidencia;
  }

module.exports={
    createIncidencia,
    getTipoIncidenciaById,
    getIncidenciaById,
    deleteIncidencia,
    getIncidencias
}