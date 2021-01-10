'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

const {
  SERVER_PORT,
} = process.env;

const validateAuth = require('./middlewares/validate-auth');
const {
  usersController,
  espaciosController,
  reservasController,
  incidenciasController,
 } = require('./controllers');
 
const app = express();
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());



// Configuración de las rutas

app.post('/register', usersController.register);//registro -- 
app.post('/login', usersController.login);//login -- 
app.get('/admin',validateAuth, espaciosController.getEspacios);//admin que ve los espacios existentes -- 
app.post('/admin/nuevo',validateAuth,espaciosController.addEspacio);//admin que añade un nuevo espacio

app.put('/admin/:IdEspacio/update',validateAuth,espaciosController.updateEspacio)//admin que modifica un espacio existente

app.get('/admin/:IdEspacio',validateAuth,espaciosController.getEspacioById);//buscar un espacio concreto por su ID
app.delete('/admin/:IdEspacio',validateAuth,espaciosController.deleteEspacio);//admin que borra un espacio existente
app.get('/admin/:IdEspacio/incidencias',validateAuth,incidenciasController.getIncidencias)//admin que ve las incidencias de un espacio concreto
app.delete('/incidencias/:IdIncidencia',validateAuth, incidenciasController.deleteIncidencia);//admin que borra una incidencia de un espacio
app.get('/user/:IdUser',validateAuth,reservasController.getReservas);//usuario que ve las reservas que ha hecho

app.put('/user/perfil/:IdUser',validateAuth,usersController.updateUser);//usuario que actualiza su perfil

app.post('/incidencias/:IdEspacio',validateAuth,incidenciasController.addIncidencia);//usuario que da de alta una incidencia en un espacio
app.post('/busqueda',validateAuth,reservasController.getBusqueda);
app.post('/busqueda/:IdEspacio',validateAuth,reservasController.addReserva);


//middleware para las rutas que no existen
app.use(function(req, res) {
  res.status(404).send('404 - Not found.');
});

app.listen(SERVER_PORT, () => console.log(`Escuchando ${SERVER_PORT}`));
