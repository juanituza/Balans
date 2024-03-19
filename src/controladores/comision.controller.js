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
      return ErrorService.createError({
        name: "Comisión no encontrada",
        cause: comisionNoEncontrada(cid),
        message: `Comisión no encontrada`,
        code: EErrors.COMISION_NOT_FOUND,
        status: 500,
      });
    }
    // verifico si el alumno es nuevo
    const alumnoExistente = comision.alumnos.find(
      ({ alumno }) => alumno._id.toString() === uid
    );
    if (alumno.comision) {
      return ErrorService.createError({
        name: "Usuario ya asignado a una comisión",
        cause: usuarioYaEnComision(uid),
        message: `Usuario ya asignado a una comisión`,
        code: EErrors.USUARIO_YA_EN_COMISION,
        status: 401,
      });
    }

    // Verificar si la comisión ya está presente en el array de comisiones del alumno
    const comisionExistente = alumno.comisiones.find(
      (com) => com.comision.toString() === comision._id.toString()
    );

    if (!comisionExistente) {
      // Si la comisión no está presente, agregarla al array de comisiones del alumno
      alumno.comisiones.push({ comision: comision._id });

      // Actualizar el usuario con las comisiones actualizadas
      await usuarioService.actualizarUsuarioPorId(uid, {
        comisiones: alumno.comisiones,
      });

      console.log("Comisión agregada exitosamente.");
    } else {
      console.log(
        "La comisión ya está presente en el array de comisiones del alumno."
      );
    }

    if (alumnoExistente !== undefined) {
      return ErrorService.createError({
        name: "Alumno ya existe en el curso",
        cause: existeAlumno(uid),
        message: `Alumno ya existe en el curso`,
        code: EErrors.NOT_ADD_ALUMNO,
        status: 401,
      });
    }
    // si el alumno es undefined lo agrego al arreglo alumnos
    if (alumnoExistente === undefined) {
      comision.alumnos.push({ alumno: alumno });
    }
    await comisionService.actualizarComision(cid, comision);
    const comisionDto = new ComisionDTO(comision);
    res.sendSuccessWithPayload(comisionDto);
  } catch (error) {
    //    LoggerService.error(error);
    if (error.name === "Comisión no encontrada") {
      res.status(error.status).send({ status: "error", error: error.message });
    }
    if (error.name === "Alumno ya existe en el curso") {
      res.status(error.status).send({ status: "error", error: error.message });
    } else {
      res.sendInternalError("Internal server error,contact the administrator");
    }
  }
};
const eliminarAlumno = async (req, res) => {
  try {
    const { aid, cid } = req.params;
    const alumnoTotal = await usuarioService.obtenerUsuarioPorId(aid);
    //obtengo la comisión
    const comision = await comisionService.obtenerComisionPor(cid);
    //obetengo el alumno a eliminar
    const alumno = comision.alumnos.find(
      (a) => a.alumno._id.toString() === aid
    );c
    
    //si el alumno no existe
    if (!alumno) {
      return res.sendNotFound("Alumno no existe en la comisión");
    }
    // busco la ubicacion del alumno en el array
    const alumnoIndex = comision.alumnos.findIndex(
      (p) => p.alumno._id.toString() === aid
    );
    
    // Buscar el índice de la comisión que deseas eliminar en el array de comisiones del alumno
    const indiceComisionEliminar = alumnoTotal.comisiones.findIndex(
      (comision) => comision._id.toString() === cid
    );
    console.log(indiceComisionEliminar);
    //Elimino el alumno de la comision
    comision.alumnos.splice(alumnoIndex, 1);
    //Elimino la comision del alumno
    alumnoTotal.comisiones.splice(indiceComisionEliminar,1);
    // Guardo el alumno
    await usuarioService.actualizarUsuario(aid, {
        comisiones: alumnoTotal.comisiones})
    //Guardo la comision editada
    await comisionService.actualizarComision(cid, comision);
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
    await comisionService.eliminarComision(cid);
    res.sendSuccessWithPayload("Comision eliminada con éxito");
  } catch (error) {
    res.sendInternalError("Internal server error,contact the administrator");
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
