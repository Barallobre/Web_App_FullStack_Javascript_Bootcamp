'use strict';

const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const sengrid = require('@sendgrid/mail');
const sharp = require('sharp')
const fs = require('fs').promises;
let Jimp = require('jimp');

const {
  espaciosRepository,
}= require('../repositories');

async function getEspacios(req,res){
    try{
        const registerSchema = Joi.object({
            nombre: Joi.string(),
            localidad: Joi.string()
        });

        await registerSchema.validateAsync(req.body);

        const {nombre, localidad} = req.body;

        const espacios = await espaciosRepository.listEspacios();

        return res.send(espacios);
    }catch(err){
        if(err.nombre === 'ValidationError'){
            err.status = 400;
        }
        console.log(err);
        res.status(err.status||500);
        res.send({error: err});
    }

}
async function getEspacioById(req,res){
    try{
        
        if(req.auth.admin === true){
            throw new Error('No eres admin');
          }
        const IdEspacio = req.params.IdEspacio;
        const schema = Joi.number().positive();
        await schema.validateAsync(IdEspacio);

        const espacios = await espaciosRepository.getEspacioById(IdEspacio);
        res.send(espacios);
    }catch(err){
        if(err.nombre === 'ValidationError'){
            err.status = 400;
        }
        console.log(err);
        res.status(err.status||500);
        res.send({error: err});
    }
}




async function deleteEspacio(req,res){
    try{   
        if(req.auth.admin === 0){
            throw new Error('No eres admin');
          }
        const IdEspacio = req.params.IdEspacio;
        const schema = Joi.number().positive().required();
        await schema.validateAsync(IdEspacio);

        const espacios = await espaciosRepository.getEspacioById(IdEspacio);
        if(!espacios){
            throw new Error('Este espacio no existe.');
          }
        await espaciosRepository.deleteEspacio(IdEspacio);

          res.send({message: 'Espacio borrado' });
    }catch(err){
        if(err.nombre === 'ValidationError'){
            err.status = 400;
        }
        console.log(err);
        res.status(err.status||500);
        res.send({error: err});
    }

}
//------------------Función para añadir un espacio nuevo por parte del admin-----------------------
//TODO
async function addEspacio(){
    try {
        
    
        const espacio = await espaciosRepository.getEspacioById(IdEspacio);
        if(!espacio){
          throw new Error('Ese espacio no existe');
        }
    
        const schemaBody = Joi.object({
          idTipoIncidencia: Joi.number().positive().required(),
          descripcion: Joi.string().min(5).max(255).required(),
          fechaAlta: Joi.date().required(),
        });
    
        await schemaBody.validateAsync(req.body);
        const {
          idTipoIncidencia,
          descripcion,
          fechaAlta,
        } = req.body;
    
        const user = await incidenciasRepository.getTipoIncidenciaById(idTipoIncidencia);
        if(!user){
          throw new Error('Ese tipo de incidencia no es válido');
        }
        await incidenciasRepository.createIncidencia(idTipoIncidencia,IdEspacio, descripcion, fechaAlta);
        
    
        return res.send("incidencia creada");
      } catch (err) {
        console.log(err);
        if(err.name === 'ValidationError'){
          err.status = 400;
        }
        res.status(err.status || 500);
        res.send({ error: err.message });
      }

}
//------------------Función para actualizar datos de un espacio por parte del admin-----------------------
async function updateEspacio(req,res){
  try {
    if(req.auth.admin === 0){
      throw new Error('No eres admin');
    }
    const { IdEspacio }= req.params;  
    
    const { nombre,localidad,tipoEspacio,fechaInicioDisp,fechaFinDisp,costeDia } = req.body;

    const schema = Joi.object({
      IdEspacio: Joi.number().positive().required(),
      nombre: Joi.string(),
      localidad: Joi.string(),
      tipoEspacio: Joi.string(),
      fechaInicioDisp: Joi.date(),
      fechaFinDisp: Joi.date(),
      costeDia: Joi.string(),

    });
    await schema.validateAsync({IdEspacio,nombre,localidad,tipoEspacio,fechaInicioDisp,fechaFinDisp,costeDia});

  
    const espacio = await espaciosRepository.getEspacioById(IdEspacio);
    if(!espacio){
      throw new Error('Ese espacio no existe');
    }

    let imagen = req.files.picture 
    let myImage='fotoEspacioIdEspacio'+IdEspacio;
    imagen.mv(__dirname+'/../files/espacios/'+myImage+'.png', function(err) {
      if (err) {
          console.log(err);
      }
    });
    
    setTimeout(function(){ 
      resize(__dirname+'/../files/espacios/'+myImage+'.png');
    }, 1000);
    
     function resize(imagen) {
      Jimp.read(imagen, (err, lenna) => {
        if (err) throw err;
        lenna
          .resize(250, 150) // resize
          .write(__dirname+'/../files/espacios/'+myImage+'.png'); // save
      });
    }

    console.log('Foto subida a: '+__dirname+'/../files/espacios/'+myImage+'.png')
    let picture = __dirname+'/../files/espacios/'+myImage+'.png';

    await espaciosRepository.updateEspacio(nombre,localidad,tipoEspacio,fechaInicioDisp,fechaFinDisp,costeDia,picture,IdEspacio);

    const espacioUpdated = await espaciosRepository.getEspacioById(IdEspacio);


    const { sillas,mesas,proyector,pantallaProyector,monitores } = req.body;

    console.log(req.body);

    let Cantidad;

    if(sillas!==undefined){
      const IdTipoEquipamiento = await espaciosRepository.buscarTipoEquipamiento("sillas");
      console.log(IdTipoEquipamiento)
      console.log(IdEspacio)

      const hayGuardado =  await espaciosRepository.getEquipamientoEspacioById(IdTipoEquipamiento,IdEspacio)
      console.log(hayGuardado);

      Cantidad = req.body.sillas;
      await espaciosRepository.updateEquipamiento(IdTipoEquipamiento,Cantidad,IdEspacio);
    }

    if(mesas!==undefined){
      const IdTipoEquipamiento =  await espaciosRepository.buscarTipoEquipamiento("mesas");
      Cantidad = req.body.mesas;
      await espaciosRepository.updateEquipamiento(IdTipoEquipamiento,Cantidad,IdEspacio);
    }

    if(proyector!==undefined){
      const IdTipoEquipamiento =  await espaciosRepository.buscarTipoEquipamiento("proyector");
      Cantidad = req.body.proyector;
      await espaciosRepository.updateEquipamiento(IdTipoEquipamiento,Cantidad,IdEspacio);
    }

    if(pantallaProyector!==undefined){
      const IdTipoEquipamiento =  await espaciosRepository.buscarTipoEquipamiento("pantallaProyector");
      Cantidad = req.body.pantallaProyector;
      await espaciosRepository.updateEquipamiento(IdTipoEquipamiento,Cantidad,IdEspacio);
    }

    if(monitores!==undefined){
      const IdTipoEquipamiento =  await espaciosRepository.buscarTipoEquipamiento("monitores");
      Cantidad = req.body.monitores;
      await espaciosRepository.updateEquipamiento(IdTipoEquipamiento,Cantidad,IdEspacio);
    }


 











    res.send(espacioUpdated);
  } catch (err) {
    if(err.name === 'ValidationError'){
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