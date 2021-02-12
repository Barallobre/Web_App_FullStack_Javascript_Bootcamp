"use strict";

const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const sengrid = require("@sendgrid/mail");
const Jimp = require("jimp");

const fs = require("fs").promises;
const { usersRepository } = require("../repositories");

//--------------------Función para registrarse -------------------------------
async function register(req, res) {
  try {
    const registerSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(20).required(),
      repeatPassword: Joi.ref("password"),
    });

    await registerSchema.validateAsync(req.body);

    const { email, password } = req.body;

    const user = await usersRepository.getUserByEmail(email);

    if (user) {
      const error = new Error("Ya existe un usuario con ese email");
      error.code = 409;
      throw error;
    }
    //le mandamos un email que ha usado el usuario al registrarse
    const passwordHash = await bcrypt.hash(password, 10);
    const administrador = false;
    const id = await usersRepository.createUser(
      email,
      passwordHash,
      administrador
    );
    //una vez registrado, mandamos un correo de confirmación
    /* sengrid.setApiKey(process.env.SENDGRID_KEY);
    const data = {
      from: process.env.SENDGRID_MAIL_FROM,
      to: email,
      subject: "Bienvenido.",
      text: `<h1>Bienvenido.</h1>\nTe has registrado correctamente en nuestra web de gestión de coworking.`,
      html: `<h1>Bienvenido.</h1>\nTe has registrado correctamente en nuestra web de gestión de coworking.`,
    };
    await sengrid.send(data);*/

    return res.send({ registro: "éxito", IdNuevoUser: id });
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err });
  }
}

//------------------------Función para logearse-----------------------------------
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(20).required(),
    });
    await schema.validateAsync({ email, password });

    //Recuperamos el usuario desde la base de datos.
    const user = await usersRepository.getUserByEmail(email);
    if (!user) {
      const error = new Error("No existe el usuario con ese email");
      error.code = 404;
      throw error;
    }
    //Comprobamos que el password que nos están enviando es válido.
    const isValidPassword = await bcrypt.compare(password, user.Password);

    if (!isValidPassword) {
      const error = new Error("El password no es válido");
      error.code = 401;
      throw error;
    }
    //generar el jwt
    const tokenPayload = {
      id: user.IdUsuario,
      email: user.Email,
      admin: user.Administrador,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.send({ token });
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}
//---------------Recoger datos usuario----------------------------------------
async function getUser(req, res) {
  try {
    const { IdUser } = req.params;
    if (+IdUser !== +req.auth.id) {
      throw new Error(`Forbidden.403`);
    }
    console.log(IdUser);
    const schema = Joi.object({
      IdUser: Joi.number().positive().required(),
    });
    await schema.validateAsync({ IdUser });
    const user = await usersRepository.getUserById(IdUser);
    if (!user) {
      throw new Error("Este usuario no existe.");
    }
    const usuario = await usersRepository.getUserInfo(IdUser);

    return res.send(usuario);
  } catch (err) {
    if (err.nombre === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err });
  }
}
//---------------Actualización de la información del usuario------------------
async function updateUser(req, res) {
  try {
    const { IdUser } = req.params;

    const {
      password,
      email,
      newPassword,
      repeatNewPassword,
      bio,
      name,
      lastName,
    } = req.body;
    console.log(newPassword);
    console.log(repeatNewPassword);
    console.log(password);
    const schema = Joi.object({
      IdUser: Joi.number().positive().required(),
      email: Joi.string(),
      password: Joi.string().required(),
      newPassword: Joi.string(),
      repeatNewPassword: Joi.ref("newPassword"),
      bio: Joi.string(),
      name: Joi.string(),
      lastName: Joi.string(),
    });
    await schema.validateAsync({
      password,
      email,
      newPassword,
      repeatNewPassword,
      bio,
      name,
      lastName,
      IdUser,
    });

    const user = await usersRepository.getUserById(IdUser);

    if (!user) {
      res.status(404);
      return res.send({ error: "Usuario no encontrado" });
    }
    console.log(user);
    //Comprobamos que el password que nos están enviando es válido.
    const isValidPassword = await bcrypt.compare(password, user.Password);

    if (!isValidPassword) {
      const error = new Error("El password no es válido");
      error.code = 401;
      throw error;
    }

    let myImage = "fotoPerfilIdUser" + IdUser;
    if (req.files && req.files.picture) {
      let imagen = req.files.picture;

      try {
        const i = await Jimp.read(imagen.data);
        i.resize(125, 150);
        await i.write(__dirname + "/../files/users/" + myImage + ".png");
      } catch {
        const error = new Error("Error procesando imagen. ");
        error.code = 401;
        throw error;
      }
    }

    let picture = myImage + ".png";

    let passwordHash = undefined;
    if (
      newPassword !== undefined &&
      newPassword !== " " &&
      newPassword !== null
    ) {
      passwordHash = await bcrypt.hash(newPassword, 10);
    }
    await usersRepository.updateUser(
      email,
      bio,
      passwordHash,
      name,
      lastName,
      picture,
      IdUser
    );

    const userUpdated = await usersRepository.getUserById(IdUser);

    res.send(userUpdated);
  } catch (err) {
    if (err.name === "ValidationError") {
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

//----------------Exportación de funciones al index---------------------------
module.exports = {
  register,
  login,
  updateUser,
  getUser,
};
