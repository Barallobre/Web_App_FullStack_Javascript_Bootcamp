'use strict';
const database = require('../infrastructure/database');

async function getBusqueda(localidad,tipoEspacio,FechaInicio,FechaFin) {
    console.log(localidad,tipoEspacio,FechaInicio,FechaFin)
    const pool = await database.getPool(); 
    const query = 'SELECT IdEspacio,Nombre,Localidad,CosteDiario FROM Espacio WHERE Localidad = ?  AND idTipoEspacio = ?  and (FechaInicioDisponibilidad <= ? and FechaFinDisponibilidad >= ?)';
    const [espacios] = await pool.query(query,[localidad,tipoEspacio,FechaInicio,FechaFin]);
    console.log(espacios)
    return espacios;
}
async function createReserva(IdEspacio,IdUser,fechaInicio,fechaFin,pagado) {
    console.log(IdEspacio,IdUser,fechaInicio,fechaFin,pagado)
    const pool = await database.getPool(); 
    const query = 'INSERT INTO Reserva(idEspacio,idUsuario,FechaInicio,FechaFin,Pagado) VALUES (?,?,?,?,?)';
    const [reserva] = await pool.query(query,[IdEspacio,IdUser,fechaInicio,fechaFin,pagado]);
    return reserva[0];
}
async function getReservaById(id){
    const pool = await database.getPool(); 
    const query = 'select * from Reserva WHERE IdReserva = ? ';
    const [reservas] = await pool.query(query, id);
    return reservas[0];
  }
async function deleteReserva(id){
    const pool = await database.getPool(); 
    const query = 'delete from Reserva WHERE IdReserva = ? ';
    const [reservas] = await pool.query(query, id);
    return reservas[0];
  }
async function getReservas(id){
    const pool = await database.getPool(); 
    const query = 'select Espacio.IdEspacio,Reserva.IdReserva,Espacio.Nombre, DATE_FORMAT(Reserva.FechaInicio, "%d/%m/%Y") as "Fecha Inicio",DATE_FORMAT(Reserva.FechaFin, "%d/%m/%Y") as "Fecha Fin" from Reserva inner join Espacio on Reserva.idEspacio = Espacio.IdEspacio where Reserva.idUsuario = ? ';
    const [reservas] = await pool.query(query, id);
    return reservas;
  }
async function getIdUserReserva(id){
    const pool = await database.getPool(); 
    const query = 'select idUsuario from Reserva WHERE IdReserva = ? ';
    const [IdUsuario] = await pool.query(query, id);
    const Id = ((Object.values(IdUsuario[0]))[0]);
    return Id;
  }
  
module.exports={
    getBusqueda,
    createReserva,
    getReservaById,
    deleteReserva,
    getReservas,
    getIdUserReserva,
}