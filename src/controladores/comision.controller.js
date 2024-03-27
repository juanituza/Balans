import {
  comisionService,
  usuarioService,
} from "../services/repositorios/index.js";
import __dirname from "../utils.js";

import {
  comisionNoEncontrada,
  existeAlumno,
} from "../constants/comisionError.js";

import ErrorService from "../services/ErrorServicer.js";
import EErrors from "../constants/EErrors.js";

import ComisionDTO from "../dto/comisionDTO.js";

const obtenerComisiones = async (req, res) => {
  const comision = await comisionService.obtenerComision();
  res.sendSuccessWithPayload(comision);
};

const crearComision = async (req, res) => {
  try {
    const { numero, curso } = req.body;

    const comision = {
      numero,
      curso,
    };

    const result = await comisionService.crearComision(comision);
    res.sendSuccessWithPayload({ result });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};
const agregarAlumno = async (req, res) => {
  try {
    const { cid, uid } = req.params;
    const alumno = await usuarioService.obtenerUsuarioPorId(uid);
    const comision = await comisionService.obtenerComisionPor(cid);
    if (!comision) {
      return res.sendNotFound("Comisión no encontrada");
    }

    // Verificar si el alumno ya está asignado a una comisión
    if (alumno.comision) {
      return res.sendUnauthorized("El usuario ya está asignado a una comisión");
    }

    // Verificar si la comisión ya está presente en el array de comisiones del alumno
    const comisionExistente = alumno.comisiones.find(
      (com) => com._id.toString() === cid
    );
    if (!comisionExistente) {
      // Agregar la comisión al array de comisiones del alumno
      alumno.comisiones.push(cid);

      // Actualizar el usuario con las comisiones actualizadas
      await usuarioService.actualizarUsuarioPorId(uid, {
        comisiones: alumno.comisiones,
      });

      // Agregar el alumno a la comisión
      comision.alumnos.push({ alumno: uid });
      await comisionService.actualizarComision(cid, comision);

      return res.sendSuccess("Alumno agregado exitosamente.");
    } else {
      return res.sendUnauthorized("El alumno ya está presente en la comisión");
    }
  } catch (error) {
    res.sendInternalError(
      "Error interno del servidor. Por favor, contacta al administrador."
    );
  }
};



const eliminarAlumno = async (req, res) => {
  try {
    const { aid, cid } = req.params;
    //obtengo el alumno completo
    const alumnoTotal = await usuarioService.obtenerUsuarioPorId(aid);
    
    //obtengo la comisión
    const comision = await comisionService.obtenerComisionPor(cid);

    //obetengo el alumno a eliminar
    const alumno = comision.alumnos.find(
      (a) => a.alumno._id.toString() === aid.toString()
    );
    //si el alumno no existe
    if (!alumno) {
      return res.sendNotFound("Alumno no existe en la comisión");
    }
    // busco la ubicacion del alumno en el array
    const alumnoIndex = comision.alumnos.findIndex(
      (p) => p.alumno._id.toString() === aid
    );
     //Busco el índice del la comisión a eliminar 
    const indiceComisionEliminar = alumnoTotal.comisiones.findIndex(
      (comision) => comision._id.toString() === cid
    );
    if (indiceComisionEliminar !== -1) {
      //Elimino la comision del alumno
      alumnoTotal.comisiones.splice(indiceComisionEliminar, 1);
      // Guardo el alumno
      await usuarioService.actualizarUsuarioPorId(aid, {
        comisiones: alumnoTotal.comisiones,
      });
    }
    if (alumnoIndex != -1) {
      //Elimino el alumno de la comision
      comision.alumnos.splice(alumnoIndex, 1);
      //Guardo la comision editada
      await comisionService.actualizarComision(cid, {
        alumnos: comision.alumnos,
      });
    }
    //Creo el DTO
    const comisionDto = new ComisionDTO(comision);
    //Devuelvo la respuesta con DTO incluido
    res.sendSuccessWithPayload({ comisionDto });
  } catch (error) {
    res.sendInternalError(
      "Error al elimnar al alumno, pongase en contacto con el administrador"
    );
  }
};

const eliminarComision = async (req, res) => {
  try {
    const { cid } = req.params;
    //obtengo la comisión
    const comision = await comisionService.obtenerComisionPor(cid);

    // Obtener los IDs de los alumnos
    const idsAlumnos = comision.alumnos.map((alumno) => alumno.alumno._id);
    // console.log(idsAlumnos);

    // Iterar sobre cada ID de usuario y actualizar su array de comisiones
    await Promise.all(
      idsAlumnos.map(async (userId) => {
        // Obtener el usuario por su ID
        const usuario = await usuarioService.obtenerUsuarioPorId(userId);

        if (usuario) {
          // Encontrar la posición de la comisión en el array de comisiones del usuario
          // const index = usuario.comisiones.indexOf(cid);
          const index = usuario.comisiones.findIndex((comision) => {
            // Convertir el ObjectId a string para compararlo con `cid`
            const comisionIdString = comision._id.toString();
            return comisionIdString === cid;
          });

          // Si se encuentra la comisión, eliminarla del array
          if (index !== -1) {
            usuario.comisiones.splice(index, 1);
            // Actualizar el usuario en la base de datos
            await usuarioService.actualizarUsuarioPorId(userId, {
              comisiones: usuario.comisiones,
            });
          }
        }
      })
    );
    await comisionService.eliminarComision(cid);
    res.sendSuccessWithPayload("Comision eliminada con éxito");
  } catch (error) {
    res.sendInternalError(
      "Error interno del servidor, contacta al administrador"
    );
  }
};

const cargarArchivos = async (req, res) => {
  try {
    const { cid } = req.params;
    const nuevosDocumentos = req.files.map((file) => ({
      name: file.originalname,
      reference: "archivo", // Puedes ajustar esto según tus necesidades
    }));
    //obtengo la comisión
    const comision = await comisionService.obtenerComisionPor(cid);
    // Agrega los nuevos documentos al array existente
    comision.documents = comision.documents.concat(nuevosDocumentos);

    //actualizo la comision
    await comisionService.actualizarComision(cid, comision);

    //Creo el DTO
    const comisionDto = new ComisionDTO(comision);
    //Devuelvo la respuesta con DTO incluido
    res.sendSuccessWithPayload({ comisionDto });
  } catch (error) {
    res.sendInternalError("Internal server error,contact the administrator");
  }
};

const eliminarDocumento = async (req, res) => {
  try {
    const { cid, documentId } = req.params;
    const comision = await comisionService.obtenerComisionPor(cid);
    //Busco el documento a eliminar
    const documentIndex = comision.documents.findIndex((doc) =>
      doc._id.equals(documentId)
    );

    if (documentIndex !== -1) {
      //Elimino el documento del array
      comision.documents.splice(documentIndex, 1);
      //actualizo la comision
      await comisionService.actualizarComision(cid, comision);
      //Creo el DTO
      const comisionDto = new ComisionDTO(comision);
      //Devuelvo la respuesta con DTO incluido
      res.sendSuccessWithPayload({ comisionDto });
    } else {
      res.sendNotFound("Documento no encontrado en la comisión");
    }
  } catch (error) {
    res.sendInternalError("Internal server error,contact the administrator");
  }
};

export default {
  obtenerComisiones,
  crearComision,
  agregarAlumno,
  eliminarAlumno,
  eliminarComision,
  cargarArchivos,
  eliminarDocumento,
};
