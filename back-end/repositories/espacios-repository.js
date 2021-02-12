"use strict";

const database = require("../infrastructure/database");

async function listEspacios() {
  const pool = await database.getPool();
  const query =
    'select Espacio.IdEspacio,Espacio.Nombre, TipoEspacio.NombreTipo "TipoEspacio" from Espacio join TipoEspacio on Espacio.idTipoEspacio = TipoEspacio.IdTipoEspacio';
  const [espacios] = await pool.query(query);
  return espacios;
}
async function getEspacioById(id) {
  const pool = await database.getPool();
  const query = "SELECT * FROM Espacio WHERE IdEspacio = ?";
  const [espacio] = await pool.query(query, id);
  return espacio[0];
}
async function deleteEquipamientoEspacio(id) {
  const pool = await database.getPool();
  const query = "DELETE FROM EquipamientoEspacio WHERE IdEspacio = ?";
  await pool.query(query, id);
}
async function deleteReservaEspacio(id) {
  const pool = await database.getPool();
  const query = "DELETE FROM Reserva WHERE IdEspacio = ?";
  await pool.query(query, id);
}
async function deleteIncidenciaEspacio(id) {
  const pool = await database.getPool();
  const query = "DELETE FROM Incidencia WHERE IdEspacio = ?";
  await pool.query(query, id);
}
async function deleteEspacio(id) {
  const pool = await database.getPool();
  const query = "DELETE FROM Espacio WHERE IdEspacio = ?";
  const [espacio] = await pool.query(query, id);
  return espacio[0];
}
async function addEspacio(
  nombre,
  localidad,
  idTipoEspacio,
  fechaInicioDisp,
  fechaFinDisp,
  costeDia,
  picture
) {
  const pool = await database.getPool();
  const query =
    "INSERT INTO Espacio (Nombre,Localidad, idTipoEspacio,FechaInicioDisponibilidad,FechaFinDisponibilidad,CosteDiario,Foto) VALUES ( ? , ? , ? , ? , ? , ? , ?)";
  await pool.query(query, [
    nombre,
    localidad,
    idTipoEspacio,
    fechaInicioDisp,
    fechaFinDisp,
    costeDia,
    picture,
  ]);
  return true;
}
async function buscarIdEspacio(nombre, idTipoEspacio) {
  const pool = await database.getPool();
  const query =
    "SELECT IdEspacio FROM Espacio WHERE Nombre = ? and idTipoEspacio = ?";
  const [IdEspacio] = await pool.query(query, [nombre, idTipoEspacio]);
  const Id = Object.values(IdEspacio[0])[0];
  return Id;
}
async function updateEspacio(
  nombre,
  localidad,
  tipoEspacio,
  fechaInicioDisp,
  fechaFinDisp,
  costeDia,
  picture,
  id
) {
  const pool = await database.getPool();
  if (nombre !== "" && nombre !== null && nombre !== undefined) {
    const updateQuery = "UPDATE Espacio SET Nombre = ? WHERE IdEspacio= ?";
    await pool.query(updateQuery, [nombre, id]);
  }
  if (localidad !== "" && localidad !== null && localidad !== undefined) {
    const updateQuery = "UPDATE Espacio SET Localidad = ? WHERE IdEspacio = ?";
    await pool.query(updateQuery, [localidad, id]);
  }
  if (tipoEspacio !== "" && tipoEspacio !== null && tipoEspacio !== undefined) {
    const updateQuery =
      "UPDATE Espacio SET idTipoEspacio = ? WHERE IdEspacio = ?";
    await pool.query(updateQuery, [tipoEspacio, id]);
  }
  if (
    fechaInicioDisp !== "" &&
    fechaInicioDisp !== null &&
    fechaInicioDisp !== undefined
  ) {
    const updateQuery =
      "UPDATE Espacio SET FechaInicioDisponibilidad = ? WHERE IdEspacio = ?";
    await pool.query(updateQuery, [fechaInicioDisp, id]);
  }
  if (
    fechaFinDisp !== "" &&
    fechaFinDisp !== null &&
    fechaFinDisp !== undefined
  ) {
    const updateQuery =
      "UPDATE Espacio SET FechaFinDisponibilidad = ? WHERE IdEspacio = ?";
    await pool.query(updateQuery, [fechaFinDisp, id]);
  }
  if (costeDia !== "" && costeDia !== null && costeDia !== undefined) {
    const updateQuery =
      "UPDATE Espacio SET CosteDiario = ? WHERE IdEspacio = ?";
    await pool.query(updateQuery, [costeDia, id]);
  }
  if (picture !== "" && picture !== null && picture !== undefined) {
    console.log(picture);
    const updateQuery = "UPDATE Espacio SET Foto = ? WHERE IdEspacio = ?";
    await pool.query(updateQuery, [picture, id]);
  }
  return true;
}
async function buscarTipoEquipamiento(equipamiento) {
  const pool = await database.getPool();
  const query =
    "SELECT IdTipoEquipamiento FROM TipoEquipamiento WHERE TipoEquipamiento = ?";
  const [IdTipoEquipamiento] = await pool.query(query, equipamiento);
  const Id = Object.values(IdTipoEquipamiento[0])[0];
  return Id;
}
async function updateEquipamiento(Cantidad, IdTipoEquipamiento, id) {
  const pool = await database.getPool();
  const updateQuery =
    "UPDATE EquipamientoEspacio SET Cantidad = ? WHERE IdTipoEquipamiento = ? and IdEspacio= ?";
  await pool.query(updateQuery, [Cantidad, IdTipoEquipamiento, id]);
  return true;
}
async function insertEquipamiento(id, IdTipoEquipamiento, Cantidad) {
  console.log(id, IdTipoEquipamiento, Cantidad);
  console.log("paso por aqui");
  const pool = await database.getPool();
  const insertQuery = "INSERT INTO EquipamientoEspacio VALUES (?, ?, ?)";
  await pool.query(insertQuery, [id, IdTipoEquipamiento, Cantidad]);
  return true;
}
async function deleteEquipamiento(IdEspacio, IdTipoEquipamiento) {
  console.log("estoy borrando");
  console.log(IdEspacio, IdTipoEquipamiento);
  const pool = await database.getPool();
  const deleteQuery =
    "DELETE FROM EquipamientoEspacio WHERE IdEspacio = ? and IdTipoEquipamiento = ?";
  await pool.query(deleteQuery, [IdEspacio, IdTipoEquipamiento]);
  return true;
}

module.exports = {
  listEspacios,
  deleteEspacio,
  getEspacioById,
  updateEspacio,
  updateEquipamiento,
  buscarTipoEquipamiento,
  insertEquipamiento,
  deleteEquipamiento,
  addEspacio,
  buscarIdEspacio,
  deleteEquipamientoEspacio,
  deleteIncidenciaEspacio,
  deleteReservaEspacio,
};
