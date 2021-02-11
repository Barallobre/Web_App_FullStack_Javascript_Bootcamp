"use strict";
const Joi = require("joi");
const sengrid = require("@sendgrid/mail");
const {
  reservasRepository,
  espaciosRepository,
  usersRepository,
} = require("../repositories");
//------------------------Función para añadir una reserva nueva por parte del usuario--------------------
async function addReserva(req, res) {
  try {
    const IdEspacio = req.params.IdEspacio;
    const IdUser = req.auth.id;

    const { fechaInicio, fechaFin } = req.body;

    const schema = Joi.object({
      IdUser: Joi.number().positive(),
      IdEspacio: Joi.number().required(),
      fechaInicio: Joi.date(),
      fechaFin: Joi.date(),
    });

    await schema.validateAsync({ IdEspacio, IdUser, fechaInicio, fechaFin });

    const espacio = await espaciosRepository.getEspacioById(IdEspacio);
    if (!espacio) {
      throw new Error("Ese espacio no existe");
    }
    const Pagado = true;
    await reservasRepository.createReserva(
      IdEspacio,
      IdUser,
      fechaInicio,
      fechaFin,
      Pagado
    );
    //una vez registrado, mandamos un correo de confirmación
    sengrid.setApiKey(process.env.SENDGRID_KEY);
    const data = {
      from: process.env.SENDGRID_MAIL_FROM,
      to: req.auth.email,
      subject: "Reserva hecha.",
      text: `Felicidades.\nHas reservado con éxito en uno de nuestros espacios de coworking entre el ${fechaInicio} y el ${fechaFin}.`,
      html: `<h1>Felicidades.</h1>\nHas reservado con éxito en uno de nuestros espacios de coworking entre el ${fechaInicio} y el ${fechaFin}.`,
    };
    await sengrid.send(data);

    return res.send({
      IdEspacio,
      IdUser,
      fechaInicio,
      fechaFin,
    });
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

//-----------------------Búsqueda de espacios a partir del formulario del index--------------------
async function getBusqueda(req, res) {
  const { localidad, tipoEspacio, fechaInicio, fechaFin } = req.body;

  const schema = Joi.object({
    localidad: Joi.string().required(),
    tipoEspacio: Joi.string().required(),
    fechaInicio: Joi.date().required(),
    fechaFin: Joi.date().required(),
  });

  await schema.validateAsync({ localidad, tipoEspacio, fechaInicio, fechaFin });

  const busqueda = await reservasRepository.getBusqueda(
    localidad,
    tipoEspacio,
    fechaInicio,
    fechaFin
  );

  res.send(busqueda);
}
//-----------------------Búsqueda de equipamiento de los espacios a partir del resultado de la búsqueda--------------------
async function getBusquedaEquipamiento(req, res) {
  const IdEspacio = req.params.IdEspacio;
  console.log(IdEspacio);
  const schema = Joi.object({
    IdEspacio: Joi.string().required(),
  });

  await schema.validateAsync({ IdEspacio });

  const busqueda = await reservasRepository.getEquipamiento(IdEspacio);

  res.send(busqueda);
}
//--------------------------Listado de las reservas hechas por un usuario--------------------
async function getReservas(req, res) {
  try {
    const { IdUser } = req.params;
    //comprobación de si el usuario validado es el mismo que ha hecho la reserva
    console.log(req.auth.id, req.params);
    if (+IdUser !== +req.auth.id) {
      throw new Error(`Forbidden.403`);
    }

    const schema = Joi.object({
      IdUser: Joi.number().positive().required(),
    });
    await schema.validateAsync({ IdUser });

    const user = await usersRepository.getUserById(IdUser);
    if (!user) {
      throw new Error("Este usuario no existe.");
    }

    const reservas = await reservasRepository.getReservas(IdUser);

    return res.send(reservas);
  } catch (err) {
    if (err.nombre === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err });
  }
}
//----------------------Cancelación de reserva por parte de un usuario----------------
async function deleteReserva(req, res) {
  try {
    const IdReserva = req.params.IdReserva;
    const IdUserReserva = await reservasRepository.getIdUserReserva(IdReserva);
    //comprobación de si el usuario validado es el mismo que ha hecho la reserva
    if (+IdUserReserva !== +req.auth.id) {
      throw new Error(`Forbidden.403`);
    }
    const schema = Joi.number().positive().required();
    await schema.validateAsync(IdReserva);

    const review = await reservasRepository.getReservaById(IdReserva);
    if (!review) {
      throw new Error("Reserva no existe");
    }

    await reservasRepository.deleteReserva(IdReserva);

    res.send({ message: "Reserva borrada" });
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}
//---------------------Exportación de funciones al index---------------------------
module.exports = {
  addReserva,
  getBusqueda,
  getReservas,
  deleteReserva,
  getBusquedaEquipamiento,
};
