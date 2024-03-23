export default class CursoRepositorio {
  constructor(dao) {
    this.dao = dao;
  }

  obtenerCursos = () => {
    return this.dao.obtenerCursos();
  };
  obtenerCursoPorId = (id) => {
    return this.dao.obtenerCursoPorId(id);
  };
  obtenerCursoPor = (params) => {
    return this.dao.obtenerCursoPor(params);
  };
  crearCurso = (curso) => {
    return this.dao.crearCurso(curso);
  };
  actualizarCurso = (id, consulta) => {
    return this.dao.actualizarCurso(id, consulta);
  };
  actualizarCursoPorId = (id,data) => {
    return this.dao.actualizarCursoPorId(id,data);
  }
  eliminarCurso = (id) => {
    return this.dao.eliminarCurso(id);
  };
}
