"use strict";

const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const sengrid = require("@sendgrid/mail");
const sharp = require("sharp");
const fs = require("fs").promises;
let Jimp = require("jimp");

const { espaciosRepository } = require("../repositories");

async function agregarEquipo(IdEspacio, IdTipoEquipamiento, Cantidad) {
  console.log("hola");
  await espaciosRepository.insertEquipamiento(
    IdEspacio,
    IdTipoEquipamiento,
    Cantidad
  );
}
async function eliminarEquipo(IdEspacio, IdTipoEquipamiento) {
  await espaciosRepository.deleteEquipamiento(IdEspacio, IdTipoEquipamiento);
}

//---------------------------Función para listar los espacios existentes------------------------------
async function getEspacios(req, res) {
  try {
    if (req.auth.admin === true) {
      throw new Error("No eres admin");
    }
    console.log(req.auth);
    const espacios = await espaciosRepository.listEspacios();

    return res.send(espacios);
  } catch (err) {
    if (err.nombre === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err });
  }
}
//---------------------------Función para buscar un espacio por Id-------------------------------
async function getEspacioById(req, res) {
  try {
    console.log(req.auth);
    if (req.auth.admin === true) {
      throw new Error("No eres admin");
    }
    const IdEspacio = req.params.IdEspacio;
    const schema = Joi.number().positive();
    await schema.validateAsync(IdEspacio);

    const espacios = await espaciosRepository.getEspacioById(IdEspacio);
    res.send(espacios);
  } catch (err) {
    if (err.nombre === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err });
  }
}
//-----------------------------Función para borrar un espacio---------------------------------
async function deleteEspacio(req, res) {
  try {
    if (req.auth.admin === 0) {
      throw new Error("No eres admin");
    }
    const IdEspacio = req.params.IdEspacio;
    const schema = Joi.number().positive().required();
    await schema.validateAsync(IdEspacio);

    const espacios = await espaciosRepository.getEspacioById(IdEspacio);
    if (!espacios) {
      throw new Error("Este espacio no existe.");
    }
    await espaciosRepository.deleteEquipamientoEspacio(IdEspacio);
    await espaciosRepository.deleteIncidenciaEspacio(IdEspacio);
    await espaciosRepository.deleteReservaEspacio(IdEspacio);
    await espaciosRepository.deleteEspacio(IdEspacio);

    res.send({ message: "Espacio borrado" });
  } catch (err) {
    if (err.nombre === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err });
  }
}
//------------------Función para añadir un espacio nuevo por parte del admin-----------------------

async function addEspacio(req, res) {
  try {
    if (req.auth.admin === 0) {
      throw new Error("No eres admin");
    }

    const {
      nombre,
      localidad,
      tipoEspacio,
      fechaInicioDisp,
      fechaFinDisp,
      costeDia,
    } = req.body;

    const schema = Joi.object({
      nombre: Joi.string().required(),
      localidad: Joi.string().required(),
      tipoEspacio: Joi.string().required(),
      fechaInicioDisp: Joi.date().required(),
      fechaFinDisp: Joi.date().required(),
      costeDia: Joi.string().required(),
    });

    await schema.validateAsync({
      nombre,
      localidad,
      tipoEspacio,
      fechaInicioDisp,
      fechaFinDisp,
      costeDia,
    });
    let imagen;
    let picture = undefined;
    let nombreImagen = nombre.replace(/ /g, "");
    let myImage;
    if (req.files !== null && req.files.picture) {
      imagen = req.files.picture;

      let myImage = "fotoEspacio" + nombreImagen;

      try {
        const i = await Jimp.read(imagen.data);
        i.resize(300, 200);
        await i.write(__dirname + "/../files/espacios/" + myImage + ".png");
      } catch {
        const error = new Error("Error procesando imagen. ");
        error.code = 401;
        throw error;
      }
      picture = myImage + ".png";
    }

    await espaciosRepository.addEspacio(
      nombre,
      localidad,
      tipoEspacio,
      fechaInicioDisp,
      fechaFinDisp,
      costeDia,
      picture
    );

    //buscamos el Id del espacio nuevo para insertar en él el equipamiento que se encuentra registrado en otra tabla
    const IdEspacio = await espaciosRepository.buscarIdEspacio(
      nombre,
      tipoEspacio
    );
    console.log(IdEspacio);
    const espacio = await espaciosRepository.getEspacioById(IdEspacio);
    if (!espacio) {
      throw new Error("Ese espacio no existe");
    }
    const { Sillas, Mesas, Proyector, Pantalla, Monitores } = req.body;
    //recorremos cada tipo de equipamiento y guardamos la cantidad que se nos indica en el formulario
    let Cantidad;

    const equipamiento = [Sillas, Mesas, Proyector, Pantalla, Monitores];
    const equipamiento_2 = [
      "Sillas",
      "Mesas",
      "Proyector",
      "Pantalla",
      "Monitores",
    ];
    for (let i = 0; i < equipamiento.length; i++) {
      console.log("entra");
      console.log(equipamiento[i]);
      if (equipamiento[i] !== undefined) {
        const IdTipoEquipamiento = await espaciosRepository.buscarTipoEquipamiento(
          equipamiento_2[i]
        );
        Cantidad = req.body[equipamiento_2[i]];
        console.log(req.body[equipamiento_2[i]]);
        agregarEquipo(IdEspacio, IdTipoEquipamiento, Cantidad);
      }
    }
    res.send(espacio);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}
//------------------Función para actualizar datos de un espacio por parte del admin-----------------------
async function updateEspacio(req, res) {
  try {
    if (req.auth.admin === 0) {
      throw new Error("No eres admin");
    }
    const { IdEspacio } = req.params;

    let {
      nombre,
      localidad,
      tipoEspacio,
      fechaInicioDisp,
      fechaFinDisp,
      costeDia,
    } = req.body;

    const schema = Joi.object({
      IdEspacio: Joi.number().positive().required(),
      nombre: Joi.string(),
      localidad: Joi.string(),
      tipoEspacio: Joi.string(),
      fechaInicioDisp: Joi.date(),
      fechaFinDisp: Joi.date(),
      costeDia: Joi.string(),
    });
    await schema.validateAsync({
      IdEspacio,
      nombre,
      localidad,
      tipoEspacio,
      fechaInicioDisp,
      fechaFinDisp,
      costeDia,
    });

    const espacio = await espaciosRepository.getEspacioById(IdEspacio);
    if (!espacio) {
      throw new Error("Ese espacio no existe");
    }
    let nombreImagen;

    if (nombre === undefined) {
      nombre = espacio.Nombre;
      nombreImagen = nombre.replace(/ /g, "");
    } else {
      nombreImagen = nombre.replace(/ /g, "");
    }
    let myImage;
    if (req.files !== null && req.files.picture) {
      let imagen = req.files.picture;

      myImage = "fotoEspacio" + nombreImagen;

      try {
        const i = await Jimp.read(imagen.data);
        i.resize(300, 200);
        await i.write(__dirname + "/../files/espacios/" + myImage + ".png");
      } catch {
        const error = new Error("Error procesando imagen. ");
        error.code = 401;
        throw error;
      }
    }
    let picture = myImage + ".png";

    await espaciosRepository.updateEspacio(
      nombre,
      localidad,
      tipoEspacio,
      fechaInicioDisp,
      fechaFinDisp,
      costeDia,
      picture,
      IdEspacio
    );

    const espacioUpdated = await espaciosRepository.getEspacioById(IdEspacio);

    const { Sillas, Mesas, Proyector, Pantalla, Monitores } = req.body;
    let Cantidad;
    const equipamiento = [Sillas, Mesas, Proyector, Pantalla, Monitores];
    const equipamiento_2 = [
      "Sillas",
      "Mesas",
      "Proyector",
      "Pantalla",
      "Monitores",
    ];
    for (let i = 0; i < equipamiento.length; i++) {
      if (equipamiento[i] !== undefined) {
        const IdTipoEquipamiento = await espaciosRepository.buscarTipoEquipamiento(
          equipamiento_2[i]
        );

        Cantidad = req.body[equipamiento_2[i]];

        await espaciosRepository.updateEquipamiento(
          Cantidad,
          IdTipoEquipamiento,
          IdEspacio
        );
      }
    }

    res.send(espacioUpdated);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = {
  getEspacios,
  deleteEspacio,
  getEspacioById,
  addEspacio,
  updateEspacio,
};
