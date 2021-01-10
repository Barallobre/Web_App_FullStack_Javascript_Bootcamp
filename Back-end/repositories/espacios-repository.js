'use strict';

const database = require('../infrastructure/database');


async function listEspacios(){
  const pool = await database.getPool(); 
  const query = 'SELECT * FROM espacio';
  const [espacios] = await pool.query(query);

  return espacios;
}

async function getEspacioById(id){
  console.log(id);
  const pool = await database.getPool(); 
  const query = 'SELECT * FROM espacio WHERE IdEspacio = ?';
  const [espacio] = await pool.query(query, id);

  return espacio[0];
}

async function deleteEspacio(id){
  const pool = await database.getPool(); 
  const query = 'DELETE FROM espacio WHERE IdEspacio = ?';
  const [espacio] = await pool.query(query,id);

  return espacio[0];
}

async function addEspacio(){
  const pool = await database.getPool(); 
  const query = 'INSERT INTO espacio VALUES IdEspacio = ?';
  const [espacio] = await pool.query(query);

  return espacio[0];
}

async function updateEspacio(nombre,localidad,tipoEspacio,fechaInicioDisp,fechaFinDisp,costeDia,picture,id){
  const pool = await database.getPool();  
  if(nombre !=="" && nombre !== null && nombre !== undefined){
    const updateQuery = 'UPDATE espacio SET Nombre = ? WHERE IdEspacio= ?';
    await pool.query(updateQuery, [nombre,id]);
  }
  if(localidad !== "" && localidad !== null && localidad !== undefined){
    const updateQuery = 'UPDATE espacio SET Localidad = ? WHERE IdEspacio = ?';
    await pool.query(updateQuery, [localidad,id]);
  }
  if(tipoEspacio !== "" && tipoEspacio !== null && tipoEspacio !== undefined){
    const updateQuery = 'UPDATE espacio SET idTipoEspacio = ? WHERE IdEspacio = ?';
    await pool.query(updateQuery, [tipoEspacio,id]);
  }
  if(fechaInicioDisp !== "" && fechaInicioDisp !== null && fechaInicioDisp !== undefined){
    const updateQuery = 'UPDATE espacio SET FechaInicioDisponibilidad = ? WHERE IdEspacio = ?';
    await pool.query(updateQuery, [fechaInicioDisp,id]);
  }
  if(fechaFinDisp !== "" && fechaFinDisp !== null && fechaFinDisp !== undefined){
    const updateQuery = 'UPDATE espacio SET FechaFinDisponibilidad = ? WHERE IdEspacio = ?';
    await pool.query(updateQuery, [fechaFinDisp,id]);
  }
  if(costeDia !== "" && costeDia !== null && costeDia !== undefined){
    const updateQuery = 'UPDATE espacio SET CosteDiario = ? WHERE IdEspacio = ?';
    await pool.query(updateQuery, [costeDia,id]);
  }
  if(picture !== "" && picture !== null && picture !== undefined){
    const updateQuery = 'UPDATE espacio SET picture = ? WHERE IdEspacio = ?';
    await pool.query(updateQuery, [picture,id]);
  }
  return true;
}

async function buscarTipoEquipamiento(equipamiento){
  const pool = await database.getPool(); 
  const query = 'SELECT IdTipoEquipamiento FROM tipoEquipamiento WHERE TipoEquipamiento = ?';
  const [IdTipoEquipamiento] = await pool.query(query, equipamiento);
  const Id = ((Object.values(IdTipoEquipamiento[0]))[0]);
  return Id;
}

async function updateEquipamiento(Cantidad,IdTipoEquipamiento,id){
  const pool = await database.getPool();  
    const updateQuery = 'UPDATE equipamientoEspacio SET Cantidad = ? WHERE IdTipoEquipamiento = ? and IdEspacio= ?';
    await pool.query(updateQuery, [Cantidad,IdTipoEquipamiento,id]);
 
  return true;
}

async function getEquipamientoEspacioById(IdTipoEquipamiento,IdEspacio){
  console.log(IdTipoEquipamiento,IdEspacio)
  const pool = await database.getPool(); 
  const query = 'SELECT * FROM equipamientoEspacio WHERE IdTipoEquipamiento = ? and IdEspacio = ?';
  const [equipamientoEspacio] = await pool.query(query, IdTipoEquipamiento,IdEspacio);
  console.log("repository saber si hay guardado - "+equipamientoEspacio[0])
  return equipamientoEspacio[0];
}

module.exports = {
    listEspacios,
    deleteEspacio,
    getEspacioById,
    updateEspacio,
    updateEquipamiento,
    buscarTipoEquipamiento,
    getEquipamientoEspacioById,
  }