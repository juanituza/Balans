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
    const { uid, cid } = req.params;
    //obtengo la comisión
    const comision = await comisionService.obtenerComisionPor(cid);
    //obetengo el alumno a eliminar
    const alumno = comision.alumnos.find(
      (a) => a.alumno._id.toString() === uid
    );
    //si el alumno no existe
    if (!alumno) {
      return res.sendNotFound("Alumno no existe en la comisión");
    }
    // busco la ubicacion del alumno en el array
    const alumnoIndex = comision.alumnos.findIndex(
      (p) => p.alumno._id.toString() === uid
    );
    //Elimino el alumno
    comision.alumnos.splice(alumnoIndex, 1);
    //Guardo la comision editada
    await comisionService.actualizarComision(cid, comision);
    //Creo el DTO
    const comisionDto = new ComisionDTO(comision);
    //Devuelvo la respuesta con DTO incluido
    res.sendSuccessWithPayload({ comisionDto });
  } catch (error) {
    res.sendInternalError("Internal server error,contact the administrator");
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

export default {
  obtenerComisiones,
  crearComision,
  agregarAlumno,
  eliminarAlumno,
  eliminarComision,
  cargarArchivos,
};
