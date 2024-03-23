import { cursoService } from "../services/repositorios/index.js";
import __dirname from "../utils.js";

const crarCurso = async (req, res) => {
  try {
    const { nombre, texto } = req.body;

    const curso = { nombre, texto };

    const result = await cursoService.crearCurso(curso);
    res.sendSuccessWithPayload({ result });
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};

const editarCurso = async (req, res) => {
  try {
    //obtengo el id del curso
    const cursoId = req.params.cursoId;
    // // obtengo el curso a editar
    // const cursoActual = await cursoService.obtenerCursoPorId(cursoId);
    // los datos a modificar   
    const cursoUpdate = req.body;
   
    //actualizo el curso
    await cursoService.actualizarCursoPorId(
      { _id: cursoId },
     cursoUpdate
    );
res.sendSuccessWithPayload("curso editado con éxito");
  } catch (error) {
    res.sendInternalError("Internal error");
  }
};

export default {
  crarCurso,
  editarCurso,
};
