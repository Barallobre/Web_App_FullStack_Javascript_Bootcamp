'use strict';


const usersRepository = require('./users-repository');
const espaciosRepository = require('./espacios-repository');
const reservasRepository = require('./reservas-repository');
const incidenciasRepository = require('./incidencias-repository');

module.exports = {
 
  usersRepository,
  espaciosRepository,
  reservasRepository,
  incidenciasRepository
}