'use strict';
const Joi = require('joi');
const {
  incidenciasRepository, 
  espaciosRepository,
}= require('../repositories');


async function addIncidencia(req,res){
  try {
    const IdEspacio = req.params.IdEspacio;
    const schema = Joi.number().positive().required();
    await schema.validateAsync(IdEspacio);

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







async function deleteIncidencia(req, res) {
  try {    
    console.log(req.auth.admin) ;
    
    if(req.auth.admin===0){
      throw new Error('No eres admin');
    }

    const  IdIncidencia  = req.params.IdIncidencia;
    const schema = Joi.number().positive().required();
    await schema.validateAsync(IdIncidencia);

    const review = await incidenciasRepository.getIncidenciaById(IdIncidencia);
    if(!review){
      throw new Error('Incidencia no existe');
    }

    await incidenciasRepository.deleteIncidencia(IdIncidencia);

    res.send({message: 'Incidencia borrada' });
  } catch (err) {
    console.log(err);
    if(err.name === 'ValidationError'){
      err.status = 400;
    }
    res.status(err.status || 500);
    res.send({ error: err.message });
  }

}

async function getIncidencias(req, res) {
  try{
    console.log(req.auth.admin) ;
    
    if(req.auth.admin===0){
      throw new Error('No eres admin');
    }
    const  IdEspacio  = req.params.IdEspacio;
    const schema = Joi.number().positive().required();
    await schema.validateAsync(IdEspacio);

    const espacios = await espaciosRepository.getEspacioById(IdEspacio);
    if(!espacios){
        throw new Error('Este espacio no existe.');
      }

    const incidencias = await incidenciasRepository.getIncidencias(IdEspacio);

    return res.send(incidencias);
}catch(err){
    if(err.nombre === 'ValidationError'){
        err.status = 400;
    }
    console.log(err);
    res.status(err.status||500);
    res.send({error: err});
}

}

module.exports={
    addIncidencia,
    deleteIncidencia,
    getIncidencias
};