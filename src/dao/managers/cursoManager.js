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
  crearCurso = async (curso) => {
    return await cursoModel.create(curso);
  };
  actualizarCurso = async (cid, curso) => {
    return await cursoModel.updateOne({ _id: cid }, { $set: curso });
  };
  actualizarCursoPorId = async (cursoId, data) => {
    return await cursoModel.findByIdAndUpdate(
    cursoId,
      { $set: data },
      { new: true }
    );
  };

  eliminarCurso = async (id) => {
    return await cursoModel.findByIdAndDelete(id);
  };
}
