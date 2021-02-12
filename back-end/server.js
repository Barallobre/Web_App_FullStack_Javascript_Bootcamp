"use strict";

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
const fs = require("fs");

const { SERVER_PORT } = process.env;
const accessLogStream = fs.createWriteStream("./logs.txt", { flags: "a" });
const validateAuth = require("./middlewares/validate-auth");
const {
  usersController,
  espaciosController,
  reservasController,
  incidenciasController,
} = require("./controllers");

const app = express();
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("combined", { immediate: true, stream: accessLogStream }));
app.use(express.static("public"));
app.use("/files/espacios", express.static("images"));
app.use(cors());

// Configuración de las rutas

//registro
app.post("/register", usersController.register);
//login
app.post("/login", usersController.login);
//admin que ve los espacios existentes
app.get("/admin", validateAuth, espaciosController.getEspacios);
//admin que añade un nuevo espacio
app.post("/admin/nuevo", validateAuth, espaciosController.addEspacio);
//admin que modifica un espacio existente
app.put(
  "/admin/:IdEspacio/update",
  validateAuth,
  espaciosController.updateEspacio
);
//admin que borra un espacio existente
app.delete("/admin/:IdEspacio", validateAuth, espaciosController.deleteEspacio);
//admin que ve las incidencias de un espacio concreto --
app.get(
  "/admin/:IdEspacio/incidencias",
  validateAuth,
  incidenciasController.getIncidencias
);
//admin que borra una incidencia de un espacio
app.delete(
  "/incidencias/:IdIncidencia",
  validateAuth,
  incidenciasController.deleteIncidencia
);
//usuario que ve las reservas que ha hecho
app.get("/user/:IdUser", validateAuth, reservasController.getReservas);
//usuario que actualiza su perfil
app.put("/user/perfil/:IdUser", validateAuth, usersController.updateUser);
//información del usuario
app.get("/user/perfil/:IdUser", validateAuth, usersController.getUser);
//usuario que da de alta una incidencia en un espacio
app.post(
  "/incidencias/:IdEspacio",
  validateAuth,
  incidenciasController.addIncidencia
);
//usuario busca espacios según los criterios del formulario del index
app.post("/busqueda", reservasController.getBusqueda);
//usuario confirma la reserva al pagar
app.post(
  "/busqueda/:IdEspacio/reservar",
  validateAuth,
  reservasController.addReserva
);
//usuario cancela una reserva
app.delete(
  "/user/cancelar/:IdReserva",
  validateAuth,
  reservasController.deleteReserva
);
//busqueda de materiales de un espacio
app.get("/equipamiento/:IdEspacio", reservasController.getBusquedaEquipamiento);
//middleware para las rutas que no existen
// app.use(function (req, res) {
//   res.status(404).send("404 - Not found.");
// });

app.listen(SERVER_PORT, () => console.log(`Escuchando ${SERVER_PORT}`));
