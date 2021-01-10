'use strict';

const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const sengrid = require('@sendgrid/mail');
const Jimp = require('jimp')


const fs = require('fs').promises;
const {
  usersRepository,
 
}= require('../repositories');


//--------------------Función para registrarse -------------------------------
async function register(req, res) {
  try{
    const registerSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).max(20).required(),
      repeatPassword: Joi.ref('password'),
    });

    await registerSchema.validateAsync(req.body);

    const { email, password } = req.body;
    
     const user = await usersRepository.getUserByEmail(email);

    if (user) {
      const error = new Error('Ya existe un usuario con ese email');
      error.code = 409;
      throw error;
    }
    
    const passwordHash = await bcrypt.hash(password, 10);
    const administrador = false;
    const id = await usersRepository.createUser(email, passwordHash, administrador);

    
    return res.send({ userId: id });
  }catch(err){
    if(err.name === 'ValidationError'){
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
    await schema.validateAsync(req.body);

    //Recuperamos el usuario desde la base de datos.
    const user = await usersRepository.getUserByEmail(email);
    if (!user) {
      const error = new Error('No existe el usuario con ese email');
      error.code = 404;
      throw error;
    }
    //Comprobamos que el password que nos están enviando es válido.
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error('El password no es válido');
      error.code = 401;
      throw error;
    }
    //generar el jwt 
    const tokenPayload = { id: user.id, email: user.email, admin:user.admin };
    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET,
      { expiresIn: '30d' },
    );
    
    res.send(token);
  }catch(err) {
    if(err.name === 'ValidationError'){
      err.status = 400;
    }
    console.log(err);
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

//---------------Actualización de la información del usuario------------------
async function updateUser(req,res){
  try {
    
    const { IdUser }= req.params;  
    
    const { password,email,newPassword,repeatNewPassword,bio,name,lastName } = req.body;

    const schema = Joi.object({
      IdUser: Joi.number().positive().required(),
      email: Joi.string(),
      password: Joi.string().required(),
      newPassword: Joi.string(),
      repeatNewPassword: Joi.ref('newPassword'),
      bio: Joi.string(),
      name: Joi.string(),
      lastName: Joi.string()
    });
    await schema.validateAsync({password,email,newPassword,repeatNewPassword,bio,name,lastName,IdUser});

    const user = await usersRepository.getUserById(IdUser);

    if (!user) {
      res.status(404);
      return res.send({ error: 'Usuario no encontrado' });
    }

    //Comprobamos que el password que nos están enviando es válido.
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      const error = new Error('El password no es válido');
      error.code = 401;
      throw error;
    }

    let myImage='fotoPerfilIdUser'+IdUser;
    let imagen = req.files.picture 

    imagen.mv(__dirname+'/../files/users/'+myImage+'.png', function(err) {
      if (err) {
          console.log(err);
      }
    });

    console.log('Foto subida a: '+__dirname+'/../files/users/'+myImage+'.png')

    setTimeout(function(){ 
      resize(__dirname+'/../files/users/'+myImage+'.png');
    }, 1000);

    function resize(imagen) {
      Jimp.read(imagen, (err, lenna) => {
        if (err) throw err;
        lenna
          .resize(125, 150) // resize
          .write(__dirname+'/../files/users/'+myImage+'.png'); // save
      });
    }

    let picture = __dirname+'/../files/users/'+myImage+'.png';

    let passwordHash = undefined;
        if(newPassword !== undefined){
        passwordHash = await bcrypt.hash(newPassword, 10);
      }
        await usersRepository.updateUser(email,bio,passwordHash,name,lastName,picture,IdUser);

        const userUpdated = await usersRepository.getUserById(IdUser);

        res.send(userUpdated);
  } catch (err) {
    if(err.name === 'ValidationError'){
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
  updateUser
  };
