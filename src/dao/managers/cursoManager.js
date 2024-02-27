import cursoModel from "../models/cursos.js";

export default class CursosManager {
  obtenerCursos = async () => {
    return await cursoModel.find().lean();
  };
  obtenerCursoPorId = (id) => {
    return cursoModel.findById(id);
  };
  obtenerCursoPor = async (id) => {
    return await cursoModel.findOne({ _id: id }).lean();
  };
  crearCurso = async (comision) => {
    return await cursoModel.create(comision);
  };
  actualizarCurso = async (cid, comision) => {
    return await cursoModel.updateOne({ _id: cid }, { $set: comision });
  };

  eliminarCurso = async (id) => {
    return await cursoModel.findByIdAndDelete(id);
  };
}
